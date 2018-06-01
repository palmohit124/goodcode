import { searchAccountActions } from './';
import { SearchAccount, SearchAccountList } from '../../models/search-account';

const mockLinkedSearchAccount: SearchAccountList = {
  accounts: [
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
  total_items: 2
};

describe('Search Account Actions', () => {
  it('should define a load linked search account action', () => {
    const action = new searchAccountActions.LoadLinked('', {});
    expect(action.type).toBe(searchAccountActions.LOAD_LINKED);
  });

  it('should define a load unlinked search account action', () => {
    const action = new searchAccountActions.LoadUnlinked('', '', {});
    expect(action.type).toBe(searchAccountActions.LOAD_UNLINKED);
  });

  it('should define a load success search account action', () => {
    const action = new searchAccountActions.LoadSuccess(mockLinkedSearchAccount);
    expect(action.type).toBe(searchAccountActions.LOAD_SUCCESS);
    expect(action.payload).toBe(mockLinkedSearchAccount);
  });

  it('should define a load fail search account action', () => {
    const action = new searchAccountActions.LoadFail('Error');
    expect(action.type).toBe(searchAccountActions.LOAD_FAIL);
    expect(action.payload).toBe('Error');
  });

  it('should define a unlink search account action', () => {
    const action = new searchAccountActions.Unlink('');
    expect(action.type).toBe(searchAccountActions.UNLINK);
  });

  it('should define a unlink success search account action', () => {
    const action = new searchAccountActions.UnlinkSuccess();
    expect(action.type).toBe(searchAccountActions.UNLINK_SUCCESS);
  });

  it('should define a unlink fail search account action', () => {
    const action = new searchAccountActions.UnlinkFail('Error');
    expect(action.type).toBe(searchAccountActions.UNLINK_FAIL);
    expect(action.payload).toBe('Error');
  });

  it('should define a link search account action', () => {
    const action = new searchAccountActions.Link({}, '');
    expect(action.type).toBe(searchAccountActions.LINK);
  });

  it('should define a link success search account action', () => {
    const action = new searchAccountActions.LinkSuccess();
    expect(action.type).toBe(searchAccountActions.LINK_SUCCESS);
  });

  it('should define a link fail search account action', () => {
    const action = new searchAccountActions.LinkFail('Error');
    expect(action.type).toBe(searchAccountActions.LINK_FAIL);
    expect(action.payload).toBe('Error');
  });


});
