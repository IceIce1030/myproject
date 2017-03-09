<?php
try{
  require_once("connectFurkid.php");

  $sql = "select * from vote join pet on vote.pet_no = pet.pet_no join dog on pet.dog_no = dog.dog_no";
  $vote = $pdo->prepare( $sql );
  // $room->bindValue(":room_no", $_REQUEST["roomstyle"]);
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
        if($voteRow["pet_sex"] =="m"){
          $sex = "男生";
         
        }else{
          $sex = "女生";
          
        };

          $str.="<div class='cardWrap col-xs-12 col-sm-4 col-md-3 element-item transition big'>
              <div class='card'>
                <div id='openLightbox{$voteRow["pet_no"]}' class='openLightbox'>
                  <img src='race_image/{$voteRow["vote_img"]}'>
                </div>
                <div class='text'>
                  <div class='textTop'>
                    <p class='number'>No.&nbsp{$voteRow["pet_no"]}</p>
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
                      <button class='favorite'>       
                          <i class='fa fa-heart outsideheart' aria-hidden='true'>
                            <i class='fa fa-heart insideheart' aria-hidden='true'></i>
                          </i>
                      </button>
                    </div>                    
                  </div>
                </div>
                <div class='messageBorad'>
                  <section class='post'>
                  </section>
                  <input type='text' class='msg dropzone'>
                  <button class='add_table' type='submit'>submit</button>
                </div>
              </div>
            </div>";
        }  
    }
          
    //送出json字串
    echo ( $str);//陣列編碼成json字串，回傳到前端

  	
}catch(PDOException $e){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>