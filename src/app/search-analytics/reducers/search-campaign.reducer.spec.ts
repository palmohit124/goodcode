import { searchCampaigActions } from '../actions';
import { reducer } from './search-campaign.reducer';
import { SearchCampaign } from '../../models/search-campaign';

const initialState = {
  loaded: false,
  loading: false,
  searchCampaigns: [],
  searchCampaignCount: 0,
  searchCampaignAction: false
};


const mockSearchCampaigns: [SearchCampaign[], number] = [
  [
    {
      id: '67GH424F2',
      status: 'Completed',
      submittedFileName: 'test.csv',
      submittedFileUrl: 'customers/search/campaigns/download',
      submitTime: '2017-08-08 03:00:00',
      submittedBy: 'abc@def.com',
      completedTime: '2017-08-08 03:00:00',
      totalRowCount: 2,
      successRowCount: 2,
      errorFileUrl: null
    },
    {
      id: '89FR424K9',
      status: 'Completed With Errors',
      submittedFileName: 'test.csv',
      submittedFileUrl: 'customers/search/campaigns/download',
      submitTime: '2017-08-08 03:00:00',
      submittedBy: 'abc@def.com',
      completedTime: '2017-08-08 03:00:00',
      totalRowCount: 2,
      successRowCount: 1,
      errorFileUrl: 'customers/search/campaigns/download'
    }
  ],
  2
];

describe('The search campaign reducer', () => {

  it('should return initial state on init', () => {
    const result = reducer(undefined, { type: null });
    expect(result).toEqual(initialState);
  });

  describe('when the dispatched action is Load', () => {
    it('should return search campaign state as loading', () => {
      const result = reducer(reducer(undefined, { type: null }), new searchCampaigActions.LoadSearchCampaigns('', {}));
      expect(result.loading).toEqual(true);
      expect(result.loaded).toEqual(false);
    });
  });

  describe('when the dispatched action is Load Success', () => {
    it('should return search campaign state as loaded with list of search campaign', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new searchCampaigActions.LoadSearchCampaigns('', {})), new searchCampaigActions.LoadSearchCampaignsSuccess(mockSearchCampaigns));
      expect(result.loading).toEqual(false);
      expect(result.loaded).toEqual(true);
      expect(result.searchCampaigns).toEqual(mockSearchCampaigns[0]);
      expect(result.searchCampaignCount).toEqual(mockSearchCampaigns[1]);
    });
  });

  describe('when the dispatched action is Load Fail', () => {
    it('should return search campaign state as loaded with empty list of search campaign', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new searchCampaigActions.LoadSearchCampaigns('', {})), new searchCampaigActions.LoadSearchCampaignsFail('Error'));
      expect(result.loading).toEqual(false);
      expect(result.loaded).toEqual(true);
      expect(result.searchCampaigns).toEqual([]);
      expect(result.searchCampaignCount).toEqual(0);
    });
  });

  describe('when the dispatched action is Upload Search Campaign', () => {
    const uploadFile = new File([], '');
    it('should return search campaign state as searchCampaignAction', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }),
      new searchCampaigActions.UploadSearchCampaigns('', '', '', uploadFile)),
        new searchCampaigActions.UploadSearchCampaignsSuccess());
      expect(result.searchCampaignAction).toEqual(true);
    });
  });

});
