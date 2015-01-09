'use strict';

angular.module('rubygemsTrackerApp')
  .controller('GemStatsCtrl', function ($scope, $http, $stateParams) {
    $scope.name = $stateParams.name;

    $http.get('/api/gems/'+$scope.name).success(function(data) {
      console.log('success', data);
      $scope.gem = data;
    }).error(function(data) {
      console.log('error', data);
    });
  });
