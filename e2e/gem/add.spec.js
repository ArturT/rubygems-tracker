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

  describe('when success', function () {
    it('adds knapsack gem', function () {
      page.addGem('knapsack');
      expect(page.successMessage.getText()).toBe('Thanks!');
    });
  });

  describe('when failure', function () {
    describe('when gem name already exists in our database', function () {
      it('has unique name error', function () {
        var gemName = 'rails';
        page.addGem(gemName);
        browser.get('/gems/add');
        page.addGem(gemName);
        expect(page.alertDanger.getText()).toBe('Error, expected `name` to be unique. Value: `'+gemName+'`');
      });
    });
  });
});
