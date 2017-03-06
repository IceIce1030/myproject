<?php
try{
  header("Content-Type:text/html; charset=utf-8");
  require_once("connectFurkid.php");
    $vote_no = $_REQUEST["vote_no"];

    $sql = "delete from vote
                where vote_no = :vote_no;";
    
    
     $vote = $pdo->prepare( $sql );
     $vote->bindValue(":vote_no", $vote_no);
     $vote->execute();
       

    echo "刪除成功";
     


   
}
catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>