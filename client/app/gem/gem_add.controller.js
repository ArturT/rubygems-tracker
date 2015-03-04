'use strict';

angular.module('rubygemsTrackerApp.controllers')
  .controller('GemAddCtrl', function ($scope, $http, $state, GemService) {
    $scope.gemName = '';
    $scope.clickedSubmit = false;
    $scope.errors = [];

    $scope.addGem = function() {
      $scope.clickedSubmit = true;

      GemService.create($scope.gemName).then(function(response) {
        $state.go('gemsThanks', { name: $scope.gemName });
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
