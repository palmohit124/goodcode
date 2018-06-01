import { Action } from '@ngrx/store';
import { tag } from '../../helpers';
import { SearchAccountList } from '../../models/search-account';

export const LOAD_LINKED = tag('[SearchAccount] Load Search accounts');
export const LOAD_UNLINKED = tag('[SearchAccount] Load Unlinked Search accounts');
export const LOAD_SUCCESS = tag('[SearchAccount] Load Success');
export const LOAD_FAIL = tag('[SearchAccount] Load Fail');

export const UNLINK = tag('[SearchAccount] Unlink Search Account');
export const UNLINK_SUCCESS = tag('[SearchAccount] Unlink Success');
export const UNLINK_FAIL = tag('[SearchAccount] Unlink Fail');

export const LINK = tag('[SearchAccount] Link Search Account');
export const LINK_SUCCESS = tag('[SearchAccount] Link Success');
export const LINK_FAIL = tag('[SearchAccount] Link Fail');

export const RESET_SEARCH_ACCOUNT_ACTION_STATUS = tag('[SearchAccount] Reset Search Account action status');

export class LoadLinked implements Action {
  readonly type = LOAD_LINKED;

  constructor(public id: string, public queryParam: any) { }
}

export class LoadUnlinked implements Action {
  readonly type = LOAD_UNLINKED;

  constructor(public id: string, public integrationId: string, public queryParam: any) { }
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: SearchAccountList) { }
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: string) { }
}

export class Unlink implements Action {
  readonly type = UNLINK;

  constructor(public href: string) { }
}

export class UnlinkSuccess implements Action {
  readonly type = UNLINK_SUCCESS;
}

export class UnlinkFail implements Action {
  readonly type = UNLINK_FAIL;

  constructor(public payload: string) {
  }
}

export class Link implements Action {
  readonly type = LINK;

  constructor(public body: any, public href: string) { }
}

export class LinkSuccess implements Action {
  readonly type = LINK_SUCCESS;
}

export class LinkFail implements Action {
  readonly type = LINK_FAIL;

  constructor(public payload: string) {
  }
}

export class ResetSearchAccountActionStatus implements Action {
  readonly type = RESET_SEARCH_ACCOUNT_ACTION_STATUS;
}


export type Actions =
  LoadLinked |
  LoadUnlinked |
  LoadSuccess |
  LoadFail |
  Unlink |
  UnlinkSuccess |
  UnlinkFail |
  Link |
  LinkSuccess |
  LinkFail |
  ResetSearchAccountActionStatus;
