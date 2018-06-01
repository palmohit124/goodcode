import { rulesetActions } from '../actions';
import { Rule, RuleSet, EmptyRulesetList } from '../../models/rule-set';

export interface RulesetState {
  loaded: boolean;
  loading: boolean;
  rulesets: RuleSet;
  selectedRuleset: Rule;
  rulesetAction: boolean;
  ruleCreationErrorMsg: string;
  accountId: string;
}

const initialState: RulesetState = {
  loaded: false,
  loading: false,
  rulesets: EmptyRulesetList,
  selectedRuleset: null,
  rulesetAction: false,
  ruleCreationErrorMsg: null,
  accountId: null
};


export function reducer(state = initialState, action: rulesetActions.Actions): RulesetState {
  switch (action.type) {
    case rulesetActions.LOAD: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case rulesetActions.LOAD_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        rulesets: action.payload
      };
    }

    case rulesetActions.LOAD_FAIL: {
      return {
        ...state,
        loaded: true,
        loading: false,
        rulesets: EmptyRulesetList
      };
    }

    case rulesetActions.ADD_SUCCESS: {
      return {
        ...state,
        selectedRuleset: action.payload,
        rulesetAction: true
      };
    }

    case rulesetActions.ADD_FAIL: {
      return {
        ...state,
        rulesetAction: false,
        ruleCreationErrorMsg: action.payload
      };
    }

    case rulesetActions.ADD_ACCOUNT: {
      return {
        ...state,
        accountId: action.payload
      };
    }

    case rulesetActions.DELETE_SUCCESS: {
      return {
        ...state,
        rulesetAction: true
      };
    }

    case rulesetActions.SELECT_SUCCESS: {
      return {
        ...state,
        selectedRuleset: action.payload
      };
    }

    case rulesetActions.RESET_RULE_ACTION_STATUS: {
      return {
        ...state,
        rulesetAction: false,
        ruleCreationErrorMsg: null
      };
    }


    default:
      return state;
  }
}
