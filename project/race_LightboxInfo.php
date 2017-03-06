<?php
try{
  require_once("connectFurkid.php");
  $sql = "select * from vote join pet on vote.pet_no = pet.pet_no join dog on pet.dog_no = dog.dog_no join member on pet.mem_no = member.mem_no  where vote.vote_no = :LightboxInfo";

  $LightboxInfo = $pdo->prepare( $sql );
  $LightboxInfo->bindValue(":LightboxInfo",$_REQUEST['lightboxNum']);
  $LightboxInfo->execute();
  
  if( $LightboxInfo->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "";
  }else{ //找得到
    //取回一筆資料


    $LightboxInfoRow = $LightboxInfo->fetchAll(PDO::FETCH_ASSOC);
 

    //送出json字串
    echo json_encode( $LightboxInfoRow );
  } 
}catch(PDOException $e){
  echo $e->getMessage();
}
?>