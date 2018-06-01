import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { RulesetService } from '../services/rule-set/rule-set.service';
import { rulesetActions } from '../actions';
import { ToastService } from '../../core/services/toastr/toast.service';
import { catchError, map, switchMap, tap, withLatestFrom, mergeMap } from 'rxjs/operators';

@Injectable()
export class RulesetEffects {

  constructor(private actions$: Actions,
    private rulesetService: RulesetService,
    private router: Router,
    private toastrService: ToastService,
    private store: Store<any>) {
  }

  @Effect()
  loadRulesetsInit$ =
  this.actions$
    .pipe(
      ofType(rulesetActions.LOADINIT),
      withLatestFrom(this.store, (action, state) => ({ action, state })),
      switchMap(({ action, state }) => {
        if (!state.tagManagement.ruleset.loading) {
          return Observable.of(new rulesetActions.Load(
            state.tagManagement.ruleset.accountId,
            {
              offset: 0,
              limit: 10,
            }
          ));
        } else {
          return empty();
        }
      })
    );

  @Effect()
  loadRulesetList$ =
  this.actions$
    .pipe(
      ofType(rulesetActions.LOAD),
      mergeMap((c: rulesetActions.Load) =>
        this.rulesetService
          .loadRulesetList(c.accountId, c.queryParam)
            .pipe(
              map(result => new rulesetActions.LoadSuccess(result)),
              catchError(error => Observable.of(new rulesetActions.LoadFail(error)))
            )
      )
    );

  @Effect()
  addRule$ =
  this.actions$
    .pipe(
      ofType(rulesetActions.ADD),
      switchMap((c: rulesetActions.Add) =>
        this.rulesetService
          .addRule(c.body)
            .pipe(
              map(result => {
                this.rulesetService.saveRuleSession(result.graphId);
                return new rulesetActions.AddSuccess(result);
              }),
              catchError(error => {
                return Observable.of(new rulesetActions.AddFail(error.indexOf('400') > -1 ? 'Campaign is already assigned' : 'Some error occured'));
              })
            )
      )
    );

  @Effect()
  addRuleSuccess$ =
  this.actions$
    .pipe(
      ofType(rulesetActions.ADD_SUCCESS),
      withLatestFrom(this.store, (action, state) => ({ action, state })),
      switchMap(({ action, state }) => {
        this.toastrService.show('New rule has been created', 'Congratulations !!', 'success');
        const url = 'tag-management/' + state.tagManagement.ruleset.accountId + '/rule';
        this.router.navigate([url]);
        return Observable.of(new rulesetActions.ResetRuleActionStatus());
      })
    );

  @Effect()
  selectRule$ =
  this.actions$
    .pipe(
      ofType(rulesetActions.SELECT),
      switchMap((c: rulesetActions.Select) =>
        this.rulesetService
          .saveRuleSession(c.payload.graphId)
            .pipe(
              map(result => new rulesetActions.SelectSuccess(c.payload)),
              catchError(error => Observable.of(new rulesetActions.SelectSuccess(c.payload)))
            )
      )
    );

  @Effect({ dispatch: false })
  selectRuleFail$ =
  this.actions$
    .pipe(
      ofType(rulesetActions.SELECT_FAIL),
      withLatestFrom(this.store, (action, state) => ({ action, state })),
      tap(({ action, state }) => {
        this.router.navigate(['tag-management', state.tagManagement.ruleset.accountId]);
      })
    );

  @Effect()
  deleteRule$ =
  this.actions$
    .pipe(
      ofType(rulesetActions.DELETE),
      switchMap((c: rulesetActions.Delete) =>
        this.rulesetService
          .deleteRule(c.queryParam)
            .pipe(
              map(result => new rulesetActions.DeleteSuccess()),
              catchError(error => Observable.of(new rulesetActions.SelectSuccess(error))),
            )
      )
    );

  @Effect()
  deleteRuleSuccess$ =
  this.actions$
    .pipe(
      ofType(rulesetActions.DELETE_SUCCESS),
      map(() => {
        this.toastrService.show('Rule has been deleted', 'Deleted !!', 'success');
        return new rulesetActions.ResetRuleActionStatus();
      })
    );

  @Effect({ dispatch: false })
  deleteRuleFail$ =
  this.actions$
    .pipe(
      ofType(rulesetActions.DELETE_FAIL),
      tap(() => this.toastrService.show('Some error occured while deleting the rule', 'Error !!', 'error'))
    );

  @Effect()
  selectedInit$ =
  this.actions$
    .pipe(
      ofType(rulesetActions.SELECTED_INIT),
      withLatestFrom(this.store, (action, state) => ({ action, state })),
      switchMap(({ action, state }) => {
        if (state.tagManagement.ruleset.selectedRuleset) {
          return empty();
        } else {
          return this.rulesetService
            .loadRuleSession()
              .then(result => {
                return new rulesetActions.SelectSuccess(result);
              })
              .catch((error) => new rulesetActions.SelectFail(error));
        }
      })
    );
}
