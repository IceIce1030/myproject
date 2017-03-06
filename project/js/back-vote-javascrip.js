    if(sessionStorage["backlogin"] !='ok' ){
        location.href="../back-login.html";
    }
$(document).ready(function(){
    
    sessionStorage.removeItem('page');
    sessionStorage.page = '#page1';
    voteCheck();

	$('#vote  #searchOne').click(function(){
		var txt = $('#search').val();
      
		voteSearch(txt);
		
	});
	$('#vote  #searchAll').click(function(){
       
        $('#search').val('');
        sessionStorage.page = '#page1';
		voteCheck();
	});

    $('#search').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            $('#vote  #searchOne').click();//Trigger search button click event
        }
    });
	


});
//---------------------------
	
	
	function voteCheck(pageNo){
           
            var URLs="back-vote-check.php";

            $.ajax({
                url: URLs,
                data: {pageNo},
                type:"GET",
                dataType:'html',

                success: function(msg){
                    // alert(msg);
                    // console.log(msg);
                    $('#table').html(msg);


                    $('.dele').click(function(){
                        if(confirm("確定要刪除嗎?")){
                            var vote_no = $(this).siblings('input').val();
                            delevote(vote_no );
                        }
                        
                        
                    });
                     $('.page').click(function(){
                        var no = $(this).text();
                        var id = $(this).attr('id');
                        var whatpage = '#'+id;
                        sessionStorage.page = whatpage;
                        // alert(whatpage);
                      
                        voteCheck(no);      

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
	
	
	function voteSearch(search_txt){
           
            var URLs="back-vote-search.php";

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

    //---------------------------
    
    
    function delevote(vote_no ){
           
            var URLs="back-vote-dele.php";

            $.ajax({
                url: URLs,
                data: {vote_no},
                type:"GET",
                dataType:'html',

                success: function(msg){
                    // alert(msg); 
                    var p = sessionStorage.page.replace("#page",'');
                    voteCheck(p);      

                   
                 
                },

                 error:function(xhr, ajaxOptions, thrownError){ 
                    alert(xhr.status); 
                    alert(thrownError); 
                 }
            });
            
        }
    //------------------------
    
    