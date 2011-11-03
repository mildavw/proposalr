<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
  <title>EJP Events Proposalr</title>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
  <link rel="stylesheet" href="iphone.css" />
  <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />

  <link rel="stylesheet" href="spinningwheel.css" type="text/css" media="all" />

  </head>

  <?php
function dict_field($var,$label,$is_numeric=false) {
  echo "<dt><label for='{$var}'>{$label}</label></dt>";
  echo "<dd><input type='text' name='{$var}' value='' " . ($is_numeric ? "pattern='[0-9]*'" : '') . "/></dd>";
}
function date_field($var,$label) {
  echo "<dt><label for='{$var}'>{$label}</label></dt>";
  echo "<dd><input type='text' name='{$var}' id='{$var}' value='' class='date'/></dd>";
}
function checkbox($var,$label,$prefix) {
  echo '<div class="checkbox">';
  echo "<label for='{$var}' onclick='$(\"#{$var}\").check()'>{$label}</label>";
  echo "<input type='checkbox' name='{$var}' id='{$var}' value='{$prefix}_{$var}' checked='checked'/>";
  echo "</div>";
}
?>

<body>
<div id='setup' style='display:block'>
  <fieldset class="edgeToEdge contact">
  <legend>Contact</legend>
  <dl class="edgeToEdge formFields" style="display:none;">
    <?php
      dict_field('bride_first','Bride First:');
      dict_field('bride_last','Bride Last:');
      dict_field('groom_first','Groom First:');
      dict_field('groom_last','Groom Last:');
      dict_field('salutation','Salutation:');
      dict_field('address','Address:');
      dict_field('city','City:');
      dict_field('state','State:');
      dict_field('zip','Zip:');
      dict_field('phone','Phone:');
      dict_field('email','Email:');
    ?>
  </dl>
  </fieldset>

  <fieldset class="edgeToEdge wedding">
  <legend>Wedding</legend>
  <dl class="edgeToEdge formFields" style="display:none;">
    <?php
      date_field('wedding_date','Date:');
      dict_field('wedding_loc','Location:');
      dict_field('num_people','Number Guests:');
      dict_field('num_locations','Number Locations:');
    ?>
  </dl>
  </fieldset>

  <fieldset class="edgeToEdge">
  <legend>Services</legend>
  <dl class="edgeToEdge formFields" style="display:none;">
    <?php
      dict_field('num_consultations','# of Consultations:');
      dict_field('num_sites','# of Sites:');
      dict_field('num_assistants','# of Assistants:');
    ?>

  <dt>Vendor Suggestions:</dt>
  <dd>
    <?php
      checkbox('photographer','Photographer','vendors');
      checkbox('videographer','Videographer','vendors');
      checkbox('hair_stylist','Hair Stylist','vendors');
      checkbox('makeup_artist','Makeup Artist','vendors');
      checkbox('caterer','Caterer','vendors');
      checkbox('cake_baker','Cake Baker','vendors');
      checkbox('rentals','Rentals','vendors');
      checkbox('florist','Florist','vendors');
      checkbox('ceremony_music','Ceremony Music','vendors');
      checkbox('reception_music','Reception Music','vendors');
      checkbox('rehearsal_dinner_site','Rehearsal Dinner Site','vendors');
      checkbox('attire','Attire','vendors');
      checkbox('invitations','invitations','vendors');
      checkbox('getting_ready_site','Getting Ready Site','vendors');
      checkbox('lodging','Lodging','vendors');
      checkbox('transportation','Transportation','vendors');
    ?>
  </dd>

  <dt><label for="elements">Elements</label></dt>
  <dd><textarea cols="60" rows="10" name="elements">Work with vendors and oversee the production of design elements, such as printed materials, attire elements, and décor details.</textarea>
  </dd>

  <dt><label for="avenues">Avenues/Methods</label></dt>
  <dd><textarea cols="60" rows="10" name="avenues">Suggest avenues and methods that will  create/emphasize/ensure INSERT CLIENT’S GOTTA-HAVES HERE.</textarea>
  </dd>

  <dt>Will Oversee:</dt>
  <dd>
    <?php
      checkbox('tents','Tents','oversee');
      checkbox('lighting','Lighting','oversee');
      checkbox('infrastructure','Infrastructure','oversee');
      checkbox('arches_or_canopies','Arches or Canopies','oversee');
      checkbox('aisle_and_altar_décor','Aisle And Altar Décor','oversee');
      checkbox('floral_arrangements','Floral Arrangements','oversee');
      checkbox('tablescape','Tablescape','oversee');
      checkbox('other_custom-built_items','Other custom-built items','oversee');
    ?>
  </dd>
  </dl>
  </fieldset>

  <fieldset class="edgeToEdge">
  <legend>Fees</legend>
  <dl class="edgeToEdge formFields" style="display:none;">
  <?php
    date_field('option_date','Option Date:');
    dict_field('flat_fee','Flat Fee:',true);
    dict_field('due_on_sign','Due Upon Signing:',true);
    dict_field('qrtly_pmt','Payment Amount:');
    date_field('pmt_date_1','Payment Date 1:');
    date_field('pmt_date_2','Payment Date 2:');
    date_field('pmt_date_3','Payment Date 3:');
  ?>
  </dl>
  </fieldset>

  <p class="edgeToEdge formButtons">
    <button onclick='$("#setup").hide();preview();$("#preview").show();'>Review Content</button>
  </p>
</div>

<div id="preview" style="display:none;">
  <p class="edgeToEdge formButtons">
    <button onclick='$("#preview").hide();$("#setup").show();'>Edit Details</button>
    <button>Download PDF</button>
  </p>
</div>

<div class="footer">
  Proposalr &copy; EJP Events, 2011
</div>

<script type="text/javascript" src="main.js"></script>
<script type="text/javascript" src="content.js"></script>
<script type="text/javascript" src="jquery-1.6.4.min.js"></script>
<script type="text/javascript">
  if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
    $('head').append('<link rel="stylesheet" href="spinningwheel.css" type="text/css" media="all" \/>');
    document.write('<script type="text/javascript" src="spinningwheel-min.js"><\/script>')
    document.write('<script type="text/javascript" src="ios.js"><\/script>')
  } else {
    $('head').append('<link rel="stylesheet" href="jquery-ui-1.8.16.custom/css/ui-lightness/jquery-ui-1.8.16.custom.css" type="text/css" media="all" />');
    document.write('<script type="text/javascript" src="jquery-ui-1.8.16.custom/js/jquery-ui-1.8.16.custom.min.js"><\/script>')
    document.write('<script type="text/javascript" src="non-ios.js"><\/script>')
  };
  $('input[name=option_date]').parent().append('<button onclick="calc_option_date()">Calculate</button>');
  $('input[name=qrtly_pmt]').parent().append('<button onclick="calc_payments(1);">Calculate 2</button>');
  $('input[name=qrtly_pmt]').parent().append('<button onclick="calc_payments(3);">Calculate 4</button>');
  $('#setup legend').click(function() {$(this).siblings().toggle();});
</script>
</body>
</html>