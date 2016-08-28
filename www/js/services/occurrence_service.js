angular.module('starter.services', []).service('occurrenceService', function($resource, $q) {
  var occurrenceSvc = $resource('http://saudeemfocoapi.herokuapp.com/occurrences');

  return {
    get: function() {
      var deferred = $q.defer();

      occurrenceSvc.query().$promise.then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    },
    post: function(occurrence) {
      var deferred = $q.defer();

      occurrenceSvc.save(occurrence).$promise.then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }
  };
});
