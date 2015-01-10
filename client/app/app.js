'use strict';

angular.module('rubygemsTrackerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('404', {
        url: '/404',
        templateUrl: 'app/errors/404.html'
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
