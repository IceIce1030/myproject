<?php 

try{
  require_once("connectFurkid.php");
  $sql = "select * from room where room_no=:room_no";
  $room = $pdo->prepare($sql);
  $room->bindValue(":room_no", $_REQUEST["room_no"]);
  $room->execute();
  if( $room->rowCount() == 0){ //登入失敗
  	echo "Fail";
  }else{

    //取回會員資料
    $roomRow = $room->fetch(PDO::FETCH_ASSOC);
        //送出json字串
    echo json_encode( $roomRow );
  }
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>