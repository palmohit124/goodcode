import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { ClientConfigService } from '../../../../core/services/client-config/client-config.service';

import { SearchAnalyticsState, searchCampaign, getSearchCampaignState, getSearchCampaignActionStatus } from '../../../reducers';
import { getAuth, getSelectedCustomers } from '../../../../core/reducers';
import { searchCampaigActions } from '../../../actions';
import { Customer } from '../../../../models/customer';

@Component({
  selector: 'omni-onboard-status',
  templateUrl: './onboard-status.component.html',
  styleUrls: ['./onboard-status.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OnboardStatusComponent implements OnDestroy {
  limit: number = 4;
  pageIndex: number = 0;

  selectedCustomerSubscription: Subscription;
  selectedCustomer: Customer;

  searchCampaignState$: Observable<searchCampaign.SearchCampaignState>;
  searchCampaignActionSubscription: Subscription;

  tokenSubscription: Subscription;
  token: string;

  constructor(
    public store: Store<SearchAnalyticsState>,
    private clientConfigService: ClientConfigService
  ) {
    this.searchCampaignState$ = this.store.select(getSearchCampaignState);
    this.searchCampaignActionSubscription = this.store.select(getSearchCampaignActionStatus)
      .filter(searchCampaignAction => searchCampaignAction)
      .subscribe(() => {
        this.pageIndex = 0;
        this.loadSearchCampaigns();
      });

    this.selectedCustomerSubscription = this.store.select(getSelectedCustomers).subscribe(customer => {
      this.selectedCustomer = customer;
      if (this.selectedCustomer) {
        this.loadSearchCampaigns();
      }
    });

    this.tokenSubscription = this.store.select(getAuth).filter(a => a.userTokens != null && a.userTokens.access_token != null).subscribe(a => {
      this.token = a.userTokens.access_token;
    });
  }

  loadSearchCampaigns() {
    const queryParam = {
      offset: this.pageIndex * this.limit,
      limit: this.limit
    };
    this.store.dispatch(new searchCampaigActions.LoadSearchCampaigns(this.selectedCustomer.id, queryParam));
  }

  getFileName(url) {
    return _.last(url.split('/'));
  }

  paginate(event) {
    this.pageIndex = event.pageIndex;
    this.loadSearchCampaigns();
  }

  getDownloadUrl(url) {
    return this.clientConfigService.get().baseApiUrl + url + '?token=' + this.token;
  }

  ngOnDestroy() {
    if (this.selectedCustomerSubscription) {
      this.selectedCustomerSubscription.unsubscribe();
    }
    if (this.searchCampaignActionSubscription) {
      this.searchCampaignActionSubscription.unsubscribe();
    }
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
  }
}
