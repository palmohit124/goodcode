import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WindowRef } from '../../../../core/providers/window-ref.provider';
import { ClientConfigService } from '../../../../core/services/client-config/client-config.service';

import { Customer } from '../../../../models/customer';

import { searchCampaigActions } from '../../../actions';
import { SearchAnalyticsState } from '../../../reducers';
import {getAuth, getSelectedCustomers} from '../../../../core/reducers';

@Component({
  selector: 'omni-onboard-campaign',
  templateUrl: './onboard-campaign.component.html',
  styleUrls: ['./onboard-campaign.component.scss']
})
export class OnboardCampaignComponent implements OnInit, OnDestroy {

  campaignSampleFileUrl: string = 'search/campaigns/campaign-bulk-upload-sample-file';

  selectedCustomerSubscription: Subscription;
  selectedCustomer: Customer;
  campaignsUploadForm: FormGroup;
  selectedFileName: string = '';
  fileToUpload: File;
  eventTarget: any;

  constructor(
    public store: Store<SearchAnalyticsState>,
    private formBuilder: FormBuilder,
    private clientConfigService: ClientConfigService,
    @Inject(WindowRef) private window: Window,
  ) {
    this.selectedCustomerSubscription = this.store.select(getSelectedCustomers).subscribe(customer => {
      this.selectedCustomer = customer;
    });
  }

  ngOnInit() {
    this.campaignsUploadForm = this.formBuilder.group(
      {
        emailId: [null],
        password: [null]
      }
    );
  }

  onboardCampaignFile(event) {
    this.fileToUpload = event.target.files[0];
    this.eventTarget = event.target;
  }

  onFileSubmit(value: any): void {
    this.store.dispatch(new searchCampaigActions.UploadSearchCampaigns(this.selectedCustomer.id, value.emailId, value.password, this.fileToUpload));
    this.campaignsUploadForm.reset();
    this.fileToUpload = null;
    this.eventTarget.value = null;

  }

  ngOnDestroy() {
    if (this.selectedCustomerSubscription) {
      this.selectedCustomerSubscription.unsubscribe();
    }
  }

}
