import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { searchAccountActions } from '../actions';
import { SearchAccountService } from '../services/search-account/search-account.service';
import { ToastService } from '../../core/services/toastr/toast.service';

@Injectable()
export class SearchAccountEffects {

  constructor(
    private actions$: Actions,
    private searchAccountService: SearchAccountService,
    private toastrService: ToastService) {
  }

  @Effect()
  loadSearchAccounts$ =
    this.actions$
      .pipe(
        ofType(searchAccountActions.LOAD_LINKED),
        switchMap((c: searchAccountActions.LoadLinked) =>
          this.searchAccountService
            .loadSearchAccounts(c.id, c.queryParam)
            .pipe(
              map(result => new searchAccountActions.LoadSuccess(result)),
              catchError(error => Observable.of(new searchAccountActions.LoadFail(error)))
            )
        )
    );

  @Effect()
  loadUnlinkedSearchAccounts$ =
    this.actions$
      .pipe(
        ofType(searchAccountActions.LOAD_UNLINKED),
        switchMap((c: searchAccountActions.LoadUnlinked) =>
          this.searchAccountService
            .loadUnlinkedSearchAccounts(c.id, c.integrationId, c.queryParam)
            .pipe(
              map(result => new searchAccountActions.LoadSuccess(result)),
              catchError(error => Observable.of(new searchAccountActions.LoadFail(error)))
            )
        )
      );

  @Effect()
  unlinkSearchAccounts$ =
    this.actions$
      .pipe(
        ofType(searchAccountActions.UNLINK),
        switchMap((c: searchAccountActions.Unlink) =>
          this.searchAccountService
            .unlinkSearchAccount(c.href)
            .pipe(
              map(result => new searchAccountActions.UnlinkSuccess()),
              catchError(error => Observable.of(new searchAccountActions.UnlinkFail(error)))
            )
        )
    );

  @Effect()
  unlinkSearchAccountsSuccess$ =
    this.actions$
      .pipe(
        ofType(searchAccountActions.UNLINK_SUCCESS),
        map(() => {
          this.toastrService.show('Search account linked successfully', 'Congratulations !!', 'success');
          return new searchAccountActions.ResetSearchAccountActionStatus();
        })
      );


  @Effect({ dispatch: false })
  unlinkSearchAccountsFail$ =
    this.actions$
      .pipe(
        ofType(searchAccountActions.UNLINK_FAIL),
        tap(() => this.toastrService.show('There was a problem unlinking search account', 'Sorry !!', 'error'))
      );

  @Effect()
  linkSearchAccounts$ =
    this.actions$
      .pipe(
        ofType(searchAccountActions.LINK),
        switchMap((c: searchAccountActions.Link) =>
          this.searchAccountService
            .linkSearchAccount(c.body, c.href)
            .pipe(
              map(result => new searchAccountActions.LinkSuccess()),
              catchError(error => Observable.of(new searchAccountActions.LinkFail(error)))
            )
        )
    );

  @Effect()
  linkSearchAccountsSuccess$ =
    this.actions$
      .pipe(
        ofType(searchAccountActions.LINK_SUCCESS),
        map(() => {
          this.toastrService.show('Search account linked successfully', 'Congratulations !!', 'success');
          return new searchAccountActions.ResetSearchAccountActionStatus();
        })
    );


  @Effect()
  linkSearchAccountsFail$ =
    this.actions$
      .pipe(
        ofType(searchAccountActions.LINK_FAIL),
        map(() => {
          this.toastrService.show('There was a problem linking search account', 'Sorry !!', 'error');
          return new searchAccountActions.ResetSearchAccountActionStatus();
        })
      );
}
