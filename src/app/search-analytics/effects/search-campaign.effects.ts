import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { SearchCampaignService } from '../services/search-campaign/search-campaign.service';
import { searchCampaigActions } from '../actions';
import { ToastService } from '../../core/services/toastr/toast.service';


@Injectable()
export class SearchCampaignEffects {
  private oAuthConfig;
  constructor(
    private actions$: Actions,
    private searchCampaignService: SearchCampaignService,
    private toastrService: ToastService) {
  }


  @Effect()
  loadSearchCampaigns$ =
    this.actions$
      .pipe(
        ofType(searchCampaigActions.LOAD_SEARCH_CAMPAIGNS),
        switchMap((s: searchCampaigActions.LoadSearchCampaigns) =>
          this.searchCampaignService
            .loadSearchCampaigns(s.id, s.queryParam)
            .pipe(
              map(searchCampaigns => new searchCampaigActions.LoadSearchCampaignsSuccess(searchCampaigns)),
              catchError(err => Observable.of(new searchCampaigActions.LoadSearchCampaignsFail(err))),
            )
        )
    );

  @Effect()
  uploadSearchCampaigns$ =
    this.actions$
      .pipe(
        ofType(searchCampaigActions.UPLOAD_SEARCH_CAMPAIGNS),
        switchMap((s: searchCampaigActions.UploadSearchCampaigns) =>
          this.searchCampaignService
            .uploadSearchCampaigns(s.id, s.userName, s.password, s.file)
            .pipe(
              map(() => new searchCampaigActions.UploadSearchCampaignsSuccess()),
              catchError(err => Observable.of(new searchCampaigActions.UploadSearchCampaignsFail(err)))
            )
        )
    );

  @Effect()
  uploadSearchCampaignsSuccess$ =
  this.actions$
    .pipe(
      ofType(searchCampaigActions.UPLOAD_SEARCH_CAMPAIGNS_SUCCESS),
      map(() => {
        this.toastrService.show('Search campaigns uploaded successfully', 'Congratulations !!', 'success');
        return new searchCampaigActions.ResetSearchCampaignsActionStatus();
      })
    );

  @Effect({ dispatch: false })
  uploadSearchCampaignsFail$ =
    this.actions$
      .pipe(
        ofType(searchCampaigActions.UPLOAD_SEARCH_CAMPAIGNS_FAIL),
        tap(() => this.toastrService.show('There was a problem uploading search campaigns', 'Sorry !!', 'error'))
      );
}
