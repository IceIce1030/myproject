$(function(){	

// 	function showMember(jsonStr){
// var table,tr,td,i,j, text,textNode;
  
//   var topthree = JSON.parse(jsonStr);

//   var str="<table border='1' cellspacing='0' align='center'>";
//   str+="<tr><th>編號</th><td>" + topthree[0].mem_no + "</td></tr>";
//   str+="<tr><th>姓名</th><td>" + topthree[0].mem_name + "</td></tr>";
//   str+="<tr><th>性別</th><td>" + topthree[0].mem_sex + "</td></tr>";
//   str+="<tr><th>email</th><td>" + topthree[0].mem_mail + "</td></tr>";
//   str+="</table>";
function getTopthree(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange=function (){
    if( xhr.readyState == 4){
	     if( xhr.status == 200 ){

	     document.getElementById("showTopThree").innerHTML = xhr.responseText;

       $('.count.count1').each(function () {
        $(this).prop('Counter',0).delay(1000).animate({
          Counter: $(this).data('votes')
            }, {
            duration: 3000,
            easing: 'swing',
            step: function (now) {
            $(this).text(Math.ceil(now));
            }
        });
    });

    $('.count.count2').each(function () {
        $(this).prop('Counter',0).delay(3700).animate({
          Counter: $(this).data('votes')
            }, {
            duration: 3000,
            easing: 'swing',
            step: function (now) {
            $(this).text(Math.ceil(now));
            }
        });
    });

    $('.count.count3').each(function () {
        $(this).prop('Counter',0).delay(2300).animate({
          Counter: $(this).data('votes')
            }, {
            duration: 3000,
            easing: 'swing',
            step: function (now) {
            $(this).text(Math.ceil(now));
            }
        });
    });

		    //modify here
        // alert(xhr.responseText);
        // showMember( xhr.responseText);
	     }else{
	        alert( xhr.status );
	     }
	 }
  }

  var url = "race_showTopThree.php";
  xhr.open("Get", url, true);
  xhr.send( null );
}	
 
 	getTopthree();
 		

 });