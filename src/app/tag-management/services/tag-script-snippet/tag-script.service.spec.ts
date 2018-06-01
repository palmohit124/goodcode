import { TestBed, inject , async } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NoOpLogger } from '../../../core/services/logger/no-op-logger';
import { TagScriptService } from './tag-script.service';
import { ClientState, reducers } from '../../../core/reducers';
import { ClientConfigService } from '../../../core/services/client-config/client-config.service';



describe('TagScriptService', () => {
   let service: TagScriptService;
  let configServiceSpy: jasmine.SpyObj<ClientConfigService>;
  const baseApiUrl = { baseApiUrl: '' };
  const MockTagScriptSnippet = {
    'snippet': '<script type="text/javascript" src="10.1.2.43:9090/v3/34H4726U3"></script>'
  };
  beforeEach(() => {
    configServiceSpy = jasmine.createSpyObj('ClientConfigService', ['get']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [TagScriptService],
    });
    configServiceSpy.get.and.returnValue(baseApiUrl);
    const logger = new NoOpLogger();
    const http = TestBed.get(HttpClient);

    service = new TagScriptService(http, logger, configServiceSpy);

  });
  describe('when loading tag script snippet', () => {
    describe('when successful', () => {
      it('should return tag script snippet',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const tagScriptSnippet = MockTagScriptSnippet;
          service.loadTagScriptSnippet('34H4726U3').subscribe(
            response => {
              expect(response).toEqual(tagScriptSnippet);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'rulesets/account/34H4726U3/tag-script-snippet');
          expect(mock.request.method).toEqual('GET');
          mock.flush(tagScriptSnippet);
        }))
      );
    });

    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          service.loadTagScriptSnippet('34H4726U3').subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'rulesets/account/34H4726U3/tag-script-snippet');
          expect(mock.request.method).toEqual('GET');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });
});
