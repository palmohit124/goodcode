import { Component, Inject, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { InitialRuleRewrite } from '../../../../../../models/rule-set';
import { CustomValidators } from '../../../../../../shared/Form/custom.validators';
import { TagManagementState, getSelectedRule } from '../../../../../reducers';
import { ruleActions } from '../../../../../actions';
import { Subscription } from 'rxjs/Subscription';
import { RewriteCampaignService } from '../../../../../services/rewrite-campaign/rewrite-campaign.service';
import { Ctn } from '../../../../../../models/rewrite-campaign';

@Component({
  selector: 'omni-rewrites-dialog',
  templateUrl: './rewrites-dialog.component.html',
  styleUrls: ['./rewrites-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RewritesDialogComponent implements OnInit, OnDestroy {
  ctns: Ctn[];
  updateRewriteData: object = {};
  formData: FormGroup;
  selectedRuleSubscription: Subscription;
  campaignSubscription: Subscription;

  constructor
    (
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RewritesDialogComponent>,
    private store: Store<TagManagementState>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rewriteCmapaignService: RewriteCampaignService
    ) {
    this.selectedRuleSubscription = this.store.select(getSelectedRule)
      .filter(rule => rule !== null)
      .subscribe(rule => {
        this.campaignSubscription = this.rewriteCmapaignService.loadCampaignWithCtn(rule.campaignId).subscribe(campaign => {
          this.ctns = campaign.ctn;
        });
      });
  }

  ngOnInit() {
    this.formData = this.formBuilder.group(
      {
        value: [InitialRuleRewrite.value, Validators.compose([Validators.required, CustomValidators.nanpa()])],
        ctn: [InitialRuleRewrite.ctn, Validators.compose([Validators.required, CustomValidators.validTel()])],
      }
    );
    if (this.data) {
      this.formData.patchValue({
        value: this.data.value,
        ctn: this.data.ctn
      });
    }
  }

  onDialogClose(action) {
    if (action) {
      this.updateRewriteData = { 'value': this.formData.controls.value.value, 'ctn': this.formData.controls.ctn.value };
      this.store.dispatch(new ruleActions.EditRuleAttribute(this.data.graphId, 'rewrite', this.updateRewriteData));
      this.dialogRef.close(this.formData.value);
    } else {
      this.dialogRef.close(this.formData.value);
    }
  }

  ngOnDestroy() {
    if (this.selectedRuleSubscription) {
      this.selectedRuleSubscription.unsubscribe();
    }

    if (this.campaignSubscription) {
      this.campaignSubscription.unsubscribe();
    }
  }
}
