$('head').append('<link rel="stylesheet" href="spinningwheel.css" type="text/css" \/>');
$('head').append('<script type="text/javascript" src="spinningwheel-min.js"><\/script>');

function openDateSpinner(target) {
  var now = new Date();
  var days = {};
  var years = {};
  for (var i = 1; i < 32; i += 1) {
    days[i] = i;
  }
  for (i = now.getFullYear(); i < now.getFullYear() + 10; i += 1) {
    years[i] = i;
  }
  SpinningWheel.addSlot(months, '', months[now.getMonth()]);
  SpinningWheel.addSlot(days, 'right', now.getDate());
  SpinningWheel.addSlot(years, 'right', now.getFullYear());
  SpinningWheel.setDoneAction(function() {
    var results = SpinningWheel.getSelectedValues().values.join(' ');
    $(target).val(results);
  });
  SpinningWheel.open();
}

$('.date').focus(function() {openDateSpinner(this);});
$('.date').attr('readonly','readonly');