<?php
try{
  require_once("connectFurkid.php");
  $sql = "select * from vote a join pet b on a.pet_no = b.pet_no join dog c on b.dog_no = c.dog_no where b.mem_no=:mem_no ORDER by vote_date DESC";
  $vote = $pdo->prepare( $sql );
  $vote->bindValue(":mem_no", $_REQUEST["mem_no"]);
  $vote->execute();
  $str='';
  if( $vote->rowCount() == 0 ){ //找不到
    
    $str="<div class='reminder' id='raceReminder'>
    <div class='txt'>
        <h4>快來幫你可愛的毛小孩報名萌主爭霸贏得大獎～</h4>
        <div class='btnDiv'>
            <a class='btnFunction' href='compete_register.html'>報名參賽</a>
        </div>
    </div>
</div>";
  }
  else{ //找得到取回資料
  	 while ( $voteRow = $vote->fetch()){ 

     // 抓到性別
   if($voteRow["pet_sex"] =="m"){
          $sex = "男生";
        }else{
          $sex = "女生";
        };

          $str.="
          <a href='race.html#openLightbox{$voteRow["vote_no"]}'><div class='cardWrap col-xs-12 col-sm-4 col-md-3 element-item transition big'>
              <div class='card card{$voteRow["vote_no"]}'>
                <div id='openLightbox{$voteRow["vote_no"]}' class='openLightbox' value='{$voteRow["vote_no"]}'>
                  <img src='images/race_image/{$voteRow["vote_img"]}'>
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
                      <button class='favorite' value='{$voteRow["vote_no"]}'>       
                          <i class='fa fa-heart outsideheart' aria-hidden='true'></i>
                      </button>
                    </div>                    
                  </div>
                </div>
              </div>
            </div></a>";

      }//while         
     }//else
     echo $str;
}catch(PDOException $ex){
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>