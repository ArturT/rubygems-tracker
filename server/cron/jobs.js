'use strict';

var CronJob = require('cron').CronJob;
var _ = require('lodash');
var Gem = require('../api/gem/gem.model');
var GemService = require('../services/gem.service');

var updateStatsForAllGems = function() {
  console.log('CronJob: updateStatsForAllGems');
  Gem.find({}, function (err, gems) {
    if (err) { return err; }
    _(gems).forEach(GemService.updateGemStats);
  });
};

// call it once just for test
//updateStatsForAllGems();

var gemsStatisticsJob = new CronJob({
  cronTime: '1 0,30 * * * *',
  //cronTime: '*/5 * * * * *',
  onTick: updateStatsForAllGems
});

module.exports = {
  start: function() {
    gemsStatisticsJob.start();
  }
};
