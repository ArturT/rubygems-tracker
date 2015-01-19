'use strict';

var AddGemPage = function() {
  var _this = this;

  this.heroEl = element(by.css('.hero-unit'));
  this.h1El = this.heroEl.element(by.css('h1'));
  this.gemNameField = element(by.id('gemName'));
  this.submitButton = element(by.id('submitButton'));
  this.successMessage = element(by.id('successMessage'));
  this.alertDanger = element(by.css('alert-danger'));

  this.addGem = function(gemName) {
    _this.gemNameField.sendKeys(gemName);
    _this.submitButton.click();
  };
};

module.exports = new AddGemPage();
