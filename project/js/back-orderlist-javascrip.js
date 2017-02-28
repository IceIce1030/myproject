$(document).ready(function(){


	orderListCheck();


	$('#orderlist .search #searchOne').click(function(){
		var txt = $('#orderlist_search').val();
		orderListCheckSearch(txt);
		
	});
	$('#orderlist .search #searchAll').click(function(){
        $('#orderlist_search').val('');
		orderListCheck();
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
    
    