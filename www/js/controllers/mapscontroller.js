angular.module('starter.controllers', [])
.controller('MapsCtrl', function($scope, $ionicLoading, $ionicModal, occurrenceService) {
  $ionicModal.fromTemplateUrl('templates/modals/newoccurrence.html', {
    scope: null,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.newOccurrenceModal = modal;
  });

  $scope.init = function(map) {
    $scope.map = map;
    $scope.map.setCenter(new google.maps.LatLng(-30.0573828,-51.1806058));
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
      position: new google.maps.LatLng(occurrence.location.coordinates[0], occurrence.location.coordinates[1])
    });

    var content = "<h4>" + occurrence.description + "</h4>";
    var infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.open($scope.map, marker);
    });
  };

  $scope.addNewOccurrence = function () {
    $scope.newOccurrenceModal.show();
  };

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };
});
