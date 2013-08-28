'use strict';

angular.module('noteriousApp')
    .controller('BoardCtrl', function ($scope, $routeParams, UserService, angularFire) {
        var setupNotes = function () {
            var boardId, notesUrl, notesRef, notesPromise;

            boardId = $routeParams.boardId;
            notesUrl = 'https://noterious.firebaseio.com/users/' + UserService.getCurrentUserId() + '/boards/' + boardId + '/notes';
            notesRef = new Firebase(notesUrl);
            notesPromise = angularFire(notesRef, $scope, 'notes', {});

            notesPromise.then(function (disassociate) {
                $scope.createNote = function (title, content) {
                    $scope.notes[notesRef.push().name()] = {title: title, content: content};
                };
    
                $scope.removeNote = function(noteId) {
                    delete $scope.notes[noteId];
                };

                $scope.disassociateModel = disassociate;;
            });
        };

        $scope.$on('onLogin', function () {
            setupNotes();
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
            setupNotes();
        }
    });
