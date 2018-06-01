import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ruleActions } from '../../../../../actions';
import { TagManagementState } from '../../../../../reducers';
import { CustomValidators } from '../../../../../../shared/Form/custom.validators';

@Component({
  selector: 'omni-refdom-dialog',
  templateUrl: './refdom-dialog.component.html',
  styleUrls: ['./refdom-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class RefdomDialogComponent implements OnInit {
  formData: FormGroup;
  sources: any = [];
  updateRefdomData: object = {};
  sourcesArr: any = [];
  domain: string;

  constructor(
    public dialogRef: MatDialogRef<RefdomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private store: Store<TagManagementState>
  ) { }

  ngOnInit() {
    this.formData = this.formBuilder.group(
      {
        domain: ['', Validators.compose([
          Validators.required, CustomValidators.alphaNumericOnly(),
          CustomValidators.checkCharacterLimit(3, 100)])],
        sources: this.formBuilder.array([this.createSource()])
      }
    );
    this.domain = this.data.domain === 'any' ? this.data.domain : 'specific';
    this.formData.patchValue({
      domain: this.data.domain !== 'any' ? this.data.domain : ''
    });

    this.sources = [];

    for (let i = 0; i < this.data.sources.length; i++) {
      this.sources = this.formData.get('sources') as FormArray;
      this.sources.push(this.createSource());
      this.formData.get('sources')['controls'][i].controls.source.value = this.data.sources[i];
    }

    if (this.domain === 'specific') {
      this.sources.controls.splice(this.data.sources.length, 1);
    }
  }

  createSource(): FormGroup {
    return this.formBuilder.group({
      source: ['', Validators.compose([
        Validators.required, CustomValidators.notValidUrl(),
        CustomValidators.checkCharacterLimit(3, 100)])]
    });
  }
  trimInput(data) {
    this.formData.patchValue({
      domain: data.domain.trim().replace(/ +/g, ' ')
    });
  }

  addSource() {
    this.sources = this.formData.get('sources') as FormArray;
    this.sources.push(this.createSource());
  }

  removeSource(index) {
    this.sources.removeAt(index);
  }

  submitForm(action) {
    if (action) {
      if (this.domain === 'any') {
        this.updateRefdomData['domain'] = 'any';
      } else {
        this.updateRefdomData['domain'] = this.formData.controls.domain.value;
        this.sourcesArr = [];
        this.formData.controls.sources.value.map(sourceObj => {
          this.sourcesArr.push(sourceObj.source);
        });
        this.updateRefdomData['sources'] = this.sourcesArr;

      }
      this.store.dispatch(new ruleActions.EditRuleAttribute(this.data.graphId, 'refdom', this.updateRefdomData));
      this.formData.value['tobeUpdated'] = action;
      this.dialogRef.close(this.formData.value);
    } else {
      this.formData.value['tobeUpdated'] = false;
      this.dialogRef.close(this.formData.value);
    }
  }

}
