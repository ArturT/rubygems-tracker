'use strict';

angular.module('rubygemsTrackerApp')
  .controller('GemAddCtrl', function ($scope, $http) {
    $scope.savedGem = false;
    $scope.hasError = false;
    $scope.clickedSubmit = false;

    $scope.addGem = function() {
      if($scope.newGem === '') {
        return;
      }
      $scope.clickedSubmit = true;
      $http.post('/api/gems', { name: $scope.newGem }).success(function(data){
        $scope.savedGem = true;
      }).error(function(data) {
        $scope.hasError = true;
        $scope.clickedSubmit = false;
      });
    };
  });
