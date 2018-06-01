import { ruleActions } from '../actions';
import { RuleAttributes, EmptyRule } from '../../models/rule-set';

export interface RuleState {
  loaded: boolean;
  loading: boolean;
  rule: RuleAttributes;
  selectedRule: RuleAttributes;
  rulesetAction: boolean;
  ruleCreationErrorMsg: string;
  selectedRefdom: number;
  selectedCondition: number;
  selectedLookup: number;
  ruleId: string;
  ruleActionStatus: boolean;
}

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


export function reducer(state = initialState, action: ruleActions.Actions): RuleState {

  switch (action.type) {
    case ruleActions.LOAD: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case ruleActions.LOAD_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        rule: action.payload
      };
    }

    case ruleActions.LOAD_FAIL: {
      return {
        ...state,
        loaded: true,
        loading: false,
        rule: EmptyRule
      };
    }

    case ruleActions.SELECT_REFDOM: {
      return {
        ...state,
        loaded: true,
        loading: false,
        selectedRefdom: action.payload
      };
    }

    case ruleActions.SELECT_CONDITION: {
      return {
        ...state,
        loaded: true,
        loading: false,
        selectedCondition: action.payload
      };
    }

    case ruleActions.SELECT_LOOKUP: {
      return {
        ...state,
        loaded: true,
        loading: false,
        selectedLookup: action.payload
      };
    }

    case ruleActions.DELETE_RULE_ATTRIBUTE_SUCCESS: {
      return {
        ...state,
        ruleActionStatus: true
      };
    }

    case ruleActions.ADD_RULE_ATTRIBUTES_SUCCESS: {
      return {
        ...state,
        ruleActionStatus: true
      };
    }

    case ruleActions.EDIT_RULE_ATTRIBUTE_SUCCESS: {
      return {
        ...state,
        ruleActionStatus: true
      };
    }

    case ruleActions.RESET_RULE_ACTION_STATUS: {
      return {
        ...state,
        ruleActionStatus: false
      };
    }

    default:
      return state;
  }
}
