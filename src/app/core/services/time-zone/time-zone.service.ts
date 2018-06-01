import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {TimeZone, TimeZoneList, TimeZoneOffset, TimeZoneOffsetList} from '../../../models/time-zone';
import * as _ from 'lodash';

import {Logger} from '../logger';
import {ClientConfigService} from '../client-config/client-config.service';
import 'rxjs/add/observable/throw';

@Injectable()
export class TimeZoneService {

  private urlPrefix: string;

  constructor(
    private http: HttpClient,
    private logger: Logger,
    private clientConfigService: ClientConfigService) {
    this.urlPrefix = this.clientConfigService.get().baseApiUrl;
  }

  public loadTimeZone(): Observable<TimeZoneOffsetList> {
    return this.http.get<TimeZoneList>(this.urlPrefix + 'timezones')
      .map((response) => {
        this.logger.info('[TimeZoneService] Successfully loaded timezone.');
        return this.toTzOffsets(response);
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[TimeZoneService] Failed to load the timezone.');
      });
  }

  private toTzOffsets(tzList: TimeZoneList): TimeZoneOffsetList {
    const tzMap = _.groupBy(tzList.timezones, (tz: TimeZone) => tz.utcOffsets);
    const tzGrouped = _.map(tzMap, (timezoneOffets: Array<TimeZone>, key: string) => (
      {name: key, timezones: _.sortBy(_.map(timezoneOffets, (tz: TimeZone) => tz.timezone))}
    ));

    const regex = /^UTC\+?(-?\d+)/;
    const timeZoneOffsetList: TimeZoneOffsetList = {timezoneOffsets: []};
    timeZoneOffsetList.timezoneOffsets = _.sortBy(tzGrouped, (tzOffset: TimeZoneOffset) => {
      const match = regex.exec(tzOffset.name);
      return -Number(match[1]);
    });
    return timeZoneOffsetList;
  }

  private handleError(error: HttpErrorResponse, loggerMessage: string) {
    let errMsg: string;
    errMsg = `${error.status} - ${error.message || ''}`;
    this.logger.error(loggerMessage, error);
    return Observable.throw(errMsg);
  }
}
