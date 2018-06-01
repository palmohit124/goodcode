import { searchCampaigActions } from './';
import { SearchCampaign } from '../../models/search-campaign';
import { FILE } from 'dns';

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

describe('Search Campaigns Actions', () => {
  it('should define a load search campaign actions', () => {
    const action = new searchCampaigActions.LoadSearchCampaigns('', {});
    expect(action.type).toBe(searchCampaigActions.LOAD_SEARCH_CAMPAIGNS);
  });

  it('should define a load success search campaigns action', () => {
    const action = new searchCampaigActions.LoadSearchCampaignsSuccess(mockSearchCampaigns);
    expect(action.type).toBe(searchCampaigActions.LOAD_SEARCH_CAMPAIGNS_SUCCESS);
    expect(action.payload).toBe(mockSearchCampaigns);
  });

  it('should define a load fail search campaigns action', () => {
    const action = new searchCampaigActions.LoadSearchCampaignsFail('Error');
    expect(action.type).toBe(searchCampaigActions.LOAD_SEARCH_CAMPAIGNS_FAIL);
    expect(action.payload).toBe('Error');
  });

  it('should define a upload search campaign actions', () => {
    const uploadFile = new File([], '');
    const action = new searchCampaigActions.UploadSearchCampaigns('', '', '', uploadFile);
    expect(action.type).toBe(searchCampaigActions.UPLOAD_SEARCH_CAMPAIGNS);
  });

  it('should define a upload success search campaigns action', () => {
    const action = new searchCampaigActions.UploadSearchCampaignsSuccess();
    expect(action.type).toBe(searchCampaigActions.UPLOAD_SEARCH_CAMPAIGNS_SUCCESS);
  });

  it('should define a upload fail search campaigns action', () => {
    const action = new searchCampaigActions.UploadSearchCampaignsFail('Error');
    expect(action.type).toBe(searchCampaigActions.UPLOAD_SEARCH_CAMPAIGNS_FAIL);
    expect(action.payload).toBe('Error');
  });
});
