'use strict';

angular.module('noteriousApp')
    .factory('NoteriousService', function ($rootScope) {
        var users = [
            { id: 1,
                displayName: 'User One',
                username: 'userone',
                password: 'insecure',
                boards: [
                    { id: 1,
                        title: 'Board 1',
                        description: 'Board description.',
                        access: 'public',
                        creationDate: '2013-08-17',
                        lastUpdated: '2013-08-17',
                        notes: [
                            {
                                id: 11,
                                title: 'Note 1.1',
                                content: 'Lorem ipsum dolor sit amet'
                            },
                            {
                                id: 12,
                                title: 'Note 1.2',
                                content: 'Lorem ipsum dolor sit amet'
                            },
                            {
                                id: 13,
                                title: 'Note 1.3',
                                content: 'Lorem ipsum dolor sit amet'
                            },
                        ]
                    },
                    { id: 2,
                        title: 'Board 2',
                        description: 'Board description.',
                        access: 'public',
                        creationDate: '2013-08-17',
                        lastUpdated: '2013-08-17',
                        notes: [
                            {
                                id: 21,
                                title: 'Note 2.1',
                                content: 'Lorem ipsum dolor sit amet'
                            },
                            {
                                id: 22,
                                title: 'Note 2.2',
                                content: 'Lorem ipsum dolor sit amet'
                            },
                            {
                                id: 23,
                                title: 'Note 2.3',
                                content: 'Lorem ipsum dolor sit amet'
                            },
                        ]
                    }
                ]
            },
            { id: 2,
                displayName: 'User Two',
                username: 'usertwo',
                password: 'insecure',
                boards: [
                    { id: 3,
                        title: 'Board 3',
                        description: 'Board description.',
                        access: 'public',
                        creationDate: '2013-08-17',
                        lastUpdated: '2013-08-17',
                        notes: [
                            {
                                id: 31,
                                title: 'Note 3.1',
                                content: 'Lorem ipsum dolor sit amet'
                            },
                            {
                                id: 32,
                                title: 'Note 3.2',
                                content: 'Lorem ipsum dolor sit amet'
                            },
                            {
                                id: 33,
                                title: 'Note 3.3',
                                content: 'Lorem ipsum dolor sit amet'
                            },
                        ]
                    },
                    { id: 4,
                        title: 'Board 4',
                        description: 'Board description.',
                        access: 'public',
                        creationDate: '2013-08-17',
                        lastUpdated: '2013-08-17',
                        notes: [
                            {
                                id: 41,
                                title: 'Note 4.1',
                                content: 'Lorem ipsum dolor sit amet'
                            },
                            {
                                id: 42,
                                title: 'Note 4.2',
                                content: 'Lorem ipsum dolor sit amet'
                            },
                            {
                                id: 43,
                                title: 'Note 4.3',
                                content: 'Lorem ipsum dolor sit amet'
                            },
                        ]
                    }
                ]
            }
        ];

        var currentUser = users[0];

        var getCurrentUser = function () {
            return currentUser;
        };

        var setCurrentUser = function (id) {
            currentUser = users.find(function (n) {
                return n['id'] == id;
            });
        };

        var getBoards = function () {
            return currentUser.boards;
        };

        var getBoard = function (id) {
            return currentUser.boards.find(function (n) {
                return n['id'] == id;
            });
        };

        return {
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            getBoards: getBoards,
            getBoard: getBoard
        }
    });
