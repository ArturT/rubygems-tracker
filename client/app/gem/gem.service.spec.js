'use strict';

describe('Service: GemService', function () {
  beforeEach(module('rubygemsTrackerApp'));

  var GemService, $httpBackend;

  beforeEach(inject(function (_$httpBackend_, $injector) {
    //var $injector = module('rubygemsTrackerApp');
    GemService = $injector.get('GemService');
    $httpBackend = _$httpBackend_;
  }));

  describe('#all', function () {
    var gems = ['knapsack', 'rails'];

    it('returns all gems', function () {
      $httpBackend.expectGET('/api/gems').respond(gems);
      var result = GemService.all();
      $httpBackend.flush();
      expect(result.length).toBe(gems.length);
    });
  });
});
