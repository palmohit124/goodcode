export interface Rule {
  graphId: number;
  campaignId: string;
  name: string;
}

export interface RuleAttributes {
  refdoms: Array<Object>;
}

export interface CreateRuleAttributes {
  parentId: number;
  refdom: object;
  condition: object;
  lookup: object;
  rewrite: object;
}

export const InitialCreateRuleset: CreateRuleAttributes = {
  parentId: null,
  refdom: {},
  condition: {},
  lookup: {},
  rewrite: {}
};

export interface SelectedRefdom {
  refdomId: number;
}

export interface SelectedCondition {
  conditionId: number;
}

export const EmptyRule: RuleAttributes = {
  refdoms: []
};

export interface RuleSet {
  rules: Rule[];
  total_items: number;
}

export const EmptyRulesetList: RuleSet = {
  rules: [],
  total_items: 0
};

export interface RuleRefdom {
  domain: string;
  sources: Array<string>;
  conditions: Array<Object>;
}

export const InitialRuleRefdom: RuleRefdom = {
  domain: '',
  sources: [],
  conditions: []
};

export interface RuleCondition {
  source: string;
  searchParameters: string;
  lookups: Array<Object>;
}

export const InitialRulsetCondition: RuleCondition = {
  source: '',
  searchParameters: '',
  lookups: []
};

export interface RuleRewrite {
  value: number;
  ctn: number;
}

export const InitialRuleRewrite: RuleRewrite = {
  value: null,
  ctn: null
};


