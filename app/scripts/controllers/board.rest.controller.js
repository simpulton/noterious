'use strict';

angular.module('noteriousApp')
    .controller('BoardRESTCtrl', function ($scope, $routeParams, angularFire) {
        var boardId = $routeParams.boardId;
        var url = 'https://noterious.firebaseio.com/boards/' + boardId + '/notes';
        var ref = new Firebase(url);
        var promise = angularFire(ref, $scope, 'notes', {});

        promise.then(function(){
            $scope.createNote = function (title, content) {
                $scope.notes[ref.push().name()] = {title: title, content: content};
            };

            $scope.removeNote = function(noteId) {
                delete $scope.notes[noteId];
            };
        });
    });
