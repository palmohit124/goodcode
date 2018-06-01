import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as router from '@ngrx/router-store';
import * as ruleset from './rule-set.reducer';
import * as tagFeatures from './tag-features.reducer';
import * as rule from './rule.reducer';
import * as rewriteCampaign from './rewrite-campaign.reducer';

import { Rule } from '../../models/rule-set';
import { TagFeatures } from '../../models/tag-features';
export { ruleset, tagFeatures, rule, rewriteCampaign };


export const getTagManagementState = createFeatureSelector<TagManagementState>('tagManagement');
export const getRulesetState = createSelector(getTagManagementState, (state) => state.ruleset);
export const getSelectedRule = createSelector(getTagManagementState, (state) => state.ruleset.selectedRuleset);
export const getAccount = createSelector(getTagManagementState, (state) => state.ruleset.accountId);
export const getRulesetActionStatus = createSelector(getTagManagementState, (state) => state.ruleset.rulesetAction);

export const getTagFeaturesrState = createSelector(getTagManagementState, (state) => state.tagFeatures);

export const getRuleState = createSelector(getTagManagementState, (state) => state.rule );
export const getRefdoms = createSelector(getTagManagementState, (state) => state.rule.rule );
export const getSelectedRefdom = createSelector(getTagManagementState, (state) => state.rule.selectedRefdom );
export const getSelectedCondition = createSelector(getTagManagementState, (state) => state.rule.selectedCondition);
export const getSelectedLookup = createSelector(getTagManagementState, (state) => state.rule.selectedLookup);
export const getRuleActionStatus = createSelector(getTagManagementState, (state) => state.rule.ruleActionStatus);

export const getRewriteCampaigns = createSelector(getTagManagementState, (state) => state.rewriteCampaign.rewriteCampaigns);

export interface TagManagementState {
  ruleset: ruleset.RulesetState;
  tagFeatures: tagFeatures.TagFeaturesState;
  rule: rule.RuleState;
  rewriteCampaign: rewriteCampaign.RewriteCampaignState;
}

export const reducers = {
  ruleset: ruleset.reducer,
  tagFeatures: tagFeatures.reducer,
  rule: rule.reducer,
  rewriteCampaign: rewriteCampaign.reducer
};


