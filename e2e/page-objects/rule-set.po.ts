import { browser, by, element } from 'protractor';

export class RuleSetPage {
  clickOnCreateRuleWizard() {
    return element(by.css('omni-app > omni-tag-shell > div > div > div > div > omni-create-rule > div > div > mat-card.create-rule__rule-config.rule-config.mat-card'
      + '> div.rule-config__refdom-section > omni-refdom-list > div.column-heading > div:nth-child(2) > span')).click();
  }

  selectDomainList() {
    return element(by.css('omni-create-rule-wizard > div > div > div.refdom.ng-star-inserted > mat-form-field > div > div.mat-input-flex.mat-form-field-flex > div > mat-select')).click();
  }

  selectDomainOption() {
    return element(by.css('div > div.cdk-overlay-pane > div > div > mat-option:nth-child(1)')).click();
  }

  clickOnRefdomBtn() {
    return element(by.css('omni-create-rule-wizard > div > div > div.refdom.ng-star-inserted > div > button.button.update-button.mat-button')).click();
  }

  selectSourceList() {
    return element(by.css('omni-create-rule-wizard > div > div > div.conditions.ng-star-inserted > form > div > mat-form-field > div > div.mat-input-flex.mat-form-field-flex > div > mat-select')).click();
  }

  selectSourceOption() {
    return element(by.css('div > div.cdk-overlay-pane > div > div > mat-option:nth-child(1)')).click();
  }

  selectEditSourceList() {
    return element(by.xpath('/html/body/div/div[2]/div/mat-dialog-container/omni-conditions-dialog/div/form/div[1]/mat-form-field[1]/div/div[1]/div/mat-select')).click();
  }

  selectEditSourceOption() {
    return element(by.xpath('/html/body/div/div[4]/div/div/mat-option[2]')).click();
  }

  editSourceName() {
    return element(by.xpath('/html/body/div/div[2]/div/mat-dialog-container/omni-conditions-dialog/div/form/div[1]/mat-form-field[2]/div/div[1]/div/input'));
  }

  addSourceName() {
    return element(by.xpath('/html/body/div/div[2]/div/mat-dialog-container/omni-create-rule-wizard/div/div/div[2]/form/div[1]/mat-form-field[2]/div/div[1]/div/input'));
  }

  clickOnConditionBtn() {
    return element(by.css('omni-create-rule-wizard > div > div > div.conditions.ng-star-inserted > form > div.conditions__button-section > button.update-button')).click();
  }

  clickOnEditSourceBtn() {
    return element(by.css('body > div.cdk-overlay-container > div.cdk-global-overlay-wrapper > div > mat-dialog-container > '
      + 'omni-conditions-dialog > div > form > div.conditions__button-section > button.update-button')).click();
  }

  addLookupName() {
    return element(by.xpath('/html/body/div/div[2]/div/mat-dialog-container/omni-create-rule-wizard/div/div/div[2]/form/div[1]/div/mat-form-field/div/div[1]/div/input'));
  }

  clickOnLookupBtn() {
    return element(by.css('omni-create-rule-wizard > div > div > div.lookup.ng-star-inserted > form > div.lookup__button-section > button.update-button')).click();
  }

  addPhone() {
    return element(by.xpath('/html/body/div/div[2]/div/mat-dialog-container/omni-create-rule-wizard/div/div/div[2]/form/div[1]/mat-form-field[1]/div/div[1]/div/input'));
  }

  selectTrackingNumberList() {
    return element(by.xpath('/html/body/div/div[2]/div/mat-dialog-container/omni-create-rule-wizard/div/div/div[2]/form/div[1]/mat-form-field[2]/div/div[1]/div/mat-select')).click();
  }

  selectTrackingNumberOption() {
    return element(by.css('div > div.cdk-overlay-pane > div > div > mat-option:nth-child(1)')).click();
  }

  selectEditTrackingNumberList() {
    return element(by.xpath('/html/body/div/div[2]/div/mat-dialog-container/omni-rewrites-dialog/div/form/div[1]/mat-form-field[2]/div/div[1]/div/mat-select')).click();
  }

  selectEditTrackingNumberOption() {
    return element(by.xpath('/html/body/div/div[4]/div/div/mat-option[2]')).click();
  }

  editPhone() {
    return element(by.xpath('/html/body/div/div[2]/div/mat-dialog-container/omni-rewrites-dialog/div/form/div[1]/mat-form-field[1]/div/div[1]/div/input'));
  }

  clickOnEditRewriteBtn() {
    return element(by.css('body > div.cdk-overlay-container > div.cdk-global-overlay-wrapper > div > mat-dialog-container > '
      + 'omni-rewrites-dialog > div > form > div.rewrites__button-section > button.update-button')).click();
  }

  clickOnRewriteBtn() {
    return element(by.css('omni-create-rule-wizard > div > div > div.rewrites.ng-star-inserted > form > div.rewrites__button-section > button.update-button')).click();
  }

  selectDomainAttr() {
    return element(by.xpath('/html/body/omni-app/omni-tag-shell/div/div/div/div/omni-create-rule/div/div/mat-card[2]/div[1]/omni-refdom-list/div[2]/mat-card'));
  }

  selectSourceAttr() {
    return element(by.xpath('/html/body/omni-app/omni-tag-shell/div/div/div/div/omni-create-rule/div/div/mat-card[2]/div[2]/omni-condition-list/div[2]/div/mat-card'));
  }

  selectLookupAttr() {
    return element(by.xpath('/html/body/omni-app/omni-tag-shell/div/div/div/div/omni-create-rule/div/div/mat-card[2]/div[3]/omni-lookup-list/div[2]/div/mat-card'));
  }

  selectRewriteAttr() {
    return element(by.xpath('/html/body/omni-app/omni-tag-shell/div/div/div/div/omni-create-rule/div/div/mat-card[2]/div[4]/omni-rewrite-list/div[2]/div/mat-card'));
  }

  selectRuleMatcard() {
    return element(by.xpath('/html/body/omni-app/omni-tag-shell/div/div/div/div/omni-tag-rule-list/div/div/div[3]/mat-card[1]'));
  }

}
