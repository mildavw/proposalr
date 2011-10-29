describe("Main", function() {

  beforeEach(function() {
    spyOn(Date, 'getTime').andCallFake(function() {return new Date(79,4,1);});
  });

  describe("calc_option_date", function() {
    it('return the date two weeks from today, formatted correctly', function() {
      var actual = calc_option_date();
      expect(actual).toEqual('April 15 1979');
    });
  });
  
});
