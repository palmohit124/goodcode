import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {cold, hot} from 'jasmine-marbles';
import {SearchAccountEffects} from './search-account.effects';
import {searchAccountActions} from '../actions';
import {SearchAccountService} from '../services/search-account/search-account.service';
import {ToastService} from '../../core/services/toastr/toast.service';
import {ToastrModule} from 'ngx-toastr';
import {EmptySearchAccountList, SearchAccount, SearchAccountList} from '../../models/search-account';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import SpyObj = jasmine.SpyObj;


const mockSearchAccounts: SearchAccountList = {
  'accounts': [
    {
      source: 'bing',
      sourceId: 32,
      name: 'account 1',
      number: 'number 1',
      integrationId: 12,
      linked: true,
      href: 'account/32'
    },
    {
      source: 'google',
      sourceId: 51,
      name: 'account 2',
      integrationId: 12,
      linked: true,
      href: 'account/51'
    }
  ],
  'total_items': 2,
};


describe('Search Account Effects', () => {

  let effects: SearchAccountEffects;
  let actions: Observable<any>;
  let searchAccountService: SpyObj<SearchAccountService>;

  beforeEach(() => {
    searchAccountService = jasmine.createSpyObj('SearchAccountService', ['loadSearchAccounts', 'loadUnlinkedSearchAccounts', 'unlinkSearchAccount', 'linkSearchAccount']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ToastrModule.forRoot()
      ],
      providers: [
        SearchAccountEffects,
        provideMockActions(() => actions),
        { provide: SearchAccountService, useValue: searchAccountService },
        ToastService,
      ],
    });

    effects = TestBed.get(SearchAccountEffects);
  });

  describe('when a LOAD_LINKED action is observed', () => {
    describe('and the search account service responds with the search account list', () => {
      it('should dispatch a load succeeded action with the search accounts', () => {
        const searchAccounts: SearchAccountList = mockSearchAccounts;
        searchAccountService.loadSearchAccounts.and.returnValue(Observable.of(searchAccounts));
        actions = hot('a', { a: new searchAccountActions.LoadLinked('', {}) });
        const expected = cold('a', { a: new searchAccountActions.LoadSuccess(searchAccounts) });
        expect(effects.loadSearchAccounts$).toBeObservable(expected);
      });
    });

    describe('when no search account state is currently stored', () => {
      it('should dispatch a load succeeded action with the empty search account list', () => {
        searchAccountService.loadSearchAccounts.and.returnValue(Observable.of(EmptySearchAccountList));
        actions = hot('a', { a: new searchAccountActions.LoadLinked('', {}) });
        const expected = cold('a', { a: new searchAccountActions.LoadSuccess(EmptySearchAccountList) });
        expect(effects.loadSearchAccounts$).toBeObservable(expected);
      });
    });

    describe('when the service fails', () => {
      it('should emit a load failed Action', () => {
        searchAccountService.loadSearchAccounts.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new searchAccountActions.LoadLinked('', {}) });
        const expected = cold('a', { a: new searchAccountActions.LoadFail('An error') });
        expect(effects.loadSearchAccounts$).toBeObservable(expected);
      });
    });
  });

  describe('when a LOAD_UNLINKED action is observed', () => {
    describe('and the search account service responds with the search account list', () => {
      it('should dispatch a load succeeded action with the search accounts', () => {
        const searchAccounts: SearchAccountList = mockSearchAccounts;
        searchAccountService.loadUnlinkedSearchAccounts.and.returnValue(Observable.of(searchAccounts));
        actions = hot('a', { a: new searchAccountActions.LoadUnlinked('', '', {}) });
        const expected = cold('a', { a: new searchAccountActions.LoadSuccess(searchAccounts) });
        expect(effects.loadUnlinkedSearchAccounts$).toBeObservable(expected);
      });
    });

    describe('when no search account state is currently stored', () => {
      it('should dispatch a load succeeded action with the empty search account list', () => {
        searchAccountService.loadUnlinkedSearchAccounts.and.returnValue(Observable.of(EmptySearchAccountList));
        actions = hot('a', { a: new searchAccountActions.LoadUnlinked('', '', {}) });
        const expected = cold('a', { a: new searchAccountActions.LoadSuccess(EmptySearchAccountList) });
        expect(effects.loadUnlinkedSearchAccounts$).toBeObservable(expected);
      });
    });

    describe('when the service fails', () => {
      it('should emit a load failed Action', () => {
        searchAccountService.loadUnlinkedSearchAccounts.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new searchAccountActions.LoadUnlinked('', '', {}) });
        const expected = cold('a', { a: new searchAccountActions.LoadFail('An error') });
        expect(effects.loadUnlinkedSearchAccounts$).toBeObservable(expected);
      });
    });
  });

  describe('when a UNLINK action is observed', () => {
    describe('and the search account service responds success', () => {
      it('should dispatch a add success action', () => {
        const searchAcccount: SearchAccount = mockSearchAccounts.accounts[0];
        searchAccountService.unlinkSearchAccount.and.returnValue(Observable.of(searchAcccount));
        actions = hot('a', { a: new searchAccountActions.Unlink('') });
        const expected = cold('a', { a: new searchAccountActions.UnlinkSuccess() });
        expect(effects.unlinkSearchAccounts$).toBeObservable(expected);
      });

      describe('and when a unlink success action is dispached', () => {
        it('should dispatch a action reset unlink search account status', () => {
          actions = hot('a', { a: new searchAccountActions.UnlinkSuccess() });
          const expected = cold('a', { a: new searchAccountActions.ResetSearchAccountActionStatus() });
          expect(effects.unlinkSearchAccountsSuccess$).toBeObservable(expected);
        });
      });
    });

    describe('when the service fails', () => {
      it('should emit a add failed Action', () => {
        const searchAcccount: SearchAccount = mockSearchAccounts.accounts[0];
        searchAccountService.unlinkSearchAccount.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new searchAccountActions.Unlink('') });
        const expected = cold('a', { a: new searchAccountActions.UnlinkFail('An error') });
        expect(effects.unlinkSearchAccounts$).toBeObservable(expected);
      });
    });
  });

  describe('when a LINK action is observed', () => {
    describe('and the search account service responds success', () => {
      it('should dispatch a add success action', () => {
        const searchAcccount: SearchAccount = mockSearchAccounts.accounts[0];
        searchAccountService.linkSearchAccount.and.returnValue(Observable.of(searchAcccount));
        actions = hot('a', { a: new searchAccountActions.Link({}, '') });
        const expected = cold('a', { a: new searchAccountActions.LinkSuccess() });
        expect(effects.linkSearchAccounts$).toBeObservable(expected);
      });

      describe('and when a unlink success action is dispached', () => {
        it('should dispatch a action reset link search account status', () => {
          actions = hot('a', { a: new searchAccountActions.LinkSuccess() });
          const expected = cold('a', { a: new searchAccountActions.ResetSearchAccountActionStatus() });
          expect(effects.linkSearchAccountsSuccess$).toBeObservable(expected);
        });
      });
    });

    describe('when the service fails', () => {
      it('should emit a add failed Action', () => {
        searchAccountService.linkSearchAccount.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new searchAccountActions.Link({}, '') });
        const expected = cold('a', { a: new searchAccountActions.LinkFail('An error') });
        expect(effects.linkSearchAccounts$).toBeObservable(expected);
      });
    });
  });

});
