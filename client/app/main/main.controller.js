'use strict';

angular.module('rubygemsTrackerApp.controllers')
  .controller('MainCtrl', function ($scope, $http, GemService) {
    var selectedGems = ['knapsack'];

    $scope.gems = [];

    GemService.all().success(function(gems) {
      $scope.gems = _.filter(gems, function(gem) {
        return _.contains(selectedGems, gem.name);
      });
    });
  });
