<?php
try{
  require_once("connectFurkid.php");



     $sql = "select *
             from room";
     $room = $pdo->prepare( $sql );
     $room->execute();
  
  if( $room->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "沒有找到資料";
  }else{ //找得到
     //取回一筆資料
    // $dogRow = $dog->fetch(PDO::FETCH_ASSOC);
     $str='';
     $str .="<tr>
                  <th>房間編號</th>            
                  <th>房間名稱</th>
                  <th>房間價格</th>
                  <th>房間介紹</th>
                  <th>房間上限</th>          
             </tr>";

    while ( $roomRow = $room->fetch(PDO::FETCH_ASSOC) ){

        $str .="<tr>
                  <td>{$roomRow["room_no"]}</td>
                  <td>{$roomRow["room_name"]}</td>
                  <td>{$roomRow["room_price"]}</td>
                  <td>{$roomRow["room_intro"]}</td>
                  <td>{$roomRow["room_count"]}</td>           
                </tr>";                                        
      
    }//while

    //送出json字串
    // echo json_encode( $str);//陣列編碼成json字串，回傳到前端
    echo $str;

  } 
}catch(PDOException $e){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>