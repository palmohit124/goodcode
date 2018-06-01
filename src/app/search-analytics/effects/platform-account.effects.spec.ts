import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {cold, hot} from 'jasmine-marbles';
import {PlatformAccountEffects} from './platform-account.effects';
import {platformAccountActions} from '../actions';
import {PlatformAccountService} from '../services/platform-account/platform-account.service';
import {ToastService} from '../../core/services/toastr/toast.service';
import {ToastrModule} from 'ngx-toastr';
import * as platformAccount from '../../models/platform-account';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import SpyObj = jasmine.SpyObj;


const mockLinkedPlatformAccounts: platformAccount.LinkedPlatformAccounts = {
  'parent': {
    'platformId': '12F2504S1',
    'name': 'Account Name',
    'parentId': null,
    'href': '/account/admin?acc=12F2504S1'
  },
  'children': [
    {
      'platformId': '12F2504S1',
      'name': 'Account Name',
      'parentId': '13F2504E0',
      'href': '/account/admin?acc=12F2504S1'
    },
    {
      'platformId': '12F2504S1',
      'name': 'Account Name 1',
      'parentId': '13F2504E0',
      'href': '/account/admin?acc=12F2504S1'
    }
  ],
  'total_items': 2,
};

const mockUnlinkParentAccount: platformAccount.UnlinkedParentAccounts = {
  'parents': [
    {
      'platformId': '12F2504S1',
      'name': 'Account Name 1',
      'parentId': null,
      'href': '/account/admin?acc=12F2504S1'
    },
    {
      'platformId': '12F2504S1',
      'name': 'Account Name 2',
      'parentId': null,
      'href': '/account/admin?acc=12F2504S1'
    }
  ],
  'total_items': 2,
};

const mockUnlinkChildAccount: platformAccount.UnlinkedChildAccounts = {
  'children': [
    {
      'platformId': '12F2504S1',
      'name': 'Account Name',
      'parentId': '13F2504E0',
      'href': '/account/admin?acc=12F2504S1'
    },
    {
      'platformId': '12F2504S1',
      'name': 'Account Name 1',
      'parentId': '13F2504E0',
      'href': '/account/admin?acc=12F2504S1'
    }
  ],
  'total_items': 2,
};


