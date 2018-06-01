import { Action } from '@ngrx/store';
import { tag } from '../../helpers/index';
import { CreateRuleAttributes, Rule } from '../../models/rule-set';

export const LOAD = tag('[Rule] Load rule attributes');
export const LOAD_SUCCESS = tag('[Rule] Load rule attributes Success');
export const LOAD_FAIL = tag('[Rule] Load attributes Fail');

export const SELECT_CONDITION = tag('[Rule] select condition');
export const SELECT_LOOKUP = tag('[Rule] select lookup');
export const SELECT_REFDOM = tag('[Rule] select refdom');

export const ADD_RULE_ATTRIBUTES = tag('[Rule] Add Rule attributes');
export const ADD_RULE_ATTRIBUTES_SUCCESS = tag('[Rule] Add Rule attributes success');
export const ADD_RULE_ATTRIBUTES_FAIL = tag('[Rule] Add Rule attributes Fail');

export const EDIT_RULE_ATTRIBUTE = tag('[Rule] Update Rule Attribute');
export const EDIT_RULE_ATTRIBUTE_SUCCESS = tag('[Rule] Update Rule Attribute success');
export const EDIT_RULE_ATTRIBUTE_FAIL = tag('[Rule] Update Rule Attribute Fail');

export const DELETE_RULE_ATTRIBUTE = tag('[Rule] Delete rule attribute');
export const DELETE_RULE_ATTRIBUTE_SUCCESS = tag('[Rule] Delete rule attribute success');
export const DELETE_RULE_ATTRIBUTE_FAIL = tag('[Rule] Delete rule attribute Fail');

export const RESET_RULE_ACTION_STATUS = tag('[Rule] Reset rule action status');


export class Load implements Action {
  readonly type = LOAD;
  constructor(public queryParam: any) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL;
  constructor(public payload: string) {}
}

export class SelectRefdom implements Action {
  readonly type = SELECT_REFDOM;
  constructor(public payload: any) {}
}

export class SelectCondition implements Action {
  readonly type = SELECT_CONDITION;
  constructor(public payload: any) {}
}

export class SelectLookup implements Action {
  readonly type = SELECT_LOOKUP;
  constructor(public payload: any) {}
}

export class EditRuleAttribute implements Action {
  readonly type = EDIT_RULE_ATTRIBUTE;
  constructor(public id: string, public attribute: string, public body: any) { }
}

export class EditRuleAttributeSuccess implements Action {
  readonly type = EDIT_RULE_ATTRIBUTE_SUCCESS;
  constructor(public payload: any) {}
}

export class EditRuleAttributeFail implements Action {
  readonly type = EDIT_RULE_ATTRIBUTE_FAIL;
  constructor(public payload: string) {}
}

export class AddRuleAttributes implements Action {
  readonly type = ADD_RULE_ATTRIBUTES;
  constructor(public body: any) { }
}

export class AddRuleAttributesSuccess implements Action {
  readonly type = ADD_RULE_ATTRIBUTES_SUCCESS;
  constructor(public payload: CreateRuleAttributes) {
  }
}

export class AddRuleAttributesFail implements Action {
  readonly type = ADD_RULE_ATTRIBUTES_FAIL;
  constructor(public payload: string) { }
}

export class DeleteRuleAttribute implements Action {
  readonly type = DELETE_RULE_ATTRIBUTE;
  constructor(public body: any) {}
}

export class DeleteRuleAttributeSuccess implements Action {
  readonly type = DELETE_RULE_ATTRIBUTE_SUCCESS;
}

export class DeleteRuleAttributeFail implements Action {
  readonly type = DELETE_RULE_ATTRIBUTE_FAIL;
  constructor(public payload: string) {}
}

export class ResetRulesetActionStatus implements Action {
  readonly type = RESET_RULE_ACTION_STATUS;
}

export type Actions =
  Load |
  LoadSuccess |
  LoadFail |
  SelectRefdom |
  SelectCondition |
  SelectLookup |
  AddRuleAttributes |
  AddRuleAttributesSuccess |
  AddRuleAttributesFail |
  ResetRulesetActionStatus |
  EditRuleAttribute |
  EditRuleAttributeSuccess |
  EditRuleAttributeFail |
  DeleteRuleAttribute |
  DeleteRuleAttributeSuccess |
  DeleteRuleAttributeFail |
  ResetRulesetActionStatus;
