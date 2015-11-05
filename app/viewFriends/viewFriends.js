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
    FriendService.getFriends(getFriendsSuccessCallback, errorCallback);
  }

  var getFriendsSuccessCallback = function(response) {
    $scope.friends = response.data;
  }

  var errorCallback = function(response) {
    console.log('Something has gone wrong, please try again later');
  }

  var reloadOnSuccessCallback = function(response) {
    loadData();
  }

  $scope.addFriend = function(){
    FriendService.addFriend($scope.addFriendForm.name, reloadOnSuccessCallback, errorCallback);
  };

  $scope.deleteFriend = function(id){
    console.log('deleteFriend clicked');
    FriendService.deleteFriend(id, reloadOnSuccessCallback, errorCallback);
  };

  loadData();

}]);