months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');

function openFutureDate(target) {
  var now = new Date();
  var days = {};
  var years = {};
  for (var i = 1; i < 32; i += 1) {
    days[i] = i;
  }
  for (i = now.getFullYear(); i < now.getFullYear() + 10; i += 1) {
    years[i] = i;
  }
  SpinningWheel.addSlot(months, '', months[now.getMonth()]);
  SpinningWheel.addSlot(days, 'right', now.getDate());
  SpinningWheel.addSlot(years, 'right', now.getFullYear());
  SpinningWheel.setDoneAction(function() {
    var results = SpinningWheel.getSelectedValues().values.join(' ');
    document.getElementById(target).value = results;
    document.getElementById('display_' + target).innerHTML = results;
  });
  SpinningWheel.open();
}

function add_calculation_buttons() {
  $('input[name=qrtly_pmt]').parent().append('<button onclick="calc_qrtly_payment();">Calculate</button>');
  $('input[name=option_date]').parent().append('<button onclick="calc_option_date()">Calculate</button>');
  $('input[name=pmt_date_1]').parent().append('<button onclick="calc_payments">Calculate</button>');
}

function calc_qrtly_payment() {
  var fee = parseFloat($('input[name=flat_fee]').val());
  var deposit = parseFloat($('input[name=due_on_sign]').val());
  if (isNaN(fee) || isNaN(deposit)) {
    alert('Please enter flat fee and due upon signing.');
  } else if (deposit > fee) {
    alert("Deposit can't be larger than flat fee.");
  } else {
    var payment = (fee - deposit) / 3;
    $('input[name=qrtly_pmt]').val(parseFloat(payment).toFixed(2));
  }
}

function set_pmt_date(target, value) {
  $('#input[name=' + target + ']').val(value);
  $('#display_' + target).html(value);
}

function calc_option_date() {
  now = new Date();
  two_weeks = new Date(now.getTime() + (14 * 24 * 60 * 60 * 1000));
  var result = [months[two_weeks.getMonth()], two_weeks.getDate(), two_weeks.getFullYear()].join(' ');
  set_pmt_date('option_date', result);
}

function calc_dates() {

}

function date_quarters(start_date, end_date) {
  
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
  
  if ($('#preview dt').length > 0) {
    for (var i in content) {
      $('#' + underscore(i)).html( content[i] );
    }
  } else {
    var insert = '<dl>';
    for (i in content) {
      insert += '<dt><label for="'+underscore(i)+'">' + i + '</label></dt>';
      insert += '<dd><textarea cols="60" rows="10" name="name" id="'+underscore(i)+'">' + content[i] + '</textarea></dd>';
    }
    $('#preview p').before(insert + '</dl>');
  }
}
