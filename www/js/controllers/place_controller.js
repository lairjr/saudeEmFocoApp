angular.module('starter.controllers')
.controller('PlaceCtrl', function($scope, $state, $stateParams, $ionicPopup, $rootScope, placesService) {
  $scope.time = {};
  $scope.canAddTime = false;

  $scope.init = function () {
    $scope.loadPlace();
    $scope.canAddTime = $stateParams.canAddTime;
  };

  $scope.loadPlace = function () {
    var placesPromise = placesService.getByPosition($stateParams.lng, $stateParams.lat);

    placesPromise.then(function (places) {
      $scope.place = findByPlaceId(places, $stateParams.placeId);
    });
  };

  $scope.getImageUrl = function (place) {
    if (place.photo) {
      return 'https://maps.googleapis.com/maps/api/place/photo?' +
        'maxheight=300&maxwidth=300' +
        '&photoreference=' + place.photos[0].photo_reference +
        '&key=AIzaSyDslrUNBlR4yqDLLdAvgdqfvyIMtjee4fQ';
    } else {
      return 'img/imageNotFound.png';
    }
  };

  $scope.saveWaitingTime = function (time) {
    var totalSeconds = getTotalSeconds(time);
    var waitingTimeData = {
      place_id: $scope.place.place_id,
      waitingTime: totalSeconds
    };
    var promise = placesService.post(waitingTimeData, $rootScope.username);
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

  $scope.displayTime = function (totalSeconds) {
    var hours   = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

    // round seconds
    seconds = Math.round(seconds * 100) / 100

    var result = (hours < 10 ? "0" + hours : hours);
        result += ":" + (minutes < 10 ? "0" + minutes : minutes);
        result += ":" + (seconds  < 10 ? "0" + seconds : seconds);
    return result;
  };

  function findByPlaceId(places, placeId) {
    for (var i = 0; i < places.length; i++) {
      if (places[i].place_id === placeId) {
        return places[i];
      }
    }
    return undefined;
  };

  function getTotalSeconds (time) {
    var totalSeconds = 0;

    if (time.hour) {
      totalSeconds += time.hour * 3600;
    }
    if (time.minutes) {
      totalSeconds += time.minutes * 60;
    }

    return totalSeconds;
  };
});
