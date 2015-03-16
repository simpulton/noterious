'use strict';

angular.module('noterious')
    .controller('BoardsRESTCtrl', function ($scope, UserService, BoardsService) {
        $scope.newBoard = {
            title:'',
            description:'',
            isPublic: false
        };

        $scope.resetForm = function() {
            $scope.newBoard = {
                title:'',
                description:'',
                isPublic: false
            };
        };

        $scope.getBoards = function () {
            BoardsService.find().then(function (result) {
                $scope.boards = (result !== 'null') ? result : {};;
            }, function (reason) {
                //
            });
        };

        $scope.createBoard = function (board) {
            BoardsService.create(board.title, board.description, board.isPublic).then(function (result) {
                $scope.getBoards();
            }, function (reason) {
                //
            });
        };

        $scope.updateBoard = function (boardId, board) {
            BoardsService.update(boardId, board.title, board.description, board.isPublic).then(function (result) {
                //
            }, function (reason) {
                //
            });
        };

        $scope.deleteBoard = function (boardId) {
            BoardsService.destroy(boardId).then(function (result) {
                $scope.getBoards();
            }, function (reason) {
                //
            });
        };

        $scope.$on('onLogin', function () {
            $scope.getBoards();
        });

        $scope.$on('onLogout', function () {
            $scope.disassociateModel();
        });

        $scope.loading = function () {
            return UserService.loading();
        };

        $scope.userExists = function () {
            return UserService.userExists();
        };

        // If a user and content has been loaded
        if ($scope.userExists()) {
            $scope.getBoards();
        }
    });
