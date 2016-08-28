describe('Controllers', function() {
  var scope, ionicLoading, mockOccurrenceService, deferred;

  beforeEach(module('starter.controllers'));

  beforeEach(inject(function($rootScope, $controller, _$q_) {
    spyOn(google.maps, 'LatLng').and.returnValue({ foo: 'foo' });
    spyOn(google.maps, 'Marker').and.returnValue('marker');
    scope = $rootScope.$new();
    deferred = _$q_.defer();
    ionicLoading = {
      show: jasmine.createSpy('show')
    };
    mockOccurrenceService = {
      get: jasmine.createSpy('occurrence.get').and.returnValue(deferred.promise),
      save: jasmine.createSpy('occurrence.save').and.returnValue(deferred.promise)
    }
    $controller('MapsCtrl', { $scope: scope, $ionicLoading: ionicLoading, occurrenceService: mockOccurrenceService });
  }));

  describe('init', function () {
    var map, loadedOccurrence;

    loadedOccurrence = {
      location: {
        coordinates: ['latitude', 'longitude']
      }
    };

    beforeEach(function () {
      map = {
        setCenter: jasmine.createSpy('map.setCenter')
      };

      scope.init(map);
    });

    it('sets map position', function () {
      expect(scope.map.setCenter).toHaveBeenCalled();
    });

    it('shows occurrence data', function () {
      deferred.resolve([loadedOccurrence]);
      scope.$apply();
      expect(mockOccurrenceService.get).toHaveBeenCalled();
      expect(google.maps.LatLng.calls.argsFor(1)).toEqual([loadedOccurrence.location.coordinates[0], loadedOccurrence.location.coordinates[1]]);
      expect(google.maps.Marker.calls.argsFor(0)).toEqual([{ map: map, position: { foo: 'foo' } }]);
    });
  });
});
