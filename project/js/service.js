$(document).ready(function() {

    if (localStorage['var_data_room_no'] != null) {
        var_data_room_no = localStorage['var_data_room_no'];
        $('.roomTab').removeClass('active');
        var var_roomTab = '.roomTab' + var_data_room_no;
        console.log(var_roomTab);
        $(var_roomTab).addClass('active');

    } else {
        //全域變數
        var_data_room_no = 1;
    }

    getRoomType();
    getRoomImg();
    //roomtype

    //tab變選到active，上背景色
    $('.roomTab').click(function() {
        $('.roomTab').removeClass('active');
        $(this).addClass('active');
        localStorage.removeItem("var_data_room_no");

        // 帶入房型資料
        var_data_room_no = $(this).attr('data-room_no');
        console.log(var_data_room_no);
        getRoomType();
        getRoomImg();

        //tab選到下方出現相對應內容
        var roomTypeName = $('.active .txt p').text();
        $('#roomTypeName').text(roomTypeName);

    });

    //tweenmax
    //毛基地特色
    var controller = new ScrollMagic.Controller();
    var wp = new TimelineMax().staggerFromTo(".section_02 .itemDiv", 1, {
        y: -50,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        yoyo: false,
        //rotation: 360
    }, 0.2);

    var scene = new ScrollMagic.Scene({
        triggerElement: "#trigger_02",
        reverse: false,
        offset: '50px',
    })

    .setTween(wp)
        // .addIndicators() // add indicators (requires plugin)
        .addTo(controller);
    //////--------

    // roomType
    var controller = new ScrollMagic.Controller();
    var wp = new TimelineMax().staggerFromTo(".roomType .itemDiv", 2, {
        // y: 0,
        opacity: 0
    }, {
        // y: 0,
        opacity: 1,
        yoyo: false,
        //rotation: 360
    }, 0.15);

    var scene = new ScrollMagic.Scene({
        triggerElement: "#trigger_03",
        reverse: false,
        offset: '50px',
    })

    .setTween(wp)
        // .addIndicators() // add indicators (requires plugin)
        .addTo(controller);
    //////--------


    // serviceType
    var controller = new ScrollMagic.Controller();
    var wp = new TimelineMax().staggerFromTo("#trigger_04 .itemDiv", 3, {
        y: -50,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        yoyo: false
    }, 0.2);

    var scene = new ScrollMagic.Scene({
        triggerElement: "#trigger_04",
        reverse: false,
        offset: '50px',
    })

    .setTween(wp)
        // .addIndicators() // add indicators (requires plugin)
        .addTo(controller);
    //////--------

    // 連接到其他頁
    var controller = new ScrollMagic.Controller();
    var wp = new TimelineMax().staggerFromTo("#trigger_05 .txt", 0.5, {
        y: 0,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        yoyo: false
    }, 0.2);

    var scene = new ScrollMagic.Scene({
        triggerElement: "#trigger_05",
        reverse: false,
        offset: '-80px',
    })

    .setTween(wp)
        // .addIndicators() // add indicators (requires plugin)
        .addTo(controller);
    //////--------

    //----go to---
    $("#gotop").click(function() {
        jQuery("html,body").animate({
            scrollTop: 0
        }, 1000);
    });
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#gotop').fadeIn("fast");
        } else {
            $('#gotop').stop().fadeOut("fast");
        }
    });

});


function showRoomInfo(jsonStr) {
    //將字串轉為物件
    var room = JSON.parse(jsonStr);
    //
    document.getElementById("roomTypeIntro").innerText = room.room_intro;
    document.getElementById("roomPrice").innerText = room.room_price;
    document.getElementById("roomTypeName").innerText = room.room_name;
}


function getRoomType() {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) { //server端順利執行完畢
                if (xhr.responseText == "Fail") { //
                    //顯示 錯誤 訊息
                    console.log('沒有抓到房型資料');

                } else { //登入成功
                    //帶入抓到的資料啟動 showRoomInfo function
                    showRoomInfo(xhr.responseText);
                }
            } else {
                alert(xhr.status);
            }
        }
    }

    var url = "service_getRoomType.php";
    var data_info = "room_no=" + var_data_room_no;
    xhr.open("Post", url, true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data_info);
}


function getRoomImg() {
    $("#roomPhotoSlider").removeClass("slick-initialized slick-slider");

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) { //server端順利執行完畢
                if (xhr.responseText == "Fail") { //
                    //顯示 錯誤 訊息
                    console.log('沒有抓到房型照片');

                } else { //成功
                    // //帶入抓到的資料啟動 showRoomInfo function
                    // showRoomInfo(xhr.responseText);
                    console.log('抓到房型照片');
                    document.getElementById('roomPhotoSlider').innerHTML = xhr.responseText;
                    //slider
                    $('#roomPhotoSlider').slick({
                        dots: false,
                        infinite: true,
                        speed: 1700,
                        fade: true,
                        cssEase: 'ease',

                    });
                }
            } else {
                alert(xhr.status);
            }
        }
    }

    var url = "service_getRoomImg.php";
    var data_info = "room_no=" + var_data_room_no;
    xhr.open("Post", url, true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data_info);
}
