import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatPaginatorModule } from '@angular/material';
import { Store, StoreModule, combineReducers } from '@ngrx/store';

import { reducers } from '../../../reducers';
import * as fromRoot from '../../../../core/reducers';
import { searchCampaigActions } from '../../../actions';
import { ClientConfigService } from '../../../../core/services/client-config/client-config.service';
import { SearchCampaign } from '../../../../models/search-campaign';

import { OnboardStatusComponent } from './onboard-status.component';
import {AuthStateLoadSucceeded} from '../../../../core/actions/auth.actions';
import {AuthState} from '../../../../models/user-tokens';

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

describe('OnboardStatusComponent', () => {
  let component: OnboardStatusComponent;
  let fixture: ComponentFixture<OnboardStatusComponent>;
  let store: Store<any>;

  let clientConfigServiceStub;

  beforeEach(async(() => {
    clientConfigServiceStub = jasmine.createSpyObj('ClientConfigService', ['get']);

    TestBed.configureTestingModule({
      declarations: [OnboardStatusComponent],
      imports: [
        MatPaginatorModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'searchAnalytics': combineReducers(reducers)
        })
      ],
      providers: [
        { provide: ClientConfigService, useValue: clientConfigServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(OnboardStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create OnboardStatusComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('when a search campaigns load is successful', () => {
    beforeEach(() => { store.dispatch(new searchCampaigActions.LoadSearchCampaignsSuccess(mockSearchCampaigns)); });
    it('should get search campaigns', () => {
      component.searchCampaignState$.subscribe(p => {
        expect(p.searchCampaigns).toEqual(mockSearchCampaigns[0]);
        expect(p.searchCampaignCount).toEqual(mockSearchCampaigns[1]);
      });
    });
  });

  describe('when getting a download url', () => {
    const token = 'token';
    const initialState: AuthState = {
      userTokens: {
        token_type: '',
        access_token: token,
        expires_in: -1,
        refresh_token: ''
      },
      expiresAt: 123,
      role: 'staff',
      authAction: true,
      loadingRefreshToken: false
    };
    beforeEach(() => { store.dispatch(new AuthStateLoadSucceeded(initialState)); });
    it('should return the right thing', () => {
      const baseUrl = 'base';
      const baseApiUrl = { baseApiUrl: baseUrl };
      const fakeUri = 'customers/5/spreadsheet.csv';

      clientConfigServiceStub.get.and.returnValue(baseApiUrl);
      const finalUrl = component.getDownloadUrl(fakeUri);
      expect(finalUrl).toEqual(baseUrl + fakeUri + '?token=' + token);
    });
  });
});
