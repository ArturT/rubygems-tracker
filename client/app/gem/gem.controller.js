'use strict';

angular.module('rubygemsTrackerApp.controllers')
  .controller('GemCtrl', function ($scope, $http, GemService) {
    $scope.gems = [];

    GemService.all().then(function(response) {
      $scope.gems = response.data;
    });
  });
