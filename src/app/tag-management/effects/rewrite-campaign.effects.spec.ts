import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {cold, hot} from 'jasmine-marbles';
import {Router, RouterModule} from '@angular/router';
import {RewriteCampaignEffects} from './rewrite-campaign.effects';
import {RewriteCampaignService} from '../services/rewrite-campaign/rewrite-campaign.service';
import {rewriteCampaignActions} from '../actions';
import {ToastService} from '../../core/services/toastr/toast.service';
import {ToastrModule} from 'ngx-toastr';
import {RewriteCampaignList} from '../../models/rewrite-campaign';
import {StoreModule} from '@ngrx/store';
import {reducers} from '../reducers';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import SpyObj = jasmine.SpyObj;


const mockRewriteCampaignList: RewriteCampaignList = {
  'campaigns': [
    {
      'campaignId': '67GH424F2',
      'accountId': '34H4726U3',
      'campaignName': 'campaign 2',
      'status': 'active',
      'description': 'description for campaign 2',
      'kwlt': false,
      'ctn': []
    }
  ]
};


describe('Rewrite Campaign Effects', () => {

  let effects: RewriteCampaignEffects;
  let actions: Observable<any>;
  let rewriteCampaignService: SpyObj<RewriteCampaignService>;

  const router = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    rewriteCampaignService = jasmine.createSpyObj('RewriteCampaignService', ['loadCampaigns', 'loadCampaignWithCtn']);

    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        ToastrModule.forRoot(),
        NoopAnimationsModule,
        StoreModule.forRoot(reducers)
      ],
      providers: [
        RewriteCampaignEffects,
        provideMockActions(() => actions),
        { provide: RewriteCampaignService, useValue: rewriteCampaignService },
        { provide: Router, useValue: router },
        ToastService,
      ],
    });

    effects = TestBed.get(RewriteCampaignEffects);
  });

  describe('when a LOAD action is observed', () => {
    describe('and the rewriteCampaignService service responds with the campaigns', () => {
      it('should dispatch a load succeeded action with the campaigns', () => {
        const campaigns: RewriteCampaignList = mockRewriteCampaignList;
        rewriteCampaignService.loadCampaigns.and.returnValue(Observable.of(campaigns));
        actions = hot('a', { a: new rewriteCampaignActions.Load('') });
        const expected = cold('a', { a: new rewriteCampaignActions.LoadSuccess(campaigns) });
        expect(effects.loadRewriteCampaigns$).toBeObservable(expected);
      });
    });


    describe('when the service fails', () => {
      it('should emit a load failed Action', () => {
        rewriteCampaignService.loadCampaigns.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new rewriteCampaignActions.Load('') });
        const expected = cold('a', { a: new rewriteCampaignActions.LoadFail('An error') });
        expect(effects.loadRewriteCampaigns$).toBeObservable(expected);
      });
    });
  });

});
