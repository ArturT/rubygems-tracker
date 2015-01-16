'use strict';

describe('Controller: GemCtrl', function () {

  beforeEach(module('rubygemsTrackerApp.controllers'));

  var GemCtrl,
      GemServiceSpy,
      scope;
  var gems = ['knapsack', 'rails'];

  beforeEach(inject(function ($controller, $rootScope) {
    GemServiceSpy = {
      all: function() {
        return {
          success: function(cb) {
            return cb(gems);
          }
        };
      }
    };

    scope = $rootScope.$new();
    GemCtrl = $controller('GemCtrl', {
      $scope: scope,
      GemService: GemServiceSpy
    });
  }));

  it('should attach a list of gems to the scope', function () {
    expect(angular.equals(scope.gems, gems)).toBe(true);
  });
});
