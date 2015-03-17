'use strict';

angular.module('noterious.common')
  .factory('BoardsModel', function ($http, $q, UserModel, ENDPOINT_URI) {
    var service = this,
      MODEL = 'boards',
      boards;

    function extract(result) {
      return result.data;
    }

    function cacheBoards(result) {
      boards = extract(result);
      return boards;
    }

    function getUrl() {
      return ENDPOINT_URI + + 'users/' + UserModel.getCurrentUserId() + '/' + MODEL + '.json';
    }

    function getUrlForId(boardId) {
      return ENDPOINT_URI + + 'users/' + UserModel.getCurrentUserId() + '/' + MODEL + '/' + boardId + '.json';
    }

    service.all = function () {
      var deferred = $q.defer();

      if (boards) {
        deferred.resolve(boards)
      } else {
        $http.get(getUrl()).then(function (boards) {
          deferred.resolve(cacheBoards(boards));
        });
      }

      return deferred.promise;
    };

    service.fetch = function (boardId) {
      return $http.get(getUrlForId(boardId));
    };

    service.create = function (board) {
      return $http.post(getUrl(), board);
    };

    service.update = function (boardId, board) {
      return $http.put(getUrlForId(boardId), board);
    };

    service.destroy = function (boardId) {
      return $http.delete(getUrlForId(boardId));
    };
  });