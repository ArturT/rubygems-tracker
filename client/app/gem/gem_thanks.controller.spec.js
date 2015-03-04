'use strict';

describe('Controller: GemThanksCtrl', function () {

  beforeEach(module('rubygemsTrackerApp.controllers'));

  var GemThanksCtrl,
      $stateParams,
      scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    $stateParams = { name: 'knapsack' };

    GemThanksCtrl = $controller('GemThanksCtrl', {
      $scope: scope,
      $stateParams: $stateParams
    });
  }));

  it('should attach a gem name to the scope', function () {
    expect(scope.gemName).toEqual('knapsack');
  });
});
