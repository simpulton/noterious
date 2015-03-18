'use strict';

angular.module('noterious')
  .controller('NotesCtrl', function (currentUser, BoardsModel, NotesModel, UserModel, $stateParams) {
    var ctrl = this,
      boardId = $stateParams.boardId;

    ctrl.newNote = {
      title: '',
      content: ''
    };

    ctrl.resetForm = function () {
      ctrl.newNote = {
        title: '',
        content: ''
      };
    };

    ctrl.getBoard = function () {
      BoardsModel.fetch(boardId)
        .then(function (board) {
          ctrl.board = board;
        }, function (reason) {
          //
        });
    };

    ctrl.getNotes = function () {
      NotesModel.all(boardId)
        .then(function (notes) {
          ctrl.notes = (notes !== 'null') ? notes : {};
        }, function (reason) {
          //
        });
    };

    ctrl.createNote = function (note) {
      NotesModel.create(boardId, note)
        .then(function (result) {
          ctrl.getNotes();
          ctrl.resetForm();
        }, function (reason) {
          //
        });
    };

    ctrl.updateNote = function (noteId, note) {
      NotesModel.update(boardId, noteId, note)
        .then(function (result) {
          ctrl.getNotes();
          ctrl.cancelEditing();
        }, function (reason) {
          //
        });
    };

    ctrl.deleteNote = function (noteId) {
      NotesModel.destroy(boardId, noteId)
        .then(function (result) {
          ctrl.getNotes();
          ctrl.cancelEditing();
        }, function (reason) {
          //
        });
    };

    ctrl.setEditedNote = function(noteId, note) {
      ctrl.editedNoteId = noteId;
      ctrl.editedNote = angular.copy(note);
      ctrl.isEditing = true;
    };

    ctrl.isCurrentNote = function(noteId) {
      return ctrl.editedNote !== null && ctrl.editedNoteId === noteId;
    };

    ctrl.cancelEditing = function() {
      ctrl.editedNoteId = null;
      ctrl.editedNote = null;
      ctrl.isEditing = false;
    };
    
    ctrl.getBoard();
    ctrl.getNotes();
  });
