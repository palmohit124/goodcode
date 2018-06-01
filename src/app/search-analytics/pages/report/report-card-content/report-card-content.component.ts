import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Customer } from '../../../../models/customer';
import { getSelectedCustomers } from '../../../../core/reducers';
import { reportActions } from '../../../actions';
import { SearchAnalyticsState, report, getReportState } from '../../../reducers';

@Component({
  selector: 'omni-report-card-content',
  templateUrl: './report-card-content.component.html',
  styleUrls: ['./report-card-content.component.scss']
})
export class ReportCardContentComponent implements OnDestroy {

  reportState$: Observable<report.ReportState>;
  selectedCustomerSubscription: Subscription;
  selectedCustomer: Customer;

  startDate: Date;
  endDate: Date;
  reportPlatform: string = '';

  constructor(
    public store: Store<SearchAnalyticsState>,
    public router: Router
  ) {
    this.reportState$ = this.store.select(getReportState);
    this.selectedCustomerSubscription = this.store.select(getSelectedCustomers).subscribe(customer => {
      this.selectedCustomer = customer;
      if (this.selectedCustomer) {
        this.loadReport();
      }
    });
  }

  navigate() {
    this.router.navigate(['search-analytics/report']);
  }

  loadReport() {
    this.store.dispatch(new reportActions.LoadReportSchedule(this.selectedCustomer.id));
    this.store.dispatch(new reportActions.LoadReportSettings(this.selectedCustomer.id));
    this.store.dispatch(new reportActions.LoadReportPlatform(this.selectedCustomer.id));
  }

  downloadReport() {
    this.store.dispatch(new reportActions.DownloadReport(this.selectedCustomer.id, {
      startDate: this.startDate.toLocaleDateString(),
      endDate: this.endDate.toLocaleDateString(),
      platform: this.reportPlatform
    }));
  }

  ngOnDestroy() {
    if (this.selectedCustomerSubscription) {
      this.selectedCustomerSubscription.unsubscribe();
    }
  }
}
