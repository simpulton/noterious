'use strict';

describe("Service: Auth", function() {
  beforeEach(module('noterious'));

  var Auth;

  beforeEach(inject(function(_Auth_) {
    Auth = _Auth_;
  }));

  it('should be defined', function() {
    expect(Auth).toBeDefined();
  });
});