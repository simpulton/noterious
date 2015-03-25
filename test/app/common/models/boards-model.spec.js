'use strict';

describe("Service: BoardsModel", function() {
  beforeEach(module('noterious'));

  var BoardsModel;

  beforeEach(inject(function(_BoardsModel_) {
    BoardsModel = _BoardsModel_;
  }));

  it('should be defined', function() {
    expect(BoardsModel).toBeDefined();
  });
});