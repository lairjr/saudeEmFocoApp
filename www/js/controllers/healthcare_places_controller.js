angular.module('starter.controllers')
.controller('HealthcarePlacesCtrl', function($scope, $stateParams, $ionicPopup, placesService) {
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
});
