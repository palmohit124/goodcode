import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, combineReducers } from '@ngrx/store';
import { MatDialogModule, MatTabsModule, MatPaginatorModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatNativeDateModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { reducers } from '../../../reducers';
import * as fromRoot from '../../../../core/reducers';

import { SearchAnalyticsSummaryComponent } from './search-analytics-summary.component';
import { AccountsCardComponent } from '../accounts-card/accounts-card.component';
import { OmniCustomerEditComponent } from '../omni-customer-edit/omni-customer-edit.component';
import {
  SearchAccountsCardContentComponent, PlatformAccountsCardContentComponent,
  ReportsCardComponent, ReportCardContentComponent, SearchCampaignsCardComponent,
  OnboardCampaignComponent, OnboardStatusComponent
} from '../../../pages';
import { OmniCardHeaderComponent, OmniSearchComponent } from '../../../../shared/components';
import { ClientConfigService } from '../../../../core/services/client-config/client-config.service';
import { WindowRef } from '../../../../core/providers/window-ref.provider';

describe('SearchAnalyticsSummaryComponent', () => {
  let component: SearchAnalyticsSummaryComponent;
  let fixture: ComponentFixture<SearchAnalyticsSummaryComponent>;
  const mockWindow: Window = jasmine.createSpyObj('Window', ['open']);

  beforeEach(async(() => {
    const clientConfigServiceStub = {
      get() {
        const routes = {
          routes: {
            routesWithoutNav: []
          }
        };
        return routes;
      }
    };

    TestBed.configureTestingModule({
      declarations: [
        SearchAnalyticsSummaryComponent,
        AccountsCardComponent,
        SearchAccountsCardContentComponent,
        OmniCardHeaderComponent,
        OmniSearchComponent,
        PlatformAccountsCardContentComponent,
        ReportsCardComponent,
        ReportCardContentComponent,
        SearchCampaignsCardComponent,
        OnboardCampaignComponent,
        OnboardStatusComponent,
        OmniCustomerEditComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatPaginatorModule,
        MatDialogModule,
        MatCardModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatNativeDateModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'searchAnalytics': combineReducers(reducers)
        }),
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ClientConfigService, useValue: clientConfigServiceStub },
        { provide: WindowRef, useValue: mockWindow },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAnalyticsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create SearchAnalyticsSummaryComponent', () => {
    expect(component).toBeTruthy();
  });
});
