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
                    // $scope.createUserBoard(boardId);
                };
                $scope.removeBoard = function (boardId) {
                    delete $scope.boards[boardId];
                    // $scope.removeUserBoard(boardId);
                };
            });
        };

        var setupUserBoards = function() {
            var userBoardsUrl = 'https://noterious.firebaseio.com/users/' + $scope.userId + '/boards';
            var userBoardsRef = new Firebase(userBoardsUrl);
            var userBoardsPromise = angularFire(userBoardsRef, $scope, 'userBoards', {});

            userBoardsPromise.then(function () {
                $scope.createUserBoard = function (boardId) {
                    if(typeof boardId !== 'undefined') {
                        $scope.userBoards[userBoardsRef.push().name()] = { boardId: true };
                    }
                };
                $scope.removeUserBoard = function (boardId) {
                    if(typeof boardId !== 'undefined') {
                        delete $scope.userBoards[boardId];
                    }
                };
            });
        };

        $scope.currentUser = function() {
            return NoteriousService.getCurrentUser();
        };

        $scope.$on('onLogin', function(){
            if($scope.currentUser() !== null) {
                $scope.userId = $scope.currentUser().id;
                setupBoards();
                setupUserBoards();
            }
        });

        if($scope.currentUser() !== null) {
            setupBoards();
            setupUserBoards();
        }
    });
