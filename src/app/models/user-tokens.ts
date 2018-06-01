export interface UserTokens {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

export const EmptyUserTokens: UserTokens = {
  token_type: '',
  access_token: '',
  expires_in: -1,
  refresh_token: ''
};

export interface AuthState {
  userTokens: UserTokens;
  expiresAt: number;
  role: string;
  authAction: boolean;
  loadingRefreshToken: boolean;
}

export const EmptyAuthState: AuthState = {
  userTokens: EmptyUserTokens,
  expiresAt: -1,
  role: '',
  authAction: false,
  loadingRefreshToken: false
};
