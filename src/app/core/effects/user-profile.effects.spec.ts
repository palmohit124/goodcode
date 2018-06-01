import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { cold, hot } from 'jasmine-marbles';

import { UserProfileEffects } from './user-profile.effects';
import { authActions, clientConfigActions, profileActions } from '../actions';
import { AuthService } from '../services/auth/auth.service';
import { UserProfile } from '../../models/user-profile';
import { EmptyClientConfiguration } from '../../models/client-configuration';
import { AuthState, EmptyAuthState } from '../../models/user-tokens';
import SpyObj = jasmine.SpyObj;
import { EmptyUserProfile } from '../../models/empty-user-profile';

describe('UserProfile Effects', () => {

  let effects: UserProfileEffects;
  let actions: Observable<any>;
  let authService: SpyObj<AuthService>;

  const exampleAuthState: AuthState = {
    userTokens: {
      access_token: 'asdf',
      expires_in: 123,
      token_type: '',
      refresh_token: ''
    },
    expiresAt: Date.now(),
    role: '',
    authAction: false,
    loadingRefreshToken: false
  };
  const exampleProfile = {
    nickname: 'Dorian Grey',
    email: 'dgrey@marchex.com',
    name: 'Dorian Grey',
    user_id: '1234|blue32',
    picture: 'http://www.marchex.com/favicon.ico',
  };

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['getProfile']);

    TestBed.configureTestingModule({
      providers: [
        UserProfileEffects,
        provideMockActions(() => actions),
        { provide: AuthService, useValue: authService },
      ],
    });

    effects = TestBed.get(UserProfileEffects);
  });

  describe('when a AUTH_STATE_LOAD_SUCCEEDED with a nonempty state has been observed', () => {
    describe('and the auth service responds with the user profile', () => {
      it('should dispatch a load profile succeeded action with the user profile', () => {
        const authState: AuthState = exampleAuthState;
        const userProfile: UserProfile = exampleProfile;

        authService.getProfile.and.returnValue(Observable.of(userProfile));

        const expectedActions = { a: new profileActions.LoadUserProfileSucceeded(userProfile) };
        const observedActions = { a: new authActions.AuthStateLoadSucceeded(authState) };

        actions = hot('-a', observedActions);
        const expected = cold('-a', expectedActions);
        expect(effects.loadUserProfile$).toBeObservable(expected);
      });
    });
    describe('and the auth service responds with an error', () => {
      it('should dispatch a load profile failed action', () => {
        const authState: AuthState = exampleAuthState;

        authService.getProfile.and.returnValue(Observable.throw('Failed to load user profile'));

        const expectedActions = { a: new profileActions.LoadUserProfileFailed('Failed to load user profile') };
        const observedActions = { a: new authActions.AuthStateLoadSucceeded(authState) };

        actions = hot('-a', observedActions);
        const expected = cold('-a', expectedActions);
        expect(effects.loadUserProfile$).toBeObservable(expected);
      });
    });
  });
  describe('when a AUTH_STATE_LOAD_SUCCEEDED with enpty state has been observed', () => {
    it('should not dispatch a load profile succeeded action', () => {
      const observedActions = { a: new authActions.AuthStateLoadSucceeded(EmptyAuthState) };

      actions = hot('-a', observedActions);
      const expected = cold('--', {});
      expect(effects.loadUserProfile$).toBeObservable(expected);
      expect(authService.getProfile).not.toHaveBeenCalled();
    });
  });
  describe('when a SAVE_AUTH_STATE_SUCCEEDED have both been observed', () => {
    describe('and the auth service responds with the user profile', () => {
      it('should dispatch a load profile succeeded action', () => {
        const userProfile: UserProfile = exampleProfile;

        authService.getProfile.and.returnValue(Observable.of(userProfile));

        const expectedActions = { a: new profileActions.LoadUserProfileSucceeded(userProfile) };
        const observedActions = { a: new authActions.SaveAuthStateSucceeded(EmptyAuthState) };

        actions = hot('-a', observedActions);
        const expected = cold('-a', expectedActions);
        expect(effects.loadUserProfile$).toBeObservable(expected);
      });
    });
    describe('and the auth service responds with an error', () => {
      it('should dispatch a load profile failed action', () => {

        authService.getProfile.and.returnValue(Observable.throw('Failed to load user profile'));

        const expectedActions = { a: new profileActions.LoadUserProfileFailed('Failed to load user profile') };
        const observedActions = { a: new authActions.SaveAuthStateSucceeded(EmptyAuthState) };

        actions = hot('-a', observedActions);
        const expected = cold('-a', expectedActions);
        expect(effects.loadUserProfile$).toBeObservable(expected);
      });
    });
  });
});
