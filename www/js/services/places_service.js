angular.module('starter.services').service('placesService', function($resource, $q) {
  var placesSvc = $resource('http://saudeemfocoapi.herokuapp.com/places/:lat/:lng');

  return {
    getByPosition: function(lng, lat) {
      var deferred = $q.defer();

      placesSvc.query({ lng: lng, lat: lat }).$promise.then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }
  }
});
