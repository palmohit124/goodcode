import { Report } from './page-objects';
import { browser, by, element } from 'protractor';

describe('Report Management', () => {
  let report: Report;

  beforeEach(() => {
    report = new Report();
  });

  it('Should render Report card', () => {
    report.navigateTo();
    browser.sleep(3000);
    expect(report.getCardHeader()).toEqual('Reports');
  });

  describe('On Clicking View Details button', () => {
    it('should render Report Setting card', () => {
      report.clickOnViewDetail();
      expect(report.getSettingCardHeader()).toEqual('Report Settings');
    });
    it('should render Report Setting card', () => {
      expect(report.getScheduleCardHeader()).toEqual('Report Schedule');
    });
  });
});
