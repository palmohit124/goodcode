import { browser, by, element } from 'protractor';

export class SearchAccounts {
  selectSearchAccoutsTab() {
    return element(by.xpath('/html/body/omni-app/omni-shell/div/div/div/div/omni-search-analytics-summary/omni-accounts-card/mat-card/mat-tab-group/mat-tab-header/div[2]/div/div/div[2]')).click();
  }
  getCardHeader() {
    return element(by.css('omni-app > omni-shell omni-search-accounts-card-content > div > omni-card-header > div > div.header-text > h2')).getText();
  }
  clickOnViewDetail() {
    return element(by.css('omni-app > omni-shell omni-search-accounts-card-content > div > omni-card-header > div > div.header-line-section > button')).click();
  }

  getIntegrationCardHeader() {
    return element(by.css('omni-app > omni-shell omni-search-accounts-detail omni-search-integration-list omni-card-header div.header-text > h2')).getText();
  }

}
