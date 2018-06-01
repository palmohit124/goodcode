import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Logger} from '../../../core/services/logger';
import {ClientConfigService} from '../../../core/services/client-config/client-config.service';
import 'rxjs/add/observable/throw';
import {SearchCampaign} from '../../../models/search-campaign';

@Injectable()
export class SearchCampaignService {
  private urlPrefix: string;

  constructor(
    private http: HttpClient,
    private logger: Logger,
    private clientConfigService: ClientConfigService) {
    this.urlPrefix = this.clientConfigService.get().baseApiUrl;
  }

  public loadSearchCampaigns(customerId, queryParamas): Observable<[SearchCampaign[], number]> {
    return this.http.get<[SearchCampaign[], number]>(this.urlPrefix + 'customers/' + customerId + '/events', {
      params: this.buildQueryParams(queryParamas),
      observe: 'response'
    })
      .map((response) => {
        this.logger.info('[SearchCampaignService] Successfully loaded search campaigns.');
        return [
          response.body,
          Number.parseInt(response.headers.get('X-Total-Count'))
        ];
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[SearchCampaignService] Failed to load the search campaigns.');
      });
  }

  public uploadSearchCampaigns(customerId, userName, password, file): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', userName);
    formData.append('password', password);
    return this.http.post<any>(this.urlPrefix + 'customers/' + customerId + '/search/campaigns', formData)
      .map((response) => {
        this.logger.info('[SearchCampaignService] Successfully uploaded search campaigns.');
        return response.body;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[SearchCampaignService] Failed to upload search campaigns.');
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
