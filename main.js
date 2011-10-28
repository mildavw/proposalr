function openFutureDate(target) {
  var now = new Date();
  var days = { };
  var years = { };
  var months = { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' };
  for( var i = 1; i < 32; i += 1 ) {
    days[i] = i;
  }
  for( i = now.getFullYear(); i < now.getFullYear()+10; i += 1 ) {
    years[i] = i;
  }
  SpinningWheel.addSlot(years, 'right', now.getFullYear());
  SpinningWheel.addSlot(months, '', months[now.getMonth()]);
  SpinningWheel.addSlot(days, 'right', now.getDate());
  SpinningWheel.setDoneAction( function() {
    var results = SpinningWheel.getSelectedValues().values.join(' ');
    document.getElementById(target).value = results;
    document.getElementById('display_'+target).innerHTML = results; 
  });
  SpinningWheel.open();
}

function calc_payments() {
  
}

function hash_add(hash, elements) {
  var len = elements.length;
  for (var i=0;i<len;i++) {
    name = $(elements[i]).attr('name');
    value = $(elements[i]).val();
    hash[name] = value;
  }
  return hash;
}

function hash_add_checked(hash, elements) {
  var lists = {};
  var len = elements.length;
  for (var i=0;i<len;i++) {
    name = $(elements[i]).val().split('_')[0];
    value = $(elements[i]).attr('name').replace(/_/g,' ');
    if (typeof(lists[name]) == 'undefined') lists[name] = [];
    lists[name].push(value);
  }
  for (var i in lists) {
    var last = lists[i].pop();
    lists[i].push('and ' + last);
    hash[i] = lists[i].join(', ');
  }
  return hash;
}

function preview() {
  var substitutions = {};
  substitutions = hash_add(substitutions, $('#setup input[type=text]'));
  substitutions = hash_add(substitutions, $('#setup textarea'));
  substitutions = hash_add(substitutions, $('#setup input[type=hidden]'));
  substitutions = hash_add_checked(substitutions, $('#setup input:checked'));
    
  // console.info(substitutions);

  $('#preview')
  for (var i in content) {
    var section = '<dt><label for="elements">'+i+'</label></dt>';
    section += '<dd><textarea cols="60" rows="10" name="elements">'+content[i]+'</textarea></dd>';
    $('#preview button').before(section);
  }
}

// address: ""
// avenues: "Suggest avenues and methods that will..."
// bride_first: ""
// bride_last: ""
// city: ""
// due_on_sign: ""
// elements: "Work with vendors and oversee the production of design elements, such as printed materials, attire elements, and décor details."
// email: ""
// flat_fee: ""
// groom_first: ""
// groom_last: ""
// num_assistants: ""
// num_consultations: ""
// num_locations: ""
// num_people: ""
// num_sites: ""
// option_date: ""
// oversee: "infrastructure, arches or canopies, aisle and altar décor, and tablescape"
// phone: ""
// pmt_date_1: ""
// pmt_date_2: ""
// pmt_date_3: ""
// qrtly_pmt: ""
// salutation: ""
// state: ""
// vendor: "rentals, florist, ceremony music, and reception music"
// wedding_date: ""
// wedding_loc: ""
// zip: ""