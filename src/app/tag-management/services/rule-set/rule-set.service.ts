import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Rule, RuleSet } from '../../../models/rule-set';
import { Logger } from '../../../core/services/logger';
import { ClientConfigService } from '../../../core/services/client-config/client-config.service';
import { LocalStorage } from '../../../core/services/local-storage/local-storage';
import 'rxjs/add/observable/throw';


@Injectable()
export class RulesetService {
  public static STORAGE_KEY: string = 'graphId';
  private urlPrefix: string;

  constructor(private http: HttpClient, private logger: Logger,
    private clientConfigService: ClientConfigService,
    private storage: LocalStorage) {
    this.urlPrefix = this.clientConfigService.get().baseApiUrl;
  }

  public addRule(payload): Observable<Rule> {
    return this.http.post<Rule>(this.urlPrefix + 'rulesets/rule', payload)
      .map((response) => {
        this.logger.info('[RulesetService] Successfully added rule. ');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[RulesetService] Failed to add rule.');
      });
  }

  public loadRulesetList(accountId, queryParam): Observable<RuleSet> {
    return this.http.get<RuleSet>(this.urlPrefix + 'rulesets/rule/account/' + accountId, { params: this.buildQueryParams(queryParam), observe: 'response' })
      .map((response) => {
        this.logger.info('[RulesetService] Successfully loaded the rulesetlist. ');
        response.body.total_items = Number.parseInt(response.headers.get('X-Total-Count'));
        return response.body;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[RulesetService] Failed to load the rulesetlist.');
      });
  }

  public loadRule(id): Observable<Rule> {
    return this.http.get<Rule>(this.urlPrefix + 'rulesets/rule/' + id)
      .map((response) => {
        this.logger.info('[RulesetService] Successfully loaded selected rule.');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[RulesetService] Failed to load the selected rule.');
      });
  }

  public saveRuleSession(graphId: number): Observable<{}> {
    return this.storage.setItem(RulesetService.STORAGE_KEY, graphId);
  }

  public loadRuleSession(): Promise<Rule> {
    return new Promise<Rule>((resolve, reject) => {
      this.storage.getItem(RulesetService.STORAGE_KEY).subscribe((graphId) => {
        if (graphId === null) {
          reject('Rule session not found');
        } else {
          return this.loadRule(graphId).subscribe(response => {
            resolve(response);
          }, (error) => {
            reject(error);
          });
        }
      }, error => {
        reject(error);
      });
    });
  }

  public deleteRule(id): Observable<RuleSet> {
    return this.http.delete<RuleSet>(this.urlPrefix + 'rulesets/rule/' + id)
      .map((response) => {
        this.logger.info('[RulesetService] Successfully deleted the rule.');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[RulesetService] Failed to deleted the rule.');
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
