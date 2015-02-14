'use strict';

angular.module('rubygemsTrackerApp.controllers')
  .controller('GemStatsCtrl', function ($scope, $http, promiseGem, GemStatsFactory, GemService, DateService) {
    var gem = promiseGem.data;

    $scope.gem = gem;
    $scope.gemTotalDownloads = gem.totalDownloads;
    $scope.enabledStats = false;
    $scope.recentDownloads = {};
    $scope.totalDownloads = {};

    if (gem.gemStatistics.length > 1) {
      $scope.enabledStats = true;

      // DatePicker
      $scope.datepicker = {};

      var gemStatsFactory = new GemStatsFactory(
        gem.gemStatistics,
        $scope.datepicker
      );
      gemStatsFactory.prepareChart(
        $scope.recentDownloads,
        'Recent downloads',
        'recentDownloads'
      );
      gemStatsFactory.prepareChart(
        $scope.totalDownloads,
        'Total downloads',
        'totalDownloads'
      );
      var updateCharts = function () {
        gemStatsFactory.updateChart($scope.recentDownloads, 'recentDownloads');
        gemStatsFactory.updateChart($scope.totalDownloads, 'totalDownloads');
      };

      $scope.datepicker.startDate = {};
      $scope.datepicker.endDate = {};
      $scope.datepicker.minDate = gemStatsFactory.minDate;
      $scope.datepicker.maxDate = gemStatsFactory.maxDate;
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

      $scope.datepicker.lastDays = function(days) {
        var startDate;
        if (days == 'all') {
          startDate = $scope.datepicker.minDate;
        } else {
          startDate = _.takeRight(gemStatsFactory.allDates, days)[0];
        }
        $scope.datepicker.startDate.model = new Date(startDate);
        $scope.datepicker.endDate.model = new Date($scope.datepicker.maxDate);
        $scope.datepicker.lastDaysValue = days;
        updateCharts();
      };
      // set default date range to last 30 days
      $scope.datepicker.lastDays(30);

      var openedHandler = function (newValue) {
        if (newValue == false) $scope.datepicker.lastDaysValue = null;
      };

      $scope.$watch('datepicker.startDate.model', updateCharts);
      $scope.$watch('datepicker.endDate.model', updateCharts);
      $scope.$watch('datepicker.startDate.opened', openedHandler);
      $scope.$watch('datepicker.endDate.opened', openedHandler);
    }

    GemService.getDetails(gem.name).success(function(data) {
      $scope.gemTotalDownloads = data.downloads;
      $scope.gemDetails = data;
    });

    GemService.getVersions(gem.name).success(function(data) {
      $scope.gemBuiltAt = data[0].built_at;

      var gemVersionsChart = {
        labels: [],
        data: [],
        type: 'PolarArea'
      };

      var sortedData = _.sortBy(data, _.property('downloads_count')).reverse();

      _.forEach(sortedData, function (gemVersion) {
        if (gemVersionsChart.labels.length < 6) {
          var label = gemVersion.number + ' (Released ' + DateService.cutDate(gemVersion.built_at) + ')';
          gemVersionsChart.labels.push(label);
          gemVersionsChart.data.push(gemVersion.downloads_count);
        }
      });

      gemVersionsChart.toggle = function () {
        $scope.gemVersionsChart.type = $scope.gemVersionsChart.type === 'PolarArea' ?
          'Pie' : 'PolarArea';
      };

      $scope.gemVersionsChart = gemVersionsChart;
    });
  });
