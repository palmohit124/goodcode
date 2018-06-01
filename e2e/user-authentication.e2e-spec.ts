import { CustomerListPage, Toolbar } from './page-objects';
import { browser, by, element } from 'protractor';

describe('User Authentication', () => {
  let customerListpage: CustomerListPage;
  let toolbar: Toolbar;

  beforeEach(() => {
    customerListpage = new CustomerListPage();
    toolbar = new Toolbar();
  });

  it('should log in on hosted page Auth0 and display the user name', () => {
    browser.waitForAngularEnabled(false)
      .then(() => customerListpage.navigateTo())
      .then(() => browser.driver.findElement(by.id('user-text-field')))
      .then((e) => e.sendKeys(process.env.USER))
      .then(() => browser.driver.findElement(by.id('password-text-field')))
      .then((e) => e.sendKeys(process.env.PASSWORD))
      .then(() => browser.driver.findElement(by.id('btn-login')))
      .then((e) => e.click())
      .then(() => browser.driver.sleep(10000))
      .then(() => expect(toolbar.getUserName()).toEqual(process.env.USER));
  });
});
