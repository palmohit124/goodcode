import { browser, by, element } from 'protractor';

export class RuleListPage {
  navigateTo(AccountId) {
    return browser.get('/tag-management/' + AccountId);
  }

  openCreateRuleModal() {
    return element(by.css('omni-app > omni-tag-shell > div > div > div > div > omni-tag-rule-list > div > div'
      + '> div.rule-list__search-section.search-section > div.search-section__create-rule-button.text-align-right > button')).click();
  }

  getRuleNameInput() {
    return element(by.xpath('/html/body/div/div[2]/div/mat-dialog-container/omni-create-rule-dialog/div/form/div[1]/mat-form-field[1]/div/div[1]/div/input'));
  }

  getSearchRuleName() {
    return element(by.xpath('/html/body/omni-app/omni-tag-shell/div/div/div/div/omni-tag-rule-list/div/div/div[3]/mat-card/div/div[1]/a')).getText();
  }

  setSeachRuleName() {
    return element(by.css('omni-app > omni-tag-shell > div > div > div > div > omni-tag-rule-list > div > div > div.rule-list__search-section.search-section > div.search-section__filter-section.filter-section > input'));
  }

  selectCampaignList() {
    return element(by.xpath('/html/body/div/div[2]/div/mat-dialog-container/omni-create-rule-dialog/div/form/div[1]/mat-form-field[2]/div/div[1]/div/mat-select')).click();
  }

  selectCampaignListOption() {
    return element(by.xpath('/html/body/div/div[4]/div/div/mat-option[2]')).click();
  }

  clickOnCreateRuleBtn() {
    return element(by.css('omni-create-rule-dialog > div > form > div.create-rule-dialog__button-section > button.update-button')).click();
  }

  clickOnCopySnippetBtn() {
    return element(by.css('omni-app > omni-tag-shell > div > div > div > div > omni-tag-rule-list > div >'
      + 'div > div.rule-list__search-section.search-section > div.search-section__code-snippet-button.text-align-right > button')).click();
  }

  getCodeSnippetText() {
    return element(by.css('omni-code-snippet-modal > div > div.open-code-snippet__code-snippet-content > div:nth-child(1) > pre > code > span:nth-child(2) > span:nth-child(5)')).getText();
  }

  clickOnCopySnipetCloseBtn() {
    return element(by.css('omni-code-snippet-modal > div > div.open-code-snippet__code-snippet-header > div.cross-icon > span')).click();
  }

  clickOnTagFeaturesBtn() {
    return element(by.css('omni-app > omni-tag-shell > div > div > div > div > omni-tag-rule-list > div > div >'
      + 'div.rule-list__header > div.rule-list__header__tag-feature.text-align-right > button')).click();
  }

  clickOnTagFeaturesCloseBtn() {
    return element(by.css('omni-tag-features-modal > div > div > div.rulename-bcrumb > div.cross-icon > span')).click();
  }

  clickOnRule() {
    return element(by.css('omni-app > omni-tag-shell > div > div > div > div > omni-tag-rule-list > div >'
      + 'div > div.rule-list__list-section.list-section.content-width > mat-card:nth-child(1) > div > div.rule-section__rule-name > a')).click();
  }

  getRuleName() {
    return element(by.css('omni-app > omni-tag-shell > div > div > div > div > omni-create-rule > div > div >'
      + 'mat-card.create-rule__rule-header.rule-header.mat-card > div.rule-header__rulename-wrapper.rulename-wrapper > h5')).getText();
  }

  getToastrContent() {
    return element(by.css('div.toastr-content > div:nth-child(2) > h6')).getText();
  }

  clickOnDeleteConfirmBtn() {
    return element(by.xpath('/html/body/div/div[2]/div/mat-dialog-container/omni-confirmation/div/div[3]/div[1]')).click();
  }

}
