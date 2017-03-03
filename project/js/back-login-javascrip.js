$(document).ready(function(){
    sessionStorage.removeItem('backlogin');
    sessionStorage["backlogin"] = 'no';
    
    $('#backpsw').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            $('.login').click();//Trigger search button click event
        }
    });
    $('#backid').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            $('.login').click();//Trigger search button click event
        }
    });

	$('.login').click(function(){
        var backId = $('#backid').val();
        var backPsw = $('#backpsw').val();

        if(backId=='ad104g3' && backPsw=='123456'){
            sessionStorage["backlogin"] = 'ok';
            // alert('登入成功');
            location.href="../back-orderlist.html";
        }
        else{
            $('#backid').val('');
            $('#backpsw').val('');

            alert('輸入錯誤，請重新輸入');
        }
    });

});
