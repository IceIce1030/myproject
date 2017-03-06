<?php
try{
  require_once("connectFurkid.php");
  $sql = "select * from article where mem_no=:mem_no order by arti_date desc";
  
  $discuss = $pdo->prepare( $sql );
  $discuss->bindValue(":mem_no", $_REQUEST["mem_no"]);
  $discuss->execute();
  
  if( $discuss->rowCount() == 0 ){ //找不到
    $noposts ='<div class="reminder" id="discussReminder">
                            <div class="txt">
                                <h4>你還沒有發表過文章，來跟我們分享你和毛小孩的生活點滴吧～</h4>
                                <div class="btnDiv">
                                    <a class="btnFunction" href="discuss.html">加入討論</a>
                                </div>
                            </div>
                        </div>';
    echo $noposts;
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
      $discussRow["arti_content"] = mb_substr( $discussRow["arti_content"] , 0 , 50 );

      $str.="<a class='postLink' href='article.html?arti_no={$discussRow["arti_no"]}'><div class='post'>
        <div class='itemLabel $label'>{$discussRow["arti_sort"]}</div>
        <div class='postImg'>
            <img class='rwd-img' src='images/articlephoto/{$discussRow["arti_img"]}'>
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

