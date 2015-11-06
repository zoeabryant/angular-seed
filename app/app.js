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

.service('FriendService', ['$http', '$q', function($http, $q){

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
    return $http({
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
    return $http({
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

    var setupDeletePromises = function(){
      var promises = []

      friends.forEach(function(friend){
        promises.push(service.deleteFriend(friend, function(r){}, error));
      });

      return promises
    }

    var resolveDeletePromises = function(promises){

      $q.all(promises).then(
        function successCallback(response){
          console.log('all friends deleted');
          success();
        },
        function errorCallback(response){
          console.log('failed to delete all friends');
          error();
        }
      );
    }

    var deferred = $q.defer();
    var promise = deferred.promise;
     
    promise
      .then(setupDeletePromises)
      .then(resolveDeletePromises);
     
    deferred.resolve();

  };

  this.getDeletedFriends = function(success, error){

    var service = this;

    var setupRestorePromises = function(){
      var promises = []

      service.deletedFriends.forEach(function(friend, index){
        promises.push(service.addFriend(friend.name, function(r){}, error));
      });

      return promises
    }

    var resolveRestorePromises = function(promises){
      $q.all(promises).then(
        function successCallback(response){
          console.log('all friends restored');

          service.deletedFriends.length = 0;

          success();
        },
        function errorCallback(response){
          console.log('failed to restore all friends');
          error();
        }
      );
    }

    var deferred = $q.defer();
    var promise = deferred.promise;
     
    promise
      .then(setupRestorePromises)
      .then(resolveRestorePromises);
     
    deferred.resolve();
  };

}]);