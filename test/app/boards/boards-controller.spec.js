'use strict';

describe('Controller: BoardsCtrl', function () {
  beforeEach(module('noterious'));

  var BoardsCtrl,
    currentUser,
    mockBoardsModel

  beforeEach(inject(function ($templateCache, $controller, $q) {
    currentUser = {};

    var createPromise = function(returnData) {
      var deferred = $q.defer();
      deferred.resolve(returnData);
      return deferred.promise;
    };

    mockBoardsModel = {
      all: function () {
        return createPromise({data: 'All boards'})
      },
      create: function(create) {
        return createPromise({});
      },
      update: function(boardId, board) {
        return createPromise({});
      },
      destroy: function(boardId) {
        return createPromise({});
      }
    };

    BoardsCtrl = $controller('BoardsCtrl', {
      currentUser: currentUser,
      BoardsModel: mockBoardsModel
    });
  }));

  it('should be defined', function () {
    expect(BoardsCtrl).toBeDefined();
  });

});