import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {cold, hot} from 'jasmine-marbles';
import {ReportEffects} from './report.effects';
import {reportActions} from '../actions';
import {ReportService} from '../services/report/report.service';
import {ToastService} from '../../core/services/toastr/toast.service';
import {ToastrModule} from 'ngx-toastr';
import {InitialReportSchedule, InitialReportSettings, ReportSchedule, ReportSettings} from '../../models/report';
import {WindowRef} from '../../core/providers/window-ref.provider';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import SpyObj = jasmine.SpyObj;

const mockReportSchedule: ReportSchedule = {
  startTime: '05:00',
  deliverByTime: '12:00',
  timezone: 'America/St_Johns',
  status: 'Active',
};

const mockReportSetting: ReportSettings = {
  timezone: 'America/St_Johns',
  defaultCTN: '5627',
  callDuration: '45',
  conversionSource: 'external',
  clickToCall: true,
  validFrom: '2011-12-03',
  validTo: '2018-12-03'
};

describe('Report Effects', () => {

  let effects: ReportEffects;
  let actions: Observable<any>;
  let reportService: SpyObj<ReportService>;

  beforeEach(() => {
    reportService = jasmine.createSpyObj('ReportService', ['loadReportSchedule', 'loadReportSettings']);
    const mockWindow: Window = jasmine.createSpyObj('Window', ['open']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ToastrModule.forRoot()
      ],
      providers: [
        ReportEffects,
        provideMockActions(() => actions),
        { provide: ReportService, useValue: reportService },
        { provide: WindowRef, useValue: mockWindow },
        ToastService,
      ],
    });

    effects = TestBed.get(ReportEffects);
  });

  describe('when a LOAD Report Schedule action is observed', () => {
    describe('and the report service responds with the report schedule', () => {
      it('should dispatch a load report schedule succeeded action with the report schedule', () => {
        const reportSchedule: ReportSchedule = mockReportSchedule;
        reportService.loadReportSchedule.and.returnValue(Observable.of(reportSchedule));
        actions = hot('a', { a: new reportActions.LoadReportSchedule('') });
        const expected = cold('a', { a: new reportActions.LoadReportScheduleSuccess(reportSchedule) });
        expect(effects.loadReportSchedule$).toBeObservable(expected);
      });
    });

    describe('when no report schedule state is currently stored', () => {
      it('should dispatch a load report schedule succeeded action with the empty report schedule', () => {
        reportService.loadReportSchedule.and.returnValue(Observable.of(InitialReportSchedule));
        actions = hot('a', { a: new reportActions.LoadReportSchedule('') });
        const expected = cold('a', { a: new reportActions.LoadReportScheduleSuccess(InitialReportSchedule) });
        expect(effects.loadReportSchedule$).toBeObservable(expected);
      });
    });

    describe('when the service fails', () => {
      it('should emit a load report schedule failed Action', () => {
        reportService.loadReportSchedule.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new reportActions.LoadReportSchedule('')});
        const expected = cold('a', { a: new reportActions.LoadReportScheduleFail('An error') });
        expect(effects.loadReportSchedule$).toBeObservable(expected);
      });
    });
  });

  describe('when a LOAD Report Setting action is observed', () => {
    describe('and the report service responds with the report setting', () => {
      it('should dispatch a load report setting succeeded action with the report setting', () => {
        const reportSettings: ReportSettings = mockReportSetting;
        reportService.loadReportSettings.and.returnValue(Observable.of(reportSettings));
        actions = hot('a', { a: new reportActions.LoadReportSettings('') });
        const expected = cold('a', { a: new reportActions.LoadReportSettingsSuccess(reportSettings) });
        expect(effects.loadReportSetting$).toBeObservable(expected);
      });
    });

    describe('when no report setting state is currently stored', () => {
      it('should dispatch a load report setting succeeded action with the empty report setting', () => {
        reportService.loadReportSettings.and.returnValue(Observable.of(InitialReportSettings));
        actions = hot('a', { a: new reportActions.LoadReportSettings('') });
        const expected = cold('a', { a: new reportActions.LoadReportSettingsSuccess(InitialReportSettings) });
        expect(effects.loadReportSetting$).toBeObservable(expected);
      });
    });

    describe('when the service fails', () => {
      it('should emit a load report setting failed Action', () => {
        reportService.loadReportSettings.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new reportActions.LoadReportSettings('')});
        const expected = cold('a', { a: new reportActions.LoadReportSettingsFail('An error') });
        expect(effects.loadReportSetting$).toBeObservable(expected);
      });
    });
  });
});
