$(document).ready(function() {
    // -------select外掛
    $('select').niceSelect();
    $("#dog_size").change(function() {
        $('select').niceSelect('update');
    });
    $("#add_dog_size").change(function() {
        $('select').niceSelect('update');
    });

    $('#logoutBtn').click(function(){
        location.href="home.html";
    });
    //tab選到直接連到會員頁相對應內容tabContent
    var _var_tabContentId = localStorage['_var_tabContentId'];

    function navMemMenu() {
        if (_var_tabContentId != "") {
            $('.tab').removeClass('active');
            var _fullTabId = ".tab" + "." + _var_tabContentId;
            $(_fullTabId).addClass('active');
            //tab選到下方出現相對應內容tabContent
            var tabContentId = "#" + _var_tabContentId;
            $('.tabContent').addClass('hideItem');
            $(tabContentId).removeClass('hideItem');
        }
    }
    navMemMenu();

    $('.memberTab').on('click', function() {
        navMemMenu();
    });

    //tab變選到active，上背景色
    $('.tab').click(function(e) {
        $('.tab').removeClass('active');
        $(this).addClass('active');

        //tab選到下方出現相對應內容tabContent
        var tabContentId = "#" + $(this).attr('data-tab-id');
        // console.log(tabContentId);
        $('.tabContent').addClass('hideItem');
        $(tabContentId).removeClass('hideItem');

    });

    //燈箱
    //點關閉燈箱
    $('.closeLightBox').click(function() {
        $('.lightbox_content').fadeOut(0, function() {
            $('.lightbox_box').css({
                width: '0px',
                height: '0px',
                borderRadius: '50%',

            });
            $('.C_lightbox').fadeOut(800);
        });
    });

    //updateMemInfo燈箱內容
    $('.updateMemInfo').click(function() {
        $('#aboutme').slideDown(0, function() {
            $('#aboutme .lightbox_box').css({
                width: '360px',
                height: '450px',
                borderRadius: '15px'
            });
        });
        $('#aboutme .lightbox_content').delay(800).fadeIn(500);
    });

    //新增寵物的燈箱
    $('#clickToAddPet').click(function() {
        $('#addpet').slideDown(0, function() {
            $('#addpet .lightbox_box').css({
                width: '285px',
                height: '510px',
                borderRadius: '15px'
            });
        });
        $('#addpet .lightbox_content').delay(800).fadeIn(500);
    });

    //改密碼的燈箱
    $('#changepsw').click(function() {
        $('#changePswLb').slideDown(0, function() {
            $('#changePswLb .lightbox_box').css({
               width: '360px',
                height: '300px',
                borderRadius: '15px'
            });
        });
        $('#changePswLb .lightbox_content').delay(800).fadeIn(500);
    });

});


//顯示住宿訂單資料
function mem_getOrderList() {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) { //server端順利執行完畢
                if (xhr.responseText == "no order list") { //
                    document.getElementById('mybookings').innerHTML = "沒有住宿訂單";
                } else { //成功
                    document.getElementById('mybookings').innerHTML = xhr.responseText;
                }
            } else {
                alert(xhr.status);
            }
        }
    }

    var url = "mem_getOrderList.php";
    var data_info = "mem_no=" + localStorage["mem_no"];
    // console.log('data_info:' + data_info);
    xhr.open("Post", url, true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data_info);
}


//顯示文章資料
function getArticle() {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) { //server端順利執行完畢
                if (xhr.responseText == "no article") { //
                    console.log("沒有文章");
                } else { //成功
                    document.getElementById('myposts').innerHTML = xhr.responseText;
                }
            } else {
                alert(xhr.status);
            }
        }
    }

    var url = "mem_getPosts.php";
    var data_info = "mem_no=" + localStorage["mem_no"];
    xhr.open("Post", url, true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data_info);
}

//顯示萌主參賽資料
function member_getRaceInfo() {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) { //server端順利執行完畢
                if (xhr.responseText == "no race record") { //
                    document.getElementById('myrace').innerHTML = "沒有萌主參賽紀錄";
                } else { //成功
                    document.getElementById('myrace').innerHTML = xhr.responseText;
                }
            } else {
                alert(xhr.status);
            }
        }
    }
    var url = "mem_getRaceInfo.php";
    var data_info = "mem_no=" + localStorage["mem_no"];
    xhr.open("Post", url, true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data_info);
}


