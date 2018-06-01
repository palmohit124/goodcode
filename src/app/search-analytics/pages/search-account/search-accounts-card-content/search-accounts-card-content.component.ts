import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { SearchAnalyticsState, searchAccount, getSearchAccountState, getSearchAccountActionStatus } from '../../../reducers';
import { getSelectedCustomers } from '../../../../core/reducers';
import { searchAccountActions } from '../../../actions';
import { Customer } from '../../../../models/customer';
import { OmniConfirmationComponent } from '../../../../shared/components';

@Component({
  selector: 'omni-search-accounts-card-content',
  templateUrl: './search-accounts-card-content.component.html',
  styleUrls: ['./search-accounts-card-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchAccountsCardContentComponent implements OnDestroy {
  limit: number = 5;
  pageIndex: number = 0;

  unlinkAccountDialogRefSubscription: Subscription;
  selectedCustomerSubscription: Subscription;
  selectedCustomer: Customer;

  searchAccountState$: Observable<searchAccount.SearchAccountState>;

  unlinkStatusSubscription: Subscription;
  searchTerm: string;

  constructor(
    public store: Store<SearchAnalyticsState>,
    public dialog: MatDialog,
    public router: Router
  ) {
    this.searchAccountState$ = this.store.select(getSearchAccountState);

    this.unlinkStatusSubscription = this.store.select(getSearchAccountActionStatus)
      .filter(searchAccountUnlinked => searchAccountUnlinked)
      .subscribe(() => {
        this.pageIndex = 0;
        this.loadSearchAccounts();
      });

    this.selectedCustomerSubscription = this.store.select(getSelectedCustomers).subscribe(customer => {
      this.selectedCustomer = customer;
      if (this.selectedCustomer) {
        this.loadSearchAccounts();
      }
    });
  }

  paginate(event) {
    this.pageIndex = event.pageIndex;
    this.loadSearchAccounts();
  }

  loadSearchAccounts() {
    const queryParam = {
      offset: this.pageIndex * this.limit,
      limit: this.limit
    };
    if (this.searchTerm) {
      queryParam['name'] = this.searchTerm;
    }
    this.store.dispatch(new searchAccountActions.LoadLinked(this.selectedCustomer.id, queryParam));
  }

  unlinkSearchAccount(account) {
    const dialogRef = this.dialog.open(OmniConfirmationComponent, {
      data: {
        title: 'Are you sure to unlink search account?',
        content: account.name
      }
    });

    this.unlinkAccountDialogRefSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new searchAccountActions.Unlink(account.href));
      }
    });
  }

  search($event) {
    this.searchTerm = $event;
    this.pageIndex = 0;
    this.loadSearchAccounts();
  }

  navigate() {
    this.router.navigate(['search-analytics/search-account']);
  }

  ngOnDestroy() {
    if (this.selectedCustomerSubscription) {
      this.selectedCustomerSubscription.unsubscribe();
    }
    if (this.unlinkStatusSubscription) {
      this.unlinkStatusSubscription.unsubscribe();
    }
    if (this.unlinkAccountDialogRefSubscription) {
      this.unlinkAccountDialogRefSubscription.unsubscribe();
    }
  }
}
