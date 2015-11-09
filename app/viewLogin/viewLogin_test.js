'use strict';

describe('myApp.viewLogin module', function() {

  beforeEach(module('myApp.viewLogin'));

  describe('viewLogin controller', function(){

    it('should ....', inject(function($controller) {
      var mockScope = {};
      var mockLoginService = {};
      var viewLoginCtrl = $controller('ViewLoginCtrl', 
        {$scope: mockScope, LoginService: mockLoginService});
      expect(viewLoginCtrl).toBeDefined();
    }));

  });
});