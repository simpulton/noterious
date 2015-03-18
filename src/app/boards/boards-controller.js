'use strict';

angular.module('noterious')
  .controller('BoardsCtrl', function (currentUser, BoardsModel, UserModel) {
    var ctrl = this;

    ctrl.newBoard = {
      title: '',
      description: '',
      isPublic: false
    };

    ctrl.resetForm = function () {
      ctrl.newBoard = {
        title: '',
        description: '',
        isPublic: false
      };
    };

    ctrl.getBoards = function () {
      BoardsModel.all()
        .then(function (result) {
          ctrl.boards = (result !== 'null') ? result : {};
        }, function (reason) {
          //
        });
    };

    ctrl.createBoard = function (board) {
      BoardsModel.create(board)
        .then(function (result) {
          ctrl.resetForm();
          ctrl.getBoards();
        }, function (reason) {
          //
        });
    };

    ctrl.updateBoard = function (boardId, board) {
      BoardsModel.update(boardId, board)
        .then(function (result) {
          ctrl.cancelEditing();
          ctrl.getBoards();
        }, function (reason) {
          //
        });
    };

    ctrl.deleteBoard = function (boardId) {
      BoardsModel.destroy(boardId)
        .then(function (result) {
          ctrl.cancelEditing();
          ctrl.getBoards();
        }, function (reason) {
          //
        });
    };

    ctrl.setEditedBoard = function(boardId, board) {
      ctrl.editedBoardId = boardId;
      ctrl.editedBoard = angular.copy(board);
      ctrl.isEditing = true;
    };

    ctrl.isCurrentBoard = function(boardId) {
      return ctrl.editedBoard !== null && ctrl.editedBoardId === boardId;
    };

    ctrl.cancelEditing = function() {
      ctrl.editedBoardId = null;
      ctrl.editedBoard = null;
      ctrl.isEditing = false;
    };

    ctrl.getBoards();
  });