//寵物開始-----------
// 新增寵物資料
function addPetfromMemPage() {
    var pet_name = document.getElementById("add_pet_name").value;
    var pet_age_number = document.getElementById("add_pet_age").value;
    var dog_no = $('#add_dog_no_select option:selected').val();
    var pet_personality = $('#add_pet_personality_select option:selected').val();
    var pet_sex = $('#add_pet_sex_span input:checked').val();


    var file = document.getElementById('add_upload_petImg').files[0];
    if (file == null) {
        var pet_img = "petDefault.png";
    } else {
        var pet_img = file.name;
    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) { //server端順利執行完畢
                //更新寵物頁面和燈箱資料//更新寵物照片和名字
                getPetInfo();
                //修改寵物資料燈箱關閉
                $('#addpet .lightbox_content').fadeOut(0, function() {
                    $('#addpet .lightbox_box').css({
                        width: '0px',
                        height: '0px',
                        borderRadius: '50%',

                    });
                    $('#addpet').fadeOut(800);
                });

            } else {
                alert(xhr.status);
            }
        }
    }

    var url = "addPetfromMemPage.php";
    var data_info = "mem_no=" + localStorage["mem_no"] + "&pet_name=" + pet_name + "&pet_age_number=" + pet_age_number + "&dog_no=" + dog_no + "&pet_personality=" + pet_personality + "&pet_sex=" + pet_sex + "&pet_img=" + pet_img;
    xhr.open("Post", url, true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data_info);

}

// 新增寵物資料//改寵物照片將它存到對的路徑
function add_changePetImg() {

    var file = document.getElementById('add_upload_petImg').files[0];

    if (file == null) {

    } else {
        var xhr = new XMLHttpRequest();
        var url = "add_change_pet_img.php";
        var form = new FormData(document.getElementById('add_upload_petimg_form'));
        xhr.open("Post", url, true);
        xhr.send(form);
    }

}


// 新增寵物資料// 顯示上傳寵物照片
function add_showUploadPetImg() {

    var file = document.getElementById('add_upload_petImg').files[0];
    console.log(file.name);

    // 以後補上檢查只能是圖檔才能上傳  
    // var message = 'File Name:' +file.name + '\n';
    // message += 'File Type: '+file.type + '\n';
    // message += 'File Size: '+file.size + '\n';
    // message += 'Last Modified: '+file.lastModifiedDate.toDateString() + '\n';
    // document.getElementById('fileInfo').value = message;

    var readFile = new FileReader();
    readFile.readAsDataURL(file);
    readFile.addEventListener('load', function() {
        var image = document.getElementById('add_petImg');
        image.src = readFile.result;
    }, false);

}

//抓到狗品種資料
function add_getDogInfo() {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) { //成功，取回資料
                // console.log(xhr.responseText);
                document.getElementById("add_dog_no_select").innerHTML = xhr.responseText;
                $('select').niceSelect('update');

            } else {
                alert(xhr.status);
            }
        }
    }

    var url = "getDogInfo.php";
    //體型
    var data_info = "dog_size=" + document.getElementById("add_dog_size").value;
    xhr.open("Post", url, true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data_info);
}




//顯示頁面上寵物資料
function getPetInfo() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) { //server端順利執行完畢
                if (xhr.responseText == "no pet") { //沒寵物
                    //顯示 訊息
                    document.getElementById('petCount').innerHTML = "0";

                } else { //成功
                    document.getElementById('petListDiv').innerHTML = xhr.responseText;
                    // 會員有幾隻寵物
                    document.getElementById('petCount').innerHTML = document.getElementsByClassName('pet_current').length;
                    //updatePetInfo lightbox
                    $('.updatePetInfo').click(function() {
                        //抓到寵物號碼 全域變數
                        _var_data_pet_no = $(this).attr('data-pet_no');
                        //叫出寵物資料
                        getPetLightboxInfo();
                        $('#mypets').slideDown(0, function() {
                            $('#mypets .lightbox_box').css({
                                width: '285px',
                                height: '510px',
                                borderRadius: '15px'
                            });
                        });
                        $('#mypets .lightbox_content').delay(800).fadeIn(500);
                    });
                }
            } else {
                alert(xhr.status);
            }
        }
    }

    var url = "mem_getPetInfo.php";
    var data_info = "mem_no=" + localStorage["mem_no"];
    // console.log("data info : ", data_info);
    xhr.open("Post", url, true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data_info);
}



