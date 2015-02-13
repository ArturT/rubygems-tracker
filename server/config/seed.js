/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var RELOAD_SEED_ON_CHANGE = false;
var Gem = require('../api/gem/gem.model');
var DateService = require('../services/date.service');
var _ = require('lodash');

var gemNames = [];

// Create gems if missing
if (RELOAD_SEED_ON_CHANGE) {
  // Provide list of gems we would like to track
  gemNames = ['knapsack'];
}

for (var index in gemNames) {
  var gemName = gemNames[index];

  Gem.find({ name: gemName }).remove(function() {
    var gemStatistics = []

    var dateRange = DateService.dateRange('2014-12-06', '2015-02-03');
    //var dateRange = DateService.dateRange('2015-01-10', '2015-01-13');
    //console.log(dateRange);

    var recentDownloads = 0;
    var currentTotalDownloads = 0;
    var lastGemStatistic;
    _(dateRange).forEach(function (date) {
      lastGemStatistic = _.last(gemStatistics);
      if (lastGemStatistic) {
        // add random between 1 and 100
        currentTotalDownloads += Math.floor((Math.random() * 100) + 1);
        recentDownloads = currentTotalDownloads - lastGemStatistic.totalDownloads;
      }

      gemStatistics.push({
        totalDownloads: currentTotalDownloads,
        recentDownloads: recentDownloads,
        date: date
      })
    });

    Gem.create({
      name: gemName,
      totalDownloads: 0,
      gemStatistics: gemStatistics
    });
  });
}
