import { platformAccountActions } from './';
import * as platformAccount from '../../models/platform-account';

const mockLinkedPlatformAccounts: platformAccount.LinkedPlatformAccounts = {
  'parent': {
    'platformId': '12F2504S1',
    'name': 'Account Name',
    'parentId': null,
    'href': '/account/admin?acc=12F2504S1'
  },
  'children': [
    {
      'platformId': '12F2504S1',
      'name': 'Account Name',
      'parentId': '13F2504E0',
      'href': '/account/admin?acc=12F2504S1'
    },
    {
      'platformId': '12F2504S1',
      'name': 'Account Name 1',
      'parentId': '13F2504E0',
      'href': '/account/admin?acc=12F2504S1'
    }
  ],
  'total_items': 2,
};

const mockUnlinkParentAccount: platformAccount.UnlinkedParentAccounts = {
  'parents': [
    {
      'platformId': '12F2504S1',
      'name': 'Account Name 1',
      'parentId': null,
      'href': '/account/admin?acc=12F2504S1'
    },
    {
      'platformId': '12F2504S1',
      'name': 'Account Name 2',
      'parentId': null,
      'href': '/account/admin?acc=12F2504S1'
    }
  ],
  'total_items': 2,
};

const mockUnlinkChildAccount: platformAccount.UnlinkedChildAccounts = {
  'children': [
    {
      'platformId': '12F2504S1',
      'name': 'Account Name',
      'parentId': '13F2504E0',
      'href': '/account/admin?acc=12F2504S1'
    },
    {
      'platformId': '12F2504S1',
      'name': 'Account Name 1',
      'parentId': '13F2504E0',
      'href': '/account/admin?acc=12F2504S1'
    }
  ],
  'total_items': 2,
};

describe('Platform Account Actions', () => {
  it('should define a load link platform account action', () => {
    const action = new platformAccountActions.LoadLinked('', {});
    expect(action.type).toBe(platformAccountActions.LOAD_LINKED);
  });

  it('should define a load link success platform account action', () => {
    const action = new platformAccountActions.LoadLinkedSuccess(mockLinkedPlatformAccounts);
    expect(action.type).toBe(platformAccountActions.LOAD_LINKED_SUCCESS);
    expect(action.payload).toBe(mockLinkedPlatformAccounts);
  });

  it('should define a load link fail search platform action', () => {
    const action = new platformAccountActions.LoadLinkedFail('Error');
    expect(action.type).toBe(platformAccountActions.LOAD_LINKED_FAIL);
    expect(action.payload).toBe('Error');
  });


  it('should define a load unlink parent account action', () => {
    const action = new platformAccountActions.LoadUnlinkedParent('', {});
    expect(action.type).toBe(platformAccountActions.LOAD_UNLINKED_PARENT);
  });

  it('should define a load unlink parent success account action', () => {
    const action = new platformAccountActions.LoadUnlinkedParentSuccess(mockUnlinkParentAccount);
    expect(action.type).toBe(platformAccountActions.LOAD_UNLINKED_PARENT_SUCCESS);
    expect(action.payload).toBe(mockUnlinkParentAccount);
  });

  it('should define a load unlink parent fail action', () => {
    const action = new platformAccountActions.LoadUnlinkedParentFail('Error');
    expect(action.type).toBe(platformAccountActions.LOAD_UNLINKED_PARENT_FAIL);
    expect(action.payload).toBe('Error');
  });


  it('should define a link parent account action', () => {
    const action = new platformAccountActions.LinkParent('', '');
    expect(action.type).toBe(platformAccountActions.LINK_PARENT);
  });

  it('should define a link parent success account action', () => {
    const action = new platformAccountActions.LinkParentSuccess();
    expect(action.type).toBe(platformAccountActions.LINK_PARENT_SUCCESS);
  });

  it('should define a link parent fail action', () => {
    const action = new platformAccountActions.LinkParentFail('Error');
    expect(action.type).toBe(platformAccountActions.LINK_PARENT_FAIL);
    expect(action.payload).toBe('Error');
  });


  it('should define a load unlink child account action', () => {
    const action = new platformAccountActions.LoadUnlinkedChild('', '', {});
    expect(action.type).toBe(platformAccountActions.LOAD_UNLINKED_CHILD);
  });

  it('should define a load unlink child success account action', () => {
    const action = new platformAccountActions.LoadUnlinkedChildSuccess(mockUnlinkChildAccount);
    expect(action.type).toBe(platformAccountActions.LOAD_UNLINKED_CHILD_SUCCEESS);
    expect(action.payload).toBe(mockUnlinkChildAccount);
  });

  it('should define a load unlink child fail action', () => {
    const action = new platformAccountActions.LoadUnlinkedChildFail('Error');
    expect(action.type).toBe(platformAccountActions.LOAD_UNLINKED_CHILD_FAIL);
    expect(action.payload).toBe('Error');
  });


  it('should define a link child account action', () => {
    const action = new platformAccountActions.LinkChild('', '');
    expect(action.type).toBe(platformAccountActions.LINK_CHILD);
  });

  it('should define a link child success account action', () => {
    const action = new platformAccountActions.LinkChildSuccess();
    expect(action.type).toBe(platformAccountActions.LINK_CHILD_SUCCESS);
  });

  it('should define a link child fail action', () => {
    const action = new platformAccountActions.LinkChildFail('Error');
    expect(action.type).toBe(platformAccountActions.LINK_CHILD_FAIL);
    expect(action.payload).toBe('Error');
  });

});
