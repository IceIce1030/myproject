$(document).ready(function(){

    memberCheck();

	$('#member .search #searchOne').click(function(){
		var txt = $('#search').val();

		memberSearch(txt);
		
	});
	$('#member .search #searchAll').click(function(){
        
        $('#search').val('');
		memberCheck();
	});
	


});
//---------------------------
	
	
	function memberCheck(){
           
            var URLs="back-member-check.php";

            $.ajax({
                url: URLs,
                data: {},
                type:"GET",
                dataType:'html',

                success: function(msg){
                    // alert(msg);
                    // console.log(msg);
                    $('#table').html(msg);
                   
                },

                 error:function(xhr, ajaxOptions, thrownError){ 
                    alert(xhr.status); 
                    alert(thrownError); 
                 }
            });
            
        }
	//------------------------



	//---------------------------
	
	
	function memberSearch(search_txt){
           
            var URLs="back-member-check-search.php";

            $.ajax({
                url: URLs,
                data: {search_txt},
                type:"GET",
                dataType:'html',

                success: function(msg){
                    // alert(msg);
                    // console.log(msg);
                    $('#table').html(msg);
                 
                },

                 error:function(xhr, ajaxOptions, thrownError){ 
                    alert(xhr.status); 
                    alert(thrownError); 
                 }
            });
            
        }
	//------------------------
    
    