import { RuleListPage, RuleSetPage, CustomerListPage } from './page-objects';
import { browser, by, element, protractor } from 'protractor';

describe('Tag Management', () => {
  let ruleListPage: RuleListPage;
  let ruleSetPage: RuleSetPage;
  let customerListPage: CustomerListPage;

  beforeEach(() => {
    ruleListPage = new RuleListPage();
    ruleSetPage = new RuleSetPage();
    customerListPage = new CustomerListPage();
  });

  // Rule list page
  it('Should navigate to specified tag management account', () => {
    ruleListPage.navigateTo(process.env.ACCOUNT);
    browser.sleep(3000);
  });

  it('Creating rule', () => {
    browser.sleep(2500);
    ruleListPage.openCreateRuleModal();
    browser.sleep(2000);
    ruleListPage.getRuleNameInput().sendKeys('New Rule');
    browser.sleep(500);
    ruleListPage.selectCampaignList();
    ruleListPage.selectCampaignListOption();
    browser.sleep(500);
    ruleListPage.clickOnCreateRuleBtn();
    browser.sleep(4000);
    expect(ruleListPage.getToastrContent()).toEqual('New rule has been created');
  });

  // Rule set
  it('Should navigate to that rule', () => {
    browser.sleep(1000);
    expect(ruleListPage.getRuleName()).toEqual('New Rule');
  });

  it('Should open rule set wizard and add rule set', () => {
    browser.sleep(1000);
    ruleSetPage.clickOnCreateRuleWizard();
    addDomain();
    addSource();
    addLookup();
    addRewrite();
    browser.sleep(1000);
    expect(ruleListPage.getToastrContent()).toEqual('Rule attributes have been created');
  });

  it('Should edit source attribute', () => {
    browser.sleep(1000);
    browser.actions().mouseMove(ruleSetPage.selectSourceAttr()).perform();
    browser.sleep(500);
    browser.element.all(by.xpath('/html/body/omni-app/omni-tag-shell/div/div/div/div/omni-create-rule/div/div/mat-card[2]/div[2]/omni-condition-list/div[2]/div/mat-card/div[2]/span[1]')).then(function (elm) {
      elm[0].click();
    });
    browser.sleep(1000);
    editSource();
    browser.sleep(5000);
    expect(ruleListPage.getToastrContent()).toEqual('Rule attribute has been edited.');
  });

  it('Should edit rewrite attribute', () => {
    browser.sleep(1000);
    browser.actions().mouseMove(ruleSetPage.selectRewriteAttr()).perform();
    browser.sleep(500);
    browser.element.all(by.xpath('/html/body/omni-app/omni-tag-shell/div/div/div/div/omni-create-rule/div/div/mat-card[2]/div[4]/omni-rewrite-list/div[2]/div/mat-card/div[2]/span[1]')).then(function (elm) {
      elm[0].click();
    });
    browser.sleep(1000);
    editRewrite();
    browser.sleep(5000);
    expect(ruleListPage.getToastrContent()).toEqual('Rule attribute has been edited.');
  });

  it('Should delete domain attribute', () => {
    browser.sleep(1500);
    browser.actions().mouseMove(ruleSetPage.selectDomainAttr()).perform();
    browser.sleep(500);
    browser.element.all(by.xpath('/html/body/omni-app/omni-tag-shell/div/div/div/div/omni-create-rule/div/div/mat-card[2]/div[1]/omni-refdom-list/div[2]/mat-card/div[2]/span[2]')).then(function (elm) {
      elm[0].click();
    });
    browser.sleep(500);
    ruleListPage.clickOnDeleteConfirmBtn();
    browser.sleep(5000);
    expect(ruleListPage.getToastrContent()).toEqual('The rule attribute has been deleted.');
  });

  // it('Should delete lookupname attribute', () => {
  //   browser.sleep(1000);
  //   browser.actions().mouseMove(ruleSetPage.selectLookupAttr()).perform();
  //   browser.sleep(500);
  //   browser.element.all(by.xpath('/html/body/omni-app/omni-tag-shell/div/div/div/div/omni-create-rule/div/div/mat-card[2]/div[3]/omni-lookup-list/div[2]/div/mat-card/div/div[2]/span[2]')).then(function (elm) {
  //     elm[0].click();
  //   });
  //   browser.sleep(500);
  //   ruleListPage.clickOnDeleteConfirmBtn();
  //   browser.sleep(5000);
  //   expect(ruleListPage.getToastrContent()).toEqual('The rule attribute has been deleted.');
  // });

  it('Should go back to rule list page', () => {
    browser.sleep(1000);
    ruleListPage.navigateTo(process.env.ACCOUNT);
    browser.sleep(3000);
  });

  // Code snippet section
  it('Should display code snippet section and check if Account id is present in the script', () => {
    browser.sleep(500);
    ruleListPage.clickOnCopySnippetBtn();
    browser.sleep(2500);
    expect(ruleListPage.getCodeSnippetText()).toContain(process.env.ACCOUNT);
    browser.sleep(1000);
    ruleListPage.clickOnCopySnipetCloseBtn();
  });

  // Tag features section
  it('Should display tag features option', () => {
    browser.sleep(500);
    ruleListPage.clickOnTagFeaturesBtn();
    browser.sleep(1500);
    ruleListPage.clickOnTagFeaturesCloseBtn();
  });

  it('Searching rule', () => {
    browser.sleep(3000);
    ruleListPage.setSeachRuleName().sendKeys('New Rule');
    browser.sleep(5000);
    expect(ruleListPage.getSearchRuleName()).toEqual('New Rule');
  });

  it('Deleting rule', () => {
    browser.sleep(500);
    browser.actions().mouseMove(ruleSetPage.selectRuleMatcard()).perform();
    browser.sleep(500);
    browser.element.all(by.xpath('/html/body/omni-app/omni-tag-shell/div/div/div/div/omni-tag-rule-list/div/div/div[3]/mat-card[1]/div/div[4]/a')).then(function (elm) {
      elm[0].click();
    });
    ruleListPage.clickOnDeleteConfirmBtn();
    browser.sleep(4000);
    expect(ruleListPage.getToastrContent()).toEqual('Rule has been deleted');
  });

  it('should go back to customer list page', () => {
    browser.sleep(1500);
    customerListPage.navigateTo();
  });

  /***Function block*/

  function addDomain() {
    browser.sleep(1000);
    ruleSetPage.selectDomainList();
    browser.sleep(500);
    ruleSetPage.selectDomainOption();
    browser.sleep(500);
    ruleSetPage.clickOnRefdomBtn();
  }

  function addSource() {
    browser.sleep(500);
    ruleSetPage.selectSourceList();
    browser.sleep(500);
    ruleSetPage.selectSourceOption();
    browser.sleep(500);
    ruleSetPage.addSourceName().sendKeys('foo');
    browser.sleep(1500);
    ruleSetPage.clickOnConditionBtn();
  }

  function addLookup() {
    browser.sleep(500);
    ruleSetPage.addLookupName().sendKeys('phone');
    browser.sleep(500);
    ruleSetPage.clickOnLookupBtn();
  }

  function addRewrite() {
    browser.sleep(500);
    ruleSetPage.addPhone().sendKeys('1234567891');
    browser.sleep(800);
    ruleSetPage.selectTrackingNumberList();
    browser.sleep(500);
    ruleSetPage.selectTrackingNumberOption();
    browser.sleep(500);
    ruleSetPage.clickOnRewriteBtn();
    browser.sleep(2000);
  }

  function editSource() {
    ruleSetPage.selectEditSourceList();
    browser.sleep(500);
    ruleSetPage.selectEditSourceOption();
    browser.sleep(500);
    ruleSetPage.editSourceName().clear();
    browser.sleep(500);
    ruleSetPage.editSourceName().sendKeys('phonepe');
    browser.sleep(1000);
    ruleSetPage.clickOnEditSourceBtn();
  }

  function editRewrite() {
    ruleSetPage.editPhone().clear();
    browser.sleep(500);
    ruleSetPage.editPhone().sendKeys('1219892348');
    browser.sleep(1000);
    ruleSetPage.selectEditTrackingNumberList();
    browser.sleep(500);
    ruleSetPage.selectEditTrackingNumberOption();
    browser.sleep(500);
    ruleSetPage.clickOnEditRewriteBtn();
  }

});
