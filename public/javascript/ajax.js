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

function load_doc(id) {
  if (confirm("You sure? This will erase unsaved changes in the current document.")) {
    var result = $.getJSON('/'+id)
    .success(function(json) {load_saved(json);})
    .error(function() {alert("Error: document not loaded.");});
  }
  return false;
}

function delete_doc(id) {
  if (confirm("You sure?")) {
    $('#doc_'+id).remove();
    $.get('/delete/'+id).error(function() {alert("Error: document not deleted.");});
  }
  return false;
}

function save_all() {
  ajax_submit('save','#detail_form');
  return false;
}

function email_pdf() {
  preview();
  var email_to = prompt('Send PDF to the following address:', config.default_email);
  if ($('#email_to').length > 0) {
    $('#email_to').val(escape(email_to));
  } else {
    var html = '<input type="hidden" name="email_to" id="email_to" value="'+escape(email_to)+'"/>';
    $('#preview p').eq(0).before(html);
  }
  ajax_submit('email','#preview_form');
  return false;
}

function preview_as_html() {
  preview();
  $('#preview_form').attr('target','_blank');
  $('#preview_form').attr('action', filename('html'));
  $('#preview_form').submit();
  return false;
}

function download_pdf() {
  preview();
  $('#preview_form').removeAttr('target');
  $('#preview_form').attr('action', filename('pdf'));
  $('#preview_form').submit();
  return false;
}

function ajax_submit(path, form) {
  var jqxhr = $.post(path+'/'+filename(''),
        $(form).serialize(),
        function() { // alert("success");
        }
      )
      .success(function() { //alert("second success");
      })
      .error(function() { alert("error"); })
      .complete(function() { //alert("complete");
       });
  // perform other work here ...

  // Set another completion function for the request above
  jqxhr.complete(function(){ alert("second complete"); });
}