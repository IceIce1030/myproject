<?php
try{
	require_once("connectFurkid.php");



	// $voteNum=$_POST['voteNum'];
	// $msgContent=$_POST['msgContent'];
	// $memberNum=$_POST['memberNum'];
  if($_REQUEST['mem_no']== 'guest'){
    $sql = "insert into  votemsg  (  vote_no ,  votemsg_date ,  votemsg_content ) values ( :vote_no, :votemsg_date, :votemsg_content );";
     $msg = $pdo->prepare( $sql );

    $msg->bindValue(":vote_no", $_REQUEST["vote_no"]);
    $msg->bindValue(":votemsg_date", $_REQUEST['votemsg_date']);
    $msg->bindValue(":votemsg_content", $_REQUEST['votemsg_content']);
    $msg->execute();
   
  }
  // $sql = "insert into votemsg value(:voteNum,:msgDate,:msgContent,:memberNum)";
	else{
     $sql = "insert into  votemsg  (  vote_no ,  votemsg_date ,  votemsg_content ,  mem_no ) values ( :vote_no, :votemsg_date, :votemsg_content, :memberNum);";
     $msg = $pdo->prepare( $sql );

    $msg->bindValue(":vote_no", $_REQUEST["vote_no"]);
    $msg->bindValue(":votemsg_date", $_REQUEST['votemsg_date']);
    $msg->bindValue(":votemsg_content", $_REQUEST['votemsg_content']);
    $msg->bindValue(":memberNum", $_REQUEST['mem_no']);
    $msg->execute();
  }

 

  // $msg = $pdo->exec($sql);
   
 

}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>

