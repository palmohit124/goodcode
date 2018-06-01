import { Action } from '@ngrx/store';
import { tag } from '../../helpers/index';
import { SearchCampaign } from '../../models/search-campaign';

export const LOAD_SEARCH_CAMPAIGNS = tag('[SearchCampaign] Load Search Campaigns');
export const LOAD_SEARCH_CAMPAIGNS_SUCCESS = tag('[SearchCampaign] Load Search Campaigns Success');
export const LOAD_SEARCH_CAMPAIGNS_FAIL = tag('[SearchCampaign] Load Search Campaigns Fail');

export const UPLOAD_SEARCH_CAMPAIGNS = tag('[SearchCampaign] Upload Search Campaigns');
export const UPLOAD_SEARCH_CAMPAIGNS_SUCCESS = tag('[SearchCampaign] Upoad Search Campaigns Success');
export const UPLOAD_SEARCH_CAMPAIGNS_FAIL = tag('[SearchCampaign] Upload Search Campaigns Fail');

export const RESET_SEARCH_CAMPAIGNS_ACTION_STATUS = tag('[SearchCampaign] Reset Search Campaign Action Status');

export class LoadSearchCampaigns implements Action {
  readonly type = LOAD_SEARCH_CAMPAIGNS;

  constructor(public id: string, public queryParam: any) { }
}

export class LoadSearchCampaignsSuccess implements Action {
  readonly type = LOAD_SEARCH_CAMPAIGNS_SUCCESS;

  constructor(public payload: [SearchCampaign[], number]) { }
}

export class LoadSearchCampaignsFail implements Action {
  readonly type = LOAD_SEARCH_CAMPAIGNS_FAIL;

  constructor(public payload: string) { }
}

export class UploadSearchCampaigns implements Action {
  readonly type = UPLOAD_SEARCH_CAMPAIGNS;

  constructor(public id: string, public userName: string, public password: string, public file: File) { }
}

export class UploadSearchCampaignsSuccess implements Action {
  readonly type = UPLOAD_SEARCH_CAMPAIGNS_SUCCESS;
}

export class UploadSearchCampaignsFail implements Action {
  readonly type = UPLOAD_SEARCH_CAMPAIGNS_FAIL;

  constructor(public payload: string) { }
}

export class ResetSearchCampaignsActionStatus implements Action {
  readonly type = RESET_SEARCH_CAMPAIGNS_ACTION_STATUS;
}


export type Actions =
  LoadSearchCampaigns |
  LoadSearchCampaignsSuccess |
  LoadSearchCampaignsFail |
  UploadSearchCampaigns |
  UploadSearchCampaignsSuccess |
  UploadSearchCampaignsFail |
  ResetSearchCampaignsActionStatus;
