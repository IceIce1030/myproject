<?php
try{
    header("Content-Type:text/html; charset=utf-8");
  require_once("connectFurkid.php");

    $room_no = $_REQUEST['room_no'];
    $room_name = $_REQUEST['room_name'];
    $room_price = $_REQUEST['room_price'];
    $room_info = $_REQUEST['room_info'];
    $room_count = $_REQUEST['room_count'];

     $sql = "update room
             set room_name = :room_name , room_price = :room_price , room_intro = :room_intro , room_count = :room_count
             where room_no = :room_no;";
     $room = $pdo->prepare( $sql );
     $room->bindValue(':room_name',$room_name);
     $room->bindValue(':room_price',$room_price);
     $room->bindValue(':room_intro',$room_info);
     $room->bindValue(':room_count',$room_count);
     $room->bindValue(':room_no',$room_no);
     $room->execute();

    echo '成功';


}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>