'use strict';

angular.module('noteriousApp')
    .factory('BoardsService', function ($http, $q) {
        var baseUrl = 'https://noterious.firebaseio.com';

        var find = function () {
            var deferred = $q.defer();
            var url = '/boards.json';

            $http.get(baseUrl + url).success(deferred.resolve).error(deferred.reject);

            return deferred.promise;
        };

        var fetch = function (board_id) {
            var deferred = $q.defer();
            var url = '/boards/' + board_id + '.json';

            $http.get(baseUrl + url).success(deferred.resolve).error(deferred.reject)

            return deferred.promise;
        };

        var create = function (user_id, title, description, isPublic) {
            var deferred = $q.defer();
            var url = '/boards.json';
            var params = {user_id: user_id, title: title, description: description, isPublic: isPublic};

            $http.post(baseUrl + url, params).success(deferred.resolve).error(deferred.reject);

            return deferred.promise;
        };

        var update = function (board_id, user_id, title, description, isPublic) {
            var deferred = $q.defer();
            var url = '/boards/' + board_id + '.json';
            var params = {user_id: user_id, title: title, description: description, isPublic: isPublic};

            $http.put(baseUrl + url, params).success(deferred.resolve).error(deferred.reject);

            return deferred.promise;
        };

        var destroy = function (board_id) {
            var deferred = $q.defer();
            var url = '/baords/' + board_id + '.json';

            $http.delete(baseUrl + url).success(deferred.resolve).error(deferred.reject);

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