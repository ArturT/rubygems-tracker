'use strict';

var CronJob = require('cron').CronJob;
var _ = require('lodash');
var Gem = require('../api/gem/gem.model');
var GemStatistic = require('../api/gem/gem_statistic.model');
var GemStatisticSchema = require('../api/gem/gem_statistic.schema');
var RubyGemsService = require('../services/rubygems.service');
var DateService = require('../services/date.service');

var updateGemStats = function(gem) {
  RubyGemsService.getGem({
    gemName: gem.name,
    onSuccess: function (data) {
      var currentTotalDownloads = data.downloads;

      var today = DateService.todayWithoutHours();
      var duplicates = _.filter(gem.gemStatistics, function(gemStatistic) {
        return Date.parse(gemStatistic.date) == today;
      });

      if (duplicates.length == 0) {
        var lastGemStatistic = _.last(gem.gemStatistics);
        var recentDownloads = 0;
        if (lastGemStatistic) {
          recentDownloads = currentTotalDownloads - lastGemStatistic.totalDownloads;
        }
        var newGemStatistic = {
          totalDownloads: currentTotalDownloads,
          recentDownloads: recentDownloads
        };
        gem.gemStatistics.push(newGemStatistic);
      } else {
        console.log(gem.name + ' record already has gemStatistic for today!');
      }

      gem.totalDownloads = currentTotalDownloads;
      gem.save(function(err) {
        if (err) {
          console.error("Couldn't update gem " + gem.name, err);
        }
      });
    }
  });
};

var updateStatsForAllGems = function() {
  Gem.find({}, function (err, gems) {
    if (err) { return err; }
    _(gems).forEach(updateGemStats);
  });
};

// call it once just for test
updateStatsForAllGems();

var gemsStatisticsJob = new CronJob({
  cronTime: '* * * * * *',
  onTick: updateStatsForAllGems
  //onTick: function() {
    //console.log('just tick');
  //}
});

module.exports = {
  start: function() {
    gemsStatisticsJob.start();
  }
};
