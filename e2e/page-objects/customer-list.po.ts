import { browser, by, element } from 'protractor';

export class CustomerListPage {
  navigateTo() {
    return browser.get('/');
  }

  getActiveText() {
    return element(by.css('omni-app div .content-upper')).getText();
  }

  getInactiveButton() {
    return element(by.css('omni-app > omni-shell > div > div > div > div > omni-customer-list > div > div.filter-section > button.inactive'));
  }

  clickOnInactiveButton() {
    return this.getInactiveButton().click();
  }

  getInactiveText() {
    return element(by.css('omni-app > omni-shell > div > div > div > ' +
      'div > omni-customer-list > div > div.list-section.content-width > mat-card:nth-child(2) > div.text-align-left.customer-name-section.inactive > span.content-upper > h6')).getText();
  }

  openCreateCustomerModal() {
    return element(by.className('add-customer')).click();
  }

  getCustomerNameInput() {
    return element(by.css('omni-create-customer-modal > div > div.text-align-center.customer-name-section > mat-form-field > div > div.mat-input-flex.mat-form-field-flex > div > input'));
  }

  clickOnCreateCustomerBtn() {
    return element(by.css('omni-create-customer-modal > div > div.text-align-center.customer-create-button-section > button')).click();
  }

  getToastrContent() {
    return element(by.css('div.toastr-content > div:nth-child(2) > h6')).getText();
  }

  getSeachInput() {
    return element(by.css('omni-app > omni-shell > div > div > div > div > omni-customer-list > div > div.search-section.content-width > div > input'));
  }

  getCustomerName() {
    return element(by.css('omni-app > omni-shell div.text-align-left.customer-name-section > span.content-main > h5')).getText();
  }

  selectCustomer() {
    return element(by.css('omni-app > omni-shell > div > div > div > div > omni-customer-list > div > div.list-section.content-width > mat-card > .customer-name-section')).click();
  }

}
