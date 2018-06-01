import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Logger } from '../../../core/services/logger/logger';
import { ClientConfigService } from '../../../core/services/client-config/client-config.service';
import 'rxjs/add/observable/throw';

@Injectable()
export class TagScriptService {

  private urlPrefix: string;

  constructor(private http: HttpClient,
    private logger: Logger,
    private clientConfigService: ClientConfigService) {
    this.urlPrefix = this.clientConfigService.get().baseApiUrl;
  }

  public loadTagScriptSnippet(accountId): Observable<any> {
    return this.http.get<any>(this.urlPrefix + 'rulesets/account/' + accountId + '/tag-script-snippet')
      .map((response) => {
        this.logger.info('[TagScriptService] Successfully loaded tag script snippet.');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[TagScriptService] Failed to load the tag script snippet.');
      });
  }

  private handleError(error: HttpErrorResponse, loggerMessage: string) {
    let errMsg: string;
    errMsg = `${error.status} - ${error.message || ''}`;
    this.logger.error(loggerMessage, error);
    return Observable.throw(errMsg);
  }
}
