'use strict';

var _ = require('lodash');
var RubyGemsService = require('./rubygems.service');
var DateService = require('./date.service');

module.exports = {
  updateGemStats: function(gem) {
    var dayWithoutHours = DateService.yesterdayWithoutHours();
    var duplicates = _.filter(gem.gemStatistics, function(gemStatistic) {
      return Date.parse(gemStatistic.date) == dayWithoutHours;
    });

    if (duplicates.length == 0) {
      RubyGemsService.getGem({
        gemName: gem.name,
        onSuccess: function (data) {
          var currentTotalDownloads = data.downloads;

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
          gem.totalDownloads = currentTotalDownloads;
          gem.save(function(err) {
            if (err) {
              console.error("Couldn't update gem statistics for " + gem.name, err);
            }
          });
        }
      });
    } else {
      console.log(gem.name + ' record already has gemStatistic for day! ' + dayWithoutHours);
    }
  }
};
