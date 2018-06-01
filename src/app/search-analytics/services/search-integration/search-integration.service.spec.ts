import { async, inject, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NoOpLogger } from '../../../core/services/logger/no-op-logger';
import { SearchIntegrationService } from './search-integration.service';
import { SearchIntegration, SearchIntegrationList } from '../../../models/search-integration';
import { ClientConfigService } from '../../../core/services/client-config/client-config.service';
import { ClientState, reducers } from '../../../core/reducers';


const mockSearchIntegrations: SearchIntegrationList = {
  integrations: [
    {
      id: 's2kUtasd',
      source: 12,
      name: 'google',
      href: 'integration/s2kUtasd'
    },
    {
      id: 'f2adaasF',
      source: 11,
      name: 'bing',
      href: 'integration/f2adaasF'
    }
  ],
  total_items: 2
};

describe('SearchIntegrationService', () => {
  let service: SearchIntegrationService;
  let configServiceSpy: jasmine.SpyObj<ClientConfigService>;
  const baseApiUrl = { baseApiUrl: '' };

  beforeEach(async(() => {
    configServiceSpy = jasmine.createSpyObj('ClientConfigService', ['get']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [SearchIntegrationService],
    });

    configServiceSpy.get.and.returnValue(baseApiUrl);
    const logger = new NoOpLogger();
    const http = TestBed.get(HttpClient);

    service = new SearchIntegrationService(http, logger, configServiceSpy);
  }));

  describe('when loading search integration', () => {
    describe('when successful', () => {
      it('should return search integration list',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          const cutomerList: SearchIntegrationList = mockSearchIntegrations;
          service.loadSearchIntegrations('customerId', {}).subscribe(
            response => {
              expect(response).toEqual(mockSearchIntegrations);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/search/integrations');
          expect(mock.request.method).toEqual('GET');
          mock.flush(mockSearchIntegrations);
        }))
      );
    });
    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          service.loadSearchIntegrations('customerId', {}).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/search/integrations');
          expect(mock.request.method).toEqual('GET');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

  describe('when get integration authorization url', () => {
    describe('when successful', () => {
      it('should return integration authorization url',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          service.getIntegrationAuthorizationUrl('google', { redirect_uri: 'integration' }).subscribe(
            response => {
              expect(response).toEqual({});
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'search/integrations/google?redirect_uri=integration');
          expect(mock.request.method).toEqual('GET');
        }))
      );
    });
    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          service.getIntegrationAuthorizationUrl('google', { redirect_uri: 'integration' }).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'search/integrations/google?redirect_uri=integration');
          expect(mock.request.method).toEqual('GET');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

  describe('when create search integration', () => {
    describe('when successful', () => {
      it('should return search integration success',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          service.createSearchIntegrations('customerId', { source: 'source', authCode: 'authCode', redirectUri: 'redirecUri' }).subscribe(
            response => {
              expect(response).toEqual(mockSearchIntegrations[0]);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/search/integrations');
          expect(mock.request.method).toEqual('POST');
        }))
      );
    });
    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          service.createSearchIntegrations('customerId', { source: 'source', authCode: 'authCode', redirectUri: 'redirecUri' }).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/search/integrations');
          expect(mock.request.method).toEqual('POST');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

  describe('when remove search integration', () => {
    describe('when successful', () => {
      it('should return removed search integration success',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          service.removeSearchIntegration('href').subscribe(
            response => {
              expect(response).toEqual({});
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'href');
          expect(mock.request.method).toEqual('DELETE');
        }))
      );
    });
    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          service.removeSearchIntegration('href').subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'href');
          expect(mock.request.method).toEqual('DELETE');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });
});
