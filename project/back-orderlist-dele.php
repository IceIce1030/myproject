<?php
try{
  require_once("connectFurkid.php");
    $orderlist_no = $_REQUEST["order_no"];

    $sql1 = "delete from orderservice
             where orderlist_no = :orderlist_no;";
    
    
     $orderservice = $pdo->prepare( $sql1 );
     $orderservice->bindValue(":orderlist_no", $orderlist_no);
     $orderservice->execute();



    $sql = "delete from orderlist
             where orderlist_no = :orderlist_no;";
    
    
     $orderlist = $pdo->prepare( $sql );
     $orderlist->bindValue(":orderlist_no", $orderlist_no);
     $orderlist->execute();



    //送出json字串
    // echo json_encode( $str);//陣列編碼成json字串，回傳到前端
    echo '刪除成功';

   
}
catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>