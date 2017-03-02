<?php
try{
  require_once("connectFurkid.php");
  
  $sql = "select 
  a.mem_no, 
  mem_name, 
  arti_title, 
  arti_content, 
  arti_date, 
  arti_count, 
  arti_img, 
  arti_sort, 
  arti_report, 
  arti_no 
  from article a join member b
  where a.mem_no = b.mem_no
  and ( select count(*) from article
        where arti_sort = a.arti_sort and arti_date >= a.arti_date
        ) <= 3
  order by arti_sort, arti_date desc";
  $article = $pdo->prepare( $sql );
  // $eventStatus->bindValue(":eventStatus",'yes');
  $article->execute();
  
  if( $article->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    // echo "{}";
  }else{ //找得到
    //取回一筆資料
    // $eventStatusRow = $eventStatus->fetch(PDO::FETCH_ASSOC);
    while($articlerow = $article->fetch()) { 
   $return_arr[] = array( 
   'mem_no'=>$articlerow['mem_no'],
   'mem_name'=>$articlerow['mem_name'],
   'arti_title'=>$articlerow['arti_title'],
   'arti_content'=>$articlerow['arti_content'],
   'arti_date'=>$articlerow['arti_date'],
   'arti_count'=>$articlerow['arti_count'],
   'arti_img'=>$articlerow['arti_img'],
   'arti_sort'=>$articlerow['arti_sort'],
   'arti_report'=>$articlerow['arti_report'],
   'arti_no'=>$articlerow['arti_no']
   ); }
    //送出json字串
    echo json_encode( $return_arr );
  } 
}catch(PDOException $e){
  echo $e->getMessage();
}
?>