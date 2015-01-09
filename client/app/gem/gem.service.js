'use strict';

angular.module('rubygemsTrackerApp')
  .service('GemService', function ($http) {
    var endpoint = '/api/gems';

    this.all = function() {
      return $http.get(endpoint);
    };

    this.create = function(gemName) {
      return $http.post(endpoint, { name: gemName });
    };
  });

