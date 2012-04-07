(function() {

  app.load_doc = function(id) {
    show_loading();
    var result = $.getJSON('/'+id)
      .success(function(json) { app.load_saved(id, json); hide_message(); })
      .error(function() { alert("Error: document not loaded."); });
    return false;
  };

  app.view_index = function() {
    if (app.last_saved !== $('#detail_form').serialize()) {
      if (confirm('Save current document?')) {app.save_doc();}
    }
    $("#new").toggle();
    $("#index").toggle();
    return false;
  };

  app.delete_doc = function(id) {
    if (confirm("You sure?")) {
      $('#doc_'+id).remove();
      var err = function() {alert("Error: document not deleted.");};
      $.get('/delete/'+id).error(err);
    }
    return false;
  };

  app.save_doc = function() {
    var success = function(response) {
                    $('document_id').val(response);
                    app.last_saved = $('#detail_form').serialize();
                  };
    ajax_post('save','#detail_form', 'Saving...', success);
    return false;
  };

  app.email_pdf = function() {
    this.preview();
    var email_to = prompt('Send PDF to the following address:', config.default_email);
    if (email_to !== null) {
      if ($('#email_to').length > 0) {
        $('#email_to').val(escape(email_to));
      } else {
        var html = '<input type="hidden" name="email_to" id="email_to" value="'+escape(email_to)+'"/>';
        $('#preview').append(html);
      }
      ajax_post('email','#preview_form', 'Sending...');
    }
    return false;
  };

  app.preview_as_html = function() {
    this.preview();
    $('#preview_form').attr('target','_blank');
    $('#preview_form').attr('action', 'html');
    $('#preview_form').submit();
    return false;
  };

  app.download_pdf = function() {
    this.preview();
    $('#preview_form').removeAttr('target');
    $('#preview_form').attr('action', 'pdf');
    $('#preview_form').submit();
    return false;
  };

  function ajax_post(path, form, msg, callback) {
    show_loading(msg);
    $('input[name=filename]').val(config.filename);
    data = $(form).serialize();
    var jqxhr = $.post(path, data)
    .error(function(data) { show_error_message(data.responseText); })
    .success(callback);
    jqxhr.complete(function(){ hide_message(); });
  }

  function show_loading(msg) {
    if (!msg) message = 'Loading...';
    $('#message').css('color:green;font-weight:bold');
    $('#message').html(msg);
  }

  function show_message(msg) {
    $('#message').css('color:black;font-weight:bold');
    $('#message').html(msg);
  }

  function show_temporary_message(msg) {
    $('#message').css('color:black;font-weight:bold');
    $('#message').html(msg);
    setTimeout(hide_message, 3000);
  }

  function show_error_message(msg) {
    $('#message').css('color:red;font-weight:bold');
    $('#message').html(msg);
  }

  function hide_message() {
    $('#message').html('');
  }

})();