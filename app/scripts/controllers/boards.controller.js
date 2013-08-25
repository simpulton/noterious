'use strict';

angular.module('noteriousApp')
    .controller('BoardsCtrl', function ($scope, NoteriousService, angularFire) {
        var setupBoards = function() {
            var boardsUrl = 'https://noterious.firebaseio.com/boards';
            var boardsRef = new Firebase(boardsUrl);
            var boardsPromise = angularFire(boardsRef, $scope, 'boards', {});

            boardsPromise.then(function () {
                $scope.createBoard = function (title, description, isPublic) {
                    var boardId = boardsRef.push().name();

                    $scope.boards[boardId] = {
                        userId: $scope.userId, title: title, description: description, isPublic: isPublic
                    };

                    $scope.createUserBoard(boardId);
                };
                $scope.removeBoard = function (boardId) {
                    delete $scope.boards[boardId];

                    $scope.removeUserBoard(boardId);
                };
            });
        }

        var setupUserBoards = function() {
            var userBoardsUrl = 'https://noterious.firebaseio.com/users/' + $scope.userId + '/boards';
            var userBoardsRef = new Firebase(userBoardsUrl);
            var userBoardsPromise = angularFire(userBoardsRef, $scope, 'userBoards', {});
            userBoardsPromise.then(function () {
                $scope.createUserBoard = function (boardId) {
                    $scope.userBoards[userBoardsRef.push().name()] = { boardId: true };
                };
                $scope.removeUserBoard = function (boardId) {
                    delete $scope.userBoards[boardId];
                };
            });
        }

        $scope.$on('onLogin', function(){
            $scope.userId = NoteriousService.getCurrentUser().id;
            setupBoards();
            setupUserBoards();
        })

        if(NoteriousService.getCurrentUser() !== null) {
            setupBoards();
            setupUserBoards();
        }
    });
