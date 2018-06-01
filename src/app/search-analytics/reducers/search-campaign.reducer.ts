import { searchCampaigActions } from '../actions';
import { SearchCampaign } from '../../models/search-campaign';

export interface SearchCampaignState {
  loaded: boolean;
  loading: boolean;
  searchCampaigns: SearchCampaign[];
  searchCampaignCount: number;
  searchCampaignAction: boolean;
}

const initialState: SearchCampaignState = {
  loaded: false,
  loading: false,
  searchCampaigns: [],
  searchCampaignCount: 0,
  searchCampaignAction: false
};

export function reducer(state = initialState, action: searchCampaigActions.Actions): SearchCampaignState {
  switch (action.type) {
    case searchCampaigActions.LOAD_SEARCH_CAMPAIGNS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case searchCampaigActions.LOAD_SEARCH_CAMPAIGNS_FAIL: {
      return {
        ...state,
        loaded: true,
        loading: false,
        searchCampaigns: [],
        searchCampaignCount: 0
      };
    }

    case searchCampaigActions.LOAD_SEARCH_CAMPAIGNS_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        searchCampaigns: action.payload[0],
        searchCampaignCount: action.payload[1]
      };
    }

    case searchCampaigActions.UPLOAD_SEARCH_CAMPAIGNS_SUCCESS: {
      return {
        ...state,
        searchCampaignAction: true
      };
    }

    case searchCampaigActions.RESET_SEARCH_CAMPAIGNS_ACTION_STATUS: {
      return {
        ...state,
        searchCampaignAction: false
      };
    }

    default:
      return state;
  }
}


