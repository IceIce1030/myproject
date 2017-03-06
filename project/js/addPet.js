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


// 顯示照片
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


//抓到狗品種資料
function getDogInfo() {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) { //成功，取回資料
                // console.log(xhr.responseText);
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
    // console.log(document.getElementById("dog_size").value);
    xhr.open("Post", url, true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data_info);
}

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

}



function addPetDoFirst() {
    //與HTML畫面產生關聯，再建事件聆聽的功能
    // 抓狗品種資料
    document.getElementById("dog_size").onchange = getDogInfo;
    // 上傳檔案出現圖片
    document.getElementById('upload_petImg').onchange = fileChange;
    //focus在狗狗名字
    document.getElementById("pet_name").focus();
    //送出表單時檢查表單
    document.getElementById("addPetForm").onsubmit = checkForm;
}

window.addEventListener('load', addPetDoFirst, false);
