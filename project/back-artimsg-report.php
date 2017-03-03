<?php
try{
  require_once("connectFurkid.php");
    $txt = $_REQUEST["txt"];


    //共幾筆
    if($txt=='report'){
        $sql2 = "select count(*) totalRecords from artimsg where artimsg_report = '1';";
    }
    else{
        $sql2 = "select count(*) totalRecords from artimsg;";
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
       $sql = "select am.artimsg_no,m.mem_name,a.arti_title,am.artimsg_content,am.artimsg_date,am.artimsg_report
               from artimsg am join article a on am.arti_no = a.arti_no
                               join member m on am.mem_no = m.mem_no
               where artimsg_report='1'
               limit $start, $pageRecords;";
    }
    else{
       $sql = "select am.artimsg_no,m.mem_name,a.arti_title,am.artimsg_content,am.artimsg_date,am.artimsg_report
               from artimsg am join article a on am.arti_no = a.arti_no
                               join member m on am.mem_no = m.mem_no
               limit $start, $pageRecords;";
    }

    
     $artimsg = $pdo->prepare( $sql );
     // $artimsg ->bindValue(':start',$start);
     // $artimsg ->bindValue(':pageRecords',$pageRecords);
     $artimsg->execute();
  
  if( $artimsg->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "沒有找到資料";
  }else{ //找得到
     //取回一筆資料
    // $dogRow = $dog->fetch(PDO::FETCH_ASSOC);
     $str='';
     if($txt == 'report'){
        $str .="<tr>
                  <th>留言編號</th>       
                  <th>會員姓名</th>
                  <th>文章標題</th>
                  <th width='250'>留言內容</th>
                  <th>留言時間</th>         
                  <th>檢舉處理</th>
             </tr>";
     }
     else{
        $str .="<tr>
                  <th>文章編號</th>       
                  <th>會員姓名</th>
                  <th>文章標題</th>
                  <th width='250'>留言內容</th>
                  <th>留言時間</th>
                 
                  
             </tr>";
     }
     

    while ( $artimsgRow = $artimsg->fetch(PDO::FETCH_ASSOC) ){

      

     

      if($txt == 'report'){
        $str .="<tr>
                  <td>{$artimsgRow["artimsg_no"]}</td>
                  
                  <td>{$artimsgRow["mem_name"]}</td>
                  <td class='text-left'>{$artimsgRow["arti_title"]}</td>
                  <td width='250' class='text-left'>
                      {$artimsgRow["artimsg_content"]}
                      <input type='hidden'  value={$artimsgRow["artimsg_no"]} id='artiNo'>
                  </td>
                  <td>{$artimsgRow["artimsg_date"]}</td>
                  
                  <td>
                    <input type='button' class='inputBtn doWhat' value='刪除' id='dele'>
                    <input type='button' class='inputBtn doWhat' value='取消' id='cancel'>
                    
                    <input type='hidden'  value={$artimsgRow["artimsg_no"]} id='artiNo'>
                  </td> 
                  
                </tr>";                                        
      }
      else{
          $str .="<tr>
                  <td>{$artimsgRow["artimsg_no"]}</td>
                  
                  <td>{$artimsgRow["mem_name"]}</td>
                  <td class='text-left' >{$artimsgRow["arti_title"]}</td>
                  <td width='250' class='text-left oneline'>
                      {$artimsgRow["artimsg_content"]}
                  </td>
                  <td>{$artimsgRow["artimsg_date"]}</td>
                       
                </tr>"; 
      }
      
    }//while

    //送出json字串
    // echo json_encode( $str);//陣列編碼成json字串，回傳到前端



    $str .="<tr><td colspan='6'>";
    for( $i=1; $i<=$pages; $i++){
       $str .= "<span class='page' id='page$i'>$i</span> &nbsp;";
    }
    $str .= "</td></tr>";
    echo $str;

  } 
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>