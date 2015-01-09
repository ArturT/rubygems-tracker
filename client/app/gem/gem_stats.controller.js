'use strict';

angular.module('rubygemsTrackerApp')
  .controller('GemStatsCtrl', function ($scope, $http, $stateParams, GemService) {
    $scope.name = $stateParams.name;

    GemService.get($scope.name).success(function(data) {
      console.log('success', data);
      $scope.gem = data;
    }).error(function(data) {
      console.log('error', data);
    });
  });
