import { async, inject, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NoOpLogger } from '../logger/no-op-logger';
import { TimeZoneService } from './time-zone.service';
import { environment } from '../../../../environments/environment';
import { ClientConfigService } from '../client-config/client-config.service';
import { ClientState, reducers } from '../../reducers';

const mockTimeZoneList = { timezoneOffsets: [] };

describe('TimeZoneService', () => {
  let service: TimeZoneService;
  let configServiceSpy: jasmine.SpyObj<ClientConfigService>;
  const baseApiUrl = { baseApiUrl: '' };

  beforeEach(async(() => {
    configServiceSpy = jasmine.createSpyObj('ClientConfigService', ['get']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [TimeZoneService],
    });

    configServiceSpy.get.and.returnValue(baseApiUrl);
    const logger = new NoOpLogger();
    const http = TestBed.get(HttpClient);

    service = new TimeZoneService(http, logger, configServiceSpy);
  }));

  describe('when loading timezone', () => {
    describe('when successful', () => {
      it('should return timezone list',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          service.loadTimeZone().subscribe(
            response => {
              expect(response).toEqual(mockTimeZoneList);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'timezones');
          expect(mock.request.method).toEqual('GET');
          mock.flush(mockTimeZoneList);
        }))
      );
    });
    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          service.loadTimeZone().subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'timezones');
          expect(mock.request.method).toEqual('GET');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });
});
