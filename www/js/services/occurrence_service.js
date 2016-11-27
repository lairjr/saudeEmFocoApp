angular.module('starter.services').service('occurrenceService', function($resource, $q) {
  var occurrenceSvc = $resource('http://saudeemfocoapi.herokuapp.com/occurrences/:id');

  function parseOccurrence(occurrenceVM) {
    return {
      description: occurrenceVM.description,
      status: 'ACTIVE',
      type:  occurrenceVM.type,
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
    getById: function (occurrenceId) {
      var deferred = $q.defer();

      occurrenceSvc.get({ id: occurrenceId }).$promise.then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    },
    postReview: function (occurrenceId) {
      var deferred = $q.defer();

      var saveOccurrenceSvc = $resource('http://saudeemfocoapi.herokuapp.com/occurrences/:id/review');

      saveOccurrenceSvc.save({ id: occurrenceId }, null).$promise.then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    },
    post: function(occurrence, username) {
      var deferred = $q.defer();

      var occurrenceData = parseOccurrence(occurrence);
      var saveOccurrenceSvc = $resource('http://saudeemfocoapi.herokuapp.com/occurrences/:username');

      saveOccurrenceSvc.save({ username: username }, occurrenceData).$promise.then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }
  };
});
