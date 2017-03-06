//jquery
$(document).ready(function() {
    // -------select外掛
    $('select').niceSelect();
    $("#dog_size").change(function() {
        $('select').niceSelect('update');
    });
    getMemPets();
    var mem_no = localStorage["mem_no"];
    $('#mem_no').val(mem_no);

    //===檢查會員有沒有登入，沒有登入的話
    if (localStorage["mem_no"] == null) {
        //燈箱出現
        $(".loginlightbox").animate({
            "right": "0px"
        }, "0.5s");
        // focus會員帳號
        $("#login_mem_id").focus();
    }

    // 登入觸發事件？以後勒？
    $("#loginBtn").click(function() {
        // location.reload();
        getMemPets();
        // if (localStorage["mem_no"] != null) {
        //     $('#addPetBtn').removeAttr('disabled');
        // }

    });

    // $("#logoutBtn").click(function() {
    //     // $('#addPetBtn').attr('disabled', 'disabled');
    //     location.reload();
    // });

});



// 上傳照片
function fileChange() {

    var file = document.getElementById('upload_petImg').files[0];
    console.log(file.type);
    var pet_img = file.name;
    console.log(pet_img);

    // 以後補上檢查只能是圖檔才能上傳  
    // var message = 'File Name:' +file.name + '\n';
    // message += 'File Type: '+file.type + '\n';
    // message += 'File Size: '+file.size + '\n';
    // message += 'Last Modified: '+file.lastModifiedDate.toDateString() + '\n';
    // document.getElementById('fileInfo').value = message;

    var readFile = new FileReader();
    readFile.readAsDataURL(file);
    readFile.addEventListener('load', function() {
        var image = document.getElementById('petImg');
        image.src = readFile.result;
    }, false);

}

// //註冊帳號
// function addPet() {

//抓到資料
// var mem_no = localStorage["mem_no"];
// var pet_name = document.getElementById("pet_name").value;
// var pet_age = document.getElementById("pet_age").value;


// $("#dog_no_select").change(function() {
//     var dog_no = $('#dog_no_select option:selected').val();
// }).trigger("change");


// $("#pet_personality_select").change(function() {
//     var pet_personality = $('#pet_personality_select option:selected').val();
// }).trigger("change");


// $(".pet_sex").on("click", function() {
//     var pet_sex = $(".pet_sex:checked").val();
//     // console.log(pet_sex);
// });

// var xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function() {
//     if (xhr.readyState == 4) {
//         if (xhr.status == 200) { //server端順利執行完畢
//             console.log(xhr.responseText);
//             if (xhr.responseText == "Fail") { //錯誤
//                 //顯示 訊息
//                 console.log('新增寵物資料發生錯誤');

//             } else { //登入成功
//                 //跳轉到會員專區
//                 window.location = 'member.html';
//             }
//         } else {
//             alert(xhr.status);
//         }
//     }
// }

// var url = "addPet.php";
// //改
// var data_info = "mem_no=" + mem_no + "&pet_name=" + pet_name + "&pet_age=" + pet_age + "&dog_no=" + dog_no + "&pet_personality=" + pet_personality + "&pet_sex=" + pet_sex + "&pet_img=" + pet_img;
// console.log("data info : ", data_info);
// xhr.open("Post", url, true);
// xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
// xhr.send(data_info);
// }

// 檢查表單
function checkForm(e) {

    var pet_personality = document.getElementById("pet_personality_select");
    var dog_size = document.getElementById("dog_size");

    //檢查體型一定要選
    if (dog_size.selectedIndex == 0) {
        $('#chooseSize').text("請選擇體型");
        $('#chooseSizeDiv').css('display', 'block');
        e.preventDefault();
        return;
    } else {
        $('#chooseSize').text("");
        $('#chooseSizeDiv').css('display', 'none');
    }

    //檢查個性一定要選
    if (pet_personality.selectedIndex == 0) {
        $('#chooseP').text("請選擇個性");
        $('#choosePDiv').css('display', 'block');
        e.preventDefault();
        return;
    } else {
        $('#chooseP').text("");
        $('#choosePDiv').css('display', 'none');
    }

    //檢查照片要有
    // if ($('#upload_petImg').val() == null) {
    //     $('#chooseImg').text("請上傳照片");
    //     $('#chooseImgDiv').css('display', 'block');
    //     e.preventDefault();
    //     return;
    // } else {
    //     $('#chooseImg').text("");
    //     $('#chooseImgDiv').css('display', 'none');
    // }
    //===檢查會員有沒有登入，有登入的話
    if (localStorage["mem_no"] == null) {
        e.preventDefault();
        //燈箱出現
        $(".loginlightbox").animate({
            "right": "0px"
        }, "0.5s");
        // focus會員帳號
        $("#login_mem_id").focus();
        return;
    }

}


//抓到狗品種資料
function getDogInfo() {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) { //成功，取回資料
                console.log(xhr.responseText);
                document.getElementById("dog_no_select").innerHTML = xhr.responseText;
                $('select').niceSelect('update');
            } else {
                alert(xhr.status);
            }
        }
    }

    var url = "getDogInfo.php";
    //體型
    var data_info = "dog_size=" + document.getElementById("dog_size").value;
    console.log(document.getElementById("dog_size").value);
    xhr.open("Post", url, true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data_info);
}


//抓到會員所有寵物編號
function getMemPets() {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) { //成功，取回資料
                // console.log(xhr.responseText);
                if (xhr.responseText == "no pet") { //沒寵物
                    //顯示 訊息
                    console.log("沒有寵物資料");
                    document.getElementById('petListDiv').innerHTML = "<span class='noPetYet'>你還沒有在毛基地建立寵物資料唷</span>";
                } else {
                    document.getElementById('petListDiv').innerHTML = xhr.responseText;
                }
                // 取得參賽寵物的寵物編號
                $('.competeBtn').click(function() {
                    var compete_pet_no = $(this).attr('data-pet_no');
                    console.log(compete_pet_no);
                    localStorage.setItem('compete_pet_no', compete_pet_no);
                }); // 取得參賽寵物的寵物編號

            } else {
                alert(xhr.status);
            }
        }
    }

    var url = "compete_getMemPets.php";
    var mem_no = localStorage["mem_no"];
    var data_info = "mem_no=" + mem_no;
    xhr.open("Post", url, true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data_info);
}

function competeDoFirst() {
    //與HTML畫面產生關聯，再建事件聆聽的功能
    // 抓狗品種資料
    document.getElementById("dog_size").onchange = getDogInfo;
    // 上傳檔案出現圖片
    document.getElementById('upload_petImg').onchange = fileChange;
    //送出表單時檢查表單
    document.getElementById("addPetForm").onsubmit = checkForm;

}

window.addEventListener('load', competeDoFirst, false);
