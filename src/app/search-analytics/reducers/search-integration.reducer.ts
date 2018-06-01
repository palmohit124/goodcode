import { searchIntegrationActions } from '../actions';
import { SearchIntegrationList, EmptySearchIntegrationList } from '../../models/search-integration';

export interface SearchIntegrationState {
  loaded: boolean;
  loading: boolean;
  searchIntegrations: SearchIntegrationList;
  searchIntegrationAction: boolean;
}

const initialState: SearchIntegrationState = {
  loaded: false,
  loading: false,
  searchIntegrations: EmptySearchIntegrationList,
  searchIntegrationAction: false
};

export function reducer(state = initialState, action: searchIntegrationActions.Actions): SearchIntegrationState {
  switch (action.type) {
    case searchIntegrationActions.LOAD: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case searchIntegrationActions.LOAD_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        searchIntegrations: action.payload
      };
    }

    case searchIntegrationActions.LOAD_FAIL: {
      return {
        ...state,
        loaded: true,
        loading: false,
        searchIntegrations: EmptySearchIntegrationList
      };
    }

    case searchIntegrationActions.REMOVE_SUCCESS: {
      return {
        ...state,
        searchIntegrationAction: true
      };
    }

    case searchIntegrationActions.CREATE_SUCCESS: {
      return {
        ...state,
        searchIntegrationAction: true
      };
    }

    case searchIntegrationActions.RESET_SEARCH_INTEGRATION_ACTION_STATUS: {
      return {
        ...state,
        searchIntegrationAction: false
      };
    }

    default:
      return state;
  }
}


