<?php
try{
  header("Content-Type:text/html; charset=utf-8");
  require_once("connectFurkid.php");

  $order_no = $_REQUEST['order_no'];

        $sql = "select o.orderlist_no,o.mem_no,m.mem_name,r.room_name,p.pet_name,o.orderlist_date,o.exp_in,o.exp_out,o.real_in,o.real_out,m.mem_phone
        from orderlist o join pet p on o.pet_no = p.pet_no
                         join room r on o.room_no = r.room_no
                         join member m on o.mem_no = m.mem_no
                where o.orderlist_no=:orderlist_no;";
        $orderlist = $pdo->prepare( $sql );
        $orderlist->bindValue(":orderlist_no", $order_no);

  
  $orderlist->execute();
  
  if( $orderlist->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "沒有找到資料";
  }else{ //找得到
     //取回一筆資料
    // $dogRow = $dog->fetch(PDO::FETCH_ASSOC);
     $str='';
     $str .="<tr>
                  <th>訂單編號</th>
                  <th>會員名稱</th>
                  <th>房間名稱</th>
                  <th>寵物名稱</th>
                  <th>服務</th>
                  <th>訂單日期</th>
                  <th>預計入住日期</th>
                  <th>預計退房日期</th>
                  <th>實際入住日期</th>
                  <th>實際退房日期</th>
                  <th>連絡電話</th>
                  <th>訂單處理</th>
                </tr>";

    while ( $orderlistRow = $orderlist->fetch(PDO::FETCH_ASSOC) ){

        if($orderlistRow["real_in"]==NULL){
            $orderlistRow["real_in"]="<input type='button' value='入住' class='inputBtn check' id='{$orderlistRow["orderlist_no"]}'>";
            // $str .= $orderlistRow["real_in"];
        }
        if($orderlistRow["real_out"]==NULL){
            $orderlistRow["real_out"] ="<input type='button' value='退房' class='inputBtn check' id='{$orderlistRow["orderlist_no"]}'>";

             // $str .= $orderlistRow["real_out"];
           
        }
        $str .="<tr>
                  <td>{$orderlistRow["orderlist_no"]}</td>
                  
                  <td>{$orderlistRow["mem_name"]}</td>
                  <td>{$orderlistRow["room_name"]}</td>
                  <td>
                    <input type='button' value='加值內容' class='inputBtn lookService'>
                    <input type='hidden' value='{$orderlistRow["orderlist_no"]}' class='orderlistNo'>
                  </td>
                  <td>{$orderlistRow["pet_name"]}</td>
                  <td>{$orderlistRow["orderlist_date"]}</td>
                  <td>{$orderlistRow["exp_in"]}</td>
                  <td>{$orderlistRow["exp_out"]}</td>
                  <td>
                    {$orderlistRow["real_in"]}
                    <input type='hidden' value='{$orderlistRow["orderlist_no"]}' class='orderlistNo'>
                  </td>
                  <td>
                    {$orderlistRow["real_out"]}
                    <input type='hidden' value='{$orderlistRow["orderlist_no"]}' class='orderlistNo'>
                  </td>
                  <td>{$orderlistRow["mem_phone"]}</td>
                  <td>
                    <input type='button' value='取消訂單' class='inputBtn cancelOrder' id='{$orderlistRow["orderlist_no"]}'>
                    <input type='hidden' value='{$orderlistRow["orderlist_no"]}' class='orderlistNo'>
                  </td>
                  
                </tr>";

                                          
      
    }//while

    //送出json字串
    // echo json_encode( $str);//陣列編碼成json字串，回傳到前端
    echo $str;

  } 
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>