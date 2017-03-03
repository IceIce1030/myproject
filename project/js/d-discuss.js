$(function(){	
	// 文章出現
	function showDiscuss(jsonStr){
	    document.getElementById('grid').innerHTML = '';

	    var _discusses = JSON.parse(jsonStr);//從 php 傳回來的json字串 轉成json物件
		
	    // alert(_discusses);
	    
	    //將字串直接放到div
	    document.getElementById('grid').innerHTML = _discusses;
	   
	    
	}

	function getDiscuss(){
	
	  var xhr = new XMLHttpRequest();
	  xhr.onreadystatechange=function (){
	    if( xhr.readyState == 4){
		     if( xhr.status == 200 ){
			  //modify here
	        // alert( xhr.responseText);
	        showDiscuss( xhr.responseText);//執行函式列印出資料
		     }else{
		        alert( xhr.status );
		     }
		 }
	  }
	  
	  var url = "getDiscuss.php";
	  
	  xhr.open("Get", url, true);
	  xhr.send( null );
	}
 	
	getDiscuss();
	
 	//全部文章出現-------------------------------------------------

 	//篩選
	function getDiscussSort(){
	
		  var xhr = new XMLHttpRequest();
		  xhr.onreadystatechange=function (){
		    if( xhr.readyState == 4){
			     if( xhr.status == 200 ){
				  //modify here
		        // alert( xhr.responseText);
		        showDiscuss( xhr.responseText);//執行函式列印出資料
			     }else{
			        alert( xhr.status );
			     }
			 }
		  }
		  // var sort = '新手爸媽';
		  var url = "getDiscussSort.php?arti_sort="+sort;
		 
		  
		  xhr.open("Get", url, true);
		  xhr.send( null );
		}


	// 全部文章出現
	$('#allBtn').click(function(){
		itemOut();
		getDiscuss();
	})
	// 分享按鈕
	$('#shareBtn').click(function(){
		itemOut();
		sort = '住宿分享';
		getDiscussSort();
	})
	// 保健按鈕
	$('#healthBtn').click(function(){
		itemOut();
		sort = '寵物保健';
		getDiscussSort();
	})
	// 新手按鈕
	$('#newBtn').click(function(){
		itemOut();
		sort = '新手爸媽';
		getDiscussSort();
	})
	// 食物按鈕
	$('#foodBtn').click(function(){
		itemOut();
		sort = '健康鮮食';
		getDiscussSort();
	})

	//熱門按鈕
	$('#hotBtn').click(function(){
		 var xhr = new XMLHttpRequest();
	  	 xhr.onreadystatechange=function (){
		    if( xhr.readyState == 4){
			     if( xhr.status == 200 ){
				  //modify here
		        // alert( xhr.responseText);
		        showDiscuss( xhr.responseText);//執行函式列印出資料
		        itemOut();
			     }else{
			        alert( xhr.status );
			     }
			 }
		  }
		  
		  var url = "getDiscussHot.php";
		  
		  xhr.open("Get", url, true);
		  xhr.send( null );
	});


	//RWD篩選
	$('#filterRWD').change(function(){
		sort = $(this).children('option:selected').val();
		// alert(sort);
		switch (sort) {
        case '全部文章':
          getDiscuss();
          break;
        case '住宿分享':
          getDiscussSort();
          break;
        case '健康鮮食':
          getDiscussSort();
          break;
        case '新手爸媽':
          getDiscussSort();
          break;
        case '寵物保健':
          getDiscussSort();
          break;
        case '熱門HOT':
           var xhr = new XMLHttpRequest();
	  	 	xhr.onreadystatechange=function (){
		    if( xhr.readyState == 4){
			     if( xhr.status == 200 ){
				  //modify here
		        // alert( xhr.responseText);
		        showDiscuss( xhr.responseText);//執行函式列印出資料
			     }else{
			        alert( xhr.status );
			     }
			 }
		  }
		  
		  var url = "getDiscussHot.php";
		  
		  xhr.open("Get", url, true);
		  xhr.send( null );
          break;
      }
	});//RWD篩選結束


// 篩選結束

	//fadeIn&Out動畫
 	function itemOut(){
 		$('.items').fadeOut();
 		itemIn();
 	}
 	function itemIn() {
 		$('.items').fadeIn( 400 );
 	}
 	//fadeIn&Out動畫結束

 });