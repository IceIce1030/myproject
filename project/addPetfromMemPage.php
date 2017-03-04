<?php  

try{
  require_once("connectFurkid.php");
 $sql="insert into pet(mem_no, dog_no, pet_name, pet_age, pet_sex, pet_personality, pet_img) values(:mem_no, :dog_no, :pet_name, :pet_age, :pet_sex, :pet_personality, :pet_img)";
  
  $member = $pdo->prepare($sql);
  $member->bindValue(":mem_no", $_REQUEST["mem_no"]);
  $member->bindValue(":pet_name", $_REQUEST["pet_name"]);
  $member->bindValue(":dog_no", $_REQUEST["dog_no"]);
  $member->bindValue(":pet_sex", $_REQUEST["pet_sex"]);
  $member->bindValue(":pet_personality", $_REQUEST["pet_personality"]);
  $member->bindValue(":pet_img", $_REQUEST["pet_img"]);

  $yy = date("Y");//找出今年
  $aa =  (int)$yy-(int)$_REQUEST["pet_age_number"];//今年-年齡=生日年
  $pet_age =date("$aa-m-d");
  $member->bindValue(":pet_age", $pet_age);
  $member->execute();
  
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>