//更新寵物資料
function updatePetInfointoDB() {
    var pet_name = document.getElementById("pet_name").value;
    var pet_age_number = document.getElementById("pet_age").value;
    var dog_no = $('#dog_no_select option:selected').val();
    var pet_personality = $('#pet_personality_select option:selected').val();
    var pet_sex = $('#pet_sex_span input:checked').val();
    //抓到照片檔名 _var_pet_img
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) { //server端順利執行完畢
                console.log("成功更新寵物資料");
                //更新寵物頁面和燈箱資料
                getPetInfo();
                //更新寵物照片和名字

                //修改寵物資料燈箱關閉
                $('#mypets .lightbox_content').fadeOut(0, function() {
                    $('#mypets .lightbox_box').css({
                        width: '0px',
                        height: '0px',
                        borderRadius: '50%',

                    });
                    $('#mypets').fadeOut(800);
                });

            } else {
                alert(xhr.status);
            }
        }
    }

    var url = "updatePetInfointoDB.php";
    var data_info = "pet_no=" + _var_data_pet_no + "&pet_name=" + pet_name + "&pet_age_number=" + pet_age_number + "&dog_no=" + dog_no + "&pet_personality=" + pet_personality + "&pet_sex=" + pet_sex + "&pet_img=" + _var_pet_img;
    // console.log("data info : ", data_info);
    xhr.open("Post", url, true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data_info);

}


//改寵物照片將它存到對的路徑
function changePetImg() {
    var xhr = new XMLHttpRequest();
    var url = "change_pet_img.php";
    var form = new FormData(document.getElementById('upload_petimg_form'));
    xhr.open("Post", url, true);
    xhr.send(form);
}


// 顯示上傳寵物照片
function showUploadPetImg() {

    var file = document.getElementById('upload_petImg').files[0];
    _var_pet_img = file.name;

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


//將帶入寵物燈箱資料
function showPetLightboxInfo(jsonStr) {
    //將字串轉為物件
    var pet = JSON.parse(jsonStr);

    // 狗尺寸變動狗品種也變動 
    document.getElementById("dog_size").onchange = getDogInfo;


    //將寵物資料帶到寵物燈箱
    document.getElementById("pet_name").value = pet.pet_name;
    var pet_bDay = pet.pet_age;
    var pet_bYear = pet_bDay.substring(0, 4);
    var _var_today = new Date();
    var _var_thisyear = _var_today.getFullYear();
    var _var_pet_age = parseInt(_var_thisyear) - parseInt(pet_bYear); //今年-生日年=年齡
    document.getElementById("pet_age").value = _var_pet_age;
    //個性
    var pet_personality = pet.pet_personality;
    var pet_personality_option1 = document.getElementsByClassName("pet_personality")[0];
    var pet_personality_option2 = document.getElementsByClassName("pet_personality")[1];
    var pet_personality_option3 = document.getElementsByClassName("pet_personality")[2];
    var pet_personality_option4 = document.getElementsByClassName("pet_personality")[3];

    if (pet_personality == "活潑") {
        pet_personality_option2.removeAttribute("selected");
        pet_personality_option3.removeAttribute("selected");
        pet_personality_option4.removeAttribute("selected");
        document.getElementById("lively").setAttribute("selected", "selected");
        $('select').niceSelect('update');
    } else if (pet_personality == "害羞") {
        pet_personality_option1.removeAttribute("selected");
        pet_personality_option3.removeAttribute("selected");
        pet_personality_option4.removeAttribute("selected");
        document.getElementById("shy").setAttribute("selected", "selected");
        $('select').niceSelect('update');
    } else if (pet_personality == "調皮") {
        pet_personality_option1.removeAttribute("selected");
        pet_personality_option2.removeAttribute("selected");
        pet_personality_option4.removeAttribute("selected");
        document.getElementById("naughty").setAttribute("selected", "selected");
        $('select').niceSelect('update');
    } else {
        //黏人
        pet_personality_option1.removeAttribute("selected");
        pet_personality_option2.removeAttribute("selected");
        pet_personality_option3.removeAttribute("selected");
        document.getElementById("sticky").setAttribute("selected", "selected");
        $('select').niceSelect('update');
    }
    //體型
    var pet_size = pet.dog_size;
    var dog_no = pet.dog_no;
    var pet_size_option = document.getElementsByClassName("pet_size_option");

    if (pet_size == "小型犬") {
        for (i = 0; i < pet_size_option.length; i++) {
            pet_size_option[i].removeAttribute("selected");
        }
        document.getElementById("pet_size_s").setAttribute("selected", "selected");
        getDogInfo(dog_no);



    } else if (pet_size == "中型犬") {
        for (i = 0; i < pet_size_option.length; i++) {
            pet_size_option[i].removeAttribute("selected");
        }
        document.getElementById("pet_size_m").setAttribute("selected", "selected");
        getDogInfo(dog_no);

    } else if (pet_size == "大型犬") {
        for (i = 0; i < pet_size_option.length; i++) {
            pet_size_option[i].removeAttribute("selected");
        }
        document.getElementById("pet_size_l").setAttribute("selected", "selected");
        getDogInfo(dog_no);
    }

    //sex
    var pet_sex = pet.pet_sex;
    if (pet_sex == "f") {
        document.getElementById("female_pet").setAttribute("checked", "chekced");
    } else {
        document.getElementById("male_pet").setAttribute("checked", "chekced");
    }
    //照片
    document.getElementById("petImg").src = "images/pet/" + pet.pet_img;
    console.log(pet.pet_img);
    _var_pet_img = pet.pet_img;
}


//先抓到寵物燈箱資料
function getPetLightboxInfo() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) { //server端順利執行完畢
                if (xhr.responseText == "Fail") { //
                    //加入新增寵物的畫面.display="block";
                    console.log("沒有寵物");
                } else { //抓到寵物資料
                    //帶入
                    showPetLightboxInfo(xhr.responseText);
                }
            } else {
                alert(xhr.status);
            }
        }
    }

    var url = "getPetLightboxInfo.php";
    var data_info = "pet_no=" + _var_data_pet_no;
    xhr.open("Post", url, true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data_info);
}


