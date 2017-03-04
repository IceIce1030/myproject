<?php
try{
  require_once("connectFurkid.php");

  $sql = "select a.mem_no, mem_name, mem_img, arti_title, arti_content, arti_date, arti_count, arti_img, arti_sort, arti_report, arti_no 
from article a join member b 
where a.mem_no = b.mem_no 
and arti_no=:arti_no";
  // $sql = "select * from article where arti_no=:arti_no";
  $article = $pdo->prepare( $sql );
  $article->bindValue(":arti_no", $_REQUEST["arti_no"]);
  $article->execute();
 
  
  if( $article->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "{}";
  }
  else{ //找得到
     //取回一筆資料
    // $dogRow = $dog->fetch(PDO::FETCH_ASSOC);

  		$str='';
      $sort='';
      $label='';

   	while ( $articleRow = $article->fetch() ){
      
      
      switch ($articleRow["arti_sort"]) {
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
      if ($articleRow["arti_count"]>120) {
          $hot='on';
      }

      $reported='';
      if ($articleRow["arti_report"]>0) {
          $reported='on';
      }


      
      //底下是文章內容
        $str.=" <tr>
        <td class='firstRow'>
          <h3>{$articleRow["arti_title"]}</h3>
          <div class='classLabel' id='$label'>{$articleRow["arti_sort"]}<span class='hotLabel $hot'>HOT</span></div>
          
          <div class='buttons'>
            <div class='reportBtn $reported' onclick='reportArticle()'>檢舉</div>
            <div class='reportedBtn $reported'>已檢舉</div>
            <div class='shareBtn'>分享</div>
          </div>
        </td>
      </tr>
      <tr>
        <td class='secondRow'>
          <div class='col-xs-12 col-sm-2 col-md-2 secondLeft'>
                        <img src='images/member/{$articleRow["mem_img"]}'>
                        <div class='postGroup'>
                            <span class='author'>{$articleRow["mem_name"]}</span>
                            <span class='postDate'>{$articleRow["arti_date"]}</span>
                        </div>           
                    </div>
                    <div class='col-xs-12 col-sm-10 col-md-10 secondRight'>
                        <div class='articleTxt'>
                        {$articleRow["arti_content"]}
                        <div class='showBlock'>佔行用幹嘛偷看啦用佔行用佔行用佔行用佔行用佔行用佔行用佔行用佔行用佔行用佔行用佔行用佔行用佔行用佔行用佔行用佔行用佔行用佔行用佔行用佔行用佔行用佔行用佔行用佔行用佔行用佔行用</div>
                        </div>
                        <img src='images/articlephoto/{$articleRow["arti_img"]}'>
                    </div>
                </td>
      </tr> ";


       
     

          
          
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