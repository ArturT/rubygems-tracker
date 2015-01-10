'use strict';

angular.module('rubygemsTrackerApp')
  .controller('GemStatsCtrl', function ($scope, $http, promiseGem) {
    $scope.gem = promiseGem.data;
  });
