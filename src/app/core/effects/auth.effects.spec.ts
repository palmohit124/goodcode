import { AuthStateLoadSucceeded } from './../actions/auth.actions';
import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { cold, hot } from 'jasmine-marbles';
import {AuthEffects} from './auth.effects';
import {authActions} from '../actions';
import {AuthService} from '../services/auth/auth.service';
import {EmptyAuthState} from '../../models/user-tokens';
import {OmniTestingModule} from '../../helpers/testing';
import {AuthInit} from '../actions/auth.actions';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule, Store} from '@ngrx/store';
import {ClientState, reducers} from '../reducers';

describe('Auth Effects', () => {

  let effects: AuthEffects;
  let actions: Observable<any>;
  const authService = jasmine.createSpyObj('AuthService', ['loadAuthSession', 'logout', 'saveAuthSession', 'refreshToken']);
  const router = jasmine.createSpyObj('Router', ['navigate']);
  let store: Store<ClientState>;

  const exampleAuthState = {
    userTokens: {
      token_type: '',
      access_token: 'access abc',
      expires_in: -1,
      refresh_token: ''
    },
    expiresAt: 123,
    role: '',
    authAction: false,
    loadingRefreshToken: false
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        OmniTestingModule,
        RouterModule,
        StoreModule.forRoot(reducers),
        NoopAnimationsModule
      ],
      providers: [
        AuthEffects,
        provideMockActions(() => actions),
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ],
    });
    store = TestBed.get(Store);
    effects = TestBed.get(AuthEffects);
  });

  describe('when AUTH_INIT action is observed', () => {
    describe('when auth state successfully loaded', () => {
      it('should emit a AuthStateLoadSucceed Action', () => {
        const expectedAuthState = exampleAuthState;

        authService.loadAuthSession.and.returnValue(Observable.of(expectedAuthState));
        actions = hot('a', { a: new AuthInit() });
        const expected = cold('a', { a: new authActions.AuthStateLoadSucceeded(expectedAuthState) });

        expect(effects.initAuthState$).toBeObservable(expected);
      });
    });
    describe('when no auth state is currently stored', () => {
      it('should emit a AuthStateLoadSucceeded Action with the empty auth state', () => {
        authService.loadAuthSession.and.returnValue(Observable.of(EmptyAuthState));

        actions = hot('a', { a: new AuthInit() });
        const expected = cold('a', { a: new authActions.AuthStateLoadSucceeded(EmptyAuthState) });

        expect(effects.initAuthState$).toBeObservable(expected);
      });
    });
    describe('when the service fails', () => {
      it('should emit a AuthStateLoadFailed Action', () => {
        authService.loadAuthSession.and.returnValue(Observable.throw('An error'));

        actions = hot('a', { a: new AuthInit() });
        const expected = cold('a', { a: new authActions.AuthStateLoadFailed() });

        expect(effects.initAuthState$).toBeObservable(expected);
      });
    });
  });
  describe('when SAVE_AUTH_STATE is observed', () => {
    describe('when the auth service succeeds', () => {
      it('should emit SaveAuthSucceeded', () => {
        const expectedAuthState = exampleAuthState;
        authService.saveAuthSession.and.returnValue(Observable.of({}));

        actions = hot('a', { a: new authActions.SaveAuthState(expectedAuthState) });
        const expected = cold('a', { a: new authActions.SaveAuthStateSucceeded(expectedAuthState) });

        expect(effects.saveAuthState$).toBeObservable(expected);
        expect(authService.saveAuthSession).toHaveBeenCalledWith(expectedAuthState);
      });
    });
    describe('when the auth service fails', () => {
      it('should emit Logout Action', () => {
        const expectedAuthState = exampleAuthState;
        authService.saveAuthSession.and.returnValue(Observable.throw('err'));

        actions = hot('a', { a: new authActions.SaveAuthState(expectedAuthState) });
        const expected = cold('a', { a: new authActions.SaveAuthStateFailed() });

        expect(effects.saveAuthState$).toBeObservable(expected);
        expect(authService.saveAuthSession).toHaveBeenCalledWith(expectedAuthState);
      });
    });
  });
  describe('when SAVE_AUTH_STATE_SUCCEEDED is observed', () => {
    it('should reset auth action status', () => {
      actions = hot('a', { a: new authActions.SaveAuthStateSucceeded(exampleAuthState) });
      const expected = cold('a', { a: new authActions.ResetAuthActionStatus() });
      expect(effects.saveAuthStateSucceeded$).toBeObservable(expected);
    });
  });
  describe('when a refresh token operation is observed', () => {
    describe('and the auth service responds success', () => {
      it('should dispatch refresh token success action', () => {
        store.dispatch(new AuthStateLoadSucceeded(exampleAuthState));
        authService.refreshToken.and.returnValue(Observable.of(exampleAuthState));
        actions = hot('a', { a: new authActions.RefreshToken() });
        const expected = cold('a', { a: new authActions.RefreshTokenSucceeded(exampleAuthState) });
        expect(effects.refreshAuthState$).toBeObservable(expected);
      });

      describe('and when a refresh token success action is dispached', () => {
        it('should dispatch a action save auth state', () => {
          actions = hot('a', { a: new authActions.RefreshTokenSucceeded(exampleAuthState) });
          const expected = cold('a', { a: new authActions.SaveAuthState(exampleAuthState) });
          expect(effects.refreshTokenSucceeded$).toBeObservable(expected);
        });
      });
    });

    describe('when the service fails', () => {
      it('should emit a refresh token failed Action', () => {
        store.dispatch(new AuthStateLoadSucceeded(exampleAuthState));
        authService.refreshToken.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new authActions.RefreshToken() });
        const expected = cold('a', { a: new authActions.RefreshTokenFailed() });
        expect(effects.refreshAuthState$).toBeObservable(expected);
      });
    });
  });
});
