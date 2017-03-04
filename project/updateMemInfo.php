<?php 

try{
  require_once("connectFurkid.php");
  $sql = "update member set mem_name=:mem_name, 
          mem_phone=:mem_phone, mem_mail=:mem_mail, 
          mem_img=:mem_img where mem_no=:mem_no";
  $member = $pdo->prepare($sql);
  $member->bindValue(":mem_no", $_REQUEST["mem_no"]);
  $member->bindValue(":mem_name", $_REQUEST["mem_name"]);
  $member->bindValue(":mem_phone", $_REQUEST["mem_phone"]);
  $member->bindValue(":mem_mail", $_REQUEST["mem_mail"]);
  $member->bindValue(":mem_img", $_REQUEST["mem_img"]);
  $member->execute();

}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}

?>