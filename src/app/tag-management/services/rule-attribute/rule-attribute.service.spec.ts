import {async, inject, TestBed} from '@angular/core/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {NoOpLogger} from '../../../core/services/logger/no-op-logger';
import {RuleAttributeService} from './rule-attribute.service';
import {CreateRuleAttributes, RuleAttributes} from '../../../models/rule-set';
import {ClientState, reducers} from '../../../core/reducers';
import {ClientConfigService} from '../../../core/services/client-config/client-config.service';
import {LocalStorage} from '../../../core/services/local-storage/local-storage';

const MockRuleset: CreateRuleAttributes = {
  parentId: 1394798,
  refdom: {
    'graphId': 1394856,
    'domain': 'Google',
    'sources': [
      'google.com'
    ],
  },
  condition: {
    'graphId': 1394857,
    'source': 'url',
    'searchParameters': 'test'
  },
  lookup: {
    'graphId': 1394854,
    'lookupName': 'test'
  },
  rewrite: {
    'graphId': 1394855,
    'value': 1111111112,
    'ctn': 4525435345
  }
};

const MockRulesetDetails: RuleAttributes = {
  'refdoms': [
    {
      'graphId': 1394856,
      'domain': 'Google',
      'sources': [
        'google.com'
      ],
      'conditions': [
        {
          'graphId': 1394857,
          'searchParameters': 'test',
          'lookups': [
            {
              'graphId': 1394854,
              'lookupName': 'test',
              'rewrites': [
                {
                  'graphId': 1394855,
                  'value': 1111111112,
                  'ctn': 4525435345
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

describe('RuleAttributeService', () => {
  let service: RuleAttributeService;
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
      providers: [RuleAttributeService],
    });

    configServiceSpy.get.and.returnValue(baseApiUrl);
    const logger = new NoOpLogger();
    const http = TestBed.get(HttpClient);

    service = new RuleAttributeService(http, logger, configServiceSpy);
  }));

  describe('when loading rule details', () => {
    describe('when successful', () => {
      it('should return rule details',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          service.loadRuleDetails('Z6veDo3FG7t1').subscribe(
            response => {
              expect(response).toEqual(MockRulesetDetails);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'rulesets/Z6veDo3FG7t1');
          expect(mock.request.method).toEqual('GET');
          mock.flush(MockRulesetDetails);
        }))
      );
    });

    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          service.loadRuleDetails('Z6veDo3FG7t1').subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'rulesets/Z6veDo3FG7t1');
          expect(mock.request.method).toEqual('GET');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

  describe('when creating ruleset', () => {
    describe('when successful', () => {
      it('should return ruleset details',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const newRule = {
            parentId: '1394798',
            refdom: {
              'domain': 'Google',
              'sources': [
                'google.com'
              ],
            },
            condition: {
              'source': 'url',
              'searchParameters': 'test'
            },
            lookup: {
              'lookupName': 'test'
            },
            rewrite: {
              'value': 1111111112,
              'ctn': 4525435345
            }
          };
          service.addRuleset(newRule).subscribe(
            response => {
              expect(response).toEqual(MockRuleset);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'rulesets');
          expect(mock.request.body).toEqual(newRule);
          expect(mock.request.method).toEqual('POST');
          mock.flush(MockRuleset);
        }))
      );
    });
    describe('when the error occured', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const newRule = {
            parentId: '1394798',
            refdom: {
              'domain': 'Google',
              'sources': [
                'google.com'
              ],
            },
            condition: {
              'source': 'url',
              'searchParameters': 'test'
            },
            lookup: {
              'lookupName': 'test'
            },
            rewrite: {
              'value': 1111111112,
              'ctn': 4525435345
            }
          };
          service.addRuleset(newRule).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'rulesets');
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
          const attribute = { 'name': 'rule', 'graphId': 'Z6veDo3FG7t1' };
          service.deleteAttribute(attribute).subscribe(
            response => {
              expect(response).toEqual('');
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + '/rulesets/rule/Z6veDo3FG7t1');
          expect(mock.request.method).toEqual('DELETE');
          mock.flush('');
        }))
      );
    });

    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const attribute = { 'name': 'rule', 'graphId': 'Z6veDo3FG7t1' };
          service.deleteAttribute(attribute).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + '/rulesets/rule/Z6veDo3FG7t1');
          expect(mock.request.method).toEqual('DELETE');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

  describe('when editing rule components', () => {
    describe('when successful', () => {
      it('should return rule component details',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const refdom = {
            'domain': 'Google',
            'sources': [
              'google.com'
            ],
          };
          service.editRulesetAttribute('1397808', 'refdom', refdom).subscribe(
            response => {
              expect(response).toEqual(MockRulesetDetails);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'rulesets/refdom/1397808');
          expect(mock.request.method).toEqual('PUT');
          mock.flush(MockRulesetDetails);
        }))
      );
    });

    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const refdom = {
            'domain': 'Google',
            'sources': [
              'google.com'
            ],
          };
          service.editRulesetAttribute('1397808', 'refdom' , refdom).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'rulesets/refdom/1397808');
          expect(mock.request.method).toEqual('PUT');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

});
