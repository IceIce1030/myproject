<?php
try{
  require_once("connectFurkid.php");

  $sql = "select 
  a.mem_no, 
  c.mem_img,
  c.mem_name,
  artimsg_no,
  artimsg_content,
  artimsg_date,
  artimsg_report,
  a.arti_no 
  from artimsg a join article b 
  join member c
  where a.arti_no = b.arti_no and a.mem_no = c.mem_no
  and a.arti_no=:arti_no";
  $article = $pdo->prepare( $sql );
  $article->bindValue(":arti_no", $_REQUEST["arti_no"]);
  $article->execute();
 
  $str='';
  if( $article->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "";
  }
  else{ //找得到
     //取回一筆資料
    // $dogRow = $dog->fetch(PDO::FETCH_ASSOC);

  		

   	while ( $articleRow = $article->fetch() ){
      
      $reported='';
      if ($articleRow["artimsg_report"]>0) {
          $reported='on';
      }
      
      
      //留言內容
        $str.="<div class='replyRow1'>
          <img src='images/member/{$articleRow["mem_img"]}'>
          <div class='postGroup'>
            <span class='author'>{$articleRow["mem_name"]}</span>
            <span class='postDate'>{$articleRow["artimsg_date"]}</span>
          </div>
                  <div class='reportBtn $reported' onclick='reportReply({$articleRow["artimsg_no"]})'>檢舉</div>
                  <div class='reportedBtn $reported'>已檢舉</div>
                  <div class='clear'></div>
      </div>
      <div class='replyRow2'>
          <div class='replyTxt'>
            {$articleRow["artimsg_content"]}
          </div>
      </div>";


          
          
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