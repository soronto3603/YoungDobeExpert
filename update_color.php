<?php

if(isset($_POST['color'])) {

	include('class/color_harmony.class.php');
	$c = new colorHarmony;
	$hex = $_POST['color'];
	$c->isHEX($hex);

	if($c->HEXError==0) {

		echo '			<div class="swiper-container">
						<div class="swiper-wrapper"><div class="swiper-slide" style="background-color:#'.$hex.'">';
		if($_POST['type']==0) {

			// Monochromatic
			$RH1= $c->Monochromatic($hex);

			for($i=0;$i<8;$i++) {
				$RGB1[$i] = $c->HEX2RGB($RH1[$i]);
			}

			echo '<h3>Monochromatic</h3>';
			echo '
				<div class="cr" style="background-color:'.$RH1[1].'">'.$RH1[1].'</div>
				<div class="cr" style="background-color:'.$RH1[2].'">'.$RH1[2].'</div>
				<div class="cr" style="background-color:'.$RH1[3].'">'.$RH1[3].'</div>
				<div class="cr" style="background-color:'.$RH1[4].'">'.$RH1[4].'</div>
				<div class="cr" style="background-color:'.$RH1[5].'">'.$RH1[5].'</div>
				<div class="cr" style="background-color:'.$RH1[6].'">'.$RH1[6].'</div>
				<div class="cr" style="background-color:'.$RH1[7].'">'.$RH1[7].'</div></div>';

			// Analogous
			$RH2= $c->Analogous($hex);

			for($i=0;$i<8;$i++) {
				$RGB2[$i] = $c->HEX2RGB($RH2[$i]);
			}

			echo '<div class="swiper-slide" style="background-color:#'.$hex.'"><h3>Analogous</h3>';
			echo '
				<div class="cr" style="background-color:'.$RH2[1].'">'.$RH2[1].'</div>
				<div class="cr" style="background-color:'.$RH2[2].'">'.$RH2[2].'</div>
				<div class="cr" style="background-color:'.$RH2[3].'">'.$RH2[3].'</div>
				<div class="cr" style="background-color:'.$RH2[4].'">'.$RH2[4].'</div>
				<div class="cr" style="background-color:'.$RH2[5].'">'.$RH2[5].'</div>
				<div class="cr" style="background-color:'.$RH2[6].'">'.$RH2[6].'</div>
				<div class="cr" style="background-color:'.$RH2[7].'">'.$RH2[7].'</div></div>';

			// Complementary
			$RH3= $c->Complementary($hex);

			for($i=0;$i<8;$i++) {
				$RGB3[$i] = $c->HEX2RGB($RH3[$i]);
			}

			echo '<div class="swiper-slide" style="background-color:#'.$hex.'"><h3>Complementary</h3>';
			echo '
				<div class="cr" style="background-color:'.$RH3[1].'">'.$RH3[1].'</div>
				<div class="cr" style="background-color:'.$RH3[2].'">'.$RH3[2].'</div>
				<div class="cr" style="background-color:'.$RH3[3].'">'.$RH3[3].'</div>
				<div class="cr" style="background-color:'.$RH3[4].'">'.$RH3[4].'</div>
				<div class="cr" style="background-color:'.$RH3[5].'">'.$RH3[5].'</div>
				<div class="cr" style="background-color:'.$RH3[6].'">'.$RH3[6].'</div>
				<div class="cr" style="background-color:'.$RH3[7].'">'.$RH3[7].'</div></div>';

			// Triads
			$RH4= $c->Triads($hex);

			for($i=0;$i<8;$i++) {
				$RGB4[$i] = $c->HEX2RGB($RH4[$i]);
			}

			echo '<div class="swiper-slide" style="background-color:#'.$hex.'"><h3>Triads</h3>';
			echo '
				<div class="cr" style="background-color:'.$RH4[1].'">'.$RH4[1].'</div>
				<div class="cr" style="background-color:'.$RH4[2].'">'.$RH4[2].'</div>
				<div class="cr" style="background-color:'.$RH4[3].'">'.$RH4[3].'</div>
				<div class="cr" style="background-color:'.$RH4[4].'">'.$RH4[4].'</div>
				<div class="cr" style="background-color:'.$RH4[5].'">'.$RH4[5].'</div>
				<div class="cr" style="background-color:'.$RH4[6].'">'.$RH4[6].'</div>
				<div class="cr" style="background-color:'.$RH4[7].'">'.$RH4[7].'</div></div>';
				echo '</div>

				<div class="swiper-pagination"></div>
			</div>';
		} else {

			if($_POST['type']==1) {
				$RH= $c->Monochromatic($hex);
				$color_title = 'Monochromatic';
			}

			if($_POST['type']==2) {
				$RH= $c->Analogous($hex);
				$color_title = 'Analogous';
			}

			if($_POST['type']==3) {
				$RH= $c->Complementary($hex);
				$color_title = 'Complementary';
			}

			if($_POST['type']==4) {
				$RH= $c->Triads($hex);
				$color_title = 'Triads';
			}

			for($i=0;$i<8;$i++) {
				$RGB[$i] = $c->HEX2RGB($RH[$i]);
			}

			echo '<h3>'.$color_title.'</h3>';
			echo '<table class="result-colors" border="0" cellspacing="10" cellpadding="0">
			<tr>
				<th>Color 1</th>
				<th>Color 2</th>
				<th>Color 3</th>
				<th>Color 4</th>
				<th>Color 5</th>
				<th>Color 6</th>
				<th>Color 7</th>
				<th>Color 8</th>
			</tr>
			<tr>
				<td class="cr" bgcolor="'.$RH[0].'">&nbsp;</td>
				<td class="cr" bgcolor="'.$RH[1].'">&nbsp;</td>
				<td class="cr" bgcolor="'.$RH[2].'">&nbsp;</td>
				<td class="cr" bgcolor="'.$RH[3].'">&nbsp;</td>
				<td class="cr" bgcolor="'.$RH[4].'">&nbsp;</td>
				<td class="cr" bgcolor="'.$RH[5].'">&nbsp;</td>
				<td class="cr" bgcolor="'.$RH[6].'">&nbsp;</td>
				<td class="cr" bgcolor="'.$RH[7].'">&nbsp;</td>
			<tr>
				<td>'.$RH[0].'</td>
				<td>'.$RH[1].'</td>
				<td>'.$RH[2].'</td>
				<td>'.$RH[3].'</td>
				<td>'.$RH[4].'</td>
				<td>'.$RH[5].'</td>
				<td>'.$RH[6].'</td>
				<td>'.$RH[7].'</td>
			</tr>
			</tr>
			</table>';

		}

	}
}

?>
