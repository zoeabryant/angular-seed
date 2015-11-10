'use strict';

describe('myApp.viewFriends service', function() {

  var httpBackend,
      FriendService,
      runnerContext = {
      successCallback: function(){
        console.log('in successCallback');
      },
      errorCallback: function(){
        console.log('in errorCallback');
      }
  };

  beforeEach(function(){
    module('myApp.viewFriends');

    spyOn(runnerContext, 'successCallback');
    spyOn(runnerContext, 'errorCallback');

    inject(function(_FriendService_, _$httpBackend_){
      FriendService = _FriendService_;
      httpBackend = _$httpBackend_;
    });
  });

  describe('FriendService.getFriends', function(){
    it('runs successCallback with response on 200 response', function(){
      var friends = {
        data:['Sarah', 'Amy']
      }
      httpBackend.whenGET('http://localhost:8910/person').respond(200, friends);
      FriendService.getFriends(runnerContext.successCallback, runnerContext.errorCallback);
      httpBackend.flush();

      expect(runnerContext.successCallback).toHaveBeenCalled();
      var callbackArgs = runnerContext.successCallback.calls.mostRecent().args
      expect(callbackArgs[0].data).toEqual(friends);
    });

    it('runs errorCallback with response on 404 response', function(){
      httpBackend.whenGET('http://localhost:8910/person').respond(404, '');
      FriendService.getFriends(runnerContext.successCallback, runnerContext.errorCallback);
      httpBackend.flush();
      expect(runnerContext.errorCallback).toHaveBeenCalled();
      var callbackArgs = runnerContext.errorCallback.calls.mostRecent().args
      expect(callbackArgs[0]).toBeDefined;
    });
    
  });

  describe('FriendService.addFriend', function(){
    it('runs successCallback with response on 204 response', function(){
      httpBackend.whenPOST('http://localhost:8910/person').respond(204, '');
      
      FriendService.addFriend("Natasha", runnerContext.successCallback, runnerContext.errorCallback);
      
      httpBackend.flush();
      expect(runnerContext.successCallback).toHaveBeenCalled();
      var callbackArgs = runnerContext.successCallback.calls.mostRecent().args
      expect(callbackArgs[0].status).toEqual(204);
    });

    it('runs errorCallback with response on 204 response', function(){
      httpBackend.whenPOST('http://localhost:8910/person').respond(404, '');
      
      FriendService.addFriend("Natasha", runnerContext.successCallback, runnerContext.errorCallback);
      
      httpBackend.flush();
      expect(runnerContext.errorCallback).toHaveBeenCalled();
      var callbackArgs = runnerContext.errorCallback.calls.mostRecent().args
      expect(callbackArgs[0].status).toEqual(404);
    });

  });

  describe('FriendService.deleteFriend', function(){
    it('runs successCallback with response on 204 response', function(){
      httpBackend.whenDELETE('http://localhost:8910/person/1').respond(204, '');
      
      FriendService.deleteFriend({name: "Natasha", id: 1}, runnerContext.successCallback, runnerContext.errorCallback);
      
      httpBackend.flush();
      expect(runnerContext.successCallback).toHaveBeenCalled();
      var callbackArgs = runnerContext.successCallback.calls.mostRecent().args
      expect(callbackArgs[0].status).toEqual(204);
    });

    it('runs errorCallback with response on 204 response', function(){
      httpBackend.whenDELETE('http://localhost:8910/person/1').respond(404, '');
      
      FriendService.deleteFriend({name: "Natasha", id: 1}, runnerContext.successCallback, runnerContext.errorCallback);
      
      httpBackend.flush();
      expect(runnerContext.errorCallback).toHaveBeenCalled();
      var callbackArgs = runnerContext.errorCallback.calls.mostRecent().args
      expect(callbackArgs[0].status).toEqual(404);
    });

  });

  describe('FriendService.deleteAllFriends', function(){
    it('runs deleteFriend for all the given friends', function(){
      var friends = ["Margot", "Lisa"];
      // FriendService.deleteAllFriends();
    });

  });

});