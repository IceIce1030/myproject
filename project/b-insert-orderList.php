<?php
try{
  require_once("connectFurkid.php");


  $service = $_REQUEST["service"];
  $mem_no =$_REQUEST["mem_no"];
  $dog_room = (int)$_REQUEST["dog_room"];
  $dog_name = $_REQUEST["dog_name"];
  $dog_sex = $_REQUEST["dog_sex"];
  $dog_id = (int)$_REQUEST["dog_id"];
  $dog_size = $_REQUEST["dog_size"];
  $dog_age = (int)$_REQUEST["dog_age"];
  $much_night = (int)$_REQUEST["much_night"];
  $dog_personality = $_REQUEST["dog_personality"];
  $dog_mom = $_REQUEST["dog_mom"];
  $total = (int)$_REQUEST["total"];
  $start_y =(int)$_REQUEST["start_y"];
  $start_m =(int)$_REQUEST["start_m"];
  $start_d = (int)$_REQUEST["start_d"];
  $end_y = (int)$_REQUEST["end_y"];
  $end_m = (int)$_REQUEST["end_m"];
  $end_d = (int)$_REQUEST["end_d"];
  $pet_img = "pet_img.png";


  $put_in_pet_no =(int)$_REQUEST["put_in_pet_no"];




  $today = date("Y-m-d h:i:s");



  // $service = array(1,2,5);
  // $mem_no =5;
  // $dog_room = 1;
  // $dog_name = 'doge';
  // $dog_sex = 'f';
  // $dog_id = 15;
  // $dog_size = '中型犬';
  // $dog_age = '2';
  // $much_night = '3';
  // $dog_personality = '害羞';
  // $dog_mom = 'Sara';
  // $total = 9487;
  // $start_y =2017;
  // $start_m =2;
  // $start_d = 24;
  // $end_y = 2017;
  // $end_m = 2;
  // $end_d = 28;
  // $pet_img = "pet_img.png";



  $yy = date("Y");//找出今年
  $aa =  (int)$yy-(int)$dog_age;//今年-年齡=生日年

  $dog_age =date("$aa-m-d");

  $start_date = date("$start_y-$start_m-$start_d");//入住日期
  $end_date = date("$end_y-$end_m-$end_d");//退房日期

  

 if($put_in_pet_no!=null){
    //代表有值
    $dog_no = $put_in_pet_no;
 }

 else{
    //寫入寵物資料
    $sql = "insert into pet( mem_no , dog_no , pet_name , pet_age , pet_sex , pet_personality , pet_img )
            values( :mem_no , :dog_no , :pet_name , :pet_age , :pet_sex , :pet_personality , :pet_img );";
    $pet = $pdo->prepare( $sql );
    $pet->bindValue(":mem_no", $mem_no);
    $pet->bindValue(":dog_no", $dog_id);
    $pet->bindValue(":pet_name", $dog_name);
    $pet->bindValue(":pet_age", $dog_age);
    $pet->bindValue(":pet_sex", $dog_sex);
    $pet->bindValue(":pet_personality", $dog_personality);
    $pet->bindValue(":pet_img", $pet_img);

    $pet->execute();
   




    //撈出最新那隻寵物

    $dog_no = $pdo->lastInsertId();
    // $sql1 = "select * from pet order by pet_no desc limit 1";

    // $newPet = $pdo->prepare($sql1);
    // $newPet->execute();
    // if( $newPet->rowCount() == 0 ){//找不到
    //   // echo "{}";
    // }
    // else{ //找得到
    //    //取回一筆資料
    //   while ( $newPetRow = $newPet->fetch(PDO::FETCH_ASSOC) ){
    //      $dog_no=$newPetRow["pet_no"];
                                               
    //   }//while


    // }//撈出最新那隻寵物  else
 }

  


  //寫入訂單
  $sql2 = "insert into orderlist( mem_no , room_no , pet_no , sitter_name , orderlist_date , exp_in , exp_out , orderlist_total )
          values(  :mem_no , :room_no , :pet_no , :sitter_name , :orderlist_date , :exp_in , :exp_out , :orderlist_total );";
  $orderList = $pdo->prepare( $sql2 );
  $orderList->bindValue(":mem_no", $mem_no);
  $orderList->bindValue(":room_no", $dog_room);
  $orderList->bindValue(":pet_no", $dog_no);
  $orderList->bindValue(":sitter_name", $dog_mom);
  $orderList->bindValue(":orderlist_date", $today);
  $orderList->bindValue(":exp_in", $start_date);
  $orderList->bindValue(":exp_out", $end_date);
  $orderList->bindValue(":orderlist_total", $total);

  $orderList->execute();

  //撈出最新一筆訂單資料取編號
  $orderlist_no = $pdo->lastInsertId();
  // $sql2 = "select * from orderlist order by orderlist_no desc limit 1";

  // $orderList_no = $pdo->prepare($sql2);
  // $orderList_no->execute();
  // if( $orderList_no->rowCount() == 0 ){//找不到
  //   // echo "{}";
  // }
  // else{ //找得到
  //    //取回一筆資料
  //   while ( $orderList_noRow = $orderList_no->fetch(PDO::FETCH_ASSOC) ){
  //      $orderlist_no=$orderList_noRow["orderlist_no"];

  //   }//while


  // }//撈出最新一筆訂單資料取編號  else


  //寫入訂單服務明細
  for( $i=0; $i<count($service) ;$i++ ){
      $sql3 = "insert into orderservice( orderlist_no , service_no )
               values( :orderlist_no , :service_no  );";
      $orderlistservice = $pdo->prepare($sql3);
      $orderlistservice->bindValue(":orderlist_no",$orderlist_no);
      $orderlistservice->bindValue(":service_no",$service[$i]);

      $orderlistservice->execute();

  }//for
  






    // echo print_r($_POST);
  // echo date("$yyy-m-d");



  
}


catch(PDOException $e){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>