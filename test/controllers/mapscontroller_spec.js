describe('Controllers', function() {
  var scope, ionicLoading, ionicModal, mockOccurrenceService, deferred, fakePromise, addOccurrenceModal;

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
    fakePromise = {
      then: jasmine.createSpy('then')
    }
    ionicModal = {
      fromTemplateUrl: jasmine.createSpy('fromTemplateUrl').and.returnValue(fakePromise)
    }
    addOccurrenceModal = {
      open: jasmine.createSpy('open')
    }
    $controller('MapsCtrl', { $scope: scope, $ionicLoading: ionicLoading, $ionicModal: ionicModal, occurrenceService: mockOccurrenceService });

    var func = fakePromise.then.calls.argsFor(0)[0];
    func(addOccurrenceModal);
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

  describe('addNewOccurrence', function () {
    beforeEach(function() {
      scope.addNewOccurrence();
    });

    it('opens add new occurrence modal', function () {
      expect(addOccurrenceModal.open).toHaveBeenCalled();
    });
  });
});
