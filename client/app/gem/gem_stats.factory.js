'use strict';

angular.module('rubygemsTrackerApp.factories')
  .factory('GemStatsFactory', function (DateService) {
    return function (gemStatistics, datepicker) {
      var allDates = _.map(gemStatistics, function (gemStatistic) {
        return DateService.cutDate(gemStatistic.date);
      });

      this.allDates = allDates;
      this.minDate = allDates[0];
      this.maxDate = _(allDates).last();

      this.prepareChart = function (chart, seriesTitle, downloadsFieldName) {
        var downloads = _.map(gemStatistics, downloadsFieldName);

        chart.labels = allDates;
        chart.series = [seriesTitle];
        chart.data = [downloads];
      };

      this.updateChart = function (chart, downloadsFieldName) {
        var startDate = DateService.parseDatepickerDate(datepicker.startDate.model);
        var endDate = DateService.parseDatepickerDate(datepicker.endDate.model);
        var labels = [];
        var data = [];

        _.forEach(gemStatistics, function(gemStatistic) {
          var date = DateService.parseCuttedDate(gemStatistic.date);

          if (date >= startDate && date <= endDate) {
            labels.push(DateService.cutDate(gemStatistic.date));
            data.push(gemStatistic[downloadsFieldName]);
          }
        });

        chart.labels = labels;
        chart.data = [data];
      };

    };
  });
