//js
// 將帳密先存到localStorage來登入會員
$(function() {
    $('#signupBtn').on('click', function() {
        localStorage["mem_id"] = $('#mem_id').val();
        localStorage["mem_psw"] = $('#mem_psw').val();
    });
});

//上傳照片
function fileChange() {

    var file = document.getElementById('upload_mem_img').files[0];
    console.log(file.type);

    // 以後補上檢查只能是圖檔才能上傳  
    // var message = 'File Name:' +file.name + '\n';
    // message += 'File Type: '+file.type + '\n';
    // message += 'File Size: '+file.size + '\n';
    // message += 'Last Modified: '+file.lastModifiedDate.toDateString() + '\n';
    // document.getElementById('fileInfo').value = message;

    var readFile = new FileReader();
    readFile.readAsDataURL(file);
    readFile.addEventListener('load', function() {
        var image = document.getElementById('profilePhoto');
        image.src = readFile.result;
    }, false);

}

function signupDoFirst() {
    //與HTML畫面產生關聯，再建事件聆聽的功能
    document.getElementById('upload_mem_img').onchange = fileChange;

    //focus在姓名
    document.getElementById("mem_name").focus();
}

window.addEventListener('load', signupDoFirst, false);
