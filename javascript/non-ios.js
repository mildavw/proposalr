$('head').append('<link rel="stylesheet" href="javascript/jquery-ui-1.8.16.custom/css/ui-lightness/jquery-ui-1.8.16.custom.css" type="text/css"/>');
$('head').append('<script type="text/javascript" src="javascript/jquery-ui-1.8.16.custom/js/jquery-ui-1.8.16.custom.min.js"><\/script>');

$( function () {
  $('.date').datepicker();
  $('.date').datepicker( "option", "dateFormat", 'M d, yy' );
});