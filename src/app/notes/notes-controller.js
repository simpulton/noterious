'use strict';

angular.module('noterious')
  .controller('NotesCtrl', function (currentUser, BoardsModel, NotesModel, UserModel, $routeParams) {
    var ctrl = this,
      boardId = $routeParams.boardId;

    UserModel.setCurrentUser(currentUser.uid);

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
          console.log('ctrl.board', ctrl.board);
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
        }, function (reason) {
          //
        });
    };

    ctrl.deleteNote = function (noteId) {
      NotesModel.destroy(boardId, noteId)
        .then(function (result) {
          ctrl.getNotes();
        }, function (reason) {
          //
        });
    };

    ctrl.getBoard();
    ctrl.getNotes();
  });
