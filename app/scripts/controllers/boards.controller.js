'use strict';

angular.module('noteriousApp')
    .controller('BoardsCtrl', function ($scope, UserService, angularFire) {
        var setupBoards = function () {
            var boardsUrl, boardsRef, boardsPromise;

            boardsUrl = 'https://noterious.firebaseio.com/users/' + $scope.userId + '/boards';
            boardsRef = new Firebase(boardsUrl);
            boardsPromise = angularFire(boardsRef, $scope, 'boards', {});

            boardsPromise.then(function (disassociate) {
                $scope.createBoard = function (title, description, isPublic) {
                    var boardId = boardsRef.push().name();

                    $scope.boards[boardId] = {
                        userId: $scope.userId, title: title, description: description, isPublic: isPublic
                    };
                };
                $scope.removeBoard = function (boardId) {
                    delete $scope.boards[boardId];
                };

                $scope.disassociateModel = disassociate;;
            });
        };

        $scope.currentUser = function () {
            return UserService.getCurrentUser();
        };

        $scope.isLoaded = function () {
            return UserService.isLoaded();
        };

        $scope.$on('onLogin', function () {
            if (userExists()) {
                $scope.userId = $scope.currentUser().id;
                setupBoards();
            }
        });

        $scope.$on('onLogout', function () {
            $scope.disassociateModel();
        });

        function existy(x) { return x != null; }

        function userExists() { return existy($scope.currentUser()) && existy($scope.currentUser().id); }

        // If a user and content has been loaded
        if (existy($scope.isLoaded()) && userExists()) {
            $scope.userId = $scope.currentUser().id;

            setupBoards();
        }
    });
