'use strict';

angular.module('rubygemsTrackerApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.gems = [];

    $http.get('/api/gems').success(function(gems) {
      $scope.gems = gems;
    });
  });
