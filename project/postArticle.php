<?php 
try{
	require_once("connectFurkid.php");
 
    $sql = "insert into article(mem_no, arti_title, arti_content, arti_date, arti_count, arti_reply, arti_img, arti_sort, arti_report) value(:mem_no,:arti_title,:arti_content,:arti_date,'0','0',:arti_img,:arti_sort,'0')";
    //會員編號先用2號
	$postArticle = $pdo->prepare( $sql );
    $postArticle->bindValue(":mem_no",$_REQUEST["mem_no"]);
    $postArticle->bindValue(":arti_title", $_REQUEST["arti_title"]);
    $postArticle->bindValue(":arti_content", $_REQUEST["arti_content"]);
    $postArticle->bindValue(":arti_date", $_REQUEST["arti_date"]);
    $postArticle->bindValue(":arti_img", $_REQUEST["arti_img"]);
    $postArticle->bindValue(":arti_sort", $_REQUEST["arti_sort"]);
    // $postArticle->bindValue(":mem_no",'1');
    // $postArticle->bindValue(":arti_title", '111');
    // $postArticle->bindValue(":arti_content", '111');
    // $postArticle->bindValue(":arti_date", '2017-02-02 20:02:01');
    // $postArticle->bindValue(":arti_img", '123.jpg');
    // $postArticle->bindValue(":arti_sort",'住宿分享');
    $postArticle->execute();
	
    

}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}


?>