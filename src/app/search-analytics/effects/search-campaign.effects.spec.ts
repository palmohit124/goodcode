import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {cold, hot} from 'jasmine-marbles';
import {SearchCampaignEffects} from './search-campaign.effects';
import {searchCampaigActions} from '../actions';
import {SearchCampaignService} from '../services/search-campaign/search-campaign.service';
import {ToastService} from '../../core/services/toastr/toast.service';
import {ToastrModule} from 'ngx-toastr';
import {SearchCampaign} from '../../models/search-campaign';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import SpyObj = jasmine.SpyObj;

const mockSearchCampaigns: [SearchCampaign[], number] = [
  [
    {
      id: '67GH424F2',
      status: 'Completed',
      submittedFileName: 'test.csv',
      submittedFileUrl: 'customers/search/campaigns/download',
      submitTime: '2017-08-08 03:00:00',
      submittedBy: 'abc@def.com',
      completedTime: '2017-08-08 03:00:00',
      totalRowCount: 2,
      successRowCount: 2,
      errorFileUrl: null
    },
    {
      id: '89FR424K9',
      status: 'Completed With Errors',
      submittedFileName: 'test.csv',
      submittedFileUrl: 'customers/search/campaigns/download',
      submitTime: '2017-08-08 03:00:00',
      submittedBy: 'abc@def.com',
      completedTime: '2017-08-08 03:00:00',
      totalRowCount: 2,
      successRowCount: 1,
      errorFileUrl: 'customers/search/campaigns/download'
    }
  ],
  2
];


describe('Search Campaign Effects', () => {

  let effects: SearchCampaignEffects;
  let actions: Observable<any>;
  let searchCampaignService: SpyObj<SearchCampaignService>;

  beforeEach(() => {
    searchCampaignService = jasmine.createSpyObj('SearchCampaignService', ['loadSearchCampaigns', 'uploadSearchCampaigns']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ToastrModule.forRoot()
      ],
      providers: [
        SearchCampaignEffects,
        provideMockActions(() => actions),
        { provide: SearchCampaignService, useValue: searchCampaignService },
        ToastService,
      ],
    });

    effects = TestBed.get(SearchCampaignEffects);
  });

  describe('when a LOAD search campaign action is observed', () => {
    describe('and the search campaign service responds with the search campaign list', () => {
      it('should dispatch a load succeeded action with the search campaigns', () => {
        const searchCampaigns = mockSearchCampaigns;
        searchCampaignService.loadSearchCampaigns.and.returnValue(Observable.of(searchCampaigns));
        actions = hot('a', { a: new searchCampaigActions.LoadSearchCampaigns('', {}) });
        const expected = cold('a', { a: new searchCampaigActions.LoadSearchCampaignsSuccess(searchCampaigns) });
        expect(effects.loadSearchCampaigns$).toBeObservable(expected);
      });
    });

    describe('when no search campaign state is currently stored', () => {
      it('should dispatch a load succeeded action with the empty search campaign list', () => {
        searchCampaignService.loadSearchCampaigns.and.returnValue(Observable.of([[], 0]));
        actions = hot('a', { a: new searchCampaigActions.LoadSearchCampaigns('', {} )});
        const expected = cold('a', { a: new searchCampaigActions.LoadSearchCampaignsSuccess([[], 0]) });
        expect(effects.loadSearchCampaigns$).toBeObservable(expected);
      });
    });

    describe('when the service fails', () => {
      it('should emit a load failed Action', () => {
        searchCampaignService.loadSearchCampaigns.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new searchCampaigActions.LoadSearchCampaigns('', {}) });
        const expected = cold('a', { a: new searchCampaigActions.LoadSearchCampaignsFail('An error') });
        expect(effects.loadSearchCampaigns$).toBeObservable(expected);
      });
    });
  });

  describe('when a UPLOAD search campaign action is observed', () => {
    describe('and the search campaign service responds with the success', () => {
      const uploadFile = new File([], '');
      it('should dispatch a upload succeeded action with the search campaigns', () => {
        searchCampaignService.uploadSearchCampaigns.and.returnValue(Observable.of({}));
        actions = hot('a', { a: new searchCampaigActions.UploadSearchCampaigns('', '', '', uploadFile) });
        const expected = cold('a', { a: new searchCampaigActions.UploadSearchCampaignsSuccess() });
        expect(effects.uploadSearchCampaigns$).toBeObservable(expected);
      });
    });

  });

});
