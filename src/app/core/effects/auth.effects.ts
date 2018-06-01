import { SaveAuthState, RefreshTokenSucceeded, RefreshTokenFailed, REFRESH_TOKEN_SUCCEEDED, AUTH_STATE_LOAD_FAILED, LOADING_REFRESH_TOKEN } from './../actions/auth.actions';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { catchError, map, switchMap, tap, withLatestFrom, mergeMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { AuthService } from '../services/auth/auth.service';
import { authActions } from '../actions';
import { AUTH_INIT, REFRESH_TOKEN } from '../actions/auth.actions';
import { Store } from '@ngrx/store';
import { ClientState } from '../reducers';
import { empty } from 'rxjs/observable/empty';

@Injectable()
export class AuthEffects {

  @Effect()
  initAuthState$ =
    this.actions$
      .pipe(
        ofType(AUTH_INIT),
        switchMap(() =>
          this.authService
            .loadAuthSession()
            .pipe(
              map(result => new authActions.AuthStateLoadSucceeded(result)),
              catchError(error => Observable.of(new authActions.AuthStateLoadFailed()))
            )
        ));

  @Effect()
  refreshAuthState$ =
    this.actions$
      .pipe(
        ofType(REFRESH_TOKEN),
        withLatestFrom(this.store, (action, state) => ({ action, state })),
        mergeMap(({ action, state }) => {
          if (!state.auth.loadingRefreshToken) {
            this.store.dispatch(new authActions.LoadingRefreshToken());
            return this.authService
              .refreshToken(state.auth.userTokens.refresh_token)
              .pipe(
                map(result => new authActions.RefreshTokenSucceeded(result)),
                catchError(error => Observable.of(new authActions.RefreshTokenFailed()))
              );
          } else {
            return empty();
          }
        }));

  @Effect()
  refreshTokenSucceeded$ =
    this.actions$
      .pipe(
        ofType(authActions.REFRESH_TOKEN_SUCCEEDED),
        switchMap((a: authActions.RefreshTokenSucceeded) => Observable.of(new authActions.SaveAuthState(a.payload)))
      );

  @Effect()
  saveAuthState$ =
    this.actions$
      .pipe(
        ofType(authActions.SAVE_AUTH_STATE),
        switchMap((a: authActions.SaveAuthState) =>
          this.authService.saveAuthSession(a.payload)
            .pipe(
              map(() => new authActions.SaveAuthStateSucceeded(a.payload)),
              catchError((error) => Observable.of(new authActions.SaveAuthStateFailed()))
            )
        ));

  @Effect()
  saveAuthStateSucceeded$ =
    this.actions$
      .pipe(
        ofType(authActions.SAVE_AUTH_STATE_SUCCEEDED),
        map(() => new authActions.ResetAuthActionStatus())
      );

  @Effect()
  authStateLoadFailed$ =
    this.actions$
      .pipe(
        ofType(authActions.AUTH_STATE_LOAD_FAILED),
        map(() => new authActions.Logout())
      );

  @Effect()
  saveAuthStateFailed$ =
    this.actions$
      .pipe(
        ofType(authActions.SAVE_AUTH_STATE_FAILED),
        map(() => new authActions.Logout())
      );

  @Effect()
  refreshTokenFailed$ =
    this.actions$
      .pipe(
        ofType(authActions.REFRESH_TOKEN_FAILED),
        map(() => new authActions.Logout())
      );

  @Effect({ dispatch: false })
  logout$ =
    this.actions$
      .pipe(
        ofType(authActions.LOGOUT),
        switchMap(() => this.authService.logout().pipe(map(() => window.location.href = window.location.origin + '/logout'), catchError((error) => Observable.of({}))))
      );

  constructor(private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<ClientState>) {
  }
}
