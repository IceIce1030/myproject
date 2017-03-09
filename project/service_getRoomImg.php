<?php
try{
  require_once("connectFurkid.php");
 $sql = "select roomimg_name from roomimg where room_no=:room_no ORDER by roomimg_no DESC";
$roomimg = $pdo->prepare( $sql );
$roomimg->bindValue(":room_no", $_REQUEST["room_no"]);
$roomimg->execute();

  if( $roomimg->rowCount() == 0 ){ //找不到
    //
  }
  else{ //找得到取回資料
  		$str='';
   	while ( $roomimgRow = $roomimg->fetch()){ 
      $str.="<div>
             <img class='rwd-img' src='images/room/{$roomimgRow["roomimg_name"]}'>
             </div>";
      }//while
         echo $str;
     }//else
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>