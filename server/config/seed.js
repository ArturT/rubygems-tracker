/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Gem = require('../api/gem/gem.model');
var DateService = require('../services/date.service');
var _ = require('lodash');

/*
var Thing = require('../api/thing/thing.model');
Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});
*/

// Create gems if missing
// Provide list of gems we would like to track
var gemNames = ['knapsack'];

for (var index in gemNames) {
  var gemName = gemNames[index];

  Gem.find({ name: gemName }).remove(function() {
    var gemStatistics = []

    var dateRange = DateService.dateRange('2015-01-10', '2015-03-06');
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
