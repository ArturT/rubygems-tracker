'use strict';

angular.module('rubygemsTrackerApp.controllers')
  .controller('GemAddCtrl', function ($scope, $http, GemService) {
    $scope.gemName = '';
    $scope.savedGem = false;
    $scope.hasError = false;
    $scope.clickedSubmit = false;

    $scope.addGem = function() {
      $scope.error = undefined;

      if($scope.gemName === '') {
        $scope.hasError = true;
        return;
      }

      $scope.clickedSubmit = true;

      GemService.create($scope.gemName).then(function(response){
        $scope.savedGem = true;
      }, function(response) {
        $scope.hasError = true;
        $scope.clickedSubmit = false;
        $scope.error = response.data.err;
      });
    };
  });