//抓到狗品種資料
function getDogInfo(dog_no) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) { //成功，取回資料
                // console.log(xhr.responseText);
                document.getElementById("dog_no_select").innerHTML = xhr.responseText;
                $('select').niceSelect('update');

                var _var_option_id = 'dog_no_option' + dog_no;
                document.getElementById(_var_option_id).setAttribute("selected", "selected");
                $('select').niceSelect('update');

            } else {
                alert(xhr.status);
            }
        }
    }

    var url = "getDogInfo.php";
    //體型
    var data_info = "dog_size=" + document.getElementById("dog_size").value;
    xhr.open("Post", url, true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data_info);
}

//寵物結束-----------



//會員資料開始-----------
//改會員照片將它存到對的路徑
function changeMemImg() {
    var xhr = new XMLHttpRequest();
    var url = "change_mem_img.php";
    var form = new FormData(document.getElementById('upload_img_form'));
    xhr.open("Post", url, true);
    xhr.send(form);
}


// 顯示上傳照片
function showUploadMemImg() {

    var file = document.getElementById('upload_mem_img').files[0];
    console.log(file.type);
    _var_member_img = file.name;
    console.log(_var_member_img);

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

//更新會員資料
function updateMemInfo() {
    var mem_no = localStorage["mem_no"];
    var mem_name = document.getElementById("mem_name").value;
    var mem_phone = document.getElementById("mem_phone").value;
    var mem_mail = document.getElementById("mem_mail").value;
    //抓到照片檔名 _var_member_img
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) { //server端順利執行完畢
                console.log("成功更新會員資料");
                //更新會員頁面和燈箱資料
                getMemInfo();
                //update local storage
                localStorage["mem_img"] = _var_member_img;
                localStorage["mem_name"] = mem_name;
                //更新會員頭像和名字
                document.getElementById("nav_mem_name").innerText = localStorage["mem_name"];
                document.getElementById("nav_mem_img").src = "images/member/" + localStorage["mem_img"];
                //修改會員資料燈箱關閉
                $('#aboutme .lightbox_content').fadeOut(0, function() {
                    $('#aboutme .lightbox_box').css({
                        width: '0px',
                        height: '0px',
                        borderRadius: '50%',

                    });
                    $('#aboutme').fadeOut(800);
                });

            } else {
                alert(xhr.status);
            }
        }
    }

    var url = "updateMemInfo.php";
    var data_info = "mem_no=" + mem_no + "&mem_name=" + mem_name + "&mem_phone=" + mem_phone + "&mem_mail=" + mem_mail + "&mem_img=" + _var_member_img;
    // console.log("data info : ", data_info);
    xhr.open("Post", url, true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data_info);

}

