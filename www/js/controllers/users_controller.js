angular.module('starter.controllers')
.controller('UsersCtrl', function($scope, $stateParams, $filter, userService) {
  $scope.userList = [];

  $scope.init = function () {
    $scope.loadUsers();
  };

  $scope.loadUsers = function () {
    var userPromise = userService.get();
    userPromise.then(function (users) {
      $scope.adjustListToDisplay(users);
    });
  };

  $scope.adjustListToDisplay = function (userList) {
    var orderedList = $filter('orderBy')(userList, 'reportNumber', true);

    var position = 1;

    angular.forEach(orderedList, function (user) {
      user.position = position;
      $scope.userList.push(user);
      position += position;
    });
  };
});
