describe('Occurrence Controller', function() {
  var scope, mockOccurrenceService, mockPlacesService, ionicPopup, deferred;

  beforeEach(module('starter.controllers'));

  beforeEach(inject(function($rootScope, $controller, _$q_) {
    scope = $rootScope.$new();
    deferred = _$q_.defer();

    mockOccurrenceService = {
      post: jasmine.createSpy('occurrence.save').and.returnValue(deferred.promise)
    };
    ionicPopup = {
      alert: jasmine.createSpy('fromTemplateUrl').and.returnValue(deferred.promise)
    };
    stateParams = {
      lat: 1,
      lng: 3
    };
    state = {
      go: jasmine.createSpy('state.go')
    };
    $controller('OccurrenceCtrl', { $scope: scope, $ionicPopup: ionicPopup, $stateParams: stateParams, $state: state, occurrenceService: mockOccurrenceService });
  }));

  describe('save', function () {
    var fakeOccurrence = {
      description: 'Test'
    };

    beforeEach(function () {
      scope.save(fakeOccurrence);
    })

    it('calls occurrence service post', function () {
      expect(mockOccurrenceService.post).toHaveBeenCalledWith(fakeOccurrence);
    });

    it('displays success alert if call return 200', function () {
      deferred.resolve('foo');
      scope.$apply();
      expect(ionicPopup.alert).toHaveBeenCalledWith(jasmine.objectContaining({
        title: jasmine.any(String),
        template: jasmine.any(String)
      }));
    });

    it('navigates to map', function () {
      deferred.resolve('foo');
      scope.$apply();
      expect(state.go).toHaveBeenCalledWith('map');
    });
  });
});
