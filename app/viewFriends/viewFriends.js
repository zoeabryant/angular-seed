'use strict';

angular.module('myApp.viewFriends', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/friends', {
    templateUrl: 'viewFriends/viewFriends.html',
    controller: 'ViewFriendsCtrl'
  });
}])

.controller('ViewFriendsCtrl', ['$scope', 'NameService',  function($scope, NameService) {

  $scope.names = NameService.names;

  $scope.addName = function(){
    NameService.addName($scope.formData.text);
  };

}]);