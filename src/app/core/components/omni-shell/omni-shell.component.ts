import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ClientState, getProfile, getRouterUrl } from '../../reducers';
import { authActions, layoutActions, customerActions } from '../../actions';
import { UserProfile } from '../../../models/user-profile';
import { Subscription } from 'rxjs/Subscription';
import { ClientConfigService } from '../../services/client-config/client-config.service';

@Component({
  selector: 'omni-shell',
  templateUrl: 'omni-shell.component.html',
  styleUrls: ['omni-shell.component.scss'],
})
export class OmniShellComponent implements OnDestroy {
  user$: Observable<UserProfile>;
  routerSubscription: Subscription;
  routesWithClosedSidenav: string[];


  constructor(private store: Store<ClientState>, private clientConfigService: ClientConfigService) {
    this.user$ = this.store.select(getProfile);
    this.routesWithClosedSidenav = this.clientConfigService.get().routes.routesWithoutNav;

    this.store.dispatch(new customerActions.SelectedInit());
    this.store.dispatch(new customerActions.LoadInit());

    this.routerSubscription = this.store.select(getRouterUrl).subscribe(routerState => {
      if (routerState) {
        if (this.routesWithClosedSidenav.indexOf(routerState.state.url) > -1) {
          this.store.dispatch(new layoutActions.CloseSidenav());
        } else {
          this.store.dispatch(new layoutActions.OpenSidenav());
        }
      }
    });

  }

  logout(event: MouseEvent): void {
    this.store.dispatch(new authActions.Logout());
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
