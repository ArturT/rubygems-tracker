'use strict';

angular.module('rubygemsTrackerApp.services', []);
angular.module('rubygemsTrackerApp.controllers', [
  'rubygemsTrackerApp.services',
  'chart.js'
]);

angular.module('rubygemsTrackerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'rubygemsTrackerApp.controllers'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('404', {
        url: '/404',
        templateUrl: 'components/errors/404.html'
      });

    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .run(function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function() {
      $state.go('404');
    });
  });
