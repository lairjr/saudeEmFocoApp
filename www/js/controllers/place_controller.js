angular.module('starter.controllers')
.controller('PlaceCtrl', function($scope, $stateParams, placesService) {
  $scope.init = function () {
    $scope.loadPlace();
  };

  $scope.loadPlace = function () {
    var placesPromise = placesService.getByPosition($stateParams.lng, $stateParams.lat);

    placesPromise.then(function (places) {
      $scope.place = findByPlaceId(places, $stateParams.placeId);
    });
  };

  function findByPlaceId(places, placeId) {
    for (var i = 0; i < places.length; i++) {
      if (places[i].place_id === placeId) {
        return places[i];
      }
    }
    return undefined;
  };
});
