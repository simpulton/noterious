'use strict';

describe("Directive: note", function() {
  beforeEach(module('noterious'));
  beforeEach(module('noteriousTmpl'));

  var element;

  beforeEach(function() {

    inject(function($rootScope, $compile) {
      element = angular.element('<div note=""></div>');

      $compile(element)($rootScope);

      $rootScope.$digest();
    })
  });

  it('should be defined', function() {
    expect(element.html().length).toBeGreaterThan(0);
  });
});