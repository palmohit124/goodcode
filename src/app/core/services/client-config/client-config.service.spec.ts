import { async, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClientConfigService } from './client-config.service';
import { ClientConfiguration } from '../../../models/client-configuration';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NoOpLogger } from '../logger/no-op-logger';
import { ClientState, reducers } from '../../reducers';

describe('Client Config Service', () => {

  let service: ClientConfigService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [ClientConfigService],
    });

    const logger = new NoOpLogger();
    const http = TestBed.get(HttpClient);
    service = new ClientConfigService(http, logger);
  }));

  afterEach(inject([HttpTestingController], (backend) => {
    backend.verify();
  }));

  const exampleConfig: ClientConfiguration = {
    auth: {
      accessAllowedTo: [],
    },
    routes: {
      routesWithoutNav: []
    },
    baseApiUrl: '',
    oAuthConfigs: {
      redirectUri: '',
    }
  };

  describe('when load is invoked', () => {
    describe('when the resource is found', () => {
      it('should respond with the client configuration',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const expectedConfig: ClientConfiguration = exampleConfig;
          service.load().then(
            config => expect(config).toEqual(expectedConfig),
            err => fail(`this test should not fail: ${err}`),
          );
          const mock = backend.expectOne('conf/client-config.json');
          expect(mock.request.method).toEqual('GET');
          mock.flush(expectedConfig);
          expect(service.get()).toBe(expectedConfig);
        })));
    });
    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          service.load().then(
            config => fail('Expected this to fail, but it did not. :('),
            err => expect(err).toBeTruthy(),
          );
          const mock = backend.expectOne('conf/client-config.json');
          expect(mock.request.method).toEqual('GET');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
          expect(service.get()).toBeUndefined();
        })));
    });
  });
});
