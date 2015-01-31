'use strict';

describe('Controller: GemStatsCtrl', function () {

  beforeEach(module('rubygemsTrackerApp.controllers'));

  var GemStatsCtrl,
      scope;
  var gem = { name: 'knapsack', gemStatistics: [] };
  var promiseGem = { data: gem };

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GemStatsCtrl = $controller('GemStatsCtrl', {
      $scope: scope,
      promiseGem: promiseGem
    });
  }));

  it('should attach a gem to the scope', function () {
    expect(angular.equals(scope.gem, gem)).toBe(true);
  });
});
