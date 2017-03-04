<?php
try{
  require_once("connectFurkid.php");
  $sql = "select * from dog where dog_size= :dog_size";
  $dog = $pdo->prepare( $sql );
  $dog->bindValue(":dog_size", $_REQUEST["dog_size"]);
  $dog->execute();
  while( $dogRow = $dog->fetch()){
  	echo "<option id='dog_no_option{$dogRow["dog_no"]}' value='{$dogRow["dog_no"]}'>{$dogRow["dog_name"]}</option>\n";
  }
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?> 


