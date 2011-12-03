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
  if (confirm("You sure? This will erase unsaved changes.")) {
    var result = $.getJSON('/'+id)
    .success(function(json_data) {load_saved( $.parseJSON(json_data));})
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
  ajax_submit('save');
  return false;
}

function email_pdf() {
  var email_to = prompt('Send PDF to the following address:', default_email());
  if ($('#email_to').length > 0) {
    $('#email_to').val(escape(email_to));
  } else {
    var html = '<input type="hidden" name="email_to" id="email_to" value="'+escape(email_to)+'"/>';
    $('#preview p').eq(0).before(html);
  }
  ajax_submit('email');
  return false;
}

function ajax_submit(path) {
  var jqxhr = $.post(path+'/'+filename(''),
        $("form").serialize(),
        function() {alert("success");}
      )
      .success(function() { alert("second success"); })
      .error(function() { alert("error"); })
      .complete(function() { alert("complete"); });
  // perform other work here ...

  // Set another completion function for the request above
  jqxhr.complete(function(){ alert("second complete"); });
}

function edit_details() {
  $("#preview").hide();
  $("#setup").show();
  return false;
}

function preview_as_html() {
  $('form').attr('target','_blank');
  $('form').attr('action', filename('html'));
  return true;
}

function download_pdf() {
  $('form').removeAttr('target');
  $('form').attr('action', filename('pdf'));
  return true;
}

function review_content() {
  preview();
  $("#setup").hide();
  $("#preview").show();
  return false;
}