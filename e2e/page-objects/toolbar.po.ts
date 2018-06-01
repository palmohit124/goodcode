import { browser, by, element } from 'protractor';

export class Toolbar {
  getUserName() {
    return element(by.id('displayUserName')).getText();
  }

  openEditCustomerModal() {
    return element(by.id('openEditCustomerModal')).click();
  }

  getEditCustomerNameInput() {
    return element(by.css('omni-edit-customer-modal > div > div.text-align-center.customer-name-section > mat-form-field > div > div.mat-input-flex.mat-form-field-flex > div > input'));
  }

  clickOnEditCustomerBtn() {
    return element(by.css('omni-edit-customer-modal > div > div.text-align-center.customer-edit-button-section > button')).click();
  }

  getCustomerName() {
    return element(by.id('customerName')).getText();
  }

  goToSearchAnalyticsfromPlatformAccount() {
    return element(by.css('omni-app > omni-shell > div > div > div > div > omni-platform-accounts-detail > div > div > h6')).click();
  }

  goToSearchAnalyticsfromSearchAccount() {
    return element(by.css('omni-app > omni-shell > div > div > div > div > omni-search-accounts-detail > div > div > h6')).click();
  }

  goToCustomerList() {
    return element(by.id('navigateToCustomer')).click();
  }

}
