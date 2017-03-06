<?php
try{
  require_once("connectFurkid.php");

   $sql ="select * from votemsg join member on votemsg.mem_no = member.mem_no where vote_no = :voteNo order by votemsg_date desc limit 1";
  // where mem_name=:memId
  $latestMsg = $pdo->prepare( $sql );
  $latestMsg->bindValue(":voteNo", $_REQUEST["vote_no"]);
  $latestMsg->execute();
  $latestMsgRow = $latestMsg->fetch(); 

  if( $latestMsg->rowCount() == 0 ){
    $str="<span></span>
          <span id='lastestMsg'>~快來幫我留言~</span>";
  }else{
    $str="<span>{$latestMsgRow["mem_name"]}:&nbsp;</span><span id='lastestMsg'>{$latestMsgRow["votemsg_content"]}</span>";
  };

 echo $str;


}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>