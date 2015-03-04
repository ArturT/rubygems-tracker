'use strict';

describe('Controller: GemAddCtrl', function () {

  beforeEach(module('rubygemsTrackerApp'));

  var GemAddCtrl,
      GemService,
      scope,
      $state,
      $q;

  beforeEach(inject(function (_$q_, $controller, $rootScope, _$state_, _GemService_) {
    $q = _$q_;
    $state = _$state_;
    GemService = _GemService_;

    scope = $rootScope.$new();
    GemAddCtrl = $controller('GemAddCtrl', {
      $scope: scope,
      $state: $state,
      GemService: GemService
    });
  }));

  it('has default values on scope', function () {
    expect(scope.gemName).toEqual('');
    expect(scope.gemName).toEqual('');
    expect(scope.clickedSubmit).toBe(false);
    expect(scope.errors.length).toBe(0);
  });

  describe('add new gem', function () {
    describe('when success', function () {
      beforeEach(function () {
        spyOn(GemService, 'create').andCallFake(function () {
          var deferred = $q.defer();
          deferred.resolve({});
          return deferred.promise;
        });

        spyOn($state, 'go').andCallFake(function(state, params) {});

        scope.gemName = 'knapsack';
        scope.addGem();
        scope.$digest();
      });

      it('saved gem', function () {
        expect(scope.gemName).toEqual('knapsack');
        expect(scope.clickedSubmit).toBe(true);
        expect(scope.errors.length).toBe(0);
        expect($state.go).toHaveBeenCalledWith('gemsThanks', { name: 'knapsack' });
      });
    });

    describe('when failure', function () {
      var errMsg = 'Error message';
      var response = { data: { errors: { name: { message: errMsg } } } };

      beforeEach(function () {
        spyOn(GemService, 'create').andCallFake(function () {
          var deferred = $q.defer();
          deferred.reject(response);
          return deferred.promise;
        });
        scope.gemName = 'knapsack';
        scope.addGem();
        scope.$digest();
      });

      it('not save gem', function () {
        expect(scope.gemName).toEqual('knapsack');
        expect(scope.clickedSubmit).toBe(false);
        expect(scope.errors.length).toBe(1);
        expect(scope.errors[0]).toEqual(errMsg);
      });
    });
  });
});
