<?php 
try{
	require_once("connectFurkid.php");

  
    $sql = "update artimsg set artimsg_report = 1 where artimsg_no=:artimsg_no";
	  $artimsg = $pdo->prepare( $sql );
    $artimsg->bindValue(":artimsg_no", $_REQUEST["artimsg_no"]);
    $artimsg->execute();
	
    

}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}


?>