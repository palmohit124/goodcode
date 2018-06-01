import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { MatSelectModule, MatSlideToggleModule, MatCardModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';

import { reducers } from '../../../reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as fromRoot from '../../../../core/reducers';
import {ReportSchedule, ReportSettings} from '../../../../models/report';

import { ReportScheduleComponent } from './report-schedule.component';
import { OmniCardHeaderComponent } from '../../../../shared/components';
import { TimeZoneService } from '../../../../core/services/time-zone/time-zone.service';
import { reportActions } from '../../../actions/index';

import SpyObj = jasmine.SpyObj;

const reportSchedule: ReportSchedule = {
  startTime: '05:00',
  deliverByTime: '12:00',
  timezone: 'America/St_Johns',
  status: 'Active',
};

describe('ReportScheduleComponent', () => {
  let component: ReportScheduleComponent;
  let fixture: ComponentFixture<ReportScheduleComponent>;
  let store: Store<any>;
  let mockTimeZoneService: SpyObj<TimeZoneService>;

  const tzList = {
    timeZoneOffsets: [
      { name: 'UTC-7', timeZones: ['America/Phoenix'] },
      { name: 'UTC-8/-7', timeZones: ['America/Vancouver'] }
    ]
  };

  beforeEach(async(() => {
    mockTimeZoneService = jasmine.createSpyObj('TimeZoneService', ['loadTimeZone']);
    TestBed.configureTestingModule({
      declarations: [ReportScheduleComponent, OmniCardHeaderComponent],
      imports: [
        FormsModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatCardModule,
        MatDialogModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'searchAnalytics': combineReducers(reducers)
        })
      ],
      providers: [
        { provide: TimeZoneService, useValue: mockTimeZoneService }
      ]
    }).compileComponents();

    mockTimeZoneService.loadTimeZone.and.returnValue(Observable.of(tzList));

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(ReportScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create ReportScheduleComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('when a report schedule load is successful', () => {
    it('should get report schedule', () => {
      store.dispatch(new reportActions.LoadReportScheduleSuccess(reportSchedule));
      expect(component.formData.value['startTime']).toEqual(reportSchedule.startTime);
    });
  });
  describe('when report settings have not been defined for the customer', () => {
    it('should not display the form for entering report schedule', () => {
      // expect that the component's value for hasReportSettings is false
      expect(component.hasReportSettings).toBe(false);
      const body = fixture.nativeElement.querySelector('.report-schedule-display').innerText;
      expect(body).toContain('Please define Report Settings before creating a Report Schedule.');
    });
  });
  describe('when report settings are initially not defined, but then are created', () => {
    it('should change to show the report schedule form to the user', () => {
      const reportSettings: ReportSettings = {
        timezone: 'tz',
        defaultCTN: 'ctn',
        callDuration: 'duration',
        conversionSource: 'string',
        clickToCall: true,
        validFrom: 'from',
        validTo: 'to'
      };
      store.dispatch(new reportActions.LoadReportSettingsSuccess(reportSettings));
      fixture.detectChanges();
      expect(component.hasReportSettings).toBe(true);
      const body = fixture.nativeElement.querySelector('.report-schedule-display').innerText;
      expect(body).toContain('Timezone');
      expect(body).toContain('Delivery Time Window');
    });
  });
});
