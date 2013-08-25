'use strict';

angular.module('noteriousApp')
    .controller('BoardCtrl', function ($scope, $routeParams, angularFire) {
        var boardId = $routeParams.boardId;
        var notesUrl = 'https://noterious.firebaseio.com/boards/' + boardId + '/notes';
        var notesRef = new Firebase(notesUrl);
        var notesPromises = angularFire(notesRef, $scope, 'notes', {});

        notesPromises.then(function(){
            $scope.createNote = function (title, content) {
                $scope.notes[notesRef.push().name()] = {title: title, content: content};
            };

            $scope.removeNote = function(noteId) {
                delete $scope.notes[noteId];
            };
        });
    });
