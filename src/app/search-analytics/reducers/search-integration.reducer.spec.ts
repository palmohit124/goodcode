import { searchIntegrationActions } from '../actions';
import { reducer } from './search-integration.reducer';
import { SearchIntegration, SearchIntegrationList, EmptySearchIntegrationList } from '../../models/search-integration';

const initialState = {
  loaded: false,
  loading: false,
  searchIntegrations: EmptySearchIntegrationList,
  searchIntegrationAction: false
};


const mockSearchIntegrations: SearchIntegrationList = {
  integrations: [
    {
      id: 's2kUtasd',
      source: 12,
      name: 'google',
      href: 'integration/s2kUtasd'
    },
    {
      id: 'f2adaasF',
      source: 11,
      name: 'bing',
      href: 'integration/f2adaasF'
    }
  ],
  total_items: 2
};

const mockSearchIntegrationData: SearchIntegration = {
  id: 'f2adaasF',
  source: 11,
  name: 'bing',
  href: 'integration/f2adaasF'
};

describe('The search integration reducer', () => {

  it('should return initial state on init', () => {
    const result = reducer(undefined, { type: null });
    expect(result).toEqual(initialState);
  });

  describe('when the dispatched action is Load', () => {
    it('should return search account state as loading', () => {
      const result = reducer(reducer(undefined, { type: null }), new searchIntegrationActions.Load('', {}));
      expect(result.loading).toEqual(true);
      expect(result.loaded).toEqual(false);
    });
  });

  describe('when the dispatched action is Load Success', () => {
    it('should return search integration state as loaded with list of search integration', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new searchIntegrationActions.Load('', {})), new searchIntegrationActions.LoadSuccess(mockSearchIntegrations));
      expect(result.loading).toEqual(false);
      expect(result.loaded).toEqual(true);
      expect(result.searchIntegrations).toEqual(mockSearchIntegrations);
    });
  });

  describe('when the dispatched action is Load Fail', () => {
    it('should return search integration state as loaded with empty list of search integration', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new searchIntegrationActions.Load('', {})), new searchIntegrationActions.LoadFail('Error'));
      expect(result.loading).toEqual(false);
      expect(result.loaded).toEqual(true);
      expect(result.searchIntegrations.integrations).toEqual([]);
    });
  });

  describe('when the dispatched action is Remove Search Integration', () => {
    it('should return search integration action status as true', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new searchIntegrationActions.Remove('')), new searchIntegrationActions.RemoveSuccess());
      expect(result.searchIntegrationAction).toEqual(true);
    });
  });

  describe('when the dispatched action is Create Search Integration', () => {
    it('should return search integration action status as true', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new searchIntegrationActions.Create('', '', '')), new searchIntegrationActions.CreateSuccess());
      expect(result.searchIntegrationAction).toEqual(true);
    });
  });
});
