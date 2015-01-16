'use strict';

angular.module('rubygemsTrackerApp.controllers')
  .controller('GemStatsCtrl', function ($scope, $http, promiseGem) {
    $scope.gem = promiseGem.data;
  });
