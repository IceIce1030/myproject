<?php
try{
  require_once("connectFurkid.php");
    $no = $_REQUEST["arti_no"];
       $sql = "select *
               from article
               where arti_no = :arti_no;";
    
    
     $arti = $pdo->prepare( $sql );

     $arti->bindValue(':arti_no',$no);

     $arti->execute();
  
  if( $arti->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "沒有找到資料";
  }else{ //找得到
     //取回一筆資料
     $str='';
    
    while ( $artiRow = $arti->fetch(PDO::FETCH_ASSOC) ){
      $str .= $artiRow["arti_content"];
      
    }//while

    //送出json字串
    // echo json_encode( $str);//陣列編碼成json字串，回傳到前端
    echo $str;

  } 
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>