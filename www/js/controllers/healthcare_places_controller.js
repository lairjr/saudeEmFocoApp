angular.module('starter.controllers')
.controller('HealthcarePlacesCtrl', function($scope, $stateParams, $ionicPopup, $filter, placesService) {
  $scope.init = function () {
    $scope.loadPlaces();
  };

  $scope.placeList = [];

  $scope.loadPlaces = function () {
    var promise = placesService.getByPosition($stateParams.lng, $stateParams.lat);

    promise.then(function (places) {
      var tempList = [];
      angular.forEach(places, function (place) {
        tempList.push(addTotalDuration(place));
      });
      var orderedList = $filter('orderBy')(tempList, 'totalDuration');
      var minDuration = orderedList[0].totalDuration;
      angular.forEach(orderedList, function (place) {
        $scope.placeList.push(addCssClass(place, minDuration));
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

  function addTotalDuration(place) {
    place['totalDuration'] = (place.waitingTime <= 0) ? place.transportDuration : place.transportDuration + place.waitingTime;
    return place;
  }

  function addCssClass(place, minDuration) {
    var cssClass;
    if (place.totalDuration <= (minDuration * 1.25)) {
      cssClass = 'button-balanced';
    } else if (place.totalDuration <= (minDuration * 1.5)) {
      cssClass = 'button-energized';
    } else {
      cssClass = 'button-assertive';
    }
    place['buttonClass'] = cssClass;
    return place;
  }
});
