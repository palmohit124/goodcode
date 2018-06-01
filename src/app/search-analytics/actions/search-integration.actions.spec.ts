import { searchIntegrationActions } from './';
import { SearchIntegration, SearchIntegrationList } from '../../models/search-integration';

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

describe('Search Integration Actions', () => {
  it('should define a load search integration action', () => {
    const action = new searchIntegrationActions.Load('', {});
    expect(action.type).toBe(searchIntegrationActions.LOAD);
  });

  it('should define a load success search integration action', () => {
    const action = new searchIntegrationActions.LoadSuccess(mockSearchIntegrations);
    expect(action.type).toBe(searchIntegrationActions.LOAD_SUCCESS);
    expect(action.payload).toBe(mockSearchIntegrations);
  });

  it('should define a load fail search integration action', () => {
    const action = new searchIntegrationActions.LoadFail('Error');
    expect(action.type).toBe(searchIntegrationActions.LOAD_FAIL);
    expect(action.payload).toBe('Error');
  });

  it('should define a create search integration action', () => {
    const action = new searchIntegrationActions.Create('', '', '');
    expect(action.type).toBe(searchIntegrationActions.CREATE);
  });

  it('should define a create success search integration action', () => {
    const action = new searchIntegrationActions.CreateSuccess();
    expect(action.type).toBe(searchIntegrationActions.CREATE_SUCCESS);
  });

  it('should define a create fail search integration action', () => {
    const action = new searchIntegrationActions.CreateFail('Error');
    expect(action.type).toBe(searchIntegrationActions.CREATE_FAIL);
    expect(action.payload).toBe('Error');
  });


  it('should define a remove search integration action', () => {
    const action = new searchIntegrationActions.Remove('');
    expect(action.type).toBe(searchIntegrationActions.REMOVE);
  });

  it('should define a remove success search integration action', () => {
    const action = new searchIntegrationActions.RemoveSuccess();
    expect(action.type).toBe(searchIntegrationActions.REMOVE_SUCCESS);
  });

  it('should define a remove fail search integration action', () => {
    const action = new searchIntegrationActions.RemoveFail('Error');
    expect(action.type).toBe(searchIntegrationActions.REMOVE_FAIL);
    expect(action.payload).toBe('Error');
  });

});
