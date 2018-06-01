import { Component, Inject, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { InitialRulsetCondition } from '../../../../../../models/rule-set';
import { ruleActions } from '../../../../../actions';
import { CustomValidators } from '../../../../../../shared/Form/custom.validators';
import { TagManagementState } from '../../../../../reducers';

@Component({
  selector: 'omni-conditions-dialog',
  templateUrl: './conditions-dialog.component.html',
  styleUrls: ['./conditions-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConditionsDialogComponent implements OnInit {

  @Input() conditions: any;
  sources: object = [{ key: 'cookie', value: 'Cookie' }, { key: 'url', value: 'Url Parameter' }, { key: 'css', value: 'CSS' }];
  formData: FormGroup;
  updateConditionData: object = {};
  sourcesArr: any = [];
  disabledConditionSources: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ConditionsDialogComponent>,
    private store: Store<TagManagementState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.disabledConditionSources = this.data['disabledSources'];
  }

  ngOnInit() {
    this.formData = this.formBuilder.group(
      {
        source: [InitialRulsetCondition.source, Validators.required],
        searchParameters: [InitialRulsetCondition.searchParameters, Validators.compose([
          Validators.required, CustomValidators.alphaNumericOnly(),
          CustomValidators.checkCharacterLimit(3, 100)])]
      }
    );

    this.formData.patchValue({
      source: this.data.source,
      searchParameters: this.data.searchParameters
    });

  }

  trimInput(data) {
    this.formData.patchValue({
      searchParameters: data.searchParameters.trim().replace(/ +/g, ' ')
    });
  }

  isSourceDisabled(source) {
    return this.disabledConditionSources.indexOf(source) > -1 ? true : false;
  }

  onDialogClose(action) {
    if (action) {
      this.updateConditionData['source'] = this.formData.controls.source.value;
      if (this.formData.controls.source.value !== 'css') {
        this.updateConditionData['searchParameters'] = this.formData.controls.searchParameters.value;
      }
      this.formData.value['tobeUpdated'] = action;
      this.dialogRef.close(this.formData.value);
      this.store.dispatch(new ruleActions.EditRuleAttribute(this.data.graphId, 'conditions', this.updateConditionData));
      this.formData.value['tobeUpdated'] = action;
      this.dialogRef.close(this.formData.value);
    } else {
      this.formData.value['tobeUpdated'] = false;
      this.dialogRef.close(this.formData.value);
    }
  }
}
