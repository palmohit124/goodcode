import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as searchAccount from './search-account.reducer';
import * as searchIntegration from './search-integration.reducer';
import * as platformAccount from './platform-account.reducer';
import * as report from './report.reducer';
import * as searchCampaign from './search-campaign.reducer';

export { searchAccount, searchIntegration, platformAccount, report, searchCampaign };

export const getSearchAnalyticsState = createFeatureSelector<SearchAnalyticsState>('searchAnalytics');
export const getSearchAccountState = createSelector(getSearchAnalyticsState, (state) => state.searchAccount);
export const getSearchAccountActionStatus = createSelector(getSearchAnalyticsState, (state) => state.searchAccount.searchAccountAction);
export const getSearchIntegrationState = createSelector(getSearchAnalyticsState, (state) => state.searchIntegration);
export const getSearchIntegrationActionStatus = createSelector(getSearchAnalyticsState, (state) => state.searchIntegration.searchIntegrationAction);
export const getPlatformAccountState = createSelector(getSearchAnalyticsState, (state) => state.platformAccount);
export const getPlatformAccountActionStatus = createSelector(getSearchAnalyticsState, (state) => state.platformAccount.platformAccountAction);
export const getReportState = createSelector(getSearchAnalyticsState, (state) => state.report);
export const getSearchCampaignState = createSelector(getSearchAnalyticsState, (state) => state.searchCampaign);
export const getSearchCampaignActionStatus = createSelector(getSearchAnalyticsState, (state) => state.searchCampaign.searchCampaignAction);

export interface SearchAnalyticsState {
  searchAccount: searchAccount.SearchAccountState;
  searchIntegration: searchIntegration.SearchIntegrationState;
  platformAccount: platformAccount.PlatformAccountState;
  report: report.ReportState;
  searchCampaign: searchCampaign.SearchCampaignState;
}

export const reducers = {
  searchAccount: searchAccount.reducer,
  searchIntegration: searchIntegration.reducer,
  platformAccount: platformAccount.reducer,
  report: report.reducer,
  searchCampaign: searchCampaign.reducer
};
