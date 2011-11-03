$('head').append('<link rel="stylesheet" href="jquery-ui-1.8.16.custom/css/ui-lightness/jquery-ui-1.8.16.custom.css" type="text/css"/>');
$('head').append('<script type="text/javascript" src="jquery-ui-1.8.16.custom/js/jquery-ui-1.8.16.custom.min.js"><\/script>');

$('.date').datepicker();
$('.date').datepicker( "option", "dateFormat", 'M d yy' );