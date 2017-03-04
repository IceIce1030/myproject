<?php
try{
  require_once("connectFurkid.php");
  $sql = "select * from pet where mem_no=:mem_no order by pet_no";
  $pet = $pdo->prepare( $sql );
  $pet->bindValue(":mem_no", $_REQUEST["mem_no"]);
  $pet->execute();
  
  if( $pet->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "no pet";
  }
  else{ //找得到
     //取回一筆資料
      $str='';      
    while ( $petRow = $pet->fetch() ){
        
      $str.="
    <div class='pet pet_current'>
    <div class='petPhoto'>
        <img src='images/pet/{$petRow["pet_img"]}' class='updatePetInfo' data-pet_no='{$petRow["pet_no"]}'>
    </div>
    <div class='txt'>
        <p><span class='petName'>{$petRow["pet_name"]}</span><span class='updatePetInfo' data-pet_no='{$petRow["pet_no"]}'><i class='fa fa-pencil' aria-hidden='true'></i></span>
        </p>
    </div>
    </div>";
      }//while
     //送出字串
      echo $str;
    }//else
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage(), "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>