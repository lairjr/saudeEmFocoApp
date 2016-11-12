angular.module('starter.controllers')
.controller('MapsCtrl', function($scope, $ionicLoading, $state, occurrenceService) {
  $scope.centerMark = {}
  $scope.isCreating = false;

  $scope.init = function(map) {
    $scope.map = map;
    $scope.centerOnMe();
    $scope.loadOccurrences();
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

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.open($scope.map, marker);
    });
  };

  $scope.goToOccurrence = function () {
    var position = $scope.map.getCenter();
    $state.go('occurrence', { lng: position.lng(), lat: position.lat() });
  };

  $scope.goToHealthcarePlaces = function () {
    var position = $scope.map.getCenter();
    $state.go('healthcarePlaces', { lng: position.lng(), lat: position.lat() });
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
        icon: 'img/tooltip_pulse.gif'
      });

      $scope.map.setCenter(currentPosition);
      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };
});
