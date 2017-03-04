<?php
try{
  require_once("connectFurkid.php");
  $sql = "select * from article where mem_no=:mem_no order by arti_date desc";
  
  $discuss = $pdo->prepare( $sql );
  $discuss->bindValue(":mem_no", $_REQUEST["mem_no"]);
  $discuss->execute();
  
  if( $discuss->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "no article";
  }
  else{ //找得到
     //取回一筆資料
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
      $discussRow["arti_content"] = mb_substr( $discussRow["arti_content"] , 0 , 60 );

      $str.="<a href='article.html?arti_no={$discussRow["arti_no"]}'><div class='post'>
        <div class='itemLabel $label'>{$discussRow["arti_sort"]}</div>
        <div class='postImg'>
            <img src='images/articlephoto/{$discussRow["arti_img"]}'>
        </div>
        <div class='txt'>
            <div class='postTitle'>
                <h3>{$discussRow["arti_title"]}</h3></div>
            <div class='postDate'><span class='postDate'>{$discussRow["arti_date"]}</span><span class='hotLabel $hot'>HOT</span></div>
            <div class='postContent'>
                {$discussRow["arti_content"]}...
            </div>
            <div class='postInfo'>
                <span class='watch'>{$discussRow["arti_count"]}</span>
                <span class='message'>{$discussRow["arti_reply"]}</span>
            </div>
        </div>
        <div class='clear'></div>
    </div>
</a>";
        }//while
     //送出字串
      echo $str;
    }//else
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage(), "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>

