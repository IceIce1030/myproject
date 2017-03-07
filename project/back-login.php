<?php 

try{
  require_once("connectFurkid.php");
  $sql = "select * from manger where man_id=:man_id and man_psw=:man_psw";
  $manger = $pdo->prepare($sql);
  $manger->bindValue(":man_id", $_REQUEST["man_id"]);
  $manger->bindValue(":man_psw", $_REQUEST["man_psw"]);
  $manger->execute();
  if( $manger->rowCount() == 0){ //登入失敗
  	echo "輸入錯誤，請重新輸入";
  }else{

     echo "登入成功";
    
  }
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>