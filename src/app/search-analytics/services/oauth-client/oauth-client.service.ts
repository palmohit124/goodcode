import { Observable } from 'rxjs/Observable';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { WindowRef } from '../../../core/providers/window-ref.provider';
import { POPUP_FACTORY } from '../../../core/providers/popup-factory.provider';

export const REQUEST_ID_FACTORY = new InjectionToken<RequestIdFactory>('Request Id Factory');
export interface RequestIdFactory {
  // tslint:disable-next-line:callable-types
  (): string;
}

@Injectable()
export class OauthClientService {
  static stateSeparator = '.';

  constructor( @Inject(WindowRef) private window: Window,
    @Inject(POPUP_FACTORY) private popupFactory: Function,
    @Optional() @Inject(REQUEST_ID_FACTORY) private requestIdFactory: RequestIdFactory) {

    if (!requestIdFactory) {
      this.requestIdFactory = () => Date.now().toString();
    }
  }

  grant(authUrl: string, state: string): Observable<string> {
    const requestId = this.requestIdFactory();
    authUrl = authUrl + `&state=${requestId}${state ? OauthClientService.stateSeparator + state : ''}`;

    const result: Observable<string> = Observable.create(observer => {
      const listener = (event: Event) => {
        if (event instanceof MessageEvent) {
          const msgData: any = <any>event.data;
          const actualResponse = msgData['state'] ? msgData['state'].split(OauthClientService.stateSeparator)[0] === requestId : null;
          if (actualResponse) {
            if (msgData['error']) {
              observer.error(new Error(msgData['error']));
            } else {
              if (msgData['code']) {
                observer.next(msgData['code']);
                observer.complete();
              } else {
                observer.error(new Error('Authorization code not returned by authorization server'));
              }
            }
          }
        }
      };
      this.window.addEventListener('message', listener);
      return () => this.window.removeEventListener('message', listener);
    });

    this.popupFactory(authUrl);

    return result;
  }
}
