
//卷軸
$(document).ready(function() {
    $('#index').fullpage({
        // 'verticalCentered': false,
        'css3': true,
        'navigation': true,
        'navigationPosition': 'right',
        'fitToSectionDelay':500,
        'scrollingSpeed': 1700,
        'scrollOverflow':true,
        'navigationTooltips': ['首頁', '房型介紹', '服務介紹','萌主爭霸', '討論區'],

        // 'afterLoad': function(anchorLink, index) {
            // if (index == 1) {
            //     $('#iphone3, #iphone2, #iphone4').addClass('active');
            
            // $('.bgDog').addClass('dogmove');
        // }
        // },

        'onLeave': function(index, nextIndex, direction) {
            // if (index == 3 && direction == 'down') {
            //     $('.section').eq(index - 1).removeClass('moveDown').addClass('moveUp');
            // } else if (index == 3 && direction == 'up') {
            //     $('.section').eq(index - 1).removeClass('moveUp').addClass('moveDown');
            // }
           
            if (index == 1){
                $('.house-01').addClass('hmoveA');
                $('.house-02').addClass('hmoveB');
                $('.house-03').addClass('hmoveC');
                $('.house-04').addClass('hmoveD');
                $('.house-05').addClass('hmoveE');
                $('.house-06').addClass('hmoveF');
                $('.bgDog').addClass('dogmove');    
            }
            // $('#staticImg').toggleClass('active', (index == 2 && direction == 'down') || (index == 4 && direction == 'up'));
            // $('#staticImg').toggleClass('moveDown', nextIndex == 4);
            // $('#staticImg').toggleClass('moveUp', index == 4 && direction == 'up');
        }
    });
});


// 討論區
$(document).ready(function() {
    var disclass = $('.disclass'); //抓到要搞的區塊
    disclass.on("click", function() { //設定點擊事件
        disclass.removeClass("open"); //先移除open ClassName
        $(this).addClass("open"); //加個ClassName給他
    });

});


//首頁文字畫圖
$(document).ready(function() {
    var $svg = $('#first').drawsvg({
        duration: 3000
    });
    $svg.drawsvg('animate');

    $('#second g').css({
        "fill": "rgba(255,255,255,1)",
        "transition": "3s 3s"
    });


});

//房型
$(document).ready(function() {
            
    $(' #box > .house ').each( function() { $(this).hoverdir(); } );
    //燈箱
    $('.house').click(function(){
       var src =  $(this).children('img').attr('src');
       var name = $(this).find('span:first').text(); 
       console.log(name);
        $('#lightbox img').attr('src',src);
        $('#lightbox .text h3').text(name);
        $('#lightbox').fadeIn();
    });
    //關燈箱
    $('#lightbox').click(function(){
        $(this).fadeOut();
    });
});

//投票
$(document).ready(function() {
    new Photostack(document.getElementById('photostack-1'), {
        callback: function(item) {
            //console.log(item)
        }
    });
    $('.PageFour nav').css({
        'background': 'none',
        'boxShadow': 'none'

    });
});

//服務slider
$(document).ready(function() {

    $('#preview-coverflow').coverflow({
        index: 3,
        density: 2,
        duration:'slow',
        innerOffset: 50,
        innerScale: .7,
        animateStep: function(event, cover, offset, isVisible, isMiddle, sin, cos) {
            if (isVisible) {
                if (isMiddle) {
                    $(cover).css({
                        'filter': 'none',
                        '-webkit-filter': 'none'
                    });
                } else {
                    var brightness = 1 + Math.abs(sin),
                        contrast = 1 - Math.abs(sin),
                        filter = 'contrast(' + contrast + ') brightness(' + brightness + ')';
                    $(cover).css({
                        'filter': filter,
                        '-webkit-filter': filter
                    });
                }
            }
        }
    });

});
//服務框框
$(document).ready(function(){
    $('#preview').children().css('outline','0px');

})

//服務
$(document).ready(function() {
    var effr = $('figure.effect-marley');
       
    effr.on("click", function(){
    	effr.removeClass("open");
    	$(this).addClass("open");
    });
    var myMovie = document.getElementById('myMovie');
    // grid = document.getElementById('grid');
        grid = $('.grid');
    // grid = document.getElementsByClassName('grid')[0];
    myMovie.addEventListener('click', play, false);
    // grid.addEventListener('click',pause,false);
    grid.on('click', pause);

    function play() {
        myMovie.play();
    }

    function pause() {
        myMovie.pause();
    }
});


