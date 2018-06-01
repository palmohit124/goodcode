import { platformAccountActions } from '../actions';
import * as platformAccount from '../../models/platform-account';

export interface PlatformAccountState {
  loaded: boolean;
  loading: boolean;
  unlinkedLoaded: boolean;
  unlinkedloading: boolean;
  linkedAccounts: platformAccount.LinkedPlatformAccounts;
  unlinkedParentAccounts: platformAccount.UnlinkedParentAccounts;
  unlinkedChildAccounts: platformAccount.UnlinkedChildAccounts;
  platformAccountAction: boolean;
}

const initialState: PlatformAccountState = {
  loaded: false,
  loading: false,
  unlinkedLoaded: false,
  unlinkedloading: false,
  linkedAccounts: platformAccount.EmptyLinkedPlatformAccounts,
  unlinkedParentAccounts: platformAccount.EmptyUnlinkedParentAccounts,
  unlinkedChildAccounts: platformAccount.EmptyUnlinkedChildAccounts,
  platformAccountAction: false
};

export function reducer(state = initialState, action: platformAccountActions.Actions): PlatformAccountState {
  switch (action.type) {
    case platformAccountActions.LOAD_LINKED: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case platformAccountActions.LOAD_LINKED_FAIL: {
      return {
        ...state,
        loaded: true,
        loading: false,
        linkedAccounts: platformAccount.EmptyLinkedPlatformAccounts
      };
    }

    case platformAccountActions.LOAD_LINKED_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        linkedAccounts: action.payload,
      };
    }

    case platformAccountActions.LOAD_UNLINKED_PARENT: {
      return {
        ...state,
        unlinkedloading: true,
        unlinkedLoaded: false
      };
    }

    case platformAccountActions.LOAD_UNLINKED_PARENT_FAIL: {
      return {
        ...state,
        unlinkedLoaded: true,
        unlinkedloading: false,
        unlinkedParentAccounts: platformAccount.EmptyUnlinkedParentAccounts
      };
    }

    case platformAccountActions.LOAD_UNLINKED_PARENT_SUCCESS: {
      return {
        ...state,
        unlinkedLoaded: true,
        unlinkedloading: false,
        unlinkedParentAccounts: action.payload,
      };
    }

    case platformAccountActions.LOAD_UNLINKED_CHILD: {
      return {
        ...state,
        unlinkedLoaded: false,
        unlinkedloading: true
      };
    }
    case platformAccountActions.LOAD_UNLINKED_CHILD_FAIL: {
      return {
        ...state,
        unlinkedLoaded: true,
        unlinkedloading: false,
        unlinkedChildAccounts: platformAccount.EmptyUnlinkedChildAccounts
      };
    }

    case platformAccountActions.LOAD_UNLINKED_CHILD_SUCCEESS: {
      return {
        ...state,
        unlinkedLoaded: true,
        unlinkedloading: false,
        unlinkedChildAccounts: action.payload,
      };
    }

    case platformAccountActions.LINK_PARENT_SUCCESS:
    case platformAccountActions.LINK_CHILD_SUCCESS:
    case platformAccountActions.LINK_CHILD_FAIL: {
      return {
        ...state,
        platformAccountAction: true
      };
    }

    case platformAccountActions.RESET_PLATFORM_ACCOUNT_ACTION_STATUS: {
      return {
        ...state,
        platformAccountAction: false
      };
    }

    default:
      return state;
  }
}


