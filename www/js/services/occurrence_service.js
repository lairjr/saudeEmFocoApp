angular.module('starter.services').service('occurrenceService', function($resource, $q) {
  var occurrenceSvc = $resource('http://saudeemfocoapi.herokuapp.com/occurrences/:username');

  function parseOccurrence(occurrenceVM) {
    return {
      description: occurrenceVM.description,
      status: 'ACTIVE',
      location: {
        type: 'Point',
        coordinates: [occurrenceVM.location.lat, occurrenceVM.location.lng]
      }
    };
  };

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
    post: function(occurrence, username) {
      var deferred = $q.defer();

      var occurrenceData = parseOccurrence(occurrence);

      occurrenceSvc.save({ username: username }, occurrenceData).$promise.then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }
  };
});
