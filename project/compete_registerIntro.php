<?php  

try{
  require_once("connectFurkid.php");
 $sql="insert into vote (pet_no, vote_img, vote_date, vote_intro, vote_count) values (:pet_no, :vote_img, :vote_date, :vote_intro, '0');";
  $vote = $pdo->prepare($sql);
  $vote->bindValue(":pet_no", $_REQUEST["pet_no"]);
  $vote_date = date("Y-m-d");//找出今年
  $vote->bindValue(":vote_date", $vote_date);
  $vote->bindValue(":vote_intro", $_REQUEST["vote_intro"]);
  //建立檔案名稱


//上傳圖片 放到pet資料夾
switch( $_FILES["vote_img"]["error"]){
  case 0:
    $from = $_FILES["vote_img"]["tmp_name"];
    //檢查資料夾或檔案是否存在
    if( file_exists("images/pet")==false){ //不存在
      //發生錯誤
          echo("沒有pet資料夾");
    }
      //原始檔名(utf-8)
      //要改檔名名嗎？
        $fileName = $_FILES["vote_img"]["name"];

        //設定好資料夾,並轉碼為big5
    $to = "images/race_image/". mb_convert_encoding($fileName, "Big5","UTF-8");
    
    if(copy( $from, $to) ){
      
    }else{
      //回到加寵物頁
      // header("Location:addPetInfo.html");
      echo("檔案存檔失敗");
    }
    break;
  case 1:
      echo "檔案不得超過", ini_get("upload_max_filesize") ,"<br>";
    break;
  case 2:
    echo "檔案不得超過", $_REQUEST["MAX_FILE_SIZE"] ,"<br>";
    break;
  case 3:
    echo "上傳檔案不完整<br>";
    break;
  case 4:
      echo "檔案没送<br>";
       break;
  default : 
      echo "上傳照片錯誤代碼:" , $_FILES["vote_img"]["error"],"請通知我們<br>";
       break;
     }//switch

  $vote->bindValue(":vote_img", $fileName);
  $vote->execute();
  header("Location:race.html");

}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>