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
      $scope.datepicker.format = 'yyyy-MM-dd';

      $scope.datepicker.minDate = dates[0];
      $scope.datepicker.startDate.model = $scope.datepicker.minDate;

      $scope.datepicker.maxDate = _(dates).last();
      $scope.datepicker.endDate.model = $scope.datepicker.maxDate;

      $scope.datepicker.open = function($event, dateType) {
        $event.preventDefault();
        $event.stopPropagation();
        if (dateType == 'startDate') {
          $scope.datepicker.startDate.opened = true;
        } else if (dateType == 'endDate') {
          $scope.datepicker.endDate.opened = true;
        }
      };
    }

  });
