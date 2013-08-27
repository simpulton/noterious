'use strict';

angular.module('noteriousApp')
    .controller('BoardCtrl', function ($scope, $routeParams, UserService, angularFire) {
        var setupNotes = function () {
            var boardId, notesUrl, notesRef, notesPromise;

            boardId = $routeParams.boardId;
            notesUrl = 'https://noterious.firebaseio.com/users/' + $scope.userId + '/boards/' + boardId + '/notes';
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

        $scope.currentUser = function () {
            return UserService.getCurrentUser();
        };

        $scope.isLoaded = function () {
            return UserService.isLoaded();
        };

        $scope.$on('onLogin', function () {
            if (userExists()) {
                $scope.userId = $scope.currentUser().id;
                setupNotes();
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

            setupNotes();
        }
    });
