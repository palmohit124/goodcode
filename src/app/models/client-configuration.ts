export interface ClientConfiguration {
  auth: Auth;
  routes: {
    routesWithoutNav: string[],
  };
  baseApiUrl: string;
  oAuthConfigs: {
    redirectUri: string;
  };
}

export interface Auth {
  accessAllowedTo: string[];
}

export const EmptyAuthOptions: Auth = {
  accessAllowedTo: []
};

export const EmptyClientConfiguration: ClientConfiguration = {
  auth: EmptyAuthOptions,
  routes: {
    routesWithoutNav: []
  },
  baseApiUrl: '',
  oAuthConfigs: {
    redirectUri: '',
  }
};
