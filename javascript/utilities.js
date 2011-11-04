months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');

function parse_date(date_string) {
  var parts = date_string.split(' ');
  return new Date(parts[2], $.inArray(parts[0], months), parts[1]);
}

function date_for_display(date) {
  if (typeof(date) == 'string') return date;
  return [months[date.getMonth()], date.getDate(), date.getFullYear()].join(' ');
}

function underscore(str) {
  return str.replace(/\s+/g,'_').toLowerCase();
}