angular.module('starter', ['ionic', 'ngResource', 'starter.controllers', 'starter.directives', 'starter.services'])
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('map', {
      url: '/',
      templateUrl: 'templates/map.html',
      controller: 'MapsCtrl'
    })
    .state('occurrence', {
      url: '/occurrence',
      templateUrl: 'templates/occurence.html',
      controller: 'OccurrenceFormCtrl'
    });

  $urlRouterProvider.otherwise("/");
})
