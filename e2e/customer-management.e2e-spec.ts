import { CustomerListPage, Toolbar } from './page-objects';
import { browser, by, element } from 'protractor';

describe('Customer Management', () => {
  let customerListPage: CustomerListPage;
  let toolbar: Toolbar;

  beforeEach(() => {
    customerListPage = new CustomerListPage();
    toolbar = new Toolbar();
  });

  it('should display Active customer list', () => {
    expect(customerListPage.getActiveText()).toEqual('Active');
  });

  describe('When Inactive clicked', () => {
    it('should display Inactive customer list', () => {
      customerListPage.clickOnInactiveButton();
      browser.sleep(1000);
      expect(customerListPage.getInactiveText()).toEqual('Inactive');
    });
  });

  it('Creating customer', () => {
    customerListPage.openCreateCustomerModal();
    browser.sleep(3000);
    customerListPage.getCustomerNameInput().sendKeys('Customer Name 1');
    customerListPage.clickOnCreateCustomerBtn();
    browser.sleep(2000);
    expect(customerListPage.getToastrContent()).toEqual('New customer has been created');
  });

  it('Searching customer', () => {
    customerListPage.getSeachInput().sendKeys('Customer Name 1');
    browser.sleep(500);
    expect(customerListPage.getCustomerName()).toEqual('Customer Name 1');
  });

  it('Editing customer', () => {
    customerListPage.selectCustomer();
    browser.sleep(3000);
    toolbar.openEditCustomerModal();
    browser.sleep(3000);
    toolbar.getEditCustomerNameInput().sendKeys('Edited Customer');
    toolbar.clickOnEditCustomerBtn();
    browser.sleep(2000);
    expect(toolbar.getCustomerName()).toEqual('Edited Customer');
  });
});
