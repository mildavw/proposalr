<?php

$filename = $_POST['bride_last'] . '-' . $_POST['groom_last'] . '.pdf';

require('fpdf.php');

class PDF extends FPDF {
  // Page footer
  function Footer() {
    $this->SetY(-45);
    $this->MultiCell(200,80,"EJP Events\n2808 NE Martin Luther King Blvd, Ste 3",0,'L');

    $this->SetY(-15);
    $this->SetFont('Arial','I',8);
    $this->Cell(0,10,'Page '.$this->PageNo().'/{nb}',0,0,'R');
  }
}

$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('Times','',12);
for($i=1;$i<=40;$i++)
    $pdf->Cell(0,10,'Printing line number '.$i,0,1);
$pdf->Output($filename,'D');

?>