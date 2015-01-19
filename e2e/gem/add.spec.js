'use strict';

describe('Add Gem View', function() {
  var page;

  beforeEach(function() {
    browser.get('/gems/add');
    page = require('./add.po');
  });

  it('should include correct header', function() {
    expect(page.h1El.getText()).toBe('Add your Gem to track it!');
  });

  describe('when add gem with success', function () {
    it('add knapsack gem', function () {
      page.addGem('knapsack');
      expect(page.successMessage.getText()).toBe('Thanks!');
    });
  });

  describe('when form has error', function () {
  });
});
