import { rewriteCampaignActions } from '../actions';
import { RewriteCampaignList, EmptyRewriteCampaignList } from '../../models/rewrite-campaign';

export interface RewriteCampaignState {
  rewriteCampaigns: RewriteCampaignList;
}

const initialState: RewriteCampaignState = {
  rewriteCampaigns: EmptyRewriteCampaignList
};


export function reducer(state = initialState, action: rewriteCampaignActions.Actions): RewriteCampaignState {
  switch (action.type) {

    case rewriteCampaignActions.LOAD_SUCCESS: {
      return {
        rewriteCampaigns: action.payload
      };
    }

    case rewriteCampaignActions.LOAD_FAIL: {
      return {
        rewriteCampaigns: EmptyRewriteCampaignList
      };
    }

    default:
      return state;
  }
}
