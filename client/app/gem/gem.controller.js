'use strict';

angular.module('rubygemsTrackerApp')
  .controller('GemCtrl', function ($scope, $http, GemService) {
    $scope.gems = [];

    GemService.all().success(function(gems) {
      $scope.gems = gems;
    });
  });
