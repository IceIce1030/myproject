function doFirst(){
	SetDate=new Date();//設定時間
	LeapYear=false;//365 366天
	muchdays =[31,28,31,30,31,30,31,31,30,31,30,31];//月份大小
	now = new Date();//現在時間

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

	//顯示今天，找到今天 其他上透明
	dayDivs = document.getElementsByClassName('dayy');
	for(var i=0;i<dayDivs.length;i++)
	{
		if( now.getDate() == i+1 && now.getMonth()==current_month){
			dayDivs[i].style.background= $grayCCC;
			// alert('今天');
			break;
		}
		else{
			dayDivs[i].style.opacity= '0.4';
		}
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
function monthChange(){
	$id('table').innerHTML='';//清空div
	if (LeapYear==true && selectmm==2){
		days=days+1;
	}
	//設定日期 找到星期
	SetDate.setMonth(current_month);
	SetDate.setDate(1);
	var week=SetDate.getDay()+1;
	var day=1;

	//創建每一天的日期
	var createDivDate = new Date();
	createDivDate.setMonth(current_month);
	createDivDate.setFullYear(current_year);

	for(var i=1;i<50;i++){
		
		if(days>0){//天數還沒歸零
			if(week>1){
				var div = document.createElement('div');
				div.setAttribute("class", "day");
				

				var divBox = document.createElement('div');
				divBox.setAttribute("class", "dayBox");
				divBox.appendChild(div);

				$id('table').appendChild(divBox);
				week--;
			}//week>1
			else{
				createDivDate.setDate(day);
				var div = document.createElement('div');
				div.innerText = day;
				div.setAttribute("class", "day dayy");
				div.setAttribute("id","day"+day);

				var divBox = document.createElement('div');
				divBox.setAttribute("class", "dayBox");
				divBox.appendChild(div);

				if(createDivDate>now){//比今天還大才給他註冊事件
					div.addEventListener('click',selectday,false);
					div.setAttribute("class", "day dayy dayPointer");
				};
				
				$id('table').appendChild(divBox);
				day++;
				days--;
			}//week>1 else
		}
		else{
			break;
		}
	}
	//顯示今天,過掉的日期上灰色(555)
	now = new Date();
	dayDivs = document.getElementsByClassName('dayy');
	for(var i=0;i<dayDivs.length;i++)
	{
		if( now.getDate() == i+1 && now.getMonth()==current_month && now.getFullYear()==current_year ){
			dayDivs[i].style.background = $grayCCC;
			break;
			// alert('今天');
		}
		//這個月而且還不到今天
		else if(current_month==now.getMonth() && current_year==now.getFullYear() && now.getDate() > i+1 ){
			dayDivs[i].style.opacity= '0.4';
		}
		//今年月份比現在小
		else if(current_month<now.getMonth() && current_year==now.getFullYear()){
				dayDivs[i].style.opacity= '0.4';
		}
		//比今年小的
		else if(current_year<now.getFullYear()){
				dayDivs[i].style.opacity= '0.4';
		}
		else{
			dayDivs[i].style.background ='';
		}
	}
	
	if(clcikCount>0){
		// console.log('clcikCount:'+clcikCount);
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
		dateSelected=false;
		//清除session
		sessionStorage.roomStyle='';
	}
	if(clcikCount==0){
		
		//清除入住日期跟退房日期
		var roomIn = document.getElementsByClassName('roomIn');
		for(var i=0;i<roomIn.length;i++){
			roomIn[i].innerText='請選擇入住日期';
		}
		var roomOut = document.getElementsByClassName('roomOut');
		for(var i=0;i<roomOut.length;i++){
			roomOut[i].innerText='請選擇退房日期';
		}
		var roomDays = document.getElementsByClassName('roomDays');
		for(var i=0;i<roomOut.length;i++){
			roomDays[i].innerText='0';
		}
		//清除入住日期跟退房日期


		//先跑一次把過掉的日期上灰色
		dayDivs = document.getElementsByClassName('dayy');
		for(var i=0;i<dayDivs.length;i++)
		{
			if( now.getDate() == i+1 && now.getMonth()==current_month && now.getFullYear()==current_year ){
				dayDivs[i].style.background = $grayCCC;
				
				// alert('今天');
				// console.log('bb');
			}
			else if(current_month<=now.getMonth() && current_year<=now.getFullYear() && now.getDate() > i+1 ){
				dayDivs[i].style.opacity= '0.4';
				// console.log('aa');
			}
			else{
				dayDivs[i].style.background ='';
				dayDivs[i].style.color =$black;
				// console.log('cc');
			}
		}

		clcikCount++;

		//入住日期
		startDate.setDate(clickDate);
		startDate.setMonth(current_month);
		startDate.setFullYear(current_year);
		// alert("入住時間:"+startDate.toLocaleDateString("ja-JP"));
		this.style.background=$orange;

		var roomIn = document.getElementsByClassName('roomIn');
		for(var i=0;i<roomIn.length;i++){
			roomIn[i].innerText=startDate.toLocaleDateString("ja-JP");
		}

		$id('nowNeedSelectDate').innerText="請選擇退房日期";

	}
	else if(clcikCount==1){
		clcikCount++;


		//退房日期
		endDate.setDate(clickDate);
		endDate.setMonth(current_month);
		endDate.setFullYear(current_year);
		// alert("退房日期："+endDate.toLocaleDateString("ja-JP"));


		//若退房日期比入住還早 交換日期
		if(startDate>endDate){
			var temp = new Date();
			// console.log('交換日期');
			temp = startDate;
			startDate = endDate;
			endDate = temp;
			// console.log('startDate'+startDate);
			// console.log('endDate'+endDate);

			var roomIn = document.getElementsByClassName('roomIn');
			for(var i=0;i<roomIn.length;i++){
				roomIn[i].innerText=startDate.toLocaleDateString("ja-JP");
			}

		}


		this.style.background=$orange;
		var roomOut = document.getElementsByClassName('roomOut');
		for(var i=0;i<roomOut.length;i++){
			roomOut[i].innerText=endDate.toLocaleDateString("ja-JP");
		}
		muchNight=endDate-startDate;
		muchNight=muchNight/86400000+1;



		var roomDays = document.getElementsByClassName('roomDays');

		sessionStorage.night = muchNight;

		for(var i=0;i<roomOut.length;i++){
			roomDays[i].innerText=muchNight;
		}

		$id('nowNeedSelectDate').innerText="請選擇房型";
		coloring();//上色


		getCanLiveRooms();
		dateSelected=true;
	}
}
function clearColor(){
	//顯示今天
	dayDivs = document.getElementsByClassName('dayy');
	for(var i=0;i<dayDivs.length;i++){
		if( now.getDate() == i+1 && now.getMonth()==current_month){
			dayDivs[i].style.background= $grayCCC;
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
		// console.log(muchNight);
		// console.log('同月');
		for(var i=1; i<=muchNight-2; i++ ){
			
			var a=i+start;
			document.getElementById('day'+a).style.background=$supOrange;
			// document.getElementById('day'+a).style.color='#ddd';
		}
	}
	else if(current_month==startDate.getMonth() && current_month != endDate.getMonth() ){
		// console.log('不同月起始日');
		// console.log('dds='+dds.length);	
		var start=startDate.getDate();
		// console.log('start='+start);
		for( i=1; i<=dds.length-start ; i++ ){
			var aa=i+start;
			// console.log('aa:'+aa);
			document.getElementById('day'+aa).style.background=$supOrange;
		}
	}
	else if(current_month != startDate.getMonth() && current_month == endDate.getMonth() ){
		// console.log('不同月結束日');
		// console.log('dds='+dds.length);	
		var end=endDate.getDate();
		// console.log('end='+end);
		for( i=1; i<end; i++ ){
			document.getElementById('day'+i).style.background=$supOrange;
		}
	}

}

function coloringStarEnd(){
	if(current_month==startDate.getMonth()){
		document.getElementById('day'+startDate.getDate()).style.background=$orange;
	}
	if(current_month==endDate.getMonth()){
		document.getElementById('day'+endDate.getDate()).style.background=$orange;
	}
}

	
window.addEventListener('load',doFirst,false);

$(document).ready(function(){
	
	$('#submitOrder').click(function(){
		serviceInArray();
	});
	
	
	sessionStorage.totalMoney=0;
	sessionStorage.removeItem("roomStyle");
	sessionStorage.removeItem("petName");
	sessionStorage.removeItem("petSex");
	sessionStorage.removeItem("dogId");
	sessionStorage.removeItem("dog_size");
	sessionStorage.removeItem("dogAge");
	sessionStorage.removeItem("night");
	sessionStorage.removeItem("dogSize");
	sessionStorage.removeItem("pet_no");


	sessionStorage.personality='活潑';
	sessionStorage.mom = 'Amy';


	ahref = 1;
	nowSection=1;//現在的頁
	SoapBubbleMachineNumber1='';
	SoapBubbleMachineNumber2='';
	SoapBubbleMachineNumber3='';
	totalMoney=0;
	roomPrice=1600;
	serviceTotal=0;
	serviceCount=0;
	selectWeight=0;
	selectAgeYear=0;
	selectAgeMonth=0;
	fadeIn_pass=false;
	dogId=1;
	dogSize="大型犬";

	$orange='#ffa800';
	$deepOrange='#b37600';
	$lightPink='#ef715a';
	$supOrange='#ff9100';
	$deepGray='#434343';
	$lightGray='#7d7d7d';
	$brown='#774720';
	$white='#ffffff';
	$bgc='#f9f7e8';
	$bRed='#EB3F4B';
	$grayCCC='#ccc';
	$black='#222';


	dateSelected = false;
	roomSelected = false;
	dogSelected =false;
	nameInput =false;
	sexSelected=false;
	ageSelected = false;
	paySelected =false;

	hasDogInfo =false;


	//近來網頁把第一個上色要做的事
  	$('.dog-first').addClass('roompic-select');
  	//預設點到大型犬
	getDog("大型犬");
	//第一步秀出來
	$('.stepDiy ul .step1').css({
		display:'inline-block'
	});

	

  	//先全部隱藏
	$('.step').css({
		display: 'none'
	});
	//只顯示第一步
	$('#bookSection1').css({
		display: 'block'
	});

	//第一步先上色
	$('.stepDiy .step1 .step-num .page-scroll').animate({
		borderColor: $deepOrange
	},1000);

	//把超大型犬字放進去
	$('.dog-size').text(dogSize);

	//total
	$('#totalMoney').text(roomPrice);
	//drop
	$('.mobile-step').draggable();
	//step的號碼
	$('#stepNum').text(ahref);
	//loacding動畫
	$('.loadingbox').delay(500).fadeOut(500);


	getMemberPet();

			//點擊狗大小，撈出資料庫相對應狗狗
			$('.kinds span').click(function(){
				var here = $(this).text();
				dogSize=here;
				getDog(here,dogId);
			});

			//如果會員有寵物，帶入
			function getMemberPet(){

	            var URLs="b-get-MevberDogs.php";
	           	var mem_no = localStorage["mem_no"];

	           
	            $.ajax({
	                url: URLs,
	                data: {mem_no},
	                type:"POST",
	                dataType:'html',

	                success: function(msg){
	                    // alert(msg);
	                    $('#mypet-select').html(msg);
	                },

	                 error:function(xhr, ajaxOptions, thrownError){ 
	                    alert(xhr.status); 
	                    alert(thrownError); 
	                 }
	            });
	            
	        }





	  		//Build Bubble Machines with the Bubble Engine ------------------------
	  		
	  		 SoapBubbleMachineNumber1 = $('fn').BubbleEngine({
	          particleSizeMin:            0,
	          particleSizeMax:            30,
	          particleSourceX:            $(window).width()/2,
	          particleSourceY:            $(window).height()/2+25,
	          particleAnimationDuration:  700,
	          particleDirection:          'center',
	          particleAnimationDuration:  700,
	          particleAnimationVariance:  500,
	          particleScatteringX:        150,
	          particleScatteringY:        100,
	          imgSource: "../images/b-heart1.png",
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

	         SoapBubbleMachineNumber2 = $('fn').BubbleEngine({
	          particleSizeMin:            50,
	          particleSizeMax:            100,
	          particleSourceX:            $(window).width()/2,
	          particleSourceY:            $(window).height()/2+50,
	          particleAnimationDuration:  700,
	          particleDirection:          'center',
	          particleAnimationDuration:  700,
	          particleAnimationVariance:  500,
	          particleScatteringX:        300,
	          particleScatteringY:        300,
	          imgSource: "../images/b-heart2.png",
	          gravity:                    -100,
	         
	        });
	        //  SoapBubbleMachineNumber3 = $('fn').BubbleEngine({
	        //   particleSizeMin:            0,
	        //   particleSizeMax:            60,
	        //   particleSourceX:            $(window).width()/2,
	        //   particleSourceY:            $(window).height()/2+150,
	        //   particleAnimationDuration:  500,
	        //   particleDirection:          'center',
	        //   particleAnimationDuration:  500,
	        //   particleAnimationVariance:  500,
	        //   particleScatteringX:        200,
	        //   particleScatteringY:        300,
	        //   imgSource: "../images/b-heart3.png",
	        //   gravity:                    -100
	         
	        // });
	        //Start Bubble Machines -----------------------------------------------
	        // SoapBubbleMachineNumber1.addBubbles(60);
	        // SoapBubbleMachineNumber2.addBubbles(3);
	        // SoapBubbleMachineNumber3.addBubbles(50);

	        


		  	


		  //點選碗彈窗
		  $('.b-bowlBox #service-total').click(function(){
		  		$('.select-service').fadeIn(0,function(){
		  			if($(window).width()>992){
		  				$('.select-service').animate({
			  				width:'63vmin'
			  			});
		  			}
		  			else{
		  				$('.select-service').animate({
			  				width:'86vmin'
			  			});
		  			}
		  			
		  		});
		  		$('.select-service .service-all').delay(100).fadeIn();		
		  });

		 
	

		//點擊狗狗種類事件上色，上字
  		$('.kinds span').click(function(){
  			$('.kinds span').removeClass('roompic-select');
  			$(this).addClass('roompic-select');
  		});
  		
  		
	

  		//選擇性別事件
  		$('.sexclick').click(function(){
  			var sex = $(this).find('svg').attr('class');
  			sex = '.'+sex;
  			$('.b-sex svg').css({
  				borderColor: 'rgba(0,0,0,0)',
  				opacity:'.5'
  			},300);
  			$(sex).animate({
  				borderColor: $supOrange,
  				opacity: '1'
  			},300);

  			$('.step_orderCheck .b-sex svg').hide();

  			var str = '.step_orderCheck '+sex;
  			$(str).delay(100).show();
  			sexSelected=true;

  			var sex_str = $(this).find('input').val();

  			sessionStorage.petSex = sex_str;
  			
  			checkInfo();
  		});

  		//選擇體重
  		// $('.pet-weight .add').click(function(){
  		// 	selectWeight++;
  		// 	$('.pet-weight .b-select-weight').text(selectWeight);
  		// });
  		// $('.pet-weight .less').click(function(){
  		// 	selectWeight--;
  		// 	if (selectWeight<0) {
  		// 		selectWeight=0;
  		// 	}
  		// 	$('.pet-weight .b-select-weight').text(selectWeight);
  		// });

  		//選擇年齡
  		//年
  		$('.pet-age .b-dog-year .add').click(function(){
  			sessionStorage.dogAge++;
  			$('.b-select-year').text(sessionStorage.dogAge);
  			ageSelected=true;
  			checkInfo();
  		});
  		$('.pet-age .b-dog-year .less').click(function(){
  			sessionStorage.dogAge--;
  			if(sessionStorage.dogAge<=0){
  				sessionStorage.dogAge=0;
  			}
  			ageSelected=true;
  			checkInfo();
  			$('.b-select-year').text(sessionStorage.dogAge);

  		});


  		//月
  		// $('.pet-age .b-dog-month .add').click(function(){
  		// 	selectAgeMonth++;
  		// 	if(selectAgeMonth>12){
  		// 		selectAgeMonth=12;
  		// 	}
  		// 	$('.pet-age .month .b-select-month').text(selectAgeMonth);
  		// });

  		// $('.pet-age .b-dog-month .less').click(function(){
  		// 	selectAgeMonth--;
  		// 	if(selectAgeMonth<0){
  		// 		selectAgeMonth=0;
  		// 	}
  		// 	$('.pet-age .month .b-select-month').text(selectAgeMonth);
  		// });

  		//寵物姓名
  		$('#petNameInput').change(function(){
  			var keyupStr = $(this).val();
  			$('.petName').text(keyupStr);
  			nameInput=true;
  			sessionStorage.petName=keyupStr;

  			checkInfo();
  		});

  		//帶入狗資料
  		$('.again').click(function(){
  			$(this).css({
  				display:'none'
  			});
  			$('.mypet').fadeIn(300);
  		});

  		//選擇下拉式選單的狗狗後
  		$('.mypet select').change(function(){
  			var optiontext= $(this).find(":selected").text();
			var optionval= $(this).find(":selected").val();
  			$('#petNameInput').val(optiontext);
  			$('.mypet').css({
  				display:'none'
  			});
  			$('.again').fadeIn(300);
  			$('.petName').text(optiontext);
  			nameInput=true;
  			checkInfo();

  			getThedog(optionval);

  			//鎖input
  			$('#petNameInput').prop( "disabled", true );
  		});

  		//點擊下一步
  		$('.next .page-scroll').click(function(){

  			var num = $(this).attr('href');
  			num = num.replace('#section_0','');

  			var sectionId='#bookSection'+nowSection;

  			if(num==2){//房間房型
  				if (dateSelected==true && roomSelected==true) {
  					var str = '.step'+num+' .step-bar span';
		  			var str1 = '.step'+num+' .step-num a';
		  			var str2 = '.step'+num+' .step-text';
		  			var str3 ='.step'+num;

		  			$(str3).css({
		  				display:"inline-block"
		  			});
		  			$('.stepDiy .page-scroll').css({
		  				borderColor: '#ccc'
		  			});
		  			$(str1).delay(1000).animate({
		  				backgroundColor: $supOrange,
		  				borderColor: $deepOrange
		  			},500);
					$(str).addClass('didStepBgc');


					$('.stepDiy .step-text').css({
						transform: 'scale(1)',
						fontWeight: '400'
		  			});

					$(str2).animate({
						transform: 'scale(1.2)',
						fontWeight: '700'
					}),500;

					//這一步隱藏
					$('#bookSection'+ nowSection ).css({
						display: 'none'
					});

					$('#bookSection'+num).slideDown(500);
						nowSection = num;

					$(sectionId).find('.step-info-p p').css({
  						opacity:0
  					});
  				}
  				else{
  					$(sectionId).find('.step-info-p p').css({
  						opacity:1
  					});
  				}
  			}
  			else if(num==3){//狗的資料
  				if (dogSelected==true && nameInput==true && sexSelected==true && ageSelected==true) {
  					var str = '.step'+num+' .step-bar span';
		  			var str1 = '.step'+num+' .step-num a';
		  			var str2 = '.step'+num+' .step-text';
		  			var str3 ='.step'+num;

		  			$(str3).css({
		  				display:"inline-block"
		  			});
		  			$('.stepDiy .page-scroll').css({
		  				borderColor: '#ccc'
		  			});
		  			$(str1).delay(1000).animate({
		  				backgroundColor: $supOrange,
		  				borderColor: $deepOrange
		  			},500);
					$(str).addClass('didStepBgc');


					$('.stepDiy .step-text').css({
						transform: 'scale(1)',
						fontWeight: '400'
		  			});

					$(str2).animate({
						transform: 'scale(1.2)',
						fontWeight: '700'
					}),500;

					//這一步隱藏
					$('#bookSection'+ nowSection ).css({
						display: 'none'
					});

					$('#bookSection'+num).slideDown(500);
						nowSection = num;

					$(sectionId).find('.step-info-p p').css({
  						opacity:0
  					});
  				}
  				else{
  					$(sectionId).find('.step-info-p p').css({
  						opacity:1
  					});
  				}
  			}

  			else if(num==7){//付款
  				if (paySelected==true) {
	  					var str = '.step'+num+' .step-bar span';
			  			var str1 = '.step'+num+' .step-num a';
			  			var str2 = '.step'+num+' .step-text';
			  			var str3 ='.step'+num;

			  			$(str3).css({
			  				display:"inline-block"
			  			});
			  			$('.stepDiy .page-scroll').css({
			  				borderColor: '#ccc'
			  			});
			  			$(str1).delay(1000).animate({
			  				backgroundColor: $supOrange,
			  				borderColor: $deepOrange
			  			},500);
						$(str).addClass('didStepBgc');


						$('.stepDiy .step-text').css({
							transform: 'scale(1)',
							fontWeight: '400'
			  			});

						$(str2).animate({
							transform: 'scale(1.2)',
							fontWeight: '700'
						}),500;

						//這一步隱藏
						$('#bookSection'+ nowSection ).css({
							display: 'none'
						});

						$('#bookSection'+num).slideDown(500);
							nowSection = num;

						$('.stepDiy').css({
							display:'none'
						});
						$('#mobile-step').css({
							display:'none'
						});
						$('.payanimation').css({
							display:'block'
						});

						$('#cssload-contain').delay(800).fadeOut();

						$('.payanimation .check-ok .fa').delay(2500).addClass('checkmm');
						$('.payanimation .check-ok h1').delay(1500).animate({
							opacity:'1'
						});

						$('.payanimation').delay(3300).fadeOut();

						$(sectionId).find('.step-info-p p').css({
	  						opacity:0
	  					});


	  				}

  				else{

	  					$(sectionId).find('.step-info-p p').css({
	  						opacity:1
	  					});
  				}
  			}

  			else{
  					var str = '.step'+num+' .step-bar span';
		  			var str1 = '.step'+num+' .step-num a';
		  			var str2 = '.step'+num+' .step-text';
		  			var str3 ='.step'+num;

		  			$(str3).css({
		  				display:"inline-block"
		  			});
		  			$('.stepDiy .page-scroll').css({
		  				borderColor: '#ccc'
		  			});
		  			$(str1).delay(1000).animate({
		  				backgroundColor: $supOrange,
		  				borderColor: $deepOrange
		  			},500);
					$(str).addClass('didStepBgc');


					$('.stepDiy .step-text').css({
						transform: 'scale(1)',
						fontWeight: '400'
		  			});

					$(str2).animate({
						transform: 'scale(1.2)',
						fontWeight: '700'
					}),500;

					//這一步隱藏
					$('#bookSection'+ nowSection ).css({
						display: 'none'
					});

					$('#bookSection'+num).slideDown(500);
						nowSection = num;
  			}

  				
		

  		});

  		//點上方的step 跳轉步驟
		$('.stepDiy .page-scroll').click(function(){
			
			ahref =$(this).attr('href');
	  		ahref = ahref.replace("#section_0", "");

	  		$('#stepNum').text(ahref);
	
			if(ahref=="7"){
				$('.stepDiy').css({
					display:'none'
				});
				$('#mobile-step').css({
					display:'none'
				});
				$('.payanimation').css({
					display:'block'
				});

				$('#cssload-contain').delay(800).fadeOut();

				$('.payanimation .check-ok .fa').delay(2500).addClass('checkmm');
				$('.payanimation .check-ok h1').delay(1500).animate({
					opacity:'1'
				});

				$('.payanimation').delay(3300).fadeOut();


			}	

			//這一步隱藏
			$('#bookSection'+ nowSection ).css({
				display: 'none'
			});

			//下一步出現
			$('#bookSection'+ahref).slideDown(500);
				nowSection = ahref;	
			});
  	

	  	//點關閉燈箱
	  	$('.closeLightBox').click(function(){
	  		$('.lightbox-content').fadeOut(0,function(){
	  			$('.lightbox-box').css({
		  			width: '0px',
		  			height: '0px',
		  			borderRadius: '50%',
		  			
		  		});
		  		$('.lightbox').fadeOut(800);
	  		});

	  		
	  	});


	  	
		
		//b-btn 純放大縮小
		$('.b-btn').click(function(){
			$(this).addClass('btnScale');
  			var e =this;
  			var t =setTimeout(function(){
  				$(e).removeClass('btnScale');
  			},500);
		});

		


		//pay
		$('.pay-method').click(function(){
			$('.pay-method').css({
				opacity:0.3
			});
			$(this).animate({
				opacity:1
			},300);

			paySelected=true;
		});




	//<767 平板+手機
  	if($(window).width()<=767){

  		//選單第一個字變大 這要轉90度
		$('.stepDiy .step1 .step-text').animate({
			transform: 'scale(1.2)',
			transform: 'rotate(-90deg)',
			fontWeight: 'bold'
		});
		//轉90度
		$('.stepDiy .step-text').css({
			transform: 'rotate(-90deg)'
		});

		//點上方步驟列的事件
  		$('.stepDiy .page-scroll').click(function(){
  			var num = $(this).attr('href');
  			num = num.replace('#section_0','');

  			var str = '.stepDiy .step'+num+' .step-num a';
  			var str2 = '.stepDiy .step'+num+' .step-text';
  			var str3 = '.stepDiy .step'+num+' .step-num';

  			//目前的邊框上紅色
  			$('.stepDiy .page-scroll').animate({
  				borderColor: '#ccc'
  			});
  			$(str).animate({
  				borderColor: $deepOrange
  			},1000);

  			$('.stepDiy .step-text').animate({
  				transform: 'scale(1)',
  				transform: 'rotate(-90deg)',
				fontWeight: '400'
  			});

			$(str2).animate({
				transform: 'scale(1.2)',
				transform: 'rotate(-90deg)',
				fontWeight: '700'
			}),500;

  		});

  		var mobileStepClick=0;
	
 		// tinycircleslider
		 $("#rotatescroll").tinycircleslider({
			        dotsSnap : true
			    ,   radius   : 130
			    ,   dotsHide : false
		});
		// tinycircleslider

  		

		//手機麵包屑顯示
	  	$('#mobile-step').click(function(){
	  		if(mobileStepClick==0){
	  			//選單出現
	  			mobileStepClick++;
	  			$('.stepDiy').animate({ 
	  				left: '-175px'
	  			},800);

	  			$('#UpLeft').removeClass('rightUpUp');
	  			$('#UpRight').removeClass('leftUpUp');

	  			$('#UpLeft').addClass('leftUpUp');
	  			$('#UpRight').addClass('rightUpUp');

	  			$('.step').animate({
	  				left: '190px'
	  			});
	  		}
	  		else{
	  			//收合選單
	  			mobileStepClick=0;
	  			
	  			$('.stepDiy').animate({ 
	  				left: '-500px'
	  			},500);


	  			$('#UpLeft').removeClass('leftUpUp');
	  			$('#UpRight').removeClass('rightUpUp');

	  			$('#UpLeft').addClass('rightUpUp');
	  			$('#UpRight').addClass('leftUpUp');


	  			$('.step').animate({
	  				left: '0px'
	  			});
	  		}
	  		
	  	});

	  	//mStepA 按完之後收起來
	  	$('.mStepA').click(function(){
	  		mobileStepClick=0;
	  			

	  		//填上step的數字
	  		ahref =$(this).attr('href');
	  		ahref = ahref.replace("#section_0", "");
	  		// $('#stepNum').text(ahref);

	  		//要回去方向
	  		$('#UpLeft').removeClass('leftUpUp');
	  		$('#UpRight').removeClass('rightUpUp');

	  		$('#UpLeft').addClass('rightUpUp');
	  		$('#UpRight').addClass('leftUpUp');

	  		$('.stepDiy').animate({ 
	  				left: '-400px'
	  			},500);
	  		$('.step').animate({
	  			left: '0px'
	  		});



	  	});
	  	

		//按了下一步,箭頭方向
		$('.page-scroll').click(function(){
			//先換step的字
	  		

	  		$('#UpLeft').removeClass('leftUpUp');
	  		$('#UpRight').removeClass('rightUpUp');

	  		$('#UpLeft').addClass('rightUpUp');
	  		$('#UpRight').addClass('leftUpUp');
			//收合選單
	  			mobileStepClick=0;
	  			
	  			$('.stepDiy').animate({ 
	  				left: '-400px'
	  			},500);


	  			$('.step').animate({
	  				left: '0px'
	  			},500);

		});

		

	  
 	

	}//<767



	//>767 小桌機 大桌機
  	if($(window).width()>767){
  		
	//選單第一個字變大
	$('.stepDiy .step1 .step-text').animate({
		transform: 'scale(1.2)',
		fontWeight: '700'
	});

	//點上方步驟列的事件/ 填字上色
	$('.stepDiy .page-scroll').click(function(){
		var num = $(this).attr('href');
		num = num.replace('#section_0','');

		var str = '.stepDiy .step'+num+' .step-num a';
		var str2 = '.stepDiy .step'+num+' .step-text';
		var str3 = '.stepDiy .step'+num+' .step-num';

		//目前的邊框上色
		$('.stepDiy .page-scroll').animate({
			borderColor: '#ccc'
		});
		$(str).animate({
			borderColor: $deepOrange
		},1000);

		$('.stepDiy .step-text').animate({
			transform: 'scale(1)',
			fontWeight: '400'
		});

		$(str2).animate({
			transform: 'scale(1.2)',
			fontWeight: '700'
		}),500;

	});

  		

		// $('a.page-scroll').click(function() {
	 //      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
	 //          var target = $(this.hash);
	 //          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	 //          if (target.length) {
	 //              $('html,body').animate({
	 //                  scrollTop: target.offset().top
	 //              }, 1000);
	 //              return false;
	 //          }
	 //      }
	 //  	});
	  	// console.log('nav ok');

	





       // tinycircleslider
		 $("#rotatescroll").tinycircleslider({
			        dotsSnap : true
			    ,   radius   : 150
			    ,   dotsHide : false
		});
		// tinycircleslider




  	}//>767

  			


	//一開始先把防煙風格印出來
  	getRoomStyle(1);
  	//一開始先把第一間房間印出來
  	getRoom(1);



	
  		
  		
});//readyJQ

	function checkInfo(){
  			if(fadeIn_pass!=true){
  				//輸入完資訊 被景色往另一邊
		  		if(nameInput==true && sexSelected==true && ageSelected ==true){
		  			$('.select-dog .backColor').fadeOut();
		  			$('.dogdog .backColor').delay(500).fadeIn();
		  			fadeIn_pass=true;
		  		}
  			}
  			
  		}

  	//AJAX----------------------------

  	//--------------------------------
  

  	function showRoomStyle(jsonStr){

	    var _roomStyle = JSON.parse(jsonStr);//從 php 傳回來的json字串 轉成json物件

	    $id("room_styleIn").innerHTML = _roomStyle;//將字串直接放到div

	    //註冊事件
	    //選擇房間風格
		$('.styleBox .styles').click(function(){
			$('.roomStyle-selected').text($(this).text());

			$('.styles').removeClass('roompic-select');
  			$(this).addClass('roompic-select');
  			
		  	roomSelected=true;
		});

		//b-btn 房間印上狗圖
		$('.b-btn-room').click(function(){
			$(this).addClass('btnScale');
  			var e =this;
  			var t =setTimeout(function(){
  				$(e).removeClass('btnScale');
  			},500);
  			$('.styles .footprint').removeClass('footprint-add');
  			$(this).find('.footprint').addClass('footprint-add');
		});

		//點選房間風格，撈出資料庫相對應的房間
	  	$('.styleBox .styles').click(function(){
	  		var roomVal = $(this).find('.rooms').val();
	  		//房間編號

	  		sessionStorage.roomStyle=roomVal;



			var roomPrice = $(this).find('.room-price').val();
			//房間價錢



			roomPrice=$('#roomPrice').text();
			sessionStorage.totalMoney=parseInt(roomPrice)+parseInt(sessionStorage.totalMoney);
		
	  		getRoom(roomVal);//從這撈房間資訊
	  	});

	}

	function getRoomStyle(rsID){

	  var _roomstyleId= rsID;
	  var xhr = new XMLHttpRequest();
	  xhr.onreadystatechange=function (){
	    if( xhr.readyState == 4){
		     if( xhr.status == 200 ){
			  //modify here
	        // alert( xhr.responseText);
	        showRoomStyle( xhr.responseText);//執行函式列印出資料
		     }else{
		        alert( xhr.status );
		     }
		 }
	  }
	  var url = "b-rooms.php?roomstyleVal="+ _roomstyleId;
	  xhr.open("Get", url, true);
	  xhr.send( null );
	}

  	//--------------------------------



  	//-----------------------------------------------

  	function showRoom(jsonStr){
	    var _roomInfo = JSON.parse(jsonStr);//從 php 傳回來的json字串 轉成json物件
	    $id("_roomInfo").innerHTML = _roomInfo;//將字串直接放到div

	    //註冊事件

	    //第一個小圖邊框上色
	  	$('.roomPic .first').animate({
	  		borderColor: $bRed
	  	},0);
	    //點小房間圖，換大房間圖
	  	$('.pic-small img').click(function(){
	  		//清除被選到顏色
	  		$('.pic-small img').animate({
	  			borderColor: $orange
	  		},100);
	  		//被選到上色
	  		$(this).animate({
	  			borderColor: $bRed
	  		},100);
	  		$('#roomPicBig').attr('src',$(this).attr('src'));
	  	});
	    
	}
	function getRoom(Id){
	var _roomId = Id;
	  var xhr = new XMLHttpRequest();
	  xhr.onreadystatechange=function (){
	    if( xhr.readyState == 4){
		     if( xhr.status == 200 ){
			  //modify here
	        // alert( xhr.responseText);
	        showRoom( xhr.responseText);//執行函式列印出資料
		     }else{
		        alert( xhr.status );
		     }
		 }
	  }
	  var url = "b-roomStyle.php?roomstyle=" + _roomId;
	  xhr.open("Get", url, true);
	  xhr.send( null );
	}
 	//-------------------------------------------------





  	function showDog(jsonStr){

	    var dog = JSON.parse(jsonStr);//從 php 傳回來的json字串 轉成json物件
	   
	    $id("dogishere").innerHTML = dog;//將字串直接放到div

	    if(hasDogInfo==true){

	    }
	    else{
	    	 //註冊事件
		    //點擊狗狗事件上色，上字
	  		$('#dogsUl .dogk').click(function(){

	  			$('#dogsUl .dogk').animate({
	  				opacity:.5
	  			},100);
	  			$(this).animate({	
	  				opacity: 1
	  			},100);
	  			$(this).find('.img-box').addClass('imgScale');
	  			var e =this;
	  			var t =setTimeout(function(){
	  				$(e).find('.img-box').removeClass('imgScale');
	  			},500);

	  			$('#dogsUl .dogk .footprint').removeClass('footprint-add');
	  			$(this).find('.footprint').addClass('footprint-add');

	  			
	  			//填上狗種類的字
	  			var dogKindName = $(this).find('p').text();
	  			$('.dog-kind-name').text(dogKindName);
	  			//換圖片
				var imgSrc = $(this).find('img').attr('src');

	  			$('.dogKind-img').attr('src',imgSrc);
				
	  			//被選到的狗ID
	  			dogId = $(this).find('input').val();

	  			sessionStorage.dogId = dogId;

	  			$('.dog-size').text(dogSize);
	  			sessionStorage.dogSize = dogSize;
	  			
	  			dogSelected=true;
	  			getService();
	  			
	  			
	  		});
	    }
	   
  		// dogSelectedCheck();


		

	}
	function getDog(here,Id){

	  var xhr = new XMLHttpRequest();
	  xhr.onreadystatechange=function (){
	    if( xhr.readyState == 4){
		     if( xhr.status == 200 ){
			  //modify here
	        // alert( xhr.responseText);
	        showDog( xhr.responseText);//執行函式列印出資料
		     }else{
		        alert( xhr.status );
		     }
		 }
	  }
	  var url = "b-dogSpecies.php?dogSize=" + here + "&dogId=" + Id;
	  xhr.open("Get", url, true);
	  xhr.send( null );
	}

	//-----------------------------------------------------------------
	//服務動態產生
	
	function showService(jsonStr){

	    var service = JSON.parse(jsonStr);//從 php 傳回來的json字串 轉成json物件
	    $id("_addBox").innerHTML = service;//將字串直接放到div

	    $id("_selectBox").innerHTML ="<div class='closeLightBox'><i class='fa fa-plus' aria-hidden='true'></i></div>"+service;//將字串直接放到div



	    //註冊事件
	    // 新增服務
		  $('.add-box .add-icon').click(function(){
		  		var idNameT = $(this).attr("id");//上面的
		  		var idNameB = idNameT;//下面的

		  		var txt1 =$(this).siblings('p').find('.b-service-txt').text();
		  		var pCss =$(this).siblings('p').attr('class');

		  		//服務id
		  		var sId = $(this).siblings('.input-service-id').val();
		  		// alert(sId);
		  		//服務價錢
		  		var sPrice = $(this).siblings('.input-service-price').val();
		  		sessionStorage.totalMoney = parseInt(sessionStorage.totalMoney)+parseInt(sPrice);


		  		var span = document.createElement('span');
		  		var input = document.createElement('input');

		  		input.setAttribute("class",'disNoneInput');
		  		input.type	= 'hidden';
		  		input.value = sId;



				span.setAttribute("class",'serviceSelected '+pCss);
				span.innerText=txt1;

				span.appendChild(input);
				$id('service-added').appendChild(span);

		  		idNameB = '.selected-box .'+idNameB;


		  		idNameT = '.add-box .'+idNameT;
		  		$(idNameT).addClass('add-service');
		  		$(idNameB).fadeIn();


		  		var t_none = setTimeout(function(){
		  			$(idNameT).fadeOut();
		  		},50);
		  		
		  		//新增服務的效果
		  		$('.much-service').addClass('text-effect');

		  		serviceCount++;
		  		$('#service-total').text(serviceCount);

		  		var t = setTimeout(removeTextEffectClass,500);

		  		if(serviceCount>0){
		  			$('.bowl-food').animate({
		  				top:'-30px',
		  				opacity: '1'
		  			});
		  		}
		  		else{
		  			$('.bowl-food').animate({
		  				top:'-10px',
		  				opacity: '0'
		  			});
		  		}


		  		
		  });
		  //移除服務要把class移除
		  function removeTextEffectClass(){
		  	$('.much-service').removeClass('text-effect');
		  }



		  //移除服務
		  $('.selected-box .add-icon').click(function(){

		  		var idNameB = $(this).attr("id");//下面的
		  		var idNameT = idNameB;//上面的


		  		var sPrice = $(this).siblings('.input-service-price').val();
		  		sessionStorage.totalMoney = parseInt(sessionStorage.totalMoney)-parseInt(sPrice);


		  		idNameB = '.selected-box .'+idNameB;


		  		idNameT = '.add-box .'+idNameT;

		  		$(idNameT).fadeIn('fast');
		  		$(idNameT).removeClass('add-service');


		  		$(idNameB).fadeOut();

		  		serviceCount--;
		  		$('#service-total').text(serviceCount);


		  		if(serviceCount>0){
		  			$('.bowl-food').animate({
		  				top:'-30px',
		  				opacity: '1'
		  			});
		  		}
		  		else{
		  			$('.bowl-food').animate({
		  				top:'0px',
		  				opacity: '0'
		  			});
		  		}

		  		var pCss =$(this).siblings('p').attr('class');


		  		$('#service-added span').remove('.'+pCss);

		  });

		   //關閉碗的燈箱
		  $('.select-service .closeLightBox').click(function(){
		  		$('.select-service .service-all').css({
		  			display:"none"
		  		});
		  		$('.select-service').delay(100).animate({
		  			width: "0"
		  		},function(){
		  			$(this).fadeOut();
		  		});
		  });

		  if($(window).width()<=767){
		  	//看服務燈箱(手機)
		  	$('.b-service .service-box p').click(function(){
		  		var sId = $(this).siblings("input").val();
			  	getServiceLightBox(sId);
		  		$('.service-lightbox').slideDown(0,function(){
		  			$('.lightbox-box').css({
		  				width: '300px',
		  				height: '500px',
		  				borderRadius: '15px'

		  				
		  			});
		  		});
		  		$('.lightbox-content').delay(800).fadeIn(500);

		  	});

		  }//if
		  else{	  	
		        //看服務燈箱(桌機)
			  	$('.b-service .service-box p').click(function(){
			  		var sId = $(this).siblings("input").val();
			  		getServiceLightBox(sId);
			  		$('.service-lightbox').slideDown(0,function(){
			  			$('.lightbox-box').css({
			  				width: '400px',
			  				height: '550px',
			  				borderRadius: '15px'
			  				
			  			});
			  		});
			  		$('.lightbox-content').delay(800).fadeIn(500);
			  	});
			  	
		  }
		 //新增服務愛心
	  	 $('.add-box .add-icon').click(function(){
  			SoapBubbleMachineNumber1.addBubbles(10);
	        SoapBubbleMachineNumber2.addBubbles(3);
	        // SoapBubbleMachineNumber3.addBubbles(50);

	        var t = setTimeout(closeHeart,1); 
  		});

	  	 //關掉
	  	  function closeHeart(){
	  	 	SoapBubbleMachineNumber1.removeBubbles();
      	    SoapBubbleMachineNumber2.removeBubbles();
         	// SoapBubbleMachineNumber3.removeBubbles();
	  	 }
	  	 // getService();
		  	


	}
	function getService(){
	  var xhr = new XMLHttpRequest();
	  xhr.onreadystatechange=function (){
	    if( xhr.readyState == 4){
		     if( xhr.status == 200 ){
			  //modify here
	        // alert( xhr.responseText);
	        showService( xhr.responseText);//執行函式列印出資料
		     }else{
		        alert( xhr.status );
		     }
		 }
	  }
	  
	  var url = "b-service.php?dogSize="+dogSize;
	  xhr.open("Get", url, true);
	  xhr.send( null );
	}

	//------------------------------------
	//燈箱資料
	function showServiceLightBox(jsonStr){
	    var _serviceInfo = JSON.parse(jsonStr);//從 php 傳回來的json字串 轉成json物件
	    // alert(_serviceInfo);
	    $id("_serviceInfo").innerHTML = _serviceInfo;//將字串直接放到div

	    //註冊事件
	   
	    
	}
	function getServiceLightBox(Id){
	var _serviceId = Id;
	  var xhr = new XMLHttpRequest();
	  xhr.onreadystatechange=function (){
	    if( xhr.readyState == 4){
		     if( xhr.status == 200 ){
			  //modify here
	        // alert( xhr.responseText);
	        showServiceLightBox( xhr.responseText);//執行函式列印出資料
		     }else{
		        alert( xhr.status );
		     }
		 }
	  }
	  var url = "b-serviceLightBox.php?serviceId=" + _serviceId+"&dogSize="+dogSize;
	  xhr.open("Get", url, true);
	  xhr.send( null );
	}
	//------------------------------

//------------------------------
	//選擇日期後去篩選房間
	function showCanLiveRooms(jsonStr){
	    var _canLiveRooms = JSON.parse(jsonStr);//從 php 傳回來的json字串 轉成json物件
	    // alert(_canLiveRooms);
	    $id("room_styleIn").innerHTML = _canLiveRooms;//將字串直接放到div

	    

	    //註冊事件
	    //選擇房間風格
		$('.styleBox .styles').click(function(){
			$('.roomStyle-selected').text($(this).text());

			$('.styles').removeClass('roompic-select');
  			$(this).addClass('roompic-select');
  			roomPrice=$('#roomPrice').text();
		  	roomSelected=true;
		});

		//b-btn 房間印上狗圖
		$('.b-btn-room').click(function(){
			$(this).addClass('btnScale');
  			var e =this;
  			var t =setTimeout(function(){
  				$(e).removeClass('btnScale');
  			},500);
  			$('.styles .footprint').removeClass('footprint-add');
  			$(this).find('.footprint').addClass('footprint-add');
		});

		//點選房間風格，撈出資料庫相對應的房間
	  	$('.styleBox .styles').click(function(){
	  		var roomVal = $(this).find('input').val();
	  		getRoom(roomVal);//從這撈房間資訊
	  	});

	  	
	   
	    
	}
	function getCanLiveRooms(){
	var start_y = startDate.getFullYear();
	var start_m = startDate.getMonth()+1;
	var start_d = startDate.getDate();

	var end_y = endDate.getFullYear();
	var end_m = endDate.getMonth()+1;
	var end_d = endDate.getDate();


	 var xhr = new XMLHttpRequest();
	 xhr.onreadystatechange=function (){
	    if( xhr.readyState == 4){
		     if( xhr.status == 200 ){
			  //modify here
	        // alert( xhr.responseText);
	        showCanLiveRooms(xhr.responseText);//執行函式列印出資料
		     }else{
		        alert( xhr.status );
		     }
		 }
	  }

	  var url = "b-CanLiveRooms.php?start_y=" + start_y + "&start_m=" + start_m + "&start_d=" + start_d + "&end_y=" + end_y + "&end_m=" + end_m + "&end_d=" + end_d;
	  xhr.open("Get", url, true);

	  xhr.send( null );
	}

	//------------------------------

	//---------------------------
	//寫進訂單資料
	//----------------------


	//------------------------
	
	
	function serviceInArray(){

            var URLs="b-insert-orderList.php";

            var mem_no = localStorage["mem_no"];
            var service = [];
            var dog_room = sessionStorage.roomStyle;
            var dog_name = sessionStorage.petName;
            var dog_sex = sessionStorage.petSex;
            var dog_id= sessionStorage.dogId;
            var dog_size = sessionStorage.dogSize;
            var dog_age = sessionStorage.dogAge;
            var much_night = sessionStorage.night;
            var dog_personality = sessionStorage.personality;
            var dog_mom = sessionStorage.mom
            var total = sessionStorage.totalMoney;

            var start_y = startDate.getFullYear();
			var start_m = startDate.getMonth()+1;
			var start_d = startDate.getDate();

			var end_y = endDate.getFullYear();
			var end_m = endDate.getMonth()+1;
			var end_d = endDate.getDate();

			var put_in_pet_no = sessionStorage.pet_no;

			console.log(put_in_pet_no);


            $('#service-added .serviceSelected  input').each(function(i,itme){
            		service.push($(itme).val());
            });
           
            $.ajax({
                url: URLs,
                data: {put_in_pet_no,mem_no,service,dog_sex,dog_room,dog_name,dog_id,dog_size,dog_age,much_night,dog_personality,dog_mom,start_y,start_m,start_d,end_y,end_m,end_d,total},
                type:"POST",
                dataType:'html',

                success: function(msg){
                    // alert(msg);
                },

                 error:function(xhr, ajaxOptions, thrownError){ 
                    alert(xhr.status); 
                    alert(thrownError); 
                 }
            });
            
        }
	//------------------------

	//如果會員選擇了自己的狗狗，帶入狗狗資料
	function getThedog(pet_no){

		var URLs="b-getTheDog.php";
		
		$.ajax({
			url: URLs,
			data: {pet_no},
			type:"POST",
			dataType:'JSON',
			async: false,

			success: function(msg){
				 		// var mess = JSON.parse(msg);
						
						var returnArry = msg;
						sessionStorage.pet_no = returnArry[0].pet_no;//寵物編號
						
						//狗狗名字
						$('#petNameInput').val(returnArry[0].pet_name);
						sessionStorage.petName = returnArry[0].pet_name;
						nameInput=true;
						
						//寵物年齡
						var today = new Date();
						var age = parseInt(today.getFullYear())-parseInt(returnArry[0].pet_age);
						$('.b-select-year').text(age);
						sessionStorage.dogAge = age;
						ageSelected=true;
						


						if(msg[0].pet_sex=='f'){
							//男生
							$('.b-sex svg').css({
								borderColor: 'rgba(0,0,0,0)',
			  					opacity:'.5'
							});
							$('.pet-boy').animate({
				  				borderColor: $supOrange,
				  				opacity: '1'
				  			},300);
				  			$('.step_orderCheck .b-sex svg').hide();

				  			$('.step_orderCheck .pet-boy').delay(100).show();
				  			sexSelected=true;
				  			

						}
						else{
							//女生
							$('.b-sex svg').css({
								borderColor: 'rgba(0,0,0,0)',
			  					opacity:'.5'
							});
							$('.pet-girl').animate({
				  				borderColor: $supOrange,
				  				opacity: '1'
				  			},300);
				  			$('.step_orderCheck .b-sex svg').hide();

				  			$('.step_orderCheck .pet-girl').delay(100).show();
				  			sexSelected=true;
				  			

						}

						//寵物個性
						sessionStorage.personality = returnArry[0].pet_personality;
						$('.pet-personality').text(sessionStorage.personality);

						if(sessionStorage.personality=='活潑'){
			                sessionStorage.mom = 'Amy';
			                $('.momName-selectedy').text(sessionStorage.mom);
			            }
			            else if(sessionStorage.personality=='黏人'){
			                sessionStorage.mom = 'Sara';
			                $('.momName-selected').text(sessionStorage.mom);
			            }
			            else if(sessionStorage.personality=='害羞'){
			                sessionStorage.mom = 'Judy';
			                $('.momName-selected').text(sessionStorage.mom);
			            }
			            else if(sessionStorage.personality=='調皮'){
			                sessionStorage.mom = 'Mary';
			                $('.momName-selected').text(sessionStorage.mom);
			            }


						

						//寵物種類
						getMemberPetSpecies();
						function getMemberPetSpecies(){
				            var URLs="b-getMemberPetSpecies.php";
				            var  mypet_dog_id = returnArry[0].dog_no;

				           
				            $.ajax({
				                url: URLs,
				                data: {mypet_dog_id},
				                type:"POST",
				                dataType:'text',

				                success: function(msg){
				                	var mess = JSON.parse(msg);
				           
				                	//填上狗狗大小的字
				                	dogSize = mess["dog_size"];
				                	sessionStorage.dogSize = mess["dog_size"];
				                	$('.dog-size').text(mess["dog_size"]);
				                	console.log(dogSize);
				                	getService();
				                	//有大小才有服務
				                	
				                	//填上狗種類的名稱
				                	$('.dog-kind-name').text(mess["dog_name"]);


				                	//換上狗種的圖片
				                	var imgSrc ="images/dog-species/"+mess["dog_img"];
				                	$('.dogKind-img').attr('src',imgSrc);


				                    // alert(msg);
				                    // console.log(msg);
				                    hasDogInfo=true;
				                    getDog(mess["dog_size"],mypet_dog_id);
				                    //取消註冊事件
				                    $('.sexclick').unbind();
				                    $('.kinds span').unbind();
				                    $('#dogsUl .dogk').unbind();
				                    $('.pet-age .b-dog-year .add').unbind();
				                    $('.pet-age .b-dog-year .less').unbind();
				                    dogSelected =true;


				                },

				                 error:function(xhr, ajaxOptions, thrownError){ 
				                    alert(xhr.status); 
				                    alert(thrownError); 
				                 }
				            });
				            
				        }





	                },

	                error:function(xhr, ajaxOptions, thrownError){ 
	                	alert(xhr.status); 
	                	alert(thrownError); 
	                }
	            });

	}