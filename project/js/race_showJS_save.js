$(function(){	
  $('.cardmsgbutton').click(function(){
        postMSg()
  });

	// 卡片分類開始
	function getVoteBySort(sortStyle,filterStyle){
	
	  var xhr = new XMLHttpRequest();
	  xhr.onreadystatechange=function (){
	    if( xhr.readyState == 4){
		     if( xhr.status == 200 ){

	       		document.getElementById('cccc').innerHTML = xhr.responseText;
         
	        // 動態新增後js檔案

            if (localStorage.race_totalCardNum){
              var totalCardNum = $(".cardWrap").length;
              var totalCardNumParse = Number(totalCardNum);
              var localStorageTotalCardNumParse = Number(localStorage.race_totalCardNum);
              if (localStorageTotalCardNumParse > totalCardNum ){
                localStorage.setItem('race_totalCardNum', localStorageTotalCardNumParse);
              }else{
                localStorage.setItem('race_totalCardNum', totalCardNum);
              };
                        
            }else{
              var totalCardNum = $(".cardWrap").length;
              localStorage.setItem('race_totalCardNum', totalCardNum);
            };
          // 以localstorage判斷客戶端是否投過票_開始
          $( document ).ready(function() {
            if (typeof(Storage) !== "undefined") { 
                var  totalCardNum = localStorage.getItem('race_totalCardNum');         
                for (i = 0; i <= totalCardNum; i++) { 
                    var likeCardNum = 'liked'+i;
                    var likeStatus = localStorage.getItem(likeCardNum);

                      if (likeStatus == 1){    
                          var cardID ='.card'+i;
                          var cardString = cardID+' .favorite';
                          $(cardString).addClass('liked');
                      }          
                }
            }else{

            };   
          });
          
          // 以localstorage判斷客戶端是否投過票_結束	 
          heartClick();

        // 執行投票開始
        function votePet(voteUrl){
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange=function (){
            if( xhr.readyState == 4){
               if( xhr.status == 200 ){

                // alert(xhr.responseText);
         
               }else{
                  alert( xhr.status );
               }
            }
          }
          var url = "race_votePet.php?"+voteUrl;
          // alert(url);
          xhr.open("Get", url, true);
          xhr.send( null );
        } 
           // 觸發事件
          $('.favorite').click(function(){
            var temp = $(this).attr('class');
            var action;
            if(temp.indexOf("liked") != -1 ){
              action= "1";
            }else{
              action = "-1";
            }
              var voteNum = $(this).attr("value");
              var voteUrl = "vote_no="+voteNum + "&action=" + action;
              votePet(voteUrl);
              // var  sortStyle = sessionStorage["sortStyle"];
              // var filterStyle = sessionStorage["filterStyle"];
              // getVoteBySort(sortStyle,filterStyle);

          }); // 執行投票結束


        // 獲取燈箱的卡片資料開始
        function showLightboxInfo(jsonStr){

      var lightboxContent = JSON.parse(jsonStr);//從 php 傳回來的json字串 轉成json物件

      // alert(lightboxContent[0].pet_sex);

       // if(lightboxContent[0].pet_sex =="m"){
       //    var sex = "男生";
         
       //  }else{
       //    var sex = "女生";      
       //  };

      // 給closeLightBoxID
       var closeLbBtnName = 'closeLightBox'+lightboxContent[0].vote_no;
        $('.closeLightBox').attr('id',closeLbBtnName);// 給closeLightBoxID
      // 給msgContentID
       var idName = 'msgContent'+lightboxContent[0].vote_no;
       $('.msgContent').attr('id',idName);// 給msgContentID

      var NowDay = new Date();   
      var year = NowDay.getFullYear();
      var bornYear = lightboxContent[0].pet_age.substr(  0 , 4 );
      var petAge = year - bornYear;
      // var petAge = 0;

     if(petAge=='0'){
        petAge="未滿一歲";
     }else{
       petAge=petAge+'歲';
     }

      // alert(petAge);

      // 判斷男女
     var sextype = lightboxContent[0].pet_sex == 'm' ? "男生" : "女生";
     var  aa = lightboxContent[0].vote_no;
     var cardName = '.card'+aa;
     var classString = $(cardName).find('.favorite').attr('class');
      // alert(classString);
 // alert( $('.card1 .favorite').val());
     var cardString = cardName+' .favorite';


  // alert(cardString);
    

       // 燈箱裡面的愛心與外面的愛心同步_開始
      $('.cardlightbox').attr('id', 'cardlightbox'+lightboxContent[0].vote_no);
      var cardID = $('.cardlightbox').attr('id');
      
      var cardString = '#'+cardID+' .favorite';

      $(cardString).attr('value',lightboxContent[0].vote_no);

       if(classString.indexOf("liked") != -1 ){

          $(cardString).addClass('liked');

       }else{

          $(cardString).removeClass('liked');
       }
       // 燈箱裡面的愛心與外面的愛心同步_結束

      // alert(cardString);

      $('#LBnumber').text(lightboxContent[0].vote_no);
      $('#LBname').text(lightboxContent[0].pet_name);
      $('#LBimg').attr("src","images/race_image/"+lightboxContent[0].vote_img);
      $('#LBintro').text(lightboxContent[0].vote_intro);
      $('#LBvote').text(lightboxContent[0].vote_count);
      $('#LBsex').text(sextype);
      $('#LBage').text(petAge);
      $('#LBpersonality').text(lightboxContent[0].pet_personality);
      $('#LBtype').text(lightboxContent[0].dog_name);

       // 動態新增後js檔案

       // 獲取燈箱的留言資料開始
      function showLightboxMsg(jsonStr){


          var lightboxContent = JSON.parse(jsonStr);//從 php 傳回來的json字串 轉成json物件
          // alert(jsonStr);
          // alert(lightboxContent );
          // alert(lightboxContent[0].votemsg_content);
          // alert(lightboxContent[1].votemsg_content);
          // alert(lightboxContent[0].mem_name);

          if(jsonStr == '"nodata"'){
               $('.msgContent').append('<li><span>~成為第一個留言的人吧~</span></li>');
          }else{
            for(var i=0;i<lightboxContent.length;i++){
                $('.msgContent').append('<li><span>'+lightboxContent[i].mem_name+':'+'</span><span>'+lightboxContent[i].votemsg_content+'</span></li>');
            };
          }

          // 秀燈箱
          lightboxFadeIn();

          

           // 動態新增後js檔
          
      }
      // 取燈箱留言
      function getLightboxMsg(lightboxNum){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange=function (){
          if( xhr.readyState == 4){
             if( xhr.status == 200 ){
              // alert('123');
            showLightboxMsg(xhr.responseText);
             // document.getElementById("showlightbox").innerHTML = xhr.responseText; 
           

              //modify here
              // alert(xhr.responseText);
              // showMember( xhr.responseText);
             }else{
                alert( xhr.status );
             }
          }
        }
        var url = "race_LightboxMsg.php?"+lightboxNum;
        // alert(url);
        xhr.open("Get", url, true);
        xhr.send( null ); 
      } // 獲取燈箱的留言資料結束
            
            // 取得vote_no
            var idname = $('.cardlightbox').attr("id");
            var idnum = idname.replace(/[^0-9]/ig,"");
            var lightboxNum = "lightboxNum="+idnum;
            getLightboxMsg(lightboxNum); 


      }// 獲取燈箱的卡片資料結束


      function getLightboxInfo(lightboxNum){
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange=function (){
            if( xhr.readyState == 4){
               if( xhr.status == 200 ){
                // alert(xhr.responseText);
            showLightboxInfo(xhr.responseText);
             // document.getElementById("showlightbox").innerHTML = xhr.responseText; 
             
              //modify here
              // alert(xhr.responseText);
              // showMember( xhr.responseText);
             }else{
                alert( xhr.status );
             }
          }
        }
        var url = "race_LightboxInfo.php?"+lightboxNum;
        // alert(url);
        xhr.open("Get", url, true);
        xhr.send( null ); 
      } // 獲取燈箱的卡片資料結束

  
      $('.openLightbox').click(function(){

          var idname = $(this).attr("id");
          var idnum = idname.replace(/[^0-9]/ig,"");
          var lightboxNum = "lightboxNum="+idnum;
          // alert(lightboxNum);  

          getLightboxInfo(lightboxNum);
      });




			// 動態新增後js檔案結束
			}else{
			        alert( xhr.status );
			}
		}
	  }
	
	  var url = "race_sortVote.php?"+sortStyle+"&"+filterStyle; 
	  xhr.open("Get", url, true);
	  xhr.send( null );

	}// 卡片分類結束
 	
 
	// 卡片點擊分類事件
 	$("#voteCount").click(function(){

 		var sortStyle = "sortStyle=vote_count desc";
 		// var filterStyle = "filterStyle='大型犬'";      '大型犬' or dog.dog_size = '中型犬' or dog.dog_size = '小型犬'
 		// var filterStyle = "filterStyle='all'";	

 		var filterStatus = $("#filters .is-checked").val();

 		if(filterStatus == "*"){

 			var filterStyle = "filterStyle='all'";

 		}else if(filterStatus == "大型犬"){
 			var filterStyle = "filterStyle='大型犬'";

 		}else if(filterStatus == "中型犬"){
 			var filterStyle = "filterStyle='中型犬'";
 		}
 		else if(filterStatus == "小型犬"){
 			var filterStyle = "filterStyle='小型犬'";
 		};
    // sessionStorage["sortStyle"] = sortStyle;
    // sessionStorage["filterStyle"] = filterStyle;
    
 		getVoteBySort(sortStyle,filterStyle);
         
    heartClick();
 	});		

 	$("#voteNum").click(function(){

 		var sortStyle = "sortStyle=vote_no asc";

 		var filterStatus = $("#filters .is-checked").val();

 		if(filterStatus == "*"){

 			var filterStyle = "filterStyle='all'";

 		}else if(filterStatus == "大型犬"){
 			var filterStyle = "filterStyle='大型犬'";

 		}else if(filterStatus == "中型犬"){
 			var filterStyle = "filterStyle='中型犬'";
 		}
 		else if(filterStatus == "小型犬"){
 			var filterStyle = "filterStyle='小型犬'";
 		};
   //  sessionStorage["sortStyle"] = sortStyle;
   //  sessionStorage["filterStyle"] = filterStyle;
 		getVoteBySort(sortStyle,filterStyle);
         
 		heartClick();
 	});

 	$("#sizeAll").click(function(){

 		var filterStyle = "filterStyle='all'";

 		var sortStatus = $("#sorts .is-checked").val();

 		if(sortStatus == "votes"){

 			var sortStyle = "sortStyle=vote_count desc";

 		}else if(sortStatus == "date"){

 			var sortStyle = "sortStyle=vote_no asc";
 		};
   //  sessionStorage["sortStyle"] = sortStyle;
   //  sessionStorage["filterStyle"] = filterStyle;
 		getVoteBySort(sortStyle,filterStyle);
         
    heartClick();
 	});

 	$("#sizeBig").click(function(){

 		var filterStyle = "filterStyle='大型犬'";

 		var sortStatus = $("#sorts .is-checked").val();

 		if(sortStatus == "votes"){

 			var sortStyle = "sortStyle=vote_count desc";

 		}else if(sortStatus == "date"){

 			var sortStyle = "sortStyle=vote_no asc";
 		};
   //  sessionStorage["sortStyle"] = sortStyle;
   //  sessionStorage["filterStyle"] = filterStyle;
 		getVoteBySort(sortStyle,filterStyle);
         
    heartClick();
 	});

 	$("#sizeMedium").click(function(){

 		var filterStyle = "filterStyle='中型犬'";

 		var sortStatus = $("#sorts .is-checked").val();

 		if(sortStatus == "votes"){


 			var sortStyle = "sortStyle=vote_count desc";

 		}else if(sortStatus == "date"){

 			var sortStyle = "sortStyle=vote_no asc";
 		};
   //  sessionStorage["sortStyle"] = sortStyle;
   //  sessionStorage["filterStyle"] = filterStyle;
 		getVoteBySort(sortStyle,filterStyle);
         
    heartClick();
 	});

 	$("#sizeSmall").click(function(){

 		var filterStyle = "filterStyle='小型犬'";

 		var sortStatus = $("#sorts .is-checked").val();

 		if(sortStatus == "votes"){

 			var sortStyle = "sortStyle=vote_count desc";

 		}else if(sortStatus == "date"){

 			var sortStyle = "sortStyle=vote_no asc";
 		};
   //  sessionStorage["sortStyle"] = sortStyle;
   //  sessionStorage["filterStyle"] = filterStyle;
 		getVoteBySort(sortStyle,filterStyle);
         
    heartClick();
 	});
 	// 卡片點擊分類事件結束
 	
 	// 初始卡片分類事件
 	getVoteBySort("filterStyle='all'","sortStyle=vote_no asc");
 	// 初始卡片分類事件結束




// 發表留言
          // postMSg();

 });




      // 卡片燈箱事件
       function lightboxFadeIn(){

            if($(window).width()<767){
              $('.closeLightBox').click(function(){


              // 外面的愛心與燈箱裡面的愛心同步_開始
              var cardNumId =  $('.cardlightbox').attr('id'); 
              var number = cardNumId.replace(/[^0-9]/ig,"");
              var favoriteClass = $('.cardlightbox .favorite').attr('class');
              var cardName = '.card'+number;         
              var cardString = cardName+' .favorite';
              var cardVotesClass = cardName+' .votes';

              // 票數同步
              var LBcardvotes = $('.cardlightbox .votes').text();
              // alert(LBcardvotes);
              $(cardVotesClass).text(LBcardvotes);


                // 刪除燈箱裡的留言
                $('.msgContent').children('li').remove(); 

                $('.lightbox-content').fadeOut(0,function(){
                  // alert('1');
                  $('.lightbox-box').css({
                    width: '0px',
                    height: '0px',
                    borderRadius: '50%',
                    
                  });
                  $('.cardlightbox').fadeOut(800);
                }); 
              });
               //看燈箱
             
                // $('.openLightbox').click(function(){
                  $('.lightbox-content').slideDown(0,function(){
                    $('.lightbox-box').css({
                      width: '300px',
                      height: '500px',
                      borderRadius: '15px'      
                    });
                  });
                  $('.cardlightbox').delay(100).fadeIn(250);
                // });
          }else{
            $('.closeLightBox').click(function(){

              // var lastestMsg = $('.msgContent li:last-child').html();
              // alert(lastestMsg);
              var closeLbBtnId = $(this).attr('id');
              var closeLbBtnIdNum = closeLbBtnId.replace(/[^0-9]/ig,"");
              var latestMsgUrl = "vote_no="+closeLbBtnIdNum;             
              getLatestMsg(latestMsgUrl,closeLbBtnIdNum);



              // 外面的愛心與燈箱裡面的愛心同步_開始
              var cardNumId =  $('.cardlightbox').attr('id'); 
              var number = cardNumId.replace(/[^0-9]/ig,"");
              var favoriteClass = $('.cardlightbox .favorite').attr('class');
              var cardName = '.card'+number;         
              var cardString = cardName+' .favorite';
              var cardVotesClass = cardName+' .votes';

              // 票數同步
              var LBcardvotes = $('.cardlightbox .votes').text();
              // alert(LBcardvotes);
              $(cardVotesClass).text(LBcardvotes);


            if(favoriteClass.indexOf("liked") != -1 ){

              $(cardString).addClass('liked');

            }else{
              $(cardString).removeClass('liked');
            };
            // 外面的愛心與燈箱裡面的愛心同步_結束


                 // 刪除燈箱裡的留言
                $('.msgContent').children('li').remove(); 

                $('.lightbox-content').fadeOut(0,function(){
                  // alert('1');
                  $('.lightbox-box').css({
                    width: '0px',
                    height: '0px',
                    borderRadius: '50%',
                    
                  });
                  $('.cardlightbox').fadeOut(800);
                }); 
              });
               //看燈箱
             
                // $('.openLightbox').click(function(){
                  $('.lightbox-content').slideDown(0,function(){
                    $('.lightbox-box').css({
                      width: '740px',
                      height: '600px',
                      borderRadius: '15px'      
                    });
                  });
                  $('.cardlightbox').delay(100).fadeIn(250);
                // });
          };


      }// 卡片燈箱事件結束

      
    //發表留言

