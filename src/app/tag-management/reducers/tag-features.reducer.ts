import { tagFeaturesActions } from '../actions';
import { TagFeatures } from '../../models/tag-features';

export interface TagFeaturesState {
  loaded: boolean;
  loading: boolean;
  tagFeatures: TagFeatures[];
}

const initialState: TagFeaturesState = {
  loaded: false,
  loading: false,
  tagFeatures: []
};

export function reducer(state = initialState, action: tagFeaturesActions.Actions): TagFeaturesState {
  switch (action.type) {
    case tagFeaturesActions.LOAD: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case tagFeaturesActions.LOAD_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        tagFeatures: action.payload
      };
    }

    case tagFeaturesActions.LOAD_FAIL: {
      return {
        ...state,
        loaded: true,
        loading: false,
        tagFeatures: []
      };
    }

    default:
      return state;
  }
}
