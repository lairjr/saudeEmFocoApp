angular.module('starter.controllers')
.controller('HealthcarePlacesCtrl', function($scope, $stateParams, placesService) {
  $scope.init = function () {
    $scope.loadPlaces();
  };

  $scope.placeList = [];

  $scope.loadPlaces = function () {
    var promise = placesService.getByPosition($stateParams.lng, $stateParams.lat);

    promise.then(function (places) {
      angular.forEach(places, function (place) {
        $scope.placeList.push(place);
      });
    });
  };
});
