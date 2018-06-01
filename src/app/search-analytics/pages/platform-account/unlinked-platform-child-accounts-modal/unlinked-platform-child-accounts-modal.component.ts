import { Component, OnDestroy, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { platformAccountActions } from '../../../actions';
import { SearchAnalyticsState, platformAccount, getPlatformAccountState, getPlatformAccountActionStatus } from '../../../reducers';

@Component({
  selector: 'omni-unlinked-platform-child-accounts-modal',
  templateUrl: './unlinked-platform-child-accounts-modal.component.html',
  styleUrls: ['./unlinked-platform-child-accounts-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UnlinkedPlatformChildAccountsModalComponent implements OnDestroy {
  limit: number = 4;
  offset: number = 0;

  linkStatusSubscription: Subscription;

  selectedPlatformAccounts: string[] = [];
  platformAccountState$: Observable<platformAccount.PlatformAccountState>;
  searchTerm: string;

  constructor(
    public store: Store<SearchAnalyticsState>,
    public dialogRef: MatDialogRef<UnlinkedPlatformChildAccountsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.platformAccountState$ = this.store.select(getPlatformAccountState);
    this.loadUnlinkPlatformChildAccounts();

    this.linkStatusSubscription = this.store.select(getPlatformAccountActionStatus)
      .filter(childAccountUnlinked => childAccountUnlinked)
      .subscribe(() => {
        if (this.selectedPlatformAccounts.length) {
          const platformId = this.selectedPlatformAccounts.pop();
          this.store.dispatch(new platformAccountActions.LinkChild(this.data.customerId, platformId));
        } else {
          this.dialogRef.close(true);
        }
      });
  }

  search($event) {
    this.searchTerm = $event;
    this.offset = 0;
    this.loadUnlinkPlatformChildAccounts();
  }

  loadUnlinkPlatformChildAccounts() {
    const queryParam = {
      offset: this.offset,
      limit: this.limit
    };
    if (this.searchTerm) {
      queryParam['name'] = this.searchTerm;
    }
    this.store.dispatch(new platformAccountActions.LoadUnlinkedChild(this.data.customerId, this.data.parentId, queryParam));
  }

  paginateChild(event) {
    this.offset = event.pageIndex;
    this.loadUnlinkPlatformChildAccounts();
  }

  onChildAccountSelect(platformId, checked) {
    if (checked) {
      this.selectedPlatformAccounts.push(platformId);
    } else {
      this.selectedPlatformAccounts = this.selectedPlatformAccounts.filter(id => id !== platformId);
    }
  }

  isSelectedChildAccount(platformId) {
    return this.selectedPlatformAccounts.indexOf(platformId) > -1;
  }

  linkChildAccountsInit() {
    const platformId = this.selectedPlatformAccounts.pop();
    this.store.dispatch(new platformAccountActions.LinkChild(this.data.customerId, platformId));
  }

  ngOnDestroy() {
    if (this.linkStatusSubscription) {
      this.linkStatusSubscription.unsubscribe();
    }
  }
}
