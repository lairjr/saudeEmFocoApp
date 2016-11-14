angular.module('starter', ['ionic', 'ngResource', 'starter.controllers', 'starter.directives', 'starter.services'])
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('map', {
      url: '/',
      templateUrl: 'templates/map.html',
      controller: 'MapsCtrl'
    })
    .state('occurrence', {
      url: '/occurrence/:lat/:lng',
      templateUrl: 'templates/occurence.html',
      controller: 'OccurrenceCtrl'
    })
    .state('informations', {
      url: '/informations',
      templateUrl: 'templates/informations.html'
    })
    .state('symptomsTest', {
      url: '/symptoms-test',
      templateUrl: 'templates/symptoms_test.html'
    })
    .state('place', {
      url: '/place/:lat/:lng/:placeId',
      templateUrl: 'templates/place.html',
      controller: 'PlaceCtrl'
    })
    .state('users', {
      url: '/users',
      templateUrl: 'templates/users.html',
      controller: 'UsersCtrl'
    })
    .state('healthcarePlaces', {
      url: '/healthcare-places/:lat/:lng',
      templateUrl: 'templates/healthcare_places.html',
      controller: 'HealthcarePlacesCtrl'
    });

  $urlRouterProvider.otherwise("/");
})
