import { Component, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { Customer } from '../../../../models/customer';
import { getSelectedCustomers } from '../../../../core/reducers';
import { platformAccountActions } from '../../../actions';
import { SearchAnalyticsState, platformAccount, getPlatformAccountState } from '../../../reducers';

@Component({
  selector: 'omni-platform-accounts-card-content',
  templateUrl: './platform-accounts-card-content.component.html',
  styleUrls: ['./platform-accounts-card-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlatformAccountsCardContentComponent implements OnDestroy {
  limit: number = 3;
  pageIndex: number = 0;

  selectedCustomerSubscription: Subscription;
  selectedCustomer: Customer;

  platformAccountState$: Observable<platformAccount.PlatformAccountState>;
  searchTerm: string;

  constructor(
    public store: Store<SearchAnalyticsState>,
    public router: Router
  ) {
    this.platformAccountState$ = this.store.select(getPlatformAccountState);
    this.selectedCustomerSubscription = this.store.select(getSelectedCustomers).subscribe(customer => {
      this.selectedCustomer = customer;
      if (this.selectedCustomer) {
        this.loadLinkedPlatformAccounts();
      }
    });
  }

  loadLinkedPlatformAccounts() {
    const queryParam = {
      offset: this.pageIndex * this.limit,
      limit: this.limit
    };
    if (this.searchTerm) {
      queryParam['name'] = this.searchTerm;
    }
    this.store.dispatch(new platformAccountActions.LoadLinked(this.selectedCustomer.id, queryParam));
  }

  search($event) {
    this.searchTerm = $event;
    this.pageIndex = 0;
    this.loadLinkedPlatformAccounts();
  }

  paginate(event) {
    this.pageIndex = event.pageIndex;
    this.loadLinkedPlatformAccounts();
  }

  navigate() {
    this.router.navigate(['search-analytics/platform-account']);
  }

  ngOnDestroy() {
    if (this.selectedCustomerSubscription) {
      this.selectedCustomerSubscription.unsubscribe();
    }
  }

}
