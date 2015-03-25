'use strict';

describe("Service: NotesModel", function() {
  beforeEach(module('noterious'));

  var NotesModel;

  beforeEach(inject(function(_NotesModel_) {
    NotesModel = _NotesModel_;
  }));

  it('should be defined', function() {
    expect(NotesModel).toBeDefined();
  });
});