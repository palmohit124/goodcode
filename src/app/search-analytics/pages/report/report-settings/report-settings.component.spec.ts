import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { MatSelectModule, MatSlideToggleModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { reducers } from '../../../reducers';
import * as fromRoot from '../../../../core/reducers';
import { ReportSettings } from '../../../../models/report';

import { ReportSettingsComponent } from './report-settings.component';
import { OmniCardHeaderComponent } from '../../../../shared/components';
import { TimeZoneService } from '../../../../core/services/time-zone/time-zone.service';
import { reportActions } from '../../../actions/index';

import SpyObj = jasmine.SpyObj;

const mockReportSettings: ReportSettings = {
  timezone: 'America/St_Johns',
  defaultCTN: '5627',
  callDuration: '45',
  conversionSource: 'external',
  clickToCall: true,
  validFrom: '2011-12-03',
  validTo: '2018-12-03'
};

describe('ReportSettingsComponent', () => {
  let component: ReportSettingsComponent;
  let fixture: ComponentFixture<ReportSettingsComponent>;
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
      declarations: [ReportSettingsComponent, OmniCardHeaderComponent],
      imports: [
        FormsModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatCardModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'searchAnalytics': combineReducers(reducers)
        })
      ],
      providers: [
        { provide: TimeZoneService, useValue: mockTimeZoneService }
      ]
    })
      .compileComponents();

    mockTimeZoneService.loadTimeZone.and.returnValue(Observable.of(tzList));
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(ReportSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ReportScheduleComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('when a report setting load is successful', () => {
    beforeEach(() => { store.dispatch(new reportActions.LoadReportSettingsSuccess(mockReportSettings)); });
    it('should get report setting', () => {
      expect(component.formData.value['callDuration']).toEqual(mockReportSettings.callDuration);
    });
  });
});
