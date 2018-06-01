import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { reportActions } from '../actions';
import { ReportService } from '../services/report/report.service';
import { ToastService } from '../../core/services/toastr/toast.service';
import { WindowRef } from '../../core/providers/window-ref.provider';

@Injectable()
export class ReportEffects {

  constructor(
    private actions$: Actions,
    private reportService: ReportService,
    private toastrService: ToastService,
    @Inject(WindowRef) private windowRef: Window) {
  }

  @Effect()
  loadReportSchedule$ =
    this.actions$
      .pipe(
        ofType(reportActions.LOAD_REPORT_SCHEDULE),
        switchMap((c: reportActions.LoadReportSchedule) =>
          this.reportService
            .loadReportSchedule(c.id)
            .pipe(
              map(result => new reportActions.LoadReportScheduleSuccess(result)),
              catchError(error => Observable.of(new reportActions.LoadReportScheduleFail(error)))
            )
        )
    );

  @Effect()
  loadReportSetting$ =
    this.actions$
      .pipe(
        ofType(reportActions.LOAD_REPORT_SETTINGS),
        switchMap((c: reportActions.LoadReportSettings) =>
          this.reportService
            .loadReportSettings(c.id)
            .pipe(
              map(result => new reportActions.LoadReportSettingsSuccess(result)),
              catchError(error => Observable.of(new reportActions.LoadReportSettingsFail(error)))
            )
        )
    );

  @Effect()
  updateReportSetting$ =
    this.actions$
    .pipe(
        ofType(reportActions.UPDATE_REPORT_SETTINGS),
        switchMap((c: reportActions.UpdateReportSettings) =>
          this.reportService
            .updateReportSettings(c.id, c.reportSettings)
            .pipe(
              map(result => new reportActions.UpdateReportSettingsSuccess(result)),
              catchError(error => Observable.of(new reportActions.UpdateReportSettingsFail(error)))
            )
        )
    );

  @Effect({ dispatch: false })
  updateReportSettingSuccess$ =
    this.actions$
    .pipe(
      ofType(reportActions.UPDATE_REPORT_SETTINGS_SUCCESS),
      tap(() => this.toastrService.show('Report setting updated successfully', 'Congratulations !!', 'success'))
    );

  @Effect({ dispatch: false })
  updateReportSettingsFail$ =
    this.actions$
    .pipe(
      ofType(reportActions.UPDATE_REPORT_SETTINGS_FAIL),
      tap(() => this.toastrService.show('There was a problem updating report setting', 'Sorry !!', 'error'))
    );

  @Effect()
  updateReportSchedule$ =
    this.actions$
      .pipe(
        ofType(reportActions.UPDATE_REPORT_SCHEDULE),
        switchMap((c: reportActions.UpdateReportSchedule) =>
          this.reportService
            .updateReportSchedule(c.id, c.reportSchedule)
            .pipe(
              map(result => new reportActions.UpdateReportScheduleSuccess(result)),
              catchError(error => Observable.of(new reportActions.UpdateReportScheduleFail(error)))
            )
        )
    );

  @Effect({ dispatch: false })
  UpdateReportScheduleSuccess$ =
    this.actions$
      .pipe(
        ofType(reportActions.UPDATE_REPORT_SCHEDULE_SUCCESS),
        tap(() => this.toastrService.show('Report schedule updated successfully', 'Congratulations !!', 'success'))
      );

  @Effect({ dispatch: false })
  updateReportScheduleFail$ =
    this.actions$
      .pipe(
        ofType(reportActions.UPDATE_REPORT_SCHEDULE_FAIL),
        tap(() => this.toastrService.show('There was a problem updating report schedule', 'Sorry !!', 'error'))
      );

  @Effect()
  removeReportSchedule$ =
    this.actions$
      .pipe(
        ofType(reportActions.REMOVE_REPORT_SCHEDULE),
        switchMap((c: reportActions.RemoveReportSchedule) =>
          this.reportService
            .removeReportSchedule(c.id)
            .pipe(
              map(result => new reportActions.RemoveReportScheduleSuccess(c.id)),
              catchError(error => Observable.of(new reportActions.RemoveReportScheduleFail(error)))
            )
        )
    );

  @Effect()
  removeReportScheduleSuccess$ =
    this.actions$
    .pipe(
      ofType(reportActions.REMOVE_REPORT_SCHEDULE_SUCCESS),
      map((c: reportActions.RemoveReportScheduleSuccess) => {
        this.toastrService.show('Report schedule removed successfully', 'Congratulations !!', 'success');
        return new reportActions.LoadReportSchedule(c.id);
      })
    );

  @Effect({ dispatch: false })
  removeReportScheduleFail$ =
    this.actions$
      .pipe(
        ofType(reportActions.REMOVE_REPORT_SCHEDULE_FAIL),
        tap(() => this.toastrService.show('There was a problem removing the report schedule', 'Sorry !!', 'error'))
      );

  @Effect()
  loadReportPlatform$ =
    this.actions$
      .pipe(
        ofType(reportActions.LOAD_REPORT_PLATFORM),
        switchMap((c: reportActions.LoadReportPlatform) =>
          this.reportService
            .loadReportPlatforms(c.id)
            .pipe(
              map(result => new reportActions.LoadReportPlatformSuccess(result)),
              catchError(error => Observable.of(new reportActions.LoadReportPlatformFail(error)))
            )
        )
    );

  @Effect()
  downloadReport$ =
    this.actions$
      .pipe(
        ofType(reportActions.DOWNLOAD_REPORT),
        switchMap((c: reportActions.DownloadReport) =>
          this.reportService
            .getReportDownloadUrl(c.id, c.payload)
            .pipe(
              map(result => new reportActions.DownloadReportSuccess(result)),
              catchError(error => Observable.of(new reportActions.DownloadReportFail(error)))
            )
        )
    );

  @Effect({ dispatch: false })
  downloadReportSuccess$ =
    this.actions$
      .pipe(
        ofType(reportActions.DOWNLOAD_REPORT_SUCCESS),
        map((c: reportActions.DownloadReportSuccess) => {
          this.windowRef.open(c.url);
        })
      );

  @Effect({ dispatch: false })
  downloadReportFail$ =
    this.actions$
    .pipe(
      ofType(reportActions.DOWNLOAD_REPORT_FAIL),
      tap(() => this.toastrService.show('There was a problem downloading report', 'Sorry !!', 'error'))
    );
}

