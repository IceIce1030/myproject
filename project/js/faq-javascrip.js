function doFirst(){
	

}//dofirst
function $id(id){
		var getid=document.getElementById(id);
		return getid;
}
	
window.addEventListener('load',doFirst,false);

$().ready(function(){
	
	

	// $('.loadingbox').css({
	// 	display:'block'
	// });
	

	//Loading動畫
	// $('.loadingbox').delay(2000).fadeOut(500);
	
	$('.question').click(function(){
		$(this).find('.content').slideToggle();
		var a = $(this).find('.linebar').width();
		if(a!=80){
			$(this).find('.linebar').animate({
				width:'80'
			},500);
		}else{
			$(this).find('.linebar').animate({
				width:'100%'
			},800);
		}
	});



});

