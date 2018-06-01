import {UserProfile} from '../../models/user-profile';
import {profileActions} from '../actions';
import {EmptyUserProfile} from '../../models/empty-user-profile';

export function reducer(state: UserProfile = EmptyUserProfile, action: profileActions.Actions): UserProfile {
  switch (action.type) {
    case profileActions.LOAD_USER_PROFILE_SUCCEEDED: {
      const profile = <UserProfile> action.payload;
      return {
        ...state,
        ...profile
      };
    }

    case profileActions.LOAD_USER_PROFILE_FAILED: {
      return EmptyUserProfile;
    }

    default: {
      return state;
    }
  }
}
