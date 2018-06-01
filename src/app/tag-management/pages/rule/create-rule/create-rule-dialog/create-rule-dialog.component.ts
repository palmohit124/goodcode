import { Component, Inject, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { rulesetActions } from '../../../../actions';
import { TagManagementState, getRulesetState, getRewriteCampaigns } from '../../../../reducers';
import { CustomValidators } from '../../../../../shared/Form/custom.validators';
import { RewriteCampaignList, EmptyRewriteCampaignList } from '../../../../../models/rewrite-campaign';

@Component({
  selector: 'omni-create-rule-dialog',
  templateUrl: './create-rule-dialog.component.html',
  styleUrls: ['./create-rule-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateRuleDialogComponent implements OnInit, OnDestroy {
  errorMsg: string;
  campaigns: RewriteCampaignList = EmptyRewriteCampaignList;
  formData: FormGroup;
  ruleSetSubscription: Subscription;
  accountId: string;
  campaignsSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    public createRuleDialogRef: MatDialogRef<CreateRuleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<TagManagementState>,
  ) {
    this.createRuleDialogRef.afterClosed().subscribe(result => {
      this.store.dispatch(new rulesetActions.ResetRuleActionStatus());
    });

    this.ruleSetSubscription = this.store.select(getRulesetState)
      .subscribe((state) => {
        this.errorMsg = '';
        if (state.rulesetAction) {
          this.store.dispatch(new rulesetActions.LoadInit());
          this.createRuleDialogRef.close();
        }
        if (state.ruleCreationErrorMsg) {
          this.errorMsg = state.ruleCreationErrorMsg;
        }
        if (state.accountId) {
          this.accountId = state.accountId;
        }
      });

      this.campaignsSubscription = this.store.select(getRewriteCampaigns).subscribe(campaigns => {
        this.campaigns = campaigns;
      });
  }

  ngOnInit() {
    this.formData = this.formBuilder.group(
      {
        name: ['', Validators.compose([
          Validators.required, CustomValidators.alphaNumericOnly(),
          CustomValidators.checkCharacterLimit(3, 100)])],
        campaignId: ['', Validators.required]
      }
    );
  }

  trimInput(data) {
    this.formData.patchValue({
      name: data.name.trim().replace(/ +/g, ' ')
    });
  }

  onRuleCreation() {
    this.formData.value['accountId'] = this.accountId;
    this.store.dispatch(new rulesetActions.Add(this.formData.value));
  }

  resetRuleAction() {
    this.store.dispatch(new rulesetActions.ResetRuleActionStatus());
  }

  ngOnDestroy() {
    if (this.ruleSetSubscription) {
      this.ruleSetSubscription.unsubscribe();
    }
    if (this.campaignsSubscription) {
      this.campaignsSubscription.unsubscribe();
    }
  }
}

