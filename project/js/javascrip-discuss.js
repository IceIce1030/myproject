$(function(){

	$('.filterBtn').click(function(){
		$(this).addClass('chosen');
		$('.filterBtn').not(this).removeClass('chosen');

	})

	$('.search .icon').click(function(){
		$('.search-txt').toggleClass('open');
	});


	//先讓瀑布裡的東西load全部
	$('.grid').load('grid-all.html' , waterfall);

	//篩選
	$('#allBtn').click(function(){
		$('.grid').load('grid-all.html' , waterfall);
		
	})

	$('#shareBtn').click(function(){
		$('.grid').load('grid-aa.html' , waterfall);
		
	})

	// $('#healthBtn').click(function(){
	// 	$('.bb').removeClass('fade-out');
	// 	$('.item.bb').removeClass('fade-out');
	// 	amos();
	// })

	$('#healthBtn').click(function(){
		// $('.bb').parents('li').addClass('active');
		// $('.grid li').not('.active').remove();
		$('.grid').load('grid-bb.html' , waterfall);

	})

	$('#newBtn').click(function(){
		$('.grid').load('grid-cc.html' , waterfall);
	})

	$('#foodBtn').click(function(){
		$('.grid').load('grid-dd.html' , waterfall);
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

});