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

      browser.waitForAngular();
      expect(page.successMessage.getText()).toBe('Thanks!');
      expect(page.gemLink.getAttribute('href')).toMatch(/\/gems\/knapsack$/);
    });
  });

  describe('when failure', function () {
    describe('when submit empty form', function () {
      it('has missin gem name error', function () {
        page.addGem('');
        expect(page.alertDanger.getText()).toBe('The gem name is missing.');
      });
    });

    describe("when gem doesn't exist on rubygems.org", function () {
      it('has not found error from rubygems.org', function () {
        page.addGem('fake-gem-name');
        expect(page.alertDanger.getText()).toBe('This rubygem could not be found.');
      });
    });

    describe('when gem name contains spaces', function () {
      it('has unexpected error from rubygems.org', function () {
        page.addGem('gem name with spaces');
        expect(page.alertDanger.getText()).toBe('Unexpected error from rubygems.org, please try later or use proper gem name.');
      });
    });

    describe('when gem name already exists in our database', function () {
      it('has unique name error', function () {
        page.addGem('rails');
        browser.get('/gems/add');
        page.addGem('rails');
        expect(page.alertDanger.getText()).toBe('Error, expected `name` to be unique. Value: `rails`');
      });
    });
  });
});
