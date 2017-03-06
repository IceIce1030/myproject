//js
// 將帳密先存到localStorage來登入會員
$(function() {
    $('#signupBtn').on('click', function() {
        localStorage["mem_id"] = $('#mem_id').val();
        localStorage["mem_psw"] = $('#mem_psw').val();
    });

    _var_checkNumber = 0;


    $('#mem_id').on('change', function() {
        //檢查帳號
        var mem_id = document.getElementById("mem_id").value;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) { //server端順利執行完畢
                    if (xhr.responseText == "沒重複帳號") {
                        // var accountCheck = 0;
                        $('#accountRepeatDiv').css('display', 'none');
                        $('#accountRepeat').text("");
                        console.log('沒重複帳號');
                        _var_checkNumber += 1;
                        console.log(_var_checkNumber);
                        // _var_checkNumber += 1;
                    } else { //重複帳號
                        // var accountCheck = 1;
                        $('#accountRepeatDiv').css('display', 'block');
                        $('#accountRepeat').text("帳號重複，請重新輸入");
                        $('#mem_id').focus();
                        // console.log('帳號重複，請再輸入一次');
                    }
                } else {
                    alert(xhr.status);
                }
            }
        }
        var url = "memIdCheck.php";
        var data_info = "mem_id=" + mem_id;
        xhr.open("Post", url, true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(data_info);

    });

    // $('#mem_pswConfirm').on('change', function() {
    //     if ($('#mem_psw').val() != $('#mem_pswConfirm').val()) {
    //         //顯示兩次輸入的密碼不同，請再輸一次
    //         $('#pswDoAgainDiv').css('display', 'block');
    //         $('#pswDoAgain').text("兩次輸入的密碼不同，請重新輸入");
    //         $('#mem_pswConfirm').val('');
    //         $('#mem_pswConfirm').focus();

    //     } else {
    //         $('#pswDoAgainDiv').css('display', 'none');
    //         $('#pswDoAgain').text("");
    //         // var pswDoAgainDiv = $('#pswDoAgainDiv').css('display');
    //         _var_checkNumber += 1;

    //     }

    // });



    $('#mem_pswConfirm').on('change', function() {
        if ($('#mem_psw').val() == $('#mem_pswConfirm').val()) {
            $('#pswDoAgainDiv').css('display', 'none');
            $('#pswDoAgain').text("");
            _var_checkNumber += 1;
            console.log(_var_checkNumber);
        } else {
            //顯示兩次輸入的密碼不同，請再輸一次
            $('#pswDoAgainDiv').css('display', 'block');
            $('#pswDoAgain').text("兩次輸入的密碼不同，請重新輸入");
            $('#mem_pswConfirm').val('');
            $('#mem_pswConfirm').focus();
        }
    });
    // var accountRepeatDiv = $('#accountRepeatDiv').css('display');


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

// 檢查表單
function checkForm(e) {

    if (_var_checkNumber >= 2) {
        console.log('註冊資料沒問題');
    } else {
        e.preventDefault();
          console.log('註冊資料有問題');
    }

}


function signupDoFirst() {
    //與HTML畫面產生關聯，再建事件聆聽的功能
    document.getElementById('upload_mem_img').onchange = fileChange;

    //focus在姓名
    document.getElementById("mem_name").focus();
    //送出表單時檢查表單
    document.getElementById("signupForm").onsubmit = checkForm;

    // document.getElementById("signupBtn").onclick = checkForm;
}

window.addEventListener('load', signupDoFirst, false);
