<?php
try{
  require_once("connectFurkid.php");
  header("Content-Type:text/html; charset=utf-8");
  // $sql = "select * from article";
  // $sql = "select * from article where arti_sort like '新手爸媽'";
  $sql = "select * from article where arti_sort=:arti_sort";
  $discuss = $pdo->prepare( $sql );
  $discuss->bindValue(":arti_sort", $_REQUEST["arti_sort"]);
  $discuss->execute();
 
  
  if( $discuss->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "{}";
  }
  else{ //找得到
     //取回一筆資料
    // $dogRow = $dog->fetch(PDO::FETCH_ASSOC);

  		$str='';
      $sort='';
      $label='';
      
 
   	while ( $discussRow = $discuss->fetch() ){
        
      switch ($discussRow["arti_sort"]) {
        case '住宿分享':
          $sort='aa';
          $label='shareLabel';
          break;
        case '健康鮮食':
          $sort='bb';
          $label='foodLabel';
          break;
        case '新手爸媽':
          $sort='cc';
          $label='newLabel';
          break;
        case '寵物保健':
          $sort='dd';
          $label='healthLabel';
          break;
      }

      $hot='';
      if ($discussRow["arti_count"]>120) {
          $hot='on';

      }
      $discussRow["arti_content"] = mb_substr( $discussRow["arti_content"] , 0 , 30 ,'utf8' );

      $str.="<a href='article.html?arti_no={$discussRow["arti_no"]}'><div class='item $sort'><div class='itemlabel' id='$label'>{$discussRow["arti_sort"]}</div>
            <img src='images/articlephoto/{$discussRow["arti_img"]}'>
            <h3>{$discussRow["arti_title"]}</h3>
            <span class='postDate'>{$discussRow["arti_date"]}</span><span class='hotLabel $hot'>HOT</span>
            <p class='txt'>{$discussRow["arti_content"]}...</p>
            <div class='watchMess'>
              <span class='watch'>{$discussRow["arti_count"]}</span>
              <span class='message' id='message'>{$discussRow["arti_reply"]}</span>
            </div><div class='clear'></div>
          </div></a>
        ";

       
     

          
          
        }
	    
    }


                        
                        
                        
                    
                   

    //送出json字串
    echo json_encode( $str);//陣列編碼成json字串，回傳到前端

  	
}catch(PDOException $e){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>