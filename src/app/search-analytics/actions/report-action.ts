import { Action } from '@ngrx/store';
import { tag } from '../../helpers/index';
import { ReportSchedule, ReportSettings, ReportPlatforms } from '../../models/report';

export const LOAD_REPORT_SCHEDULE = tag('[Report] Load Report Schedule');
export const LOAD_REPORT_SCHEDULE_SUCCESS = tag('[Report] Load Report Schedule Success');
export const LOAD_REPORT_SCHEDULE_FAIL = tag('[Report] Load Report Schedule Fail');

export const LOAD_REPORT_SETTINGS = tag('[Report] Load Report Settings');
export const LOAD_REPORT_SETTINGS_SUCCESS = tag('[Report] Load Report Settings Success');
export const LOAD_REPORT_SETTINGS_FAIL = tag('[Report] Load Report Settings Fail');

export const UPDATE_REPORT_SETTINGS = tag('[Report] Upadate Report Settings');
export const UPDATE_REPORT_SETTINGS_SUCCESS = tag('[Report] Update Report Settings Success');
export const UPDATE_REPORT_SETTINGS_FAIL = tag('[Report] Update Report Settings Fail');

export const UPDATE_REPORT_SCHEDULE = tag('[Report] Upadate Report Schedule');
export const UPDATE_REPORT_SCHEDULE_SUCCESS = tag('[Report] Update Report Schedule Success');
export const UPDATE_REPORT_SCHEDULE_FAIL = tag('[Report] Update Report Schedule Fail');

export const REMOVE_REPORT_SCHEDULE = tag('[Report] Remove Report Schdule');
export const REMOVE_REPORT_SCHEDULE_SUCCESS = tag('[Report] Remove Report Schdule Success');
export const REMOVE_REPORT_SCHEDULE_FAIL = tag('[Report] Remove Report Schdule Fail');

export const DOWNLOAD_REPORT = tag('[Report] Download Report');
export const DOWNLOAD_REPORT_SUCCESS = tag('[Report] Download Report Success');
export const DOWNLOAD_REPORT_FAIL = tag('[Report] Download Report Fail');

export const LOAD_REPORT_PLATFORM = tag('[Report] Load Report Platforms');
export const LOAD_REPORT_PLATFORM_SUCCESS = tag('[Report] Load Report Platforms Success');
export const LOAD_REPORT_PLATFORM_FAIL = tag('[Report] Load Report Platforms Fail');

export class LoadReportSchedule implements Action {
  readonly type = LOAD_REPORT_SCHEDULE;

  constructor(public id: string) { }
}

export class LoadReportScheduleSuccess implements Action {
  readonly type = LOAD_REPORT_SCHEDULE_SUCCESS;

  constructor(public payload: ReportSchedule) { }
}

export class LoadReportScheduleFail implements Action {
  readonly type = LOAD_REPORT_SCHEDULE_FAIL;

  constructor(public payload: string) { }
}

export class LoadReportSettings implements Action {
  readonly type = LOAD_REPORT_SETTINGS;

  constructor(public id: string) { }
}

export class LoadReportSettingsSuccess implements Action {
  readonly type = LOAD_REPORT_SETTINGS_SUCCESS;

  constructor(public payload: ReportSettings) { }
}

export class LoadReportSettingsFail implements Action {
  readonly type = LOAD_REPORT_SETTINGS_FAIL;

  constructor(public payload: string) { }
}

export class UpdateReportSettings implements Action {
  readonly type = UPDATE_REPORT_SETTINGS;

  constructor(public id: string, public reportSettings: ReportSettings) { }
}

export class UpdateReportSettingsSuccess implements Action {
  readonly type = UPDATE_REPORT_SETTINGS_SUCCESS;

  constructor(public reportSettings: ReportSettings) { }
}

export class UpdateReportSettingsFail implements Action {
  readonly type = UPDATE_REPORT_SETTINGS_FAIL;

  constructor(public payload: string) { }
}

export class UpdateReportSchedule implements Action {
  readonly type = UPDATE_REPORT_SCHEDULE;

  constructor(public id: string, public reportSchedule: ReportSchedule) { }
}

export class UpdateReportScheduleSuccess implements Action {
  readonly type = UPDATE_REPORT_SCHEDULE_SUCCESS;

  constructor(public reportSchedule: ReportSchedule) { }
}

export class UpdateReportScheduleFail implements Action {
  readonly type = UPDATE_REPORT_SCHEDULE_FAIL;

  constructor(public payload: string) { }
}

export class RemoveReportSchedule implements Action {
  readonly type = REMOVE_REPORT_SCHEDULE;

  constructor(public id: string) { }
}

export class RemoveReportScheduleSuccess implements Action {
  readonly type = REMOVE_REPORT_SCHEDULE_SUCCESS;

  constructor(public id: string) { }
}

export class RemoveReportScheduleFail implements Action {
  readonly type = REMOVE_REPORT_SCHEDULE_FAIL;

  constructor(public payload: string) { }
}

export class DownloadReport implements Action {
  readonly type = DOWNLOAD_REPORT;
  constructor(public id, public payload: any) { }
}

export class DownloadReportSuccess implements Action {
  readonly type = DOWNLOAD_REPORT_SUCCESS;

  constructor(public url: string) { }
}

export class DownloadReportFail implements Action {
  readonly type = DOWNLOAD_REPORT_FAIL;

  constructor(public payload: string) { }
}

export class LoadReportPlatform implements Action {
  readonly type = LOAD_REPORT_PLATFORM;

  constructor(public id: string) { }
}

export class LoadReportPlatformSuccess implements Action {
  readonly type = LOAD_REPORT_PLATFORM_SUCCESS;

  constructor(public payload: ReportPlatforms) { }
}

export class LoadReportPlatformFail implements Action {
  readonly type = LOAD_REPORT_PLATFORM_FAIL;

  constructor(public payload: string) { }
}



export type Actions =
  LoadReportSchedule |
  LoadReportScheduleSuccess |
  LoadReportScheduleFail |
  LoadReportSettings |
  LoadReportSettingsSuccess |
  LoadReportSettingsFail |
  UpdateReportSettings |
  UpdateReportSettingsSuccess |
  UpdateReportSettingsFail |
  UpdateReportSchedule |
  UpdateReportScheduleSuccess |
  UpdateReportScheduleFail |
  RemoveReportSchedule |
  RemoveReportScheduleSuccess |
  RemoveReportScheduleFail |
  DownloadReport |
  DownloadReportSuccess |
  DownloadReportFail |
  LoadReportPlatform |
  LoadReportPlatformSuccess |
  LoadReportPlatformFail;

