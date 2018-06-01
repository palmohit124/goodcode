import { Action } from '@ngrx/store';
import { tag } from '../../helpers/index';
import { Rule, RuleSet } from '../../models/rule-set';

export const LOADINIT = tag('[Rule] Load rulesets init');
export const LOAD = tag('[Rule] Load rulesets');
export const LOAD_SUCCESS = tag('[Rule] Load Success');
export const LOAD_FAIL = tag('[Rule] Load Fail');

export const ADD = tag('[Rule] Add Rule');
export const ADD_SUCCESS = tag('[Rule] Add success');
export const ADD_FAIL = tag('[Rule] Add Fail');

export const DELETE = tag('[Rule] Delete rulesets');
export const DELETE_SUCCESS = tag('[Rule] Delete Success');
export const DELETE_FAIL = tag('[Rule] Delete Fail');

export const SELECTED_INIT = tag('[Rule] Selected init');
export const SELECT = tag('[Rule] Select rule');
export const SELECT_SUCCESS = tag('[Rule] Select success');
export const SELECT_FAIL = tag('[Rule] Select fail');

export const ADD_ACCOUNT = tag('[Rule] Add account');
export const RESET_RULE_ACTION_STATUS = tag('[Ruleset] Reset rule action status');

export class LoadInit implements Action {
  readonly type = LOADINIT;
}

export class Load implements Action {
  readonly type = LOAD;
  constructor(public accountId: string, public queryParam: any) { }
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: RuleSet) { }
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: string) {
  }
}
export class Delete implements Action {
  readonly type = DELETE;
  constructor(public queryParam: any) { }
}

export class DeleteSuccess implements Action {
  readonly type = DELETE_SUCCESS;
}

export class DeleteFail implements Action {
  readonly type = DELETE_FAIL;

  constructor(public payload: string) {
  }
}

export class Add implements Action {
  readonly type = ADD;

  constructor(public body: any) { }
}

export class AddSuccess implements Action {
  readonly type = ADD_SUCCESS;
  constructor(public payload: Rule) {
  }
}

export class AddFail implements Action {
  readonly type = ADD_FAIL;
  constructor(public payload: string) { }
}

export class ResetRuleActionStatus implements Action {
  readonly type = RESET_RULE_ACTION_STATUS;
}

export class AddAccount implements Action {
  readonly type = ADD_ACCOUNT;
  constructor(public payload: string) { }
}

export class SelectedInit implements Action {
  readonly type = SELECTED_INIT;
}

export class Select implements Action {
  readonly type = SELECT;

  constructor(public payload: Rule) { }
}

export class SelectSuccess implements Action {
  readonly type = SELECT_SUCCESS;

  constructor(public payload: Rule) { }
}

export class SelectFail implements Action {
  readonly type = SELECT_FAIL;

  constructor(public payload: string) {
  }
}

export type Actions =
  LoadInit |
  Load |
  LoadSuccess |
  LoadFail |
  Add |
  AddSuccess |
  AddFail |
  ResetRuleActionStatus |
  AddAccount |
  Select |
  SelectedInit |
  SelectSuccess |
  SelectFail |
  Delete |
  DeleteSuccess |
  DeleteFail;
