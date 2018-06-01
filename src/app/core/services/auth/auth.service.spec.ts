import { TestBed, async, inject } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AuthService } from './auth.service';
import { ClientState, reducers } from '../../reducers';
import { AuthState, EmptyAuthState } from '../../../models/user-tokens';
import { NoOpLogger } from '../logger/no-op-logger';
import { cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { AuthStateLoadSucceeded, SaveAuthStateSucceeded } from '../../actions/auth.actions';
import { LocalStorage } from '../local-storage/local-storage';
import { Clock } from '../clock/clock';
import { EmptyUserProfile } from '../../../models/empty-user-profile';
import { ClientConfigService } from '../client-config/client-config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { access } from 'fs';
import { ClientConfiguration } from '../../../models/client-configuration';


describe('Auth Service', () => {

  let service: AuthService;
  let store: Store<ClientState>;
  let localStorageSpy: jasmine.SpyObj<LocalStorage>;
  let clockServiceSpy: jasmine.SpyObj<Clock>;
  let configServiceSpy: jasmine.SpyObj<ClientConfigService>;
  const logger = new NoOpLogger();

  const exampleAuthState: AuthState = {
    userTokens: {
      token_type: '',
      access_token: 'access abc',
      expires_in: -1,
      refresh_token: ''
    },
    expiresAt: 123,
    role: 'staff',
    authAction: true,
    loadingRefreshToken: false
  };

  const exampleConfig: ClientConfiguration = {
    auth: {
      accessAllowedTo: ['staff'],
    },
    routes: {
      routesWithoutNav: []
    },
    baseApiUrl: '',
    oAuthConfigs: {
      redirectUri: '',
    }
  };

  beforeEach(() => {
    localStorageSpy = jasmine.createSpyObj(['getItem', 'setItem', 'removeItem']);
    clockServiceSpy = jasmine.createSpyObj(['getTime']);
    configServiceSpy = jasmine.createSpyObj(['get']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        StoreModule.forRoot(reducers),
      ],
    });

    store = TestBed.get(Store);
    const http = TestBed.get(HttpClient);
    service = new AuthService(store, localStorageSpy, clockServiceSpy, logger, configServiceSpy, http);
  });

  describe('when logging out', () => {
    describe('when logged out successfully', () => {
      it('should clear localstorage and logout', () => {
        localStorageSpy.removeItem.and.returnValue(Observable.of({}));
        const expected = cold('(a|)', { a: {} });
        expect(service.logout()).toBeObservable(expected);
        expect(localStorageSpy.removeItem).toHaveBeenCalledWith(AuthService.STORAGE_KEY);
      });
    });
  });

  describe('when loading the auth state from local storage', () => {
    describe('when the state is defined but error in parsing jwt', () => {
      it('should return the EmptyAuthState', () => {
        const expectedState: AuthState = exampleAuthState;
        localStorageSpy.getItem.and.returnValue(Observable.of(expectedState.userTokens));
        const expected = cold('(a|)', { a: EmptyAuthState });
        expect(service.loadAuthSession()).toBeObservable(expected);
      });
    });
  });

  describe('when saving the access tokens', () => {
    it('should delegate to localStorage', () => {
      const authState: AuthState = exampleAuthState;
      localStorageSpy.setItem.and.returnValue(Observable.of({}));
      const expected = cold('(a|)', { a: {} });
      expect(service.saveAuthSession(authState)).toBeObservable(expected);
      expect(localStorageSpy.setItem).toHaveBeenCalledWith(AuthService.STORAGE_KEY, authState.userTokens);
    });
  });

  describe('when checking if user is authorised', () => {
    describe('when user is authorised', () => {
      it('should return true', () => {
        configServiceSpy.get.and.returnValue(exampleConfig);
        store.dispatch(new AuthStateLoadSucceeded(exampleAuthState));
        const expected = cold('a', { a: true });
        expect(service.isAuthorised()).toBeObservable(expected);
      });
    });
    describe('when user is not authorised', () => {
      it('should return false', () => {
        configServiceSpy.get.and.returnValue(exampleConfig);
        store.dispatch(new AuthStateLoadSucceeded({
          ...exampleAuthState,
          role: 'non-staff'
        }));
        const expected = cold('a', { a: false });
        expect(service.isAuthorised()).toBeObservable(expected);
      });
    });
    describe('when auth state is empty', () => {
      it('should return false', () => {
        configServiceSpy.get.and.returnValue(exampleConfig);
        store.dispatch(new AuthStateLoadSucceeded(EmptyAuthState));
        const expected = cold('a', { a: false });
        expect(service.isAuthorised()).toBeObservable(expected);
      });
    });
  });

  describe('get profile', () => {
    describe('when error in parsing jwt', () => {
      it('should emit the empty profile', () => {
        store.dispatch(new AuthStateLoadSucceeded(exampleAuthState));
        const expected = cold('a', { a: EmptyUserProfile });
        expect(service.getProfile()).toBeObservable(expected);
      });
    });
  });

  describe('when refreshing token', () => {
    const baseApiUrl = { baseApiUrl: '' };
    describe('when successful', () => {
      it('should return refresh token', () => {
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const userTokens = exampleAuthState.userTokens;
          service.refreshToken(userTokens.refresh_token).subscribe(
            response => {
              expect(response).toEqual(exampleAuthState);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'auth/token');
          expect(mock.request.body).toEqual(userTokens);
          expect(mock.request.method).toEqual('POST');
          mock.flush(userTokens);
        }));
      });
    });
    describe('when the error occured', () => {
      it('should respond with the failure', () => {
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const userTokens = exampleAuthState.userTokens;
          service.refreshToken(userTokens.refresh_token).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'auth/token');
          expect(mock.request.body).toEqual(userTokens);
          expect(mock.request.method).toEqual('POST');
          mock.flush(null, { status: 500, statusText: 'Internal server error' });
        }));
      });
    });
  });
});
