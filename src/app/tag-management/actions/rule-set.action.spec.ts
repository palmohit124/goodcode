import { rulesetActions } from './';
import { RuleSet, Rule } from '../../models/rule-set';

const ruleset: RuleSet = {
  rules: [],
  total_items: 0
};

const rule: Rule = {
  graphId: 181234,
  campaignId: '1',
  name: 'test rule'
};

describe('Ruleset Actions', () => {
  it('should define load ruleset init action', () => {
    const action = new rulesetActions.LoadInit();
    expect(action.type).toBe(rulesetActions.LOADINIT);
  });

  it('should define load ruleset load action', () => {
    const action = new rulesetActions.Load('id', {});
    expect(action.type).toBe(rulesetActions.LOAD);
  });

  it('should define load ruleset load success action', () => {
    const action = new rulesetActions.LoadSuccess(ruleset);
    expect(action.type).toBe(rulesetActions.LOAD_SUCCESS);
    expect(action.payload).toBe(ruleset);
  });

  it('should define load ruleset load fail action', () => {
    const action = new rulesetActions.LoadFail('Error');
    expect(action.type).toBe(rulesetActions.LOAD_FAIL);
  });

  it('should define delete ruleset action', () => {
    const action = new rulesetActions.Delete('id');
    expect(action.type).toBe(rulesetActions.DELETE);
  });

  it('should define delete ruleset success action', () => {
    const action = new rulesetActions.DeleteSuccess();
    expect(action.type).toBe(rulesetActions.DELETE_SUCCESS);
  });

  it('should define delete ruleset fail action', () => {
    const action = new rulesetActions.DeleteFail('Error');
    expect(action.type).toBe(rulesetActions.DELETE_FAIL);
  });

  it('should define add ruleset action', () => {
    const action = new rulesetActions.Add(rule);
    expect(action.type).toBe(rulesetActions.ADD);
  });

  it('should define add ruleset success action', () => {
    const action = new rulesetActions.AddSuccess(rule);
    expect(action.type).toBe(rulesetActions.ADD_SUCCESS);
    expect(action.payload).toBe(rule);
  });

  it('should define add ruleset fail action', () => {
    const action = new rulesetActions.AddFail('Error');
    expect(action.type).toBe(rulesetActions.ADD_FAIL);
  });

  it('should define reset ruleset status action', () => {
    const action = new rulesetActions.ResetRuleActionStatus();
    expect(action.type).toBe(rulesetActions.RESET_RULE_ACTION_STATUS);
  });

  it('should define add acount action', () => {
    const action = new rulesetActions.AddAccount('id');
    expect(action.type).toBe(rulesetActions.ADD_ACCOUNT);
  });

  it('should define selected init action', () => {
    const action = new rulesetActions.SelectedInit();
    expect(action.type).toBe(rulesetActions.SELECTED_INIT);
  });

  it('should define select action', () => {
    const action = new rulesetActions.Select(rule);
    expect(action.type).toBe(rulesetActions.SELECT);
  });

  it('should define select success action', () => {
    const action = new rulesetActions.SelectSuccess(rule);
    expect(action.type).toBe(rulesetActions.SELECT_SUCCESS);
  });

  it('should define select fail action', () => {
    const action = new rulesetActions.SelectFail('Error');
    expect(action.type).toBe(rulesetActions.SELECT_FAIL);
  });
});
