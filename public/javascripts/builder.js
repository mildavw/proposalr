(function() {

  app.load_saved = function(id, doc) {
    update_content_preview(config.template);
    var i, content_index;
    for (i in doc) {
      content_index = i.match(/^output_(\d+)(_meta)?$/);
      if (content_index && content_index[1] && content_index[2] === undefined) {
        // populate content fields with content data while ignoring meta fields
        $('textarea[name=output_'+content_index[1]+']').html(doc[i]);
      } else {
        // populate details fields with details data
        switch ( $('#'+i).get(0).tagName ) {
          case 'TEXTAREA':
            $('#'+i).html(doc[i]);
            break;
          case 'INPUT':
            $('#'+i).val(doc[i]);
            break;
        }
      }
    }
    $('#document_id').val(id);
    $('input[name=filename]').val(config.filename);
    $("#new").toggle(); $("#index").toggle();
  };

  app.new_doc = function() {
    $("form").each(function(_,f){f.reset();});
    $("#document_id").val('');
    $('input[name=filename]').val('');
    app.last_saved = $('#detail_form').serialize();
    $("#new").toggle();
    $("#index").toggle();
    return false;
  };

  app.preview = function() {
    config.pre_preview();
    $('input[name=filename]').val(config.filename);
    var substitutions = build_substitution_hash();
    var new_content = make_substitutions_in_content(substitutions);
    update_content_preview(new_content);
    config.post_preview();
  };
  
  app.build_form = function() {
    var html = '';
    var ilen = config.fields.length;
    for (var i = 0; i < ilen; i++) {
      html += '<fieldset class="edgeToEdge">';
      html += '<legend>'+config.fields[i].label+'</legend>';
      html += '<dl class="edgeToEdge formFields" style="display:none;">';
      var inputs = config.fields[i].inputs;
      var jlen = inputs.length;
      for (var j = 0; j < jlen; j++) {
        input = inputs[j];
        var nickname = (input.rename || underscore(input.label).toLowerCase());
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
    $('#setup p:first').before(html);
  };

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
  function hidden_field(nickname,label,attributes,value) {
    var attrs = attributes_to_s(attributes, {});
    var html = "<dt style='display:none'><dt>";
    html += "<dd style='display:none'><input type='hidden' id='"+nickname+"' name='"+nickname+"' value='"+value+"' "+attrs+"/></dd>";
    return html;
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
      var nickname = item.rename || underscore(item.label).toLowerCase();
      html += checkbox_group_item(nickname, item.label, prefix, item.attributes);
    }
    html += '</dd>';
    return html;
  }
  function textarea(nickname, label, attributes, text) {
    var defaults = {rows:'10',cols:'60'};
    var attrs = attributes_to_s( attributes, defaults );
    var html = '<dt><label for="'+nickname+'">'+label+'</label></dt>';
    html += '<dd><textarea name="'+nickname+'" id="'+nickname+'" '+attrs+'>'+text+'</textarea></dd>';
    return html;
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
    var new_content = jQuery.extend([], config.template);
    for (var j in substitutions) {
      var reg = new RegExp('«'+j.replace(/^in_/,'')+'»', 'gim');
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
      var ilen = new_content.length;
      for (var i=0;i<ilen;i++) {
        $('#output_'+i).html( new_content[i].text );
      }
    } else {
      var meta = [];
      insert = '<dl class="edgeToEdge formFields">';
      var jlen = new_content.length;
      for (var j=0;j<jlen;j++) {
        var item = new_content[j];
        var nick = 'output_'+j;
        if (item.hide_preview) {
          insert += hidden_field(nick, item.title, {}, item.text);
        } else {
          insert += textarea(nick, item.title, {}, item.text);
        }
        meta_info = {sort:j, title:item.title, style:item.style};
        for (var n in item.attributes) meta_info[n] = item.attributes[n];
        meta.push(meta_info);
      }
      insert += '</dl>';
      for (var k in meta){
        insert += '<input type="hidden" name="output_'+k+'_meta" value="'+escape($.toJSON(meta[k]))+'"/>';
      }
      $('#preview').html(insert);
    }
  }

})();
