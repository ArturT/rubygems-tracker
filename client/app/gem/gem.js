'use strict';

angular.module('rubygemsTrackerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('gems', {
        url: '/gems',
        templateUrl: 'app/gem/index.html',
        controller: 'GemCtrl'
      })
      .state('gemsAdd', {
        url: '/gems/add',
        templateUrl: 'app/gem/add.html',
        controller: 'GemAddCtrl'
      });
  });
