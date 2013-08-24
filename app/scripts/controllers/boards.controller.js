'use strict';

angular.module('noteriousApp')
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
            $scope.removeBoard = function(boardId) {
                delete $scope.boards[boardId];
            };
        });
    });
