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

    TweenMax.staggerFromTo(".cloud1", 4, {
        x: 1200,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
    }, 1);

    TweenMax.staggerFromTo(".cloudTxt", 5, {
        // x: 1200,
        opacity: 0
    }, {
        // x: 0,
        opacity: 1,
    }, 1.6);

    TweenMax.staggerFromTo(".cloud2", 5, {
        x: -1200,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
    }, 1);

    TweenMax.staggerFromTo(".cloud3", 5, {
        x: -1200,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
    }, 1);

       $(window).load(function() {
    var wdth=$(window).width();
    var wdh=$(window).height();
    var wdratio = (wdh/wdth)/3;
    // var pb1 = 240*wdratio;
    // var pb2 = 320*wdratio;
    // var pb3 = 280*wdratio;
    // console.log(wdth,wdh,wdratio,pb1);


    if(wdth<768){
      var pb1 = 350*wdratio;
      var pb2 = 480*wdratio;
      var pb3 = 425*wdratio;
      $(".topthree .item .lollipop .stick.stick1").each( function( key, bar ) {
        var percentage = $(this).data('percentage');
          
        $(this).animate({
          'padding-bottom' : pb1+"%"
        }, 4000);
      });
        $(".topthree .item .lollipop .stick.stick2").each( function( key, bar ) {
        var percentage = $(this).data('percentage');
        
        $(this).delay(3000).animate({
          'padding-bottom' : pb2+"%"
        }, 4000);
      });
          $(".topthree .item .lollipop .stick.stick3").each( function( key, bar ) {
        var percentage = $(this).data('percentage');
        
        $(this).delay(1500).animate({
          'padding-bottom' : pb3+"%"
        }, 4000);
      });
    }

    if(wdth>=768 && wdth<1200){
      $(".topthree .item .lollipop .stick.stick1").each( function( key, bar ) {
        var percentage = $(this).data('percentage');
        
        $(this).animate({
          'padding-bottom' : pb1+"%"
        }, 4000);
      });
        $(".topthree .item .lollipop .stick.stick2").each( function( key, bar ) {
        var percentage = $(this).data('percentage');
        
        $(this).delay(3000).animate({
          'padding-bottom' : pb2+"%"
        }, 4000);
      });
          $(".topthree .item .lollipop .stick.stick3").each( function( key, bar ) {
        var percentage = $(this).data('percentage');
        
        $(this).delay(1500).animate({
          'padding-bottom' : pb3+"%"
        }, 4000);
      });
    }

    if(wdth>1200){
      var wdth=1170;
      var wdratio = (wdh/wdth)/3;
      console.log(wdth,wdh,wdratio);
      var pb1 = 225*wdratio;
      var pb2 = 310*wdratio;
      var pb3 = 270*wdratio;
      $(".topthree .item .lollipop .stick.stick1").each( function( key, bar ) {
        var percentage = $(this).data('percentage');
        $(this).animate({
          'padding-bottom' : pb1+"%"
        }, 4000);
      });
        $(".topthree .item .lollipop .stick.stick2").each( function( key, bar ) {
        var percentage = $(this).data('percentage');
        
        $(this).delay(3000).animate({
          'padding-bottom' : pb2+"%"
        }, 4000);
      });
          $(".topthree .item .lollipop .stick.stick3").each( function( key, bar ) {
        var percentage = $(this).data('percentage');
        
        $(this).delay(1500).animate({
          'padding-bottom' : pb3+"%"
        }, 4000);
      });
    }
  });

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