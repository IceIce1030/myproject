$(document).ready(function(){

    sessionStorage.removeItem('where');
    sessionStorage.where = 'all';
    artiShow();

	$('#arti .search #searchReport').click(function(){
		
        sessionStorage.where = 'report';
		artiShow();
		
	});
	$('#arti .search #searchAll').click(function(){
        sessionStorage.where = 'all';
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
                        var a= $(this).siblings('#artiNo').val();

                        var dowhat = $(this).val();


                        artiReport(a,dowhat);
                    });
                    $('.more').click(function(){
                        var num = $(this).siblings('#artiNo').val();

                        artiContent(num);

                    });

                     $('.page').click(function(){
                        var no = $(this).text();
                        artiShow(no);
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
                    artiShow();
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
    
    
    