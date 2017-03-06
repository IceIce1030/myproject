<?php 

try{
  require_once("connectFurkid.php");
  $sql = "select * from member where mem_id=:mem_id";
  $member = $pdo->prepare($sql);
  $member->bindValue(":mem_id", $_REQUEST["mem_id"]);
  $member->execute();
  if( $member->rowCount() == 0){ //
  	echo "沒重複帳號";
  }else{
    echo "重複帳號";
  }
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>