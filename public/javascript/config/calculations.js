$(function(){
  $('#option_date').parent().append('<button onclick="calc_option_date();return false;">2 Weeks</button>');
  $('#payment_amount').parent().append('<br/><button onclick="calc_payments(2);return false;">Calculate 2</button>');
  $('#payment_amount').parent().append('<button onclick="calc_payments(4);return false;">Calculate 4</button>');
  $('#contract_date').parent().append('<button onclick="insert_today();return false;">Today</button>');
  $('#setup legend').click(function() {$(this).siblings().toggle();});
});

(function(){

  config.default_email = 'emee@ejpevents.com';

  config.filename = function(ext) {
    var event_id = [
      $('#bride_last').val(),
      $('#groom_last').val(),
      underscore($('#wedding_date').val())
    ].join('-');
    if (event_id === '--') event_id = 'untitled';
    if (ext === '') return event_id;
    return event_id + '.' + ext;
  };

  config.pre_preview = function() {
    // Stick any calculations that need to run before preview here.
  };

  config.post_preview = function() {
    // Stick any calculations that need to run after preview is built here.
  };

  config.today = function() { // can spy on this
    return new Date();
  };

  config.calc_payment_dates = function(n) {
    var wedding_date = $('#wedding_date').val();
    if (wedding_date === '') {
      alert('Please set a wedding date.');
    } else {
      var start = this.today();
      var end = parse_date(wedding_date);
      var results = this.n_payment_dates(start, end, n-1);
      for (var i=n-1;i>-1;i--) {
        if (end - results[i] < 14 * 24 * 60 * 60 * 1000) {
          results[i] = '14 days prior to the event';
        }
      }
      this.set_payment_dates(results);
    }
  };

  config.set_payment_dates = function(dates) {
    $('#'+'payment_date_2').val( dates[0] ? date_for_display(dates[0]) : '' );
    $('#'+'payment_date_3').val( dates[1] ? date_for_display(dates[1]) : '' );
    $('#'+'payment_date_4').val( dates[2] ? date_for_display(dates[2]) : '' );
  };

  config.n_payment_dates = function(start_date, end_date, n) {
    var interval = (end_date - start_date)/(n+1);
    var date_1 = this.round_date(new Date(start_date.getTime() + interval));
    var date_2 = n > 1 ? this.round_date(new Date(start_date.getTime() + 2*interval)) : null;
    var date_3 = n > 2 ? this.round_date(new Date(start_date.getTime() + 3*interval)) : null;
    return [date_1, date_2, date_3];
  };

  config.round_date = function(date) {
    // rounds date to closest of
    // a) 1st of this month, b) 15th of this month, c) 1st of next month
    var m = date.getMonth();
    var y = date.getFullYear();
    var a_delta = date - new Date(y, m, 1);
    var b_delta = Math.abs(new Date(y, m, 15) - date);
    var c = next_month(m,y);
    var c_delta = new Date(c.year, c.month, 1) - date;
    var winner_idx = $.inArray(Math.min(a_delta, b_delta, c_delta), [a_delta, b_delta, c_delta]);
    return [new Date(y,m,1), new Date(y,m,15), new Date(c.year, c.month, 1)][winner_idx];
  };

  next_month = function(mon, yr) {
    if (mon == 11) return {month:0,year:yr+1};
    return {month:mon+1,year:yr};
  };

  insert_today = function() {
    var today = date_for_display(new Date());
    $('#contract_date').val(today);
    return false;
  };

  calc_option_date = function() {
    now = new Date();
    two_weeks = new Date(now.getTime() + (14 * 24 * 60 * 60 * 1000));
    var result = date_for_display(two_weeks);
    $('#option_date').val(result);
  };

  calc_payments = function(n) {
    var fee = parseFloat($('#flat_fee').val());
    if (isNaN(fee)) {
      alert('Please enter flat fee.');
    } else {
      var payment = fee / n;
      $('#payment_amount').val(parseFloat(payment).toFixed(2));
      calc_payment_dates(n);
    }
  };

})();