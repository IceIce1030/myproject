<?php
try{
  header("Content-Type:text/html; charset=utf-8");
  require_once("connectFurkid.php");

  $sql = "select * from room where room_no=:room_no";
  $room = $pdo->prepare( $sql );
  $room->bindValue(":room_no", $_REQUEST["roomstyle"]);
  $room->execute();
  $isFirseImg=true;
  
  if( $room->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "{}";
  }
  else{ //找得到
     //取回一筆資料
    // $dogRow = $dog->fetch(PDO::FETCH_ASSOC);

  		$str='';

   	while ( $roomRow = $room->fetch(PDO::FETCH_ASSOC) ){
      $str.="<div class='col-xs-12 col-sm-5 col-md-5'>
                      <div class='roomInfo'>";	
      $str .="<h2 class='roomStyle-selected'> {$roomRow["room_name"]} </h2>";	
      $str .= "<p> {$roomRow["room_intro"]} </p>";
      $str .="<h4>每晚價格:<span id='roomPrice'> {$roomRow["room_price"]} </span>元</h4>
                      </div>
                    </div>";
      $str .="<div class='col-xs-12 col-sm-7 col-md-7 pic-main ''>";



      //大圖小圖

      $sql1 = "select * from roomimg where room_no=:room_no";
      $roomimg = $pdo->prepare( $sql1 );
      $roomimg->bindValue(":room_no", $_REQUEST["roomstyle"]);
      $roomimg->execute();
      
      if( $roomimg->rowCount() == 0 ){ //找不到
        //傳回空的JSON字串
        echo "{}";
      }
      else{ //找得到

         //取回一筆資料
        // $dogRow = $dog->fetch(PDO::FETCH_ASSOC);

        while ( $roomimgRow = $roomimg->fetch(PDO::FETCH_ASSOC) ){    
          //大圖小圖

          if($isFirseImg==true){
              $str .="<div class='big'>
                    <img class='img-rwd' id='roomPicBig' src='images/room/{$roomimgRow["roomimg_name"]}'>
                  </div>
                  <div class='pic-small'>";
                $isFirseImg=false;
          }

          $str .= "<div class='small'>
                      <img class='first b-btn' src='images/room/{$roomimgRow["roomimg_name"]}'>
                      <input type='hidden' name='smallpic' value='{$roomimgRow["roomimg_no"]}'>
                    </div>";
                      
              
            }//大圖小圖 while
            $str .="</div>
                    </div>";
          
      }//大圖小圖 else
       
        }//while
	    
    }//else


                        
                        

    //送出json字串
    echo json_encode( $str);//陣列編碼成json字串，回傳到前端

  	
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>