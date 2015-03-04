'use strict';

angular.module('rubygemsTrackerApp.controllers')
  .controller('GemThanksCtrl', function ($scope, $stateParams) {
    $scope.gemName = $stateParams.name;
  });
