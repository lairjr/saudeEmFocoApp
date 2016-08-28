describe('occurrence service', function() {
  var occurrenceService, httpBackend, baseUrl;

  beforeEach(module('ngResource'));
  beforeEach(module('starter.services'));

  beforeEach(inject(function($httpBackend, _occurrenceService_) {
    baseUrl = 'http://saudeemfocoapi.herokuapp.com/occurrences';
    httpBackend = $httpBackend;
    occurrenceService = _occurrenceService_;
  }));

  it('gets occurrences with no parameter', function(done) {
    var occurrences = ['occurrence1', 'occurrence2'];

    httpBackend.expectGET(baseUrl).respond(occurrences);
    var result = occurrenceService.get();

    result.then(function (data) {
      expect(data[0]).toEqual(occurrences[0]);
      expect(data[1]).toEqual(occurrences[1]);
      done();
    });

    httpBackend.flush();
  });

  it('saves occurrence', function(done) {
    var occurrence = {
      description: 'Occurrence description'
    };

    var savedOccurrence = occurrence;
    savedOccurrence['id'] = 'id';

    httpBackend.expectPOST(baseUrl, occurrence).respond(savedOccurrence);
    var result = occurrenceService.post(occurrence);

    result.then(function (data) {
      expect(data.description).toEqual(savedOccurrence.description);
      expect(data.id).toEqual(savedOccurrence.id);
      done();
    });

    httpBackend.flush();
  });
});
