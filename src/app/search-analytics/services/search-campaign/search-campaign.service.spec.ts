import { async, inject, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NoOpLogger } from '../../../core/services/logger/no-op-logger';
import { SearchCampaignService } from './search-campaign.service';
import { SearchCampaign } from '../../../models/search-campaign';
import { ClientConfigService } from '../../../core/services/client-config/client-config.service';
import { ClientState, reducers } from '../../../core/reducers';
import { HttpHeaders } from '@angular/common/http';

const mockSearchCampaigns: SearchCampaign[] = [
  {
    id: '67GH424F2',
    type: 'BulkClickToCallCampaignOnboarding',
    href: '/customers/13F2504E0/events/akW5ack84USOm4d',
    status: 'Completed',
    submittedFileName: 'test.csv',
    submittedFileUrl: 'customers/search/campaigns/download',
    submitTime: '2017-08-08 03:00:00',
    submittedBy: 'abc@def.com',
    completedTime: '2017-08-08 03:00:00',
    totalRowCount: 2,
    successRowCount: 2,
    errorFileUrl: null
  } as SearchCampaign,
  {
    id: '89FR424K9',
    type: 'BulkClickToCallCampaignOnboarding',
    href: '/customers/13F2504E0/events/akW5ack84USOm4d',
    status: 'Completed With Errors',
    submittedFileName: 'test.csv',
    submittedFileUrl: 'customers/search/campaigns/download',
    submitTime: '2017-08-08 03:00:00',
    submittedBy: 'abc@def.com',
    completedTime: '2017-08-08 03:00:00',
    totalRowCount: 2,
    successRowCount: 1,
    errorFileUrl: 'customers/search/campaigns/download'
  } as SearchCampaign
];

const expectedSearchCampaignList = [mockSearchCampaigns, 2];

describe('SearchCampaignService', () => {
  let service: SearchCampaignService;
  let configServiceSpy: jasmine.SpyObj<ClientConfigService>;
  const baseApiUrl = { baseApiUrl: '' };

  beforeEach(async(() => {
    configServiceSpy = jasmine.createSpyObj('ClientConfigService', ['get']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [SearchCampaignService],
    });

    configServiceSpy.get.and.returnValue(baseApiUrl);
    const logger = new NoOpLogger();
    const http = TestBed.get(HttpClient);

    service = new SearchCampaignService(http, logger, configServiceSpy);
  }));

  describe('when loading search campaign onboarding statuses', () => {
    describe('when successful', () => {
      it('should return search campaign list',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          const searchCampaigns: SearchCampaign[] = mockSearchCampaigns;
          service.loadSearchCampaigns('customerId', {}).subscribe(
            response => {
              expect(response).toEqual(expectedSearchCampaignList);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/events');
          expect(mock.request.method).toEqual('GET');
          mock.flush(searchCampaigns, { headers: new HttpHeaders({ 'X-Total-Count': '2' }) });
        }))
      );
    });
    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {

          service.loadSearchCampaigns('customerId', {}).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/events');
          expect(mock.request.method).toEqual('GET');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

  describe('when uploading search campaign', () => {
    describe('when successful', () => {
      it('should return search campaign success',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const uploadFile = new File([], '');
          service.uploadSearchCampaigns('customerId', 'userName', 'password', uploadFile).subscribe(
            response => {
              expect(response).toEqual({});
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/search/campaigns');
          expect(mock.request.method).toEqual('POST');
        }))
      );
    });
    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const uploadFile = new File([], '');
          service.uploadSearchCampaigns('customerId', 'userName', 'password', uploadFile).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'customers/customerId/search/campaigns');
          expect(mock.request.method).toEqual('POST');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });
});
