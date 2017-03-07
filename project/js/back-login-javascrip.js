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


        mangerCheck(backId,backPsw);
    });
    $('.cancel').click(function(){
        location.href="index.html";
    });

});

//---------------------------
    
    
    function mangerCheck(man_id,man_psw){
           
            var URLs="back-login.php";

            $.ajax({
                url: URLs,
                data: {man_id,man_psw},
                type:"GET",
                dataType:'html',

                success: function(msg){
                    if(msg=='登入成功'){
                        alert(msg);
                        sessionStorage["backlogin"] = 'ok';
                        location.href="back-orderlist.html";
                    }
                    else{
                        alert(msg);
                           $('#backid').val('');
                           $('#backpsw').val('');
                    }
                    
                   
                },

                 error:function(xhr, ajaxOptions, thrownError){ 
                    alert(xhr.status); 
                    alert(thrownError); 
                 }
            });
            
        }
    //------------------------
