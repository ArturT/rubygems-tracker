'use strict';

angular.module('rubygemsTrackerApp.controllers')
  .controller('GemAddCtrl', function ($scope, $http, GemService) {
    $scope.gemName = '';
    $scope.savedGem = false;
    $scope.clickedSubmit = false;
    $scope.errors = [];

    $scope.addGem = function() {
      $scope.clickedSubmit = true;

      GemService.create($scope.gemName).then(function(response) {
        $scope.savedGem = true;
      }, function(response) {
        $scope.clickedSubmit = false;

        var errors = [];
        var resErrors = response.data.errors;
        for (var key in resErrors) {
          errors.push(resErrors[key].message);
        }
        $scope.errors = errors;
      });
    };
  });
