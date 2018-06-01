import { tagFeaturesActions } from './';
import { TagFeatures, Providers } from '../../models/tag-features';

const tagFeature: TagFeatures = {
  featureId: 1,
  description: 'test feature',
  name: 'test feature',
  enabled: true,
  providers: []
};

const provider: Providers = {
  providerId: 1,
  name: 'test provider',
  enabled: true
};

describe('TagFeatures Actions', () => {
  it('should define load tagfeatures action', () => {
    const action = new tagFeaturesActions.Load('id');
    expect(action.type).toBe(tagFeaturesActions.LOAD);
  });

  it('should define load tagfeatures success action', () => {
    const action = new tagFeaturesActions.LoadSuccess([tagFeature]);
    expect(action.type).toBe(tagFeaturesActions.LOAD_SUCCESS);
    expect(action.payload).toEqual([tagFeature]);
  });

  it('should define load tagfeatures fail action', () => {
    const action = new tagFeaturesActions.LoadFail('Error');
    expect(action.type).toBe(tagFeaturesActions.LOAD_FAIL);
  });

  it('should define tagfeatures toggle action', () => {
    const action = new tagFeaturesActions.ToggleFeatures(tagFeature);
    expect(action.type).toBe(tagFeaturesActions.TOGGLEFEATURES);
    expect(action.payload).toBe(tagFeature);
  });

  it('should define tagfeatures toggle success action', () => {
    const action = new tagFeaturesActions.ToggleFeaturesSuccess();
    expect(action.type).toBe(tagFeaturesActions.TOGGLEFEATURES_SUCCESS);
  });

  it('should define tagfeatures toggle fail action', () => {
    const action = new tagFeaturesActions.ToggleFeaturesFail('Error');
    expect(action.type).toBe(tagFeaturesActions.TOGGLEFEATURES_FAIL);
  });

  it('should define tagfeatures toggle provider action', () => {
    const action = new tagFeaturesActions.ToggleProviders(provider);
    expect(action.type).toBe(tagFeaturesActions.TOGGLEPROVIDERS);
    expect(action.payload).toBe(provider);
  });

  it('should define tagfeatures toggle provider success action', () => {
    const action = new tagFeaturesActions.ToggleProvidersSuccess();
    expect(action.type).toBe(tagFeaturesActions.TOGGLEPROVIDERS_SUCCESS);
  });

  it('should define tagfeatures toggle provider fail action', () => {
    const action = new tagFeaturesActions.ToggleProvidersFail('Error');
    expect(action.type).toBe(tagFeaturesActions.TOGGLEPROVIDERS_FAIL);
  });
});
