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

function doFirst() {
    //與HTML畫面產生關聯，再建事件聆聽的功能
    document.getElementById('mem_img').onchange = fileChange;
}
window.addEventListener('load', doFirst, false);
