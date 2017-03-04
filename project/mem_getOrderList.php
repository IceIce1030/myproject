<?php
// echo $_REQUEST["mem_no"];
try{
  require_once("connectFurkid.php");
 $sql = "select o.orderlist_no,o.mem_no,o.room_no,r.room_name,p.pet_name,o.orderlist_date,o.exp_in,o.exp_out, o.orderlist_Total
    from orderlist o join pet p on o.pet_no = p.pet_no
                     join room r on o.room_no = r.room_no
                     where o.mem_no=:mem_no ORDER by o.exp_in DESC";

$orderlist = $pdo->prepare( $sql );
$orderlist->bindValue(":mem_no", $_REQUEST["mem_no"]);
$orderlist->execute();

  if( $orderlist->rowCount() == 0 ){ //找不到
    //傳回
    $nobooking='<h2>no</h2>';
    echo $nobooking;
  }
  else{ //找得到取回資料
  		$str='';
   	while ( $orderlistRow = $orderlist->fetch()){ 

//房間照片
 $sql = "select o.orderlist_no,o.mem_no,o.room_no,i.roomimg_name
    from orderlist o join roomimg i on o.room_no = i.room_no
                     where o.orderlist_no={$orderlistRow["orderlist_no"]} limit 1";
$roomImg = $pdo->prepare( $sql );
$roomImg->execute();
if($roomImg->rowCount() == 0){
  //找不到
    //傳回
  
}else{

$roomImgRow = $roomImg->fetch();

//服務名稱
 $sql = "select * from orderservice os join service s on os.service_no =s.service_no where os.orderlist_no = {$orderlistRow["orderlist_no"]}";
$service = $pdo->prepare( $sql );
$service->execute();
if($service->rowCount() == 0){
  //找不到
    //傳回
  
}else{
  $serviceItem ="";
  while ( $serviceRow = $service->fetch()){ 
   // $serviceItem = {$serviceRow["service_name"]};   
  $serviceItem .= $serviceRow["service_name"]." ";   
// $serviceItem = $orderlistRow["orderlist_no"];
  }//while
}//else


//服務結束

// 分辨是歷史還是未來訂單
$today = date('Y-m-d');
$exp_out = $orderlistRow['exp_out'];
$exp_in = $orderlistRow['exp_in'];
$exp_out_sec = strtotime($exp_out); //換算成秒數
$exp_in_sec = strtotime($exp_in); //換算成秒數

//住幾天
$stayingDay = ($exp_out_sec - $exp_in_sec) / 86400;


if($today > $exp_out){
  //歷史訂單
$bookingLabel = "pastBooking";
$bookingBtn ="<a href='book.html' class='btn btnPast'>再次預訂</a>";
$historyBookingLabel ="<span class='historyBooking'>歷史訂單</span>";
}else{
$bookingLabel = "futureBooking";
$bookingBtn="<a href='member_orderlist.html' class='btn btnFuture'>查看訂單</a>";
$historyBookingLabel ="";
}


        $str.="<div class='booking $bookingLabel'>
<input type='hidden' value='$today'>
<input type='hidden' class='orderlist_no' name='orderlist_no' value='{$orderlistRow["orderlist_no"]}'>
<input type='hidden' class='room_no' name='room_no' value='{$orderlistRow["room_no"]}'>
    <div class='roomPhoto'>
        <a href=''><img src='images/room/{$roomImgRow["roomimg_name"]}'></a>
    </div>
    <div class='bookingDetail'>
        <p class='roomType'>
            <h3 class='roomType'>{$orderlistRow["room_name"]}$historyBookingLabel</h3></p>
        <p class='stayDay'><span class='pet_name'>{$orderlistRow["pet_name"]}</span>入住<span class='stayingDay'>$stayingDay</span>天</p>
        <p class='orderservice'>
            加值服務：<span class='serviceItem'>$serviceItem</span>
        </p>
        <h4 class='orderlist_Total'>$<span>{$orderlistRow["orderlist_Total"]}</span></h4>
    </div>
    <div class='bookingDate'>
        <div class='checkinDate'>
            <p class='dateTitle'>入住日期</p>
            <p class='date'>$exp_in</p>
        </div>
        <div class='checkoutDate'>
            <p class='dateTitle'>退房日期</p>
            <p class='date'>$exp_out</p>
        </div>
        <div class='clear'></div>
        <div class='btnDiv'>            
            $bookingBtn  
        </div>
    </div>
    <div class='clear'></div>
</div>";

}

      }//while
         echo $str;
     }//else
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>