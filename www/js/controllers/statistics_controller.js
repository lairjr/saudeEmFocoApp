angular.module('starter.controllers')
.controller('StatisticsCtrl', function($scope, $ionicLoading, $ionicPopup, $state, $rootScope, occurrenceService, placesService) {
  $scope.cityList = [{
    name: 'Porto Alegre',
    numberOfFocous: 10,
    numberOfCases: 5,
    numberOfAnswered: 5,
    total: 15
  }, {
    name: 'Santa Cruz do Sul',
    numberOfFocous: 7,
    numberOfCases: 2,
    numberOfAnswered: 1,
    total: 9
  }];
});
