'use strict';

var should = require('should');
var DateService = require('./date.service');
var expect = require('chai').expect;

describe('DateService', function() {
  describe('dayWithoutHours', function() {
    describe('when custom date provided', function() {
      it('returns date as Integer', function() {
        var customDate = '2015-02-12';
        expect(DateService.dayWithoutHours(customDate)).to.equal(1423699200000);
      });
    });

    describe('when custom date not provided', function() {
      it('returns today date as Integer', function() {
        var today = Date.parse((new Date()).toISOString().replace(/T.+/, ''));
        expect(DateService.dayWithoutHours()).to.equal(today);
      });
    });
  });

  describe('addDays', function() {
    it('adds days to the date', function() {
      // TODO
    });
  });

  describe('dateRange', function() {
    it('returns date range', function() {
      var range = DateService.dateRange('2015-01-30', '2015-02-02');
      expect(range.length).to.equal(4);
      expect(range[0].toString()).to.equal('Fri Jan 30 2015 01:00:00 GMT+0100 (CET)');
      expect(range[1].toString()).to.equal('Sat Jan 31 2015 01:00:00 GMT+0100 (CET)');
      expect(range[2].toString()).to.equal('Sun Feb 01 2015 01:00:00 GMT+0100 (CET)');
      expect(range[3].toString()).to.equal('Mon Feb 02 2015 01:00:00 GMT+0100 (CET)');
    });
  });
});
