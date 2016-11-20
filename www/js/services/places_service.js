angular.module('starter.services').service('placesService', function($resource, $q) {
  var placesSvc = $resource('http://saudeemfocoapi.herokuapp.com/places/:lat/:lng');

  function parseWaitingTime (data) {
    return {
      googleId: data.place_id,
      waitingTime: data.waitingTime
    };
  };

  return {
    getByPosition: function (lng, lat) {
      var deferred = $q.defer();

      placesSvc.query({ lng: lng, lat: lat }).$promise.then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    },
    post: function (waitingTimeData, username) {
      var deferred = $q.defer();
      var placeData = parseWaitingTime(waitingTimeData);
      var placesUsernameSvc = $resource('http://saudeemfocoapi.herokuapp.com/places/' + username);

      placesUsernameSvc.save({ asd: username }, placeData).$promise.then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }
  }
});
