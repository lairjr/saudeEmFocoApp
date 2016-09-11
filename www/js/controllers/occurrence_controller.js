angular.module('starter.controllers')
.controller('OccurrenceCtrl', function($scope, $ionicPopup, $stateParams, occurrenceService) {
  $scope.occurrence = {
    description: '',
    location: {
      lat: $stateParams.lat,
      lng: $stateParams.lng
    }
  };

  $scope.save = function (occurrence) {
    var promise = occurrenceService.post(occurrence);
    promise.then(function () {
      var successAlert = $ionicPopup.alert({
        title: 'Obrigado',
        template: 'Ocorrencia inserida com sucesso'
      });
    });
  };
});