import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {cold, hot} from 'jasmine-marbles';
import {SearchIntegrationEffects} from './search-integration.effects';
import {searchIntegrationActions} from '../actions';
import {OauthClientService} from '../services/oauth-client/oauth-client.service';
import {SearchIntegrationService} from '../services/search-integration/search-integration.service';
import {ToastService} from '../../core/services/toastr/toast.service';
import {ToastrModule} from 'ngx-toastr';
import {EmptySearchIntegrationList, SearchIntegration, SearchIntegrationList} from '../../models/search-integration';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import SpyObj = jasmine.SpyObj;

const mockSearchIntegrations: SearchIntegrationList = {
  integrations: [
    {
      id: 's2kUtasd',
      source: 12,
      name: 'google',
      href: 'integration/s2kUtasd'
    },
    {
      id: 'f2adaasF',
      source: 11,
      name: 'bing',
      href: 'integration/f2adaasF'
    }
  ],
  total_items: 2
};

describe('Search Integration Effects', () => {

  let effects: SearchIntegrationEffects;
  let actions: Observable<any>;
  let searchIntegrationService: SpyObj<SearchIntegrationService>;
  let oauthClientService: SpyObj<OauthClientService>;

  beforeEach(() => {
    searchIntegrationService = jasmine.createSpyObj('SearchIntegrationService', ['loadSearchIntegrations', 'getIntegrationAuthorizationUrl',
      'createSearchIntegrations', 'removeSearchIntegration']);

    oauthClientService = jasmine.createSpyObj('OauthClientService', ['grant']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ToastrModule.forRoot()
      ],
      providers: [
        SearchIntegrationEffects,
        provideMockActions(() => actions),
        { provide: SearchIntegrationService, useValue: searchIntegrationService },
        { provide: OauthClientService, useValue: oauthClientService },
        ToastService,
      ],
    });

    effects = TestBed.get(SearchIntegrationEffects);
  });

  describe('when a LOAD action is observed', () => {
    describe('and the search integration service responds with the search integration list', () => {
      it('should dispatch a load succeeded action with the search integrations', () => {
        const searchIntegrations: SearchIntegrationList = mockSearchIntegrations;
        searchIntegrationService.loadSearchIntegrations.and.returnValue(Observable.of(searchIntegrations));
        actions = hot('a', { a: new searchIntegrationActions.Load('', {}) });
        const expected = cold('a', { a: new searchIntegrationActions.LoadSuccess(searchIntegrations) });
        expect(effects.loadSearchIntegrations$).toBeObservable(expected);
      });
    });

    describe('when no search integration state is currently stored', () => {
      it('should dispatch a load succeeded action with the empty search integration list', () => {
        searchIntegrationService.loadSearchIntegrations.and.returnValue(Observable.of(EmptySearchIntegrationList));
        actions = hot('a', { a: new searchIntegrationActions.Load('', {}) });
        const expected = cold('a', { a: new searchIntegrationActions.LoadSuccess(EmptySearchIntegrationList) });
        expect(effects.loadSearchIntegrations$).toBeObservable(expected);
      });
    });

    describe('when the service fails', () => {
      it('should emit a load failed Action', () => {
        searchIntegrationService.loadSearchIntegrations.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new searchIntegrationActions.Load('', {}) });
        const expected = cold('a', { a: new searchIntegrationActions.LoadFail('An error') });
        expect(effects.loadSearchIntegrations$).toBeObservable(expected);
      });
    });
  });

  describe('when a REMOVE action is observed', () => {
    describe('and the search integration service responds success', () => {
      it('should dispatch a remove success action', () => {
        const searchIntegration: SearchIntegration = mockSearchIntegrations.integrations[0];
        searchIntegrationService.removeSearchIntegration.and.returnValue(Observable.of(searchIntegration));
        actions = hot('a', { a: new searchIntegrationActions.Remove('') });
        const expected = cold('a', { a: new searchIntegrationActions.RemoveSuccess() });
        expect(effects.removeSearchIntegration$).toBeObservable(expected);
      });

      describe('and when a remove success action is dispached', () => {
        it('should dispatch a action reset remove search integration status', () => {
          actions = hot('a', { a: new searchIntegrationActions.RemoveSuccess() });
          const expected = cold('a', { a: new searchIntegrationActions.ResetSearchIntegrationActionStatus() });
          expect(effects.removeSearchIntegrationSuccess$).toBeObservable(expected);
        });
      });
    });

    describe('when the service fails', () => {
      it('should emit a add failed Action', () => {
        searchIntegrationService.removeSearchIntegration.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new searchIntegrationActions.Remove('') });
        const expected = cold('a', { a: new searchIntegrationActions.RemoveFail('An error') });
        expect(effects.removeSearchIntegration$).toBeObservable(expected);
      });
    });
  });

  describe('when create action is obsrved', () => {
    describe('when the integration service successfully returns authUrl', () => {
      describe('when the oauth client service successfully grants an auth code', () => {
        describe('when the integration srevice successfully creates integration', () => {
          it('should emit a create success action', () => {
            searchIntegrationService.getIntegrationAuthorizationUrl.and.returnValue(Observable.of(''));
            oauthClientService.grant.and.returnValue(Observable.of(''));
            searchIntegrationService.createSearchIntegrations.and.returnValue(Observable.of(mockSearchIntegrations.integrations[0]));
            actions = hot('a', { a: new searchIntegrationActions.Create('', '', '') });
            const expected = cold('a', { a: new searchIntegrationActions.CreateSuccess()});
            expect(effects.createSearchIntegration$).toBeObservable(expected);

          });
        });

        describe('when the integration srevice fails to creates integration', () => {
          it('should emit a CreateFailed action', () => {
            searchIntegrationService.getIntegrationAuthorizationUrl.and.returnValue(Observable.of(''));
            oauthClientService.grant.and.returnValue(Observable.of(''));
            searchIntegrationService.createSearchIntegrations.and.returnValue(Observable.throw('An error'));
            actions = hot('a', { a: new searchIntegrationActions.Create('', '', '') });
            const expected = cold('a', { a: new searchIntegrationActions.CreateFail('An error')});
            expect(effects.createSearchIntegration$).toBeObservable(expected);
          });
        });
      });

      describe('when the oauth client service fails to grant an auth code', () => {
          it('should emit a CreateFailed action', () => {
            searchIntegrationService.getIntegrationAuthorizationUrl.and.returnValue(Observable.of(''));
            oauthClientService.grant.and.returnValue(Observable.throw('An error'));
            actions = hot('a', { a: new searchIntegrationActions.Create('', '', '') });
            const expected = cold('a', { a: new searchIntegrationActions.CreateFail('An error')});
            expect(effects.createSearchIntegration$).toBeObservable(expected);
          });
      });
    });

    describe('when the integration service fails to return authUrl', () => {
      it('should emit a CreateFailed action', () => {
        searchIntegrationService.getIntegrationAuthorizationUrl.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new searchIntegrationActions.Create('', '', '') });
        const expected = cold('a', { a: new searchIntegrationActions.CreateFail('An error')});
        expect(effects.createSearchIntegration$).toBeObservable(expected);
      });
    });
  });
});
