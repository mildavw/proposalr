$(function(){
  build_form();
});

function attributes_to_s(attributes, defaults) {
  if (typeof(attributes) == 'undefined') attributes = {};
  for (var i in defaults) {
    attributes[i] = attributes[i] || defaults[i];
  }
  attrs = [];
  for (i in attributes) {
    attrs.push(i + '="' + attributes[i] + '"');
  }
  return attrs.join(' ');
}
function text_field(nickname,label,attributes) {
  var attrs = attributes_to_s(attributes, {});
  var html = "<dt><label for='"+nickname+"'>"+label+"</label></dt>";
  html += "<dd><input type='text' id='"+nickname+"' name='"+nickname+"' "+attrs+"/></dd>";
  return html;
}
function date_field(nickname,label,attributes) {
  var attrs = attributes_to_s(attributes, {});
  var html = "<dt><label for='"+nickname+"'>"+label+"</label></dt>";
  html += "<dd><input type='text' name='"+nickname+"' id='"+nickname+"' class='date' "+attrs+"/></dd>";
  return html;
}
function checkbox_group_item(nickname,label,prefix,attributes) {
  var defaults = {checked:'checked'};
  var attrs = attributes_to_s(attributes, defaults);
  var html = '<div class="checkbox">';
  html += "<label for='"+nickname+"' onclick='$(\"#"+nickname+"\").check()'>"+label+"</label>";
  html += "<input type='checkbox' name='"+nickname+"' id='"+nickname+"' value='"+prefix+"_"+nickname+"' "+attrs+"/>";
  html += "</div>";
  return html;
}
function checkbox_group(prefix, label, attributes, group){
  var html = '<dt>'+label+'</dt><dd>';
  for (var item in group) {
    var options = group[item];
    var nickname = options.rename || underscore(item);
    html += checkbox_group_item(nickname, item, prefix, options.attributes);
  }
  html += '</dd>';
  return html;
}
function textarea(nickname, label, attributes, text) {
  var defaults = {rows:'10',cols:'60'};
  var attrs = attributes_to_s( attributes, defaults );
  var html = '<dt><label for="'+nickname+'">'+label+'</label></dt>';
  html += '<dd><textarea name="'+nickname+'"'+attrs+'>'+text+'</textarea></dd>';
  return html;
}

function build_form() {
  var html = '';
  for (var section in fields) {
    var inputs = fields[section];
    html += '<fieldset class="edgeToEdge">';
    html += '<legend>'+section+'</legend>';
    html += '<dl class="edgeToEdge formFields" style="display:none;">';
    for (var label in inputs) {
      var options = inputs[label];
      var nickname = options.rename || underscore(label);
      switch(options.type) {
        case 'date':
          html += date_field(nickname, label, options.attributes);
          break;
        case 'checkbox_group':
          html += checkbox_group(nickname, label, options.attributes, options.group);
          break;
        case 'textarea':
          html += textarea(nickname, label, options.attributes, options.text);
          break;
        default: // text input
          html += text_field(nickname, label, options.attributes);
      }
    }
    html += '</dl></fieldset>';
  }
  $('#setup p').before(html);
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

function preview() {
  pre_preview();
  var substitutions = {};
  substitutions = hash_add(substitutions, $('#setup input[type=text]'));
  substitutions = hash_add(substitutions, $('#setup textarea'));
  substitutions = hash_add(substitutions, $('#setup input[type=hidden]'));
  substitutions = hash_add_checked(substitutions, $('#setup input:checked'));

  var new_content = jQuery.extend({}, content);
  for (var j in substitutions) {
    var reg = new RegExp('«'+j+'»', 'gim');
    if (substitutions[j] !== '') {
      for (var i in new_content) {
        new_content[i].text = new_content[i].text.replace(reg,substitutions[j]);
      }
    }
  }

  if ($('#preview dt').length > 0) {
    for (var k in new_content) {
      $('#output_' + underscore(k)).html( new_content[k].text );
    }
  } else {
    var meta = [];
    insert = '<dl class="edgeToEdge formFields">';
    for (var m in new_content) {
      var nick = 'output_' + underscore(m);
      insert += textarea(nick, m, {}, new_content[m].text);
      meta.push({nickname: nick, sort: new_content[m].sort, title: m});
    }
    insert += '</dl>';
    for (var n in meta) {
      insert += '<input type="hidden" name="'+meta[n].nickname+'_sort" value="'+meta[n].sort+'"/>';
      insert += '<input type="hidden" name="'+meta[n].nickname+'_title" value="'+meta[n].title+'"/>';
    }
    $('#preview p').before(insert);
  }
  post_preview();
}