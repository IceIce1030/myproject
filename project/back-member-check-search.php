<?php
try{
  require_once("connectFurkid.php");

        
 $sql = " select * 
          from member 
          where mem_id like ?
          or mem_name like ?";
  $member = $pdo->prepare( $sql );
  $member->bindValue(1, '%'.$_REQUEST["search_txt"].'%');
  $member->bindValue(2, '%'.$_REQUEST["search_txt"].'%');

  $member->execute();
  
  if( $member->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "沒有找到資料";
  }
  else{ //找得到
     //取回一筆資料
   
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
                    <img style='width: 80px;height: auto;'' src='images/member/{$memberRow["mem_img"]}'>
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
    echo $str;

  } 
}catch(PDOException $e){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>