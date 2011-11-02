function openFutureDate(target) {
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
    document.getElementById(target).value = results;
    document.getElementById('display_' + target).innerHTML = results;
  });
  SpinningWheel.open();
}
