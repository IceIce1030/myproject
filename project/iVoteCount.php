<?php
try{
  require_once("connectFurkid.php");
  
  $sql = "update vote
          set vote_count = vote_count + 1
          where vote_no = :voteNo";
  $voteCount = $pdo->prepare( $sql );
  $voteCount->bindValue(":voteNo",$_REQUEST["voteNo"]);
  $voteCount->execute();
  
}catch(PDOException $e){
  echo $e->getMessage();
}
?>