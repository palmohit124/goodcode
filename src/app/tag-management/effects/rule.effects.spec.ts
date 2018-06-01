import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {cold, hot} from 'jasmine-marbles';
import {Router, RouterModule} from '@angular/router';
import {RuleEffects} from './rule.effects';
import {RuleAttributeService} from '../services/rule-attribute/rule-attribute.service';
import {ruleActions} from '../actions';
import {ToastService} from '../../core/services/toastr/toast.service';
import {ToastrModule} from 'ngx-toastr';
import {CreateRuleAttributes} from '../../models/rule-set';
import {StoreModule} from '@ngrx/store';
import {reducers} from '../reducers';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import SpyObj = jasmine.SpyObj;


const mockRuleList: CreateRuleAttributes = {
  'parentId': 1394798,
  'refdom': { 'domain': 'afour', 'sources': ['afourtest'] },
  'condition': { 'source': 'cookie', 'searchParameters': 'afour' },
  'lookup': { 'lookupName': 'afourtest' },
  'rewrite': { 'value': '7878787878', 'ctn': 758997967 }
};



describe('Rule Effects', () => {

  let effects: RuleEffects;
  let actions: Observable<any>;
  let ruleAttributeService: SpyObj<RuleAttributeService>;

  const router = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    ruleAttributeService = jasmine.createSpyObj('RuleAttributeService', ['loadRuleDetails', 'deleteAttribute', 'addRuleset', 'editRulesetAttribute']);

    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        NoopAnimationsModule,
        ToastrModule.forRoot(),
        StoreModule.forRoot(reducers)
      ],
      providers: [
        RuleEffects,
        provideMockActions(() => actions),
        { provide: RuleAttributeService, useValue: ruleAttributeService },
        { provide: Router, useValue: router },
        ToastService,
      ],
    });

    effects = TestBed.get(RuleEffects);
  });

  describe('when a LOAD action is observed', () => {
    describe('and the rule service responds with the ruleset', () => {
      it('should dispatch a load succeeded action with the ruleset', () => {
        const ruleset: CreateRuleAttributes = mockRuleList;
        ruleAttributeService.loadRuleDetails.and.returnValue(Observable.of(ruleset));
        actions = hot('a', { a: new ruleActions.Load({}) });
        const expected = cold('a', { a: new ruleActions.LoadSuccess(ruleset) });
        expect(effects.loadRuleDetails$).toBeObservable(expected);
      });
    });


    describe('when the service fails', () => {
      it('should emit a load failed Action', () => {
        ruleAttributeService.loadRuleDetails.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new ruleActions.Load({}) });
        const expected = cold('a', { a: new ruleActions.LoadFail('An error') });
        expect(effects.loadRuleDetails$).toBeObservable(expected);
      });
    });
  });

  describe('when a ADD action is observed', () => {
    describe('and the rule service responds success', () => {
      it('should dispatch a add success action', () => {
        const ruleset: CreateRuleAttributes = mockRuleList;
        ruleAttributeService.addRuleset.and.returnValue(Observable.of(ruleset));
        actions = hot('a', { a: new ruleActions.AddRuleAttributes({}) });
        const expected = cold('a', { a: new ruleActions.AddRuleAttributesSuccess(ruleset) });
        expect(effects.addRuleset$).toBeObservable(expected);
      });

      describe('and when a add success action is dispached', () => {
        it('should dispatch a action reset customer creation status', () => {
          const ruleset: CreateRuleAttributes = mockRuleList;
          actions = hot('a', { a: new ruleActions.AddRuleAttributesSuccess(ruleset) });
          const expected = cold('a', { a: new ruleActions.ResetRulesetActionStatus() });
          expect(effects.addRulesetSuccess$).toBeObservable(expected);
        });
      });
    });

    describe('when the service fails', () => {
      it('should emit a add failed Action', () => {
        const ruleset: CreateRuleAttributes = mockRuleList;
        ruleAttributeService.addRuleset.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new ruleActions.AddRuleAttributes({}) });
        const expected = cold('a', { a: new ruleActions.AddRuleAttributesFail('An error') });
        expect(effects.addRuleset$).toBeObservable(expected);
      });
    });
  });
  describe('when a EDIT action is observed', () => {
    describe('and the rule service responds success', () => {
      it('should dispatch a edit success', () => {
        const ruleset: CreateRuleAttributes = mockRuleList;
        ruleAttributeService.editRulesetAttribute.and.returnValue(Observable.of(ruleset));
        actions = hot('a', { a: new ruleActions.EditRuleAttribute('0', '', {}) });
        const expected = cold('a', { a: new ruleActions.EditRuleAttributeSuccess(ruleset) });
        expect(effects.editRulesetAttribute$).toBeObservable(expected);
      });
    });

    describe('when the service fails', () => {
      it('should emit a edit failed action', () => {
        ruleAttributeService.editRulesetAttribute.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new ruleActions.EditRuleAttribute('0', '', {}) });
        const expected = cold('a', { a: new ruleActions.EditRuleAttributeFail('An error') });
        expect(effects.editRulesetAttribute$).toBeObservable(expected);
      });
    });
  });
  describe('when a DELETE action is observed', () => {
    describe('and the rule service responds success', () => {
      it('should dispatch a delete success', () => {
        const ruleset: CreateRuleAttributes = mockRuleList;
        ruleAttributeService.deleteAttribute.and.returnValue(Observable.of(ruleset));
        actions = hot('a', { a: new ruleActions.DeleteRuleAttribute({}) });
        const expected = cold('a', { a: new ruleActions.DeleteRuleAttributeSuccess() });
        expect(effects.deleteAttribute$).toBeObservable(expected);
      });
    });

    describe('when the service fails', () => {
      it('should emit a delete failed action', () => {
        ruleAttributeService.deleteAttribute.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new ruleActions.DeleteRuleAttribute({}) });
        const expected = cold('a', { a: new ruleActions.DeleteRuleAttributeFail('An error') });
        expect(effects.deleteAttribute$).toBeObservable(expected);
      });
    });
  });

});


