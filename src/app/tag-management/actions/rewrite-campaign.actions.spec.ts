import { rewriteCampaignActions } from './';
import { RewriteCampaign, RewriteCampaignList } from '../../models/rewrite-campaign';

const rewriteCampaign: RewriteCampaign = {
  campaignId: '1',
  campaignName: 'test name',
  accountId: '1',
  status: 'test status',
  description: 'test campaign',
  kwlt: true,
  ctn: []
};

const rewriteCampaignList: RewriteCampaignList = {
  campaigns: [rewriteCampaign]
};

describe('RewriteCampaign Actions', () => {
  it('should define load rewrite campaign action', () => {
    const action = new rewriteCampaignActions.Load('id');
    expect(action.type).toBe(rewriteCampaignActions.LOAD);
  });

  it('should define load rewrite campaign success action', () => {
    const action = new rewriteCampaignActions.LoadSuccess(rewriteCampaignList);
    expect(action.type).toBe(rewriteCampaignActions.LOAD_SUCCESS);
    expect(action.payload).toBe(rewriteCampaignList);
  });

  it('should define load rewrite campaign fail action', () => {
    const action = new rewriteCampaignActions.LoadFail('Error');
    expect(action.type).toBe(rewriteCampaignActions.LOAD_FAIL);
  });
});
