import { async, TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NoOpLogger } from '../../../core/services/logger/no-op-logger';
import { TagFeaturesService } from './tag-features.service';
import { TagFeatures, Providers } from '../../../models/tag-features';
import { ClientState, reducers } from '../../../core/reducers';
import { ClientConfigService } from '../../../core/services/client-config/client-config.service';
import { LocalStorage } from '../../../core/services/local-storage/local-storage';

const MockTagFeatures: TagFeatures[] = [{
  'featureId': 1397808,
  'name': 'Cookie Sync',
  'enabled': true,
  'description': 'description',
  'providers': [
    {
      'providerId': 100,
      'name': 'Google',
      'enabled': false
    },
    {
      'providerId': 101,
      'name': 'Quantcast',
      'enabled': false
    },
    {
      'providerId': 102,
      'name': 'Adobe',
      'enabled': false
    }
  ]
}];

const MockProviders: Providers = {
  providerId: 1397808,
  name: 'test',
  enabled: true
};

describe('TagFeaturesService', () => {
  let service: TagFeaturesService;
  let configServiceSpy: jasmine.SpyObj<ClientConfigService>;
  let localStorageSpy: jasmine.SpyObj<LocalStorage>;
  const baseApiUrl = { baseApiUrl: '' };

  beforeEach(async(() => {
    configServiceSpy = jasmine.createSpyObj('ClientConfigService', ['get']);
    localStorageSpy = jasmine.createSpyObj(['getItem', 'setItem']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [TagFeaturesService],
    });

    configServiceSpy.get.and.returnValue(baseApiUrl);
    const logger = new NoOpLogger();
    const http = TestBed.get(HttpClient);

    service = new TagFeaturesService(http, logger, configServiceSpy);
  }));

  describe('when loading tag features', () => {
    describe('when successful', () => {
      it('should return tag features list',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const tagFeaturesList: TagFeatures[] = MockTagFeatures;
          service.loadTagFeatures('34H4726U3').subscribe(
            response => {
              expect(response).toEqual(tagFeaturesList);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'rulesets/account/34H4726U3/features');
          expect(mock.request.method).toEqual('GET');
          mock.flush(tagFeaturesList);
        }))
      );
    });

    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          service.loadTagFeatures('34H4726U3').subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'rulesets/account/34H4726U3/features');
          expect(mock.request.method).toEqual('GET');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

  describe('when updating tag features', () => {
    describe('when successful', () => {
      it('should return tag features list',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const tagFeaturesData: TagFeatures[] = MockTagFeatures;
          const updateTagFeatures = {
            'featureId': 1,
            'enabled': false,
            'accountId': '34H4726U3'
          };
          service.toggleTagFeatures(updateTagFeatures).subscribe(
            response => {
              expect(response).toEqual({});
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'rulesets/account/34H4726U3/features');
          expect(mock.request.body).toEqual(updateTagFeatures);
          expect(mock.request.method).toEqual('PUT');
          mock.flush({});
        }))
      );
    });
    describe('when the error occured', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const updateTagFeatures = {
            'featureId': 1,
            'enabled': false,
            'accountId': '34H4726U3'
          };
          service.toggleTagFeatures(updateTagFeatures).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'rulesets/account/34H4726U3/features');
          expect(mock.request.body).toEqual(updateTagFeatures);
          expect(mock.request.method).toEqual('PUT');
          mock.flush(null, { status: 500, statusText: 'Internal server error' });
        })));
    });
  });

  describe('when updating tag features providers', () => {
    describe('when successful', () => {
      it('should return tag feature providers list',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const providersData: Providers = MockProviders;
          const updateProvider = {
            'providerId': 100,
            'enabled': false,
            'accountId': '34H4726U3'
          };
          service.toggleTagProviders(updateProvider).subscribe(
            response => {
              expect(response).toEqual({});
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'rulesets/account/34H4726U3/providers');
          expect(mock.request.body).toEqual(updateProvider);
          expect(mock.request.method).toEqual('PUT');
          mock.flush({});
        }))
      );
    });
    describe('when the error occured', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const updateProvider = {
            'providerId': 100,
            'enabled': false,
            'accountId': '34H4726U3',
          };
          service.toggleTagProviders(updateProvider).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'rulesets/account/34H4726U3/providers');
          expect(mock.request.body).toEqual(updateProvider);
          expect(mock.request.method).toEqual('PUT');
          mock.flush(null, { status: 500, statusText: 'Internal server error' });
        })));
    });
  });

});
