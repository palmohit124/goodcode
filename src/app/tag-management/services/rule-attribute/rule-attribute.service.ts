import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Logger } from '../../../core/services/logger';
import { ClientConfigService } from '../../../core/services/client-config/client-config.service';
import { Rule, CreateRuleAttributes, RuleAttributes } from '../../../models/rule-set';
import 'rxjs/add/observable/throw';

@Injectable()
export class RuleAttributeService {
  private urlPrefix: string;
  private headers;

  constructor(private http: HttpClient, private logger: Logger,
    private clientConfigService: ClientConfigService) {
    this.urlPrefix = this.clientConfigService.get().baseApiUrl;
  }

  public loadRuleDetails(id): Observable<RuleAttributes> {
    return this.http.get<RuleAttributes>(this.urlPrefix + 'rulesets/' + id)
      .map((response) => {
        this.logger.info('[RuleAttributeService] Successfully loaded selected rule.');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[RuleAttributeService] Failed to load the selected rule.');
      });
  }

  public deleteAttribute(attribute): Observable<any> {
    return this.http.delete<any>(this.urlPrefix + '/rulesets/' + attribute.name + '/' + attribute.graphId)
      .map((response) => {
        this.logger.info('[RuleAttributeService] Successfully deleted attribute.');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[RuleAttributeService] Failed to delete the attribute.');
      });
  }

  public addRuleset(payload): Observable<CreateRuleAttributes> {
    return this.http.post<CreateRuleAttributes>(this.urlPrefix + 'rulesets', payload)
      .map((response) => {
        this.logger.info('[RuleAttributeService] Successfully added rule. ');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[RuleAttributeService] Failed to add rule.');
      });
  }

  public editRulesetAttribute(id, attribute, body): Observable<any> {
    return this.http.put<any>(this.urlPrefix + 'rulesets/' + attribute + '/' + id, body)
      .map((response) => {
        this.logger.info('[RuleAttributeService] Successfully updated.');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[RuleAttributeService] Failed to update.');
      });
  }

  private handleError(error: HttpErrorResponse, loggerMessage: string) {
    let errMsg: string;
    errMsg = `${error.status} - ${error.error.message || ''}`;
    this.logger.error(loggerMessage, error);
    return Observable.throw(errMsg);
  }
}
