describe('Controllers', function(){
    var scope, ionicLoading;

    beforeEach(module('starter.controllers'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ionicLoading = {
          show: jasmine.createSpy('show')
        };
        $controller('MapCtrl', { $scope: scope, $ionicLoading: ionicLoading });
    }));

    it('has scope', function(){
        expect(scope).not.toBeUndefined();
    });
});
