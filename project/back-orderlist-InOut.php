<?php
try{
  require_once("connectFurkid.php");

    $order_no = $_REQUEST['order_no'];
    $btnVal = $_REQUEST['btnVal'];

    $nowDate =  date("Y-m-d h:i:s");

    if($btnVal=='入住'){
         $sql = "update orderlist 
            set real_in=:real_in
            where orderlist_no = :orderlist_no;";
          $orderlist = $pdo->prepare( $sql );
          $orderlist->bindValue(":real_in", $nowDate);
          $orderlist->bindValue(":orderlist_no", $order_no);
          $orderlist->execute();
    }
    else{
          $sql = "update orderlist 
            set real_out=:real_out
            where orderlist_no = :orderlist_no;";
          $orderlist = $pdo->prepare( $sql );
          $orderlist->bindValue(":real_out", $nowDate);
          $orderlist->bindValue(":orderlist_no", $order_no);
          $orderlist->execute();
    }
  

     echo "成功!";
  
}catch(PDOException $e){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>