<?php
try{
  require_once("connectFurkid.php");
  
  $sql = "select 
          a.pet_no, 
          b.dog_no,
          vote_no,
          vote_img,
          vote_count,
          pet_name,
          pet_personality,
          pet_sex,
          dog_size
          from pet a join dog b 
          join vote c
          where a.dog_no = b.dog_no and a.pet_no = c.pet_no
          order by a.pet_no desc";

  $vote = $pdo->prepare( $sql );
  // $eventStatus->bindValue(":eventStatus",'yes');
  $vote->execute();
  
  if( $vote->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    // echo "{}";
  }else{ //找得到
    //取回一筆資料
    // $eventStatusRow = $eventStatus->fetch(PDO::FETCH_ASSOC);
    while($voterow = $vote->fetch()) { 
   $return_arr[] = array( 
   'vote_no'=>$voterow['vote_no'],
   'vote_img'=>$voterow['vote_img'],
   'vote_count'=>$voterow['vote_count'],
   'pet_name'=>$voterow['pet_name'],
   'pet_personality'=>$voterow['pet_personality'],
   'pet_sex'=>$voterow['pet_sex'],
   'dog_size'=>$voterow['dog_size']
 
   ); }
    //送出json字串
    echo json_encode( $return_arr );
  } 
}catch(PDOException $e){
  echo $e->getMessage();
}
?>