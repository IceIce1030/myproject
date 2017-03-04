<?php
try{
  require_once("connectFurkid.php");
  
  $sql = "select service_intro
from service";
  $service = $pdo->prepare( $sql );
  // $eventStatus->bindValue(":eventStatus",'yes');
  $service->execute();
  
  if( $service->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    // echo "{}";
  }else{ //找得到
    //取回一筆資料
    // $eventStatusRow = $eventStatus->fetch(PDO::FETCH_ASSOC);
    while($servicerow = $service->fetch()) { 
   $return_arr[] = array( 
   'service_intro'=>$servicerow['service_intro']
 
   ); }
    //送出json字串
    echo json_encode( $return_arr );
  } 
}catch(PDOException $e){
  echo $e->getMessage();
}
?>