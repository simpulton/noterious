'use strict';

angular.module('noterious.common')
  .service('BoardsModel', function ($http, UserModel, Backand) {
    var service = this;

    function extract(result) {
    if(angular.isDefined(result.data.data))
      return result.data.data;
    else
      return result.data;
    }

    function getUrl() {
      return Backand.configuration.apiUrl + '/1/table/data/boards';
    }

    function getUrlForId(boardId) {
      return Backand.configuration.apiUrl + '/1/table/data/boards/' + boardId;
    }

    service.all = function () {
      return $http.get(getUrl()).then(extract);
    };

    service.fetch = function (boardId) {
      return $http.get(getUrlForId(boardId)+'?deep=true').then(extract);
    };

    service.create = function (board) {
      return $http.post(getUrl(), board).then(extract);
    };

    service.update = function (boardId, board) {
      return $http.put(getUrlForId(boardId), board).then(extract);
    };

    service.destroy = function (boardId) {
      return $http.delete(getUrlForId(boardId)).then(extract);
    };
  });