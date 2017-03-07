     if(sessionStorage["backlogin"] != 'ok' ){
        location.href="back-login.html";
    }
$(document).ready(function(){

    
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

     $('#orderlist_search').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            $('#orderlist  #searchOne').click();//Trigger search button click event
        }
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

                    	$('#orderlist #table .Check').click(function(){
                           var btnVal = $(this).val();
                           if(confirm("確定要"+btnVal+"嗎?")){
                                var order_no  = $(this).siblings('.orderlistNo').val();
                                orderListInOut(order_no,btnVal);
                                orderListCheck();
                           }
													
						});
                        $('.lookService').click(function(){
                            var ord_no = $(this).siblings('input').val();
                            lookService(ord_no);
                            $('.service_box').fadeIn();
                            // alert(ord_no);
                        });

                        $('.cancelOrder').click(function(){
                            if(confirm("確定要取消訂單嗎?")){
                                var _no = $(this).siblings('input').val();
                                // alert(_no); 
                                orderlistDele(_no);
                                orderListCheck();
                            }
                            
                            
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
                     orderListCheck();

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

                    	$('#orderlist #table .check').click(function(){
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

                        $('.cancelOrder').click(function(){
                            if(confirm("確定要取消訂單嗎?")){
                                var _no = $(this).siblings('input').val();
                                // alert(_no);
                                orderlistDele(_no); 
                                orderListCheck();
                            }
                            
                            
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
        //---------------------------
  
    function orderlistDele(order_no){
           
            var URLs="back-orderlist-dele.php";

            $.ajax({
                url: URLs,
                data: {order_no},
                type:"GET",
                dataType:'html',

                success: function(msg){
                    alert(msg);
                    // console.log(msg);
                    orderListCheck();
                    
                   
                },

                 error:function(xhr, ajaxOptions, thrownError){ 
                    alert(xhr.status); 
                    alert(thrownError); 
                 }
            });
            
        }
    //------------------------
    