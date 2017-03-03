$(document).ready(function(){

     if(sessionStorage["backlogin"] != 'ok' ){
        location.href="../back-login.html";
    }
	orderListCheck();


	$('#orderlist  #searchOne').click(function(){
		var txt = $('#orderlist_search').val();
		orderListCheckSearch(txt);
		
	});
	$('#orderlist  #searchAll').click(function(){
        $('#orderlist_search').val('');
		orderListCheck();
	});
    $('.closeLightBox').click(function(){
        $('.service_box').fadeOut();
    });
	


});
//---------------------------
	
	
	function orderListCheck(){
           
            var URLs="back-orderlist-check.php";

            $.ajax({
                url: URLs,
                data: {},
                type:"GET",
                dataType:'html',

                success: function(msg){
                    // alert(msg);
                    // console.log(msg);
                    $('#orderlist #table').html(msg);

                    	$('#orderlist #table .goCheck').click(function(){
							var order_no  = $(this).siblings('.orderlistNo').val();
							var btnVal = $(this).val();


							orderListInOut(order_no,btnVal);
							orderListCheck();						
						});
                        $('.lookService').click(function(){
                            var ord_no = $(this).siblings('input').val();
                            lookService(ord_no);
                            $('.service_box').fadeIn();
                            // alert(ord_no);
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
	function orderListInOut(order_no,btnVal){
           
            var URLs="back-orderlist-InOut.php";

            $.ajax({
                url: URLs,
                data: {order_no,btnVal},
                type:"GET",
                dataType:'html',

                success: function(msg){
                    alert(msg);
                    // console.log(msg);

                },

                 error:function(xhr, ajaxOptions, thrownError){ 
                    alert(xhr.status); 
                    alert(thrownError); 
                 }
            });
            
        }
	//------------------------

	//---------------------------
	
	
	function orderListCheckSearch(order_no){
           
            var URLs="back-orderlist-check-search.php";

            $.ajax({
                url: URLs,
                data: {order_no},
                type:"GET",
                dataType:'html',

                success: function(msg){
                    // alert(msg);
                    // console.log(msg);
                    $('#orderlist #table').html(msg);

                    	$('#orderlist #table .inputBtn').click(function(){
							var order_no  = $(this).siblings('.orderlistNo').val();
							var btnVal = $(this).val();


							orderListInOut(order_no,btnVal);
							orderListCheck();						
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
  
    function lookService(order_no){
           
            var URLs="back-look-orderlist-service.php";

            $.ajax({
                url: URLs,
                data: {order_no},
                type:"GET",
                dataType:'html',

                success: function(msg){
                    // alert(msg);
                    // console.log(msg);
                    $('.service-content p').text(msg);
                   
                },

                 error:function(xhr, ajaxOptions, thrownError){ 
                    alert(xhr.status); 
                    alert(thrownError); 
                 }
            });
            
        }
    //------------------------
    
    