import { rewriteCampaignActions } from '../actions';
import { RewriteCampaignList, EmptyRewriteCampaignList, RewriteCampaign } from '../../models/rewrite-campaign';
import { reducer, RewriteCampaignState } from './rewrite-campaign.reducer';

const campaign: RewriteCampaign = {
  campaignId: '1',
  campaignName: 'testCampaign',
  accountId: '1',
  status: 'active',
  description: 'Test Campaign',
  kwlt: true,
  ctn: []
};

const campaigns: RewriteCampaignList = { campaigns: [campaign] };

const initialState: RewriteCampaignState = {
  rewriteCampaigns: EmptyRewriteCampaignList
};

describe('The rewrite-campaign reducer', () => {
  it('should return initial state on init', () => {
    const result = reducer(undefined, { type: null, accountId: '' });
    expect(result).toEqual(initialState);
  });

  describe('when the dispatched action is Load success', () => {
    it('should return rewrite state as loaded and rewrite campaigns set to payload', () => {
      const result = reducer(reducer(reducer(undefined, { type: null, accountId: '' }), new rewriteCampaignActions.Load('')), new rewriteCampaignActions.LoadSuccess(campaigns));
      expect(result.rewriteCampaigns).toEqual(campaigns);
    });
  });

  describe('when the dispatched action is Load fail', () => {
    it('should return rule state as loaded', () => {
      const result = reducer(reducer(reducer(undefined, { type: null, accountId: '' }), new rewriteCampaignActions.Load('')), new rewriteCampaignActions.LoadFail('Error'));
      expect(result.rewriteCampaigns).toEqual({ campaigns: [] });
    });
  });
});
