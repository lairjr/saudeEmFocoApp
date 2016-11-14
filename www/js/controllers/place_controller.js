angular.module('starter.controllers')
.controller('PlaceCtrl', function($scope, $state, $stateParams, $ionicPopup, placesService) {
  $scope.time = 130;

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

  $scope.saveWaitingTime = function (time) {
    var waitingTimeData = {
      place_id: $scope.place.place_id,
      waitingTime: time
    };
    var promise = placesService.post(waitingTimeData);
    promise.then(function () {
      var successAlert = $ionicPopup.alert({
        title: 'Obrigado',
        template: 'Tempo de espera inserido com sucesso'
      });

      successAlert.then(function () {
        $scope.init();
      });
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
