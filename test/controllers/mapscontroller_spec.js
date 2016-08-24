describe('Controllers', function(){
    var scope, ionicLoading;

    beforeEach(module('starter.controllers'));

    beforeEach(inject(function($rootScope, $controller) {
      spyOn(google.maps, 'LatLng').and.returnValue({ foo: 'foo' });
      scope = $rootScope.$new();
      ionicLoading = {
        show: jasmine.createSpy('show')
      };
      $controller('MapsCtrl', { $scope: scope, $ionicLoading: ionicLoading });
    }));

    describe('init', function () {
      var map;

      beforeEach(function () {
        map = {
          setCenter: jasmine.createSpy('map.setCenter')
        };
      });

      it('sets map position', function () {
        scope.init(map);

        expect(scope.map.setCenter).toHaveBeenCalled();
      });
    });
});
