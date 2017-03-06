<?php
try{
  require_once("connectFurkid.php");

  $sql = "update vote
          set vote_count = vote_count + (:action)
          where vote_no = :voteNo";
  // where mem_name=:memId
  $voteToDB = $pdo->prepare( $sql );
  $voteToDB->bindValue(":voteNo", $_REQUEST["vote_no"]);
  $voteToDB->bindValue(":action", $_REQUEST["action"]);
  $voteToDB->execute();
  

}catch(PDOException $e){
  echo $e->getMessage();
}
?>