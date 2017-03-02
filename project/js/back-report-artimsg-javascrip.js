$(document).ready(function(){


    sessionStorage.removeItem('where');
    sessionStorage.where = 'all';


    artimsgShow();

	$('#artimsg  #searchReport').click(function(){
		
        sessionStorage.where = 'report';
		artimsgShow();
		
	});
	$('#artimsg  #searchAll').click(function(){
        sessionStorage.where = 'all';
		artimsgShow();
	});


});
//---------------------------
	
	
	function artimsgShow(pageNo){
           
            var URLs="back-artimsg-report.php";
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
                        var a= $(this).siblings('#artiNo').val();

                        var dowhat = $(this).val();


                        artimsgReport(a,dowhat);
                    });
                    $('.page').click(function(){
                        var no = $(this).text();
                        alert(no);
                        artimsgShow(no);
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
	
	
	function artimsgReport(a,dowhat){
           
            var URLs="back-artimsg-report-doWhat.php";

            $.ajax({
                url: URLs,
                data: {a,dowhat},
                type:"GET",
                dataType:'html',

                success: function(msg){
                    // alert(msg);
                    // console.log(msg);
                    artimsgShow('report');
                    // $('#table').html(msg);
                 
                },

                 error:function(xhr, ajaxOptions, thrownError){ 
                    alert(xhr.status); 
                    alert(thrownError); 
                 }
            });
            
        }
	//------------------------

    
    