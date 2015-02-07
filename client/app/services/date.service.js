'use strict';

angular.module('rubygemsTrackerApp.services')
  .service('DateService', function () {
    var cutDate = function (date) {
      return date.replace(/T.+/, '');
    };
    this.cutDate = cutDate;

    var parseCuttedDate = function (date) {
      return Date.parse(cutDate(date));
    };
    this.parseCuttedDate = parseCuttedDate;

    this.parseDatepickerDate = function (dateModel) {
      return parseCuttedDate(dateModel.toJSON());
    };
  });
