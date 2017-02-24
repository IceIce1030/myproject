function doFirst() {
    //上傳照片---------------------
    document.getElementById('mem_img').onchange = fileChange;

}
//顯示上傳照片---------------------
function fileChange() {
    var file = document.getElementById('mem_img').files[0];

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
window.addEventListener('load', doFirst, false);



$(document).ready(function() {
    //click更新個人資料
    $('#updateInfo').click(function() {
        //顯示更新資料按鈕
        $('#confirmUpdate').removeClass('hideItem');
        //顯示選擇檔案按鈕
        $('#mem_img').removeClass('hideItem');
        //隱藏更新個人資料連結
        $('#updateInfo').addClass('hideItem');
        $('#updateInfo').css("display", "none");
        //隱藏變更密碼連結
        $('#changepsw').addClass('hideItem');
        $('#changepsw').css("display", "none");
        //input的class從showInfo變成editInfo
        $('.showInfo').removeClass().addClass('editInfo');
        //表格的底線拿掉
         $('.formGroup').css('border-bottom', 'none');
         //性別變成radio
         $('#genderValue').hide();
         $('#genderInput').show();

    });

    //tab變選到active，上背景色

    $('.tab').click(function(e) {
        $('.tab').removeClass('active');
        $(this).addClass('active');

        //tab選到下方出現相對應內容tabContent
        var tabContentId = $(this).attr('data-tab-id');
        console.log(tabContentId);
        // window.alert();
        $('.tabContent').addClass('hideItem');
        $(tabContentId).removeClass('hideItem');

    });



});
