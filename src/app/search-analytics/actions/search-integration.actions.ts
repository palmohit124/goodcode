import { Action } from '@ngrx/store';
import { tag } from '../../helpers/index';
import { SearchIntegrationList } from '../../models/search-integration';

export const LOAD = tag('[SearchIntegration] Load SearchIntegrations');
export const LOAD_SUCCESS = tag('[SearchIntegration] Load Success');
export const LOAD_FAIL = tag('[SearchIntegration] Load Fail');

export const CREATE = tag('[SearchIntegration] Create');
export const CREATE_SUCCESS = tag('[SearchIntegration] Create Success');
export const CREATE_FAIL = tag('[SearchIntegration] Create Fail');

export const REMOVE = tag('[SearchIntegration] Remove Search Integration');
export const REMOVE_SUCCESS = tag('[SearchIntegration] Remove Success');
export const REMOVE_FAIL = tag('[SearchIntegration] Remove Fail');

export const RESET_SEARCH_INTEGRATION_ACTION_STATUS = tag('[SearchIntegration] Reset Search Integration action status');

export class Load implements Action {
  readonly type = LOAD;

  constructor(public id: string, public queryParam: any) { }
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: SearchIntegrationList) { }
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: string) { }
}

export class Create implements Action {
  readonly type = CREATE;

  constructor(public customerId: string, public source: string, public redirecUri: string) { }
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;
}

export class CreateFail implements Action {
  readonly type = CREATE_FAIL;

  constructor(public payload: string) { }
}

export class Remove implements Action {
  readonly type = REMOVE;

  constructor(public href: string) { }
}

export class RemoveSuccess implements Action {
  readonly type = REMOVE_SUCCESS;
}

export class RemoveFail implements Action {
  readonly type = REMOVE_FAIL;

  constructor(public payload: string) {
  }
}

export class ResetSearchIntegrationActionStatus implements Action {
  readonly type = RESET_SEARCH_INTEGRATION_ACTION_STATUS;
}

export type Actions =
  Load |
  LoadSuccess |
  LoadFail |
  Create |
  CreateSuccess |
  CreateFail |
  Remove |
  RemoveSuccess |
  RemoveFail |
  ResetSearchIntegrationActionStatus;
