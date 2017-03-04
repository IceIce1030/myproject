<?php 
//把照片存到對的路徑
//原始的檔名(utf-8)
	$fileName = $_FILES["mem_img"]["name"];
	$from = $_FILES["mem_img"]["tmp_name"];
	//設定好的資料夾轉為big5
	$to = "images/member/". mb_convert_encoding($fileName, "Big5","UTF-8");
	move_uploaded_file($from, $to);
		
 ?>