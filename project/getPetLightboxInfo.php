<?php 

try{
  require_once("connectFurkid.php");
  $sql = "select * from pet natural join dog where pet_no=:pet_no";
  $pet = $pdo->prepare($sql);
  $pet->bindValue(":pet_no", $_REQUEST["pet_no"]);
  $pet->execute();
  if( $pet->rowCount() == 0){ //沒有寵物
  	echo "no pet";
  }else{
    //取回寵物資料
    $petRow = $pet->fetch(PDO::FETCH_ASSOC);
        //送出json字串
    echo json_encode( $petRow );
  }
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>