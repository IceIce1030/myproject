<?php 
// ob_start();
// session_start();

try{
  require_once("connectFurkid.php");
  $sql = "select * from member where mem_id=:mem_id and mem_psw=:mem_psw";
  $member = $pdo->prepare($sql);
  $member->bindValue(":mem_id", $_REQUEST["mem_id"]);
  $member->bindValue(":mem_psw", $_REQUEST["mem_psw"]);
  $member->execute();
  if( $member->rowCount() == 0){ //登入失敗
  	echo "Fail";
  }else{
  	// $memRow = $member->fetch();
    // $_SESSION["mem_id"]=$memRow["mem_id"];
    // $_SESSION["mem_name"]=$memRow["mem_name"];
    // $_SESSION["mem_mail"]=$memRow["mem_mail"];
    // echo $memRow["mem_name"];

    //取回會員資料
    $memRow = $member->fetch(PDO::FETCH_ASSOC);
        //送出json字串
    echo json_encode( $memRow );
  }
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>