'use strict';

angular.module('noterious')
  .controller('NotesCtrl', function (currentUser, BoardsModel, NotesModel, $stateParams, $state) {
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

    ctrl.createNote = function (note, isValid) {
      if (isValid) {
        ctrl.loading = true;

        NotesModel.create(boardId, note)
          .then(function (result) {
            ctrl.getNotes();
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

        NotesModel.update(boardId, noteId, note)
          .then(function (result) {
            ctrl.getNotes();
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
      NotesModel.destroy(boardId, noteId)
        .then(function (result) {
          ctrl.getNotes();
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
    ctrl.getNotes();
  });
