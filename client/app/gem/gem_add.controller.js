'use strict';

angular.module('rubygemsTrackerApp')
  .controller('GemAddCtrl', function ($scope, $http) {
    $scope.submittedForm = false;

    $scope.addGem = function() {
      if($scope.newGem === '') {
        return;
      }
      $http.post('/api/gems', { name: $scope.newGem });
      $scope.submittedForm = true;
    };
  });
