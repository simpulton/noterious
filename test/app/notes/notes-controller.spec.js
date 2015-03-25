'use strict';

describe('Controller: NotesCtrl', function () {
  beforeEach(module('noterious'));
  beforeEach(module('noteriousTmpl'));

  var notesCtrl,
    scope,
    currentUser,
    mockBoardsModel,
    mockNotesModel,
    stateParams,
    state;

  beforeEach(inject(function ($templateCache, $controller, $rootScope, $q, $state) {
    currentUser = {};
    state = $state;
    stateParams = { boardId: 1 };
    scope = $rootScope.$new();

    var createPromise = function(returnData) {
      var deferred = $q.defer();
      deferred.resolve(returnData);
      return deferred.promise;
    };

    var createMocks = function() {
      mockBoardsModel = {
        fetch: function (boardId) {
          return createPromise({data: 'A board'})
        }
      };

      mockNotesModel = {
        all: function (boardId) {
          return createPromise({data: 'All board notes'})
        },
        create: function(boardId, note) {
          return createPromise({});
        },
        update: function(boardId, noteId, note) {
          return createPromise({});
        },
        destroy: function(boardId, noteId) {
          return createPromise({});
        }
      };
    };

    var createSpies = function() {
      spyOn(mockBoardsModel, 'fetch').and.callThrough();

      spyOn(mockNotesModel, 'all').and.callThrough();
      spyOn(mockNotesModel, 'create').and.callThrough();
      spyOn(mockNotesModel, 'update').and.callThrough();
      spyOn(mockNotesModel, 'destroy').and.callThrough();
    };

    createMocks();
    createSpies();

    notesCtrl = $controller('NotesCtrl', {
      currentUser: currentUser,
      BoardsModel: mockBoardsModel,
      NotesModel: mockNotesModel,
      $state: state,
      $stateParams: stateParams
    });
  }));

  it('should be defined', function () {
    expect(notesCtrl).toBeDefined();
  });

  it('should have default properties', function() {
    expect(stateParams.boardId).toEqual(1);
    expect(notesCtrl.loading).toBeFalsy();
    expect(notesCtrl.newNote).toEqual({title: '', content: ''});
  });

  it('should go back to "boards" state', function() {
    spyOn(state, 'go');

    notesCtrl.goBack();

    expect(state.go).toHaveBeenCalledWith('boards');
  });

  it('should reset the notes form', function() {
    expect(notesCtrl.loading).toBeFalsy();
    expect(notesCtrl.newNote).toEqual({title: '', content: ''});
  });

  it('should get a board', function() {
    notesCtrl.getBoard();

    expect(mockBoardsModel.fetch).toHaveBeenCalledWith(1);

    scope.$apply();

    expect(notesCtrl.board).toEqual({data: 'A board'});
  });

  it('should get all notes', function() {
    notesCtrl.getNotes();

    expect(mockNotesModel.all).toHaveBeenCalledWith(1);

    scope.$apply();

    expect(notesCtrl.notes).toEqual({data: 'All board notes'});
  });

  it('should create a note', function() {
    spyOn(notesCtrl,'getNotes');
    spyOn(notesCtrl, 'resetForm');

    notesCtrl.createNote({}, true);

    expect(notesCtrl.loading).toBeTruthy();
    expect(mockNotesModel.create).toHaveBeenCalledWith(1, {});

    scope.$apply();

    expect(notesCtrl.getNotes).toHaveBeenCalled();
    expect(notesCtrl.resetForm).toHaveBeenCalled();
  });

  it('should update a note', function() {
    spyOn(notesCtrl,'getNotes');
    spyOn(notesCtrl, 'resetForm');

    notesCtrl.updateNote(2, {}, true);

    expect(notesCtrl.loading).toBeTruthy();
    expect(mockNotesModel.update).toHaveBeenCalledWith(1, 2, {});

    scope.$apply();

    expect(notesCtrl.getNotes).toHaveBeenCalled();
    expect(notesCtrl.resetForm).toHaveBeenCalled();
  });

  it('should delete a note', function() {
    spyOn(notesCtrl,'getNotes');
    spyOn(notesCtrl, 'cancelEditing');

    notesCtrl.deleteNote(2);

    expect(mockNotesModel.destroy).toHaveBeenCalledWith(1,2);

    scope.$apply();

    expect(notesCtrl.getNotes).toHaveBeenCalled();
    expect(notesCtrl.cancelEditing).toHaveBeenCalled();
  });

  it('should set the note currently being edited', function() {
    var note = {name: 'A Note'};

    notesCtrl.setEditedNote(2, note);

    expect(notesCtrl.loading).toBeFalsy();
    expect(notesCtrl.editedNote).toEqual(note);
    expect(notesCtrl.isEditing).toBeTruthy();
  });

  it('should know if a note is the current note', function() {
    notesCtrl.editedNote = {name: "A Note"};
    notesCtrl.editedNoteId = 2;

    var isCurrentNote = notesCtrl.isCurrentNote(2);

    expect(isCurrentNote).toBeTruthy();
  });

  it('should cancel editing', function() {
    notesCtrl.editedNote = {name: "A Note"};
    notesCtrl.editedNoteId = 2;
    notesCtrl.isEditing = true;
    notesCtrl.loading = true;

    notesCtrl.cancelEditing();

    expect(notesCtrl.loading).toBeFalsy();
    expect(notesCtrl.editedNoteId).toBeNull();
    expect(notesCtrl.editedNote).toBeNull();
    expect(notesCtrl.isEditing).toBeFalsy();
  });

});