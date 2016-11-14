angular.module('starter.controllers')
.controller('PlaceCtrl', function($scope, $stateParams, placesService) {
  $scope.waitingTime = 0;

  $scope.init = function () {
    $scope.loadPlace();
  };

  $scope.loadPlace = function () {
    var placesPromise = placesService.getByPosition($stateParams.lng, $stateParams.lat);

    placesPromise.then(function (places) {
      $scope.place = findByPlaceId(places, $stateParams.placeId);
    });
  };

  $scope.getImageUrl = function (place) {
    if (place) {
      return 'https://maps.googleapis.com/maps/api/place/photo?' +
        'maxheight=300&maxwidth=300' +
        '&photoreference=' + place.photos[0].photo_reference +
        '&key=AIzaSyDslrUNBlR4yqDLLdAvgdqfvyIMtjee4fQ';
    }
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
