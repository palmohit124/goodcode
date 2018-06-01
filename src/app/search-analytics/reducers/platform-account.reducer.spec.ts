import { platformAccountActions } from '../actions';
import { reducer } from './platform-account.reducer';
import * as platformAccount from '../../models/platform-account';

const initialState = {
  loaded: false,
  loading: false,
  unlinkedLoaded: false,
  unlinkedloading: false,
  linkedAccounts: platformAccount.EmptyLinkedPlatformAccounts,
  unlinkedParentAccounts: platformAccount.EmptyUnlinkedParentAccounts,
  unlinkedChildAccounts: platformAccount.EmptyUnlinkedChildAccounts,
  platformAccountAction: false
};

const mockPlatformAccounts: platformAccount.LinkedPlatformAccounts = {
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

const mockParentAccount: platformAccount.UnlinkedParentAccounts = {
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

const mockChildAccount: platformAccount.UnlinkedChildAccounts = {
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


describe('The platform account reducer', () => {

  it('should return initial state on init', () => {
    const result = reducer(undefined, { type: null });
    expect(result).toEqual(initialState);
  });

  describe('when the dispatched action is Load Linked', () => {
    it('should return platform account state as loading', () => {
      const result = reducer(reducer(undefined, { type: null }), new platformAccountActions.LoadLinked('', {}));
      expect(result.loading).toEqual(true);
      expect(result.loaded).toEqual(false);
    });
  });

  describe('when the dispatched action is Load Linked Success', () => {
    it('should return search account state as loaded with list of platform account', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new platformAccountActions.LoadLinked('', {})), new platformAccountActions.LoadLinkedSuccess(mockPlatformAccounts));
      expect(result.loading).toEqual(false);
      expect(result.loaded).toEqual(true);
      expect(result.linkedAccounts).toEqual(mockPlatformAccounts);
    });
  });

  describe('when the dispatched action is Load loaded Fail', () => {
    it('should return search account state as loaded with empty list of platform account', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new platformAccountActions.LoadLinked('', {})), new platformAccountActions.LoadLinkedFail('Error'));
      expect(result.loading).toEqual(false);
      expect(result.loaded).toEqual(true);
      expect(result.linkedAccounts.children).toEqual([]);
    });
  });

  describe('when the dispatched action is Load Unlinked Parent account', () => {
    it('should return platform account state as loading', () => {
      const result = reducer(reducer(undefined, { type: null }), new platformAccountActions.LoadUnlinkedParent('', {}));
      expect(result.unlinkedloading).toEqual(true);
      expect(result.unlinkedLoaded).toEqual(false);
    });
  });

  describe('when the dispatched action is Load Unlinked Parent account Success', () => {
    it('should return search account state as loaded with list of parent account', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new platformAccountActions.LoadUnlinkedParent('', {})), new platformAccountActions.LoadUnlinkedParentSuccess(mockParentAccount));
      expect(result.unlinkedloading).toEqual(false);
      expect(result.unlinkedLoaded).toEqual(true);
      expect(result.unlinkedParentAccounts).toEqual(mockParentAccount);
    });
  });

  describe('when the dispatched action is Load loaded Fail', () => {
    it('should return search account state as loaded with empty list of parent account', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new platformAccountActions.LoadUnlinkedParent('', {})), new platformAccountActions.LoadUnlinkedParentFail('Error'));
      expect(result.unlinkedloading).toEqual(false);
      expect(result.unlinkedLoaded).toEqual(true);
      expect(result.unlinkedParentAccounts.parents).toEqual([]);
    });
  });


  describe('when the dispatched action is Load Unlinked Child account', () => {
    it('should return platform account state as loading', () => {
      const result = reducer(reducer(undefined, { type: null }), new platformAccountActions.LoadUnlinkedChild('', '', {}));
      expect(result.unlinkedloading).toEqual(true);
      expect(result.unlinkedLoaded).toEqual(false);
    });
  });

  describe('when the dispatched action is Load Unlinked Child account Success', () => {
    it('should return search account state as loaded with list of parent account', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new platformAccountActions.LoadUnlinkedChild('', '', {})), new platformAccountActions.LoadUnlinkedChildSuccess(mockChildAccount));
      expect(result.unlinkedloading).toEqual(false);
      expect(result.unlinkedLoaded).toEqual(true);
      expect(result.unlinkedChildAccounts).toEqual(mockChildAccount);
    });
  });

  describe('when the dispatched action is Load loaded Fail', () => {
    it('should return search account state as loaded with empty list of child account', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new platformAccountActions.LoadUnlinkedChild('', '', {})), new platformAccountActions.LoadUnlinkedChildFail('Error'));
      expect(result.unlinkedloading).toEqual(false);
      expect(result.unlinkedLoaded).toEqual(true);
      expect(result.unlinkedChildAccounts.children).toEqual([]);
    });
  });

});
