import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { getProfile, getRouterUrl } from '../../../core/reducers';
import { authActions } from '../../../core/actions';
import { rulesetActions, rewriteCampaignActions } from '../../actions';
import { UserProfile } from '../../../models/user-profile';

@Component({
  selector: 'omni-tag-shell',
  templateUrl: './tag-shell.component.html',
  styleUrls: ['./tag-shell.component.scss']
})

export class TagShellComponent implements OnInit, OnDestroy {
  routerSubscription: Subscription;
  isSidenavVisible: boolean = true;
  user$: Observable<UserProfile>;

  constructor(private store: Store<any>) {
    this.user$ = this.store.select(getProfile);
  }

  ngOnInit() {
    this.store.dispatch(new rulesetActions.SelectedInit());
    this.routerSubscription = this.store.select(getRouterUrl)
      .subscribe(routerState => {
        const result = routerState.state.url;
        const accountId = decodeURI(result.split('/')[2]) || '';
        const lastUri = decodeURI(result.split('/')[3]) || '';
        this.isSidenavVisible = lastUri === 'rule' ? false : true;
        if (accountId) {
          this.store.dispatch(new rewriteCampaignActions.Load(accountId));
          this.store.dispatch(new rulesetActions.AddAccount(accountId));
          this.store.dispatch(new rulesetActions.LoadInit());
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
