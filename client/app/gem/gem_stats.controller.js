'use strict';

angular.module('rubygemsTrackerApp')
  .controller('GemStatsCtrl', function ($scope, $http, $stateParams) {
    $scope.name = $stateParams.name;
  });
