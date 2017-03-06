<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=0, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>註冊帳號</title>
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="stylesheet" type="text/css" href="libs/font-awesome/css/font-awesome.min.css">
    <script type="text/javascript" src="libs/jquery/dist/jquery.min.js"></script>
</head>
<body>
  
<?php 

try{
  require_once("connectFurkid.php");
 $sql="insert into member(mem_name, mem_sex, mem_id, mem_psw, mem_phone, mem_mail, mem_img) values(:mem_name, :mem_sex, :mem_id, :mem_psw, :mem_phone, :mem_mail, :mem_img)";
  $member = $pdo->prepare($sql);
  $member->bindValue(":mem_name", $_REQUEST["mem_name"]);
  $member->bindValue(":mem_sex", $_REQUEST["mem_sex"]);
  $member->bindValue(":mem_id", $_REQUEST["mem_id"]);
  $member->bindValue(":mem_psw", $_REQUEST["mem_psw"]);
  $member->bindValue(":mem_phone", $_REQUEST["mem_phone"]);
  $member->bindValue(":mem_mail", $_REQUEST["mem_mail"]);
  //建立檔案名稱


if($_FILES["mem_img"]["tmp_name"] != NULL){
  //如果有上傳照片
switch( $_FILES["mem_img"]["error"]){
  case 0:
    $from = $_FILES["mem_img"]["tmp_name"];
    //檢查資料夾或檔案是否存在
    if( file_exists("images/member")==false){ //不存在
      //發生錯誤
          echo("上傳檔案出現錯誤，請聯絡");
    }
      //原始檔名(utf-8)
      //要改檔名名嗎？
        $fileName = $_FILES["mem_img"]["name"];

        //設定好資料夾,並轉碼為big5
    $to = "images/member/". mb_convert_encoding($fileName, "Big5","UTF-8");
    
    if(copy( $from, $to) ){
      //change
      
    }else{
      //回到註冊頁
      header("Location:signup.html");
    }
    break;
  case 1:
      echo "檔案不得超過", ini_get("upload_max_filesize") ,"<br>";
    break;
  case 2:
    echo "檔案不得超過", $_REQUEST["MAX_FILE_SIZE"] ,"<br>";
    break;
  case 3:
    echo "上傳檔案不完整<br>";
    break;
  case 4:
      echo "檔案没送<br>";
       break;
  default : 
      echo "上傳照片錯誤代碼:" , $_FILES["mem_img"]["error"],"請通知我們<br>";
       break;
     }//switch

  $member->bindValue(":mem_img", $fileName);
}else{
 $member->bindValue(":mem_img", $_REQUEST["default_mem_img"]);
}
  $member->execute();
}catch(PDOException $ex){
  header("Location:signup.html");
  echo "資料庫操作失敗，原因 : " , $ex->getMessage() , "<br>";
  echo "行號 : " , $ex->getLine() , "<br>";
}
?>



<script type="text/javascript">

//帶入會員資料
function showMember(jsonStr) {
    //將字串轉為物件
    var member = JSON.parse(jsonStr);

    //將會員編號、帳號、照片、名字存到localstorage
    localStorage["mem_no"] = member.mem_no;
    localStorage["mem_id"] = member.mem_id;
    localStorage["mem_img"] = member.mem_img;
    localStorage["mem_name"] = member.mem_name;
    // 清除localstorage會員密碼
    localStorage.removeItem("mem_psw");
     //跳轉到新增寵物頁
    document.location.href="addPetInfo.html";
}


// 會員登入
function signupMemberlogin() {
    var mem_id = localStorage["mem_id"];
    var mem_psw = localStorage["mem_psw"];

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) { //server端順利執行完畢
                if (xhr.responseText == "Fail") { //錯誤
                    //顯示 錯誤 訊息
                    console.log('註冊會員後登入失敗');
                    document.location.href="signup.html";
                } else { //登入成功
                    //帶入抓到的資料啟動showMember function
                    showMember(xhr.responseText);
                    // 將選單上登入的div隱藏起來
                    document.getElementById("beforeLogin").style.display = "none";
                    // 顯示選單上會員頭像和名字的div
                    document.getElementById("afterLogin").style.display = "block";
                    // //會員登入燈箱回原位（往右滑）
                    // $(".loginlightbox").animate({
                    //     "right": "-800px"
                    // }, "1s");

                }
            } else {
                alert(xhr.status);
            }
        }
    }

    var url = "memLogin.php";
    var data_info = "mem_id=" + mem_id + "&mem_psw=" + mem_psw;
    // console.log("data info : ", data_info);
    xhr.open("Post", url, true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data_info);
}


function aftersignupDoFirst() {
    signupMemberlogin();
   
}; //window.onload

window.addEventListener('load', aftersignupDoFirst, false);
</script>

</body>
</html>




