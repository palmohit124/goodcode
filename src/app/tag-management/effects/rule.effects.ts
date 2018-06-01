import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { RuleAttributeService } from '../services/rule-attribute/rule-attribute.service';
import { ruleActions } from '../actions';
import { ToastService } from '../../core/services/toastr/toast.service';
import { TagManagementState, ruleset } from '../reducers';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class RuleEffects {
  constructor(private actions$: Actions,
    private ruleAttributeService: RuleAttributeService,
    private toastrService: ToastService,
    private store: Store<TagManagementState>) {
  }

  @Effect()
  loadRuleDetails$ =
  this.actions$
    .pipe(
      ofType(ruleActions.LOAD),
      switchMap((c: ruleActions.Load) =>
        this.ruleAttributeService
          .loadRuleDetails(c.queryParam)
            .pipe(
              map(result => new ruleActions.LoadSuccess(result)),
              catchError(error => Observable.of(new ruleActions.LoadFail(error)))
            )
      )
    );


  @Effect()
  addRuleset$ =
  this.actions$
    .pipe(
      ofType(ruleActions.ADD_RULE_ATTRIBUTES),
      switchMap((c: ruleActions.AddRuleAttributes) =>
        this.ruleAttributeService
          .addRuleset(c.body)
            .pipe(
              map(result => new ruleActions.AddRuleAttributesSuccess(result) ),
              catchError(error => {
                this.toastrService.show('There was a problem adding a new ruleset.', 'Sorry !!', 'error');
                return Observable.of(new ruleActions.AddRuleAttributesFail(error));
              })
            )
      )
    );

  @Effect()
  addRulesetSuccess$ =
  this.actions$
    .pipe(
      ofType(ruleActions.ADD_RULE_ATTRIBUTES_SUCCESS),
      withLatestFrom(this.store, (action, state) => ({ action, state })),
      switchMap((state) => {
        this.toastrService.show('Rule attributes have been created', 'Congratulations !!', 'success');
        return Observable.of(new ruleActions.ResetRulesetActionStatus());
      })
    );

  @Effect()
  editRulesetAttribute$ =
  this.actions$
    .pipe(
      ofType(ruleActions.EDIT_RULE_ATTRIBUTE),
      switchMap((c: ruleActions.EditRuleAttribute) =>
        this.ruleAttributeService
          .editRulesetAttribute(c.id, c.attribute, c.body)
            .pipe(
              map(result => new ruleActions.EditRuleAttributeSuccess(result)),
              catchError(error => Observable.of(new ruleActions.EditRuleAttributeFail(error)))
            )
      )
    );

  @Effect()
  editRulesetAttributeSuccess$ =
  this.actions$
    .pipe(
      ofType(ruleActions.EDIT_RULE_ATTRIBUTE_SUCCESS),
      map(() => {
        this.toastrService.show('Rule attribute has been edited.', 'Edited Successfuly!', 'success');
        return new ruleActions.ResetRulesetActionStatus();
      })
    );

  @Effect({ dispatch: false })
  editRulesetAttributeFail$ =
  this.actions$
    .pipe(
      ofType(ruleActions.EDIT_RULE_ATTRIBUTE_FAIL),
      tap(() => this.toastrService.show('There was a problem editing the rule attribute.', 'Sorry !!', 'error'))
    );

  @Effect()
  deleteAttribute$ =
  this.actions$
    .pipe(
      ofType(ruleActions.DELETE_RULE_ATTRIBUTE),
      switchMap((c: ruleActions.DeleteRuleAttribute) =>
        this.ruleAttributeService
          .deleteAttribute(c.body)
          .pipe(
            map(result => new ruleActions.DeleteRuleAttributeSuccess()),
            catchError(error => Observable.of(new ruleActions.DeleteRuleAttributeFail(error)))
          )
      )
    );

  @Effect()
  deleteAttributeSuccess$ =
  this.actions$
    .pipe(
      ofType(ruleActions.DELETE_RULE_ATTRIBUTE_SUCCESS),
      map(() => {
        this.toastrService.show('The rule attribute has been deleted.', 'Deletion Successful!', 'success');
        return new ruleActions.ResetRulesetActionStatus();
      })
    );


  @Effect({ dispatch: false })
  deleteAttributeFail$ =
  this.actions$
    .pipe(
      ofType(ruleActions.DELETE_RULE_ATTRIBUTE_FAIL),
      tap(() => this.toastrService.show('There was a problem in deleting the rule attribute', 'Sorry !!', 'error'))
    );
}

