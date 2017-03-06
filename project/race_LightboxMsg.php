<?php
try{
  require_once("connectFurkid.php");
  $sql = "select votemsg.votemsg_content,member.mem_name,votemsg.votemsg_date,member.mem_no,vote.vote_no 
from votemsg 
join member on member.mem_no = votemsg.mem_no  
join vote on vote.vote_no = votemsg.vote_no 
where vote.vote_no = :LightboxInfo
order by votemsg.votemsg_date asc ";

  $LightboxInfo = $pdo->prepare( $sql );
  $LightboxInfo->bindValue(":LightboxInfo",$_REQUEST['lightboxNum']);
  $LightboxInfo->execute();
  
  if( $LightboxInfo->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
   $nodata ='nodata';
    echo json_encode( $nodata );

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