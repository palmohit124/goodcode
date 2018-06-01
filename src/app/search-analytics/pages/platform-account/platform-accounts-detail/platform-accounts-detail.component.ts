import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Customer } from '../../../../models/customer';
import { getSelectedCustomers } from '../../../../core/reducers';
import { platformAccountActions } from '../../../actions';
import { SearchAnalyticsState, platformAccount, getPlatformAccountState } from '../../../reducers';

import { UnlinkedPlatformChildAccountsModalComponent } from '../unlinked-platform-child-accounts-modal/unlinked-platform-child-accounts-modal.component';
import { UnlinkedPlatformParentAccountsModalComponent } from '../unlinked-platform-parent-accounts-modal/unlinked-platform-parent-accounts-modal.component';

@Component({
  selector: 'omni-platform-accounts-detail',
  templateUrl: './platform-accounts-detail.component.html',
  styleUrls: ['./platform-accounts-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlatformAccountsDetailComponent implements OnDestroy {
  limit: number = 3;
  pageIndex: number = 0;

  childDialogRefSubscription: Subscription;
  parentDialogRefSubscription: Subscription;

  selectedCustomerSubscription: Subscription;
  selectedCustomer: Customer;

  platformAccountState$: Observable<platformAccount.PlatformAccountState>;
  parentIdSubscription: Subscription;

  constructor(
    public dialog: MatDialog,
    public store: Store<SearchAnalyticsState>
  ) {
    this.platformAccountState$ = this.store.select(getPlatformAccountState);

    this.selectedCustomerSubscription = this.store.select(getSelectedCustomers).subscribe(customer => {
      this.selectedCustomer = customer;
      if (this.selectedCustomer) {
        this.loadLinkedPlatformAccounts();
      }
    });
  }

  linkChildAccount() {
    let platformId;
    this.parentIdSubscription = this.platformAccountState$.take(1).subscribe(state => {
      platformId = state.linkedAccounts.parent.platformId;
    });
    if (platformId) {
      const dialogRef = this.dialog.open(UnlinkedPlatformChildAccountsModalComponent, {
        data: {
          parentId: platformId,
          customerId: this.selectedCustomer.id
        }
      });

      this.childDialogRefSubscription = dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.pageIndex = 0;
          this.loadLinkedPlatformAccounts();
        }
      });
    }
  }

  linkParentAccount() {
    const dialogRef = this.dialog.open(UnlinkedPlatformParentAccountsModalComponent, {
      data: {
        customerId: this.selectedCustomer.id
      }
    });

    this.parentDialogRefSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadLinkedPlatformAccounts();
      }
    });
  }

  loadLinkedPlatformAccounts() {
    const queryParam = {
      offset: this.pageIndex * this.limit,
      limit: this.limit
    };
    this.store.dispatch(new platformAccountActions.LoadLinked(this.selectedCustomer.id, queryParam));
  }

  paginate(event) {
    this.pageIndex = event.pageIndex;
    this.loadLinkedPlatformAccounts();
  }

  ngOnDestroy() {
    if (this.childDialogRefSubscription) {
      this.childDialogRefSubscription.unsubscribe();
    }
    if (this.parentDialogRefSubscription) {
      this.parentDialogRefSubscription.unsubscribe();
    }
    if (this.selectedCustomerSubscription) {
      this.selectedCustomerSubscription.unsubscribe();
    }
    if (this.parentIdSubscription) {
      this.parentIdSubscription.unsubscribe();
    }
  }
}
