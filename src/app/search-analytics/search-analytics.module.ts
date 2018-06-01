import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import { SearchAnalyticsRoutingModule } from './search-analytics-routing.module';

import { SearchAccountService } from './services/search-account/search-account.service';
import { OauthClientService } from './services/oauth-client/oauth-client.service';
import { SearchIntegrationService } from './services/search-integration/search-integration.service';
import { PlatformAccountService } from './services/platform-account/platform-account.service';
import { ReportService } from './services/report/report.service';
import { SearchCampaignService } from './services/search-campaign/search-campaign.service';

import { reducers } from './reducers';
import { SearchAccountEffects, SearchIntegrationEffects, PlatformAccountEffects, ReportEffects, SearchCampaignEffects } from './effects';

import {
  SearchAnalyticsSummaryComponent,
  AccountsCardComponent,
  SearchAccountsCardContentComponent,
  SearchAccountsDetailComponent,
  SearchIntegrationListComponent,
  PlatformAccountsCardContentComponent,
  PlatformAccountsDetailComponent,
  UnlinkedPlatformParentAccountsModalComponent,
  UnlinkedPlatformChildAccountsModalComponent,
  ReportsCardComponent,
  ReportCardContentComponent,
  ReportDetailComponent,
  ReportSettingsComponent,
  ReportScheduleComponent,
  SearchCampaignsCardComponent,
  OnboardStatusComponent,
  OnboardCampaignComponent,
  OmniCustomerEditComponent
} from './pages';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpServiceInterceptor } from '../shared/interceptor/http-service-interceptor';

@NgModule({
  imports: [
    SharedModule,
    SearchAnalyticsRoutingModule,
    StoreModule.forFeature('searchAnalytics', reducers),
    EffectsModule.forFeature([SearchAccountEffects, SearchIntegrationEffects, PlatformAccountEffects, ReportEffects, SearchCampaignEffects])
  ],
  providers: [
    SearchAccountService,
    OauthClientService,
    SearchIntegrationService,
    PlatformAccountService,
    ReportService,
    SearchCampaignService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpServiceInterceptor,
      multi: true
    }
  ],
  declarations: [
    SearchAnalyticsSummaryComponent,
    AccountsCardComponent,
    SearchAccountsCardContentComponent,
    SearchAccountsDetailComponent,
    SearchIntegrationListComponent,
    PlatformAccountsCardContentComponent,
    PlatformAccountsDetailComponent,
    UnlinkedPlatformParentAccountsModalComponent,
    UnlinkedPlatformChildAccountsModalComponent,
    ReportsCardComponent,
    ReportCardContentComponent,
    ReportDetailComponent,
    ReportSettingsComponent,
    ReportScheduleComponent,
    SearchCampaignsCardComponent,
    OnboardStatusComponent,
    OnboardCampaignComponent,
    OmniCustomerEditComponent
  ],
  entryComponents: [
    UnlinkedPlatformParentAccountsModalComponent,
    UnlinkedPlatformChildAccountsModalComponent
  ]
})
export class SearchAnalyticsModule { }
