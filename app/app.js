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

.service('LoginService', ['$http', '$httpParamSerializerJQLike', 'SessionService', function($http, $httpParamSerializerJQLike, SessionService){
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

.service('FriendService', ['$http', '$httpParamSerializerJQLike', function($http, $httpParamSerializerJQLike){

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

  this.deleteFriend = function(id, success, error){

    $http({
      method: 'DELETE',
      url: 'http://localhost:8910/person/' + id
    }).then(function successCallback(response) {
      console.log('delete friend successful');
      success(response);
    }, function errorCallback(response) {
      console.log('delete friend failed');
      error(response);
    });

  };

}]);