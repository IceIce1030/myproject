$(document).ready(function() {

    //手機漢堡選單
    $('#hamburgerMenu').on('click', function() {
        $('#hamburgerMenuBar').toggleClass('animate');
        $("#menuContent").stop(true, false).slideToggle("slow");

    })

    //login燈箱
    $("#beforeLogin").click(function() {

        if ($(".loginlightbox").css('right') == "-800px") {
            //燈箱出現
            $(".loginlightbox").animate({
                "right": "0px"
            }, "fast");
            // focus會員帳號
            $("#login_mem_id").focus();
        } else {
            //燈箱往右滑回去
            $(".loginlightbox").animate({
                "right": "-800px"
            }, "1s");
            //清掉帳密錯誤的訊息
            $("#wrongData").text('');
        }
    });

    $("#closeLightBox").click(function() {
        $(".loginlightbox").animate({
            "right": "-800px"
        }, "1s");
        //清掉帳密錯誤的訊息
        $("#wrongData").text('');
    });

    //會員中心選單燈箱
    $("#nav_mem_img").click(function() {

        if ($(".memberlightbox").css('right') == "-800px") {
            $(".memberlightbox").animate({
                "right": "0px"
            }, "fast");
        } else {
            $(".memberlightbox").animate({
                "right": "-800px"
            }, "1s");
        }
    });

    $("#closeMemberLightBox").click(function() {
        $(".memberlightbox").animate({
            "right": "-800px"
        }, "1s");
    });


});


//登出
function memberlogout() {
    // 顯示選單上登入的div
    document.getElementById("beforeLogin").style.display = "block";
    // 將選單上會員頭像和名字的div隱藏起來
    document.getElementById("afterLogin").style.display = "none";
    //會員登入燈箱回原位（往右滑）
    $(".memberlightbox").animate({
        "right": "-800px"
    }, "1s");
    // 清除localstorage會員資料
    localStorage.removeItem("mem_no");
    localStorage.removeItem("mem_id");
    localStorage.removeItem("mem_img");
    localStorage.removeItem("mem_name");
}


//帶入會員資料
function showMember(jsonStr) {
    //將字串轉為物件
    var member = JSON.parse(jsonStr);

    //將會員編號、帳號、照片、名字存到localstorage
    localStorage["mem_no"] = member.mem_no;
    localStorage["mem_id"] = member.mem_id;
    localStorage["mem_img"] = member.mem_img;
    localStorage["mem_name"] = member.mem_name;

    //登入bar面版上 mem_name 的字改成會員名字 換成會員照片
    document.getElementById("nav_mem_name").innerText = localStorage["mem_name"];
    document.getElementById("nav_mem_img").src = "images/member/" + localStorage["mem_img"];
}


//帳密錯誤
function wrongLoginData() {
    //將登入表單上的資料清空
    document.getElementById("login_mem_id").value = "";
    document.getElementById("login_mem_psw").value = "";
    // focus會員帳號
    document.getElementById("login_mem_id").focus();
    //顯示 帳密錯誤 訊息
    document.getElementById("wrongData").innerText = "密碼錯誤，請再試一次";
}


// 會員登入
function memberlogin() {
    console.log('memberlogin');
    //帳號 song , 密碼111111
    var mem_id = document.getElementById("login_mem_id").value;
    var mem_psw = document.getElementById("login_mem_psw").value;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) { //server端順利執行完畢
                if (xhr.responseText == "Fail") { //帳密錯誤
                    //顯示 帳密錯誤 訊息
                    wrongLoginData();

                } else { //登入成功
                    //帶入抓到的資料啟動showMember function
                    showMember(xhr.responseText);
                    //將登入表單上的資料清空
                    document.getElementById("login_mem_id").value = "";
                    document.getElementById("login_mem_psw").value = "";
                    //清除帳密錯誤 訊息
                    document.getElementById("wrongData").innerText = "";
                    // 將選單上登入的div隱藏起來
                    document.getElementById("beforeLogin").style.display = "none";
                    // 顯示選單上會員頭像和名字的div
                    document.getElementById("afterLogin").style.display = "block";
                    //會員登入燈箱回原位（往右滑）
                    $(".loginlightbox").animate({
                        "right": "-800px"
                    }, "1s");

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

// 用體驗帳號登入
function guestlogin() {
    document.getElementById("login_mem_id").value = "guest";
    document.getElementById("login_mem_psw").value = "123456";
    memberlogin();
}


function navDoFirst() {
    // console.log('navDoFirst');
    //===loginBtn.onclick 事件處理程序是 memberlogin
    document.getElementById("loginBtn").onclick = memberlogin;
    //===登出事件處理程序是 memberlogout
    var logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', memberlogout, false);
    //===用體驗帳號登入事件處理程序是 guestlogin
    document.getElementById("guestLoginBtn").onclick = guestlogin;

    //===檢查會員有沒有登入，有登入的話
    if (localStorage["mem_name"] != null) {
        // 將選單上登入的div隱藏起來
        document.getElementById("beforeLogin").style.display = "none";
        // 顯示選單上會員頭像和名字的div
        document.getElementById("afterLogin").style.display = "block";
        //顯示會員頭像和名字
        document.getElementById("nav_mem_name").innerText = localStorage["mem_name"];
        document.getElementById("nav_mem_img").src = "images/member/" + localStorage["mem_img"];
    }


} //window.onload

window.addEventListener('load', navDoFirst, false);
