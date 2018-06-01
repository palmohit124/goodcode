import {Action} from '@ngrx/store';
import {tag} from '../../helpers';
import {UserProfile} from '../../models/user-profile';

// @formatter:off
export const LOAD_USER_PROFILE_FAILED     = tag('[UserProfile] LoadUserProfileFailed');
export const LOAD_USER_PROFILE_SUCCEEDED  = tag('[UserProfile] LoadUserProfileSucceeded');
// @formatter:on

export class LoadUserProfileSucceeded implements Action {
  readonly type = LOAD_USER_PROFILE_SUCCEEDED;

  constructor(public payload: UserProfile) {
  }
}

export class LoadUserProfileFailed implements Action {
  readonly type = LOAD_USER_PROFILE_FAILED;

  constructor(public payload: string) {
  }
}

export type Actions = LoadUserProfileFailed | LoadUserProfileSucceeded;
