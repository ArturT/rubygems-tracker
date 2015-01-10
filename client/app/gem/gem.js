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
      })
      .state('gemStats', {
        url: '/gems/:name',
        templateUrl: 'app/gem/gem_stats.html',
        controller: 'GemStatsCtrl',
        resolve: {
          promiseGem: function(GemService, $stateParams) {
            return GemService.get($stateParams.name);
          }
        }
      });
  });
