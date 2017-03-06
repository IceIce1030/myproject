<?php
try{
  header("Content-Type:text/html; charset=utf-8");
  require_once("connectFurkid.php");

  $mem_no = $_REQUEST["mem_no"];
  $sql = "select * from pet where mem_no = :mem_no";
  $pet = $pdo->prepare( $sql );
  $pet->bindValue(":mem_no", $mem_no);
  $pet->execute();
  
  if( $pet->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    // echo "{}";
  }else{ //找得到
     //取回一筆資料
    // $dogRow = $dog->fetch(PDO::FETCH_ASSOC);

    $str="<option disabled='disabled'>請選擇</option>\n";

    while ( $petRow = $pet->fetch(PDO::FETCH_ASSOC) ){

        $str .= "<option value='{$petRow["pet_no"]}'>{$petRow["pet_name"]}</option>\n";                      
      
    }//while

    //送出json字串
    echo $str;//陣列編碼成json字串，回傳到前端

  } 
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>