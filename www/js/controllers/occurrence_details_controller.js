angular.module('starter.controllers')
.controller('OccurrenceDetailsCtrl', function($scope, $ionicPopup, $stateParams, $state, $rootScope, occurrenceService) {
  $scope.occurrence = {};

  $scope.init = function () {
    var occurrencePromise = occurrenceService.getById($stateParams.id);
    occurrencePromise.then(function (data) {
      $scope.occurrence = data;
    });
  };

  $scope.save = function () {
    var occurrencePromise = occurrenceService.postReview($stateParams.id);
    occurrencePromise.then(function (occurrenceData) {
      var successAlert = $ionicPopup.alert({
        title: 'Obrigado',
        template: 'Ocorrencia resolvida com sucesso'
      });

      successAlert.then(function () {
        $state.go('map');
      });
    });
  }
});
