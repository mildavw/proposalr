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
  var ilen = group.length;
  for (var i = 0; i < ilen; i++) {
    var item = group[i];
    var nickname = item.rename || underscore(item.label);
    html += checkbox_group_item(nickname, item.label, prefix, item.attributes);
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
  var ilen = fields.length;
  for (var i = 0; i < ilen; i++) {
    html += '<fieldset class="edgeToEdge">';
    html += '<legend>'+fields[i].label+'</legend>';
    html += '<dl class="edgeToEdge formFields" style="display:none;">';
    var inputs = fields[i].inputs;
    var jlen = inputs.length;
    for (var j = 0; j < jlen; j++) {
      input = inputs[j];
      var nickname = input.rename || underscore(input.label);
      switch(input.type) {
        case 'date':
          html += date_field(nickname, input.label, input.attributes);
          break;
        case 'checkbox_group':
          html += checkbox_group(nickname, input.label, input.attributes, input.group);
          break;
        case 'textarea':
          html += textarea(nickname, input.label, input.attributes, input.text);
          break;
        default: // text input
          html += text_field(nickname, input.label, input.attributes);
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

function build_substitution_hash() {
  var substitutions = {};
  substitutions = hash_add(substitutions, $('#setup input[type=text]'));
  substitutions = hash_add(substitutions, $('#setup textarea'));
  substitutions = hash_add(substitutions, $('#setup input[type=hidden]'));
  substitutions = hash_add_checked(substitutions, $('#setup input:checked'));
  return substitutions;
}

function make_substitutions_in_content(substitutions) {
  var new_content = jQuery.extend([], content);
  for (var j in substitutions) {
    var reg = new RegExp('«'+j+'»', 'gim');
    if (substitutions[j] !== '') {
      for (var i=0;i<new_content.length;i++) {
        new_content[i].text = new_content[i].text.replace(reg,substitutions[j]);
      }
    }
  }
return new_content;
}

function update_content_preview(new_content) {
  if ($('#preview dt').length > 0) {
    for (var i=0;i<new_content.length;i++) {
      $('#output_' + underscore(new_content[i].title)).html( new_content[i].text );
    }
  } else {
    var meta = {};
    insert = '<dl class="edgeToEdge formFields">';
    for (var j in new_content) {
      var nick = 'output_' + underscore(j);
      insert += textarea(nick, new_content[j].title, {}, new_content[j].text);
      meta[nick] = {sort: j, title: new_content[j].title,
                style: new_content[j].style, attributes: new_content[j].attributes};
    }
    insert += '</dl>';
    for (var k in meta) {
      insert += '<input type="hidden" name="'+k+'_meta" value="'+escape($.toJSON(meta[k]))+'"/>';
    }
    $('#preview p').before(insert);
  }
}

function preview() {
  pre_preview();
  var substitutions = build_substitution_hash();
  var new_content = make_substitutions_in_content(substitutions);
  update_content_preview(new_content);
  post_preview();
}