import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { InitialReportSettings, ReportSettings } from '../../../../models/report';
import { TimeZoneOffsetList, EmptyTimeZoneOffsetList } from '../../../../models/time-zone';
import { Customer } from '../../../../models/customer';
import { CustomValidators } from '../../../../shared/Form/custom.validators';

import { getSelectedCustomers } from '../../../../core/reducers';
import { SearchAnalyticsState, getReportState } from '../../../reducers';
import { reportActions } from '../../../actions';

import { TimeZoneService } from '../../../../core/services/time-zone/time-zone.service';

@Component({
  selector: 'omni-report-settings',
  templateUrl: './report-settings.component.html',
  styleUrls: ['./report-settings.component.scss']
})

export class ReportSettingsComponent implements OnInit, OnDestroy {
  tzOffsetList: TimeZoneOffsetList = EmptyTimeZoneOffsetList;

  selectedCustomerSubscription: Subscription;
  selectedCustomer: Customer;

  reportSettingsSubscription: Subscription;
  formData: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public store: Store<SearchAnalyticsState>,
    private timeZoneService: TimeZoneService
  ) {
    this.selectedCustomerSubscription = this.store.select(getSelectedCustomers).subscribe(customer => {
      this.selectedCustomer = customer;
      if (this.selectedCustomer) {
        this.loadReportSetting();
      }
    });
  }

  ngOnInit() {
    this.formData = this.formBuilder.group(
      {
        timezone: [InitialReportSettings.timezone, Validators.required],
        callDuration: [InitialReportSettings.callDuration, Validators.compose([Validators.required, CustomValidators.greaterThanOrEqualTo(0)])],
        clickToCall: [InitialReportSettings.clickToCall, Validators.required],
        defaultCTN: [InitialReportSettings.defaultCTN, CustomValidators.validTel()],
        conversionSource: [InitialReportSettings.conversionSource, Validators.required],
      }
    );

    this.reportSettingsSubscription = this.store.select(getReportState).subscribe(state => {
      this.formData.controls['timezone'].setValue(state.reportSettings.timezone, { emitEvent: false });
      this.formData.controls['callDuration'].setValue(state.reportSettings.callDuration, { emitEvent: false });
      this.formData.controls['clickToCall'].setValue(state.reportSettings.clickToCall, { emitEvent: false });
      this.formData.controls['defaultCTN'].setValue(state.reportSettings.defaultCTN, { emitEvent: false });
      this.formData.controls['conversionSource'].setValue(state.reportSettings.conversionSource, { emitEvent: false });
    });

    this.timeZoneService.loadTimeZone()
      .subscribe(timeZones => this.tzOffsetList = timeZones);
  }

  loadReportSetting() {
    this.store.dispatch(new reportActions.LoadReportSettings(this.selectedCustomer.id));
  }

  updateReport(reportSettings: ReportSettings) {
    const currentISODateUTC = new Date().toISOString().slice(0, 10);
    reportSettings.validFrom = currentISODateUTC;
    reportSettings.validTo = (Number.parseInt(currentISODateUTC.slice(0, 4)) + 50) + currentISODateUTC.slice(4);
    this.store.dispatch(new reportActions.UpdateReportSettings(this.selectedCustomer.id, reportSettings));
  }

  ngOnDestroy() {
    if (this.selectedCustomerSubscription) {
      this.selectedCustomerSubscription.unsubscribe();
    }
    if (this.reportSettingsSubscription) {
      this.reportSettingsSubscription.unsubscribe();
    }
  }

}
