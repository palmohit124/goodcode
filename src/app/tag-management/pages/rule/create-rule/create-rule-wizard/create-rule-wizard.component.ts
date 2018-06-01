import { Component, OnInit, OnDestroy, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgSwitch } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CustomValidators } from '../../../../../shared/Form/custom.validators';
import { InitialRulsetCondition, InitialRuleRewrite } from '../../../../../models/rule-set';
import { ruleActions } from '../../../../actions';
import { Subscription } from 'rxjs/Subscription';
import { TagManagementState, getSelectedRule } from '../../../../reducers';
import { RewriteCampaignService } from '../../../../services/rewrite-campaign/rewrite-campaign.service';
import { Ctn } from '../../../../../models/rewrite-campaign';

@Component({
  selector: 'omni-create-rule-wizard',
  templateUrl: './create-rule-wizard.component.html',
  styleUrls: ['./create-rule-wizard.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CreateRuleWizardComponent implements OnInit, OnDestroy {
  RefdomFormData: FormGroup;
  ConditionsFormData: FormGroup;
  LookupsFormData: FormGroup;
  RewritesFormData: FormGroup;
  ruleCreateStep = 'refdom';
  pageTitle: string;
  progressbarClass = 'fill-25';
  breadcrumb = '';
  currentStepBreadcrumb = 'Refdom';
  sources: any = [];
  sourcesArr: any = [];
  conditionSources: object = [{ key: 'cookie', value: 'Cookie' }, { key: 'url', value: 'Url Parameter' }, { key: 'css', value: 'CSS' }];
  callTrackingNumbers: Ctn[];
  RulesetObject: object = {};
  isAddCondition: boolean = false;
  isAddLookup: boolean = false;
  isAddRewrite: boolean = false;
  showWizardContent: boolean = true;
  closeDialouge: boolean = false;
  selectedRuleSubscription: Subscription;
  campaignSubscription: Subscription;
  disabledConditionSources: string[] = [];
  domain: string;

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateRuleWizardComponent>,
    @Inject(MAT_DIALOG_DATA) public rulesetData: any,
    private store: Store<TagManagementState>,
    private formBuilder: FormBuilder,
    private rewriteCmapaignService: RewriteCampaignService
  ) {

    dialogRef.disableClose = true;
    this.ruleCreateStep = this.rulesetData['step'];
    this.pageTitle = this.rulesetData['title'];
    this.progressbarClass = this.rulesetData['progressbarClass'];
    this.RulesetObject['parentId'] = this.rulesetData['parentId'];
    this.disabledConditionSources = this.rulesetData['disabledSources'] ? this.rulesetData['disabledSources'] : [];
    this.domain = this.rulesetData['disabledAny'] ? 'specific' : 'any';

    this.selectedRuleSubscription = this.store.select(getSelectedRule)
      .filter(rule => rule !== null)
      .subscribe(rule => {
        this.campaignSubscription = this.rewriteCmapaignService.loadCampaignWithCtn(rule.campaignId).subscribe(campaign => {
          this.callTrackingNumbers = campaign.ctn;
        });
      });
  }

  ngOnInit() {
    this.RefdomFormData = this.formBuilder.group(
      {
        domain: ['', Validators.compose([
          Validators.required, CustomValidators.alphaNumericOnly(),
          CustomValidators.checkCharacterLimit(3, 100)])],
        sources: this.formBuilder.array([this.createSource()])
      }
    );

    this.ConditionsFormData = this.formBuilder.group({
      source: [InitialRulsetCondition.source, Validators.required],
      searchParameters: [InitialRulsetCondition.searchParameters, Validators.compose([
        CustomValidators.alphaNumericOnly(),
        CustomValidators.checkCharacterLimit(3, 100)])]
    }, {
        validator: (group) => {
          if (group.controls.source.value !== 'css') {
            return Validators.required((group.controls.searchParameters));
          }
          return null;
        }
      });


    this.LookupsFormData = this.formBuilder.group(
      {
        lookupName: ['', Validators.compose([
          Validators.required, CustomValidators.alphaNumericOnly(),
          CustomValidators.checkCharacterLimit(3, 100)])]
      }
    );

    this.RewritesFormData = this.formBuilder.group(
      {
        value: [InitialRuleRewrite.value, Validators.compose([Validators.required, CustomValidators.nanpa()])],
        ctn: [InitialRuleRewrite.ctn, Validators.compose([Validators.required, CustomValidators.validTel()])],
      }
    );

    if (this.rulesetData['step'] === 'condition') {
      this.isAddCondition = true;
      this.breadcrumb = 'Refdom > ';
      this.currentStepBreadcrumb = 'Condition';
    }
    if (this.rulesetData['step'] === 'lookup') {
      this.isAddLookup = true;
      this.breadcrumb = 'Refdom > Condition > ';
      this.currentStepBreadcrumb = 'Lookup';
    }
    if (this.rulesetData['step'] === 'rewrite') {
      this.isAddRewrite = true;
      this.breadcrumb = 'Refdom > Condition > Lookup >';
      this.currentStepBreadcrumb = 'Rewrite';
    }
  }

  formatNanpa(ctn) {
    const plain = '' + ctn;
    return '(' + plain.substring(0, 3) + ') ' + plain.substring(3, 6) + '-' + plain.substring(6, 10);
  }

  createSource(): FormGroup {
    return this.formBuilder.group({
      source: ['', Validators.compose([
        Validators.required, CustomValidators.notValidUrl(),
        CustomValidators.checkCharacterLimit(3, 100)])]
    });
  }

  trimInputDomain(data) {
    this.RefdomFormData.patchValue({
      domain: data.domain.trim().replace(/ +/g, ' ')
    });
  }

  trimInputSearchParameters(data) {
    this.ConditionsFormData.patchValue({
      searchParameters: data.searchParameters.trim().replace(/ +/g, ' ')
    });
  }

  trimInputLookupname(data) {
    this.LookupsFormData.patchValue({
      lookupName: data.lookupName.trim().replace(/ +/g, ' ')
    });
  }

  setStep(step, title) {
    this.ruleCreateStep = step;
    this.pageTitle = title;

    if (step === 'condition') {
      this.breadcrumb = 'Refdom > ';
      this.currentStepBreadcrumb = 'Condition';
      this.progressbarClass = 'fill-50';
    }
    if (step === 'lookup') {
      this.breadcrumb = 'Refdom > Condition > ';
      this.currentStepBreadcrumb = 'Lookup';
      this.progressbarClass = 'fill-75';
    }
    if (step === 'rewrite') {
      this.breadcrumb = 'Refdom > Condition > Lookup >';
      this.currentStepBreadcrumb = 'Rewrite';
      this.progressbarClass = 'fill-100';
    }
  }

  addSource() {
    this.sources = this.RefdomFormData.get('sources') as FormArray;
    this.sources.push(this.createSource());
  }

  removeSource(index) {
    this.sources.removeAt(index);
  }

  dialogClose() {
    if (!this.closeDialouge) {
      this.showWizardContent = false;
    } else {
      this.dialogRef.close();
    }
  }

  submitForm(prop, value, isLastStep) {
    if (prop === 'condition' && value.source === 'css') {
      this.RulesetObject[prop] = { 'source': value.source };
    } else if ( value !== 'any' ) {
      this.RulesetObject[prop] = value;
    }

    if (prop === 'refdom') {
      if (value === 'any') {
        this.RulesetObject[prop] = {};
        this.RulesetObject[prop]['domain'] = value;
      } else {
        value.sources.map(sourceObj => {
          this.sourcesArr.push(sourceObj.source);
        });
        this.RulesetObject[prop]['sources'] = this.sourcesArr;
      }
    }

    if (isLastStep) {
      this.store.dispatch(new ruleActions.AddRuleAttributes(this.RulesetObject));
      this.dialogRef.close();
    }
  }

  isSourceDisabled(source) {
    return this.disabledConditionSources.indexOf(source) > -1 ? true : false;
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
