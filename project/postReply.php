<?php 
try{
	require_once("connectFurkid.php");

  
    $sql = "insert into artimsg(mem_no, arti_no, artimsg_content, artimsg_date,artimsg_report ) value(:mem_no,:arti_no,:artimsg_content,:artimsg_date,'0')";
    //會員編號先用2號
	  $artimsg = $pdo->prepare( $sql );
    $artimsg->bindValue(":mem_no",$_REQUEST["mem_no"]);
    $artimsg->bindValue(":arti_no", $_REQUEST["arti_no"]);
    $artimsg->bindValue(":artimsg_content", $_REQUEST["artimsg_content"]);
    $artimsg->bindValue(":artimsg_date", $_REQUEST["artimsg_date"]);
    $artimsg->execute();
	
    

}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}


?>