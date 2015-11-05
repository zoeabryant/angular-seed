'use strict';

angular.module('myApp.viewLogin', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'viewLogin/viewLogin.html',
    controller: 'ViewLoginCtrl'
  });
}])

.controller('ViewLoginCtrl', ['$scope', '$location', 'LoginService', function($scope, $location, LoginService) {

  var successCallback = function(response) {
    $location.path('/friends').replace();
  }

  var errorCallback = function(response) {
    switch(response.status){
      case 404:
        $scope.error = ('Your login details could not be found - are you registered?');
        break;
      case 401:
        $scope.error = ('Your login details appear not to be correct - please try again');
        break;
      default:
        $scope.error = ('Something has gone wrong, please try again later');
    }
  }

  $scope.login = function(){
    LoginService.login($scope.loginForm.username, $scope.loginForm.password, successCallback, errorCallback);
  };
}]);