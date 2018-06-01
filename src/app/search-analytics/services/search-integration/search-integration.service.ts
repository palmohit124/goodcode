import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { SearchIntegration, SearchIntegrationList } from '../../../models/search-integration';
import { Observable } from 'rxjs/Observable';
import { Logger } from '../../../core/services/logger';
import { ClientConfigService } from '../../../core/services/client-config/client-config.service';
import 'rxjs/add/observable/throw';

@Injectable()
export class SearchIntegrationService {

  private urlPrefix: string;

  constructor(
    private http: HttpClient,
    private logger: Logger,
    private clientConfigService: ClientConfigService) {
    this.urlPrefix = this.clientConfigService.get().baseApiUrl;
  }

  public loadSearchIntegrations(customerId, queryParamas): Observable<SearchIntegrationList> {
    return this.http.get<SearchIntegrationList>(this.urlPrefix + 'customers/' + customerId + '/search/integrations', {
      params: this.buildQueryParams(queryParamas),
      observe: 'response'
    })
      .map((response) => {
        this.logger.info('[SearchIntegrationService] Successfully loaded search integration.');
        response.body.total_items = Number.parseInt(response.headers.get('X-Total-Count'));
        return response.body;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[SearchIntegrationService] Failed to load the search integration.');
      });
  }

  public getIntegrationAuthorizationUrl(source, queryParamas): Observable<any> {
    return this.http.get<any>(this.urlPrefix + 'search/integrations/' + source, { params: this.buildQueryParams(queryParamas)})
      .map((response) => {
        this.logger.info('[SearchIntegrationService] Successfully get Integration Authorization URL.');
        return response.url;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[SearchIntegrationService] Failed to get Integration Authorization URL.');
      });
  }

  public createSearchIntegrations(customerId, oAuthCredential): Observable<SearchIntegration> {
    return this.http.post<SearchIntegration>(this.urlPrefix + 'customers/' + customerId + '/search/integrations', oAuthCredential)
      .map((response) => {
        this.logger.info('[SearchIntegrationService] Successfully created integration.');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[SearchIntegrationService] Failed to create search integration.');
      });
  }

  public removeSearchIntegration(href): Observable<any> {
    return this.http.delete(this.urlPrefix + href, { responseType: 'text' })
      .map((response) => {
        this.logger.info('[SearchIntegrationService] Successfully removed search integration.');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[SearchIntegrationService] Failed to remove search integration.');
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