//帶入會員資料
function showMemInfo(jsonStr) {
    //將字串轉為物件
    var member = JSON.parse(jsonStr);
    //將會員資料帶到會員頁面
    document.getElementById("panel_mem_name").innerText = member.mem_name;
    document.getElementById("panel_mem_img").src = "images/member/" + member.mem_img;

    if (member.mem_sex == "f") {
        document.getElementById("panel_mem_sex").innerText = "媽媽";
    } else {
        document.getElementById("panel_mem_sex").innerText = "爸爸";
    }

    //將會員資料帶入會員燈箱
    document.getElementById("mem_name").value = member.mem_name;
    document.getElementById("mem_id").value = member.mem_id;
    document.getElementById("mem_phone").value = member.mem_phone;
    document.getElementById("mem_mail").value = member.mem_mail;
    //sex
    var mem_sex = member.mem_sex;
    if (mem_sex == "f") {
        document.getElementById("female").setAttribute("checked", "chekced");
    } else {
        document.getElementById("male").setAttribute("checked", "chekced");
    }
    document.getElementById("mem_mail").value = member.mem_mail;
    document.getElementById("profilePhoto").src = "images/member/" + member.mem_img;
    _var_member_img = member.mem_img;

    //將會員密碼帶入會員
    document.getElementById("changePsw_mem_id").value = member.mem_id;
}



//帶入會員資料
function getMemInfo() {
    var mem_no = localStorage["mem_no"];
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) { //server端順利執行完畢
                if (xhr.responseText == "Fail") { //錯誤
                    //顯示 錯誤 訊息
                    console.log("無法讀取會員資料");

                } else { //帳號正確
                    //帶入抓到的資料啟動 showMemInfo function
                    showMemInfo(xhr.responseText);
                }
            } else {
                alert(xhr.status);
            }
        }
    }

    var url = "getMemInfo.php";
    var data_info = "mem_no=" + mem_no;
    // console.log("data info : ", data_info);
    xhr.open("Post", url, true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data_info);
}
//會員資料結束----------------------


function memDoFirst() {
    //畫面中抓到會員所有資料
    getMemInfo();
    getPetInfo();
    getArticle();
    member_getRaceInfo();
    mem_getOrderList();

    //-------會員
    //===updateMemInfoBtn.onclick 事件處理程序是 updateMemInfo
    var updateMemInfoBtn = document.getElementById('updateMemInfoBtn');
    updateMemInfoBtn.addEventListener('click', updateMemInfo, false);
    //改會員照片將它存到對的路徑  
    updateMemInfoBtn.addEventListener('click', changeMemImg, false);
    /// 上傳檔案出現圖片
    document.getElementById('upload_mem_img').onchange = showUploadMemImg;


    //-----寵物
    var updatePetBtn = document.getElementById('updatePetBtn');
    //===updatePetBtn.onclick 事件處理程序是 updatePetInfointoDB
    updatePetBtn.addEventListener('click', updatePetInfointoDB, false);
    //改寵物照片將它存到對的路徑  
    updatePetBtn.addEventListener('click', changePetImg, false);
    /// 上傳檔案出現圖片
    document.getElementById('upload_petImg').onchange = showUploadPetImg;


    //--------新增寵物
    var addPetBtn = document.getElementById('addPetBtn');
    //===addPetBtn.onclick 事件處理程序是 addPetfromMemPage
    addPetBtn.addEventListener('click', addPetfromMemPage, false);
    //改寵物照片將它存到對的路徑  
    addPetBtn.addEventListener('click', add_changePetImg, false);
    /// 上傳檔案出現圖片
    document.getElementById('add_upload_petImg').onchange = add_showUploadPetImg;
    // $('#add_upload_petImg').change(function(){
    //     console.log('hi');
    // });
    // 狗大小顯示狗品種
    document.getElementById("add_dog_size").onchange = add_getDogInfo;

} //window.onload

window.addEventListener('load', memDoFirst, false);
