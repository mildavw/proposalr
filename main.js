function openFutureDate(target) {
  var now = new Date();
  var days = { };
  var years = { };
  var months = { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' };
  for( var i = 1; i < 32; i += 1 ) {
    days[i] = i;
  }
  for( i = now.getFullYear(); i < now.getFullYear()+10; i += 1 ) {
    years[i] = i;
  }
  SpinningWheel.addSlot(years, 'right', now.getFullYear());
  SpinningWheel.addSlot(months, '', months[now.getMonth()]);
  SpinningWheel.addSlot(days, 'right', now.getDate());
  SpinningWheel.setDoneAction( function() {
    var results = SpinningWheel.getSelectedValues().values.join(' ');
    document.getElementById(target).value = results;
    document.getElementById('display_'+target).innerHTML = results; 
  });
  SpinningWheel.open();
}

function showhide(id){
  if (document.getElementById){
    obj = document.getElementById(id);
    if (obj.style.display == "none"){
      obj.style.display = "";
    } else {
      obj.style.display = "none";
    }
  }
}

function preview() {
  
  for (var i in content) {
    console.info(i);
  }
}