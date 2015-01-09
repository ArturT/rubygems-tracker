'use strict';

angular.module('rubygemsTrackerApp')
  .controller('GemCtrl', function ($scope, $http) {
    $scope.gems = [];

    $http.get('/api/gems').success(function(gems) {
      $scope.gems = gems;
    });
  });
