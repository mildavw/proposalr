describe("Config", function() {
  
  describe("round_date", function() {
    it('returns the closest date of the 1st, 15th or 1st of next month', function() {
      var actual = config.round_date(new Date(2000,1,1));
      expect(actual).toEqual(new Date(2000,1,1));

      actual = config.round_date(new Date(2000,1,10));
      expect(actual).toEqual(new Date(2000,1,15));

      actual = config.round_date(new Date(2000,1,20));
      expect(actual).toEqual(new Date(2000,1,15));

      actual = config.round_date(new Date(2000,1,30));
      expect(actual).toEqual(new Date(2000,2,1));
    });
  });

  describe("n_payment_dates", function() {
    it('return n dates divided evenly between start and end dates (rounded to 1st & 15th)', function() {
      var actual = config.n_payment_dates(new Date(2000,1,1) , new Date(2001,1,1), 3);
      expect(actual).toEqual([new Date(2000,4,1), new Date(2000,7,1), new Date(2000,10,1)]);

      actual = config.n_payment_dates(new Date(2000,1,1) , new Date(2000,5,1), 3);
      expect(actual).toEqual([new Date(2000,2,1), new Date(2000,3,1), new Date(2000,4,1)]);

      actual = config.n_payment_dates(new Date(2000,1,1) , new Date(2000,3,1), 3);
      expect(actual).toEqual([new Date(2000,1,15), new Date(2000,2,1), new Date(2000,2,15)]);

      actual = config.n_payment_dates(new Date(2000,1,5) , new Date(2000,3,5), 3);
      expect(actual).toEqual([new Date(2000,1,15), new Date(2000,2,1), new Date(2000,2,15)]);

      actual = config.n_payment_dates(new Date(2000,1,1) , new Date(2000,2,1), 1);
      expect(actual).toEqual([new Date(2000,1,15), null, null]);

      actual = config.n_payment_dates(new Date(2000,1,5) , new Date(2000,2,5), 1);
      expect(actual).toEqual([new Date(2000,1,15), null, null]);
    });
  });

  describe("calc_payment_dates", function() {

    beforeEach(function() {
      var today = new Date(2011, 0, 1);
      spyOn(config, 'today').andCallFake(function() {return today;});
      spyOn(config, 'set_payment_dates');
    });

    it('returns proper date strings to display given a wedding date and the number of payments', function() {
      var event_date = 'Jan 1 2012';
      spyOn($.fn, 'val').andCallFake(function() {return event_date;});
      config.calc_payment_dates(4);
      expect(config.set_payment_dates).toHaveBeenCalledWith(
        [new Date(2011, 3, 1), new Date(2011, 6, 1), new Date(2011, 9, 1)]);
    });

    it('returns "14 days before event" display given a wedding date that is sufficiently soon', function() {
      var event_date = 'Jan 24 2011';
      spyOn($.fn, 'val').andCallFake(function() {return event_date;});
      config.calc_payment_dates(2);
      expect(config.set_payment_dates).toHaveBeenCalledWith(['14 days prior to the event', null, null]);
    });

    it('returns "14 days before event" display given a wedding date that is sufficiently soon', function() {
      var event_date = 'Jan 24 2011';
      spyOn($.fn, 'val').andCallFake(function() {return event_date;});
      config.calc_payment_dates(4);
      var message = '14 days prior to the event';
      expect(config.set_payment_dates).toHaveBeenCalledWith([message, message, message]);
    });

  });

});
