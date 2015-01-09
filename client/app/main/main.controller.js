'use strict';

angular.module('rubygemsTrackerApp')
  .controller('MainCtrl', function ($scope, $http, GemService) {
    $scope.gems = [];

    GemService.all().success(function(gems) {
      $scope.gems = gems;
    });
  });
