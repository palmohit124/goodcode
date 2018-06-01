import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import {  MatNativeDateModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';

import * as fromRoot from '../../../../core/reducers';
import { reducers,  } from '../../../reducers';
import { ReportSchedule, ReportSettings, ReportPlatforms } from '../../../../models/report';

import { OmniCardHeaderComponent } from '../../../../shared/components';
import { ReportCardContentComponent } from './report-card-content.component';
import { reportActions } from '../../../actions/index';

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

const mockReportPlatforms: ReportPlatforms = {
  linkedReportPlatforms: ['']
};

describe('ReportCardContentComponent', () => {
  let component: ReportCardContentComponent;
  let fixture: ComponentFixture<ReportCardContentComponent>;
  let store: Store<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReportCardContentComponent,
        OmniCardHeaderComponent
      ],
      imports: [
        FormsModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'searchAnalytics': combineReducers(reducers)
        }),
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(ReportCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ReportCardContentComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('when a report schedule load is successful', () => {
    beforeEach(() => { store.dispatch(new reportActions.LoadReportScheduleSuccess(mockReportSchedule)); });
    it('should get report schedule', () => {
      component.reportState$.subscribe(p => expect(p.reportSchedule).toEqual(mockReportSchedule));
    });
  });

  describe('when a report setting load is successful', () => {
    beforeEach(() => { store.dispatch(new reportActions.LoadReportSettingsSuccess(mockReportSetting)); });
    it('should get report setting', () => {
      component.reportState$.subscribe(p => expect(p.reportSettings).toEqual(mockReportSetting));
    });
  });

  describe('when a report platform load is successful', () => {
    beforeEach(() => { store.dispatch(new reportActions.LoadReportPlatformSuccess(mockReportPlatforms)); });
    it('should get report platforms', () => {
      component.reportState$.subscribe(p => expect(p.reportPlatforms).toEqual(mockReportPlatforms));
    });
  });
});
