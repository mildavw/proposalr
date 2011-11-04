describe("Main", function() {
  
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

  describe("n_payment_dates", function() {
    it('return n dates divided evenly between start and end dates (rounded to 1st & 15th)', function() {
      var actual = n_payment_dates(new Date(2000,1,1) , new Date(2001,1,1), 3);
      expect(actual).toEqual([new Date(2000,4,1), new Date(2000,7,1), new Date(2000,10,1)]);

      actual = n_payment_dates(new Date(2000,1,1) , new Date(2000,5,1), 3);
      expect(actual).toEqual([new Date(2000,2,1), new Date(2000,3,1), new Date(2000,4,1)]);

      actual = n_payment_dates(new Date(2000,1,1) , new Date(2000,3,1), 3);
      expect(actual).toEqual([new Date(2000,1,15), new Date(2000,2,1), new Date(2000,2,15)]);

      actual = n_payment_dates(new Date(2000,1,5) , new Date(2000,3,5), 3);
      expect(actual).toEqual([new Date(2000,1,15), new Date(2000,2,1), new Date(2000,2,15)]);

      actual = n_payment_dates(new Date(2000,1,1) , new Date(2000,2,1), 1);
      expect(actual).toEqual([new Date(2000,1,15), null, null]);

      actual = n_payment_dates(new Date(2000,1,5) , new Date(2000,2,5), 1);
      expect(actual).toEqual([new Date(2000,1,15), null, null]);
    });
  });

  describe("calc_payment_dates", function() {

    beforeEach(function() {
      var today = new Date(2011, 0, 1);
      spyOn(window, 'today').andCallFake(function() {return today;});
      spyOn(window, 'set_pmt_date');
    });

    it('returns proper date strings to display given a wedding date and the number of payments', function() {
      var event_date = 'Jan 1 2012';
      spyOn($.fn, 'val').andCallFake(function() {return event_date;});
      calc_payment_dates(3);
      expect(set_pmt_date).toHaveBeenCalledWith(['pmt_date_1','Apr 1 2011'], ['pmt_date_2','Jul 1 2011'], ['pmt_date_3','Oct 1 2011']);
    });

    it('returns "14 days before event" display given a wedding date that is sufficiently soon', function() {
      var event_date = 'Jan 24 2011';
      spyOn($.fn, 'val').andCallFake(function() {return event_date;});
      calc_payment_dates(1);
      expect(set_pmt_date).toHaveBeenCalledWith(['pmt_date_1','14 days prior to the event'], ['pmt_date_2',''], ['pmt_date_3','']);
    });

    it('returns "14 days before event" display given a wedding date that is sufficiently soon', function() {
      var event_date = 'Jan 24 2011';
      spyOn($.fn, 'val').andCallFake(function() {return event_date;});
      calc_payment_dates(3);
      var message = '14 days prior to the event';
      expect(set_pmt_date).toHaveBeenCalledWith(['pmt_date_1','Jan 1 2011'], ['pmt_date_2',message], ['pmt_date_3',message]);
    });

  });

});
