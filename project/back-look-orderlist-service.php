<?php
try{
  require_once("connectFurkid.php");


     $order_no = $_REQUEST['order_no'];
     $sql = " select *
              from  orderservice os join service s on os.service_no =s.service_no 
              where os.orderlist_no = :order_no;";

      $orderlist = $pdo->prepare( $sql );
      $orderlist->bindValue(':order_no',$order_no);
      $orderlist->execute();
  
  if( $orderlist->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "沒有加值服務";
  }else{ //找得到
     //取回一筆資料
    // $dogRow = $dog->fetch(PDO::FETCH_ASSOC);
     $str='';


    while ( $orderlistRow = $orderlist->fetch(PDO::FETCH_ASSOC) ){

       $str .= "{$orderlistRow["service_name"]}  ";   

                                          
      
    }//while

    //送出json字串
    // echo json_encode( $str);//陣列編碼成json字串，回傳到前端
    echo $str;

  } 
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>