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

    this.getDetails = function(gemName) {
      return $http.get(endpoint + '/' + gemName + '/details');
    };

    this.getVersions = function(gemName) {
      return $http.get(endpoint + '/' + gemName + '/versions');
    };

    this.create = function(gemName) {
      return $http.post(endpoint, { name: gemName });
    };
  });

