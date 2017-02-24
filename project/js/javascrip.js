function doFirst(){
	SetDate=new Date();//設定時間
	LeapYear=false;//365 366天
	muchdays =[31,28,31,30,31,30,31,31,30,31,30,31];//月份大小


	startDate = new Date();//入住時間
	endDate = new Date();//退房時間

	current_year = new Date().getFullYear();//取得現在年分
	current_month = new Date().getMonth();//取得現在月份


	clcikCount=0;//點擊日期次數
	
	//檢查年分365 366天
	CheckYear();


	//目前月份天數
	days = muchdays[current_month];
	// alert(days);

	$id('before').addEventListener('click',monthLess,false);
	$id('after').addEventListener('click',monthPlus,false);


	$id('year').innerText=current_year;
	$id('month').innerText=current_month+1;

	//建置月曆
	monthChange();

	//顯示今天
	now = new Date();
	dayDivs = document.getElementsByClassName('dayy');
	for(var i=0;i<dayDivs.length;i++)
	{
		if( now.getDate() == i+1 && now.getMonth()==current_month){
			dayDivs[i].style.background= '#999';
			// alert('今天');
			break;
		}
		else{
			dayDivs[i].style.background= '#555';
		}
	}
	var class_styles = document.getElementsByClassName('styles');
	for(var i=0;i<class_styles.length;i++){
		class_styles[i].addEventListener('click',roomStyle,false);
	}
	
	//註冊按性別事件
	var sexbtn = document.getElementsByClassName('b-sex-svg');
	for(var i=0;i<sexbtn.length;i++){
		sexbtn[i].addEventListener('click',sexbtnClick,false);
	}

	//註冊新增服務按鈕事件
	var serviceAddBtn = document.getElementsByClassName('add-icon');
	for(var i=0;i<serviceAddBtn.length;i++){
		serviceAddBtn[i].addEventListener('click',serviceAddClick,false);
	}

}//dofirst
function $id(id){
		var getid=document.getElementById(id);
		return getid;
}
function monthLess(){
	//月分減少
	current_month --;
	if(current_month<0)
	{
		current_month=11;
		current_year--;

		//設定年分
		SetDate.setFullYear(current_year);
		// alert(SetDate);

		$id('year').innerText=current_year;
	}
	$id('month').innerText=current_month+1;

	//目前月份天數
	days = muchdays[current_month];
	// alert(days);
	monthChange();
}
function monthPlus(){
	//月份增加
	current_month ++;
	if(current_month>11)
	{
		current_month=0;
		current_year++;

		//設定年分
		SetDate.setFullYear(current_year);
		// alert(SetDate);

		$id('year').innerText=current_year;
	}
	$id('month').innerText=current_month+1;

	//目前月份天數
	days = muchdays[current_month];
	// alert(days);
	monthChange();
}
function monthChange(e){
	$id('table').innerHTML='';//清空div
	if (LeapYear==true && selectmm==2){
		days=days+1;
	}
	//設定日期
	SetDate.setMonth(current_month);
	SetDate.setDate(1);
	var week=SetDate.getDay()+1;
	var day=1;


	for(var i=1;i<50;i++){
		if(days>0){//天數還沒歸零
			if(week>1){
				var div = document.createElement('div');
				div.setAttribute("class", "day");
				div.addEventListener('click',selectday,false);
				$id('table').appendChild(div);
				week--;
			}//week>1
			else{
				var div = document.createElement('div');
				div.innerText = day;
				div.setAttribute("class", "day dayy");
				div.setAttribute("id","day"+day);
				div.addEventListener('click',selectday,false);
				$id('table').appendChild(div);
				day++;
				days--;
			}//week>1 else
		}
		else{
			break;
		}
	}
	//顯示今天
	now = new Date();
	dayDivs = document.getElementsByClassName('dayy');
	for(var i=0;i<dayDivs.length;i++)
	{
		if( now.getDate() == i+1 && now.getMonth()==current_month && now.getFullYear()==current_year ){
			dayDivs[i].style.background = '#999';
			break;
			// alert('今天');
		}
		else if(current_month<=now.getMonth() && current_year<=now.getFullYear() ){
			dayDivs[i].style.background = '#555';
		}
		else{
			dayDivs[i].style.background ='';
		}
	}
	
	if(clcikCount>0)
	{
		console.log('clcikCount:'+clcikCount);
		coloringStarEnd();
		coloring();
	}
	 
}
function CheckYear(){
	if (current_year%4==0 || current_year%100==0 || current_year%400==0) {
		LeapYear=true;
	}else{
		LeapYear=false;
	}
}
function selectday(){
	
	var clickDate = this.innerText;
	if(clcikCount>1){
		clearColor();
		clcikCount=0;
	}
	if(clcikCount==0){
		clcikCount++;

		//入住日期
		startDate.setDate(clickDate);
		startDate.setMonth(current_month);
		startDate.setFullYear(current_year);
		// alert("入住時間:"+startDate.toLocaleDateString("ja-JP"));
		this.style.background='#ffa800';

		var roomIn = document.getElementsByClassName('roomIn');
		for(var i=0;i<roomIn.length;i++){
			roomIn[i].innerText=startDate.toLocaleDateString("ja-JP");
		}
	}
	else if(clcikCount==1){
		clcikCount++;


		//退房日期
		endDate.setDate(clickDate);
		endDate.setMonth(current_month);
		endDate.setFullYear(current_year);
		// alert("退房日期："+endDate.toLocaleDateString("ja-JP"));


		//若退房日期比入住還前面 交換
		if(startDate>endDate){
			var temp = new Date();
			console.log('交換');
			temp = startDate;
			startDate = endDate;
			endDate = temp;
			console.log('startDate'+startDate);
			console.log('endDate'+endDate);

			var roomIn = document.getElementsByClassName('roomIn');
			for(var i=0;i<roomIn.length;i++){
				roomIn[i].innerText=startDate.toLocaleDateString("ja-JP");
			}

		}


		this.style.background='#ffa800';
		var roomOut = document.getElementsByClassName('roomOut');
		for(var i=0;i<roomOut.length;i++){
			roomOut[i].innerText=endDate.toLocaleDateString("ja-JP");
		}
		muchNight=endDate-startDate;
		muchNight=muchNight/86400000+1;



		var roomDays = document.getElementsByClassName('roomDays');
		for(var i=0;i<roomOut.length;i++){
			roomDays[i].innerText=muchNight;
		}


		coloring();//上色
	}
}
function clearColor(){
	//顯示今天
	dayDivs = document.getElementsByClassName('dayy');
	for(var i=0;i<dayDivs.length;i++)
	{
		if( now.getDate() == i+1 && now.getMonth()==current_month){
			dayDivs[i].style.background= '#999';
			// alert('今天');
		}
		else{
			dayDivs[i].style.background= 'none';
		}
	}
}
function coloring(){
	// 這個月幾天
	var dds = document.getElementsByClassName('dayy');
	// alert(dds.length);

	if(current_month==startDate.getMonth() && current_month==endDate.getMonth() ){
		var start=startDate.getDate();
		// alert(start);
		// alert(muchNight);
		console.log(muchNight);
		console.log('同月');
		for(var i=1; i<=muchNight-2; i++ ){
			
			var a=i+start;
			document.getElementById('day'+a).style.background='#0af';
		}
	}
	else if(current_month==startDate.getMonth() && current_month != endDate.getMonth() ){
		console.log('不同月起始日');
		console.log('dds='+dds.length);	
		var start=startDate.getDate();
		console.log('start='+start);
		for( i=1; i<=dds.length-start ; i++ ){
			var aa=i+start;
			console.log('aa:'+aa);
			document.getElementById('day'+aa).style.background='#0af';
		}
	}
	else if(current_month != startDate.getMonth() && current_month == endDate.getMonth() ){
		console.log('不同月結束日');
		console.log('dds='+dds.length);	
		var end=endDate.getDate();
		console.log('end='+end);
		for( i=1; i<end; i++ ){
			document.getElementById('day'+i).style.background='#0af';
		}
	}

}

