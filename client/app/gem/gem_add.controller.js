'use strict';

angular.module('rubygemsTrackerApp.controllers')
  .controller('GemAddCtrl', function ($scope, $http, GemService) {
    $scope.gemName = '';
    $scope.savedGem = false;
    $scope.hasError = false;
    $scope.clickedSubmit = false;

    $scope.addGem = function() {
      if($scope.gemName === '') {
        $scope.hasError = true;
        return;
      }
      $scope.clickedSubmit = true;
      GemService.create($scope.gemName).then(function(data){
        $scope.savedGem = true;
      }, function(data) {
        $scope.hasError = true;
        $scope.clickedSubmit = false;
      });
    };
  });
