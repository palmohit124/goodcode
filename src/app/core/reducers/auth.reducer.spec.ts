import { AuthState, EmptyAuthState, UserTokens } from '../../models/user-tokens';
import { reducer } from './auth.reducer';
import { AuthStateLoadSucceeded } from '../actions/auth.actions';

describe('Auth Reducer', () => {
  describe('when recieving a Auth State Load Succeeded action', () => {
    it('should return the new auth state', () => {
      const authResult: UserTokens = { access_token: 'accesstoken', token_type: '', refresh_token: '', expires_in: 1234 };
      const expectedState: AuthState = {
        userTokens: authResult,
        expiresAt: ((authResult.expires_in * 1000) + Date.now()),
        role: '',
        authAction: false,
        loadingRefreshToken: false
      };
      const result = reducer(EmptyAuthState, new AuthStateLoadSucceeded(expectedState));
      expect(result).toEqual(expectedState);
    });
  });
  // failure action ?
});
