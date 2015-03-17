'use strict';

angular.module('noterious')
    .controller('BoardRESTCtrl', function ($scope, $routeParams, UserModel, BoardService) {
        var boardId = $routeParams.boardId;

        $scope.newNote = {
            title:'',
            content:''
        };

        $scope.resetForm = function() {
            $scope.newNote = {
                title:'',
                content:''
            };
        };

        $scope.getNotes = function () {
            BoardService.find(boardId).then(function (result) {
                $scope.notes = (result !== 'null') ? result : {};
            }, function (reason) {
                //
            });
        };

        $scope.createNote = function (note) {
            BoardService.create(boardId, note.title, note.content).then(function (result) {
                $scope.getNotes();
            }, function (reason) {
                //
            });
        };

        $scope.updateNote = function (noteId, note) {
            BoardService.update(boardId, noteId, note.title, note.content).then(function (result) {
                //
            }, function (reason) {
                //
            });
        };

        $scope.deleteNote = function (noteId) {
            BoardService.destroy(boardId, noteId).then(function (result) {
                $scope.getNotes();
            }, function (reason) {
                //
            });
        };

        $scope.$on('onLogin', function () {
            $scope.getNotes();
        });

        $scope.$on('onLogout', function () {
            $scope.disassociateModel();
        });

        $scope.loading = function () {
            return UserModel.loading();
        };

        $scope.userExists = function () {
            return UserModel.userExists();
        };

        // If a user and content has been loaded
        if ($scope.userExists()) {
            $scope.getNotes();
        }
    });
