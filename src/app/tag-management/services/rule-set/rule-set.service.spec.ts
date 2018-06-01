import { async, TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NoOpLogger } from '../../../core/services/logger/no-op-logger';
import { RulesetService } from './rule-set.service';
import { RuleSet, Rule } from '../../../models/rule-set';
import { ClientState, reducers } from '../../../core/reducers';
import { ClientConfigService } from '../../../core/services/client-config/client-config.service';
import { LocalStorage } from '../../../core/services/local-storage/local-storage';

const MockRulesetList: RuleSet = {
  'rules': [
    {
      'graphId': 1394798,
      'name': 'Rule1',
      'campaignId': '67GH424F2'
    },
    {
      'graphId': 1394800,
      'name': 'Rule 2',
      'campaignId': '67GHER424F256'
    }
  ],
  'total_items': 2
};


describe('RulesetService', () => {
  let service: RulesetService;
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
      providers: [RulesetService],
    });

    configServiceSpy.get.and.returnValue(baseApiUrl);
    const logger = new NoOpLogger();
    const http = TestBed.get(HttpClient);

    service = new RulesetService(http, logger, configServiceSpy, localStorageSpy);
  }));

  describe('when loading rules list', () => {
    describe('when successful', () => {
      it('should return rules list',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const rulesetList: RuleSet = MockRulesetList;
          const queryParam = {
            'offset': 0,
            'limit': 10,
          };
          service.loadRulesetList('34H4726U3', queryParam).subscribe(
            response => {
              expect(response).toEqual(rulesetList);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'rulesets/rule/account/34H4726U3?offset=0&limit=10');
          expect(mock.request.method).toEqual('GET');
          mock.flush(rulesetList);
        }))
      );
    });

    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const queryParam = {
            'offset': 0,
            'limit': 10,
          };
          service.loadRulesetList('34H4726U3', queryParam).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'rulesets/rule/account/34H4726U3?offset=0&limit=10');
          expect(mock.request.method).toEqual('GET');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

  describe('when loading rule details', () => {
    describe('when successful', () => {
      it('should return rule details',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const rule: Rule = MockRulesetList.rules[0];
          service.loadRule('1').subscribe(
            response => {
              expect(response).toEqual(rule);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'rulesets/rule/1');
          expect(mock.request.method).toEqual('GET');
          mock.flush(rule);
        }))
      );
    });

    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          service.loadRule('1').subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'rulesets/rule/1');
          expect(mock.request.method).toEqual('GET');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

  describe('when creating rule', () => {
    describe('when successful', () => {
      it('should return rule',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const rule: Rule = MockRulesetList.rules[0];
          const newRule = {
            'name': 'Rule1',
            'campaignId': '67GH424F2',
          };
          service.addRule(newRule).subscribe(
            response => {
              expect(response).toEqual(rule);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'rulesets/rule');
          expect(mock.request.body).toEqual(newRule);
          expect(mock.request.method).toEqual('POST');
          mock.flush(rule);
        }))
      );
    });
    describe('when the error occured', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const newRule = {
            'name': 'Rule1',
            'campaignId': '67GH424F2',
          };
          service.addRule(newRule).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'rulesets/rule');
          expect(mock.request.body).toEqual(newRule);
          expect(mock.request.method).toEqual('POST');
          mock.flush(null, { status: 500, statusText: 'Internal server error' });
        })));
    });
  });

  describe('when deleting rule', () => {
    describe('when successful', () => {
      it('should return rule deleted details',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const rulesetList: RuleSet = MockRulesetList;
          service.deleteRule('1').subscribe(
            response => {
              expect(response).toEqual(rulesetList);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'rulesets/rule/1');
          expect(mock.request.method).toEqual('DELETE');
          mock.flush(rulesetList);
        }))
      );
    });

    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          service.deleteRule('1').subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'rulesets/rule/1');
          expect(mock.request.method).toEqual('DELETE');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

});

