import { ruleActions } from './';
import { RuleAttributes, CreateRuleAttributes } from '../../models/rule-set';

const rule: RuleAttributes = {
  refdoms: []
};

const rewrite = {
  graphId: 121121,
  ctn: 8666232282,
  value: 9666232282
};

const ruleDetails: CreateRuleAttributes = {
  parentId: 1,
  refdom: {},
  condition: {},
  lookup: {},
  rewrite: {}
};


describe('RuleAttributes Actions', () => {
  it('should define load rule action', () => {
    const action = new ruleActions.Load('RuleId');
    expect(action.type).toBe(ruleActions.LOAD);
  });

  it('should define load success rule action', () => {
    const action = new ruleActions.LoadSuccess(rule);
    expect(action.type).toBe(ruleActions.LOAD_SUCCESS);
    expect(action.payload).toBe(rule);
  });

  it('should define load fail rule action', () => {
    const action = new ruleActions.LoadFail('Error');
    expect(action.type).toBe(ruleActions.LOAD_FAIL);
  });

  it('should define select refdom action', () => {
    const action = new ruleActions.SelectRefdom(181243);
    expect(action.type).toBe(ruleActions.SELECT_REFDOM);
  });

  it('should define select condition action', () => {
    const action = new ruleActions.SelectCondition(181244);
    expect(action.type).toBe(ruleActions.SELECT_CONDITION);
  });

  it('should define select lookup action', () => {
    const action = new ruleActions.SelectLookup(181245);
    expect(action.type).toBe(ruleActions.SELECT_LOOKUP);
  });

  it('should define edit rule attribute action', () => {
    const action = new ruleActions.EditRuleAttribute('id', 'rewrite', rewrite);
    expect(action.type).toBe(ruleActions.EDIT_RULE_ATTRIBUTE);
  });

  it('should define edit rule attribute success action', () => {
    const action = new ruleActions.EditRuleAttributeSuccess(rewrite);
    expect(action.type).toBe(ruleActions.EDIT_RULE_ATTRIBUTE_SUCCESS);
    expect(action.payload).toBe(rewrite);
  });

  it('should define edit rule attribute fail action', () => {
    const action = new ruleActions.EditRuleAttributeFail('Error');
    expect(action.type).toBe(ruleActions.EDIT_RULE_ATTRIBUTE_FAIL);
  });

  it('should define add rule attribute action', () => {
    const action = new ruleActions.AddRuleAttributes(rule);
    expect(action.type).toBe(ruleActions.ADD_RULE_ATTRIBUTES);
  });

  it('should define add rule attribute success action', () => {
    const action = new ruleActions.AddRuleAttributesSuccess(ruleDetails);
    expect(action.type).toBe(ruleActions.ADD_RULE_ATTRIBUTES_SUCCESS);
    expect(action.payload).toBe(ruleDetails);
  });

  it('should define add rule attribute fail action', () => {
    const action = new ruleActions.AddRuleAttributesFail('Error');
    expect(action.type).toBe(ruleActions.ADD_RULE_ATTRIBUTES_FAIL);
  });

  it('should define delete attribute action', () => {
    const action = new ruleActions.DeleteRuleAttribute(181243);
    expect(action.type).toBe(ruleActions.DELETE_RULE_ATTRIBUTE);
  });

  it('should define delete attribute success action', () => {
    const action = new ruleActions.DeleteRuleAttributeSuccess();
    expect(action.type).toBe(ruleActions.DELETE_RULE_ATTRIBUTE_SUCCESS);
  });

  it('should define delete attribute fail action', () => {
    const action = new ruleActions.DeleteRuleAttributeFail('Error');
    expect(action.type).toBe(ruleActions.DELETE_RULE_ATTRIBUTE_FAIL);
  });

  it('should define reset ruleset action', () => {
    const action = new ruleActions.ResetRulesetActionStatus();
    expect(action.type).toBe(ruleActions.RESET_RULE_ACTION_STATUS);
  });
});
