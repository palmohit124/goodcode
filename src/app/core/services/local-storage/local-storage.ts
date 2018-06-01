import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Logger} from '../logger';

import {InjectionToken} from '@angular/core';

export const LOCAL_STORAGE_INJECTION_TOKEN: InjectionToken<Storage> = new InjectionToken<Storage>('localstorage');

export const LOCAL_STORAGE_PROVIDER = {
  provide: LOCAL_STORAGE_INJECTION_TOKEN,
  useValue: localStorage
};

@Injectable()
export class LocalStorage {

  constructor(private logger: Logger,
              @Inject(LOCAL_STORAGE_INJECTION_TOKEN) private storage: Storage) {
  }

  public getItem(key: string): Observable<any> {
    try {
      const data = this.storage.getItem(key);
      this.logger.info('get item from storage: ' + data);
      if (data && data !== null) {
        try {
          this.logger.info('loaded local storage' + data);
          return Observable.of(JSON.parse(data));
        } catch (e) {
          const message = 'Error parsing data from localstorage';
          this.logger.error(message, e);
          return Observable.throw(message);
        }
      }
      return Observable.of(data);
    } catch (e) {
      const message = 'Failed to load from localStorage';
      this.logger.error(message, e);
      return Observable.throw(message);
    }
  }

  public setItem(key: string, item: any): Observable<{}> {
    try {
      const serializedItem = item === 'string' ? item : JSON.stringify(item);
      this.storage.setItem(key, serializedItem);
      return Observable.of({});
    } catch (e) {
      const message = 'Failed to save to localStorage';
      this.logger.error(message, e);
      return Observable.throw(message);
    }
  }

  public removeItem(key: string): Observable<{}> {
    try {
      this.storage.removeItem(key);
      return Observable.of({});
    } catch (e) {
      const message = 'Failed to remove item from localstorage';
      this.logger.error(message, e);
      return Observable.throw(message);
    }
  }

}
