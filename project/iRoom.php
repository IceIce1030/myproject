<?php
try{
  require_once("connectFurkid.php");
  
  $sql = "select roomimg_name
          from roomimg
          where room_no = ( 
                          select room_no
                          from room
                          where room_name =  :roomName )";
  $roomimg = $pdo->prepare( $sql );
  $roomimg->bindValue(":roomName",$_REQUEST["roomName"]);
  $roomimg->execute();
  
  if( $roomimg->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    // echo "{}";
  }else{ //找得到
    //取回一筆資料
    // $eventStatusRow = $eventStatus->fetch(PDO::FETCH_ASSOC);
    while($roomimgrow = $roomimg->fetch()) { 
   $return_arr[] = array( 
    'roomimg_name'=>$roomimgrow['roomimg_name']
   ); }
    //送出json字串
    echo json_encode( $return_arr );
  } 
}catch(PDOException $e){
  echo $e->getMessage();
}
?>