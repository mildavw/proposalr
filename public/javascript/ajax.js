(function() {

  app.load_doc = function(id) {
    if (confirm("You sure? This will erase unsaved changes in the current document.")) {
      show_loading();
      var result = $.getJSON('/'+id)
      .success(function(json) {app.load_saved(json);hide_message();})
      .error(function() {alert("Error: document not loaded.");});
    }
    return false;
  };

  app.delete_doc = function(id) {
    if (confirm("You sure?")) {
      $('#doc_'+id).remove();
      $.get('/delete/'+id).error(function() {alert("Error: document not deleted.");});
    }
    return false;
  };

  app.save_all = function() {
    ajax_submit('save','#detail_form', 'Saving...');
    return false;
  };

  app.email_pdf = function() {
    this.preview();
    var email_to = prompt('Send PDF to the following address:', config.default_email);
    if ($('#email_to').length > 0) {
      $('#email_to').val(escape(email_to));
    } else {
      var html = '<input type="hidden" name="email_to" id="email_to" value="'+escape(email_to)+'"/>';
      $('#preview').append(html);
    }
    ajax_submit('email','#preview_form', 'Sending...');
    return false;
  };

  app.preview_as_html = function() {
    this.preview();
    $('#preview_form').attr('target','_blank');
    $('#preview_form').attr('action', config.filename('html'));
    $('#preview_form').submit();
    return false;
  };

  app.download_pdf = function() {
    this.preview();
    $('#preview_form').removeAttr('target');
    $('#preview_form').attr('action', config.filename('pdf'));
    $('#preview_form').submit();
    return false;
  };

  function ajax_submit(path, form, msg) {
    show_loading(msg);
    var jqxhr = $.post(
      path+'/'+config.filename(''),
      $(form).serialize()
    )
    .error(function() { show_error_message("error"); });
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