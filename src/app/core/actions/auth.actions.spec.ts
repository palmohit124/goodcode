import {
  AUTH_INIT,
  AUTH_STATE_LOAD_FAILED,
  AUTH_STATE_LOAD_SUCCEEDED, AuthInit,
  AuthStateLoadFailed,
  AuthStateLoadSucceeded,
  LOGOUT,
  Logout,
  SAVE_AUTH_STATE,
  SAVE_AUTH_STATE_SUCCEEDED,
  SaveAuthState,
  SaveAuthStateSucceeded,
} from './auth.actions';
import {EmptyAuthState} from '../../models/user-tokens';

describe('Auth Actions', () => {
  it('should define a Auth Init Action', () => {
    const action = new AuthInit();
    expect(action.type).toBe(AUTH_INIT);
  });
  it('should define a Logout Action', () => {
    const action = new Logout();
    expect(action.type).toBe(LOGOUT);
  });
  it('should define a Auth State Load Succeeded Action', () => {
    const action = new AuthStateLoadSucceeded(EmptyAuthState);
    expect(action.type).toBe(AUTH_STATE_LOAD_SUCCEEDED);
    expect(action.payload).toBe(EmptyAuthState);
  });
  it('should define a Auth State Load Failed Action', () => {
    const action = new AuthStateLoadFailed();
    expect(action.type).toBe(AUTH_STATE_LOAD_FAILED);
  });
  it('should define a Save Auth State Action', () => {
    const action = new SaveAuthState(EmptyAuthState);
    expect(action.type).toBe(SAVE_AUTH_STATE);
    expect(action.payload).toBe(EmptyAuthState);
  });
  it('should define a Save Auth State Succeeded Action', () => {
    const action = new SaveAuthStateSucceeded(EmptyAuthState);
    expect(action.type).toBe(SAVE_AUTH_STATE_SUCCEEDED);
    expect(action.payload).toBe(EmptyAuthState);
  });
});
