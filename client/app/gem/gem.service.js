'use strict';

angular.module('rubygemsTrackerApp.services')
  .service('GemService', function ($http) {
    var endpoint = '/api/gems';

    this.all = function() {
      return $http.get(endpoint);
    };

    this.get = function(gemName) {
      return $http.get(endpoint + '/' + gemName);
    };

    this.create = function(gemName) {
      return $http.post(endpoint, { name: gemName });
    };
  });

