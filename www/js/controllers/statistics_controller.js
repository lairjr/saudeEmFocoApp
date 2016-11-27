angular.module('starter.controllers')
.controller('StatisticsCtrl', function($scope, citiesService) {
  $scope.init = function () {
    var citiesPromise = citiesService.get();
    citiesPromise.then(function (citiesData) {
      $scope.cityList = citiesData;
    });
  };
});
