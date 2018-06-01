import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { WindowRef } from '../../../providers/window-ref.provider';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { ClientState, getRouterUrl } from '../../../reducers';

@Component({
  selector: 'omni-omni-oauth-redirect',
  templateUrl: './omni-oauth-redirect.component.html',
  styleUrls: ['./omni-oauth-redirect.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OmniOauthRedirectComponent implements OnInit, OnDestroy {

  routerSubscription: Subscription;

  oauthRedirectTitle = 'Thank you for authorizing Omni';

  constructor( @Inject(WindowRef) private window: Window, private store: Store<ClientState>) {
  }

  ngOnInit() {
    this.routerSubscription = this.store.select(getRouterUrl)
      .filter(routerState => routerState !== undefined)
      .subscribe(routerState => {
        const result = routerState.state.queryParams;
        const targetOrigin = `https://${this.window.location.hostname}:${this.window.location.port}/search-analytics/search-account`;
        this.window.opener.postMessage(result, targetOrigin);
        this.window.close();
      });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

}
