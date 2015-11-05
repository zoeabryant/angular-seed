'use strict';

angular.module('myApp.viewFriends', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/friends', {
    templateUrl: 'viewFriends/viewFriends.html',
    controller: 'ViewFriendsCtrl'
  });
}])

.controller('ViewFriendsCtrl', ['$scope', 'NameService', 'SessionService', function($scope, NameService, SessionService) {

  SessionService.kickOutIfNotLoggedIn();

  $scope.names = NameService.names;

  $scope.addName = function(){
    NameService.addName($scope.formData.text);
  };

}]);