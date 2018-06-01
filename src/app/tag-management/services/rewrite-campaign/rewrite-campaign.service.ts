import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Logger } from '../../../core/services/logger';
import { ClientConfigService } from '../../../core/services/client-config/client-config.service';
import { RewriteCampaign, RewriteCampaignList } from '../../../models/rewrite-campaign';
import 'rxjs/add/observable/throw';


@Injectable()
export class RewriteCampaignService {
  private urlPrefix: string;
  private headers;

  constructor(private http: HttpClient, private logger: Logger,
    private clientConfigService: ClientConfigService) {
    this.urlPrefix = this.clientConfigService.get().baseApiUrl;
  }

  public loadCampaigns(accountId): Observable<RewriteCampaignList> {
    return this.http.get<RewriteCampaignList>(this.urlPrefix + 'campaigns/rewrite', { params: this.buildQueryParams({ accountid: accountId }) })
      .map((response) => {
        this.logger.info('[RewriteCampaignService] Successfully loaded campaigns.');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[RewriteCampaignService] Failed to load the campaigns.');
      });
  }

  public loadCampaignWithCtn(campaignId): Observable<RewriteCampaign> {
    return this.http.get<RewriteCampaign>(this.urlPrefix + 'campaigns/rewrite/' + campaignId, { params: this.buildQueryParams({ fields: 'ctn' }) })
      .map((response) => {
        this.logger.info('[RewriteCampaignService] Successfully loaded cmapaign.');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[RewriteCampaignService] Failed to load the campaign.');
      });
  }

  private handleError(error: HttpErrorResponse, loggerMessage: string) {
    let errMsg: string;
    errMsg = `${error.status} - ${error.error.message || ''}`;
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
