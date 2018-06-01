import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MatSelectModule, MatSlideToggleModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import * as fromRoot from '../../../../core/reducers';
import { reducers } from '../../../reducers';

import { ReportDetailComponent } from './report-detail.component';
import { ReportSettingsComponent } from '../report-settings/report-settings.component';
import { ReportScheduleComponent } from '../report-schedule/report-schedule.component';
import { OmniCardHeaderComponent } from '../../../../shared/components';
import { TimeZoneService } from '../../../../core/services/time-zone/time-zone.service';

import SpyObj = jasmine.SpyObj;

describe('ReportDetailComponent', () => {
  let component: ReportDetailComponent;
  let fixture: ComponentFixture<ReportDetailComponent>;
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
      declarations: [
        ReportDetailComponent,
        ReportSettingsComponent,
        ReportScheduleComponent,
        OmniCardHeaderComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'searchAnalytics': combineReducers(reducers)
        }),
        BrowserAnimationsModule
      ],
      providers: [
        { provide: TimeZoneService, useValue: mockTimeZoneService }
      ]
    })
    .compileComponents();

    mockTimeZoneService.loadTimeZone.and.returnValue(Observable.of(tzList));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ReportDetailComponent', () => {
    expect(component).toBeTruthy();
  });
});
