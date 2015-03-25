'use strict';

describe('Controller: MainCtrl', function() {
  beforeEach(module('noterious'));

  var mainCtrl,
    UserModel;

  beforeEach(inject(function($controller) {
    UserModel = {};

    var Auth = {
      $onAuth: function() {
        return {};
      }
    };

    mainCtrl = $controller('MainCtrl', {
      UserModel: UserModel,
      Auth: Auth
    });
  }));

  it('should be defined', function() {
    expect(mainCtrl).toBeDefined();
  });

});