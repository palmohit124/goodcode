import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TagFeatures } from '../../../models/tag-features';
import { Logger } from '../../../core/services/logger/logger';
import { ClientConfigService } from '../../../core/services/client-config/client-config.service';
import 'rxjs/add/observable/throw';

@Injectable()
export class TagFeaturesService {
  private urlPrefix: string;

  constructor(private http: HttpClient,
    private logger: Logger,
    private clientConfigService: ClientConfigService) {
    this.urlPrefix = this.clientConfigService.get().baseApiUrl;
  }

  public loadTagFeatures(accountId): Observable<TagFeatures[]> {
    return this.http.get<TagFeatures>(this.urlPrefix + 'rulesets/account/' + accountId + '/features')
      .map((response) => {
        this.logger.info('[TagFeaturesService] Successfully loaded tag features.');
        return response || [];
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[TagFeaturesService] Failed to load the tag features.');
      });
  }

  public toggleTagFeatures(payload): Observable<any> {
    return this.http.put<TagFeatures>(this.urlPrefix + 'rulesets/account/' + payload.accountId + '/features', payload)
      .map((response) => {
        this.logger.info('[TagFeaturesService] Successfully enable tag features.');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[TagFeaturesService] Failed to enable tag features.');
      });
  }

  public toggleTagProviders(payload): Observable<any> {
    return this.http.put<TagFeatures>(this.urlPrefix + 'rulesets/account/' + payload.accountId + '/providers', payload)
      .map((response) => {
        this.logger.info('[TagFeaturesService] Successfully enable tag features providers.');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[TagFeaturesService] Failed to enable tag features providers.');
      });
  }

  private handleError(error: HttpErrorResponse, loggerMessage: string) {
    let errMsg: string;
    errMsg = `${error.status} - ${error.message || ''}`;
    this.logger.error(loggerMessage, error);
    return Observable.throw(errMsg);
  }

}
