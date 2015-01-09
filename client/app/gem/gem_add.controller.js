'use strict';

angular.module('rubygemsTrackerApp')
  .controller('GemAddCtrl', function ($scope, $http) {
    $scope.addGem = function() {
      if($scope.newGem === '') {
        return;
      }
      $http.post('/api/gems', { name: $scope.newGem });
      $scope.newGem = '';
    };
  });
