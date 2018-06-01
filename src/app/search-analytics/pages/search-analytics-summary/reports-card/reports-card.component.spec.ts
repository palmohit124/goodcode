import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatNativeDateModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';

import * as fromRoot from '../../../../core/reducers';
import { reducers } from '../../../reducers';

import { ReportsCardComponent } from './reports-card.component';
import { OmniCardHeaderComponent } from '../../../../shared/components';
import { ReportCardContentComponent } from '../../../pages';

describe('ReportsCardComponent', () => {
  let component: ReportsCardComponent;
  let fixture: ComponentFixture<ReportsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReportsCardComponent,
        OmniCardHeaderComponent,
        ReportCardContentComponent
      ],
      imports: [
        FormsModule,
        MatCardModule,
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
    fixture = TestBed.createComponent(ReportsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ReportsCardComponent', () => {
    expect(component).toBeTruthy();
  });
});
