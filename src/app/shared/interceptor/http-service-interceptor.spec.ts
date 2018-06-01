import { AuthStateLoadSucceeded, RefreshToken, SaveAuthStateSucceeded, Logout } from './../../core/actions/auth.actions';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpResponse } from '@angular/common/http';
import { layoutActions } from '../../core/actions';
import { HttpServiceInterceptor } from './http-service-interceptor';
import { Store, StoreModule } from '@ngrx/store';
import { ClientState, reducers } from '../../core/reducers';
import { Clock } from '../../core/services/clock/clock';
import SpyObj = jasmine.SpyObj;

describe('HttpServiceInterceptor', () => {
  let store: Store<ClientState>;
  let clock: SpyObj<Clock>;

  const exampleAuthState = {
    userTokens: {
      token_type: '',
      access_token: 'access abc',
      expires_in: -1,
      refresh_token: ''
    },
    expiresAt: 0,
    role: '',
    authAction: true,
    loadingRefreshToken: false
  };

  beforeEach(() => {
    clock = jasmine.createSpyObj('Clock', ['getTime']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot(reducers)],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: HttpServiceInterceptor,
        multi: true
      },
      {
        provide: Clock,
        useValue: clock
      }]
    });
    store = TestBed.get(Store);
    store.dispatch(new AuthStateLoadSucceeded({
      ...exampleAuthState,
      expiresAt: clock.getTime()
    }));
    spyOn(store, 'dispatch');
  });

  describe('When interceptor is called', () => {
    it('dispatched action is ShowSpinner',
      inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
        http.get('auth/token').subscribe(response => { });
        const req = httpMock.expectOne('auth/token');
        expect(store.dispatch).toHaveBeenCalledWith(new layoutActions.ShowSpinner());
      })
    );
  });

  describe('When interceptor is called', () => {
    it('first it should dispatch ShowSpinner and on getting response it should disptach HideSpinner',
      inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
        http.get('auth/token').subscribe(response => {
          const cast = response as HttpResponse<String>;
          expect(cast.status).toBe(200);
        });
        expect(store.dispatch).toHaveBeenCalledWith(new layoutActions.ShowSpinner());
        const req = httpMock.expectOne('auth/token');
        req.flush(<HttpResponse<String>>{ status: 200 });
        httpMock.verify();
        expect(store.dispatch).toHaveBeenCalledWith(new layoutActions.HideSpinner());
      })
    );
  });

  describe('When interceptor is called', () => {
    it('first it should dispatch ShowSpinner and on getting error it should disptach HideSpinner',
      inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
        http.get('auth/token').subscribe(
          response => {
            fail('Expected this to fail, but it did not.');
          }, err => {
            expect(err).toBeTruthy();
          },
        );

        expect(store.dispatch).toHaveBeenCalledWith(new layoutActions.ShowSpinner());
        const req = httpMock.expectOne('auth/token');
        req.flush(null, { status: 404, statusText: 'Not Found' });
        httpMock.verify();
        expect(store.dispatch).toHaveBeenCalledWith(new layoutActions.HideSpinner());
      })
    );
  });

  describe('When interceptor is called with expired access_token', () => {
    it('dispatched action is RefreshToken',
      inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
        clock.getTime.and.returnValue(new Date().getTime());
        http.get('/get').subscribe(response => { });
        expect(store.dispatch).toHaveBeenCalledWith(new RefreshToken());
      })
    );

    describe('when token is refreshed', () => {
      it('should continue http request',
        inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
          clock.getTime.and.returnValue(new Date().getTime());
          http.get('/get').subscribe(response => { });
          setTimeout(() => {
            const req = httpMock.expectOne('/get');
          }, 1000);
        })
      );
    });

    describe('when refresh token is expired', () => {
      it('it should dispatch logout action',
        inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
          http.get('auth/token').subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const req = httpMock.expectOne('auth/token');
          req.flush({ status: 401, statusText: 'unauthorized' }, { status: 401, statusText: 'unauthorized' });
          httpMock.verify();
          expect(store.dispatch).toHaveBeenCalledWith(new Logout());
        })
      );
    });
  });
});

