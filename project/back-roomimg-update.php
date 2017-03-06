<?php
try{
  header("Content-Type:text/html; charset=utf-8");
  require_once("connectFurkid.php");

    $img1Src = $_REQUEST['img1Src'];
    $img2Src = $_REQUEST['img2Src'];
    $img3Src = $_REQUEST['img3Src'];

    $img1Id = $_REQUEST['img1Id'];
    $img2Id = $_REQUEST['img2Id'];
    $img3Id = $_REQUEST['img3Id'];


     $sql = "update roomimg 
              set roomimg_name = :roomimg_name
              where roomimg_no = :roomimg_no;";
     $roomimg = $pdo->prepare( $sql);
     $roomimg->bindValue(':roomimg_name',$img1Src);
     $roomimg->bindValue(':roomimg_no',$img1Id);
     $roomimg->execute();


     $sql = "update roomimg 
              set roomimg_name = :roomimg_name
              where roomimg_no = :roomimg_no;";
     $roomimg = $pdo->prepare( $sql );
     $roomimg->bindValue(':roomimg_name',$img2Src);
     $roomimg->bindValue(':roomimg_no',$img2Id);
     $roomimg->execute();

     $sql = "update roomimg 
              set roomimg_name = :roomimg_name
              where roomimg_no = :roomimg_no;";
     $roomimg = $pdo->prepare( $sql );
     $roomimg->bindValue(':roomimg_name',$img3Src);
     $roomimg->bindValue(':roomimg_no',$img3Id);
     $roomimg->execute();


     echo "成功";




}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>