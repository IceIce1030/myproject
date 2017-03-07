$(function(){	
	
	//文章出現
	function getArticle(){
	
	  var xhr = new XMLHttpRequest();
	  xhr.onreadystatechange=function (){
	    if( xhr.readyState == 4){
		     if( xhr.status == 200 ){
			  //modify here
	        // alert( xhr.responseText);
	        document.getElementById('articleContent').innerHTML = xhr.responseText;
		     }else{
		        alert( xhr.status );
		     }
		 }
	  }

	  //抓網頁參數
	  var strUrl = location.search;
	  var getArti_no = strUrl.split("?");
	  // alert(getArti_no[1]);
	  var arti_no = getArti_no[1];

	  var url = "getArticle.php?"+arti_no;  
	  
	  xhr.open("Get", url, true);
	  
	  xhr.send( null );
	}
 	
	getArticle();
 	//文章出現------------------------------------------------

 	
 	//麵包屑
 	function getBread(){
	
	  var xhr = new XMLHttpRequest();
	  xhr.onreadystatechange=function (){
	    if( xhr.readyState == 4){
		     if( xhr.status == 200 ){
			  //modify here
	        // alert( xhr.responseText);
	        document.getElementById('breadcrumbs').innerHTML = xhr.responseText;
		     }else{
		        alert( xhr.status );
		     }
		 }
	  }

	  //抓網頁參數
	  var strUrl = location.search;
	  var getArti_no = strUrl.split("?");
	  // alert(getArti_no[1]);
	  var arti_no = getArti_no[1];

	  var url = "getBread.php?"+arti_no;  
	  
	  xhr.open("Get", url, true);
	  
	  xhr.send( null );
	}
 	
	getBread();
 	//麵包屑結束
 	

 	//留言出現
 	function getReply(){
	
	  var xhr = new XMLHttpRequest();
	  xhr.onreadystatechange=function (){
	    if( xhr.readyState == 4){
		     if( xhr.status == 200 ){
			  //modify here
	        // alert( xhr.responseText);
	        document.getElementById('replyTable').innerHTML = xhr.responseText;
		     }else{
		        alert( xhr.status );
		     }
		 }
	  }

	  //抓網頁參數
	  var strUrl = location.search;
	  var getArti_no = strUrl.split("?");
	  // alert(getArti_no[1]);
	  var arti_no = getArti_no[1];

	  var url = "getReply.php?"+arti_no;  
	  
	  xhr.open("Get", url, true);
	  
	  xhr.send( null );
	}
 	
	getReply();
 	// 留言結束-----------------


 	// 畫面跳轉
 		//上一篇
 	$('#forwardArti').click(function(){
 		var strUrl = location.search; //抓網頁參數
	  	var getArti_str = strUrl.split("?"); //用問號隔開
	  	var arti_str = getArti_str[1]; //第1個即是問號後面的字串
 		var getArti_no = arti_str.split("="); //用等號隔開
 		var arti_no = parseInt(getArti_no[1]); //第1個即是等號號後面的數字
 		var arti_forward = arti_no-1;
 		
 		if (arti_forward==0) {
 			alert('此文章為第一篇');
 		}else{
 			var url = "article.html?"+"arti_no="+arti_forward;
			window.location.assign(url);
 		}
 		
 	});
 	//下一篇
 	$('#nextArti').click(function(){
 		var strUrl = location.search; //抓網頁參數
	  	var getArti_str = strUrl.split("?"); //用問號隔開
	  	var arti_str = getArti_str[1]; //第1個即是問號後面的字串
 		var getArti_no = arti_str.split("="); //用等號隔開
 		var arti_no = parseInt(getArti_no[1]); //第1個即是等號號後面的數字
 		var arti_next = arti_no+1;
 		var url = "article.html?"+"arti_no="+arti_next;

 		window.location.assign(url);
 	});
 	// 跳轉結束

 	//發表留言
 	$('#messSubmit').click(function(){
 		var txt = $('#myMessage').val();    //找到textarea裡的值
 		var txt_str = txt.replace(/\n/g,"<br />"); //加入換行
 		// alert(txt_str);
 		if (txt_str=='') {
 			alert('尚未輸入留言');
 		}else{
 					//抓網頁參數
		var strUrl = location.search;
		var getArti_no = strUrl.split("?");
		var arti_no = getArti_no[1]; //取得文章編號

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
		var memNo = localStorage["mem_no"];
		//還沒寫喔!!!!!!!!!!!!!!!!!!!!!!!!--預設no2-------------------------

	
		  var xhr = new XMLHttpRequest();
		  xhr.onreadystatechange=function (){
		    if( xhr.readyState == 4){
			     if( xhr.status == 200 ){
				  //modify here
		        // alert( xhr.responseText);
		        postReplyAdd(); //留言數更新
		        location.reload();//頁面重整
		        
			     }else{
			        alert( xhr.status );
			     }
			 }
		  }

		var url = "postReply.php?"+arti_no+"&mem_no="+memNo+"&artimsg_content="+txt_str+"&artimsg_date="+nowTime;  
		// alert(url);

		  xhr.open("Get", url, true);
		  
		  xhr.send( null );

 		}
		

 	});//發表留言結束

 	//留言數更新
 	function postReplyAdd(){
		//抓網頁參數
		var strUrl = location.search;
		var getArti_no = strUrl.split("?");
		var arti_no = getArti_no[1]; //取得文章編號

 		 $.ajax({
		      type: "GET",
		      url: "postReplyAdd.php?"+arti_no
		    }).done(function( data) {
		      alert( "留言成功!" );
		    });
 	}//留言數更新結束

 	//文章觀看數更新
 	function articleCountAdd(){
		//抓網頁參數
		var strUrl = location.search;
		var getArti_no = strUrl.split("?");
		var arti_no = getArti_no[1]; //取得文章編號

 		 $.ajax({
		      type: "GET",
		      url: "articleCountAdd.php?"+arti_no
		    }).done(function( data) {
		      // alert( "觀看數+1" );
		    });
 	}//觀看數更新
 	articleCountAdd();


 	$('#messReset').click(function(){
 		$('#myMessage').val('');
 		// alert('123');
 	});
	

 });