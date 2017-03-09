//jquery
$(document).ready(function() {
    // 將pet編號放入表單隱藏欄位
    // $('#addPetBtn').attr('disabled', 'disabled');

    //     $("#upload_voteImg").click(function() {
    //          $('#addPetBtn').removeAttr('disabled');
                        
    //     });
    // $("#addPetBtn").click(function(){
    //     // var qq =$("#voteImg").attr("src");
    //     // alert(qq);       
    //     if($("#voteImg").attr("src") == ""){
            
    //     }else{
    //        alert($("#voteImg").attr("src"));
    //         // document.formRace.submit();
    //     }
    // })

    // function submitTest() {
    //     alert("123");
        // if($("#voteImg").attr("src") == ""){
        //     alert("你尚未上傳照片");
        //     return false;
        // }else{
        //     return true; 
        //     alert("123");   
        // }
    // };
    

    if(localStorage.compete_pet_no){
      var pet_no = (localStorage.compete_pet_no);
        $('#pet_no').val(pet_no); 
     localStorage.removeItem('compete_pet_no');
    }else{
        getMemLatestPet();
    };



}); 


// 檢查表單
function checkForm(e) {


    var upload_voteImg = document.getElementById("upload_voteImg");

    //檢查體型一定要選
    if (upload_voteImg.value == "") {
        alert('請上傳照片唷~');
        e.preventDefault();
        return;
    } 

}



// 上傳照片
function fileChange() {

    var file = document.getElementById('upload_voteImg').files[0];
    console.log(file.type);
    var vote_img = file.name;
    console.log(vote_img);

    // 以後補上檢查只能是圖檔才能上傳  
    // var message = 'File Name:' +file.name + '\n';
    // message += 'File Type: '+file.type + '\n';
    // message += 'File Size: '+file.size + '\n';
    // message += 'Last Modified: '+file.lastModifiedDate.toDateString() + '\n';
    // document.getElementById('fileInfo').value = message;

    var readFile = new FileReader();
    readFile.readAsDataURL(file);
    readFile.addEventListener('load', function() {
        var image = document.getElementById('voteImg');
        image.src = readFile.result;
    }, false);

}
      
function addPetDoFirst() {
    //與HTML畫面產生關聯，再建事件聆聽的功能

    // 上傳檔案出現圖片
    document.getElementById('upload_voteImg').onchange = fileChange;
    // // ===addPetBtn.onclick 事件處理程序是 addPet

    //送出表單時檢查表單
    document.getElementById("formRace").onsubmit = checkForm;
}

window.addEventListener('load', addPetDoFirst, false);

//抓到會員最新一筆寵物編號
function getMemLatestPet() {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) { //成功，取回資料
                console.log(xhr.responseText);
                $('#pet_no').val(xhr.responseText);        
            } else {
                alert(xhr.status);
            }
        }
    }

    var url = "compete_getMemLatestPet.php";
    var mem_no = localStorage["mem_no"];
    var data_info = "mem_no=" + mem_no;
    xhr.open("Post", url, true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data_info);
};
