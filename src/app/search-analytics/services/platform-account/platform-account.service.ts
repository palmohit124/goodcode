import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { LinkedPlatformAccounts, UnlinkedParentAccounts, UnlinkedChildAccounts } from '../../../models/platform-account';
import { Observable } from 'rxjs/Observable';
import { Logger } from '../../../core/services/logger';
import { ClientConfigService } from '../../../core/services/client-config/client-config.service';
import 'rxjs/add/observable/throw';

@Injectable()
export class PlatformAccountService {

  private urlPrefix: string;

  constructor(
    private http: HttpClient,
    private logger: Logger,
    private clientConfigService: ClientConfigService) {

    this.urlPrefix = this.clientConfigService.get().baseApiUrl;
  }

  public loadLinkedPlatformAccounts(customerId, queryParamas): Observable<LinkedPlatformAccounts> {
    return this.http.get<LinkedPlatformAccounts>(this.urlPrefix + 'customers/' + customerId + '/linked-platform-accounts', { params: this.buildQueryParams(queryParamas),
      observe: 'response' })
      .map((response) => {
        this.logger.info('[PlatformAccountService] Successfully loaded linked accounts.');
        response.body.total_items = Number.parseInt(response.headers.get('X-Total-Count'));
        return response.body;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[PlatformAccountService] Failed to load the linked accounts.');
      });
  }

  public loadUnlinkedParentAccounts(customerId, queryParamas): Observable<UnlinkedParentAccounts> {
    return this.http.get<UnlinkedParentAccounts>(this.urlPrefix + 'customers/' + customerId + '/unlinked-platform-accounts/parents',
      { params: this.buildQueryParams(queryParamas), observe: 'response' })
      .map((response) => {
        this.logger.info('[PlatformAccountService] Successfully loaded unlinked parent accounts.');
        response.body.total_items = Number.parseInt(response.headers.get('X-Total-Count'));
        return response.body;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[PlatformAccountService] Failed to load unlinked parent accounts.');
      });
  }

  public linkParentAccount(customerId, platformId): Observable<any> {
    return this.http.put(this.urlPrefix + 'customers/' + customerId + '/platform-accounts/parents/' + platformId, {}, { responseType: 'text' })
      .map((response) => {
        this.logger.info('[PlatformAccountService] Successfully linked parent account.');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[PlatformAccountService] Failed to link parent account.');
      });
  }


  public loadUnlinkedChildAccounts(customerId, parentId, queryParamas): Observable<UnlinkedChildAccounts> {
    return this.http.get<UnlinkedChildAccounts>(this.urlPrefix + 'customers/' + customerId +
      '/unlinked-platform-accounts/parents/' + parentId + '/children', { params: this.buildQueryParams(queryParamas), observe: 'response' })
      .map((response) => {
        this.logger.info('[PlatformAccountService] Successfully loaded unlinked child accounts.');
        response.body.total_items = Number.parseInt(response.headers.get('X-Total-Count'));
        return response.body;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[PlatformAccountService] Failed to load the unlinked child accounts.');
      });
  }

  public linkChildAccount(customerId, platformId): Observable<any> {
    return this.http.put(this.urlPrefix + 'customers/' + customerId + '/platform-accounts/children/' + platformId, {}, { responseType: 'text' })
      .map((response) => {
        this.logger.info('[PlatformAccountService] Successfully linked child account.');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[PlatformAccountService] Failed to link child account.');
      });
  }

  private handleError(error: HttpErrorResponse, loggerMessage: string) {
    let errMsg: string;
    errMsg = `${error.status} - ${error.message || ''}`;
    this.logger.error(loggerMessage, error);
    return Observable.throw(errMsg);
  }

  private buildQueryParams(queryParamas) {
    const keys = Object.keys(queryParamas);
    let params = new HttpParams();
    keys.forEach(key => {
      params = params.append(key, queryParamas[key]);
    });
    return params;
  }

}
