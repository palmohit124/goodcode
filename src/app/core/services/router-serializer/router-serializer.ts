import {RouterStateSnapshot} from '@angular/router';
import {RouterStateSerializer} from '@ngrx/router-store';
import {RouterStateUrl} from '../../../models/router-state-url';

export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStateUrl> {

  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const url = routerState.url;
    const queryParams = routerState.root.queryParams;
    const fragment = routerState.root.fragment;

    return {
      url: url,
      queryParams: queryParams,
      fragment: fragment
    };
  }

}
