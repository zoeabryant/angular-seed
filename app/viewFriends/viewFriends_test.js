'use strict';

describe('myApp.viewFriends module', function() {

  var viewFriendsCtrl,
      mockScope = {
        addFriendForm: {
          name: "Natasha"
        }
      },
      mockSessionService = {},
      mockFriendService = {
        getFriends: function(successCallback, errorCallback){
          successCallback(
            {
              data:['Sarah', 'Amy']
            }
          )
        },
        addFriend: function(name, successCallback, errorCallback){
          successCallback()
        },
        deletedFriends: [],
        deleteFriend: function(){},
        deleteAllFriends: function(){},
        getDeletedFriends: function(){}
      };

  describe('viewFriends controller', function(){

    beforeEach(function(){

      module('myApp.viewFriends');

      inject(function($controller) {

        spyOn(mockFriendService, 'getFriends').and.callThrough();
        spyOn(mockFriendService, 'addFriend').and.callThrough();
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

    it('should call get friends on instanciation', function() {
      expect(mockFriendService.getFriends).toHaveBeenCalled();
      expect(mockScope.friends).toEqual(['Sarah', 'Amy']);

    });

    it('.addFriend should call the FriendService.addFriend with callbacks', function(){
      mockScope.addFriend();
      var addFriendCalledWith = mockFriendService.addFriend.calls.mostRecent().args;
      expect(addFriendCalledWith[0]).toEqual("Natasha");
      expect(typeof addFriendCalledWith[1]).toBe("function");
      expect(typeof addFriendCalledWith[2]).toBe("function");
    })

    it('.deleteFriend should call the FriendService.deleteFriend with callbacks', function(){
      var friend = {};
      mockScope.deleteFriend(friend);
      var deleteFriendCalledWith = mockFriendService.deleteFriend.calls.mostRecent().args;
      expect(deleteFriendCalledWith[0]).toEqual(friend);
      expect(typeof deleteFriendCalledWith[1]).toBe("function");
      expect(typeof deleteFriendCalledWith[2]).toBe("function");
    })

    it('.getDeletedFriends should call the FriendService.getDeletedFriends with callbacks', function(){
      mockScope.getDeletedFriends();
      var getDeletedFriendsCalledWith = mockFriendService.getDeletedFriends.calls.mostRecent().args;
      expect(typeof getDeletedFriendsCalledWith[0]).toBe("function");
      expect(typeof getDeletedFriendsCalledWith[1]).toBe("function");
    })

    it('.deleteAllFriends should call the FriendService.deleteAllFriends with callbacks', function(){
      mockScope.friends = ['Margot', 'Lisa'];
      mockScope.deleteAllFriends();

      var deleteAllFriendsCalledWith = mockFriendService.deleteAllFriends.calls.mostRecent().args;
      expect(deleteAllFriendsCalledWith[0]).toBe(mockScope.friends);
      expect(typeof deleteAllFriendsCalledWith[1]).toBe("function");
      expect(typeof deleteAllFriendsCalledWith[2]).toBe("function");
    })

  });

});