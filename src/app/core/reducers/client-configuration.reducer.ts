import {clientConfigActions} from '../actions';
import {ClientConfiguration, EmptyClientConfiguration} from '../../models/client-configuration';

export function reducer(state: ClientConfiguration = EmptyClientConfiguration, action: clientConfigActions.Actions): ClientConfiguration {
  switch (action.type) {
    case clientConfigActions.LOAD_CLIENT_CONFIGURATION_FAILED: {
      return EmptyClientConfiguration;
    }
    case clientConfigActions.LOAD_CLIENT_CONFIGURATION_SUCCEEDED: {
      const configuration = <ClientConfiguration> action.payload;
      return {
        ...state,
        ...configuration
      };
    }
    default:
      return state;
  }
}
