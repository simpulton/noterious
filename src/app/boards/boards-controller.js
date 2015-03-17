'use strict';

angular.module('noterious')
  .controller('BoardsCtrl', function (currentUser, BoardsModel, UserModel) {
    var ctrl = this;

    UserModel.setCurrentUser(currentUser.uid);

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
          ctrl.getBoards();
        }, function (reason) {
          //
        });
    };

    ctrl.deleteBoard = function (boardId) {
      BoardsModel.destroy(boardId)
        .then(function (result) {
          ctrl.getBoards();
        }, function (reason) {
          //
        });
    };

    ctrl.getBoards();
  });
