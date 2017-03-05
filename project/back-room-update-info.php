<?php
try{
  require_once("connectFurkid.php");



     $sql = "select *
              from room
              where room_no = :room_no;";
     $room = $pdo->prepare( $sql );
     $room->bindValue(':room_no',$_REQUEST['room_no']);
     $room->execute();
  
  if( $room->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "{}";
  }
  else{ //找得到
     //取回一筆資料
    // $dogRow = $dog->fetch(PDO::FETCH_ASSOC);
     $str='';
     $str .="<tr>
                  <th>房間編號</th>          
                  <th>房間名稱</th>
                  <th>房間價格</th>
                  <th width='200'>房間介紹</th>
                  <th>房間上限</th>
                  <th>照片1</th>
                  <th>照片2</th>
                  <th>照片3</th>
                  <th>編輯</th>
                  >         
             </tr>";

    while ( $roomRow = $room->fetch(PDO::FETCH_ASSOC) ){
            $roomNo = $roomRow["room_no"];






        $str .="<tr>
                  <td>
                    {$roomRow["room_no"]}
                    <input type='hidden' value='{$roomRow["room_no"]}' id='room_no'>
                  </td>
                  <td>
                    <input type='text'   class='text-center updateinput inputdate' value='{$roomRow["room_name"]}' id='room_name'>
                  </td>
                  <td>
                    <input type='text' class='text-center updateinput inputdate' value='{$roomRow["room_price"]}' id='room_price'>
                    
                    
                  </td>
                  <td width='200' class='text-left'>
                    <textarea id='room_info' class='inputdate' style='width:200px; height:250px;resize : none;' value=''>{$roomRow["room_intro"]}</textarea>
                  </td>
                  <td>
                    <input type='text'  class='text-center updateinput inputdate' value='{$roomRow["room_count"]}' id='room_count'>
                    
                  </td>";




         $sql1 = "select *
                  from roomimg
                  where room_no = :room_no;";
         $roomimg = $pdo->prepare( $sql1 );
         $roomimg->bindValue(':room_no',$roomNo);
         $roomimg->execute();


         if( $roomimg->rowCount() == 0 ){ //找不到
            //傳回空的JSON字串
            echo "{}";
          }
          else{ //找得到
              $number = 0;
              while ( $roomimgRow = $roomimg->fetch(PDO::FETCH_ASSOC) ){
                      $number++;
                      $str .="<td>
                          <img style='width:133px;height:100;' src='../images/room/{$roomimgRow["roomimg_name"]}' id='img{$number}'>
                          <input type='file' class='updateinput' name='image{$number}'>
                          <input type='hidden' id='imgId{$number}'  value='{$roomimgRow["roomimg_no"]}'>
                          <input type='hidden' id='imgName{$number}' class='imgName' value='{$roomimgRow["roomimg_name"]}'>



                    </td>";   
              }//roomimg while
             




          }//else roomimg
      

      
                 
        //多個照片

        $str .= " <td>
                    <input type='button' class='inputBtn updateOk' value='確定'>
                    <input type='button' class='inputBtn updateCancel' value='取消'>
                  </td>
                </tr>";                                        
      
    }//while

    //送出json字串
    // echo json_encode( $str);//陣列編碼成json字串，回傳到前端
    echo $str;

  }//else
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>