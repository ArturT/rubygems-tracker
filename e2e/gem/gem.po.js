'use strict';

var GemPage = function() {
  var _this = this;

  this.heroEl = element(by.css('.hero-unit'));
  this.h1El = this.heroEl.element(by.css('h1'));
};

module.exports = new GemPage();
