'use strict';

angular.module('rubygemsTrackerApp.controllers')
  .controller('GemAddCtrl', function ($scope, $http, GemService) {
    $scope.newGem = '';
    $scope.savedGem = false;
    $scope.hasError = false;
    $scope.clickedSubmit = false;

    $scope.addGem = function() {
      if($scope.newGem === '') {
        $scope.hasError = true;
        return;
      }
      $scope.clickedSubmit = true;
      GemService.create($scope.newGem).success(function(data){
        $scope.savedGem = true;
      }).error(function(data) {
        $scope.hasError = true;
        $scope.clickedSubmit = false;
      });
    };
  });
