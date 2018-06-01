import { searchAccountActions } from '../actions';
import { reducer } from './search-account.reducer';
import { SearchAccount, SearchAccountList, EmptySearchAccountList } from '../../models/search-account';

const initialState = {
  loaded: false,
  loading: false,
  searchAccounts: EmptySearchAccountList,
  searchAccountAction: false
};


const mockSearchAccounts: SearchAccountList = {
  'accounts': [
    {
      source: 'bing',
      sourceId: 32,
      name: 'account 1',
      number: 'number 1',
      integrationId: 12,
      linked: true,
      href: 'account/32'
    },
    {
      source: 'google',
      sourceId: 51,
      name: 'account 2',
      integrationId: 12,
      linked: true,
      href: 'account/51'
    }
  ],
  'total_items': 2,
};

describe('The search account reducer', () => {

  it('should return initial state on init', () => {
    const result = reducer(undefined, { type: null });
    expect(result).toEqual(initialState);
  });

  describe('when the dispatched action is Load Linked', () => {
    it('should return search account state as loading', () => {
      const result = reducer(reducer(undefined, { type: null }), new searchAccountActions.LoadLinked('', {}));
      expect(result.loading).toEqual(true);
      expect(result.loaded).toEqual(false);
    });
  });

  describe('when the dispatched action is Load Unlinked', () => {
    it('should return search account state as loading', () => {
      const result = reducer(reducer(undefined, { type: null }), new searchAccountActions.LoadUnlinked('', '', {}));
      expect(result.loading).toEqual(true);
      expect(result.loaded).toEqual(false);
    });
  });

  describe('when the dispatched action is Load Success', () => {
    it('should return search account state as loaded with list of search account', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new searchAccountActions.LoadLinked('', {})), new searchAccountActions.LoadSuccess(mockSearchAccounts));
      expect(result.loading).toEqual(false);
      expect(result.loaded).toEqual(true);
      expect(result.searchAccounts).toEqual(mockSearchAccounts);
    });
  });

  describe('when the dispatched action is Load Fail', () => {
    it('should return search account state as loaded with empty list of search account', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new searchAccountActions.LoadLinked('', {})), new searchAccountActions.LoadFail('Error'));
      expect(result.loading).toEqual(false);
      expect(result.loaded).toEqual(true);
      expect(result.searchAccounts.accounts).toEqual([]);
    });
  });

  describe('when the dispatched action is Unlink Search Account', () => {
    it('should return search account action as success', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new searchAccountActions.UnlinkSuccess()), new searchAccountActions.UnlinkSuccess());
      expect(result.searchAccountAction).toEqual(true);
    });
  });

  describe('when the dispatched action is Unlink Search Account', () => {
    it('should return search account action as success', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new searchAccountActions.UnlinkSuccess()), new searchAccountActions.UnlinkSuccess());
      expect(result.searchAccountAction).toEqual(true);
    });
  });

  describe('when the dispatched action is Link Search Account', () => {
    it('should return search account action status as true', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new searchAccountActions.Link({}, '')), new searchAccountActions.LinkSuccess());
      expect(result.searchAccountAction).toEqual(true);
    });
  });

  describe('when the dispatched action is Link Search Account', () => {
    it('should return reset search account action status as false', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new searchAccountActions.ResetSearchAccountActionStatus()), new searchAccountActions.ResetSearchAccountActionStatus());
      expect(result.searchAccountAction).toEqual(false);
    });
  });

});
