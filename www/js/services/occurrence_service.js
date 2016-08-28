angular.module('starter.services', []).service('occurrenceService', function($resource, $q) {
  var occurrence = $resource('http://saudeemfocoapi.herokuapp.com/occurrences');

  return {
    get: function() {
      var deferred = $q.defer();

      occurrence.query().$promise.then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }
  };
});
