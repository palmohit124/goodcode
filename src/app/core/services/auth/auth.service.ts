import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ClientState, getAuth } from '../../reducers';
import { Clock } from '../clock/clock';
import { UserProfile } from '../../../models/user-profile';
import { UserTokens, AuthState, EmptyAuthState } from '../../../models/user-tokens';
import { LocalStorage } from '../local-storage/local-storage';
import { Logger } from '../logger';
import { ClientConfigService } from '../client-config/client-config.service';
import * as JWT from 'jsonwebtoken';
import { EmptyUserProfile } from '../../../models/empty-user-profile';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {

  public static STORAGE_KEY: string = 'maauth';

  private loadedAuthState$: Observable<AuthState>;

  constructor(store: Store<ClientState>,
    private storage: LocalStorage,
    private clock: Clock,
    private logger: Logger,
    private clientConfigService: ClientConfigService,
    private http: HttpClient
  ) {
    this.loadedAuthState$ = store.select(getAuth).filter(auth => auth !== undefined);
  }


  public logout(): Observable<{}> {
    return this.storage.removeItem(AuthService.STORAGE_KEY);
  }

  public loadAuthSession(): Observable<AuthState> {
    return this.storage.getItem(AuthService.STORAGE_KEY)
      .map((state) => {
        if (state === null) {
          throw new Error('Token Not Found');
        } else {
          return this.generateAuthState(state, false);
        }
      }).catch((e: Error) => {
        return Observable.throw(e.message);
      });
  }

  public refreshToken(refreshToken): Observable<AuthState> {
    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', refreshToken);

    return this.http.post<UserTokens>(this.clientConfigService.get().baseApiUrl + 'auth/token', body.toString(), { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) })
      .map((response) => {
        this.logger.info('[AuthService] Successfully refreshed token.');
        return this.generateAuthState(response, true);
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[AuthService] Failed to refresh token.');
      });
  }

  private generateAuthState(state: UserTokens, action: boolean): AuthState {
    try {
      const authState = {
        userTokens: state,
        expiresAt: JWT.decode(state.access_token)['exp'],
        role: JWT.decode(state.access_token)['role'],
        authAction: action,
        loadingRefreshToken: false
      };
      return authState;
    } catch (e) {
      return EmptyAuthState;
    }
  }

  public saveAuthSession(authState: AuthState): Observable<{}> {
    return this.storage.setItem(AuthService.STORAGE_KEY, authState.userTokens);
  }

  public isAuthorised(): Observable<boolean> {
    return this.loadedAuthState$.map(auth => this.clientConfigService.get().auth.accessAllowedTo.indexOf(auth.role) > -1);
  }

  public getProfile(): Observable<UserProfile> {
    return this.loadedAuthState$.map(s => {
      try {
        const userData = JWT.decode(s.userTokens.access_token);
        const userProfile = {
          email: userData['email'],
          name: userData['name'],
          nickname: userData['nickname'],
          picture: userData['picture'],
          user_id: userData['user_id'],
        };
        return userProfile;
      } catch (e) {
        return EmptyUserProfile;
      }
    });
  }

  private handleError(error: HttpErrorResponse, loggerMessage: string) {
    let errMsg: string;
    errMsg = `${error.status} - ${error.message || ''}`;
    this.logger.error(loggerMessage, error);
    return Observable.throw(errMsg);
  }
}
