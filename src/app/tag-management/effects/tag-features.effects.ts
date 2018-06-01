import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { tagFeaturesActions } from '../actions';
import { TagFeaturesService } from '../services/tag-features/tag-features.service';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class TagFeaturesEffects {

  constructor(
    private actions$: Actions,
    private tagFeaturesService: TagFeaturesService
  ) { }

  @Effect()
  loadTagFeatures$ =
    this.actions$
      .pipe(
        ofType(tagFeaturesActions.LOAD),
        switchMap((c: tagFeaturesActions.Load) =>
          this.tagFeaturesService
            .loadTagFeatures(c.queryParam)
              .pipe(
                map((result: any) => new tagFeaturesActions.LoadSuccess(result)),
                catchError(error => Observable.of(new tagFeaturesActions.LoadFail(error))),
              )
        )
      );

  @Effect()
  toggleTagFeatures$ =
    this.actions$
      .pipe(
        ofType(tagFeaturesActions.TOGGLEFEATURES),
        switchMap((c: tagFeaturesActions.ToggleFeatures) =>
          this.tagFeaturesService
            .toggleTagFeatures(c.payload)
              .pipe(
                map(result => new tagFeaturesActions.ToggleFeaturesSuccess()),
                catchError(error => Observable.of(new tagFeaturesActions.ToggleFeaturesFail(error)))
              )
        )
      );

  @Effect()
  toggleTagProviders$ =
    this.actions$
    .pipe(
      ofType(tagFeaturesActions.TOGGLEPROVIDERS),
      switchMap((c: tagFeaturesActions.ToggleProviders) =>
        this.tagFeaturesService
          .toggleTagProviders(c.payload)
            .pipe(
              map(result => new tagFeaturesActions.ToggleProvidersSuccess()),
              catchError(error => Observable.of(new tagFeaturesActions.ToggleProvidersFail(error)))
            )
      )
    );
}
