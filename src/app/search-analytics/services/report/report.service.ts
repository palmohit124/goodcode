import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ReportPlatforms, ReportSchedule, ReportSettings} from '../../../models/report';
import {ClientConfigService} from '../../../core/services/client-config/client-config.service';
import {Clock} from '../../../core/services/clock/clock';
import {Injectable} from '@angular/core';
import {Logger} from '../../../core/services/logger';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class ReportService {

  private urlPrefix: string;

  constructor(
    private http: HttpClient,
    private logger: Logger,
    private clientConfigService: ClientConfigService,
    private clock: Clock
  ) {
    this.urlPrefix = this.clientConfigService.get().baseApiUrl;
  }

  private uri(customerId: string, tail: string): string {
    return `${this.urlPrefix}customers/${customerId}/search/report/${tail}`;
  }

  public loadReportSchedule(customerId: string): Observable<ReportSchedule> {
    return this.http.get<ReportSchedule>(this.uri(customerId, 'schedule'))
      .map((response) => {
        this.logger.info('[ReportService] Successfully loaded report schedule.');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[ReportService] Failed to load report schedule.');
      });
  }

  public loadReportSettings(customerId: string): Observable<ReportSettings> {
    return this.http.get<ReportSettings>(this.uri(customerId, 'settings'), { params: { date: this.clock.getDateString() } })
      .map((response) => {
        this.logger.info('[ReportService] Successfully loaded report setting.');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[ReportService] Failed to load report setting.');
      });
  }

  public updateReportSettings(customerId: string, reportSettings: ReportSettings): Observable<ReportSettings> {
    return this.http.put<ReportSettings>(this.uri(customerId, 'settings'), reportSettings)
      .map((response) => {
        this.logger.info('[ReportService] Successfully updated report setting.');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[ReportService] Failed to update report setting.');
      });
  }

  public updateReportSchedule(customerId: string, reportSchedule: ReportSchedule): Observable<ReportSchedule> {
    return this.http
      .put<ReportSchedule>(this.uri(customerId, 'schedule'), reportSchedule)
      .map(response => {
        this.logger.info('[ReportService] Successfully updated report schedule.');
        return response;
      })
      .catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[ReportService] Failed to update report schedule.');
      });
  }

  public removeReportSchedule(customerId: string): Observable<any> {
    return this.http.delete(this.uri(customerId, 'schedule'))
      .map((response) => {
        this.logger.info('[ReportService] Successfully removed report schedule.');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[ReportService] Failed to remove report schedule.');
      });
  }

  public loadReportPlatforms(customerId: string): Observable<ReportPlatforms> {
    return this.http.get<ReportPlatforms>(this.uri(customerId, 'linked-reports'))
      .map((response) => {
        this.logger.info('[ReportService] Successfully loaded report platforms.');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[ReportService] Failed to load report platforms.');
      });
  }

  public getReportDownloadUrl(customerId: string, body): Observable<any> {
    return this.http.post(this.uri(customerId, 'download'), body, { responseType: 'text' })
      .map((response) => {
        this.logger.info('[ReportService] Successfully get report download url.');
        return this.urlPrefix + response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[ReportService] Failed to get report download url.');
      });
  }

  private handleError(error: HttpErrorResponse, loggerMessage: string) {
    let errMsg: string;
    errMsg = `${error.status} - ${error.message || ''}`;
    this.logger.error(loggerMessage, error);
    return Observable.throw(errMsg);
  }

}
