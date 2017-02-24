<?php
try{
  require_once("connectFurkid.php");

  $dogId = $_REQUEST["mypet_dog_id"];

  $sql = "select * from dog where dog_no=:dog_no";
  $dog = $pdo->prepare( $sql );
  $dog->bindValue(":dog_no", $dogId);
  $dog->execute();
  
  if( $dog->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "{}";
  }
  else{ //找得到
     //取回一筆資料
    // $dogRow = $dog->fetch(PDO::FETCH_ASSOC);

  		$str='';

   	while ( $dogRow = $dog->fetch() ){

        $return_arr =array(
                  "dog_size"=>$dogRow["dog_size"],
                  "dog_name"=>$dogRow["dog_name"],
                  "dog_img"=>$dogRow["dog_img"]


          ); 


  																			
	    
    }//while

    //送出json字串
    echo json_encode( $return_arr);//陣列編碼成json字串，回傳到前端
    // echo $str;

  }//else找到
}catch(PDOException $e){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>