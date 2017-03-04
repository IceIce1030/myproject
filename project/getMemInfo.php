<?php 

try{
  require_once("connectFurkid.php");
  $sql = "select * from member where mem_no=:mem_no";
  $member = $pdo->prepare($sql);
  $member->bindValue(":mem_no", $_REQUEST["mem_no"]);
  $member->execute();
  if( $member->rowCount() == 0){ //登入失敗
  	echo "Fail";
  }else{

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