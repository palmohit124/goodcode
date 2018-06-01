import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { platformAccountActions } from '../actions';
import { PlatformAccountService } from '../services/platform-account/platform-account.service';
import { ToastService } from '../../core/services/toastr/toast.service';

@Injectable()
export class PlatformAccountEffects {

  constructor(
    private actions$: Actions,
    private platformAccountService: PlatformAccountService,
    private toastrService: ToastService) {
  }

  @Effect()
  loadLinkedPlatformAccounts$ =
    this.actions$
      .pipe(
          ofType(platformAccountActions.LOAD_LINKED),
          switchMap((c: platformAccountActions.LoadLinked) =>
            this.platformAccountService
              .loadLinkedPlatformAccounts(c.id, c.queryParam)
              .pipe(
                map(result => new platformAccountActions.LoadLinkedSuccess(result)),
                catchError(error => Observable.of(new platformAccountActions.LoadLinkedFail(error)))
              )
          )
      );

  @Effect()
  loadUnlinkedParentAccounts$ =
    this.actions$
      .pipe(
        ofType(platformAccountActions.LOAD_UNLINKED_PARENT),
        switchMap((c: platformAccountActions.LoadUnlinkedParent) =>
          this.platformAccountService
            .loadUnlinkedParentAccounts(c.id, c.queryParam)
            .pipe(
              map(result => new platformAccountActions.LoadUnlinkedParentSuccess(result)),
              catchError(error => Observable.of(new platformAccountActions.LoadUnlinkedParentFail(error)))
            )
        )
      );

  @Effect()
  linkParentAccounts$ =
    this.actions$
      .pipe(
        ofType(platformAccountActions.LINK_PARENT),
        switchMap((c: platformAccountActions.LinkParent) =>
          this.platformAccountService
            .linkParentAccount(c.customerId, c.platformId)
            .pipe(
              map(result => new platformAccountActions.LinkParentSuccess()),
              catchError(error => Observable.of(new platformAccountActions.LinkParentFail(error)))
            )
        )
    );

  @Effect()
  linkParentAccountsSuccess$ =
    this.actions$
      .pipe(
        ofType(platformAccountActions.LINK_PARENT_SUCCESS),
        map(() => {
          this.toastrService.show('Parent account linked successfully', 'Congratulations !!', 'success');
          return new platformAccountActions.ResetPlatformAccountActionStatus();
        })
      );

  @Effect({ dispatch: false })
  linkParentAccountsFail$ =
    this.actions$
      .pipe(
        ofType(platformAccountActions.LINK_PARENT_FAIL),
        tap(() => this.toastrService.show('There was a problem linking parent account', 'Sorry !!', 'error'))
      );

  @Effect()
  loadUnlinkedChildAccounts$ =
    this.actions$
      .pipe(
        ofType(platformAccountActions.LOAD_UNLINKED_CHILD),
        switchMap((c: platformAccountActions.LoadUnlinkedChild) =>
          this.platformAccountService
            .loadUnlinkedChildAccounts(c.id, c.parentId, c.queryParam)
            .pipe(
              map(result => new platformAccountActions.LoadUnlinkedChildSuccess(result)),
              catchError(error => Observable.of(new platformAccountActions.LoadUnlinkedChildFail(error)))
            )
        )
      );

  @Effect()
  linkChildAccounts$ =
    this.actions$
    .pipe(
        ofType(platformAccountActions.LINK_CHILD),
        switchMap((c: platformAccountActions.LinkChild) =>
          this.platformAccountService
            .linkChildAccount(c.id, c.platformId)
            .pipe(
              map(result => new platformAccountActions.LinkChildSuccess()),
              catchError(error => Observable.of(new platformAccountActions.LinkChildFail(error)))
            )
        )
    );

  @Effect()
  linkChildAccountsSuccess$ =
    this.actions$
      .pipe(
        ofType(platformAccountActions.LINK_CHILD_SUCCESS),
        map(() => {
          this.toastrService.show('Platform account linked successfully', 'Congratulations !!', 'success');
          return new platformAccountActions.ResetPlatformAccountActionStatus();
        })
    );


  @Effect()
  linkChildAccountsFail$ =
    this.actions$
      .pipe(
        ofType(platformAccountActions.LINK_CHILD_FAIL),
        map(() => {
          this.toastrService.show('There was a problem linking platform account', 'Sorry !!', 'error');
          return new platformAccountActions.ResetPlatformAccountActionStatus();
        })
      );
}
