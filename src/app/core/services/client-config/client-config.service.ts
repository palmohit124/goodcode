import { APP_INITIALIZER, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientConfiguration } from '../../../models/client-configuration';
import { ClientState } from '../../reducers';
import { clientConfigActions } from '../../actions';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { Logger } from '../logger';

@Injectable()
export class ClientConfigService {
  private loadedConfiguration: ClientConfiguration;

  constructor(private http: HttpClient, private logger: Logger) {
  }

  load() {
    return new Promise((resolve, reject) => {
      this.http.get<ClientConfiguration>('conf/client-config.json')
        .subscribe(
        (config) => {
          this.loadedConfiguration = config;
          this.logger.info('[ClientConfigService] Successfully loaded client-config.');
          resolve(config);
        },
        (error) => {
          this.logger.error('[ClientConfigService] Failed to load the client-config.', error);
          reject(error);
        });
    });
  }

  get(): ClientConfiguration {
    return this.loadedConfiguration;
  }
}

export function initializeConfiguration(configService: ClientConfigService) {
  return () => configService.load();
}

export const CONFIGURATION_INITIALIZER = {
  provide: APP_INITIALIZER,
  useFactory: initializeConfiguration,
  deps: [ClientConfigService],
  multi: true,
};
