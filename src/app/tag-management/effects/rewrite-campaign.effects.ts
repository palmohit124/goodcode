import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { RewriteCampaignService } from '../services/rewrite-campaign/rewrite-campaign.service';
import { rewriteCampaignActions } from '../actions';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class RewriteCampaignEffects {

  constructor(private actions$: Actions,
    private rewriteCampaignService: RewriteCampaignService
  ) {
  }

  @Effect()
  loadRewriteCampaigns$ =
  this.actions$
    .pipe(
      ofType(rewriteCampaignActions.LOAD),
      switchMap((c: rewriteCampaignActions.Load) =>
        this.rewriteCampaignService
          .loadCampaigns(c.accountId)
            .pipe(
              map(result => new rewriteCampaignActions.LoadSuccess(result)),
              catchError(error => Observable.of(new rewriteCampaignActions.LoadFail(error))),
            )
      )
    );
}
