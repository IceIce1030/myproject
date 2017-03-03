<?php 
try{
	require_once("connectFurkid.php");

  
    $sql = "update article set arti_report = 1 where arti_no=:arti_no";
	  $discuss = $pdo->prepare( $sql );
    $discuss->bindValue(":arti_no", $_REQUEST["arti_no"]);
    $discuss->execute();
	
    

}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}


?>