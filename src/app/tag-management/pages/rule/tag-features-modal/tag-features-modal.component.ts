import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { tagFeaturesActions } from '../../../actions';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TagManagementState, tagFeatures, getTagFeaturesrState } from '../../../reducers';
import { getAccount } from '../../../reducers';

@Component({
  selector: 'omni-tag-features-modal',
  templateUrl: './tag-features-modal.component.html',
  styleUrls: ['./tag-features-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TagFeaturesModalComponent implements OnInit, OnDestroy {
  payload: object;
  tagFeaturesState$: Observable<tagFeatures.TagFeaturesState>;
  accountId: string;
  accountSubscription: Subscription;

  constructor(private store: Store<TagManagementState>, public dialogRef: MatDialogRef<TagFeaturesModalComponent>) {
    this.tagFeaturesState$ = this.store.select(getTagFeaturesrState);

    this.accountSubscription = this.store.select(getAccount)
      .filter(state => state !== null)
      .subscribe(accountId => {
        this.accountId = accountId;
        this.loadTagFeatures(this.accountId);
      });
  }

  ngOnInit() {
  }

  loadTagFeatures(accountId) {
    const queryParam = accountId;
    this.store.dispatch(new tagFeaturesActions.Load(queryParam));
  }

  public enableTagFeature(data) {
    this.payload = {
      featureId: data.featureId,
      enabled: data.enabled,
      accountId: this.accountId
    };
    if (!data.enabled && data.providers) {
      data.providers.forEach(provider => {
        provider.enabled = false;
      });
    }
    this.store.dispatch(new tagFeaturesActions.ToggleFeatures(this.payload));
  }

  public enableTagProvider(data) {
    this.payload = {
      providerId: data.providerId,
      enabled: data.enabled,
      accountId: this.accountId
    };
    this.store.dispatch(new tagFeaturesActions.ToggleProviders(this.payload));
  }

  ngOnDestroy() {
    if (this.accountSubscription) {
      this.accountSubscription.unsubscribe();
    }
  }

}
