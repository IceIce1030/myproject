function doFirst(){
	

}//dofirst
function $id(id){
		var getid=document.getElementById(id);
		return getid;
}
	
window.addEventListener('load',doFirst,false);

$().ready(function(){
	
	
	$('.question').click(function(){
		$(this).find('.content').stop(true, false).slideToggle(500);
		var a = $(this).find('.linebar').width();
		if(a==0){
			$(this).find('.linebar').animate({
				width:'100%'
			},500);
		}
		else{
			$(this).find('.linebar').animate({
				width:'0'
			},500);
		}
	});

	//宣告一個ScrollmMagic 物件
	var controller = new ScrollMagic.Controller();
	//動畫動作
	var wp = new TimelineMax().staggerFromTo(".section1",0.5,{
		 x: -100,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
    }, 0.1);;

	
	var  scene = new ScrollMagic.Scene({
		//debug 檢查 滾動觸碰到的點
		triggerElement:"#trigger_1",
		reverse:true,//使否會再跑一次動畫
		duration: 200,
		offset:'100px',//距離trigger點的距離
  		
	})
	.setTween(wp)
	// .addIndicators({
	// 	name:"#trigger_1"//自己命名錨點名稱
	// })// add indicators (requires plugin)  檢查點可以不用
	.addTo(controller);



	//宣告一個ScrollmMagic 物件
	var controller = new ScrollMagic.Controller();
	//動畫動作
	var wp = new TimelineMax().staggerFromTo(".section2",0.5,{
		 x: 100,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
    }, 0.1);;

	
	var  scene = new ScrollMagic.Scene({
		//debug 檢查 滾動觸碰到的點
		triggerElement:"#trigger_2",
		reverse:true,//使否會再跑一次動畫
		duration: 200,
		offset:'50px',//距離trigger點的距離
  		
	})
	.setTween(wp)
	// .addIndicators({
	// 	name:"#trigger_2"//自己命名錨點名稱
	// })// add indicators (requires plugin)  檢查點可以不用
	.addTo(controller);

// // staggerFrom基本使用方式 
//    var tl = new TimelineMax()
//     tl.staggerFrom(".question", 0.5, {
//         cycle: {
//           rotationX:[-90,90],
//           transformOrigin:["50% top -100","50% bottom 100"]
//         }
//     }, 0.1);
//     tl.timeScale(0.5);




});

