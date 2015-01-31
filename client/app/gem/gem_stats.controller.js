'use strict';

angular.module('rubygemsTrackerApp.controllers')
  .controller('GemStatsCtrl', function ($scope, $http, promiseGem) {
    var gem = promiseGem.data;

    $scope.gem = gem;
    $scope.enabledStats = false;
    $scope.recentDownloads = {};

    if (gem.gemStatistics.length > 1) {
      $scope.enabledStats = true;

      var recentDownloads = _.map(gem.gemStatistics, 'recentDownloads');

      var dates = _.map(gem.gemStatistics, function(gemStatistic) {
        return gemStatistic.date.replace(/T.+/, '');
      });

      $scope.recentDownloads.labels = dates;
      $scope.recentDownloads.series = ['Recent downloads'];
      $scope.recentDownloads.data = [recentDownloads];
    }
  });
