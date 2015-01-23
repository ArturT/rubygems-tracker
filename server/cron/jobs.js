'use strict';

var CronJob = require('cron').CronJob;
var _ = require('lodash');
var Gem = require('../api/gem/gem.model');
var RubyGemsService = require('../services/rubygems.service');

var updateGemStats = function(gem) {
  RubyGemsService.getGem({
    gemName: gem.name,
    onSuccess: function (data) {
      console.log(data.version);
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
