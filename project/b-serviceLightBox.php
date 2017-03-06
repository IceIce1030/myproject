<?php
try{
  header("Content-Type:text/html; charset=utf-8");
  require_once("connectFurkid.php");


  $double=1;
  $dogSize = $_REQUEST["dogSize"];
  $sql = "select * from service where service_no=:service_no";
  $service = $pdo->prepare( $sql );
  $service->bindValue(":service_no", $_REQUEST["serviceId"]);

  $service->execute();
  
  if( $service->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "{}";
  }else{ //找得到
     //取回一筆資料
    // $dogRow = $dog->fetch(PDO::FETCH_ASSOC);

     if($dogSize=='大型犬'){
        $double=2;
      }
      else if($dogSize=='中型犬'){
        $double=1.5;

      }
    $str='';

    while ( $serviceRow = $service->fetch(PDO::FETCH_ASSOC) ){

     
      $money = $serviceRow["service_price"]*$double;
      
      
      $str .="<div class='lb-service-pic'>";
      $str .="<img class='rwd-img' src='images/service/{$serviceRow["service_img1"]}'> ";
      $str .="</div>";
      $str .="<div class='lb-content'>";
      $str .="<h4 id='lb-serviece-title'>{$serviceRow["service_name"]}</h4>";
      $str .="<p id='lb-serviece-p'>{$serviceRow["service_intro"]}</p>";
      $str .="<p>{$dogSize}價格：<span id='service-price'>{$money}</span>元</p>";
      $str .="</div>";
          
      
    }//while

    //送出json字串
    echo json_encode( $str);//陣列編碼成json字串，回傳到前端

  } 
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>