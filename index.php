<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
  <title>EJP Events Proposalr</title>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <meta id="viewport" name="viewport" content="width=320, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
  <link rel="stylesheet" href="iphone.css" />
  <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />

  <link rel="stylesheet" href="spinningwheel.css" type="text/css" media="all" />
  <script type="text/javascript" src="spinningwheel-min.js"></script>
  <script type="text/javascript" src="main.js"></script>

  </head>

  <?php
function dict_field($var,$label) {
  echo "<dt><label for='{$var}'>{$label}</label></dt>";
  echo "<dd><input type='text' name='{$var}' value='' /></dd>";
}
function date_field($var,$label) {
  echo "<dt><label for='{$var}'>{$label}</label></dt>";
  echo "<dd><input type='hidden' name='{$var}' id='{$var}' value=''/>";
  echo  "<span id='display_{$var}'></span>";
  echo  "<button onclick='openFutureDate(\"{$var}\"); return false;'>Set</button>";
  echo "</dd>";
}
function checkbox($var,$label,$prefix) {
  echo "<br />";
  echo "<label for='{$var}'>{$label}</label>";
  echo "<input type='checkbox' name='{$var}' id='{$var}' value='{$prefix}_{$var}' />";
}
?>

<body>
<form mothod="POST" action="process.php">
  <fieldset class="edgeToEdge">
  <legend>Contact Info</legend>
  <dl class="edgeToEdge formFields">
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

  <fieldset class="edgeToEdge">
  <legend>Wedding Info</legend>
  <dl class="edgeToEdge formFields">
  <?php
date_field('wedding_date','Date:');
dict_field('wedding_loc','Location:');
dict_field('num_people','Number Guests:');
dict_field('num_locations','Number Locations:');
?>
  </dl>
  </fieldset>

  <fieldset class="edgeToEdge">
  <legend>Services Info</legend>
  <dl class="edgeToEdge formFields">

  <?php
dict_field('num_consultations','# of Consultations:');
dict_field('num_sites','# of Sites:');
dict_field('num_assistants','# of Assistants:');
?>

  <dt>Vendor Suggestions:</dt>
  <dd>
  <?php
checkbox('photographer','Photographer','vendor');
checkbox('videographer','Videographer','vendor');
checkbox('hair_stylist','Hair Stylist','vendor');
checkbox('makeup_artist','Makeup Artist','vendor');
checkbox('caterer','Caterer','vendor');
checkbox('cake_baker','Cake Baker','vendor');
checkbox('rentals','Rentals','vendor');
checkbox('florist','Florist','vendor');
checkbox('ceremony_music','Ceremony Music','vendor');
checkbox('reception_music','Reception Music','vendor');
checkbox('rehearsal_dinner_site','Rehearsal Dinner Site','vendor');
checkbox('attire','Attire','vendor');
checkbox('invitations','invitations','vendor');
checkbox('getting_ready_site','Getting Ready Site','vendor');
checkbox('lodging','Lodging','vendor');
checkbox('transportation','Transportation','vendor');
?>
  </dd>

  <dt><label for="elements">Elements</label></dt>
  <dd><textarea cols="60" rows="10" name="elements">Work with vendors and oversee the production of design elements, such as printed materials, attire elements, and décor details.</textarea>
  </dd>

  <dt><label for="avenues">Avenues/Methods</label></dt>
  <dd><textarea cols="60" rows="10" name="avenues">Suggest avenues and methods that will...</textarea>
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
checkbox('other','Other custom-built items','oversee');
?>
  </dd>

  <?php
dict_field('flat_fee','Flat Fee:');
dict_field('due_on_sign','Due Upon Signing:');
dict_field('qrtly_pmt','Quarterly Payment:');
date_field('pmt_date_1','Payment Date 1:');
date_field('pmt_date_2','Payment Date 2:');
date_field('pmt_date_3','Payment Date 3:');
date_field('option_date','Option Date:');
?>

  </dl>
  </fieldset>

  <p class="edgeToEdge formButtons">
    <input type="submit" value="Submit">
  </p>

  </form>

  <div class="footer">
    Proposalr &copy; EJP Events, 2011
  </div>

</body>
</html>
