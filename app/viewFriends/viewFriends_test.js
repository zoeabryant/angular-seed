'use strict';

describe('myApp.viewFriends module', function() {

  var viewFriendsCtrl;
  var mockScope = {};
  var mockSessionService = {};
  var mockFriendService = {
    getFriends: function(){
      return {
        data: ['Hannah', 'Amy']
      }
    },
    addFriend: function(){},
    deletedFriends: [],
    deleteFriend: function(){},
    deleteAllFriends: function(){},
    getDeletedFriends: function(){}
  };

  describe('viewFriends controller', function(){

    beforeEach(function(){

      module('myApp.viewFriends');

      inject(function($controller) {

        spyOn(mockFriendService, 'getFriends').and.returnValue();
        spyOn(mockFriendService, 'addFriend');
        spyOn(mockFriendService, 'deleteFriend');
        spyOn(mockFriendService, 'deleteAllFriends');
        spyOn(mockFriendService, 'getDeletedFriends');

        var mockedDependencies = {
          $scope: mockScope,
          SessionService: mockSessionService,
          FriendService: mockFriendService
        };

        viewFriendsCtrl = $controller('ViewFriendsCtrl', mockedDependencies);
      })

    });

    it('should load friends on instanciation', function() {

      expect(mockFriendService.getFriends).toHaveBeenCalled();

      expect(mockScope.friends).toEqual(['Sarah', 'Amy']);

    });

  });

});