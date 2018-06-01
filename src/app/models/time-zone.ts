export interface TimeZone {
  timezone: string;
  utcOffsets: string;
}

export interface TimeZoneOffset {
  name: string;
  timezones: string[];
}

export interface TimeZoneList {
  timezones: TimeZone[];
}

export interface TimeZoneOffsetList {
  timezoneOffsets: TimeZoneOffset[];
}

export const EmptyTimeZoneOffsetList: TimeZoneOffsetList = {
  timezoneOffsets: []
};
