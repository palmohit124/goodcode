import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap, flatMap } from 'rxjs/operators';
import { OauthClientService } from '../services/oauth-client/oauth-client.service';
import { SearchIntegrationService } from '../services/search-integration/search-integration.service';
import { searchIntegrationActions } from '../actions';
import { ToastService } from '../../core/services/toastr/toast.service';


@Injectable()
export class SearchIntegrationEffects {
  private oAuthConfig;
  constructor(
    private actions$: Actions,
    private oauthClient: OauthClientService,
    private searchIntegrationService: SearchIntegrationService,
    private toastrService: ToastService) {
  }


  @Effect()
  loadSearchIntegrations$ =
    this.actions$
      .pipe(
        ofType(searchIntegrationActions.LOAD),
        switchMap((s: searchIntegrationActions.Load) =>
          this.searchIntegrationService
            .loadSearchIntegrations(s.id, s.queryParam)
            .pipe(
              map(searchIntegration => new searchIntegrationActions.LoadSuccess(searchIntegration)),
              catchError(err => Observable.of(new searchIntegrationActions.LoadFail(err)))
            )
        )
    );

  @Effect()
  createSearchIntegration$ =
    this.actions$
      .pipe(
        ofType(searchIntegrationActions.CREATE),
        switchMap((s: searchIntegrationActions.Create) =>
          this.searchIntegrationService
            .getIntegrationAuthorizationUrl(s.source, { redirect_uri: s.redirecUri })
            .pipe(
              flatMap(authUrl =>
                this.oauthClient
                  .grant(authUrl, s.customerId)
              ),
              flatMap(authCode =>
                this.searchIntegrationService
                  .createSearchIntegrations(s.customerId, { source: s.source, authCode: authCode, redirectUri: s.redirecUri })
              ),
              flatMap((integration) => Observable.of(new searchIntegrationActions.CreateSuccess())),
              catchError(err => Observable.of(new searchIntegrationActions.CreateFail(err)))
            )
        )
    );

  @Effect()
  createSearchIntegrationSuccess$ =
    this.actions$
      .pipe(
        ofType(searchIntegrationActions.CREATE_SUCCESS),
        map(() => {
          this.toastrService.show('Search integration created successfully', 'Congratulations !!', 'success');
          return new searchIntegrationActions.ResetSearchIntegrationActionStatus();
        })
      );

  @Effect({ dispatch: false })
  createSearchIntegrationsFail$ =
    this.actions$
      .pipe(
        ofType(searchIntegrationActions.CREATE_FAIL),
        tap(() => this.toastrService.show('There was a problem creating search integration', 'Sorry !!', 'error'))
      );

  @Effect()
  removeSearchIntegration$ =
    this.actions$
      .pipe(
        ofType(searchIntegrationActions.REMOVE),
        switchMap((c: searchIntegrationActions.Remove) =>
          this.searchIntegrationService
            .removeSearchIntegration(c.href)
            .pipe(
              map(result => new searchIntegrationActions.RemoveSuccess()),
              catchError(error => Observable.of(new searchIntegrationActions.RemoveFail(error)))
            )
        )
    );

  @Effect()
  removeSearchIntegrationSuccess$ =
    this.actions$
      .pipe(
        ofType(searchIntegrationActions.REMOVE_SUCCESS),
        map(() => {
          this.toastrService.show('Removed search integration successfully', 'Congratulations !!', 'success');
          return new searchIntegrationActions.ResetSearchIntegrationActionStatus();
        })
      );

  @Effect({ dispatch: false })
  removeSearchIntegrationsFail$ =
    this.actions$
      .pipe(
        ofType(searchIntegrationActions.REMOVE_FAIL),
        tap(() => this.toastrService.show('There was a problem removing search integration', 'Sorry !!', 'error'))
      );

}
