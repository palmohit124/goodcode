import {
  LOAD_USER_PROFILE_FAILED, LOAD_USER_PROFILE_SUCCEEDED, LoadUserProfileFailed,
  LoadUserProfileSucceeded,
} from './user-profile.actions';
import {EmptyUserProfile} from '../../models/empty-user-profile';

describe('User Profile Actions', () => {
  it('should define a User Profile Load Succeeded Action', () => {
    const action = new LoadUserProfileSucceeded(EmptyUserProfile);
    expect(action.type).toBe(LOAD_USER_PROFILE_SUCCEEDED);
    expect(action.payload).toBe(EmptyUserProfile);
  });
  it('should define a User Profile Load Failed Action', () => {
    const action = new LoadUserProfileFailed('dang');
    expect(action.type).toBe(LOAD_USER_PROFILE_FAILED);
    expect(action.payload).toBe('dang');
  });
});
