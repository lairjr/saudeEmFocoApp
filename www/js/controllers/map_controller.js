angular.module('starter.controllers')
.controller('MapsCtrl', function($scope, $ionicLoading, $ionicPopup, $state, $rootScope, occurrenceService, placesService) {
  $scope.centerMark = {}
  $scope.isCreating = false;

  $scope.init = function(map) {
    $scope.map = map;
    $scope.centerOnMe();
    $scope.loadOccurrences();
    $scope.map.addListener('center_changed', function() {
      $scope.loadHealthcarePlaces();
    });
  };

  $scope.centerOnMe = function () {
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Obtendo posição...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      var currentPosition = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

      var currentMark = new google.maps.Marker({
        map: $scope.map,
        position: currentPosition,
        icon: 'img/currentMark.gif'
      });

      $scope.map.setCenter(currentPosition);
      $scope.loading.hide();
      $scope.loadHealthcarePlaces(true);
    }, function (error) {
      console.log('Unable to get location: ' + error.message);
    });
  };

  $scope.loadHealthcarePlaces = function (hasCheckCurrentPosition) {
    var position = $scope.map.getCenter();
    var healthcarePlacesPromise = placesService.getByPosition(position.lng(), position.lat());

    healthcarePlacesPromise.then(function (places) {
      angular.forEach(places, function (place) {
        $scope.pinHealthcarePlace(place);
      });

      if (hasCheckCurrentPosition) {
        var centerPlace = getCenterPlace(places);
        if (centerPlace) {
          $scope.displayWaitingTimePopup(centerPlace);
        }
      }
    });
  };

  $scope.pinHealthcarePlace = function (place) {
    var placeMarker = new google.maps.Marker({
      map: $scope.map,
      position: new google.maps.LatLng(place.geometry.location.lat, place.geometry.location.lng),
      icon: 'img/placeMark.png'
    });

    var content = "<h4>" + place.name + "</h4>";
    var infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(placeMarker, 'click', function() {
      infoWindow.open($scope.map, placeMarker);
    });
  };

  $scope.loadOccurrences = function () {
    var occurrencesPromise = occurrenceService.get();

    occurrencesPromise.then(function (occurrences) {
      angular.forEach(occurrences, function (occurrence) {
        $scope.pinOccurrence(occurrence);
      });
    });
  };

  $scope.pinOccurrence = function (occurrence) {
    var marker = new google.maps.Marker({
      map: $scope.map,
      position: new google.maps.LatLng(occurrence.location.coordinates[0], occurrence.location.coordinates[1]),
      icon: 'img/occurrenceMark.png'
    });

    var content = "<h4>" + occurrence.description + "</h4>";
    var infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
    });
  };

  $scope.goToOccurrence = function () {
    if ($rootScope.username) {
      var position = $scope.map.getCenter();
      $state.go('occurrence', { lng: position.lng(), lat: position.lat() });
    } else {
      $state.go('login');
    }
  };

  $scope.goToHealthcarePlaces = function () {
    var position = $scope.map.getCenter();
    $state.go('healthcarePlaces', { lng: position.lng(), lat: position.lat() });
  };

  $scope.goToPlace = function (placeId) {
    if ($rootScope.username) {
      var position = $scope.map.getCenter();
      $state.go('place', { lng: position.lng(), lat: position.lat(), placeId: placeId });
    } else {
      $state.go('login');
    }
  };

  $scope.displayCenter = function () {
    $scope.isCreating = true;
    $scope.centerMark = new google.maps.Marker({
      map: $scope.map,
      position: $scope.map.getCenter(),
      icon: 'img/centerMark.png'
    });

    google.maps.event.addListener($scope.centerMark, 'click', function() {
      $scope.goToOccurrence();
    });

    $scope.map.addListener('center_changed', function() {
      $scope.centerMark.setPosition($scope.map.getCenter());
    });
  };

  $scope.hideCenter = function () {
    $scope.isCreating = false;
    $scope.centerMark.setMap(null);
    google.maps.event.clearListeners($scope.centerMark, 'click');
    google.maps.event.clearListeners($scope.map, 'center_changed');
    $scope.centerMark = undefined;
  };

  $scope.displayWaitingTimePopup = function (place) {
    var confirmPopup = $ionicPopup.show({
      title: 'Está em atendimento?',
      buttons: [
        {
          text: 'Nao',
          onTap: function (e) {
            return false;
          }
        },
        {
          text: 'Sim',
          type: 'button-positive',
          onTap: function () {
            return true;
          }
        }
      ]
    });

    confirmPopup.then(function (res) {
      if (res) {
        $scope.goToPlace(place.place_id);
      }
    });
  };

  function getCenterPlace (places) {
    for (var i = 0; i < places.length; i++) {
      if (places[i].distanceMeasure && parseFloat(places[i].distanceMeasure) < 0.5) {
        return places[i];
      }
    };
    return undefined;
  };
});
