import { reportActions } from '../actions';
import {
  ReportSchedule, ReportSettings, ReportPlatforms,
  InitialReportSchedule, InitialReportSettings, EmptyReportPlatforms
} from '../../models/report';

export interface ReportState {
  scheduleLoaded: boolean;
  scheduleLoading: boolean;
  settingLoaded: boolean;
  settingLoading: boolean;
  reportSchedule: ReportSchedule;
  reportSettings: ReportSettings;
  reportPlatforms: ReportPlatforms;
}

const initialState: ReportState = {
  scheduleLoaded: false,
  scheduleLoading: false,
  settingLoaded: false,
  settingLoading: false,
  reportSchedule: InitialReportSchedule,
  reportSettings: InitialReportSettings,
  reportPlatforms: EmptyReportPlatforms
};

export function reducer(state = initialState, action: reportActions.Actions): ReportState {
  switch (action.type) {
    case reportActions.LOAD_REPORT_SCHEDULE: {
      return {
        ...state,
        scheduleLoading: true,
        scheduleLoaded: false
      };
    }

    case reportActions.LOAD_REPORT_SCHEDULE_FAIL: {
      return {
        ...state,
        scheduleLoaded: true,
        scheduleLoading: false,
        reportSchedule: InitialReportSchedule
      };
    }

    case reportActions.LOAD_REPORT_SCHEDULE_SUCCESS: {
      return {
        ...state,
        scheduleLoaded: true,
        scheduleLoading: false,
        reportSchedule: action.payload
      };
    }

    case reportActions.LOAD_REPORT_SETTINGS: {
      return {
        ...state,
        settingLoading: true,
        settingLoaded: false
      };
    }

    case reportActions.LOAD_REPORT_SETTINGS_FAIL: {
      return {
        ...state,
        settingLoaded: true,
        settingLoading: false,
        reportSettings: InitialReportSettings
      };
    }

    case reportActions.LOAD_REPORT_SETTINGS_SUCCESS: {
      return {
        ...state,
        settingLoaded: true,
        settingLoading: false,
        reportSettings: action.payload
      };
    }

    case reportActions.UPDATE_REPORT_SETTINGS_SUCCESS: {
      return {
        ...state,
        reportSettings: action.reportSettings
      };
    }

    case reportActions.UPDATE_REPORT_SCHEDULE_SUCCESS: {
      return {
        ...state,
        reportSchedule: action.reportSchedule
      };
    }

    case reportActions.REMOVE_REPORT_SCHEDULE_FAIL: {
      return {
        ...state
      };
    }

    case reportActions.LOAD_REPORT_PLATFORM_SUCCESS: {
      return {
        ...state,
        reportPlatforms: action.payload
      };
    }

    default:
      return state;
  }
}


