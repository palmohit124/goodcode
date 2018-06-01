import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { getSelectedCustomers } from '../../../../core/reducers';
import { SearchAnalyticsState, searchAccount, getSearchAccountState, getSearchAccountActionStatus } from '../../../reducers';
import { searchAccountActions, searchIntegrationActions } from '../../../actions';
import { Customer } from '../../../../models/customer';
import { SearchIntegration, EmptySearchIntegration } from '../../../../models/search-integration';
import { SearchAccount } from '../../../../models/search-account';

@Component({
  selector: 'omni-search-accounts-detail',
  templateUrl: './search-accounts-detail.component.html',
  styleUrls: ['./search-accounts-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchAccountsDetailComponent implements OnDestroy {
  pageIndex: number = 0;
  limit: number = 4;

  selectedSearchAccounts: SearchAccount[] = [];

  selectedCustomerSubscription: Subscription;
  selectedCustomer: Customer;

  selectedIntegration: SearchIntegration = EmptySearchIntegration;

  searchTerm: string;
  searchAccountState$: Observable<searchAccount.SearchAccountState>;
  linkStatusSubscription: Subscription;

  constructor(private store: Store<SearchAnalyticsState>) {
    this.store.dispatch(new searchAccountActions.LoadFail('reset'));
    this.searchAccountState$ = this.store.select(getSearchAccountState);

    this.selectedCustomerSubscription = this.store.select(getSelectedCustomers).subscribe(customer => {
      this.selectedCustomer = customer;
    });

    this.linkStatusSubscription = this.store.select(getSearchAccountActionStatus)
      .filter(searchAccountUnlinked => searchAccountUnlinked)
      .subscribe(() => {
        if (this.selectedSearchAccounts.length) {
          const account = this.selectedSearchAccounts.pop();
          this.store.dispatch(new searchAccountActions.Link({ integrationId: account.integrationId }, account.href));
        } else {
          this.pageIndex = 0;
          this.loadSearchAccounts();
        }
      });
  }

  search($event) {
    this.searchTerm = $event;
    this.pageIndex = 0;
    this.loadSearchAccounts();
  }

  selectedIntegrationEvent($event) {
    this.selectedIntegration = $event;
    this.pageIndex = 0;
    this.selectedSearchAccounts = [];
    this.loadSearchAccounts();
  }

  loadSearchAccounts() {
    const queryParam = {
      offset: this.pageIndex * this.limit,
      limit: this.limit
    };
    if (this.searchTerm) {
      queryParam['name'] = this.searchTerm.trim();
    }
    this.store.dispatch(new searchAccountActions.LoadUnlinked(this.selectedCustomer.id, this.selectedIntegration.id, queryParam));
  }

  onCheckboxSelect(account, checked) {
    if (checked) {
      this.selectedSearchAccounts.push(account);
    } else {
      this.selectedSearchAccounts = this.selectedSearchAccounts.filter(accountObj => accountObj.sourceId !== account.sourceId);
    }
  }

  paginate(event) {
    this.pageIndex = event.pageIndex;
    this.loadSearchAccounts();
  }

  linkAccountsInit() {
    const account = this.selectedSearchAccounts.pop();
    this.store.dispatch(new searchAccountActions.Link({ integrationId: account.integrationId }, account.href));
  }

  ngOnDestroy() {
    if (this.selectedCustomerSubscription) {
      this.selectedCustomerSubscription.unsubscribe();
    }
    if (this.linkStatusSubscription) {
      this.linkStatusSubscription.unsubscribe();
    }
  }

  isAccountSelected(account) {
    return this.selectedSearchAccounts.find((o) => o.sourceId === account.sourceId);
  }

}
