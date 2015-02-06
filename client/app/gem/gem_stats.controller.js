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

      // DatePicker
      $scope.datepicker = {};
      $scope.datepicker.startDate = {};
      $scope.datepicker.endDate = {};
      $scope.datepicker.minDate = dates[0];
      $scope.datepicker.maxDate = _(dates).last();
      $scope.datepicker.format = 'yyyy-MM-dd';

      $scope.datepicker.open = function($event, dateType) {
        $event.preventDefault();
        $event.stopPropagation();
        if (dateType == 'startDate') {
          $scope.datepicker.startDate.opened = true;
        } else if (dateType == 'endDate') {
          $scope.datepicker.endDate.opened = true;
        }
      };

      var updateGraphs = function() {
        var startDate = new Date($scope.datepicker.startDate.model);
        var endDate = new Date($scope.datepicker.endDate.model);

        var recentDownloads = {};
        recentDownloads.labels = [];
        recentDownloads.data = [];

        _.forEach(gem.gemStatistics, function(gemStatistic) {
          if (new Date(gemStatistic.date) >= startDate && new Date(gemStatistic.date) <= endDate) {
            recentDownloads.labels.push(gemStatistic.date.replace(/T.+/, ''));
            recentDownloads.data.push(gemStatistic.recentDownloads);
          }
        });

        $scope.recentDownloads.labels = recentDownloads.labels;
        $scope.recentDownloads.data = [recentDownloads.data];
      };

      $scope.datepicker.lastDays = function(days) {
        var startDate;
        if (days == 'all') {
          startDate = $scope.datepicker.minDate;
        } else {
          startDate = _.takeRight(dates, days)[0];
        }
        $scope.datepicker.startDate.model = startDate;
        $scope.datepicker.endDate.model = $scope.datepicker.maxDate;
        updateGraphs();
      };
      // set default date range to last 30 days
      $scope.datepicker.lastDays(30);
    }

  });
