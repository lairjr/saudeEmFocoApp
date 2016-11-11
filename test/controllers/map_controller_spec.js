describe('Map Controller', function() {
  var scope, ionicLoading, ionicModal, mockOccurrenceService, deferred, fakePromise, newOccurrenceModal;

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
      get: jasmine.createSpy('occurrence.get').and.returnValue(deferred.promise)
    }
    fakePromise = {
      then: jasmine.createSpy('then')
    }
    ionicModal = {
      fromTemplateUrl: jasmine.createSpy('fromTemplateUrl').and.returnValue(fakePromise)
    }
    newOccurrenceModal = {
      show: jasmine.createSpy('show')
    }
    state = {
      go: jasmine.createSpy('state.go')
    }
    $controller('MapsCtrl', { $scope: scope, $ionicLoading: ionicLoading, $ionicModal: ionicModal, $state: state, occurrenceService: mockOccurrenceService });

    var func = fakePromise.then.calls.argsFor(0)[0];
    func(newOccurrenceModal);
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
