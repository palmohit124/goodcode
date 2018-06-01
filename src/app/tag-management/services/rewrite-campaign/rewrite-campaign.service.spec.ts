import { async, TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RewriteCampaignService } from './rewrite-campaign.service';
import { ClientState, reducers } from '../../../core/reducers';
import { ClientConfigService } from '../../../core/services/client-config/client-config.service';
import { NoOpLogger } from '../../../core/services/logger/no-op-logger';
import { RewriteCampaign, RewriteCampaignList } from '../../../models/rewrite-campaign';

const MockCampaigntList: RewriteCampaignList = {
  'campaigns': [
    {
      campaignId: '56HH424O0',
      campaignName: 'Campaign 1',
      accountId: '34H4726U3',
      status: '1',
      description: 'Campaign 1',
      kwlt: true,
      ctn: []
    }
  ]
};

const MockRewriteCampaign: RewriteCampaign = {
  campaignId: '56HH424O0',
  campaignName: 'Campaign 1',
  accountId: '34H4726U3',
  status: '1',
  description: 'Campaign 1',
  kwlt: true,
  ctn: []
};

describe('RewriteCampaignService', () => {
  let service: RewriteCampaignService;
  let configServiceSpy: jasmine.SpyObj<ClientConfigService>;
  const baseApiUrl = { baseApiUrl: '' };
  beforeEach(async(() => {
    configServiceSpy = jasmine.createSpyObj('ClientConfigService', ['get']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [RewriteCampaignService],
    });

    configServiceSpy.get.and.returnValue(baseApiUrl);
    const logger = new NoOpLogger();
    const http = TestBed.get(HttpClient);

    service = new RewriteCampaignService(http, logger, configServiceSpy);
  }));

  describe('when loading campaign list', () => {
    describe('when successful', () => {
      it('should return campaign list',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const campaignList: RewriteCampaignList = MockCampaigntList;
          const accountId = '34H4726U3';
          service.loadCampaigns(accountId).subscribe(
            response => {
              expect(response).toEqual(campaignList);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'campaigns/rewrite?accountid=34H4726U3');
          expect(mock.request.method).toEqual('GET');
          mock.flush(campaignList);
        }))
      );
    });

    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const accountId = '34H4726U3';
          service.loadCampaigns(accountId).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'campaigns/rewrite?accountid=34H4726U3');
          expect(mock.request.method).toEqual('GET');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });

  describe('when loading campaigns with ctn', () => {
    describe('when successful', () => {
      it('should return campaign list',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const rewriteCampaign: RewriteCampaign = MockRewriteCampaign;
          const campaignId = '56HH424O0';
          service.loadCampaignWithCtn(campaignId).subscribe(
            response => {
              expect(response).toEqual(rewriteCampaign);
            }, err => {
              fail(`this test should not fail: ${err}`);
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'campaigns/rewrite/56HH424O0?fields=ctn');
          expect(mock.request.method).toEqual('GET');
          mock.flush(rewriteCampaign);
        }))
      );
    });

    describe('when the resource is missing', () => {
      it('should respond with the failure',
        async(inject([HttpTestingController], (backend: HttpTestingController) => {
          const campaignId = '56HH424O0';
          service.loadCampaignWithCtn(campaignId).subscribe(
            response => {
              fail('Expected this to fail, but it did not.');
            }, err => {
              expect(err).toBeTruthy();
            },
          );
          const mock = backend.expectOne(baseApiUrl.baseApiUrl + 'campaigns/rewrite/56HH424O0?fields=ctn');
          expect(mock.request.method).toEqual('GET');
          mock.flush(null, { status: 404, statusText: 'Not Found' });
        })));
    });
  });
});
