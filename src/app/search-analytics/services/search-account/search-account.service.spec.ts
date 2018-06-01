import { async, inject, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NoOpLogger } from '../../../core/services/logger/no-op-logger';
import { SearchAccountService } from './search-account.service';
import { SearchAccount, SearchAccountList } from '../../../models/search-account';
import { ClientConfigService } from '../../../core/services/client-config/client-config.service';
import { ClientState, reducers } from '../../../core/reducers';

const mockLinkedSearchAccount: SearchAccountList = {
  accounts: [
    {
      source: 'bing',
      sourceId: 32,
      name: 'account 1',
      number: 'number 1',
      integrationId: 12,
      linked: true,
      href: 'account/32'
    },
    {
      source: 'google',
      sourceId: 51,
      name: 'account 2',
      integrationId: 12,
      linked: true,
      href: 'account/51'
    }
  ],
  total_items: 2
};

describe('SearchAccountService', () => {
  let service: SearchAccountService;
  let configServiceSpy: jasmine.SpyObj<ClientConfigService>;
  const baseApiUrl = { baseApiUrl: '' };

  beforeEach(async(() => {
    configServiceSpy = jasmine.createSpyObj('ClientConfigService', ['get']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [SearchAccountService],
    });

    configServiceSpy.get.and.returnValue(baseApiUrl);
    const logger = new NoOpLogger();
    const http = TestBed.get(HttpClient);

    service = new SearchAccountService(http, logger, configServiceSpy);
  }));

  describe('when loading linked search account', () => {
    describe('when successful', () => {
      it('should return linked search account list',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          service.loadSearchAccounts('customerId', {}).subscribe(
            response => {
              expect(response).toEqual(mockLinkedSearchAccount);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/search/accounts');
          expect(mock.request.method).toEqual('GET');
          mock.flush(mockLinkedSearchAccount);
        }))
      );
    });
    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          service.loadSearchAccounts('customerId', {}).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/search/accounts');
          expect(mock.request.method).toEqual('GET');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

  describe('when loading unlinked search accounts', () => {
    describe('when successful', () => {
      it('should return linked search account list',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          service.loadUnlinkedSearchAccounts('customerId', 'integrationId', {}).subscribe(
            response => {
              expect(response).toEqual(mockLinkedSearchAccount);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/search/integrations/integrationId/unlinked-accounts');
          expect(mock.request.method).toEqual('GET');
          mock.flush(mockLinkedSearchAccount);
        }))
      );
    });
    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          service.loadUnlinkedSearchAccounts('customerId', 'integrationId', {}).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/search/integrations/integrationId/unlinked-accounts');
          expect(mock.request.method).toEqual('GET');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

  describe('when linking search account', () => {
    describe('when linked successful', () => {
      it('should return linked search success',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          service.linkSearchAccount({ integrationId: 'integrationId' }, 'href').subscribe(
            response => {
              expect(response).toEqual({});
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'href');
          expect(mock.request.method).toEqual('PUT');
        }))
      );
    });
    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          service.linkSearchAccount({ integrationId: 'integrationId' }, 'href').subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'href');
          expect(mock.request.method).toEqual('PUT');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

  describe('when unlinking search account', () => {
    describe('when unlinked successful', () => {
      it('should return unlinked search success',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          service.unlinkSearchAccount('href').subscribe(
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

          service.unlinkSearchAccount('href').subscribe(
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
