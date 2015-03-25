'use strict';

describe('Directive: colorPicker', function() {
  beforeEach(module('noterious'));
  beforeEach(module('noteriousTmpl'));

  var element;

  beforeEach(inject(function($rootScope, $compile) {
    element = angular.element('<color-picker></color-picker>');

    $compile(element)($rootScope);

    $rootScope.$digest();
  }));

  it('should be defined', function() {
    expect(element.html().length).toBeGreaterThan(0);
  });
});