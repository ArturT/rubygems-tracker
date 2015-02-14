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

  describe('#get', function () {
    var gem = { name: 'knapsack' };
    var result;

    it('returns gem', function () {
      $httpBackend.expectGET('/api/gems/' + gem.name).respond(gem);
      GemService.get(gem.name).success(function(data) {
        result = data;
      });
      $httpBackend.flush();
      expect(angular.equals(result, gem)).toBe(true);
    });
  });

  describe('#getDetails', function () {
    var gem = { name: 'knapsack' };
    var result;

    it('returns gem details', function () {
      $httpBackend.expectGET('/api/gems/' + gem.name + '/details').respond(gem);
      GemService.getDetails(gem.name).success(function(data) {
        result = data;
      });
      $httpBackend.flush();
      expect(angular.equals(result, gem)).toBe(true);
    });
  });

  describe('#getVersions', function () {
    var gemName = 'knapsack';
    var gemVersions = [{ number: '1.0.0' }, { number: '1.0.1' }];
    var result;

    it('returns gem versions', function () {
      $httpBackend.expectGET('/api/gems/' + gemName + '/versions').respond(gemVersions);
      GemService.getVersions(gemName).success(function(data) {
        result = data;
      });
      $httpBackend.flush();
      expect(angular.equals(result, gemVersions)).toBe(true);
    });
  });

  describe('#create', function () {
    var gem = { name: 'knapsack' };
    var result;

    it('creates gem', function () {
      $httpBackend.expectPOST('/api/gems').respond(gem);
      GemService.create(gem.name).success(function(data) {
        result = data;
      });
      $httpBackend.flush();
      expect(angular.equals(result, gem)).toBe(true);
    });
  });
});
