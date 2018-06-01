import { browser, by, element } from 'protractor';

export class Report {
  navigateTo() {
    return browser.get('/search-analytics');
  }
  getCardHeader() {
    return element(by.id('reportsHeaderText')).getText();
  }

  clickOnViewDetail() {
    return element(by.id('viewReportDetailsBtn')).click();
  }

  getSettingCardHeader() {
    return element(by.css('omni-app > omni-shell > div omni-report-detail > div omni-report-settings > mat-card > div > omni-card-header > div > div.header-text > h2')).getText();
  }

  getScheduleCardHeader() {
    return element(by.css('omni-app > omni-shell > div omni-report-detail > div omni-report-schedule > mat-card > div > omni-card-header > div > div.header-text > h2')).getText();
  }
}
