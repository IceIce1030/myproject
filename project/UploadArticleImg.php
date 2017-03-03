<?php 
//原始的檔名(utf-8)
	$fileName = $_FILES["post-pic"]["name"];
	$from = $_FILES["post-pic"]["tmp_name"];
	//設定好的資料夾轉為big5
	$to = "images/articlephoto/". mb_convert_encoding($fileName,"Big5","UTF8");
	
	move_uploaded_file($from, $to);
		

 ?>