describe('Search Account Effects', () => {

  let effects: PlatformAccountEffects;
  let actions: Observable<any>;
  let platformAccountService: SpyObj<PlatformAccountService>;

  beforeEach(() => {
    platformAccountService = jasmine.createSpyObj('SearchAccountService', ['loadLinkedPlatformAccounts', 'loadUnlinkedParentAccounts', 'linkParentAccount',
      'loadUnlinkedChildAccounts', 'linkChildAccount']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ToastrModule.forRoot()
      ],
      providers: [
        PlatformAccountEffects,
        provideMockActions(() => actions),
        { provide: PlatformAccountService, useValue: platformAccountService },
        ToastService,
      ],
    });

    effects = TestBed.get(PlatformAccountEffects);
  });

  describe('when a LOAD LINKED action is observed', () => {
    describe('and the platform account service responds with the linked platform account list', () => {
      it('should dispatch a load linke succeeded action with the linked platform accounts', () => {
        const linkedPlatformAccounts: platformAccount.LinkedPlatformAccounts = mockLinkedPlatformAccounts;
        platformAccountService.loadLinkedPlatformAccounts.and.returnValue(Observable.of(linkedPlatformAccounts));
        actions = hot('a', { a: new platformAccountActions.LoadLinked('', {}) });
        const expected = cold('a', { a: new platformAccountActions.LoadLinkedSuccess(linkedPlatformAccounts) });
        expect(effects.loadLinkedPlatformAccounts$).toBeObservable(expected);
      });
    });

    describe('when no linked platform account state is currently stored', () => {
      it('should dispatch a load succeeded action with the empty linked platform account list', () => {
        platformAccountService.loadLinkedPlatformAccounts.and.returnValue(Observable.of(platformAccount.EmptyLinkedPlatformAccounts));
        actions = hot('a', { a: new platformAccountActions.LoadLinked('', {}) });
        const expected = cold('a', { a: new platformAccountActions.LoadLinkedSuccess(platformAccount.EmptyLinkedPlatformAccounts) });
        expect(effects.loadLinkedPlatformAccounts$).toBeObservable(expected);
      });
    });

    describe('when the service fails', () => {
      it('should emit a load failed Action', () => {
        platformAccountService.loadLinkedPlatformAccounts.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new platformAccountActions.LoadLinked('', {}) });
        const expected = cold('a', { a: new platformAccountActions.LoadLinkedFail('An error') });
        expect(effects.loadLinkedPlatformAccounts$).toBeObservable(expected);
      });
    });
  });

  describe('when a LOAD UNLINKED PARENT action is observed', () => {
    describe('and the platform account service responds with the unlinked parent account list', () => {
      it('should dispatch a load unlink child succeeded action with the unlink parent accounts', () => {
        const unlinkParentAccounts: platformAccount.UnlinkedParentAccounts = mockUnlinkParentAccount;
        platformAccountService.loadUnlinkedParentAccounts.and.returnValue(Observable.of(unlinkParentAccounts));
        actions = hot('a', { a: new platformAccountActions.LoadUnlinkedParent('', {}) });
        const expected = cold('a', { a: new platformAccountActions.LoadUnlinkedParentSuccess(unlinkParentAccounts) });
        expect(effects.loadUnlinkedParentAccounts$).toBeObservable(expected);
      });
    });

    describe('when no platform account state is currently stored', () => {
      it('should dispatch a load unlink parent succeeded action with the empty unlink parent account list', () => {
        platformAccountService.loadUnlinkedParentAccounts.and.returnValue(Observable.of(platformAccount.EmptyUnlinkedParentAccounts));
        actions = hot('a', { a: new platformAccountActions.LoadUnlinkedParent('', {}) });
        const expected = cold('a', { a: new platformAccountActions.LoadUnlinkedParentSuccess(platformAccount.EmptyUnlinkedParentAccounts) });
        expect(effects.loadUnlinkedParentAccounts$).toBeObservable(expected);
      });
    });

    describe('when the service fails', () => {
      it('should emit a load unlink parent failed Action', () => {
        platformAccountService.loadUnlinkedParentAccounts.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new platformAccountActions.LoadUnlinkedParent('', {}) });
        const expected = cold('a', { a: new platformAccountActions.LoadUnlinkedParentFail('An error') });
        expect(effects.loadUnlinkedParentAccounts$).toBeObservable(expected);
      });
    });
  });

  describe('when a LINK PARENT action is observed', () => {
    describe('and the search account service responds success', () => {
      it('should dispatch a add success action', () => {
        platformAccountService.linkParentAccount.and.returnValue(Observable.of({}));
        actions = hot('a', { a: new platformAccountActions.LinkParent('', '') });
        const expected = cold('a', { a: new platformAccountActions.LinkParentSuccess() });
        expect(effects.linkParentAccounts$).toBeObservable(expected);
      });

      describe('and when a link parent account success action is dispached', () => {
        it('should dispatch a action reset platform account action status', () => {
          actions = hot('a', { a: new platformAccountActions.LinkParentSuccess() });
          const expected = cold('a', { a: new platformAccountActions.ResetPlatformAccountActionStatus() });
          expect(effects.linkParentAccountsSuccess$).toBeObservable(expected);
        });
      });
    });

    describe('when the service fails', () => {
      it('should emit a link parent account failed Action', () => {
        platformAccountService.linkParentAccount.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new platformAccountActions.LinkParent('', '') });
        const expected = cold('a', { a: new platformAccountActions.LinkParentFail('An error') });
        expect(effects.linkParentAccounts$).toBeObservable(expected);
      });
    });
  });

  describe('when a LOAD UNLINKED CHILD action is observed', () => {
    describe('and the platform account service responds with the unlinked child account list', () => {
      it('should dispatch a load unlink child succeeded action with the unlink child accounts', () => {
        const unlinkChildAccounts: platformAccount.UnlinkedChildAccounts = mockUnlinkChildAccount;
        platformAccountService.loadUnlinkedChildAccounts.and.returnValue(Observable.of(unlinkChildAccounts));
        actions = hot('a', { a: new platformAccountActions.LoadUnlinkedChild('', '', {}) });
        const expected = cold('a', { a: new platformAccountActions.LoadUnlinkedChildSuccess(unlinkChildAccounts) });
        expect(effects.loadUnlinkedChildAccounts$).toBeObservable(expected);
      });
    });

    describe('when no platform account state is currently stored', () => {
      it('should dispatch a load unlink child succeeded action with the empty unlink child account list', () => {
        platformAccountService.loadUnlinkedChildAccounts.and.returnValue(Observable.of(platformAccount.EmptyUnlinkedChildAccounts));
        actions = hot('a', { a: new platformAccountActions.LoadUnlinkedChild('', '', {}) });
        const expected = cold('a', { a: new platformAccountActions.LoadUnlinkedChildSuccess(platformAccount.EmptyUnlinkedChildAccounts) });
        expect(effects.loadUnlinkedChildAccounts$).toBeObservable(expected);
      });
    });

    describe('when the service fails', () => {
      it('should emit a load unlink child failed Action', () => {
        platformAccountService.loadUnlinkedChildAccounts.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new platformAccountActions.LoadUnlinkedChild('', '', {}) });
        const expected = cold('a', { a: new platformAccountActions.LoadUnlinkedChildFail('An error') });
        expect(effects.loadUnlinkedChildAccounts$).toBeObservable(expected);
      });
    });
  });

  describe('when a LINK CHILD action is observed', () => {
    describe('and the search account service responds success', () => {
      it('should dispatch a add success action', () => {
        platformAccountService.linkChildAccount.and.returnValue(Observable.of({}));
        actions = hot('a', { a: new platformAccountActions.LinkChild('', '') });
        const expected = cold('a', { a: new platformAccountActions.LinkChildSuccess() });
        expect(effects.linkChildAccounts$).toBeObservable(expected);
      });

      describe('and when a link child account success action is dispached', () => {
        it('should dispatch a action reset platform account action status', () => {
          actions = hot('a', { a: new platformAccountActions.LinkChildSuccess() });
          const expected = cold('a', { a: new platformAccountActions.ResetPlatformAccountActionStatus() });
          expect(effects.linkChildAccountsSuccess$).toBeObservable(expected);
        });
      });
    });

    describe('when the service fails', () => {
      it('should emit a link child account failed Action', () => {
        platformAccountService.linkChildAccount.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new platformAccountActions.LinkChild('', '') });
        const expected = cold('a', { a: new platformAccountActions.LinkChildFail('An error') });
        expect(effects.linkChildAccounts$).toBeObservable(expected);
      });
    });
  });

});
