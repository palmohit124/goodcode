import {async, inject, TestBed} from '@angular/core/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {NoOpLogger} from '../../../core/services/logger/no-op-logger';
import {ReportService} from './report.service';
import {ReportPlatforms, ReportSchedule, ReportSettings} from '../../../models/report';
import {ClientConfigService} from '../../../core/services/client-config/client-config.service';
import {ClientState, reducers} from '../../../core/reducers';
import {Clock} from '../../../core/services/clock/clock';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

const mockReportSchedule: ReportSchedule = {
  startTime: '03:00',
  deliverByTime: '10:00',
  timezone: 'America/St_Johns',
  status: 'Active',
};

const mockReportSettings: ReportSettings = {
  timezone: 'America/St_Johns',
  defaultCTN: '5627',
  callDuration: '45',
  conversionSource: 'external',
  clickToCall: true,
  validFrom: '2018-10-20',
  validTo: '2019-10-20'
};

const reportPlatforms: ReportPlatforms = {
  linkedReportPlatforms: ['']
};

describe('ReportService', () => {
  let service: ReportService;
  let configServiceSpy: jasmine.SpyObj<ClientConfigService>;
  let clockServiceSpy: jasmine.SpyObj<Clock>;
  const expectedDate = new Date().toISOString().slice(0, 10);

  const baseApiUrl = { baseApiUrl: '' };

  beforeEach(async(() => {
    configServiceSpy = jasmine.createSpyObj('ClientConfigService', ['get']);
    clockServiceSpy = jasmine.createSpyObj(['getDateString']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      providers: [ReportService],
    });

    configServiceSpy.get.and.returnValue(baseApiUrl);
    clockServiceSpy.getDateString.and.returnValue(expectedDate);

    const logger = new NoOpLogger();
    const http = TestBed.get(HttpClient);
    service = new ReportService(http, logger, configServiceSpy, clockServiceSpy);
  }));

  describe('when loading report schedule', () => {
    describe('when successful', () => {
      it('should return report schedule',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          const reportSchedule: ReportSchedule = mockReportSchedule;
          service.loadReportSchedule('customerId').subscribe(
            response => {
              expect(response).toEqual(reportSchedule);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/search/report/schedule');
          expect(mock.request.method).toEqual('GET');
          mock.flush(reportSchedule);
        }))
      );
    });
    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          service.loadReportSchedule('customerId').subscribe(
            () => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/search/report/schedule');
          expect(mock.request.method).toEqual('GET');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

  describe('when loading report settings', () => {
    describe('when successful', () => {
      it('should return report settings',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const reportSettings: ReportSettings = mockReportSettings;
          service.loadReportSettings('customerId').subscribe(
            response => {
              expect(response).toEqual(reportSettings);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/search/report/settings?date=' + expectedDate);
          expect(mock.request.method).toEqual('GET');
          mock.flush(reportSettings);
        }))
      );
    });
    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          service.loadReportSettings('customerId').subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/search/report/settings?date=' + expectedDate);
          expect(mock.request.method).toEqual('GET');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

  describe('when update report schedule', () => {
    describe('when successful', () => {
      it('should return updated report schedule',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          service.updateReportSchedule('customerId', mockReportSchedule).subscribe(
            response => {
              expect(response).toEqual(mockReportSchedule);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/search/report/schedule');
          expect(mock.request.method).toEqual('PUT');
          mock.flush(mockReportSchedule);
        }))
      );
    });
    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          service.updateReportSchedule('customerId', mockReportSchedule).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/search/report/schedule');
          expect(mock.request.method).toEqual('PUT');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

  describe('when update report setting', () => {
    describe('when successful', () => {
      it('should return updated report setting',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          service.updateReportSettings('customerId', mockReportSettings).subscribe(
            response => {
              expect(response).toEqual(mockReportSettings);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/search/report/settings');
          expect(mock.request.method).toEqual('PUT');
          mock.flush(mockReportSettings);
        }))
      );
    });
    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          service.updateReportSettings('customerId', mockReportSettings).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/search/report/settings');
          expect(mock.request.method).toEqual('PUT');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

  describe('when remove report schedule', () => {
    describe('when successful', () => {
      it('should return removed report schedule',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          service.removeReportSchedule('customerId').subscribe(
            response => {
              expect(response).toEqual(mockReportSettings);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/search/report/schedule');
          expect(mock.request.method).toEqual('DELETE');
          mock.flush(mockReportSettings);
        }))
      );
    });
    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          service.removeReportSchedule('customerId').subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/search/report/schedule');
          expect(mock.request.method).toEqual('DELETE');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

  describe('when load report platforms', () => {
    describe('when successful', () => {
      it('should return report platforms list',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          service.loadReportPlatforms('customerId').subscribe(
            response => {
              expect(response).toEqual(reportPlatforms);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/search/report/linked-reports');
          expect(mock.request.method).toEqual('GET');
          mock.flush(reportPlatforms);
        }))
      );
    });
    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          service.loadReportPlatforms('customerId').subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/search/report/linked-reports');
          expect(mock.request.method).toEqual('GET');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

  describe('when get report download url', () => {
    describe('when successful', () => {
      it('should return url',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          service.getReportDownloadUrl('customerId', {}).subscribe(
            response => {
              expect(response).toEqual('urlLink');
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/search/report/download');
          expect(mock.request.method).toEqual('POST');
          mock.flush('urlLink');
        }))
      );
    });
    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          service.getReportDownloadUrl('customerId', {}).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/search/report/download');
          expect(mock.request.method).toEqual('POST');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

});
