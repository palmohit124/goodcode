import {tag} from '../../helpers';
import {ClientConfiguration} from '../../models/client-configuration';
import {Action} from '@ngrx/store';

// @formatter:off
export const LOAD_CLIENT_CONFIGURATION_FAILED =    tag('[ClientConfiguration] LoadClientConfigurationFailed');
export const LOAD_CLIENT_CONFIGURATION_SUCCEEDED = tag('[ClientConfiguration] LoadClientConfigurationSucceeded');
// @formatter:on

export class LoadConfigurationFailed implements Action {
  readonly type = LOAD_CLIENT_CONFIGURATION_FAILED;

  constructor(public payload: string) {
  }
}

export class LoadConfigurationSucceeded implements Action {
  readonly type = LOAD_CLIENT_CONFIGURATION_SUCCEEDED;

  constructor(public payload: ClientConfiguration) {
  }
}

export type Actions = LoadConfigurationFailed | LoadConfigurationSucceeded;
