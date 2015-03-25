'use strict';

describe('Directive: board directives', function() {
  beforeEach(module('noterious'));
  beforeEach(module('noteriousTmpl'));

  var element;

  describe('"simpleBoard"', function() {
    beforeEach(inject(function($rootScope, $compile) {
      element = angular.element('<simple-board></simple-board>');

      $compile(element)($rootScope);

      $rootScope.$digest();
    }));

    it('should be defined', function() {
      expect(element.html().length).toBeGreaterThan(0);
    });
  });

  describe('"board"', function() {
    beforeEach(inject(function($rootScope, $compile) {
      element = angular.element('<div board=""></div>');

      $compile(element)($rootScope);

      $rootScope.$digest();
    }));

    it('should be defined', function() {
      expect(element.html().length).toBeGreaterThan(0);
    });
  });

});