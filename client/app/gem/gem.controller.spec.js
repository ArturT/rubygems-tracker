'use strict';

describe('Controller: GemCtrl', function () {

  beforeEach(module('rubygemsTrackerApp.controllers'));

  var GemCtrl,
      GemService,
      scope,
      $q;
  var gems = ['knapsack', 'rails'];

  beforeEach(inject(function (_$q_, $controller, $rootScope, _GemService_) {
    $q = _$q_;
    GemService = _GemService_;

    spyOn(GemService, 'all').andCallFake(function () {
      var deferred = $q.defer();
      deferred.resolve({ data: gems });
      return deferred.promise;
    });

    scope = $rootScope.$new();
    GemCtrl = $controller('GemCtrl', {
      $scope: scope,
      GemService: GemService
    });
    scope.$apply();
  }));

  it('should attach a list of gems to the scope', function () {
    expect(angular.equals(scope.gems, gems)).toBe(true);
  });
});
