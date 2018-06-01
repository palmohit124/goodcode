import { AuthState, EmptyAuthState } from '../../models/user-tokens';
import { authActions } from '../actions';

export function reducer(state: AuthState = EmptyAuthState, action: authActions.Actions): AuthState {
  switch (action.type) {
    case authActions.AUTH_STATE_LOAD_SUCCEEDED:
    case authActions.SAVE_AUTH_STATE_SUCCEEDED: {
      const auth = <AuthState>action.payload;
      return {
        ...state,
        ...auth
      };
    }

    case authActions.RESET_AUTH_ACTION_STATUS: {
      return {
        ...state,
        authAction: false
      };
    }

    case authActions.LOADING_REFRESH_TOKEN: {
      return {
        ...state,
        loadingRefreshToken: true
      };
    }

    default: {
      return state;
    }
  }
}
