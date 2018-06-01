import {
  LOAD_CLIENT_CONFIGURATION_FAILED,
  LOAD_CLIENT_CONFIGURATION_SUCCEEDED,
  LoadConfigurationFailed,
  LoadConfigurationSucceeded,
} from './client-configuration.actions';
import { ClientConfiguration } from '../../models/client-configuration';

describe('ClientConfiguration Actions', () => {
  it('should define LOAD_CONFIGURATION_FAILED', () => {
    const expectedFailureMessage = 'whoops';
    const action = new LoadConfigurationFailed(expectedFailureMessage);
    expect(action.type).toBe(LOAD_CLIENT_CONFIGURATION_FAILED);
    expect(action.payload).toBe(expectedFailureMessage);
  });
  it('should define LOAD_CONFIGURATION_SUCCEEDED', () => {
    const expectedConfiguration: ClientConfiguration = {
      auth: {
        accessAllowedTo: []
      },
      routes: {
        routesWithoutNav: []
      },
      baseApiUrl: '',
      oAuthConfigs: {
        redirectUri: '',
      }
    };
    const action = new LoadConfigurationSucceeded(expectedConfiguration);
    expect(action.type).toBe(LOAD_CLIENT_CONFIGURATION_SUCCEEDED);
    expect(action.payload).toBe(expectedConfiguration);
  });
});
