<?php
// echo $_REQUEST["mem_no"];
try{
  require_once("connectFurkid.php");
 $sql = "select o.orderlist_no,o.mem_no,o.room_no,r.room_name,p.pet_name,o.orderlist_date,o.exp_in,o.exp_out, o.orderlist_Total, o.sitter_name 
    from orderlist o join pet p on o.pet_no = p.pet_no
                     join room r on o.room_no = r.room_no
                     where o.mem_no=:mem_no ORDER by o.exp_in DESC";

$orderlist = $pdo->prepare( $sql );
$orderlist->bindValue(":mem_no", $_REQUEST["mem_no"]);
$orderlist->execute();

  if( $orderlist->rowCount() == 0 ){ //找不到
    //傳回
    $nobooking='<div class="reminder" id="bookingReminder">
                            <div class="txt">
                                <h4>你還沒有幫你的毛小孩訂過毛基地的房間，快來訂房吧～</h4>
                                <div class="btnDiv">
                                    <a class="btnFunction" href="booking.html">線上訂房</a>
                                </div>
                            </div>
                        </div>';
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
  $serviceItem ="無";
  
}else{
  $serviceItem ="";
  while ( $serviceRow = $service->fetch()){ 
  $serviceItem .= $serviceRow["service_name"]." ";   
  }//while
}//else


//服務結束

// 分辨是歷史還是未來訂單
$today = date('Y-m-d');
$exp_out = $orderlistRow['exp_out'];
$exp_in = $orderlistRow['exp_in'];

//取出年月日
$exp_out_format = DateTime::createFromFormat("Y-n-j", $exp_out);
$exp_in_format = DateTime::createFromFormat("Y-n-j", $exp_in);

$exp_out_y = $exp_out_format->format("Y");
$exp_out_n = $exp_out_format->format("n");
$exp_out_j = $exp_out_format->format("j");

$exp_in_y = $exp_in_format->format("Y");
$exp_in_n = $exp_in_format->format("n");
$exp_in_j = $exp_in_format->format("j");

$exp_out_sec = strtotime($exp_out); //換算成秒數
$exp_in_sec = strtotime($exp_in); //換算成秒數

//星期幾
$weekarray=array("日","一","二","三","四","五","六");
$exp_out_weekday = "星期".$weekarray[date("w",$exp_out_sec)];
$exp_in_weekday ="星期".$weekarray[date("w",$exp_in_sec)];



//住幾天
$stayingDay = ($exp_out_sec - $exp_in_sec) / 86400;


if($today > $exp_out){
  //歷史訂單
$bookingLabel = "pastBooking";
$bookingBtn ="<a href='book.html' class='btnFunction btnPast'>再次預訂<i class='fa fa-repeat' aria-hidden='true'></i></a>";
$historyBookingLabel ="<span class='historyBooking'>歷史訂單</span>";
}else{
  //未來訂單
$bookingLabel = "futureBooking";
$bookingBtn='';
// <div class="btnFunction">修改訂單</div>
$historyBookingLabel ="";
}

//金額加上,格式
$finalTotal = number_format($orderlistRow["orderlist_Total"], 0, '',',');


        $str.="<div class='booking $bookingLabel'>
    <input type='hidden' value='$today'>
    <input type='hidden' class='orderlist_no' name='orderlist_no' value='{$orderlistRow["orderlist_no"]}'>
    <input type='hidden' class='room_no' name='room_no' value='{$orderlistRow["room_no"]}'>
    <div class='roomPhoto'>
        <a><img class='rwd-img' src='images/room/{$roomImgRow["roomimg_name"]}'></a>
    </div>
    <div class='bookingDetail'>
        <h4 class='stayDay'><span class='pet_name'>{$orderlistRow["pet_name"]}</span>入住<span class='stayingDay'>$stayingDay</span>天$historyBookingLabel</h4>
        <p>房型：<span class='roomType'>{$orderlistRow["room_name"]}</span></p>
        <p class='orderservice'>
            加值服務：<span class='serviceItem'>$serviceItem</span>
        </p>
        <p>保母：<span class='sitter_name'>{$orderlistRow["sitter_name"]}<span></p>
        <h4 class='orderlist_Total'>總額：$<span>$finalTotal</span></h4>
    </div>
    <div class='bookingDate'>
        <div class='checkinDate'>
            <p class='dateTitle'>入住日期</p>       
            <h4 class='date'>{$exp_in_n}月{$exp_in_j}日</h4>
            <p class='year'>$exp_in_y</p>
            <p class='day'>$exp_in_weekday</p>
        </div>
        <div class='checkoutDate'>
            <p class='dateTitle'>退房日期</p>
             <h4 class='date'>{$exp_out_n}月{$exp_out_j}日</h4>
            <p class='year'>$exp_out_y</p>
            <p class='day'>$exp_out_weekday</p>
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