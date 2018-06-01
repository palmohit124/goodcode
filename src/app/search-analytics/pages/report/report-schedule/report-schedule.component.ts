import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import * as _ from 'lodash';

import {InitialReportSchedule, InitialReportSettings, ReportSchedule} from '../../../../models/report';
import {Customer} from '../../../../models/customer';
import {EmptyTimeZoneOffsetList, TimeZoneOffsetList} from '../../../../models/time-zone';

import {getSelectedCustomers} from '../../../../core/reducers';
import {reportActions} from '../../../actions';
import {getReportState, SearchAnalyticsState} from '../../../reducers';
import {OmniConfirmationComponent} from '../../../../shared/components';
import {TimeZoneService} from '../../../../core/services/time-zone/time-zone.service';

@Component({
  selector: 'omni-report-schedule',
  templateUrl: './report-schedule.component.html',
  styleUrls: ['./report-schedule.component.scss']
})
export class ReportScheduleComponent implements OnInit, OnDestroy {
  formData: FormGroup;
  tzOffsetList: TimeZoneOffsetList = EmptyTimeZoneOffsetList;

  confirmationDialogRefSubscription: Subscription;

  selectedCustomerSubscription: Subscription;
  selectedCustomer: Customer;

  reportScheduleSubscription: Subscription;

  canBeDeleted: boolean = false;
  reportTimes: string[] = [
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00'
  ];

  public startTime: string[] = this.reportTimes.slice(0, this.reportTimes.length - 3);
  public deliverByTime: string[];

  public hasReportSettings: boolean = false;

  constructor(
    public store: Store<SearchAnalyticsState>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private timeZoneService: TimeZoneService
  ) {
    this.selectedCustomerSubscription = this.store
      .select(getSelectedCustomers)
      .subscribe(customer => {
        this.selectedCustomer = customer;
        if (this.selectedCustomer) {
          this.loadReportSchedule();
        }
      });
  }

  ngOnInit() {

    this.formData = this.formBuilder.group({
      timezone: [InitialReportSchedule.timezone, Validators.required],
      startTime: [InitialReportSchedule.startTime, Validators.required],
      deliverByTime: [InitialReportSchedule.deliverByTime, Validators.required],
      status: [InitialReportSchedule.status, Validators.required]
    });

    this.reportScheduleSubscription = this.store.select(getReportState).subscribe(state => {
      if (state.reportSettings != null && state.reportSettings !== InitialReportSettings) { this.hasReportSettings = true; }

      this.deliverByTime = [];
      if (state.reportSchedule.startTime) {
        this.setReportDeliverByTime();
        this.canBeDeleted = true;
      } else {
        this.canBeDeleted = false;
      }
      this.formData.controls['timezone'].setValue(state.reportSchedule.timezone, { emitEvent: false });
      this.formData.controls['startTime'].setValue(state.reportSchedule.startTime, { emitEvent: true });
      this.formData.controls['deliverByTime'].setValue(state.reportSchedule.deliverByTime, { emitEvent: false });
      this.formData.controls['status'].setValue(state.reportSchedule.status, { emitEvent: false });
    });

    this.timeZoneService.loadTimeZone()
      .subscribe(timeZones => this.tzOffsetList = timeZones);
  }

  setReportDeliverByTime() {
    const startTime = this.formData.controls['startTime'].value;
    const startIndex = _.indexOf(this.reportTimes, startTime);
    this.deliverByTime = this.reportTimes.slice(startIndex + 3);
    this.formData.controls['deliverByTime'].setValue(this.reportTimes[startIndex + 3]);
  }

  loadReportSchedule() {
    this.store.dispatch(new reportActions.LoadReportSchedule(this.selectedCustomer.id));
  }

  updateReportSchedule(reportSchedule: ReportSchedule) {
    this.store.dispatch(new reportActions.UpdateReportSchedule(this.selectedCustomer.id, reportSchedule));
  }

  removeSchedule(form: NgForm) {
    const dialogRef = this.dialog.open(OmniConfirmationComponent, {
      data: {
        title: 'Are you sure you want to delete this schedule?'
      }
    });

    this.confirmationDialogRefSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        form.reset();
        this.store.dispatch(new reportActions.RemoveReportSchedule(this.selectedCustomer.id));
      }
    });
  }

  ngOnDestroy() {
    if (this.selectedCustomerSubscription) {
      this.selectedCustomerSubscription.unsubscribe();
    }

    if (this.reportScheduleSubscription) {
      this.reportScheduleSubscription.unsubscribe();
    }

    if (this.confirmationDialogRefSubscription) {
      this.confirmationDialogRefSubscription.unsubscribe();
    }
  }
}
