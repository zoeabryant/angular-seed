'use strict';

angular.module('myApp.viewLogin', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'viewLogin/viewLogin.html',
    controller: 'ViewLoginCtrl'
  });
}])

.controller('ViewLoginCtrl', ['$scope', 'LoginService',  function($scope, LoginService) {

  $scope.nameNotFound = false;

  $scope.login = function(){
    LoginService.login($scope.loginForm.username, $scope.loginForm.password);
  };
}]);