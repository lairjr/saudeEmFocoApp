angular.module('starter.services').service('citiesService', function($resource, $q) {
  var citiesSvc = $resource('http://saudeemfocoapi.herokuapp.com/cities');

  return {
    get: function () {
      var deferred = $q.defer();

      citiesSvc.query().$promise.then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }
  };
});
