$(function(){

	$('.filterBtn').click(function(){
		$(this).addClass('chosen');
		$('.filterBtn').not(this).removeClass('chosen');

	})


	//選擇圖片上傳
	$('#post-pic').change(function(){
		var file = document.getElementById('post-pic').files[0];
		//讀取檔案內容
		var readFile = new FileReader();
		//告訴它是以資料URL呈現
		readFile.readAsDataURL(file);
		//建立事件聆聽功能
		readFile.addEventListener('load',function(){
		//他下載完時有個處理程式
		//result -> 讀取到的內容
			var image = document.getElementById('postPic');
			//圖片的來源
			 image.src= readFile.result;
			 //圖片的最大寬度
			 // image.style.maxWidth = '100%';
			 //圖片的最大高度
			 // image.style.maxHeight = '100%';
		},false);
	});


	//發表文章
	$('#submitBtn').click(function(){
		//會員
		var memNo = localStorage["mem_no"];


		//抓到現在時間
		var NowDay = new Date();
		var year = NowDay.getFullYear();
		var month = NowDay.getMonth()+1;
		var date = NowDay.getDate();
		var hour = NowDay.getHours();
		var minute = NowDay.getMinutes();
		var second = NowDay.getSeconds();
		
		var nowTime = year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;

		//抓到文章標題
		var postTitle = $('#post-title').val();
		//抓到文章分類
		var postClass = $('#post-class option:selected').text();

      //抓圖
      var file = document.getElementById('post-pic').files[0];
      var postPic = file.name;
      var dotIndex = postPic.lastIndexOf('.');//取得點位置
      var ImgExt = postPic.substr(dotIndex+1, postPic.length);//抓到副檔名
      // alert(ImgExt);
      
      //抓到文章內容
      var txt = $('#post-text').val();    //找到textarea裡的值
 	  var postTxt = txt.replace(/\n/g,"<br />"); //加入換行
 	  
 	  //PHP路徑
 	  var url = "?mem_no="+memNo+"&arti_title="+postTitle+"&arti_content="+postTxt+"&arti_date="+nowTime+"&arti_sort="+postClass+"&arti_img="+postPic;
	  // alert(url);
	
	//判斷是否輸入完整內容
	var getAll = 0;
	if (postTitle=='') {
		alert('請輸入文章標題');
	}else{getAll+=1;}
	if (postTxt=='') {
		alert('請輸入文章內容');
	}else{getAll+=1;}
	//判斷是否為圖檔
	var fileExtArr = new Array("png","jpg","gif","bmp","jpeg");
	for (var i = 0; i < fileExtArr.length; i++) {
		if ( fileExtArr[i] == ImgExt) {
			getAll+=1;
			break;
		}else{
			$('#showPannel').text('請上傳圖檔');
		}
	}

	console.log(getAll);
	
	if (getAll==3) {  //若都有輸入則送出
		 $.ajax({
		      type: "GET",
		      url: "postArticle.php"+url
		    }).done(function( data) {
		      location.reload();//頁面重整
		    });
		 Upload();
	}


	});//發表文章結束

	function Upload(){
	  var xhr = new XMLHttpRequest();
	  var url = "UploadArticleImg.php";
	  var form = new FormData(document.getElementById('myForm'));
	  xhr.open("Post", url, true);
	  xhr.send( form );
	}	


	//清空發表內容
	function clearAll(){
		$('#post-title').val('');
		$('#post-pic').val('');
		$('#postPic').attr('src','images/white.jpg');
		$('#post-text').val(''); 
	}
		//點選燈箱X
	$('.closeLightBox').click(function(){
		clearAll();
	})
		//點選燈箱取消
	$('.cancelBtn').click(function(){
		if (confirm('確定取消?')) {
			clearAll();
		}

	})

});