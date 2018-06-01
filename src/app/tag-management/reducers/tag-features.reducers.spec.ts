import { tagFeaturesActions } from '../actions';
import { TagFeatures, Providers } from '../../models/tag-features';
import { reducer, TagFeaturesState } from './tag-features.reducer';

const initialState: TagFeaturesState = {
  loaded: false,
  loading: false,
  tagFeatures: []
};

const tagFeature: TagFeatures = {
  featureId: 1,
  description: 'Test Feature',
  name: 'tag',
  enabled: true,
  providers: []
};

const tagFeatures: TagFeatures[] = [tagFeature];

describe('The tag-feature reducer', () => {
  it('should return initial state on init', () => {
    const result = reducer(undefined, { type: null });
    expect(result).toEqual(initialState);
  });

  describe('when the dispatched action is Load', () => {
    it('should return rule state as loading', () => {
      const result = reducer(reducer(undefined, { type: null }), new tagFeaturesActions.Load(''));
      expect(result.loading).toEqual(true);
      expect(result.loaded).toEqual(false);
    });
  });

  describe('when the dispatched action is Load success', () => {
    it('should return rule state as loading', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new tagFeaturesActions.Load('')), new tagFeaturesActions.LoadSuccess(tagFeatures));
      expect(result.loading).toEqual(false);
      expect(result.loaded).toEqual(true);
      expect(result.tagFeatures).toEqual(tagFeatures);
    });
  });

  describe('when the dispatched action is Load fail', () => {
    it('should return rule state as loaded', () => {
      const result = reducer(reducer(reducer(undefined, { type: null }), new tagFeaturesActions.Load('')), new tagFeaturesActions.LoadFail('Error'));
      expect(result.loading).toEqual(false);
      expect(result.loaded).toEqual(true);
      expect(result.tagFeatures).toEqual([]);
    });
  });
});
