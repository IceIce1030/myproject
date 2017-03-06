<?php
try{
  require_once("connectFurkid.php");
  $sql = "select * from vote join pet on vote.pet_no = pet.pet_no join dog on pet.dog_no = dog.dog_no order by vote.vote_count  desc LIMIT 3";
  // where mem_name=:memId
  $topThree = $pdo->prepare( $sql );
  // $topThree->bindValue(":memId", $_REQUEST["memId"]);
  $topThree->execute();
  
  if( $topThree->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "{}";
  }else{ //找得到
    //取回一筆資料
    $str = '';
    $topthreeRow = $topThree->fetchAll(PDO::FETCH_ASSOC);

     // $str.="<div>{$topthreeRow[1]["vote_img"]}</div>";
    
    $str.="<div class='col-xs-4 col-sm-4 col-md-4'>
              <div class='item item1'>            
                <div class='lollipop lollipop1'>
                  <div class='hearts hearts1'>
                    <img src='images/race_image/r_heart.png'>
                    <span data-votes='{$topthreeRow[2]["vote_count"]}' class='count count1'>0</span>
                  </div>
                  <div class='candy'>
                    <img src='images/race_image/{$topthreeRow[2]["vote_img"]}'>
                    <p class='name'>{$topthreeRow[2]["pet_name"]}</p>
                  </div>
                  <div class='stick stick1'></div>
                </div>
              </div>
            </div>
            <div class='col-xs-4 col-sm-4 col-md-4'>
              <div class='item item2'>
                
                <div class='lollipop lollipop2'>
                  <div class='hearts hearts1'>
                    <img src='images/race_image/r_heart.png'>
                    <span data-votes='{$topthreeRow[0]["vote_count"]}' class='count count2'>0</span>
                  </div>
                  <div class='candy'>
                    <img src='images/race_image/{$topthreeRow[0]["vote_img"]}'>
                    <div class='name'>
                      {$topthreeRow[0]["pet_name"]}
                    </div>
                  </div>
                  <div class='stick stick2'></div>
                </div>
              </div>      
            </div>
            <div class='col-xs-4 col-sm-4 col-md-4'>
              <div class='item item3'>
                
                <div class='lollipop lollipop3'>
                  <div class='hearts hearts1'>
                    <img src='images/race_image/r_heart.png'>
                    <span data-votes='{$topthreeRow[1]["vote_count"]}' class='count count3'>0</span>
                  </div>
                  <div class='candy'>
                    <img src='images/race_image/{$topthreeRow[1]["vote_img"]}'>
                    <div class='name'>
                      {$topthreeRow[1]["pet_name"]}
                    </div>
                  </div>
                  <div class='stick stick3'></div>
                </div>
              </div>
            </div>";

    //送出json字串
    echo ( $str );
  }	
}catch(PDOException $e){
  echo $e->getMessage();
}
?>