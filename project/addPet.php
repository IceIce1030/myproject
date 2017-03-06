<?php  

try{
  require_once("connectFurkid.php");
 $sql="insert into pet(mem_no, dog_no, pet_name, pet_age, pet_sex, pet_personality, pet_img) values(:mem_no, :dog_no, :pet_name, :pet_age, :pet_sex, :pet_personality, :pet_img)";
  $pet = $pdo->prepare($sql);
  $pet->bindValue(":mem_no", $_REQUEST["mem_no"]);
  $pet->bindValue(":dog_no", $_REQUEST["dog_no"]);
  $pet->bindValue(":pet_name", $_REQUEST["pet_name"]);

  $yy = date("Y");//找出今年
  $aa =  (int)$yy-(int)$_REQUEST["pet_age"];//今年-年齡=生日年
  $pet_age =date("$aa-m-d");
  $pet->bindValue(":pet_age", $pet_age);
  
  $pet->bindValue(":pet_sex", $_REQUEST["pet_sex"]);
  $pet->bindValue(":pet_personality", $_REQUEST["pet_personality"]);
  
  //建立檔案名稱
if($_FILES["pet_img"]["tmp_name"] != NULL){

//上傳圖片 放到pet資料夾
switch( $_FILES["pet_img"]["error"]){
  case 0:
    $from = $_FILES["pet_img"]["tmp_name"];
    //檢查資料夾或檔案是否存在
    if( file_exists("images/pet")==false){ //不存在
      //發生錯誤
          echo("沒有pet資料夾");
    }
      //原始檔名(utf-8)
      //要改檔名名嗎？
        $fileName = $_FILES["pet_img"]["name"];

        //設定好資料夾,並轉碼為big5
    $to = "images/pet/". mb_convert_encoding($fileName, "Big5","UTF-8");
    
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
      echo "上傳照片錯誤代碼:" , $_FILES["pet_img"]["error"],"請通知我們<br>";
       break;
     }//switch

  $pet->bindValue(":pet_img", $fileName);
}else{
   $pet->bindValue(":pet_img", $_REQUEST["default_pet_img"]);
}

  $pet->execute();
  header("Location:member.html");

}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>