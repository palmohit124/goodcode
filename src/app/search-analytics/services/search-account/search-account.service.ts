import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { SearchAccountList } from '../../../models/search-account';
import { Observable } from 'rxjs/Observable';
import { Logger } from '../../../core/services/logger';
import { ClientConfigService } from '../../../core/services/client-config/client-config.service';
import 'rxjs/add/observable/throw';

@Injectable()
export class SearchAccountService {

  private urlPrefix: string;

  constructor(
    private http: HttpClient,
    private logger: Logger,
    private clientConfigService: ClientConfigService) {
    this.urlPrefix = this.clientConfigService.get().baseApiUrl;
  }

  public loadSearchAccounts(customerId, queryParams): Observable<SearchAccountList> {
    return this.http.get<SearchAccountList>(this.urlPrefix + 'customers/' + customerId + '/search/accounts', { params: this.buildQueryParams(queryParams), observe: 'response' })
      .map((response) => {
        this.logger.info('[SearchAccountsService] Successfully loaded search accounts.');
        response.body.total_items = Number.parseInt(response.headers.get('X-Total-Count'));
        return response.body;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[SearchAccountsService] Failed to load the search account.');
      });
  }

  public loadUnlinkedSearchAccounts(customerId, integrationId, queryParams): Observable<SearchAccountList> {
    return this.http.get<SearchAccountList>(this.urlPrefix + 'customers/' + customerId + '/search/integrations/' +
      integrationId + '/unlinked-accounts', { params: this.buildQueryParams(queryParams), observe: 'response' })
      .map((response) => {
        this.logger.info('[SearchAccountsService] Successfully loaded search accounts.');
        response.body.total_items = Number.parseInt(response.headers.get('X-Total-Count'));
        return response.body;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[SearchAccountsService] Failed to load the search account.');
      });
  }

  public linkSearchAccount(body, href): Observable<any> {
    return this.http.put<any>(this.urlPrefix + href, body)
      .map((response) => {
        this.logger.info('[SearchAccountsService] Successfully linked search account.');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[SearchAccountsService] Failed to link search account.');
      });
  }

  public unlinkSearchAccount(href): Observable<any> {
    return this.http.delete(this.urlPrefix + href, { responseType: 'text' })
      .map((response) => {
        this.logger.info('[SearchAccountsService] Successfully unlink search account.');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[SearchAccountsService] Failed to unlink search account.');
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