function coloringStarEnd(){
	if(current_month==startDate.getMonth()){
		document.getElementById('day'+startDate.getDate()).style.background='#ffa800';
	}
	if(current_month==endDate.getMonth()){
		document.getElementById('day'+endDate.getDate()).style.background='#ffa800';
	}
}
function roomStyle(){
	//清除顏色
	//請清除顏色
	var stylesBtn = document.getElementsByClassName('styles');
	for(var i=0;i<stylesBtn.length;i++){
		stylesBtn[i].style.background='';
		stylesBtn[i].style.color='#000';
	}

	this.style.background='#774720';
	this.style.color='#fff';

	var dateRoomChange = document.getElementById('dateRoomChange');
	dateRoomChange.setAttribute("class","dateRoomChangeIn");

	clearclass = setInterval(clearClass, 500);
	
}
function clearClass(){
	var dateRoomChange = document.getElementById('dateRoomChange');
	// dateRoomChange.className="";
	dateRoomChange.setAttribute("class","dateRoomChangeOut");
	clearInterval(clearclass);	
}
function sexbtnClick(){

	//請清除顏色
	var sexbtn = document.getElementsByClassName('b-sex-svg');
	for(var i=0;i<sexbtn.length;i++){
		sexbtn[i].style.border='';
	}
	this.style.border='2px solid #f00';
}
function serviceAddClick(){
	alert('click');
}
	

	
window.addEventListener('load',doFirst,false);

