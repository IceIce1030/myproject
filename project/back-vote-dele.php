<?php
try{
  header("Content-Type:text/html; charset=utf-8");
  require_once("connectFurkid.php");
    $vote_no = $_REQUEST["vote_no"];

    $sql1 = "delete from votemsg
                where vote_no = :vote_no;";

    $vote1 = $pdo->prepare( $sql1 );
     $vote1->bindValue(":vote_no", $vote_no);
     $vote1->execute();



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