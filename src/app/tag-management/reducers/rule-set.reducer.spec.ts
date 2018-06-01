import { reducer, RulesetState } from './rule-set.reducer';
import { Rule, EmptyRule } from '../../models/rule-set';
import { rulesetActions } from '../actions';
import { RuleSet, EmptyRulesetList } from '../../models/rule-set';

const initialState: RulesetState = {
  loaded: false,
  loading: false,
  rulesets: EmptyRulesetList,
  selectedRuleset: null,
  rulesetAction: false,
  ruleCreationErrorMsg: null,
  accountId: null
};

const rulesets: RuleSet = {
  rules: [],
  total_items: 0
};

const rewrite: Rule = {
  graphId: 181243,
  campaignId: '1',
  name: 'Shoes'
};

describe('The ruleset reducer', () => {
  it('should return initial state on init', () => {
    const result = reducer(undefined, { type: null });
    expect(result).toEqual(initialState);
  });

  describe('when the dispatched action is Load Ruleset', () => {
    it('should return rule state as loading', () => {
      const result = reducer(reducer(undefined, { type: null }), new rulesetActions.Load('', ''));
      expect(result.loading).toEqual(true);
      expect(result.loaded).toEqual(false);
    });
  });

  describe('when the dispatched action is Load Rule Success', () => {
    it('should return rule state as loaded with rule data', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new rulesetActions.Load('', '')), new rulesetActions.LoadSuccess(rulesets));
      expect(result.loading).toEqual(false);
      expect(result.loaded).toEqual(true);
      expect(result.rulesets).toEqual(rulesets);
    });
  });

  describe('when the dispatched action is Load Ruleset Fail', () => {
    it('should return rule state as loaded with initial ruleset state', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new rulesetActions.Load('', '')), new rulesetActions.LoadFail('Error'));
      expect(result.loading).toEqual(false);
      expect(result.loaded).toEqual(true);
      expect(result.rulesets).toEqual(rulesets);
    });
  });

  describe('when the dispatched action is add success', () => {
    it('should return ruleset state as loaded with rulesetAction as true', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new rulesetActions.Add(rewrite)), new rulesetActions.AddSuccess(rewrite));
      expect(result.rulesetAction).toEqual(true);
    });
  });

  describe('when the dispatched action is add fail', () => {
    it('should return ruleset state as loaded with rulesetAction as fail', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new rulesetActions.Add(rewrite)), new rulesetActions.AddFail('Error'));
      expect(result.rulesetAction).toEqual(false);
    });
  });

  describe('when the dispatched action is reset rule creation', () => {
    it('should return ruleset state as loaded with rulesetAction as false', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new rulesetActions.AddSuccess(rewrite)), new rulesetActions.ResetRuleActionStatus());
      expect(result.rulesetAction).toEqual(false);
    });
  });

  describe('when the dispatched action is select ruleset success', () => {
    it('should return ruleset state as loaded with selected ruleset', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new rulesetActions.Select(rewrite)), new rulesetActions.SelectSuccess(rewrite));
      expect(result.selectedRuleset).toEqual(rewrite);
    });
  });

  describe('when the dispatched action is add account', () => {
    it('should return ruleset state as loaded with account id', () => {
      const result = reducer(reducer(undefined, { type: null }), new rulesetActions.AddAccount('AccountId'));
      expect(result.accountId).toEqual('AccountId');
    });
  });
});
