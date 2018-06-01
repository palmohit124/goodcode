import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { WindowRef } from '../../../../core/providers/window-ref.provider';
import { ClientConfigService } from '../../../../core/services/client-config/client-config.service';

import { Customer } from '../../../../models/customer';
import { SearchAnalyticsState } from '../../../reducers';
import { getSelectedCustomers } from '../../../../core/reducers';

@Component({
  selector: 'omni-search-campaigns-card',
  templateUrl: './search-campaigns-card.component.html',
  styleUrls: ['./search-campaigns-card.component.scss']
})
export class SearchCampaignsCardComponent implements OnInit, OnDestroy {
  selectedCustomerSubscription: Subscription;
  selectedCustomer: Customer;

  constructor(
    public store: Store<SearchAnalyticsState>,
    private clientConfigService: ClientConfigService,
    @Inject(WindowRef) private window: Window,
  ) {
    this.selectedCustomerSubscription = this.store.select(getSelectedCustomers).subscribe(customer => {
      this.selectedCustomer = customer;
    });
  }

  ngOnInit() {
  }

  downloadActiveCampaign() {
    const date = new Date();
    const todaysDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    const url = 'customers/' + this.selectedCustomer.id + '/search/campaigns/keystone.csv?date=' + todaysDate;
    this.window.open(this.clientConfigService.get().baseApiUrl + url);
  }

  ngOnDestroy() {
    if (this.selectedCustomerSubscription) {
      this.selectedCustomerSubscription.unsubscribe();
    }
  }

}
