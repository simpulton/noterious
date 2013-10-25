'use strict';

angular.module('noteriousApp')
    .controller('BoardCtrl', function ($scope, $routeParams, UserService, angularFire) {
        var getBoardTitle = function () {
            var boardId, boardUrl, boardRef;

            boardId = $routeParams.boardId;
            boardUrl = 'https://noterious.firebaseio.com/users/' + UserService.getCurrentUserId() + '/boards/' + boardId + '/title';
            boardRef = new Firebase(boardUrl);

            boardRef.once('value', function(snapshot) {
                $scope.boardTitle = snapshot.val();
            });
        };

        var setupNotes = function () {
            var boardId, notesUrl, notesRef, notesPromise;

            boardId = $routeParams.boardId;
            notesUrl = 'https://noterious.firebaseio.com/users/' + UserService.getCurrentUserId() + '/boards/' + boardId + '/notes';
            notesRef = new Firebase(notesUrl);
            notesPromise = angularFire(notesRef, $scope, 'notes', {});

            notesPromise.then(function (disassociate) {
                $scope.createNote = function (note) {
                    $scope.notes[notesRef.push().name()] = {title: note.title, content: note.content};
                };
    
                $scope.deleteNote = function(noteId) {
                    delete $scope.notes[noteId];
                };

                $scope.disassociateModel = disassociate;
            });
        };

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

        $scope.$on('onLogin', function () {
            getBoardTitle();
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
            getBoardTitle();
            setupNotes();
        }
    });
