import { reportActions } from '../actions';
import {reducer, ReportState} from './report.reducer';
import { ReportSchedule, ReportSettings, ReportPlatforms, InitialReportSchedule, InitialReportSettings, EmptyReportPlatforms } from '../../models/report';

const initialState: ReportState = {
  scheduleLoaded: false,
  scheduleLoading: false,
  settingLoaded: false,
  settingLoading: false,
  reportSchedule: InitialReportSchedule,
  reportSettings: InitialReportSettings,
  reportPlatforms: EmptyReportPlatforms
};

const mockReportSchedule: ReportSchedule = {
  startTime: '03:00',
  deliverByTime: '10:00',
  timezone: 'America/St_Johns',
  status: 'Active',
};

const mockReportSettings: ReportSettings = {
  timezone: 'America/St_Johns',
  defaultCTN: '5627',
  callDuration: '45',
  conversionSource: 'external',
  clickToCall: true,
  validFrom: '2018-10-20',
  validTo: '2019-10-20'
};

const mockReportPlatforms: ReportPlatforms = {
  linkedReportPlatforms: ['']
};

describe('The report reducer', () => {

  it('should return initial state on init', () => {
    const result = reducer(undefined, { type: null, id: '' });
    expect(result).toEqual(initialState);
  });

  describe('when the dispatched action is Load Report Schedule', () => {
    it('should return report schedule state as loading', () => {
      const result = reducer(reducer(undefined, { type: null, id: '' }), new reportActions.LoadReportSchedule(''));
      expect(result.scheduleLoading).toEqual(true);
      expect(result.scheduleLoaded).toEqual(false);
    });
  });

  describe('when the dispatched action is Load Report Schedule Success', () => {
    it('should return report schedule state as loaded with report schedule', () => {
      const result = reducer(reducer(reducer(undefined, { type: null, id: '' }), new reportActions.LoadReportSchedule('')), new reportActions.LoadReportScheduleSuccess(mockReportSchedule));
      expect(result.scheduleLoading).toEqual(false);
      expect(result.scheduleLoaded).toEqual(true);
      expect(result.reportSchedule).toEqual(mockReportSchedule);
    });
  });

  describe('when the dispatched action is Load Report Schedule Fail', () => {
    it('should return report schedule state as loaded with initial report schedule', () => {
      const result = reducer(reducer(reducer(undefined, { type: null, id: '' }), new reportActions.LoadReportSchedule('')), new reportActions.LoadReportScheduleFail('Error'));
      expect(result.scheduleLoading).toEqual(false);
      expect(result.scheduleLoaded).toEqual(true);
      expect(result.reportSchedule).toEqual(InitialReportSchedule);
    });
  });

  describe('when the dispatched action is Load Report Setting', () => {
    it('should return report setting state as loading', () => {
      const result = reducer(reducer(undefined, { type: null, id: '' }), new reportActions.LoadReportSettings(''));
      expect(result.settingLoading).toEqual(true);
      expect(result.settingLoaded).toEqual(false);
    });
  });

  describe('when the dispatched action is Load Report Setting Success', () => {
    it('should return report setting state as loaded with report schedule', () => {
      const result = reducer(reducer(reducer(undefined, { type: null, id: '' }), new reportActions.LoadReportSettings('')), new reportActions.LoadReportSettingsSuccess(mockReportSettings));
      expect(result.settingLoading).toEqual(false);
      expect(result.settingLoaded).toEqual(true);
      expect(result.reportSettings).toEqual(mockReportSettings);
    });
  });

  describe('when the dispatched action is Load Report Setting Fail', () => {
    it('should return report setting state as loaded with initial report schedule', () => {
      const result = reducer(reducer(reducer(undefined, { type: null, id: '' }), new reportActions.LoadReportSettings('')), new reportActions.LoadReportSettingsFail('Error'));
      expect(result.settingLoading).toEqual(false);
      expect(result.settingLoaded).toEqual(true);
      expect(result.reportSettings).toEqual(InitialReportSettings);
    });
  });

  describe('when the dispatched action is Update Report Schedule Success', () => {
    it('should return report schedule state with report schedule', () => {
      const result = reducer(reducer(reducer(undefined, { type: null, id: '' }), new reportActions.UpdateReportSchedule('', mockReportSchedule)), new reportActions.UpdateReportScheduleSuccess(mockReportSchedule));
      expect(result.reportSchedule).toEqual(mockReportSchedule);
    });
  });

  describe('when the dispatched action is Update Report Schedule Fail', () => {
    it('should return report schedule state with initial report schedule', () => {
      const result = reducer(reducer(reducer(undefined, { type: null, id: '' }), new reportActions.UpdateReportSchedule('', mockReportSchedule)), new reportActions.UpdateReportScheduleFail('Error'));
      expect(result.reportSchedule).toEqual(InitialReportSchedule);
    });
  });

  describe('when the dispatched action is Update Report Setting Success', () => {
    it('should return report setting state with report schedule', () => {
      const result = reducer(reducer(reducer(undefined, { type: null, id: '' }), new reportActions.UpdateReportSettings('', mockReportSettings)), new reportActions.UpdateReportSettingsSuccess(mockReportSettings));
      expect(result.reportSettings).toEqual(mockReportSettings);
    });
  });

  describe('when the dispatched action is Update Report Setting Fail', () => {
    it('should return report setting state with initial report schedule', () => {
      const result = reducer(reducer(reducer(undefined, { type: null, id: '' }), new reportActions.UpdateReportSettings('', mockReportSettings)), new reportActions.UpdateReportSettingsFail('Error'));
      expect(result.reportSettings).toEqual(InitialReportSettings);
    });
  });


  describe('when the dispatched action is Load Report Platform Success', () => {
    it('should return report platform state with report platform', () => {
      const result = reducer(reducer(reducer(undefined, { type: null, id: '' }), new reportActions.LoadReportPlatform('')), new reportActions.LoadReportPlatformSuccess(mockReportPlatforms));
      expect(result.reportPlatforms).toEqual(mockReportPlatforms);
    });
  });

  describe('when the dispatched action is Load Report Platform Fail', () => {
    it('should return report platform state with initial report schedule', () => {
      const result = reducer(reducer(reducer(undefined, { type: null, id: '' }), new reportActions.LoadReportPlatform('')), new reportActions.LoadReportPlatformFail('Error'));
      expect(result.reportPlatforms).toEqual(EmptyReportPlatforms);
    });
  });

});
