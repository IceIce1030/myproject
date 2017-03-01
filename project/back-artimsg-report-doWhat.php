<?php
try{
  require_once("connectFurkid.php");
    $a_no = $_REQUEST["a"];
    $doWhat = $_REQUEST["dowhat"];

    if($doWhat == '取消'){
         $sql =  "update artimsg
                  set artimsg_report = '0'
                  where artimsg_no = :artimsg_no;";
    }
    else{
        $sql = "delete from artimsg
                where artimsg_no = :artimsg_no;";
    }
    
     $arti = $pdo->prepare( $sql );
     $arti->bindValue(":artimsg_no", $a_no);
     $arti->execute();
     

   

    //送出json字串
    // echo json_encode( $str);//陣列編碼成json字串，回傳到前端
    echo '成功';

   
}
catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>