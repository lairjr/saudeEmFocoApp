angular.module('starter.controllers')
.controller('SymptomsTestResultCtrl', function($scope, $stateParams, $state) {
  $scope.doencas = $stateParams.diseases;

  $scope.goMap = function () {
    $state.go('map');
  };

  $scope.goBack = function () {
    $state.go('symptomsTest');
  };
});
