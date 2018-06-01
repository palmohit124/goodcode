import { browser, by, element } from 'protractor';

export class PlatformAccounts {
  navigateTo() {
    return browser.get('/search-analytics');
  }
  getCardHeader() {
    return element(by.css('omni-app > omni-shell omni-platform-accounts-card-content > div > omni-card-header > div > div.header-text > h2')).getText();
  }
  clickOnViewDetail() {
    return element(by.css('omni-app > omni-shell omni-platform-accounts-card-content > div > omni-card-header > div > div.header-line-section > button')).click();
  }

  getParentAccountCardHeader() {
    return element(by.css('omni-app > omni-shell omni-platform-accounts-detail omni-card-header > div > div.header-text > h2')).getText();
  }

}
