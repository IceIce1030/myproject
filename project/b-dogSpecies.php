<?php
try{
  require_once("connectFurkid.php");

  $dogId = $_REQUEST["dogId"];

  $sql = "select * from dog where dog_size=:dogSize";
  $dog = $pdo->prepare( $sql );
  $dog->bindValue(":dogSize", $_REQUEST["dogSize"]);
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


   		if($dogId == $dogRow["dog_no"]){
   			$str .= "<div class='col-xs-3 col-md-3 col-md-3 dogk' style='opacity: 1' >";
   			$str .="<div class='img-box'>
						<img class='rwd-img' src='images/dog-species/{$dogRow["dog_img"]}'>
					</div>";
			$str .= "<div class='footprint-add footprint' >
						<img class='rwd-img' src='images/Pet_footprint.png'>
					</div>";
			$str .="<p>{$dogRow["dog_name"]}</p>";
			$str .="<input type='hidden' name='dog_king' value='{$dogRow["dog_no"]}'>
					</div>";
   		}


   		else{
   			$str .= "<div class='col-xs-3 col-md-3 col-md-3 dogk'>";
   			$str .="<div class='img-box'>
						<img class='rwd-img' src='images/dog-species/{$dogRow["dog_img"]}'>
					</div>";
			$str .= "<div class='footprint'>
					<img class='rwd-img' src='images/Pet_footprint.png'>
				</div>";
			$str .="<p>{$dogRow["dog_name"]}</p>";
			$str .="<input type='hidden' name='dog_king' value='{$dogRow["dog_no"]}'>
					</div>";
   		}
   		

  		

  																			
	    
    }//while

    //送出json字串
    echo json_encode( $str);//陣列編碼成json字串，回傳到前端

  }//else找到
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>