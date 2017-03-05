<?php
try{
  require_once("connectFurkid.php");
    $a_no = $_REQUEST["a"];
    $doWhat = $_REQUEST["dowhat"];

    if($doWhat == '取消'){
         $sql =  "update article
                  set arti_report = '0'
                  where arti_no = :arti_no;";
    }
    else{
        $sql = "delete from article
                where arti_no = :arti_no;";
    }
    
     $arti = $pdo->prepare( $sql );
     $arti->bindValue(":arti_no", $a_no);
     $arti->execute();
       

    //送出json字串
    // echo json_encode( $str);//陣列編碼成json字串，回傳到前端
    if($doWhat == '取消'){
        echo '取消成功';
     }
     else{
        echo "刪除成功";
     }


   
}
catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>