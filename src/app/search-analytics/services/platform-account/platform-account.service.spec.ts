import { async, inject, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NoOpLogger } from '../../../core/services/logger/no-op-logger';
import { PlatformAccountService } from './platform-account.service';
import * as platformAccountModels from '../../../models/platform-account';
import { ClientConfigService } from '../../../core/services/client-config/client-config.service';
import { platformAccount } from '../../reducers/index';
import { ClientState, reducers } from '../../../core/reducers';

const mockLinkedPlatformAccounts: platformAccountModels.LinkedPlatformAccounts = {
  'parent': {
    'platformId': '12F2504S1',
    'name': 'Account Name',
    'parentId': null,
    'href': '/account/admin?acc=12F2504S1'
  },
  'children': [
    {
      'platformId': '12F2504S1',
      'name': 'Account Name',
      'parentId': '13F2504E0',
      'href': '/account/admin?acc=12F2504S1'
    },
    {
      'platformId': '12F2504S1',
      'name': 'Account Name 1',
      'parentId': '13F2504E0',
      'href': '/account/admin?acc=12F2504S1'
    }
  ],
  'total_items': 2,
};

const mockUnlinkParentAccount: platformAccountModels.UnlinkedParentAccounts = {
  'parents': [
    {
      'platformId': '12F2504S1',
      'name': 'Account Name 1',
      'parentId': null,
      'href': '/account/admin?acc=12F2504S1'
    },
    {
      'platformId': '12F2504S1',
      'name': 'Account Name 2',
      'parentId': null,
      'href': '/account/admin?acc=12F2504S1'
    }
  ],
  'total_items': 2,
};

const mockUnlinkChildAccount: platformAccountModels.UnlinkedChildAccounts = {
  'children': [
    {
      'platformId': '12F2504S1',
      'name': 'Account Name',
      'parentId': '13F2504E0',
      'href': '/account/admin?acc=12F2504S1'
    },
    {
      'platformId': '12F2504S1',
      'name': 'Account Name 1',
      'parentId': '13F2504E0',
      'href': '/account/admin?acc=12F2504S1'
    }
  ],
  'total_items': 2,
};

describe('PlatformAccountService', () => {
  let service: PlatformAccountService;
  let configServiceSpy: jasmine.SpyObj<ClientConfigService>;
  const baseApiUrl = { baseApiUrl: '' };

  beforeEach(async(() => {
    configServiceSpy = jasmine.createSpyObj('ClientConfigService', ['get']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [PlatformAccountService],
    });

    configServiceSpy.get.and.returnValue(baseApiUrl);
    const logger = new NoOpLogger();
    const http = TestBed.get(HttpClient);

    service = new PlatformAccountService(http, logger, configServiceSpy);
  }));

  describe('when loading linked platform account', () => {
    describe('when successful', () => {
      it('should return linked platform account list',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          const linkedPlatformAccounts: platformAccountModels.LinkedPlatformAccounts = mockLinkedPlatformAccounts;
          service.loadLinkedPlatformAccounts('customerId', { linked: true }).subscribe(
            response => {
              expect(response).toEqual(linkedPlatformAccounts);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/linked-platform-accounts?linked=true');
          expect(mock.request.method).toEqual('GET');
          mock.flush(linkedPlatformAccounts);
        }))
      );
    });
    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          service.loadLinkedPlatformAccounts('customerId', { linked: true }).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/linked-platform-accounts?linked=true');
          expect(mock.request.method).toEqual('GET');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

  describe('when loading unlinked parent account', () => {
    describe('when successful', () => {
      it('should return unlinked parent list',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          const unlinkedParentAccount: platformAccountModels.UnlinkedParentAccounts = mockUnlinkParentAccount;
          service.loadUnlinkedParentAccounts('customerId', {}).subscribe(
            response => {
              expect(response).toEqual(unlinkedParentAccount);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/unlinked-platform-accounts/parents');
          expect(mock.request.method).toEqual('GET');
          mock.flush(unlinkedParentAccount);
        }))
      );
    });
    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          service.loadUnlinkedParentAccounts('customerId', {}).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/unlinked-platform-accounts/parents');
          expect(mock.request.method).toEqual('GET');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

  describe('when linking parent account', () => {
    describe('when successful', () => {
      it('should return success',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          service.linkParentAccount('customerId', 'parentId').subscribe(
            response => {
              expect(response).toEqual({});
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/platform-accounts/parents/parentId');
          expect(mock.request.body).toEqual({});
          expect(mock.request.method).toEqual('PUT');
        }))
      );
    });
    describe('when the error occured', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          service.linkParentAccount('customerId', 'parentId').subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/platform-accounts/parents/parentId');
          expect(mock.request.body).toEqual({});
          expect(mock.request.method).toEqual('PUT');
          mock.flush(null, { status: 500, statusText: 'Internal server error' });
        })));
    });
  });

  describe('when loading unlinked child account', () => {
    describe('when successful', () => {
      it('should return unlinked child list',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          const unlinkedChildAccounts: platformAccountModels.UnlinkedChildAccounts = mockUnlinkChildAccount;
          service.loadUnlinkedChildAccounts('customerId', 'parentId', {}).subscribe(
            response => {
              expect(response).toEqual(unlinkedChildAccounts);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/unlinked-platform-accounts/parents/parentId/children');
          expect(mock.request.method).toEqual('GET');
          mock.flush(unlinkedChildAccounts);
        }))
      );
    });
    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          service.loadUnlinkedChildAccounts('customerId', 'parentId', {}).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/unlinked-platform-accounts/parents/parentId/children');
          expect(mock.request.method).toEqual('GET');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

  describe('when linking child account', () => {
    describe('when successful', () => {
      it('should return success',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          service.linkChildAccount('customerId', 'platformId').subscribe(
            response => {
              expect(response).toEqual({});
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/platform-accounts/children/platformId');
          expect(mock.request.body).toEqual({});
          expect(mock.request.method).toEqual('PUT');
        }))
      );
    });
    describe('when the error occured', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          service.linkChildAccount('customerId', 'platformId').subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/platform-accounts/children/platformId');
          expect(mock.request.body).toEqual({});
          expect(mock.request.method).toEqual('PUT');
          mock.flush(null, { status: 500, statusText: 'Internal server error' });
        })));
    });
  });
});
