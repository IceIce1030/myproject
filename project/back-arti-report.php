<?php
try{
  require_once("connectFurkid.php");
    $txt = $_REQUEST["txt"];



    //共幾筆
    if($txt=='report'){
        $sql2 = "select count(*) totalRecords from article where arti_report = '1';";
    }
    else{
       $sql2 = "select count(*) totalRecords from article ;";
    }
    
    $artiCount = $pdo->query($sql2);
    $artiCountRow = $artiCount->fetch();
    $totalRecords = $artiCountRow["totalRecords"];
    //每頁印幾筆
    $pageRecords = 5;

    //共幾頁
    $pages = ceil($totalRecords/$pageRecords);

    //顯示目前這一筆
    $pageNo = isset($_REQUEST["pageNo"]) == false ? 1 : $_REQUEST["pageNo"];
    $start = ($pageNo - 1) * $pageRecords;



    
    if($txt=='report'){
       $sql = "select a.arti_no,a.mem_no,m.mem_name,a.arti_title,a.arti_content,a.arti_date,a.arti_count,a.arti_img,a.arti_sort
             from article a join member m on a.mem_no = m.mem_no
             where arti_report = '1' 
             order by arti_no
             limit $start, $pageRecords;";
    }
    else{
       $sql = "select a.arti_no,a.mem_no,m.mem_name,a.arti_title,a.arti_content,a.arti_date,a.arti_count,a.arti_img,a.arti_sort
             from article a join member m on a.mem_no = m.mem_no
             order by arti_no
             limit $start, $pageRecords;";
    }

    
     $arti = $pdo->prepare( $sql );
     $arti->execute();
  
  if( $arti->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "沒有找到資料";
  }else{ //找得到
     //取回一筆資料
    // $dogRow = $dog->fetch(PDO::FETCH_ASSOC);
     $str='';
     if($txt == 'report'){
        $str .="<tr>
                  <th>文章編號</th>       
                  <th>會員姓名</th>
                  <th>文章標題</th>
                  <th width='250'>文章內容</th>
                  <th>發文時間</th>
                  <th>文章照片</th>
                  <th>文章分類</th>
                  <th>檢舉處理</th> 
             </tr>";
     }
     else{
        $str .="<tr>
                  <th>文章編號</th>       
                  <th>會員姓名</th>
                  <th>文章標題</th>
                  <th width='250'>文章內容</th>
                  <th>發文時間</th>
                  <th>文章照片</th>
                  <th>文章分類</th>
                  
             </tr>";
     }
     

    while ( $artiRow = $arti->fetch(PDO::FETCH_ASSOC) ){
    

      
      $artiRow["arti_content"] =str_replace('<br>','#',$artiRow["arti_content"]);
      $artiRow["arti_content"] = mb_substr( $artiRow["arti_content"] , 0 , 25 ).'......<br>';
      $artiRow["arti_content"] =str_replace('#','<br>',$artiRow["arti_content"]);
     

      if($txt == 'report'){
        $str .="<tr>
                  <td>{$artiRow["arti_no"]}</td>
                  
                  <td>{$artiRow["mem_name"]}</td>
                  <td class='text-left' >{$artiRow["arti_title"]}</td>
                  <td width='250' class='text-left'>
                      {$artiRow["arti_content"]}
                      <input type='button' class='more btnLink' value='more'>
                      <input type='hidden'  value={$artiRow["arti_no"]} id='artiNo'>
                  </td>
                  <td>{$artiRow["arti_date"]}</td>
                  <td><img style='width: 100px;height: auto;'' src='images/articlephoto/{$artiRow["arti_img"]}'></td>
                  <td>{$artiRow["arti_sort"]}</td>
                  <td>
                   <input type='button' class='inputBtn doWhat' value='刪除' id='dele'>
                    <input type='button' class='inputBtn doWhat' value='取消' id='cancel'>
                    
                    <input type='hidden'  value={$artiRow["arti_no"]} id='artiNo'>
                  </td>         
                </tr>";                                        
      }
      else{
          $str .="<tr>
                  <td>{$artiRow["arti_no"]}</td>
                  
                  <td>{$artiRow["mem_name"]}</td>
                  <td class='text-left' >{$artiRow["arti_title"]}</td>
                  <td width='250' class='text-left oneline'>
                      {$artiRow["arti_content"]}
                      <input type='button' class='more btnLink' value='more'>
                      <input type='hidden'  value={$artiRow["arti_no"]} id='artiNo'>
                  </td>
                  <td>{$artiRow["arti_date"]}</td>
                  <td><img style='width: 100px;height: auto;'' src='images/articlephoto/{$artiRow["arti_img"]}'></td>
                  <td>{$artiRow["arti_sort"]}</td>        
                </tr>"; 
      }
      
    }//while

    //送出json字串
    // echo json_encode( $str);//陣列編碼成json字串，回傳到前端

     $str .="<tr><td colspan='8'>";
    for( $i=1; $i<=$pages; $i++){
       $str .= "<span class='page' id='page$i'>$i</span> &nbsp;";
    }
    $str .= "</td></tr>";
    echo $str;

  } 
}catch(PDOException $e){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>