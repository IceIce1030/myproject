<?php
try{
  header("Content-Type:text/html; charset=utf-8");
  require_once("connectFurkid.php");

  $pet_no = $_REQUEST["pet_no"];
  // $pet_no = 14;
  $sql = "select pet_no , dog_no , pet_name , pet_sex , pet_personality , year(pet_age) pet_age from pet where pet_no = :pet_no";
  $pet = $pdo->prepare( $sql );
  $pet->bindValue(":pet_no", $pet_no);
  $pet->execute();
  
  if( $pet->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "{}";
  }else{ //找得到
     //取回一筆資料
    // $dogRow = $dog->fetch(PDO::FETCH_ASSOC);


    while ( $petRow = $pet->fetch(PDO::FETCH_ASSOC) ){
      $return_arr[] = array(
                      "pet_no"=>$petRow["pet_no"],
                      'dog_no'=>$petRow['dog_no'],
                      'pet_name'=>$petRow['pet_name'],
                      'pet_sex'=>$petRow['pet_sex'],
                      'pet_personality'=>$petRow['pet_personality'],
                      'pet_age'=>$petRow['pet_age']
                      );
                      
      
    }//while

    //送出json字串
    // echo print_r($return_arr);
    echo json_encode( $return_arr );//陣列編碼成json字串，回傳到前端

  } 
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>