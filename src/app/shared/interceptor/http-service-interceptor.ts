import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Clock } from '../../core/services/clock/clock';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { layoutActions } from '../../core/actions';
import { RefreshToken, Logout } from '../../core/actions/auth.actions';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { getAuth, getAuthAction } from '../../core/reducers';
import { Subscription } from 'rxjs/Subscription';
import { AuthState } from '../../models/user-tokens';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/observable/throw';


@Injectable()
export class HttpServiceInterceptor implements HttpInterceptor {
  requestsInFlight: number = 0;
  loadedAuthState$: Observable<AuthState>;
  token: string;
  expiresAt: number;

  constructor(private store: Store<any>, private clock: Clock) {
    this.loadedAuthState$ = store.select(getAuth).filter(auth => auth !== undefined);
    this.loadedAuthState$.subscribe(auth => {
      this.expiresAt = auth.expiresAt;
      this.token = auth.userTokens.access_token;
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isNoBearerUrl(request) && !this.isAuthenticated()) {
      this.store.dispatch(new RefreshToken());
      return fromPromise(new Promise((resolve, reject) => {
        return this.store.select(getAuthAction)
          .filter(authState => authState)
          .subscribe(authState => {
            resolve();
          });
      }))
        .switchMap(() => {
          return this.interceptInternal(request, next);
        });

    } else {
      return this.interceptInternal(request, next);
    }
  }

  interceptInternal(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requestsInFlight++;
    if (!this.isNoBearerUrl(request)) {
      request = this.composeAuthHeader(request);
    }
    if (this.requestsInFlight === 1) {
      this.store.dispatch(new layoutActions.ShowSpinner());
    }
    return next.handle(request)
      .pipe(
        catchError((err: any) => {
          this.requestsInFlight--;
          if (this.requestsInFlight === 0) {
            this.store.dispatch(new layoutActions.HideSpinner());
          }
          if (err.status === 401) {
            this.store.dispatch(new Logout());
          }
          return Observable.throw(err);
        }),
        tap(event => {
          if (event instanceof HttpResponse) {
            this.requestsInFlight--;
            if (this.requestsInFlight === 0) {
              this.store.dispatch(new layoutActions.HideSpinner());
            }
          }
        })
      );
  }

  isAuthenticated() {
    return (this.clock.getTime() + 2 * 60000 < this.expiresAt);
  }

  isNoBearerUrl(request) {
    return !(request.url.indexOf('auth/token') < 0 && request.url.indexOf('conf/client-config.json') < 0);
  }

  composeAuthHeader(request) {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${this.token}`)
    });
  }
}
