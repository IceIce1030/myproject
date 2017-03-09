<?php
try{
  require_once("connectFurkid.php");

  // $sql = "select * from room where room_no=:room_no";



  $sortStyle =  $_REQUEST["sortStyle"];

  $orderField = "a." . $sortStyle;

  $filterStyle  =  $_REQUEST["filterStyle"];

  if($filterStyle =="'all'"){

      $filterStyle = "'大型犬' or c.dog_size = '中型犬' or c.dog_size = '小型犬'";
      // echo ($filterStyle);
  }else{
      $filterStyle  =  $_REQUEST["filterStyle"];
  };

  $filterField = "where c.dog_size=" . $filterStyle;

// echo ($filterStyle);

  // select * from vote join pet on vote.pet_no = pet.pet_no join dog on pet.dog_no = dog.dog_no where dog.dog_size = '大型犬' order by vote.vote_count  desc LIMIT 5

  // $sql = "select * from vote join pet on vote.pet_no = pet.pet_no join dog on pet.dog_no = dog.dog_no where dog.dog_size = '大型犬' order by vote.vote_count desc";
  $sql = "select a.vote_no, a.pet_no,a.vote_img, a.vote_date, a.vote_intro, a.vote_count, b.pet_no, b.mem_no, b.dog_no, b.pet_name,b.pet_sex, b.pet_age, b.pet_personality, b.pet_img, c.dog_no, c.dog_name, c.dog_size, c.dog_img, MAX( d.votemsg_date ) , d.votemsg_content, d.mem_no, e.mem_name
from vote a
join pet b on a.pet_no = b.pet_no
join dog c on b.dog_no = c.dog_no
left join votemsg d ON a.vote_no = d.vote_no
LEFT JOIN member e ON e.mem_no = d.mem_no
$filterField
group by a.vote_no
order by $orderField ";

  // $sql = "select * from vote join pet on vote.pet_no = pet.pet_no join dog on pet.dog_no = dog.dog_no order by $orderField";
  $vote = $pdo->prepare( $sql );
  // $room->bindValue(":vote_count", $_REQUEST["roomstyle"]);
  $vote->execute();
 

  
  if( $vote->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "{}";
  }
  else{ //找得到
     //取回一筆資料
    // $dogRow = $dog->fetch(PDO::FETCH_ASSOC);

  		$str='';

   	while ( $voteRow = $vote->fetch() ){ 
       // lastestMsg sql抓以每一筆vote_no去抓最新留言 
      $sql ="select * from votemsg join member on votemsg.mem_no = member.mem_no where vote_no = {$voteRow["vote_no"]} order by votemsg_date desc limit 1";
      $latestMsg = $pdo->prepare( $sql );
      $latestMsg->execute();
      $latestMsgRow = $latestMsg->fetch(); 

      if( $latestMsg->rowCount() == 0 ){ //找不到
        // 若無留言
        if($voteRow["pet_sex"] =="m"){
          $sex = "男生";
         
        }else{
          $sex = "女生";
          
        };
          // 若無留言 則回傳快來幫我留言
          $str.="<div class='cardWrap col-xs-12 col-sm-4 col-md-3 element-item transition big' value='{$voteRow["vote_no"]}'>
              <div class='card card{$voteRow["vote_no"]}'>
                <div id='openLightbox{$voteRow["vote_no"]}' class='openLightbox cardImgbox' value='{$voteRow["vote_no"]}'>
                  <img class='cardVoteImg' src='images/race_image/{$voteRow["vote_img"]}'>
                  <span class='infoIcon'><img src='images/race_image/pawIcon.png'>Info</span>
                </div>
                <div class='text'>
                  <div class='textTop'>
                    <p class='number'>No.&nbsp{$voteRow["vote_no"]}</p>
                    <p class='name'>{$voteRow["pet_name"]}</p>
                  </div>
                  <div class='textDown'>
                    <div class='size'>
                      <span>體型:</span>
                      <span>{$voteRow["dog_size"]}</span>
                    </div>
                    <div class='personality'>
                      <span>個性:</span>
                      <span>{$voteRow["pet_personality"]}</span>
                    </div>
                    <div class='sex'>
                      <span>性別:</span>
                      <span>$sex</span>
                    </div>
                    <div class='like'>
                      <p class='votes'>{$voteRow["vote_count"]}</p>
                      <button class='favorite' value='{$voteRow["vote_no"]}'>       
                          <i class='fa fa-heart outsideheart' aria-hidden='true'>
                            <i class='fa fa-heart insideheart' aria-hidden='true'></i>
                          </i>
                          <div class='wordsVote'>vote</div>
                      </button>
                    </div>                    
                  </div>
                </div>
                <div class='messageBorad openLightbox' id='openLightbox{$voteRow["vote_no"]}'>
                  <section class='post' id='post{$voteRow["vote_no"]}'>
                    <span></span>
                    <span id='lastestMsg'>~快來幫我留言~</span>
                  </section>                
                </div>
              </div>
            </div>";

      }
      else{
     

        if($voteRow["pet_sex"] =="m"){
          $sex = "男生";
         
        }else{
          $sex = "女生";
          
        };

          $str.="<div class='cardWrap col-xs-12 col-sm-4 col-md-3 element-item transition big' value='{$voteRow["vote_no"]}'>
              <div class='card card{$voteRow["vote_no"]}'>
                <div id='openLightbox{$voteRow["vote_no"]}' class='openLightbox cardImgbox' value='{$voteRow["vote_no"]}'>
                  <img class='cardVoteImg' src='images/race_image/{$voteRow["vote_img"]}'>
                  <span class='infoIcon'><img src='images/race_image/pawIcon.png'>Info</span>
                </div>
                <div class='text'>
                  <div class='textTop'>
                    <p class='number'>No.&nbsp{$voteRow["vote_no"]}</p>
                    <p class='name'>{$voteRow["pet_name"]}</p>
                  </div>
                  <div class='textDown'>
                    <div class='size'>
                      <span>體型:</span>
                      <span>{$voteRow["dog_size"]}</span>
                    </div>
                    <div class='personality'>
                      <span>個性:</span>
                      <span>{$voteRow["pet_personality"]}</span>
                    </div>
                    <div class='sex'>
                      <span>性別:</span>
                      <span>$sex</span>
                    </div>
                    <div class='like'>
                      <p class='votes'>{$voteRow["vote_count"]}</p>
                      <button class='favorite' value='{$voteRow["vote_no"]}'>       
                          <i class='fa fa-heart outsideheart' aria-hidden='true'>
                            <i class='fa fa-heart insideheart' aria-hidden='true'></i>
                          </i>
                          <div class='wordsVote'>vote</div>
                      </button>
                    </div>                    
                  </div>
                </div>
                <div class='messageBorad openLightbox' id='openLightbox{$voteRow["vote_no"]}'>
                  <section class='post' id='post{$voteRow["vote_no"]}'>
                    <span>{$latestMsgRow["mem_name"]}:&nbsp</span>
                    <span id='lastestMsg'>{$latestMsgRow["votemsg_content"]}</span>
                  </section>                
                </div>
              </div>
            </div>";
            }    
        }  
    }
          
    //送出json字串
    // echo json_encode( $str);//陣列編碼成json字串，回傳到前端
   echo $str;
  	
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>