describe("Main", function() {

  beforeEach(function() {
    // spyOn(Date, 'getTime').andCallFake(function() {return new Date(79,4,1);});
  });

  describe("round_date", function() {
    it('returns the closest date of the 1st, 15th or 1st of next month', function() {
      var actual = round_date(new Date(2000,1,1));
      expect(actual).toEqual(new Date(2000,1,1));

      actual = round_date(new Date(2000,1,10));
      expect(actual).toEqual(new Date(2000,1,15));

      actual = round_date(new Date(2000,1,20));
      expect(actual).toEqual(new Date(2000,1,15));

      actual = round_date(new Date(2000,1,30));
      expect(actual).toEqual(new Date(2000,2,1));
    });
  });

  describe("date_quarters", function() {
    it('return three dates divided evenly between start and end dates (rounded to 1st & 15th)', function() {
      var actual = date_quarters(new Date(2000,1,1) , new Date(2001,1,1));
      expect(actual).toEqual([new Date(2000,4,1), new Date(2000,7,1), new Date(2000,10,1)]);

      var actual = date_quarters(new Date(2000,1,1) , new Date(2000,5,1));
      expect(actual).toEqual([new Date(2000,2,1), new Date(2000,3,1), new Date(2000,4,1)]);

      var actual = date_quarters(new Date(2000,1,1) , new Date(2000,3,1));
      expect(actual).toEqual([new Date(2000,1,15), new Date(2000,2,1), new Date(2000,2,15)]);

      var actual = date_quarters(new Date(2000,1,5) , new Date(2000,3,5));
      expect(actual).toEqual([new Date(2000,1,15), new Date(2000,2,1), new Date(2000,2,15)]);
    });
  });
  
});
