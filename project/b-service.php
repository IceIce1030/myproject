<?php
try{
  require_once("connectFurkid.php");

  $dogSize = $_REQUEST["dogSize"];
  $sql = "select * from service";
  $service = $pdo->prepare( $sql );
  // $dog->bindValue(":room", $_REQUEST["roomstyle"]);
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
      else{
        $double=1;
      }
      
    $str='';

    while ( $serviceRow = $service->fetch(PDO::FETCH_ASSOC) ){


       $money = $serviceRow["service_price"]*$double;


        $str .= "<div class='service-box service-box{$serviceRow["service_no"]}'>";
        $str .="<p class=''><span class='circle lt'></span><span class='circle lb'></span><span class='b-service-txt'>{$serviceRow["service_name"]}</span><span class='circle rt'></span><span class='circle rb'></span></p>";
        $str .="<input type='hidden' class='input-service-id' name='sevice-val' value='{$serviceRow["service_no"]}'>";
        $str .="<input type='hidden' class='input-service-price' name='sevice-price' value='{$money}'>";
        $str .= "<span id='service-box{$serviceRow["service_no"]}' class='add-icon'><i class='fa fa-plus' aria-hidden='true'></i></span>
          </div>";
                                          
      
    }//while

    //送出json字串
    echo json_encode( $str);//陣列編碼成json字串，回傳到前端

  } 
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>