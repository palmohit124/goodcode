import { Action } from '@ngrx/store';
import { tag } from '../../helpers/index';
import { PlatformAccount, LinkedPlatformAccounts, UnlinkedParentAccounts, UnlinkedChildAccounts } from '../../models/platform-account';

export const LOAD_LINKED = tag('[PlatformAccount] Load linked platform accounts');
export const LOAD_LINKED_SUCCESS = tag('[PlatformAccount] Load linked platform accounts Success');
export const LOAD_LINKED_FAIL = tag('[PlatformAccount] Load linked platform accounts Fail');

export const LOAD_UNLINKED_PARENT = tag('[PlatformAccount] Load unlinked parent accounts');
export const LOAD_UNLINKED_PARENT_SUCCESS = tag('[PlatformAccount] Load unlinked parent accounts Success');
export const LOAD_UNLINKED_PARENT_FAIL = tag('[PlatformAccount] Load unlinked parent accounts Fail');
export const LINK_PARENT = tag('[PlatformAccount] Link unlinked parent account');
export const LINK_PARENT_SUCCESS = tag('[PlatformAccount] Link unlinked parent account Success');
export const LINK_PARENT_FAIL = tag('[PlatformAccount] Link unlinked parent account Fail');

export const LOAD_UNLINKED_CHILD = tag('[PlatformAccount] Load unlinked child accounts');
export const LOAD_UNLINKED_CHILD_SUCCEESS = tag('[PlatformAccount] Load unlinked child accounts Success');
export const LOAD_UNLINKED_CHILD_FAIL = tag('[PlatformAccount] Load unlinked child accounts Fail');
export const LINK_CHILD = tag('[PlatformAccount] Link Child Account');
export const LINK_CHILD_SUCCESS = tag('[PlatformAccount] Link Child Account Success');
export const LINK_CHILD_FAIL = tag('[PlatformAccount] Link Child Account Fail');

export const RESET_PLATFORM_ACCOUNT_ACTION_STATUS = tag('[PlatformAccount] Reset Platform Account action status');


export class LoadLinked implements Action {
  readonly type = LOAD_LINKED;

  constructor(public id: string, public queryParam: any) { }
}

export class LoadLinkedSuccess implements Action {
  readonly type = LOAD_LINKED_SUCCESS;

  constructor(public payload: LinkedPlatformAccounts) { }
}

export class LoadLinkedFail implements Action {
  readonly type = LOAD_LINKED_FAIL;

  constructor(public payload: string) { }
}

export class LoadUnlinkedParent implements Action {
  readonly type = LOAD_UNLINKED_PARENT;

  constructor(public id: string, public queryParam: any) { }
}

export class LoadUnlinkedParentSuccess implements Action {
  readonly type = LOAD_UNLINKED_PARENT_SUCCESS;

  constructor(public payload: UnlinkedParentAccounts) { }
}

export class LoadUnlinkedParentFail implements Action {
  readonly type = LOAD_UNLINKED_PARENT_FAIL;

  constructor(public payload: string) { }
}

export class LinkParent implements Action {
  readonly type = LINK_PARENT;

  constructor(public customerId: string, public platformId: string) { }
}

export class LinkParentSuccess implements Action {
  readonly type = LINK_PARENT_SUCCESS;
}

export class LinkParentFail implements Action {
  readonly type = LINK_PARENT_FAIL;

  constructor(public payload: string) { }
}

export class LoadUnlinkedChild implements Action {
  readonly type = LOAD_UNLINKED_CHILD;

  constructor(public id: string, public parentId: string, public queryParam: any) { }
}

export class LoadUnlinkedChildSuccess implements Action {
  readonly type = LOAD_UNLINKED_CHILD_SUCCEESS;

  constructor(public payload: UnlinkedChildAccounts) { }
}

export class LoadUnlinkedChildFail implements Action {
  readonly type = LOAD_UNLINKED_CHILD_FAIL;

  constructor(public payload: string) { }
}

export class LinkChild implements Action {
  readonly type = LINK_CHILD;

  constructor(public id: string, public platformId: string) { }
}

export class LinkChildSuccess implements Action {
  readonly type = LINK_CHILD_SUCCESS;
}

export class LinkChildFail implements Action {
  readonly type = LINK_CHILD_FAIL;

  constructor(public payload: string) {}
}

export class ResetPlatformAccountActionStatus implements Action {
  readonly type = RESET_PLATFORM_ACCOUNT_ACTION_STATUS;
}


export type Actions =
  LoadLinked |
  LoadLinkedSuccess |
  LoadLinkedFail |
  LoadUnlinkedParent |
  LoadUnlinkedParentSuccess |
  LoadUnlinkedParentFail |
  LinkParent |
  LinkParentSuccess |
  LinkParentFail |
  LoadUnlinkedChild |
  LoadUnlinkedChildSuccess |
  LoadUnlinkedChildFail |
  LinkChild |
  LinkChildSuccess |
  LinkChildFail |
  ResetPlatformAccountActionStatus;
