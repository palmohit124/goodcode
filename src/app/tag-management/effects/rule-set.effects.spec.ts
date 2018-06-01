import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {cold, hot} from 'jasmine-marbles';
import {Router, RouterModule} from '@angular/router';
import {RulesetEffects} from './rule-set.effects';
import {RulesetService} from '../services/rule-set/rule-set.service';
import {rulesetActions} from '../actions';
import {ToastService} from '../../core/services/toastr/toast.service';
import {ToastrModule} from 'ngx-toastr';
import {Rule, RuleSet} from '../../models/rule-set';
import {combineReducers, StoreModule} from '@ngrx/store';
import {reducers} from '../reducers';
import * as fromRoot from '../../core/reducers';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import SpyObj = jasmine.SpyObj;


const mockRulesetList: RuleSet = {
  'rules': [
    {
      'graphId': 1,
      'name': 'RuleTest1',
      'campaignId': '123ABC'
    },
    {
      'graphId': 2,
      'name': 'RuleTest2',
      'campaignId': '456ABC'
    }
  ],
  'total_items': 10
};

const mockRulelistData: Rule = {
  'graphId': 3,
  'name': 'SelectedRule1',
  'campaignId': '789ABC'
};

describe('Rulesets Effects', () => {

  let effects: RulesetEffects;
  let actions: Observable<any>;
  let rulesetService: SpyObj<RulesetService>;

  const router = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    rulesetService = jasmine.createSpyObj('rulesetService', ['addRule', 'loadRulesetList', 'loadRule', 'deleteRule', 'saveRuleSession']);

    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        NoopAnimationsModule,
        ToastrModule.forRoot(),
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'tagManagement': combineReducers(reducers)
        })
      ],
      providers: [
        RulesetEffects,
        provideMockActions(() => actions),
        { provide: RulesetService, useValue: rulesetService },
        { provide: Router, useValue: router },
        ToastService,
      ],
    });

    effects = TestBed.get(RulesetEffects);
  });

  describe('when a LOAD action is observed', () => {
    describe('and the ruleset service responds with the ruleset list', () => {
      it('should dispatch a load succeeded action with the ruleset list', () => {
        const rulesetList: RuleSet = mockRulesetList;
        rulesetService.loadRulesetList.and.returnValue(Observable.of(rulesetList));
        actions = hot('a', { a: new rulesetActions.Load('', {}) });
        const expected = cold('a', { a: new rulesetActions.LoadSuccess(rulesetList) });
        expect(effects.loadRulesetList$).toBeObservable(expected);
      });
    });


    describe('when the service fails', () => {
      it('should emit a load failed Action', () => {
        rulesetService.loadRulesetList.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new rulesetActions.Load('', {}) });
        const expected = cold('a', { a: new rulesetActions.LoadFail('An error') });
        expect(effects.loadRulesetList$).toBeObservable(expected);
      });
    });
  });
  describe('when a ADD action is observed', () => {
    describe('and the ruleset service responds success', () => {
      it('should dispatch a add success action', () => {
        const ruleset: Rule = mockRulesetList.rules[0];
        rulesetService.addRule.and.returnValue(Observable.of(ruleset));
        actions = hot('a', { a: new rulesetActions.Add(ruleset) });
        const expected = cold('a', { a: new rulesetActions.AddSuccess(ruleset) });
        expect(effects.addRule$).toBeObservable(expected);
      });


      describe('and when a add success action is dispached', () => {
        it('should dispatch a action reset ruleset creation status', () => {
          const ruleset: Rule = mockRulesetList.rules[0];
          actions = hot('a', { a: new rulesetActions.AddSuccess(ruleset) });
          const expected = cold('a', { a: new rulesetActions.ResetRuleActionStatus() });
          expect(effects.addRuleSuccess$).toBeObservable(expected);
        });
      });
    });


    describe('when the service fails', () => {
      it('should emit a add failed Action', () => {
        const ruleset: Rule = mockRulesetList.rules[0];
        rulesetService.addRule.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new rulesetActions.Add({}) });
        const expected = cold('a', { a: new rulesetActions.AddFail('Some error occured') });
        expect(effects.addRule$).toBeObservable(expected);
      });
    });
  });

  describe('when a SELECT action is observed', () => {
    describe('and the ruleset service responds success', () => {
      it('should dispatch a select success', () => {
        rulesetService.saveRuleSession.and.returnValue(Observable.of({}));
        actions = hot('a', { a: new rulesetActions.Select(mockRulelistData) });
        const expected = cold('a', { a: new rulesetActions.SelectSuccess(mockRulelistData) });
        expect(effects.selectRule$).toBeObservable(expected);
      });
    });
  });
  describe('when a load ruleset init action is observed', () => {
    describe('and the ruleset is not loaded in state', () => {
      it('should dispatch a load', () => {
        actions = hot('a', { a: new rulesetActions.LoadInit() });
        const expected = cold('a', {
          a: new rulesetActions.Load(
            null,
            {
              offset: 0,
              limit: 10,
            })
        });
        expect(effects.loadRulesetsInit$).toBeObservable(expected);
      });
    });
  });

  describe('when a Delete rule action is observed', () => {
    describe('and the ruleset service responds success', () => {
      it('should dispatch a delete success', () => {
        const ruleset: Rule = mockRulesetList.rules[0];
        rulesetService.deleteRule.and.returnValue(Observable.of(ruleset));
        actions = hot('a', { a: new rulesetActions.Delete(ruleset.graphId) });
        const expected = cold('a', { a: new rulesetActions.DeleteSuccess() });
        expect(effects.deleteRule$).toBeObservable(expected);
      });
    });

    describe('when the service fails', () => {
      it('should emit a delete failed action', () => {
        const ruleset: Rule = mockRulesetList.rules[0];
        rulesetService.deleteRule.and.returnValue(Observable.throw(ruleset));
        actions = hot('a', { a: new rulesetActions.Delete('') });
        const expected = cold('a', { a: new rulesetActions.SelectSuccess(ruleset) });
        expect(effects.deleteRule$).toBeObservable(expected);
      });
    });
  });


});








