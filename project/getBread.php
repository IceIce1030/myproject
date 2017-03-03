<?php
try{
  require_once("connectFurkid.php");

  $sql = "select * from article where arti_no=:arti_no";
  // $sql = "select * from article where arti_no=35";
  $article = $pdo->prepare( $sql );
  $article->bindValue(":arti_no", $_REQUEST["arti_no"]);
  $article->execute();
 
  
  if( $article->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "{}";
  }
  else{ //找得到
    	$str='';

   	while ( $articleRow = $article->fetch() ){
      
      //麵包屑
      $str.="<li><a href='discuss.html'>主題討論</a></li>
      <li><a href='discuss.html'>全部文章</a></li>
      <li><a href=''>{$articleRow["arti_sort"]}</a></li>
      <li><a href='' class='current'>{$articleRow["arti_title"]}</a></li>";


       
     

          
          
        }
	    
    }


                        
                        
                        
                    
                   

    //送出json字串
    // echo json_encode( $str);//陣列編碼成json字串，回傳到前端
    echo $str;
  	
}catch(PDOException $e){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>