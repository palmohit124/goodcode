import { PlatformAccounts, Toolbar, SearchAccounts, Campaigns, CustomerListPage } from './page-objects';
import { browser, by, element } from 'protractor';

describe('Search Management', () => {
  let platformAccounts: PlatformAccounts;
  let toolbar: Toolbar;
  let searchAccounts: SearchAccounts;
  let campaigns: Campaigns;
  let customerListPage: CustomerListPage;

  beforeEach(() => {
    platformAccounts = new PlatformAccounts();
    toolbar = new Toolbar();
    searchAccounts = new SearchAccounts();
    campaigns = new Campaigns();
    customerListPage = new CustomerListPage();
  });

  it('Should render Platform Accounts card', () => {
    platformAccounts.navigateTo();
    browser.sleep(3000);
    expect(platformAccounts.getCardHeader()).toEqual('Linked Platform Accounts');
  });

  describe('On Clicking View Details button', () => {
    it('should render Parent Account card', () => {
      platformAccounts.clickOnViewDetail();
      expect(platformAccounts.getParentAccountCardHeader()).toEqual('Parent Account');
    });
  });

  describe('On Selecting Search Accounts tab', () => {
    it('should render Search Accounts card', () => {
      toolbar.goToSearchAnalyticsfromPlatformAccount();
      browser.sleep(1000);
      searchAccounts.selectSearchAccoutsTab();
      browser.sleep(500);
      expect(searchAccounts.getCardHeader()).toEqual('Search Accounts');
    });

    describe('On Clicking View Details button', () => {
      it('should render Search Integration card', () => {
        searchAccounts.clickOnViewDetail();
        expect(searchAccounts.getIntegrationCardHeader()).toEqual('Add Integrations');
        browser.sleep(500);
      });
    });
  });

  describe('On Clicking Search Analytics on header', () => {
    it('should render campaign card', () => {
      browser.sleep(500);
      toolbar.goToSearchAnalyticsfromSearchAccount();
      browser.sleep(1000);
      expect(campaigns.getCardHeader()).toEqual('Search Campaigns');
    });
  });

  describe('On Clicking Customers on header', () => {
    it('should go back to customer list page', () => {
      toolbar.goToCustomerList();
      browser.sleep(1500);
      expect(customerListPage.getActiveText()).toEqual('Active');
    });
  });
});
