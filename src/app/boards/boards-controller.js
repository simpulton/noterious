'use strict';

angular.module('noterious')
  .controller('BoardsCtrl', function (currentUser, BoardsModel, Gridster) {
    var ctrl = this;

    ctrl.loading = false;

    ctrl.newBoard = {
      title: '',
      description: '',
      isPublic: false
    };

    ctrl.resetForm = function () {
      ctrl.loading = false;
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
        }, function () {
          ctrl.resetForm();
        });
    };

    ctrl.createBoard = function (board, isValid) {
      if (isValid) {
        ctrl.loading = true;

        BoardsModel.create(board)
          .then(function (result) {
            ctrl.getBoards();
          })
          .catch(function (reason) {
            //
          })
          .finally(function () {
            ctrl.resetForm();
          });
      }
    };

    ctrl.updateBoard = function (boardId, board, isValid) {
      if (isValid) {
        ctrl.loading = true;
        BoardsModel.update(boardId, board)
          .then(function (result) {
            ctrl.getBoards();
          })
          .catch(function (reason) {
            //
          })
          .finally(function () {
            ctrl.cancelEditing();
          });
      }
    };

    ctrl.deleteBoard = function (boardId) {
      BoardsModel.destroy(boardId)
        .then(function (result) {
          ctrl.getBoards();
        })
        .catch(function (reason) {
          //
        })
        .finally(function () {
          ctrl.cancelEditing();
        });
    };

    ctrl.setEditedBoard = function (boardId, board) {
      ctrl.editedBoardId = boardId;
      ctrl.editedBoard = angular.copy(board);
      ctrl.isEditing = true;
    };

    ctrl.isCurrentBoard = function (boardId) {
      return ctrl.editedBoard !== null && ctrl.editedBoardId === boardId;
    };

    ctrl.cancelEditing = function () {
      ctrl.loading = false;
      ctrl.editedBoardId = null;
      ctrl.editedBoard = null;
      ctrl.isEditing = false;
    };

    ctrl.gridsterOpts = Gridster.getOptions();

    ctrl.getBoards();
  });

