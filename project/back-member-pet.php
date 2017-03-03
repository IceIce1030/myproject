<?php
try{
  require_once("connectFurkid.php");

        
 $sql = " select p.pet_no,p.pet_name,d.dog_size,d.dog_name,d.dog_img,year(p.pet_age) age,p.pet_sex,p.pet_personality
          from pet p join dog d on p.dog_no =d.dog_no
          where mem_no = :mem_no;";
  $pet = $pdo->prepare( $sql );
  $pet->bindValue(':mem_no',$_REQUEST["mem_no"]);


  $pet->execute();
  
  if( $pet->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "沒有找到資料";
  }
  else{ //找得到
     //取回一筆資料
   
     $str='';
     $str .="<tr>
                  <th>寵物編號</th>            
                  <th>寵物名稱</th>
                  <th>寵物體型</th> 
                  <th>寵物種類</th>
                  <th>種類照片</th>
                  <th>年齡</th>
                  <th>性別</th>
                  <th>個性</th> 

             </tr>";

    while ( $petRow = $pet->fetch(PDO::FETCH_ASSOC) ){

      if($petRow["pet_sex"]=='f'){
          $petRow["pet_sex"] = '女';
      }
      else{
          $petRow["pet_sex"] = '男';
      }
      $petRow["age"] = (int)date("Y")-(int)$petRow["age"];
        $str .="<tr>
                  <td>{$petRow["pet_no"]}</td>
                  <td>{$petRow["pet_name"]}</td>
                  <td>{$petRow["dog_size"]}</td>
                  <td>{$petRow["dog_name"]}</td>
                  <td>
                    <img style='width: 80px;height: auto;'' src='images/dog-species/{$petRow["dog_img"]}'>
                  </td>
                  <td>{$petRow["age"]}歲</td>
                  <td>{$petRow["pet_sex"]}</td>
                  <td>{$petRow["pet_personality"]}</td>
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