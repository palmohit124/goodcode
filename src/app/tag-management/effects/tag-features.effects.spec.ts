import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {cold, hot} from 'jasmine-marbles';
import {Router, RouterModule} from '@angular/router';
import {TagFeaturesEffects} from './tag-features.effects';
import {tagFeaturesActions} from '../actions';
import {TagFeaturesService} from '../services/tag-features/tag-features.service';
import {ToastService} from '../../core/services/toastr/toast.service';
import {ToastrModule} from 'ngx-toastr';
import {TagFeatures} from '../../models/tag-features';
import {StoreModule} from '@ngrx/store';
import {reducers} from '../reducers';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import SpyObj = jasmine.SpyObj;


const mockTagFeatures: TagFeatures[] = [{

  'featureId': 1,
  'name': 'Cookie Sync',
  'enabled': true,
  'description': 'This is cookie sync',
  'providers': [
    {
      'providerId': 100,
      'name': 'Google',
      'enabled': false
    },
    {
      'providerId': 101,
      'name': 'Quantcast',
      'enabled': false
    },
    {
      'providerId': 102,
      'name': 'Adobe',
      'enabled': false
    }
  ]


}];


describe('Tagfeatures Effects', () => {

  let effects: TagFeaturesEffects;
  let actions: Observable<any>;
  let tagFeaturesService: SpyObj<TagFeaturesService>;

  const router = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    tagFeaturesService = jasmine.createSpyObj('tagFeaturesService', ['loadTagFeatures', 'toggleTagFeatures', 'toggleTagProviders']);

    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        NoopAnimationsModule,
        ToastrModule.forRoot(),
        StoreModule.forRoot(reducers)
      ],
      providers: [
        TagFeaturesEffects,
        provideMockActions(() => actions),
        { provide: TagFeaturesService, useValue: tagFeaturesService },
        { provide: Router, useValue: router },
        ToastService,
      ],
    });

    effects = TestBed.get(TagFeaturesEffects);
  });

  describe('when a LOAD action is observed', () => {
    describe('and the tagFeatures service responds with the tagFeatures list', () => {
      it('should dispatch a load succeeded action with the TagFeatures', () => {
        const tagFeatures: TagFeatures[] = mockTagFeatures;
        tagFeaturesService.loadTagFeatures.and.returnValue(Observable.of(tagFeatures));
        actions = hot('a', { a: new tagFeaturesActions.Load({}) });
        const expected = cold('a', { a: new tagFeaturesActions.LoadSuccess(tagFeatures)});
        expect(effects.loadTagFeatures$).toBeObservable(expected);
      });
    });


    describe('when the service fails', () => {
      it('should emit a load failed Action', () => {
        tagFeaturesService.loadTagFeatures.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new tagFeaturesActions.Load({}) });
        const expected = cold('a', { a: new tagFeaturesActions.LoadFail('An error') });
        expect(effects.loadTagFeatures$).toBeObservable(expected);
      });
    });
  });
  describe('when a ToggleFeatures action is observed', () => {
    describe('and the tagFeatures service responds success', () => {
      it('should dispatch a toggle success', () => {
        tagFeaturesService.toggleTagFeatures.and.returnValue(Observable.of({}));
        actions = hot('a', { a: new tagFeaturesActions.ToggleFeatures({}) });
        const expected = cold('a', { a: new tagFeaturesActions.ToggleFeaturesSuccess() });
        expect(effects.toggleTagFeatures$).toBeObservable(expected);
      });
    });

    describe('when the service fails', () => {
      it('should emit a toggle failed action', () => {
        tagFeaturesService.toggleTagFeatures.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new tagFeaturesActions.ToggleFeatures({}) });
        const expected = cold('a', { a: new tagFeaturesActions.ToggleFeaturesFail('An error') });
        expect(effects.toggleTagFeatures$).toBeObservable(expected);
      });
    });
  });

  describe('when a ToggleProviders action is observed', () => {
    describe('and the tagFeatures service responds success', () => {
      it('should dispatch a toggle success', () => {
        tagFeaturesService.toggleTagProviders.and.returnValue(Observable.of({}));
        actions = hot('a', { a: new tagFeaturesActions.ToggleProviders({}) });
        const expected = cold('a', { a: new tagFeaturesActions.ToggleProvidersSuccess() });
        expect(effects.toggleTagProviders$).toBeObservable(expected);
      });
    });

    describe('when the service fails', () => {
      it('should emit a ToggleProviders failed action', () => {
        tagFeaturesService.toggleTagProviders.and.returnValue(Observable.throw('An error'));
        actions = hot('a', { a: new tagFeaturesActions.ToggleProviders({}) });
        const expected = cold('a', { a: new tagFeaturesActions.ToggleProvidersFail('An error') });
        expect(effects.toggleTagProviders$).toBeObservable(expected);
      });
    });
  });


});








