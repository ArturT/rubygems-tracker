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

    describe('when extraDays provided', function() {
      it('returns date as Integer', function() {
        var customDate = '2015-02-12';
        var expected = 1423699200000;
        expect(DateService.dayWithoutHours(customDate, 0)).to.equal(expected);
        customDate = '2015-02-13';
        expect(DateService.dayWithoutHours(customDate, -1)).to.equal(expected);
        customDate = '2015-02-10';
        expect(DateService.dayWithoutHours(customDate, 2)).to.equal(expected);
      });
    });
  });

  describe('yesterdayWithoutHours', function() {
    it('returns yesterday date as Integer', function() {
      var today = Date.parse((new Date()).toISOString().replace(/T.+/, ''));
      var yesterday = today - 3600*24*1000;
      expect(DateService.yesterdayWithoutHours()).to.equal(yesterday);
    });
  });

  describe('addDays', function() {
    var day = new Date('2015-02-13');

    it('adds days to the date', function() {
      expect(DateService.addDays.call(day, 1).toString()).to.equal('Sat Feb 14 2015 01:00:00 GMT+0100 (CET)');
      expect(DateService.addDays.call(day, 30).toString()).to.equal('Sun Mar 15 2015 01:00:00 GMT+0100 (CET)');
    });

    it('removes days from the date', function() {
      expect(DateService.addDays.call(day, -1).toString()).to.equal('Thu Feb 12 2015 01:00:00 GMT+0100 (CET)');
      expect(DateService.addDays.call(day, -13).toString()).to.equal('Sat Jan 31 2015 01:00:00 GMT+0100 (CET)');
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
