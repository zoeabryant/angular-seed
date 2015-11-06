'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.viewFriends',
  'myApp.viewLogin',
  'myApp.version'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}])

.service('SessionService', ['$location', function($location){
  this.loggedIn = false;

  this.kickOutIfNotLoggedIn = function(){
    if(!this.loggedIn){
      $location.path('/login').replace();
    }
  }
}])

.service('NameService', function(){
  this.names = ['Julie', 'Jennifer', 'Janice'];

  this.addName = function(name){
    this.names.push(name);
  };
})

.service('LoginService', ['$http', 'SessionService', function($http, SessionService){
  this.login = function(username, password, success, error){

    $http({
      method: 'POST',
      url: 'http://localhost:8080/login',
      data: {
        username: username,
        password: password
      }
    }).then(function successCallback(response) {
      console.log('login successful');
      SessionService.loggedIn = true;
      success(response);
    }, function errorCallback(response) {
      console.log('login failed');
      SessionService.loggedIn = false;
      error(response);
    });

  };
}])

.service('FriendService', ['$http', function($http){

  this.getFriends = function(success, error){

    $http({
      method: 'GET',
      url: 'http://localhost:8910/person'
    }).then(function successCallback(response) {
      console.log('get friends successful');
      success(response);
    }, function errorCallback(response) {
      console.log('get friends failed');
      error(response);
    });

  };

  this.addFriend = function(name, success, error){

    $http({
      method: 'POST',
      url: 'http://localhost:8910/person',
      data: {
        name: name
      }
    }).then(function successCallback(response) {
      console.log('add friend successful');
      success(response);
    }, function errorCallback(response) {
      console.log('add friend failed');
      error(response);
    });

  };

  this.deletedFriends = [];

  this.deleteFriend = function(friend, success, error){
    var service = this;
    $http({
      method: 'DELETE',
      url: 'http://localhost:8910/person/' + friend.id
    }).then(function successCallback(response) {
      console.log('delete friend successful');
      service.deletedFriends.push(friend);
      success(response);
    }, function errorCallback(response) {
      console.log('delete friend failed');
      error(response);
    });

  };

  this.deleteAllFriends = function(friends, success, error){
    var service = this;
    console.log('deleteAllFriends');
    friends.forEach(function(friend){
      service.deleteFriend(friend, success, error);
    });
  };

  this.getDeletedFriends = function(success, error){
    var service = this;
    if(service.deletedFriends.length !== 0){
      service.deletedFriends.forEach(function(friend, index, list){
        console.log('restoring ' + friend.name);
        service.addFriend(friend.name, success, error);
        list.splice(index, 1);
      });
    } else {
      console.log('no deletedFriends to restore');
    }
  };

}]);