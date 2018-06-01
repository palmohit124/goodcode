import { browser, by, element } from 'protractor';

export class Campaigns {
  getCardHeader() {
    return element(by.css('omni-app > omni-shell omni-search-campaigns-card omni-card-header > div > div.header-text > h2')).getText();
  }
}
