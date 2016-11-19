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
      templateUrl: 'templates/symptoms_test.html',
      controller: 'SymptomsTestCtrl'
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
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })
    .state('healthcarePlaces', {
      url: '/healthcare-places/:lat/:lng',
      templateUrl: 'templates/healthcare_places.html',
      controller: 'HealthcarePlacesCtrl'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'templates/about.html'
    })
    .state('diseases', {
      url: '/diseases',
      templateUrl: 'templates/diseases.html'
    })
    .state('chikungunya', {
      url: '/chikungunya',
      templateUrl: 'templates/chikungunya.html'
    })
    .state('dengue', {
      url: '/dengue',
      templateUrl: 'templates/dengue.html'
    })
    .state('zika', {
      url: '/zika',
      templateUrl: 'templates/zika.html'
    })
    .state('has_few_symptoms', {
      url: '/has_few_symptoms/:diseases',
      templateUrl: 'templates/has_few_symptoms.html',
      controller: 'SymptomsTestResultCtrl'
    })
    .state('has_some_symptoms', {
      url: '/has_some_symptoms/:diseases',
      templateUrl: 'templates/has_some_symptoms.html',
      controller: 'SymptomsTestResultCtrl'
    })
    .state('has_symptoms', {
      url: '/has_symptoms/:diseases',
      templateUrl: 'templates/has_symptoms.html',
      controller: 'SymptomsTestResultCtrl'
    });

  $urlRouterProvider.otherwise("/");
})
