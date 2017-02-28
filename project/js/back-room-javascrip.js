$(document).ready(function(){

    roomInfo();

    $('#searchAll').click(function(){
        roomInfo();
    });

    $('#searchOne').click(function(){
        var t = $('#expIn').val();
        var t1 = $('#expOut').val();



       roomSearch(t,t1);


    });

});
//---------------------------
	
	
	function roomInfo(){
           
            var URLs="back-room-info.php";

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
	
	
	function roomSearch(expIn,expOut){
           
            var URLs="back-room-search.php";

            $.ajax({
                url: URLs,
                data: {expIn,expOut},
                type:"GET",
                dataType:'html',

                success: function(msg){
                    // alert(msg);
                    console.log(msg);
                    $('#table').html(msg);
                 
                },

                 error:function(xhr, ajaxOptions, thrownError){ 
                    alert(xhr.status); 
                    alert(thrownError); 
                 }
            });
            
        }
	//------------------------
    
    