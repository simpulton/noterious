'use strict';

angular.module('noteriousApp')
    .factory('BoardService', function ($http, $q, UserService) {
        var baseUrl = 'https://noterious.firebaseio.com/';

        var find = function (board_id) {
            var deferred = $q.defer();
            var url = baseUrl + 'users/' + UserService.getCurrentUserId() + '/boards/' + board_id + '/notes.json';

            $http.get(url).success(deferred.resolve).error(deferred.reject);

            return deferred.promise;
        };

        var fetch = function (board_id, note_id) {
            var deferred = $q.defer();
            var url = baseUrl + 'users/' + UserService.getCurrentUserId() + '/boards/' + board_id + '/notes/' + note_id + '.json';

            $http.get(url).success(deferred.resolve).error(deferred.reject)

            return deferred.promise;
        };

        var create = function (board_id, title, content) {
            var deferred = $q.defer();
            var url = baseUrl + 'users/' + UserService.getCurrentUserId() + '/boards/' + board_id + '/notes.json';
            var params = {title: title, content: content};

            $http.post(url, params).success(deferred.resolve).error(deferred.reject);

            return deferred.promise;
        };

        var update = function (board_id, note_id, title, content) {
            var deferred = $q.defer();
            var url = baseUrl + 'users/' + UserService.getCurrentUserId() + '/boards/' + board_id + '/notes/' + note_id + '.json';
            var params = {title: title, content: content};

            $http.put(url, params).success(deferred.resolve).error(deferred.reject);

            return deferred.promise;
        };

        var destroy = function (board_id, note_id) {
            var deferred = $q.defer();
            var url = baseUrl + 'users/' + UserService.getCurrentUserId() + '/boards/' + board_id + '/notes/' + note_id + '.json';

            $http.delete(url).success(deferred.resolve).error(deferred.reject);

            return deferred.promise;
        };

        return {
            find: find,
            fetch: fetch,
            create: create,
            update: update,
            destroy: destroy
        };
    });