$().ready(function(){
	

	// $("#rotatescroll").find("a").fancybox();
	$('a.page-scroll').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
              $('html,body').animate({
                  scrollTop: target.offset().top
              }, 1000);
              return false;
          }
      }
  });
  // console.log('nav ok');
  	if($(window).width()<1200){
  		// tinycircleslider
		 $("#rotatescroll").tinycircleslider({
			        dotsSnap : true
			    ,   radius   : 125
			    ,   dotsHide : false
		});
		// tinycircleslider
	}

  //Build Bubble Machines with the Bubble Engine ------------------------
  	if($(window).width()>1200){
  		// tinycircleslider
		 $("#rotatescroll").tinycircleslider({
			        dotsSnap : true
			    ,   radius   : 170
			    ,   dotsHide : false
		});
		// tinycircleslider

  		//判斷桌機,桌機才跑泡泡
  		var SoapBubbleMachineNumber1 = $('fn').BubbleEngine({
          particleSizeMin:            0,
          particleSizeMax:            30,
          particleSourceX:            $(window).width()/2,
          particleSourceY:            $('.step_service').height()*4-50,
          particleAnimationDuration:  5000,
          particleDirection:          'center',
          particleAnimationDuration:  2000,
          particleAnimationVariance:  2000,
          particleScatteringX:        150,
          particleScatteringY:        100,
          gravity:                    -100
        });

  		// 最小粒径
		// 粒子的最大尺寸
		// 粒子的起始位置
		// 粒子寿命（动画的持续时间）
		// 粒子寿命差异（动画的持续时间）
		// 粒子散射（的X / Y）
		// 粒子飞行方向（左，右，居中）
		// 重粒子
		// 粒子图像
		// 粒子重建（上|关闭）

        var SoapBubbleMachineNumber2 = $('fn').BubbleEngine({
          particleSizeMin:            50,
          particleSizeMax:            100,
          particleSourceX:            $(window).width()/2,
          particleSourceY:            $('.step_service').height()*4-100,
          particleAnimationDuration:  5000,
          particleDirection:          'center',
          particleAnimationDuration:  10000,
          particleAnimationVariance:  2000,
          particleScatteringX:        400,
          particleScatteringY:        600,
          gravity:                    -100
        });
        var SoapBubbleMachineNumber3 = $('fn').BubbleEngine({
          particleSizeMin:            0,
          particleSizeMax:            60,
          particleSourceX:            $(window).width()/2,
          particleSourceY:            $('.step_service').height()*4-100,
          particleAnimationDuration:  5000,
          particleDirection:          'center',
          particleAnimationDuration:  10000,
          particleAnimationVariance:  2000,
          particleScatteringX:        200,
          particleScatteringY:        400,
          gravity:                    -100
        });
        //Start Bubble Machines -----------------------------------------------
        SoapBubbleMachineNumber1.addBubbles(60);
        SoapBubbleMachineNumber2.addBubbles(3);
        SoapBubbleMachineNumber3.addBubbles(50);
  	}
        


});

