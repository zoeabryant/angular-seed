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

.service('LoginService', ['$http', '$httpParamSerializerJQLike', '$location', function($http, $httpParamSerializerJQLike, $location){
  this.login = function(username, password){

    $http({
      method: 'POST',
      url: 'http://localhost:8080/login',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: $httpParamSerializerJQLike({
        username: username,
        password: password
      })
    }).then(function successCallback(response) {
      console.log('omg it worked');
      $location.path('/friends').replace();
      return response.code;
    }, function errorCallback(response) {
      console.log('omg it didnt work');
      return response.code;
    });

  };
}]);