'use strict';

angular.module('myApp.viewFriends', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/friends', {
    templateUrl: 'viewFriends/viewFriends.html',
    controller: 'ViewFriendsCtrl'
  });
}])

.controller('ViewFriendsCtrl', ['$scope', 'NameService', 'SessionService', 'FriendService', function($scope, NameService, SessionService, FriendService) {

  SessionService.kickOutIfNotLoggedIn();

  var loadData = function(){
    FriendService.getFriends(getFriendsSuccessCallback, genericErrorCallback);
  }

  var getFriendsSuccessCallback = function(response) {
    $scope.friends = response.data;
  }

  var genericErrorCallback = function(response) {
    console.log('Something has gone wrong, please try again later');
  }

  $scope.addFriend = function(){
    FriendService.addFriend($scope.addFriendForm.name, loadData, genericErrorCallback);
  };

  $scope.deleteFriend = function(id){
    FriendService.deleteFriend(id, loadData, genericErrorCallback);
  };

  loadData();

}]);