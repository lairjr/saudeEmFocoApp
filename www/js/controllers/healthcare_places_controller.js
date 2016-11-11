angular.module('starter.controllers')
.controller('HealthcarePlacesCtrl', function($scope) {
  $scope.init = function () {
    console.log('Arrived');
  };
});
// $scope.findHospitals = function () {
//   debugger;
//   var service = new google.maps.places.PlacesService($scope.map);
//   var pyrmont = new google.maps.LatLng(-30.0573828,-51.1806058);
//   var request = {
//     location: pyrmont,
//     radius: '10000', //10.000 meters
//     types: ['hospital']
//   };
//   service.nearbySearch(request, callback);
// };
