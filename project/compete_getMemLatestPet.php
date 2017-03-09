<?php
try{
  require_once("connectFurkid.php");
  $sql = "select * from pet where mem_no=:mem_no order by pet_no desc limit 1";
  $pet = $pdo->prepare( $sql );
  $pet->bindValue(":mem_no", $_REQUEST["mem_no"]);
  $pet->execute();
  
  if( $pet->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "";
  }
  else{ //找得到
     //取回一筆資料    
     $petRow = $pet->fetch(); 
      //while
     //送出字串
      echo $petRow["pet_no"];
    }
    //else
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage(), "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>