<?php
try{
  header("Content-Type:text/html; charset=utf-8");
  require_once("connectFurkid.php");

  $sql = "select * from room";
  $room = $pdo->prepare( $sql );
  $roomstyleVal = $_REQUEST["roomstyleVal"];
  // $dog->bindValue(":room", $_REQUEST["roomstyle"]);
  $room->execute();
  
  if( $room->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "{}";
  }else{ //找得到
     //取回一筆資料
    // $dogRow = $dog->fetch(PDO::FETCH_ASSOC);

      $str='';

    while ( $roomRow = $room->fetch(PDO::FETCH_ASSOC) ){

     
      if($roomRow["room_no"]==$roomstyleVal){
         $str .= "<div class='styleBox'>
                    <div class='styles b-btn-room roompic-select'>";
        $str .= " <span>
                    {$roomRow["room_name"]}
                <input type='hidden'  class='rooms' value='{$roomRow["room_no"]}'>
                <input type='hidden' class='room-price' value='{$roomRow["room_price"]}'>
                </span>";
        $str .=" <div class='footprint footprint-add'>
                   <img class='img-weight-auto' src='images/Pet_footprint.png'>
                </div>

                </div>
                    
              </div>";
      }

      else{
        $str .= "<div class='styleBox'>
                    <div class='styles b-btn-room'>";
        $str .= " <span>
                    {$roomRow["room_name"]}
                <input type='hidden' class='rooms' value='{$roomRow["room_no"]}'>
                <input type='hidden' class='room-price' value='{$roomRow["room_price"]}'>
                </span>";
        $str .=" <div class='footprint'>
                   <img class='img-weight-auto' src='images/Pet_footprint.png'>
                </div>

                </div>
                    
              </div>";
      }
                                          
      
    }

    //送出json字串
    echo json_encode( $str);//陣列編碼成json字串，回傳到前端

  } 
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>