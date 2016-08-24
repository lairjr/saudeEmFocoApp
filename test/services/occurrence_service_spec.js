describe('occurrence service', function() {
  beforeEach(module('starter.services'));

  var occurrenceService;

  beforeEach(inject(function(_occurrenceService_) {
    occurrenceService = _occurrenceService_;
  }));

  it('has occurrence service', function() {
    expect(!!occurrenceService).toBe(true);
  });
});
