describe('Map Controller', function() {
  var scope, ionicLoading, ionicModal, mockOccurrenceService, mockPlacesService, deferred;

  beforeEach(module('starter.controllers'));

  beforeEach(inject(function($rootScope, $controller, _$q_) {
    spyOn(google.maps, 'LatLng').and.returnValue({ foo: 'foo' });
    spyOn(google.maps, 'Marker').and.returnValue('marker');
    scope = $rootScope.$new();
    deferred = _$q_.defer();
    ionicLoading = {
      show: jasmine.createSpy('show')
    };
    mockPlacesService = {
      getByPosition: jasmine.createSpy('occurrence.save').and.returnValue(deferred.promise)
    };
    mockOccurrenceService = {
      get: jasmine.createSpy('occurrence.get').and.returnValue(deferred.promise)
    }
    newOccurrenceModal = {
      show: jasmine.createSpy('show')
    }
    state = {
      go: jasmine.createSpy('state.go')
    }
    $controller('MapsCtrl', { $scope: scope, $ionicLoading: ionicLoading, $state: state, occurrenceService: mockOccurrenceService, placesService: mockPlacesService });
    spyOn(scope, 'centerOnMe');
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
        setCenter: jasmine.createSpy('map.setCenter'),
        addListener: jasmine.createSpy('map.addListener')
      };

      scope.init(map);
    });

    it('sets map position', function () {
      expect(scope.centerOnMe).toHaveBeenCalled();
    });

    it('shows occurrence data', function () {
      scope.loadOccurrences();

      deferred.resolve([loadedOccurrence]);
      scope.$apply();
      expect(mockOccurrenceService.get).toHaveBeenCalled();
      expect(google.maps.LatLng.calls.argsFor(1)).toEqual([loadedOccurrence.location.coordinates[0], loadedOccurrence.location.coordinates[1]]);
      expect(google.maps.Marker.calls.argsFor(0)).toEqual([jasmine.objectContaining({ map: map, position: { foo: 'foo' } })]);
    });
  });

  describe('goToOccurrence', function () {
    beforeEach(function () {
      var fakePosition = {
        lng: function () {
          return 1;
        },
        lat: function () {
          return 2;
        }
      }
      scope.map = {
        getCenter: jasmine.createSpy('map.getCenter').and.returnValue(fakePosition)
      }
      scope.goToOccurrence();
    });

    it('navigates to occurrence', function () {
      expect(state.go).toHaveBeenCalledWith('occurrence', { lat: 2, lng: 1 });
    });
  });
});
