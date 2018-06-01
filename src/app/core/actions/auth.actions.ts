import { Action } from '@ngrx/store';
import { tag } from '../../helpers';
import { AuthState, EmptyAuthState } from '../../models/user-tokens';

// @formatter:off
export const AUTH_INIT = tag('[Auth] Init');
export const LOGOUT = tag('[Auth] Logout');
export const AUTH_STATE_LOAD_SUCCEEDED = tag('[Auth] AuthStateLoadSucceeded');
export const AUTH_STATE_LOAD_FAILED = tag('[Auth] AuthStateLoadFailed');
export const SAVE_AUTH_STATE = tag('[Auth] SaveAuthState');
export const SAVE_AUTH_STATE_SUCCEEDED = tag('[Auth] SaveAuthStateSucceeded');
export const SAVE_AUTH_STATE_FAILED = tag('[Auth] SaveAuthStateFailed');
export const REFRESH_TOKEN = tag('[Auth] RefreshToken');
export const REFRESH_TOKEN_SUCCEEDED = tag('[Auth] RefreshTokenSucceeded');
export const REFRESH_TOKEN_FAILED = tag('[Auth] RefreshTokenFailed');
export const RESET_AUTH_ACTION_STATUS = tag('[Auth] ResetAuthActionStatus');
export const LOADING_REFRESH_TOKEN = tag('[Auth] LoadingRefreshToken');

// @formatter:on

export class AuthInit implements Action {
  readonly type = AUTH_INIT;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class AuthStateLoadSucceeded implements Action {
  readonly type = AUTH_STATE_LOAD_SUCCEEDED;

  constructor(public payload: AuthState) {
  }
}

// TODO: Display message when browser local storage is disabled?
export class AuthStateLoadFailed implements Action {
  readonly type = AUTH_STATE_LOAD_FAILED;
}

export class SaveAuthState implements Action {
  readonly type = SAVE_AUTH_STATE;

  constructor(public payload: AuthState) {
  }
}

export class SaveAuthStateSucceeded implements Action {
  readonly type = SAVE_AUTH_STATE_SUCCEEDED;

  constructor(public payload: AuthState) {
  }
}

export class SaveAuthStateFailed implements Action {
  readonly type = SAVE_AUTH_STATE_FAILED;
}

export class RefreshToken implements Action {
  readonly type = REFRESH_TOKEN;
}

export class RefreshTokenSucceeded implements Action {
  readonly type = REFRESH_TOKEN_SUCCEEDED;

  constructor(public payload: AuthState) {
  }
}

export class RefreshTokenFailed implements Action {
  readonly type = REFRESH_TOKEN_FAILED;
}

export class ResetAuthActionStatus implements Action {
  readonly type = RESET_AUTH_ACTION_STATUS;
}

export class LoadingRefreshToken implements Action {
  readonly type = LOADING_REFRESH_TOKEN;
}


export type Actions =
  AuthStateLoadSucceeded
  | SaveAuthStateSucceeded
  | ResetAuthActionStatus
  | RefreshToken
  | RefreshTokenFailed
  | LoadingRefreshToken;

