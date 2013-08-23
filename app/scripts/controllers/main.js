'use strict';

angular.module('noteriousApp')
    .controller('MainCtrl', function ($scope) {
        $scope.notes = [];
    })
    .controller('BoardsCtrl', function ($scope, NoteriousService, angularFire) {
        var url = 'https://noterious.firebaseio.com/boards';
        var ref = new Firebase(url);
        var promise = angularFire(ref, $scope, 'boards', {});

        promise.then(function(){
            $scope.createBoard = function (title, description, isPublic) {
                var id = NoteriousService.getCurrentUser().id;
                $scope.boards[ref.push().name()] = {
                    user_id: id, title: title, description: description, isPublic: isPublic
                };
            };
            $scope.deleteBoard = function(boardId) {
                delete $scope.boards[boardId];
            };
        });
    })
    .controller('BoardCtrl', function ($scope, $routeParams, angularFire) {
        var boardId = $routeParams.boardId;
        var url = 'https://noterious.firebaseio.com/boards/' + boardId + '/notes';
        var ref = new Firebase(url);
        var promise = angularFire(ref, $scope, 'notes', {});

        promise.then(function(){
            $scope.createNote = function (title, content) {
                $scope.notes[ref.push().name()] = {title: title, content: content};
            };

            $scope.deleteNote = function(noteId) {
                delete $scope.notes[noteId];
            };
        });
    });
