angular.module('starter.controllers')
.controller('HealthcarePlacesCtrl', function($scope, $stateParams, placesService) {
  $scope.init = function () {
    $scope.loadPlaces();
  };

  $scope.loadPlaces = function () {
    var promise = placesService.getByPosition($stateParams.lng, $stateParams.lat);

    promise.then(function (places) {
      console.log(places);
    });
  };
});
