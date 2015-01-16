'use strict';

describe('Service: GemService', function () {
  beforeEach(module('rubygemsTrackerApp.services'));

  var GemService, $httpBackend;

  beforeEach(inject(function (_$httpBackend_, $injector) {
    GemService = $injector.get('GemService');
    $httpBackend = _$httpBackend_;
  }));

  describe('#all', function () {
    var gems = ['knapsack', 'rails'];
    var result;

    it('returns all gems', function () {
      $httpBackend.expectGET('/api/gems').respond(gems);
      GemService.all().success(function(data) {
        result = data;
      });
      $httpBackend.flush();
      expect(angular.equals(result, gems)).toBe(true);
    });
  });
});
