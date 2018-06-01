import { Component, ViewEncapsulation , Inject, OnDestroy} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { platformAccountActions } from '../../../actions';
import { SearchAnalyticsState, platformAccount, getPlatformAccountState, getPlatformAccountActionStatus } from '../../../reducers';


@Component({
  selector: 'omni-unlinked-platform-parent-accounts-modal',
  templateUrl: './unlinked-platform-parent-accounts-modal.component.html',
  styleUrls: ['./unlinked-platform-parent-accounts-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UnlinkedPlatformParentAccountsModalComponent implements OnDestroy {

  limit: number = 4;
  offset: number = 0;

  selectedParentAccountPlatformId = '0';

  linkStatusSubscription: Subscription;

  searchTerm: string;

  platformAccountState$: Observable<platformAccount.PlatformAccountState>;

  constructor(
    public dialogRef: MatDialogRef<UnlinkedPlatformParentAccountsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public store: Store<SearchAnalyticsState>) {
      this.platformAccountState$ = this.store.select(getPlatformAccountState);
      this.loadUnlinkedParentAccounts();

      this.linkStatusSubscription = this.store.select(getPlatformAccountActionStatus)
      .filter(parentAccountLinked => parentAccountLinked)
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }

  loadUnlinkedParentAccounts() {
    const queryParam = {
      offset: this.offset,
      limit: this.limit
    };
    if (this.searchTerm) {
      queryParam['name'] = this.searchTerm;
    }
    this.store.dispatch(new platformAccountActions.LoadUnlinkedParent(this.data.customerId, queryParam));
  }

  search($event) {
    this.searchTerm = $event;
    this.offset = 0;
    this.loadUnlinkedParentAccounts();
  }

  paginateParent(event) {
    this.offset = event.pageIndex;
    this.loadUnlinkedParentAccounts();
  }

  onParentAccountSelect(platformId) {
    this.selectedParentAccountPlatformId = platformId;
  }

  linkParentAccount() {
     this.store.dispatch(new platformAccountActions.LinkParent(this.data.customerId, this.selectedParentAccountPlatformId));
  }

  ngOnDestroy() {
    if (this.linkStatusSubscription) {
      this.linkStatusSubscription.unsubscribe();
    }
  }

}
