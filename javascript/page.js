$(function(){
  edit();
  $('#setup legend').click(function() {$(this).siblings().toggle();});
});

function dict_field(variable,label,is_numeric) {
  is_numeric = typeof(is_numeric) == 'undefined' ? false : true;
  document.write("<dt><label for='"+variable+"'>"+label+"</label></dt>");
  document.write("<dd><input type='text' name='"+variable+"' value='' " + (is_numeric ? "pattern='[0-9]*'" : '') + "/></dd>");
}
function date_field(variable,label) {
  document.write("<dt><label for='"+variable+"'>"+label+"</label></dt>");
  document.write("<dd><input type='text' name='"+variable+"' id='"+variable+"' value='' class='date'/></dd>");
}
function checkbox(variable,label,prefix) {
  document.write('<div class="checkbox">');
  document.write("<label for='"+variable+"' onclick='$(\"#"+variable+"\").check()'>"+label+"</label>");
  document.write("<input type='checkbox' name='"+variable+"' id='"+variable+"' value='"+prefix+"_"+variable+"' checked='checked'/>");
  document.write("</div>");
}

function edit() {
  var html = '';
  for (var section in fields) {
    var inputs = fields[section];
    html += '<fieldset class="edgeToEdge">';
    html += '<legend>'+section+'</legend>';
    html += '<dl class="edgeToEdge formFields" style="display:block;">';
    for (var input in inputs) {
      var options = inputs[input];
      switch(options['type']) {
        case 'text':
          html += dict_field(underscore(input), input);
          break;
        case 'date':
          html += date_field(underscore(input), input);
          break;
        default:
          // alert('Input type' + input.type +' not found in page#edit');
      }
    }
  }
  html += '</dl></fieldset>';
  console.info(html);
  $('#setup p').before(html);
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
    var event_id = substitutions['bride_last'] + '-' + substitutions['groom_last'] + '-' + underscore(substitutions['wedding_date']);
    var insert = '<input class="hidden" name="event_id" value="'+event_id+'"/>';
    insert += '<dl class="edgeToEdge formFields">';
    for (i in new_content) {
      insert += '<dt><label for="'+underscore(i)+'">' + i + '</label></dt>';
      insert += '<dd><textarea cols="60" rows="10" name="name" id="'+underscore(i)+'">' + new_content[i] + '</textarea></dd>';
    }
    $('#preview p').before(insert + '</dl>');
  }
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
