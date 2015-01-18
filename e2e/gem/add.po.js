'use strict';

var AddGemPage = function() {
  this.heroEl = element(by.css('.hero-unit'));
  this.h1El = this.heroEl.element(by.css('h1'));
  this.gemNameField = element(by.id('gemName'));
  this.submitButton = element(by.id('submitButton'));
};

module.exports = new AddGemPage();
