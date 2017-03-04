//jquery
$(document).ready(function() {
    // -------select外掛
    $('select').niceSelect();
    $("#dog_size").change(function() {
        $('select').niceSelect('update');
    });

     var mem_no = localStorage["mem_no"];
     $('#mem_no').val(mem_no);
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



function addPetDoFirst() {
    //與HTML畫面產生關聯，再建事件聆聽的功能
    // 抓狗品種資料
    document.getElementById("dog_size").onchange = getDogInfo;
    // 上傳檔案出現圖片
    document.getElementById('upload_petImg').onchange = fileChange;
    // // ===addPetBtn.onclick 事件處理程序是 addPet
    // document.getElementById("addPetBtn").onclick = addPet;
    //focus在狗狗名字
    document.getElementById("pet_name").focus();
}

window.addEventListener('load', addPetDoFirst, false);
