'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('rubygemsTrackerApp.controllers'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/gems')
      .respond([{
        name: 'knapsack'
      }, {
        name: 'rails'
      }]);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of selected gems to the scope', function () {
    $httpBackend.flush();
    expect(scope.gems.length).toBe(1);
  });
});
