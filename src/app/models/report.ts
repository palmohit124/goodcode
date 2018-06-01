export interface ReportSettings {
  timezone: string;
  defaultCTN: string;
  callDuration: string;
  conversionSource: string;
  clickToCall: boolean;
  validFrom: string;
  validTo: string;
}

export interface ReportSchedule {
  startTime: string;
  deliverByTime: string;
  timezone: string;
  status: string;
}

export interface ReportPlatforms {
  linkedReportPlatforms: string[];
}

export const InitialReportSettings: ReportSettings = {
  timezone: '',
  defaultCTN: '',
  callDuration: '',
  conversionSource: '',
  clickToCall: false,
  validFrom: '',
  validTo: ''
};

export const InitialReportSchedule: ReportSchedule = {
  startTime: '',
  deliverByTime: '',
  timezone: '',
  status: 'Active'
};

export const EmptyReportPlatforms: ReportPlatforms = {
  linkedReportPlatforms: []
};
