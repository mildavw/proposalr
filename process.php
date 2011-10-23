<?php

require_once 'Zend/Loader.php';
Zend_Loader::loadClass('Zend_Gdata');
Zend_Loader::loadClass('Zend_Gdata_AuthSub');
Zend_Loader::loadClass('Zend_Gdata_ClientLogin');
Zend_Loader::loadClass('Zend_Gdata_Docs');

$user = 'mildavw@gmail.com';
$pass = 'hei9791di';
$service = Zend_Gdata_Docs::AUTH_SERVICE_NAME;

$httpClient = Zend_Gdata_ClientLogin::getHttpClient($user, $pass, $service);
$gdClient = new Zend_Gdata_Docs($httpClient);

$filename = $_POST['bride_last'] . '-' . $_POST['groom_last'] . '.csv';
$fp = fopen($filename, 'w');
foreach ($_POST as $key => $value) {
    fputcsv($fp, array($key, $value));
}
fclose($fp);
uploadDocument($gdClient, true, $filename, false);

function uploadDocument($docs, $html, $originalFileName,
                        $temporaryFileLocation) {
  $fileToUpload = $originalFileName;
  if ($temporaryFileLocation) {
    $fileToUpload = $temporaryFileLocation;
  }

  // Upload the file and convert it into a Google Document. The original
  // file name is used as the title of the document and the mime type
  // is determined based on the extension on the original file name.
  $newDocumentEntry = $docs->uploadFile($fileToUpload, $originalFileName,
      null, Zend_Gdata_Docs::DOCUMENTS_LIST_FEED_URI);

  echo "New Document: ";

  if ($html) {
      // Find the URL of the HTML view of this document.
      $alternateLink = '';
      foreach ($newDocumentEntry->link as $link) {
          if ($link->getRel() === 'alternate') {
              $alternateLink = $link->getHref();
          }
      }
      // Make the title link to the document on docs.google.com.
      echo "<a href=\"$alternateLink\">\n";
  }
  echo $newDocumentEntry->title."\n";
  if ($html) {echo "</a>\n";}
}


?>