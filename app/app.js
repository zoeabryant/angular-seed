'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
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
}]);