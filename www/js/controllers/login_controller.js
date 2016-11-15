angular.module('starter.controllers')
.controller('LoginCtrl', function($scope, $rootScope, $ionicPopup, $state, userService) {
  $scope.user = {};

  $scope.logIn = function (user) {
    var userPromise = userService.getByUsername(user.username);
    userPromise.then(function (userData) {
      if (userData.password === user.password) {
        $rootScope.username = userData.name;
        var successAlert = $ionicPopup.alert({
          title: 'Sucesso'
        });

        successAlert.then(function () {
          $state.go('map');
        });
      } else {
        var errorAlert = $ionicPopup.alert({
          title: 'Senha errada'
        });

        errorAlert.then(function () {
          $rootScope.username = '';
        });
      }
    }, function (error) {
      if (error.status === 404) {
        var errorAlert = $ionicPopup.alert({
          title: 'Usuario nao encontrado'
        });

        errorAlert.then(function () {
          $rootScope.username = '';
        });
      }
    });
  };
});
