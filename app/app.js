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

.service('NameService', function(){
  this.names = ['Julie', 'Jennifer', 'Janice'];

  this.addName = function(name){
    this.names.push(name);
  };
})

.service('LoginService', ['$http', '$httpParamSerializerJQLike', function($http, $httpParamSerializerJQLike){
  this.login = function(username, password, success, error){

    $http({
      method: 'POST',
      url: 'http://localhost:8080/login',
      data: {
        username: username,
        password: password
      }
    }).then(function successCallback(response) {
      success(response);
    }, function errorCallback(response) {
      error(response);
    });

  };
}]);