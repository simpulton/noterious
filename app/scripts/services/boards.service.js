'use strict';

angular.module('noteriousApp')
    .factory('BoardsService', function ($http, $q, UserService) {
        var baseUrl = 'https://noterious.firebaseio.com/';

        var find = function () {
            var deferred = $q.defer();
            var url = baseUrl +  'users/' + UserService.getCurrentUserId() + '/boards.json';

            $http.get(url).success(deferred.resolve).error(deferred.reject);

            return deferred.promise;
        };

        var fetch = function (board_id) {
            var deferred = $q.defer();
            var url = baseUrl + 'users/' + UserService.getCurrentUserId() + '/boards/' + board_id + '.json';

            $http.get(url).success(deferred.resolve).error(deferred.reject)

            return deferred.promise;
        };

        var create = function (title, description, isPublic) {
            var deferred = $q.defer();
            var url = baseUrl + 'users/' + UserService.getCurrentUserId() + '/boards.json';
            var params = {title: title, description: description, isPublic: isPublic};

            $http.post(url, params).success(deferred.resolve).error(deferred.reject);

            return deferred.promise;
        };

        var update = function (board_id, title, description, isPublic) {
            var deferred = $q.defer();
            var url = baseUrl + 'users/' + UserService.getCurrentUserId() + '/boards/' + board_id + '.json';
            var params = {title: title, description: description, isPublic: isPublic};

            $http.put(url, params).success(deferred.resolve).error(deferred.reject);

            return deferred.promise;
        };

        var destroy = function (board_id) {
            var deferred = $q.defer();
            var url = baseUrl + 'users/' + UserService.getCurrentUserId() + '/boards/' + board_id + '.json';

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