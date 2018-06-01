import { searchAccountActions } from '../actions';
import { SearchAccountList, EmptySearchAccountList } from '../../models/search-account';

export interface SearchAccountState {
  loaded: boolean;
  loading: boolean;
  searchAccounts: SearchAccountList;
  searchAccountAction: boolean;
}

const initialState: SearchAccountState = {
  loaded: false,
  loading: false,
  searchAccounts: EmptySearchAccountList,
  searchAccountAction: false
};

export function reducer(state = initialState, action: searchAccountActions.Actions): SearchAccountState {
  switch (action.type) {
    case searchAccountActions.LOAD_LINKED: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case searchAccountActions.LOAD_UNLINKED: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case searchAccountActions.LOAD_FAIL: {
      return {
        ...state,
        loaded: true,
        loading: false,
        searchAccounts: EmptySearchAccountList
      };
    }

    case searchAccountActions.LOAD_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        searchAccounts: action.payload
      };
    }

    case searchAccountActions.UNLINK_SUCCESS: {
      return {
        ...state,
        searchAccountAction: true
      };
    }

    case searchAccountActions.LINK_SUCCESS: {
      return {
        ...state,
        searchAccountAction: true
      };
    }

    case searchAccountActions.LINK_FAIL: {
      return {
        ...state,
        searchAccountAction: true
      };
    }

    case searchAccountActions.RESET_SEARCH_ACCOUNT_ACTION_STATUS: {
      return {
        ...state,
        searchAccountAction: false
      };
    }

    default:
      return state;
  }
}


