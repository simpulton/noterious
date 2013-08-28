'use strict';

angular.module('noteriousApp')
    .controller('BoardsCtrl', function ($scope, UserService, angularFire) {
        var setupBoards = function () {
            var boardsUrl, boardsRef, boardsPromise;

            boardsUrl = 'https://noterious.firebaseio.com/users/' + UserService.getCurrentUserId() + '/boards';
            boardsRef = new Firebase(boardsUrl);
            boardsPromise = angularFire(boardsRef, $scope, 'boards', {});

            boardsPromise.then(function (disassociate) {
                $scope.createBoard = function (title, description, isPublic) {
                    var boardId = boardsRef.push().name();

                    $scope.boards[boardId] = {
                        userId: UserService.getCurrentUserId(), title: title, description: description, isPublic: isPublic
                    };
                };
                $scope.removeBoard = function (boardId) {
                    delete $scope.boards[boardId];
                };

                $scope.disassociateModel = disassociate;;
            });
        };

        $scope.$on('onLogin', function () {
            setupBoards();
        });

        $scope.$on('onLogout', function () {
            $scope.disassociateModel();
        });

        $scope.loading = function () {
            return UserService.loading();
        };

        $scope.userExists = function() {
            return UserService.userExists();
        };

        // If a user and content has been loaded
        if ($scope.userExists()) {
            setupBoards();
        }
    });
