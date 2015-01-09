'use strict';

angular.module('rubygemsTrackerApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }, {
      'title': 'Gems',
      'link': '/gems'
    }, {
      'title': 'Add gem',
      'link': '/gems/add'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
