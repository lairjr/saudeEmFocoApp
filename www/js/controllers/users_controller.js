angular.module('starter.controllers')
.controller('UsersCtrl', function($scope, $stateParams, userService) {
  $scope.userList = [];
  
  $scope.init = function () {
    $scope.loadUsers();
  };

  $scope.loadUsers = function () {
    var userPromise = userService.get();
    userPromise.then(function (users) {
      $scope.userList = users;
    });
  };
});
