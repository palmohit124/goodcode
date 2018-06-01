import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import {AuthService} from '../services/auth/auth.service';
import {authActions, profileActions} from '../actions';
import {EmptyAuthState} from '../../models/user-tokens';
import {AuthStateLoadSucceeded} from '../actions/auth.actions';

@Injectable()
export class UserProfileEffects {

  @Effect()
  loadUserProfile$: Observable<profileActions.Actions> =
    Observable.merge(
      this.actions$.ofType(authActions.SAVE_AUTH_STATE_SUCCEEDED),
      this.actions$.ofType(authActions.AUTH_STATE_LOAD_SUCCEEDED)
        .filter((action: AuthStateLoadSucceeded) => action.payload !== EmptyAuthState),
    ).switchMap(() =>
      this.auth.getProfile()
        .map(p => new profileActions.LoadUserProfileSucceeded(p))
        .catch(err => Observable.of(new profileActions.LoadUserProfileFailed(err))),
    );

  constructor(private actions$: Actions, private auth: AuthService) {
  }
}
