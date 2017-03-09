<?php
try{
  header("Content-Type:text/html; charset=utf-8");
  require_once("connectFurkid.php");
    $expIn = (string)$_REQUEST['expIn'];
    $expOut = (string)$_REQUEST['expOut'];
    // $expIn = '2017-02-01';
    // $expOut = '2017-02-28';
    $canNotLiveRoomNo = array();

      $sql = "select r.room_no,r.room_name,r.room_price,r.room_intro,r.room_count,rimg.roomimg_name
             from room r join roomimg rimg on r.room_no = rimg.room_no
             group by room_no;";
     $room = $pdo->prepare( $sql );
     $room->execute();
  
  if( $room->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "沒有找到資料";
  }
  else{ //找得到
     //取回一筆資料
    // $dogRow = $dog->fetch(PDO::FETCH_ASSOC);
      $str='';
      $str .="<tr>
                  <th>房間編號</th>            
                  <th>房間名稱</th>
                   <th>房間照片</th>
                  <th>房間價格</th>
                  <th width='600'>房間介紹</th>        
             </tr>";

    while ( $roomRow = $room->fetch(PDO::FETCH_ASSOC) ){
          $roomMAx = $roomRow["room_count"];
          $room_no = $roomRow["room_no"];
          $roomCount = 0;

          $sql1 = "select *
                   from orderlist
                   where room_no = :room_no
                   and  (exp_in between :exp_in and :exp_out 
                      or exp_out between :exp_in1 and :exp_out1);";

          $orerlist = $pdo->prepare( $sql1 );
          $orerlist->bindValue(":room_no", $room_no);
          $orerlist->bindValue(":exp_in", $expIn);
          $orerlist->bindValue(":exp_out", $expOut);
          $orerlist->bindValue(":exp_in1", $expIn);
          $orerlist->bindValue(":exp_out1", $expOut);
          $orerlist->execute();


          if( $orerlist->rowCount() == 0 ){ //找不到
            //傳回空的JSON字串
            // echo "沒有找到資料";
          }
          else{ //找得到
             //取回一筆資料

             while ( $orerlistRow = $orerlist->fetch(PDO::FETCH_ASSOC) ){
                  $roomCount++;
                  if($roomCount==$roomMAx){
                      // echo $orerlistRow["room_no"];
                    array_push($canNotLiveRoomNo,(int)$room_no);
                  }

             }//while
           }//esle
           
          if(!in_array($room_no,$canNotLiveRoomNo)){
              // echo $roomRow["room_no"],"能住<br>";
              // // echo $roomRow["room_no"];
              // echo $roomRow["room_name"],"<br>";

            $roomRow["room_intro"] = mb_convert_encoding($roomRow["room_intro"],"UTF-8","auto");
              $str .="<tr>
                        <td>{$roomRow["room_no"]}</td>
                        <td>{$roomRow["room_name"]}</td>
                        <td><img width='120' height=auto src='images/room/{$roomRow["roomimg_name"]}'></td>
                        <td>{$roomRow["room_price"]}元</td>
                        <td class='text-left' width='600'>{$roomRow["room_intro"]}</td>          
                      </tr>"; 
          }
          else{
            // echo $roomRow["room_no"],"不能住<br>";
          }
      
    }//while room

    //送出json字串
    // echo json_encode( $str);//陣列編碼成json字串，回傳到前端
    echo $str;

    

  }//else
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>