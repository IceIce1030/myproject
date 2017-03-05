<?php
try{
  require_once("connectFurkid.php");

  $start_y = $_REQUEST["start_y"];
  $start_m = $_REQUEST["start_m"];
  $start_d = $_REQUEST["start_d"];

  $end_y = $_REQUEST["end_y"];
  $end_m = $_REQUEST["end_m"];
  $end_d = $_REQUEST["end_d"];



  // $start_y = 2017;
  // $start_m = 2;
  // $start_d = 24;

  // $end_y = 2017;
  // $end_m = 2;
  // $end_d = 28;

  $start_date = mktime(0, 0, 0, $start_m, $start_d,  $start_y);
  $end_date = mktime(0, 0, 0, $end_m, $end_d,  $end_y);

  $str = '';  

  $canNotLiveRoomNo = array();

  $sql1 ="select *
          from room";

  $room = $pdo->prepare($sql1);
  $room->execute();
  if( $room->rowCount() == 0 ){//找不到
    echo "{}";
  }
  else{//找得到
    while( $roomRow = $room->fetch(PDO::FETCH_ASSOC) ){//找房間編號

        //房間編號
        $room_no = $roomRow["room_no"];
        // echo $room_no;  
        // echo "<br>room_no",$room_no;
        //房間上限
        $roomCountMax = $roomRow["room_count"];

        //計算房間數
        $roomcount =0 ;

        $sql = "select  year(exp_in) in_y , 
                  month(exp_in) in_m ,
                  day(exp_in) in_d ,
                  year(exp_out) out_y, 
                  month(exp_out) out_m , 
                  day(exp_out) out_d , 
                  room_no

                  from orderlist
                  where room_no=:room_no;";
        $orderList = $pdo->prepare( $sql );
        $orderList->bindValue(":room_no", $room_no);


        $orderList->execute();
  
        if( $orderList->rowCount() == 0 ){ //找不到
          //傳回空的JSON字串
          // echo "{}";
        }
        else{ //找得到
           //取回一筆資料
        
          

          while ( $orderListRow = $orderList->fetch(PDO::FETCH_ASSOC) ){

            
            $order_start_date = mktime(0, 0, 0, $orderListRow["in_m"] , $orderListRow["in_d"], $orderListRow["in_y"]);
            $order_end_date = mktime(0, 0, 0, $orderListRow["out_m"], $orderListRow["out_d"],  $orderListRow["out_y"]);

          //選的開始日期不能大於訂單入住日期，也不能比退房日期小
          if(  $start_date>=$order_start_date && $start_date<=$order_end_date){
              // echo $room_no,"<br>";
                  $roomcount++;
                  if($roomcount==$roomCountMax)
                  {//等於最大房間數，放不能住的陣列裡面
                    array_push($canNotLiveRoomNo,(int)$room_no);
                     // echo "<br>cant1:",print_r($canNotLiveRoomNo);
                  }
          }

          //所選的退房日期不能大於訂單入住日期，也不能比退房日期小
          else if($end_date>=$order_start_date && $end_date<=$order_end_date){
              // echo $room_no,"<br>";
               $roomcount++;
                  if($roomcount==$roomCountMax)
                  {//等於最大房間數，放不能住的陣列裡面
                    array_push($canNotLiveRoomNo,(int)$room_no);
                     // echo "<br>cant1:",print_r($canNotLiveRoomNo);
                  }
          }


           //        $roomcount++;
           //        // echo "<br>count",$roomcount;
           //        if($roomcount==$roomCountMax)
           //        {//等於最大房間數，放不能住的陣列裡面
           //          array_push($canNotLiveRoomNo,(int)$room_no);
           //           // echo "<br>cant1:",print_r($canNotLiveRoomNo);
           //        }
           // }//if 起始日期比對訂單的入住日期

           // else if( (int)$start_y==(int)$orderListRow["out_y"] && (int)$start_m==(int)$orderListRow["out_m"] && (int)$start_d<=(int)$orderListRow["out_d"] ){
           //  //起始日期比對訂單退房日期
           //        $roomcount++;
           //        // echo "<br>count",$roomcount;
           //        if($roomcount==$roomCountMax)
           //        {//等於最大房間數，放不能住的陣列裡面
           //          array_push($canNotLiveRoomNo,(int)$room_no);
           //           // echo "<br>cant1:",print_r($canNotLiveRoomNo);
           //        }

           // }//else   起始日期比對訂單退房日期

           // else if( (int)$end_y==(int)$orderListRow["in_y"] && (int)$end_m==(int)$orderListRow["in_m"] && (int)$end_d<=(int)$orderListRow["in_d"] ){

           //  //退房日期比對入住日期
           //         $roomcount++;
           //        // echo "<br>count",$roomcount;
           //        if($roomcount==$roomCountMax)
           //        {//等於最大房間數，放不能住的陣列裡面
           //          array_push($canNotLiveRoomNo,(int)$room_no);
           //           // echo "<br>cant1:",print_r($canNotLiveRoomNo);
           //        }
           // }//else 退房日期比對入住日期
           // else if(  (int)$end_y==(int)$orderListRow["out_y"] && (int)$end_m==(int)$orderListRow["out_m"] && (int)$end_d<=(int)$orderListRow["out_d"] ){
           //       //退房日期比對訂單的退房日期
           //       $roomcount++;
           //        // echo "<br>count",$roomcount;
           //        if($roomcount==$roomCountMax)
           //        {//等於最大房間數，放不能住的陣列裡面
           //          array_push($canNotLiveRoomNo,(int)$room_no);
           //           // echo "<br>cant2:",print_r($canNotLiveRoomNo);
           //        }

           // }//else if 退房日期
            
          }//orderlist while
        }// orderlist else

        // echo "<br>",$canNotLiveRoomNo[0],"<br><hr>";
 
        // echo in_array($room_no,$canNotLiveRoomNo,true);

        //找陣列內是否有  $room_no

          if(!in_array($room_no,$canNotLiveRoomNo)){
              //能住
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
          else{
            //不能住
             


            
          }
        

        


     


    }//room while

    //送出json字串
   // echo $str;
    echo json_encode( $str);//陣列編碼成json字串，回傳到前端
  }//room else


    

   
}//try
catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>