function postMSg(){
 
    var txt = $('#msgtype').val();    //找到textarea裡的值
    // alert(txt_str);
    if (txt=='') {
      alert('尚未輸入留言');
    }else{

    var voteNUmber = $('.cardlightbox').attr("id");
    var voteNum = voteNUmber.replace(/[^0-9]/ig,"");


    //抓到現在時間
    var NowDay = new Date();
    var year = NowDay.getFullYear();
    var month = NowDay.getMonth()+1;
    var date = NowDay.getDate();
    var hour = NowDay.getHours();
    var minute = NowDay.getMinutes();
    var second = NowDay.getSeconds();
    
    var nowTime = year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;

    //抓會員編號
    // var memNo = localStorage["mem_no"];
    //還沒寫喔!!!!!!!!!!!!!!!!!!!!!!!!--預設no2-------------------------

  
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange=function (){
        if( xhr.readyState == 4){
           if( xhr.status == 200 ){
          //modify here
            // alert( xhr.responseText);
            
           }else{
              alert( xhr.status );
           }
       }
      }
      if(localStorage.mem_no){
        var mem_no = localStorage["mem_no"];
        var memUrl = '&mem_no='+mem_no;
        var url = "race_msgtoDb.php?vote_no="+voteNum+"&votemsg_date="+nowTime+"&votemsg_content="+txt+memUrl;
        }else{
        var mem_no = 'guest';
        var memUrl = '&mem_no='+ mem_no;
        var url = "race_msgtoDb.php?vote_no="+voteNum+"&votemsg_date="+nowTime+"&votemsg_content="+txt+memUrl; 
        alert(url);
      }

        // var mem_no = localStorage["mem_no"];
        // var memUrl = '&mem_no='+mem_no;
        // var url = "race_msgtoDb.php?vote_no="+voteNum+"&votemsg_date="+nowTime+"&votemsg_content="+txt+memUrl;
    
    // alert(url);

      xhr.open("Get", url, true);    
      xhr.send( null );
      //
      // 清空輸入盒
       var txt = $('#msgtype').val('');

       //start

           // 獲取燈箱的留言資料開始
      function refreshLightboxMsg(jsonStr){

          var lightboxContent = JSON.parse(jsonStr);//從 php 傳回來的json字串 轉成json物件
          // alert(jsonStr);
          // alert(lightboxContent );
          // alert(lightboxContent[0].votemsg_content);
          // alert(lightboxContent[1].votemsg_content);
          // alert(lightboxContent[0].mem_name);

          if(jsonStr == '"nodata"'){
               $('.msgContent').append('<li><span>~成為第一個留言的人吧~</span></li>');
          }else{
            var i = lightboxContent.length-1;
                $('.msgContent').append('<li><span>'+lightboxContent[i].mem_name+':'+'</span><span>'+lightboxContent[i].votemsg_content+'</span></li>');      
          }
          

           // 動態新增後js檔
          
      }

      // 取燈箱留言
      function getRefreshLightboxMsg(lightboxNum){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange=function (){
          if( xhr.readyState == 4){
             if( xhr.status == 200 ){
              // alert('123');
            refreshLightboxMsg(xhr.responseText);
             // document.getElementById("showlightbox").innerHTML = xhr.responseText; 
           

              //modify here
              // alert(xhr.responseText);
              // showMember( xhr.responseText);
             }else{
                alert( xhr.status );
             }
          }
        }
        var url = "race_LightboxMsg.php?"+lightboxNum+memUrl;
        // alert(url);
        xhr.open("Get", url, true);
        xhr.send( null ); 
      } // 獲取燈箱的留言資料結束
            
            // 取得vote_no
            var idname = $('.cardlightbox').attr("id");
            var idnum = idname.replace(/[^0-9]/ig,"");
            var lightboxNum = "lightboxNum="+idnum;
            getRefreshLightboxMsg(lightboxNum); 

    }



  //發表留言結束
}			

        // 愛心動畫
         function heartClick(){
            $('.favorite').on('click', function(){
              $(this).toggleClass('liked');

              // 增加及減少投票數
              var temp = $(this).attr('class');
                if(temp.indexOf("liked") != -1 ){
                // alert(temp);
                var voteCountString =  $(this).siblings(".votes").text();              
                var voteCountInt = parseInt(voteCountString)+1;   
                var cardNumber = $(this).val();
                var cardLikedNum = 'liked'+cardNumber;
                // var totalCardNum = $('.cardWrap:last-child').attr('value');

                // 寫入localstorage投了哪一隻寵物
                localStorage.setItem(cardLikedNum, "1");


                $(this).siblings(".votes").text(voteCountInt);
            
                }else{

                var cardNumber = $(this).val();
                var cardLikedNum = 'liked'+cardNumber;
                // var totalCardNum = $('.cardWrap:last-child').attr('value');
                var voteCount =  $(this).siblings(".votes").text();
                var voteCountString =  $(this).siblings(".votes").text();
                var voteCountInt = parseInt(voteCountString)-1;   

                $(this).siblings(".votes").text(voteCountInt);
                // 清除localstorage投了哪一隻寵物
                localStorage.removeItem(cardLikedNum);
                };

            }); // 愛心動畫結束
        };



            // 關燈箱讓卡片留言與燈箱最新一則留言同步
          function getLatestMsg(latestMsgUrl,closeLbBtnIdNum){
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange=function (){
              if( xhr.readyState == 4){
                 if( xhr.status == 200 ){
                  var latestMsgPostId= 'post'+closeLbBtnIdNum;
                  // alert(latestMsgPostId);
                  // alert(xhr.responseText);        
                   document.getElementById(latestMsgPostId).innerHTML = xhr.responseText;
               
                 }else{
                    alert( xhr.status );
                 }
              }
            }
            var url = "race_latestMsg.php?"+latestMsgUrl;
            // alert(url);
            xhr.open("Get", url, true);
            xhr.send( null );
          };// 關燈箱讓卡片留言與燈箱最新一則留言同步
