import { Action } from '@ngrx/store';
import { tag } from '../../helpers/index';
import { RewriteCampaignList } from '../../models/rewrite-campaign';

export const LOAD = tag('[RewriteCampaign] Load rewrite camapigns');
export const LOAD_SUCCESS = tag('[RewriteCampaign] Load rewrite camapigns success');
export const LOAD_FAIL = tag('[RewriteCampaign] Load rewrite camapigns fail');

export class Load implements Action {
  readonly type = LOAD;
  constructor(public accountId: string) { }
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: RewriteCampaignList) { }
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: string) {
  }
}

export type Actions =
Load |
LoadSuccess |
LoadFail;
