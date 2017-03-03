<?php
try{
  require_once("connectFurkid.php");


    //共幾筆

    $sql2 = "select count(*) totalRecords from member;";
    
  
    $memberCount = $pdo->query($sql2);
    $memberCountRow = $memberCount->fetch();
    $totalRecords = $memberCountRow["totalRecords"];
    //每頁印幾筆
    $pageRecords = 5;

    //共幾頁
    $pages = ceil($totalRecords/$pageRecords);

    //顯示目前這一筆
    $pageNo = isset($_REQUEST["pageNo"]) == false ? 1 : $_REQUEST["pageNo"];
    $start = ($pageNo - 1) * $pageRecords;



     $sql = "select *
             from member
             limit $start, $pageRecords;";
     $member = $pdo->prepare( $sql );
     $member->execute();
  
  if( $member->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "沒有找到資料";
  }else{ //找得到
     //取回一筆資料
    // $dogRow = $dog->fetch(PDO::FETCH_ASSOC);
     $str='';
     $str .="<tr>
                  <th>會員編號</th>            
                  <th>會員名稱</th>
                  <th>會員照片</th> 
                  <th>會員性別</th>
                  <th>會員帳號</th>
                  <th>會員密碼</th>
                  <th>聯絡電話</th>
                  <th>聯絡信箱</th>
                  <th>會員寵物</th>
                          
             </tr>";

    while ( $memberRow = $member->fetch(PDO::FETCH_ASSOC) ){
       if($memberRow["mem_sex"]=='f'){
          $memberRow["mem_sex"] = '女';
      }
      else{
          $memberRow["mem_sex"] = '男';
      }

        $str .="<tr>
                  <td>{$memberRow["mem_no"]}</td>
                  <td>{$memberRow["mem_name"]}</td>
                  <td>
                    <img style='width: 80px;height:auto;'' src='images/member/{$memberRow["mem_img"]}'>
                  </td>
                  <td>{$memberRow["mem_sex"]}</td>
                  <td>{$memberRow["mem_id"]}</td>
                  <td>{$memberRow["mem_psw"]}</td>
                  <td>{$memberRow["mem_phone"]}</td>
                  <td>{$memberRow["mem_mail"]}</td>
                  <td>
                    <input type='button' class='lookPet inputBtn' value='查看寵物'>
                    <input type='hidden' class='inputBtn memid' value='{$memberRow["mem_no"]}'>
                  </td>

                </tr>";                                        
      
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
}catch(PDOException $e){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>