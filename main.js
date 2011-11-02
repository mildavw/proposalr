months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');

function calc_option_date() {
  now = new Date();
  two_weeks = new Date(now.getTime() + (14 * 24 * 60 * 60 * 1000));
  var result = date_for_display(two_weeks);
  set_pmt_date('option_date', result);
}

function calc_payments(n) {
  var fee = parseFloat($('input[name=flat_fee]').val());
  var deposit = parseFloat($('input[name=due_on_sign]').val());
  if (isNaN(fee) || isNaN(deposit)) {
    alert('Please enter flat fee and due upon signing.');
  } else if (deposit > fee) {
    alert("Deposit can't be larger than flat fee.");
  } else {
    var payment = (fee - deposit) / n;
    $('input[name=qrtly_pmt]').val(parseFloat(payment).toFixed(2));
    calc_payment_dates(n);
  }
}

function set_pmt_date(target, date) {
  $('#input[name=' + target + ']').val(date);
  $('#display_' + target).html(date);
}

function today() { // can spy on this
  return new Date(); 
}

function calc_payment_dates(n) {
  var wedding_date = $('#wedding_date').val();
  if (wedding_date == '') {
    alert('Please set a wedding date.');
  } else {
    var start = today();
    var end = parse_date(wedding_date);
    var results = n_payment_dates(start, end, n);
    for (var i=n-1;i>-1;i--)
    if (end - results[i] < 14 * 24 * 60 * 60 * 1000) {
      results[i] = '14 days prior to the event';
    }
    set_pmt_date('pmt_date_1', results[0] ? date_for_display(results[0]) : '');
    set_pmt_date('pmt_date_2', results[1] ? date_for_display(results[1]) : '');
    set_pmt_date('pmt_date_3', results[2] ? date_for_display(results[2]) : '');
  }
}

function n_payment_dates(start_date, end_date, n) {
  var interval = (end_date - start_date)/(n+1);
  var date_1 = round_date(new Date(start_date.getTime() + interval));
  var date_2 = n > 1 ? round_date(new Date(start_date.getTime() + 2*interval)) : null;
  var date_3 = n > 2 ? round_date(new Date(start_date.getTime() + 3*interval)) : null;
  return [date_1, date_2, date_3];
}

function round_date(date) {
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
}

function next_month(mon, yr) {
  if (mon == 11) return {month:0,year:yr+1};
  return {month:mon+1,year:yr};
}

function parse_date(date_string) {
  var parts = date_string.split(' ');
  return new Date(parts[2], $.inArray(parts[0], months), parts[1]);
}

function date_for_display(date) {
  if (typeof(date) == 'string') return date;
  return [months[date.getMonth()], date.getDate(), date.getFullYear()].join(' ');
}

function hash_add(hash, elements) {
  var len = elements.length;
  for (var i = 0; i < len; i++) {
    name = $(elements[i]).attr('name');
    value = $(elements[i]).val();
    hash[name] = value;
  }
  return hash;
}

function hash_add_checked(hash, elements) {
  var lists = {};
  var len = elements.length;
  for (var i = 0; i < len; i++) {
    name = $(elements[i]).val().split('_')[0];
    value = $(elements[i]).attr('name').replace(/_/g, ' ');
    if (typeof(lists[name]) == 'undefined') lists[name] = [];
    lists[name].push(value);
  }
  for (i in lists) {
    var last = lists[i].pop();
    lists[i].push('and ' + last);
    hash[i] = lists[i].join(', ');
  }
  return hash;
}

function underscore(str) {
  return str.replace(/\s+/g,'_').toLowerCase();
}

function preview() {
  var substitutions = {};
  substitutions = hash_add(substitutions, $('#setup input[type=text]'));
  substitutions = hash_add(substitutions, $('#setup textarea'));
  substitutions = hash_add(substitutions, $('#setup input[type=hidden]'));
  substitutions = hash_add_checked(substitutions, $('#setup input:checked'));

  var new_content = jQuery.extend({}, content);
  for (var j in substitutions) {
    var reg = new RegExp('«'+j+'»', 'gim');
    if (substitutions[j] != '') {
      for (var i in new_content) {
        new_content[i] = new_content[i].replace(reg,substitutions[j]);
      }
    }
  } 
  
  if ($('#preview dt').length > 0) {
    for (var i in new_content) {
      $('#' + underscore(i)).html( new_content[i] );
    }
  } else {
    var insert = '<dl class="edgeToEdge formFields">';
    for (i in new_content) {
      insert += '<dt><label for="'+underscore(i)+'">' + i + '</label></dt>';
      insert += '<dd><textarea cols="60" rows="10" name="name" id="'+underscore(i)+'">' + new_content[i] + '</textarea></dd>';
    }
    $('#preview p').before(insert + '</dl>');
  }
}
