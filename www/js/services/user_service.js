angular.module('starter.services').service('userService', function($resource, $q) {
  var userSvc = $resource('http://saudeemfocoapi.herokuapp.com/users/:username');

  function parseUser (data) {
    return {
      name: data.username,
      password: data.password,
      reportNumber: data.reportNumber ? data.reportNumber : 0
    };
  };

  return {
    get: function () {
      var deferred = $q.defer();

      userSvc.query().$promise.then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    },
    getByUsername: function (username) {
      var deferred = $q.defer();

      userSvc.query({ username: username }).$promise.then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    },
    post: function (userData) {
      var deferred = $q.defer();

      var user = parseUser(userData);

      userSvc.save(user).$promise.then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }
  };
});
