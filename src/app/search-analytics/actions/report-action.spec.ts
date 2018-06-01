import { reportActions } from './';
import { ReportSchedule, ReportSettings, ReportPlatforms } from '../../models/report';

const mockReportSchedule: ReportSchedule = {
  startTime: '04:00',
  deliverByTime: '20:00',
  timezone: 'America/St_Johns',
  status: 'Active',
};

const mockReportSetting: ReportSettings = {
  timezone: 'America/St_Johns',
  defaultCTN: '5627',
  callDuration: '45',
  conversionSource: 'external',
  clickToCall: true,
  validFrom: '2011-12-03',
  validTo: '2018-12-03'
};

const newReportSchedule: ReportSchedule = {
  startTime: '05:00',
  deliverByTime: '18:00',
  timezone: 'America/St_Johns',
  status: 'Paused',
};

const newReportSetting: ReportSettings = {
  timezone: 'America/St_Johns',
  defaultCTN: '272',
  callDuration: '55',
  conversionSource: 'external',
  clickToCall: true,
  validFrom: '2018-12-03',
  validTo: '2019-12-03'
};

const reportPlatforms: ReportPlatforms = {
  linkedReportPlatforms: ['']
};

describe('Report Actions', () => {
  it('should define a load report schedule action', () => {
    const action = new reportActions.LoadReportSchedule('');
    expect(action.type).toBe(reportActions.LOAD_REPORT_SCHEDULE);
  });

  it('should define a load success report schedule action', () => {
    const action = new reportActions.LoadReportScheduleSuccess(mockReportSchedule);
    expect(action.type).toBe(reportActions.LOAD_REPORT_SCHEDULE_SUCCESS);
    expect(action.payload).toBe(mockReportSchedule);
  });

  it('should define a load fail report schedule action', () => {
    const action = new reportActions.LoadReportScheduleFail('Error');
    expect(action.type).toBe(reportActions.LOAD_REPORT_SCHEDULE_FAIL);
    expect(action.payload).toBe('Error');
  });

  it('should define a load report setting action', () => {
    const action = new reportActions.LoadReportSettings('');
    expect(action.type).toBe(reportActions.LOAD_REPORT_SETTINGS);
  });

  it('should define a load success report setting action', () => {
    const action = new reportActions.LoadReportSettingsSuccess(mockReportSetting);
    expect(action.type).toBe(reportActions.LOAD_REPORT_SETTINGS_SUCCESS);
    expect(action.payload).toBe(mockReportSetting);
  });

  it('should define a load fail report schedule setting', () => {
    const action = new reportActions.LoadReportSettingsFail('Error');
    expect(action.type).toBe(reportActions.LOAD_REPORT_SETTINGS_FAIL);
    expect(action.payload).toBe('Error');
  });

  it('should define a update report schedule action', () => {
    const action = new reportActions.UpdateReportSchedule('', newReportSchedule);
    expect(action.type).toBe(reportActions.UPDATE_REPORT_SCHEDULE);
  });

  it('should define a update success report schedule action', () => {
    const action = new reportActions.UpdateReportScheduleSuccess(newReportSchedule);
    expect(action.type).toBe(reportActions.UPDATE_REPORT_SCHEDULE_SUCCESS);
    expect(action.reportSchedule).toBe(newReportSchedule);
  });

  it('should define a update fail report schedule', () => {
    const action = new reportActions.UpdateReportScheduleFail('Error');
    expect(action.type).toBe(reportActions.UPDATE_REPORT_SCHEDULE_FAIL);
    expect(action.payload).toBe('Error');
  });

  it('should define a update report setting action', () => {
    const action = new reportActions.UpdateReportSettings('', newReportSetting);
    expect(action.type).toBe(reportActions.UPDATE_REPORT_SETTINGS);
  });

  it('should define a update success report setting action', () => {
    const action = new reportActions.UpdateReportSettingsSuccess(newReportSetting);
    expect(action.type).toBe(reportActions.UPDATE_REPORT_SETTINGS_SUCCESS);
    expect(action.reportSettings).toBe(newReportSetting);
  });

  it('should define a update fail report setting', () => {
    const action = new reportActions.UpdateReportSettingsFail('Error');
    expect(action.type).toBe(reportActions.UPDATE_REPORT_SETTINGS_FAIL);
    expect(action.payload).toBe('Error');
  });

  it('should define a delete report schedule action', () => {
    const action = new reportActions.RemoveReportSchedule('');
    expect(action.type).toBe(reportActions.REMOVE_REPORT_SCHEDULE);
  });

  it('should define a delete success report schedule action', () => {
    const action = new reportActions.RemoveReportScheduleSuccess('');
    expect(action.type).toBe(reportActions.REMOVE_REPORT_SCHEDULE_SUCCESS);
    expect(action.id).toBe('');
  });

  it('should define a delete fail report schedule', () => {
    const action = new reportActions.RemoveReportScheduleFail('Error');
    expect(action.type).toBe(reportActions.REMOVE_REPORT_SCHEDULE_FAIL);
    expect(action.payload).toBe('Error');
  });

  it('should define a download report action', () => {
    const action = new reportActions.DownloadReport('', {});
    expect(action.type).toBe(reportActions.DOWNLOAD_REPORT);
  });

  it('should define a download success report action', () => {
    const action = new reportActions.DownloadReportSuccess('');
    expect(action.type).toBe(reportActions.DOWNLOAD_REPORT_SUCCESS);
    expect(action.url).toBe('');
  });

  it('should define a download fail report', () => {
    const action = new reportActions.DownloadReportFail('Error');
    expect(action.type).toBe(reportActions.DOWNLOAD_REPORT_FAIL);
    expect(action.payload).toBe('Error');
  });

  it('should define a load report platform action', () => {
    const action = new reportActions.LoadReportPlatform('');
    expect(action.type).toBe(reportActions.LOAD_REPORT_PLATFORM);
  });

  it('should define a load report platform action', () => {
    const action = new reportActions.LoadReportPlatformSuccess(reportPlatforms);
    expect(action.type).toBe(reportActions.LOAD_REPORT_PLATFORM_SUCCESS);
    expect(action.payload).toBe(reportPlatforms);
  });

  it('should define a load fail report platform', () => {
    const action = new reportActions.LoadReportPlatformFail('Error');
    expect(action.type).toBe(reportActions.LOAD_REPORT_PLATFORM_FAIL);
    expect(action.payload).toBe('Error');
  });

});
