$(document).ready(function(){
    
     if(sessionStorage["backlogin"] != "ok" ){
        location.href="../back-login.html";
    }

    sessionStorage.removeItem('where');
    sessionStorage.where = 'all';
    sessionStorage.removeItem('page');
    sessionStorage.page = '#page1';

    artiShow();

	$('#arti  #searchReport').click(function(){
		
      
        sessionStorage.where = 'report';
		artiShow();
		
	});
	$('#arti  #searchAll').click(function(){
       
        sessionStorage.where = 'all';
        sessionStorage.page = '#page1';
		artiShow();
	});

    $('.closeLightBox').click(function(){
        $('.arti-content-box').fadeOut();
    });
	
});
//---------------------------
	
	
	function artiShow(pageNo){
           
            var URLs="back-arti-report.php";
            var txt = sessionStorage.where;

            $.ajax({
                url: URLs,
                data: {txt,pageNo},
                type:"GET",
                dataType:'html',

                success: function(msg){
                    // alert(msg);
                    // console.log(msg);
                    $('#table').html(msg);


                    $('.doWhat').click(function(){
                        var dowhat = $(this).val();
                        if(confirm("確定要"+dowhat+"嗎?")){
                            var a= $(this).siblings('#artiNo').val();
                            
                            artiReport(a,dowhat);
                        }
                        
                    });
                    $('.more').click(function(){
                        var num = $(this).siblings('#artiNo').val();

                        artiContent(num);

                    });

                     $('.page').click(function(){
                        var no = $(this).text();
                        var id = $(this).attr('id');
                        var whatpage = '#'+id;
                        sessionStorage.page = whatpage;
                      
                        artiShow(no);         

                    });

                     $('.page').css({
                        color:'#000'
                     });
                     $(sessionStorage.page).css({
                        color:'#EB3F4B'
                     });

                   
                },

                 error:function(xhr, ajaxOptions, thrownError){ 
                    alert(xhr.status); 
                    alert(thrownError); 
                 }
            });
            
        }
	//------------------------



	//---------------------------
	
	
	function artiReport(a,dowhat){
           
            var URLs="back-arti-report-doWhat.php";

            $.ajax({
                url: URLs,
                data: {a,dowhat},
                type:"GET",
                dataType:'html',

                success: function(msg){
                    alert(msg);
                    // console.log(msg);
                    var p = sessionStorage.page.replace("#page",'');
                    artiShow(p);
                    // $('#table').html(msg);
                 
                },

                 error:function(xhr, ajaxOptions, thrownError){ 
                    alert(xhr.status); 
                    alert(thrownError); 
                 }
            });
            
        }
	//------------------------


    //---------------------------
    
    
    function artiContent(arti_no){
           
            var URLs="back-arti-content.php";

            $.ajax({
                url: URLs,
                data: {arti_no},
                type:"GET",
                dataType:'html',

                success: function(msg){
                    // alert(msg);
                    console.log(msg);
                    $('.arti-content p').html(msg);
                    $('.arti-content-box').fadeIn();
                 
                },

                 error:function(xhr, ajaxOptions, thrownError){ 
                    alert(xhr.status); 
                    alert(thrownError); 
                 }
            });
            
        }
    //------------------------
    
    
    