$('head').append('<link rel="stylesheet" href="javascripts/jquery-ui-1.8.16.custom/css/ui-lightness/jquery-ui-1.8.16.custom.css" type="text/css"/>');
$('head').append('<script src="javascripts/jquery-ui-1.8.16.custom/js/jquery-ui-1.8.16.custom.min.js"><\/script>');

$( function () {
  $('.date').datepicker();
  $('.date').datepicker( "option", "dateFormat", 'M d, yy' );
});
