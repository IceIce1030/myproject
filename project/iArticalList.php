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
  from member a join article b
  where a.mem_no = (select b.mem_no
  from article
  where arti_title=:title)";
  $voteCount = $pdo->prepare( $sql );
  $voteCount->bindValue(":title",$_REQUEST["title"]);
  $voteCount->execute();
  
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
}catch(PDOException $e){
  echo $e->getMessage();
}
?>