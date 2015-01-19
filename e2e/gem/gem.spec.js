'use strict';

describe('Gems View', function() {
  var page, addGemPage;

  beforeEach(function() {
    addGemPage = require('./add.po');
    page = require('./gem.po');
  });

  it('should include correct header', function() {
    browser.get('/gems');
    expect(page.h1El.getText()).toBe('Gems');
  });

  describe('open existing gem page', function () {
    beforeEach(function() {
      browser.get('/gems/add');
      addGemPage.addGem('devise');
      expect(addGemPage.successMessage.getText()).toBe('Thanks!');
      browser.get('/gems/devise');
    });

    it('renders gem statistics page', function () {
      expect(page.h1El.getText()).toBe('devise');
    });
  });

  describe('open fake gem page', function () {
    beforeEach(function() {
      browser.get('/gems/fake-gem-name');
    });

    it('renders 404 page', function () {
      expect(page.h1El.getText()).toBe('Error 404');
    });
  });
});
