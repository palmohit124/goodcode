import { reducer } from './client-configuration.reducer';
import { LoadConfigurationFailed, LoadConfigurationSucceeded } from '../actions/client-configuration.actions';
import { ClientConfiguration, EmptyClientConfiguration } from '../../models/client-configuration';

describe('The client configuration reducer', () => {

  const exampleConfig: ClientConfiguration = {
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

  describe('when the dispatched action is LoadClientConfigurationSucceeded', () => {
    describe('when the current state is equivalent to the initialState', () => {
      it('should update the applications client configuration state', () => {
        const config: ClientConfiguration = exampleConfig;
        const result = reducer(EmptyClientConfiguration, new LoadConfigurationSucceeded(config));
        expect(result).toEqual(config);
        expect(result).not.toBe(config);
      });
    });
    describe('when the current state is not equivalent to the initialState', () => {
      it('should update the applications client configuration state', () => {
        const config: ClientConfiguration = exampleConfig;
        const currentState = { ...exampleConfig };
        const result = reducer(currentState, new LoadConfigurationSucceeded(config));
        expect(result).toEqual(config);
        expect(result).not.toBe(config);
      });
    });
  });
  describe('when the dispatched action is LoadClientConfigurationFailed', () => {
    describe('when the current state is equivalent to the initialState', () => {
      it('should update the applications client configuration state', () => {
        const result = reducer(exampleConfig, new LoadConfigurationFailed('failure'));
        expect(result).toBe(EmptyClientConfiguration);
      });
    });
    describe('when the current state is not equivalent to the initialState', () => {
      it('should update the applications client configuration state', () => {
        const result = reducer(EmptyClientConfiguration, new LoadConfigurationFailed('failure'));
        expect(result).toBe(EmptyClientConfiguration);
      });
    });
  });
});
