import { Action } from '@ngrx/store';
import { tag } from '../../helpers';
import { Customer, CustomerList } from '../../models/customer';

export const LOADINIT = tag('[Customer] Load customers init');
export const LOAD = tag('[Customer] Load customers');
export const LOAD_SUCCESS = tag('[Customer] Load Success');
export const LOAD_FAIL = tag('[Customer] Load Fail');
export const ADD = tag('[Customer] Add customer');
export const ADD_SUCCESS = tag('[Customer] Add success');
export const RESET_CUSTOMER_CREATION_STATUS = tag('[Customer] Reset cration status');
export const ADD_FAIL = tag('[Customer] Add Fail');
export const SELECTED_INIT = tag('[Customer] Selected init');
export const SELECT = tag('[Customer] Select customer');
export const SELECT_SUCCESS = tag('[Customer] Select success');
export const SELECT_FAIL = tag('[Customer] Select fail');
export const EDIT = tag('[Customer] Edit customer');
export const EDIT_SUCCESS = tag('[Customer] Edit Success');
export const EDIT_FAIL = tag('[Customer] Edit Fail');


export class LoadInit implements Action {
  readonly type = LOADINIT;
}

export class Load implements Action {
  readonly type = LOAD;

  constructor(public payload: any) { }
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: CustomerList) { }
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: string) {
  }
}

export class Add implements Action {
  readonly type = ADD;

  constructor(public body: any) { }
}

export class AddSuccess implements Action {
  readonly type = ADD_SUCCESS;
}

export class AddFail implements Action {
  readonly type = ADD_FAIL;

  constructor(public payload: string) {
  }
}

export class ResetCustomerCreationStatus implements Action {
  readonly type = RESET_CUSTOMER_CREATION_STATUS;
}

export class SelectedInit implements Action {
  readonly type = SELECTED_INIT;
}

export class Select implements Action {
  readonly type = SELECT;

  constructor(public payload: Customer) { }
}

export class SelectSuccess implements Action {
  readonly type = SELECT_SUCCESS;

  constructor(public payload: Customer) { }
}

export class SelectFail implements Action {
  readonly type = SELECT_FAIL;

  constructor(public payload: string) {
  }
}

export class Edit implements Action {
  readonly type = EDIT;

  constructor(public id: string, public body: any) { }
}

export class EditSuccess implements Action {
  readonly type = EDIT_SUCCESS;

  constructor(public payload: Customer) { }
}

export class EditFail implements Action {
  readonly type = EDIT_FAIL;

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
  ResetCustomerCreationStatus |
  SelectedInit |
  Select |
  SelectSuccess |
  SelectFail |
  Edit |
  EditSuccess |
  EditFail;
