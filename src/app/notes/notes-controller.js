'use strict';

angular.module('noterious')
  .controller('NotesCtrl', function (BoardsModel, NotesModel, $stateParams, $state, $scope) {
    var ctrl = this,
      boardId = $stateParams.boardId;

    ctrl.loading = false;

    ctrl.newNote = {
      title: '',
      content: ''
    };

    ctrl.goBack = function() {
      $state.go('boards');
    };

    ctrl.resetForm = function () {
      ctrl.loading = false;
      ctrl.newNote = {
        title: '',
        content: ''
      };
    };

    ctrl.getBoard = function () {
      BoardsModel.fetch(boardId)
        .then(function (board) {
          ctrl.board = board;
          ctrl.notes = board.notes;
        }, function (reason) {
          //
        });
    };

    ctrl.createNote = function (note, isValid) {
      if (isValid) {
        ctrl.loading = true;

        note.board = boardId;
        NotesModel.create(note)
          .then(function (result) {
            ctrl.getBoard();
          })
          .catch(function (reason) {
            //
          })
          .finally(function() {
            ctrl.resetForm();
          });
      }
    };

    ctrl.updateNote = function (noteId, note, isValid) {
      if (isValid) {
        ctrl.loading = true;

        NotesModel.update(noteId, note)
          .then(function (result) {
            ctrl.getBoard();
          })
          .catch(function (reason) {
            //
          })
          .finally(function() {
            ctrl.resetForm();
          });
      }
    };

    ctrl.deleteNote = function (noteId) {
      NotesModel.destroy(noteId)
        .then(function (result) {
          ctrl.getBoard();
        })
        .catch(function (reason) {
          //
        })
        .finally(function() {
          ctrl.cancelEditing();
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
      ctrl.loading = false;
      ctrl.editedNoteId = null;
      ctrl.editedNote = null;
      ctrl.isEditing = false;
    };

    ctrl.getBoard();
  });
