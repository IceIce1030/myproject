     if(sessionStorage["backlogin"]  !='ok' ){
        location.href="../back-login.html";
    }
$(document).ready(function(){
    
    imgtype=true;
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
                   



                    $('.update').click(function(){
                        var no = $(this).siblings('.updateNo').val();
                        // alert(no);

                        updateRoomInfo(no);


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
	
	
	function roomSearch(expIn,expOut){
           
            var URLs="back-room-search.php";

            $.ajax({
                url: URLs,
                data: {expIn,expOut},
                type:"GET",
                dataType:'html',

                success: function(msg){
                    // alert(msg);
                   
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
    
    
    function updateRoomInfo(room_no){
           
            var URLs="back-room-update-info.php";

            $.ajax({
                url: URLs,
                data: {room_no},
                type:"GET",
                dataType:'html',

                success: function(msg){
                    // alert(msg);
                   // console.log(msg);
                    $('#table').html(msg);

                    $('.updateinput').change(function(){

                        var file = this.files[0];
                        var message = 'File Name : ' + file.name + '\n';
                        message += 'File Size : ' + file.size + '\n';
                        message += 'File Type : ' + file.type + ' byte(s)\n';
                        message += 'Last Modified: '+file.lastModifiedDate.toDateString()+'\n';

                        // console.log(file.type);

                        if(file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg' ) { 
                                 
                                    var img = $(this).siblings('img');
                                    $(this).siblings('.imgName').val(file.name);

                                    
                                    var readFile= new FileReader();//宣告一個物件
                                    readFile.readAsDataURL(file);//以圖片影音格式回傳結果
                                    readFile.addEventListener('load',function(){
                                        // console.log(readFile);
                                        img.attr("src",readFile.result);
                                        // img.src=readFile.result;//result讀取到的內容
                                        // // img.style.maxWidth = '133px';
                                        // // img.style.maxHeight = '100px';

                                    },false);

                                    imgtype=true;
                        }
                        else{
                            alert('檔案格式不符合!');
                            imgtype=false;
                        }

                    });
                    $('.updateOk').click(function(){
                        if(imgtype==false){
                            alert('請上傳正確檔案格式!');
                        }
                        else{
                            updateRoom();
                        }
                        
                    });

                    $('.updateCancel').click(function(){
                        roomInfo();
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
    
    
    function updateRoom(){
           
            var URLs="back-room-update.php";
            var room_no =$('#room_no').val();
            var room_name = $('#room_name').val();
            var room_price = $('#room_price').val();
            var room_info = $('#room_info').val();
            var room_count =$('#room_count').val();

            var img1Src = $('#imgName1').val();
            var img2Src = $('#imgName2').val();
            var img3Src = $('#imgName3').val();
            var img1Id = $('#imgId1').val();
            var img2Id = $('#imgId2').val();
            var img3Id = $('#imgId3').val();

            // img1Src = img1Src.replace('../images/room/','');
            // img2Src = img2Src.replace('../images/room/','');
            // img3Src = img3Src.replace('../images/room/','');


            // console.log(room_no);
            // console.log(room_name);
            // console.log(room_price);
            // console.log(room_info);
            // console.log(room_count);
            // console.log(img1Src);
            // console.log(img2Src);
            // console.log(img3Src);
            // console.log(img1Id);
            // console.log(img2Id);
            // console.log(img3Id);


            $.ajax({
                url: URLs,
                data: {room_no,room_name,room_price,room_info,room_count},
                type:"GET",
                dataType:'html',

                success: function(msg){
                    // alert(msg);
                   // console.log(msg);
                   updateRoomimg(img1Src,img2Src,img3Src,img1Id,img2Id,img3Id);
                   roomInfo();

                   
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
    
    
    function updateRoomimg(img1Src,img2Src,img3Src,img1Id,img2Id,img3Id){
           
            var URLs="back-roomimg-update.php";
            
            // console.log(img1Src);
            // console.log(img2Src);
            // console.log(img3Src);



            // console.log(img1Id);
            // console.log(img2Id);
            // console.log(img3Id);


            $.ajax({
                url: URLs,
                data: {img1Src,img2Src,img3Src,img1Id,img2Id,img3Id},
                type:"GET",
                dataType:'html',

                success: function(msg){
                    // alert(msg);
                   // console.log(msg);
                   uploadimg();           
                },

                 error:function(xhr, ajaxOptions, thrownError){ 
                    alert(xhr.status); 
                    alert(thrownError); 
                 }
            });
            
        }
    //------------------------
    function uploadimg(){
       var xhr = new XMLHttpRequest();
        var url = "back-roomimg-updateimg.php";
        var form = new FormData(document.getElementById('myForm'));
        xhr.open("Post", url, true);
        xhr.send( form );


        // console.log(form);
        // alert('hi');
    }

    

    //------------------------
    
    
    