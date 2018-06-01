import { Action } from '@ngrx/store';
import { tag } from '../../helpers/index';
import { TagFeatures } from '../../models/tag-features';


export const LOAD = tag('[TagFeatures] Load Tag Features');
export const LOAD_SUCCESS = tag('[TagFeatures] Load Success');
export const LOAD_FAIL = tag('[TagFeatures] Load Fail');

export const TOGGLEFEATURES = tag('[TagFeatures] ENABLED Tag Features');
export const TOGGLEFEATURES_SUCCESS = tag('[TagFeatures] ENABLED Success');
export const TOGGLEFEATURES_FAIL = tag('[TagFeatures] ENABLED Fail');

export const TOGGLEPROVIDERS = tag('[TagFeatures] TOGGELED Tag Providers');
export const TOGGLEPROVIDERS_SUCCESS = tag('[TagFeatures] TOGGELED Success');
export const TOGGLEPROVIDERS_FAIL = tag('[TagFeatures] TOGGELED Fail');

export class Load implements Action {
  readonly type = LOAD;
  constructor(public queryParam: any) {
  }
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: TagFeatures[]) { }
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: string) {
  }
}

export class ToggleFeatures implements Action {
  readonly type = TOGGLEFEATURES;

  constructor(public payload: object) { }
}

export class ToggleFeaturesSuccess implements Action {
  readonly type = TOGGLEFEATURES_SUCCESS;

}

export class ToggleFeaturesFail implements Action {
  readonly type = TOGGLEFEATURES_FAIL;

  constructor(public payload: string) {
  }
}

export class ToggleProviders implements Action {
  readonly type = TOGGLEPROVIDERS;

  constructor(public payload: object) { }
}

export class ToggleProvidersSuccess implements Action {
  readonly type = TOGGLEPROVIDERS_SUCCESS;

}

export class ToggleProvidersFail implements Action {
  readonly type = TOGGLEPROVIDERS_FAIL;

  constructor(public payload: string) {
  }
}

export type Actions =
  Load |
  LoadSuccess |
  LoadFail |
  ToggleFeatures |
  ToggleFeaturesSuccess |
  ToggleFeaturesFail |
  ToggleProviders |
  ToggleProvidersSuccess |
  ToggleProvidersFail;


