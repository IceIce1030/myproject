    if(sessionStorage["backlogin"] !='ok' ){
        location.href="../back-login.html";
    }
$(document).ready(function(){
    
    sessionStorage.removeItem('page');
    sessionStorage.page = '#page1';
    memberCheck();

	$('#member  #searchOne').click(function(){
		var txt = $('#search').val();
      
		memberSearch(txt);
		
	});
	$('#member  #searchAll').click(function(){
       
        $('#search').val('');
        sessionStorage.page = '#page1';
		memberCheck();
	});

    $('#search').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            $('#member  #searchOne').click();//Trigger search button click event
        }
    });
	


});
//---------------------------
	
	
	function memberCheck(pageNo){
           
            var URLs="back-member-check.php";

            $.ajax({
                url: URLs,
                data: {pageNo},
                type:"GET",
                dataType:'html',

                success: function(msg){
                    // alert(msg);
                    // console.log(msg);
                    $('#table').html(msg);
                    $('.lookPet').click(function(){
                        var mem_no = $(this).siblings('input').val();
                        // alert(mem_no);
                        showPet(mem_no);
                    });
                     $('.page').click(function(){
                        var no = $(this).text();
                        var id = $(this).attr('id');
                        var whatpage = '#'+id;
                        sessionStorage.page = whatpage;
                        // alert(whatpage);
                      
                        memberCheck(no);      

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
                     $('.lookPet').click(function(){
                        var mem_no = $(this).siblings('input').val();
                        // alert(mem_no);
                        showPet(mem_no);
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
    
    
    function showPet(mem_no ){
           
            var URLs="back-member-pet.php";

            $.ajax({
                url: URLs,
                data: {mem_no},
                type:"GET",
                dataType:'html',

                success: function(msg){
                    // alert(msg);
                    // console.log(msg);
                    $('#table').html(msg);

                    $('.page').click(function(){
                        var no = $(this).text();
                        var id = $(this).attr('id');
                        var whatpage = '#'+id;
                        sessionStorage.page = whatpage;
                        // alert(whatpage);
                      
                        showPet(no);      

                    });
                     
                 
                },

                 error:function(xhr, ajaxOptions, thrownError){ 
                    alert(xhr.status); 
                    alert(thrownError); 
                 }
            });
            
        }
    //------------------------
    
    