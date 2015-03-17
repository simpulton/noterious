'use strict';

angular.module('noterious')
  .controller('BoardsCtrl', function (currentAuth) {
    var boards = this;

    console.log('currentAuth', currentAuth);


    /*
    var setupBoards = function () {
      var boardsUrl, boardsRef, boardsPromise;

      boardsUrl = 'https://noterious.firebaseio.com/users/' + UserModel.getCurrentUserId() + '/boards';
      boardsRef = new Firebase(boardsUrl);
      boardsPromise = $firebaseArray(boardsRef, $scope, 'boards');

      boardsPromise.then(function (disassociate) {
        $scope.createBoard = function (board) {
          var boardId = boardsRef.push().name();

          $scope.boards[boardId] = {
            userId: UserModel.getCurrentUserId(), title: board.title, description: board.description, isPublic: board.isPublic
          };
        };
        $scope.deleteBoard = function (boardId) {
          delete $scope.boards[boardId];
        };

        $scope.disassociateModel = disassociate;
      });
    };

    $scope.newBoard = {
      title: '',
      description: '',
      isPublic: false
    };

    $scope.resetForm = function () {
      $scope.newBoard = {
        title: '',
        description: '',
        isPublic: false
      };
    };

    $scope.$on('onLogin', function () {
      setupBoards();
    });

    $scope.$on('onLogout', function () {
      // $scope.disassociateModel();
    });

    $scope.loading = function () {
      return UserModel.loading();
    };

    $scope.userExists = function () {
      return UserModel.userExists();
    };

    // If a user and content has been loaded
    if ($scope.userExists()) {
      setupBoards();
    }
    */
  });
