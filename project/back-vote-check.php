<?php
try{
  header("Content-Type:text/html; charset=utf-8");
  require_once("connectFurkid.php");


    //共幾筆

    $sql2 = "select count(*) totalRecords from vote;";
    
  
    $voteCount = $pdo->query($sql2);
    $voteCountRow = $voteCount->fetch();
    $totalRecords = $voteCountRow["totalRecords"];
    //每頁印幾筆
    $pageRecords = 5;

    //共幾頁
    $pages = ceil($totalRecords/$pageRecords);

    //顯示目前這一筆
    $pageNo = isset($_REQUEST["pageNo"]) == false ? 1 : $_REQUEST["pageNo"];
    $start = ($pageNo - 1) * $pageRecords;



     $sql = "select *
             from pet p join vote v on p.pet_no = v.pet_no
                        join dog d on p.dog_no = d.dog_no
             order by v.vote_count desc
             limit $start, $pageRecords;";
     $vote = $pdo->prepare( $sql );
     $vote->execute();
  
  if( $vote->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "沒有找到資料";
  }else{ //找得到
     //取回一筆資料
    // $dogRow = $dog->fetch(PDO::FETCH_ASSOC);
     $str='';
     $str .="<tr>
                  <th>編號</th>
                  <th>種類</th>        
                  <th>萌主名稱</th>
                  <th>萌主照片</th> 
                  <th>性別</th>
                  <th width='250'>介紹</th>
                  <th>參加日期</th>
                  <th>總票數</th>
                  <th>編輯</th>                  
             </tr>";

    while ( $voteRow = $vote->fetch(PDO::FETCH_ASSOC) ){
       if($voteRow["pet_sex"]=='f'){
          $voteRow["pet_sex"] = '女孩';
      }
      else{
          $voteRow["pet_sex"] = '男孩';
      }

        $str .="<tr>
                  <td>{$voteRow["vote_no"]}</td>
                  <td>{$voteRow["dog_name"]}</td>
                  <td>{$voteRow["pet_name"]}</td>
                  <td>
                    <img style='width: 80px;height:auto;'' src='images/race_image/{$voteRow["vote_img"]}'>
                  </td>
                  
                  <td>{$voteRow["pet_sex"]}</td>
                  <td width='250' class='text-left'>{$voteRow["vote_intro"]}</td>
                  <td>{$voteRow["vote_date"]}</td>
                  <td>{$voteRow["vote_count"]}</td>
                  <td>
                    <input type='button' class='dele inputBtn' value='刪除'>
                    <input type='hidden' class='inputBtn voteid' value='{$voteRow["vote_no"]}'>
                  </td>

                </tr>";                                        
      
    }//while

    //送出json字串
    // echo json_encode( $str);//陣列編碼成json字串，回傳到前端

    $str .="<tr><td colspan='9'>";
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