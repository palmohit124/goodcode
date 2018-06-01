import { ruleActions } from '../actions';
import { reducer, RuleState } from './rule.reducer';
import { RuleAttributes, EmptyRule } from '../../models/rule-set';

const initialState: RuleState = {
  loaded: false,
  loading: false,
  rule: EmptyRule,
  selectedRule: null,
  rulesetAction: false,
  ruleCreationErrorMsg: null,
  selectedRefdom: null,
  selectedCondition: null,
  selectedLookup: null,
  ruleId: null,
  ruleActionStatus: false
};

const rule = {
  refdoms: []
};

describe('The rule reducer', () => {
  it('should return initial state on init', () => {
    const result = reducer(undefined, { type: null, id: '' });
    expect(result).toEqual(initialState);
  });

  describe('when the dispatched action is Load Rule', () => {
    it('should return rule state as loading', () => {
      const result = reducer(reducer(undefined, { type: null, id: '' }), new ruleActions.Load(''));
      expect(result.loading).toEqual(true);
      expect(result.loaded).toEqual(false);
    });
  });

  describe('when the dispatched action is Load Rule Success', () => {
    it('should return rule state as loaded with rule data', () => {
      const result = reducer(reducer(reducer(undefined, { type: null, id: '' }), new ruleActions.Load('')), new ruleActions.LoadSuccess(rule));
      expect(result.loading).toEqual(false);
      expect(result.loaded).toEqual(true);
      expect(result.rule).toEqual(rule);
    });
  });

  describe('when the dispatched action is Load Rule Fail', () => {
    it('should return rule state as loaded with initial rule state', () => {
      const result = reducer(reducer(reducer(undefined, { type: null, id: '' }), new ruleActions.Load('')), new ruleActions.LoadFail('Error'));
      expect(result.loading).toEqual(false);
      expect(result.loaded).toEqual(true);
      expect(result.rule).toEqual(rule);
    });
  });

  describe('when the dispatched action is Select Refdom', () => {
    it('should return rule state as loaded with selected refdom', () => {
      const result = reducer(reducer(undefined, { type: null, id: '' }), new ruleActions.SelectRefdom(181241));
      expect(result.loading).toEqual(false);
      expect(result.loaded).toEqual(true);
      expect(result.selectedRefdom).toEqual(181241);
    });
  });

  describe('when the dispatched action is Select Refdom', () => {
    it('should return rule state as loaded with selected condition', () => {
      const result = reducer(reducer(undefined, { type: null, id: '' }), new ruleActions.SelectCondition(181241));
      expect(result.loading).toEqual(false);
      expect(result.loaded).toEqual(true);
      expect(result.selectedCondition).toEqual(181241);
    });
  });

  describe('when the dispatched action is Select Refdom', () => {
    it('should return rule state as loaded with selected lookup', () => {
      const result = reducer(reducer(undefined, { type: null, id: '' }), new ruleActions.SelectLookup(181241));
      expect(result.loading).toEqual(false);
      expect(result.loaded).toEqual(true);
      expect(result.selectedLookup).toEqual(181241);
    });
  });

  describe('when the dispatched action is Delete Attribute', () => {
    it('should return rule state as loaded with rule action status as true', () => {
      const result = reducer(reducer(reducer(undefined, { type: null, id: '' }), new ruleActions.DeleteRuleAttribute(181241)), new ruleActions.DeleteRuleAttributeSuccess());
      expect(result.ruleActionStatus).toEqual(true);
    });
  });

  describe('when the dispatched action is reset Delete Attribute', () => {
    it('should return rule state as loaded with rule action status as false', () => {
      const result = reducer(reducer(reducer(undefined, { type: null, id: '' }), new ruleActions.DeleteRuleAttributeSuccess()), new ruleActions.ResetRulesetActionStatus());
      expect(result.ruleActionStatus).toEqual(false);
    });
  });

  describe('when the dispatched action is edit Attribute success', () => {
    it('should return rule state as loaded with rule action status as true', () => {
      const result = reducer(reducer(reducer(undefined, { type: null, id: '' }), new ruleActions.EditRuleAttribute('181241', 'conditions', {})),
        new ruleActions.EditRuleAttributeSuccess({}));
      expect(result.ruleActionStatus).toEqual(true);
    });
  });
});
