$(document).ready(function() {
    //討論區抓資料
    //投票數點擊
    voteShow();

    $('#box .house').click(function() {
        var roomName = $(this).find('span').eq(0).text();

        $.ajax({

            url: "iRoom.php",
            data: { roomName: $(this).find('span').eq(0).text() },
            type: "GET",
            dataType: 'text',
            async: false,

            success: function(msgD) {
                var mesD = JSON.parse(msgD);

                for (var i = 0; i < mesD.length; i++) {
                    var src = 'images/' + mesD[i].roomimg_name;
                    $('#index-lightbox .box img').eq(i).attr('src', src);
                }

            },

            error: function(xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
    })


    $('.favorite').click(function() {
        var voteNo = $(this).parent().parent().siblings('.textTop').find('.number').text();
        // console.log(vote_no);
        $.ajax({

            url: "iVoteCount.php",
            data: { voteNo: $(this).parent().parent().siblings('.textTop').find('.number').text() },
            type: "GET",
            dataType: 'text',
            async: false,

            success: function(msgC) {
                voteShow();

            },

            error: function(xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
    })

    $.ajax({

        url: "iArtical.php",
        // data: $('#sentToBack').serialize(),
        type: "GET",
        dataType: 'text',
        async: false,

        success: function(msgA) {
            var mesA = JSON.parse(msgA);
            console.log(mesA);
            for (var i = 0; i < mesA.length; i++) {
                $('.disInfo .postTitle h3').eq(i).text(mesA[i].arti_title);
                // console.log($('.disInfo .postTitle h3').eq(i).text());
                $('.disInfo .postContent').eq(i).text(mesA[i].arti_content);
                $('.disInfo .postContent').eq(i).text(mesA[i].arti_content.replace(/<br>/g, ","));
                //RegExp 比對全部的寫法
                $('.disInfo .postDate').eq(i).text(mesA[i].arti_date);
                $('.disInfo .watch').eq(i).text(mesA[i].arti_count);
                $('.disInfo .author').eq(i).text(mesA[i].mem_name);
                // $('.disInfo .postTitle h3').eq(i).text(mesA[i].arti_sort);
                $('.disInfo .message').eq(i).text(mesA[i].arti_report);
            }


        },

        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
    // //投票抓資料
    function voteShow() {
        $.ajax({

            url: "iVote.php",
            // data: $('#sentToBack').serialize(),
            type: "GET",
            dataType: 'text',
            async: false,

            success: function(msgB) {
                // console.log(msgB); 
                var msgB = JSON.parse(msgB);

                for (var i = 0; i < msgB.length; i++) {
                    $('#photostack-1 .text .name').eq(i).text(msgB[i].pet_name);
                    // console.log($('.disInfo .postTitle h3').eq(i).text());
                    $('#photostack-1 .text .personality span ').eq(i).text(msgB[i].pet_personality);
                    $('#photostack-1 .text .votes').eq(i).text(msgB[i].vote_count);
                    $('#photostack-1 .text .number').eq(i).text(msgB[i].vote_no);
                    $('#photostack-1 img').eq(i).attr('src', 'images/' + msgB[i].vote_img);
                    // $('.disInfo .postContent').eq(i).text(mess[i].arti_content.replace(/<br>/g, ","));
                    //RegExp 比對全部的寫法
                    $('#photostack-1 .text .size span').eq(i).text(msgB[i].dog_size);
                    $('#photostack-1 .text .sex span').eq(i).text(msgB[i].pet_sex.replace(/m/g, "男生").replace(/f/g, "女生"));
                }


            },

            error: function(xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
    }





    var windW = $(window).width();
    var windH = $(window).height();



    //燈箱
    var lightbox = $('#index-lightbox');
    $('.house').click(function() {
        var src = $(this).children('img').attr('src');
        var name = $(this).find('span:first').text();

        lightbox.addClass('pg2');
        $('#index-lightbox .pic img').attr('src', src);
        $('#index-lightbox .text h2').text(name);
        $('#index-lightbox .box .img').eq(0).css({
            'border': '1px solid #DAA356'
        })
        lightbox.addClass('pg2').fadeIn();
    });

    var littlepic = $('#index-lightbox .box .img');
    littlepic.click(function() {
        var src = $(this).children('img').attr('src');
        $('#index-lightbox .pic img').attr('src', src);
        $(this).css({
            'border': '1px solid #DAA356'
                // 'transition':'.8s'

        })
        $(this).siblings().css({
            'border': 'none',
            'transition': '.8s'
        })
    })

    //關燈箱
    lightbox.click(function(e) {
        e.stopPropagation();

        if (e.target.id == 'index-lightbox') {
            $(this).removeClass('pg2').fadeOut();

        }
    });



    //========================服務=============================
    var dock = $('.osx-dock .dock');
    if (windW > 992 && windH > 800) {

        $('.osx-dock .dock .dockA ').click(function() {
            $(this).css({
                'box-shadow': '3px 3px 5px rgba(0, 0, 0, 0)'
            })
            $(this).find('.fornt').css({
                'transform': 'rotateY(-180deg)'
            })
            $(this).find('.back').css({
                'transform': 'rotateY(0deg)'
            })

        })
        dock.hover(mouseA, mouseB);

        function mouseA() {
            $(this).siblings().css({
                'z-index': '300',
                'transform': 'scale(1)'
            })
            $(this).css({
                'z-index': '1000'
            })
            $(this).siblings().find('.txt').css({
                'bottom': '-65%'
            })
            $(this).css({
                'transform': 'scale(3)'
            })
            $(this).find('.txt').css({
                'bottom': '0%'
            })
            clearInterval(AB);
            clearInterval(AB2);
            clearInterval(AB3);
        };

        function mouseB() {
            $(this).find('.fornt').css({
                'transform': 'rotateY(0deg)'
            })
            $(this).find('.back').css({
                'transform': 'rotateY(180deg)'
            })
            $(this).css({
                'z-index': '300',
                'transform': 'scale(1)'
            })
            $(this).find('.txt').css({
                'bottom': '-65%'
            })
            $(this).delay(2000).find('a').css({

                'box-shadow': '3px 3px 5px rgba(0, 0, 0, .5)'
            })
            AB = setInterval(autoMouseAB, 200);



        };


        var AB = setInterval(autoMouseAB, 200);
        var AB2;
        var AB3;

        var timeA = 0;

        function autoMouseAB() {
            clearInterval(AB);


            dock.eq(timeA).css({
                'z-index': '1000',
                'transform': 'scale(3)'
            });
            dock.eq(timeA).find('.txt').css({
                'bottom': '0%'
            })

            AB2 = setInterval(autoMouseAB2, 2700);
        }

        function autoMouseAB2() {
            clearInterval(AB2);
            dock.eq(timeA).css({
                'z-index': '300',
                'transform': 'scale(1)'

            });
            dock.eq(timeA).find('.txt').css({
                'bottom': '-65%'
            })


            AB3 = setInterval(autoMouseAB3, 1700);
        }

        function autoMouseAB3() {
            clearInterval(AB3);
            AB = setInterval(autoMouseAB, 200);
            if (timeA == 5) {
                timeA = 0;
            } else {
                timeA++;
            }
        }
    }
    if (windH < 800 && windW > 992) {

        $('.osx-dock .dock .dockA ').click(function() {
            $(this).css({
                'box-shadow': '3px 3px 5px rgba(0, 0, 0, 0)'
            })
            $(this).find('.fornt').css({
                'transform': 'rotateY(-180deg)'
            })
            $(this).find('.back').css({
                'transform': 'rotateY(0deg)'
            })

        })
        dock.hover(mouseA, mouseB);

        function mouseA() {
            $(this).siblings().css({
                'z-index': '300',
                'transform': 'scale(1)'
            })
            $(this).css({
                'z-index': '1000'
            })
            $(this).siblings().find('.txt').css({
                'bottom': '-65%'
            })
            $(this).css({
                'transform': 'scale(2)'
            })
            $(this).find('.txt').css({
                'bottom': '0%'
            })
            clearInterval(AB);
            clearInterval(AB2);
            clearInterval(AB3);
        };

        function mouseB() {
            $(this).find('.fornt').css({
                'transform': 'rotateY(0deg)'
            })
            $(this).find('.back').css({
                'transform': 'rotateY(180deg)'
            })
            $(this).css({
                'z-index': '300',
                'transform': 'scale(1)'
            })
            $(this).find('.txt').css({
                'bottom': '-65%'
            })
            $(this).delay(2000).find('a').css({

                'box-shadow': '3px 3px 5px rgba(0, 0, 0, .5)'
            })
            AB = setInterval(autoMouseAB, 200);



        };

        var AB = setInterval(autoMouseAB, 200);
        var AB2;
        var AB3;

        var timeA = 0;

        function autoMouseAB() {
            clearInterval(AB);


            dock.eq(timeA).css({
                'z-index': '1000',
                'transform': 'scale(2)'
            });
            dock.eq(timeA).find('.txt').css({
                'bottom': '0%'
            })

            AB2 = setInterval(autoMouseAB2, 2700);
        }

        function autoMouseAB2() {
            clearInterval(AB2);
            dock.eq(timeA).css({
                'z-index': '300',
                'transform': 'scale(1)'

            });
            dock.eq(timeA).find('.txt').css({
                'bottom': '-65%'
            })


            AB3 = setInterval(autoMouseAB3, 1700);
        }

        function autoMouseAB3() {
            clearInterval(AB3);
            AB = setInterval(autoMouseAB, 200);
            if (timeA == 5) {
                timeA = 0;
            } else {
                timeA++;
            }
        }
    }
    if (windW < 993) {

        $('.osx-dock .dock .dockA ').click(function() {
            var src = $(this).find('img').attr('src');
            var name = $(this).find('h2').text();
            $('#index-lightbox').addClass('pg3');
            $('#index-lightbox img').attr('src', src);
            $('#index-lightbox .text h3').text(name);
            $('#index-lightbox').addClass('.pg3').fadeIn();

        })
        $('#index-lightbox').click(function() {
            $(this).removeClass('pg3').fadeOut();
        });
        $('.scroll-icon-pg3').css({
            'display': 'none'
        });
    }


    if (windW > 767) {
        //卷軸
        $('#index').fullpage({
            // 'verticalCentered': false,
            'css3': true,
            'navigation': true,
            'navigationPosition': 'right',
            'autoScrolling': true,
            'fitToSectionDelay': 500,
            // 'fitToSection': false,
            'scrollingSpeed': 1700,
            'scrollOverflow': true,
            'navigationTooltips': ['首頁', '房型介紹', '服務介紹', '萌主爭霸', '討論區'],

            // 'afterLoad': function(anchorLink, index) {
            // if (index !== 2) {
            //     $('#iphone3, #iphone2, #iphone4').addClass('active');
            // clearInterval(AB);
            // $('.bgDog').addClass('dogmove');
            // }

            // },

            'onLeave': function(index, nextIndex, direction) {
                // if (index == 3 && direction == 'down') {
                //     $('.section').eq(index - 1).removeClass('moveDown').addClass('moveUp');
                // } else if (index == 3 && direction == 'up') {
                //     $('.section').eq(index - 1).removeClass('moveUp').addClass('moveDown');
                // }

                if (index == 1) {
                    $('.house-01').addClass('hmoveA');
                    $('.house-02').addClass('hmoveB');
                    $('.house-03').addClass('hmoveC');
                    $('.house-04').addClass('hmoveD');
                    $('.house-05').addClass('hmoveE');
                    $('.house-06').addClass('hmoveF');
                    // $('.bgDog').addClass('dogmove');   
                    $('.PageTwo .colum').delay(800).addClass('change');

                }
                // if( index == 2){
                // TweenMax.staggerTo(".osx-dock .dock", 1, {rotation:360, y:0}, 0.5);

                // }
                // else if( index !== 2){

                // }

                // $('#staticImg').toggleClass('active', (index == 2 && direction == 'down') || (index == 4 && direction == 'up'));
                // $('#staticImg').toggleClass('moveDown', nextIndex == 4);
                // $('#staticImg').toggleClass('moveUp', index == 4 && direction == 'up');
            }
        });
        //房型
        $(' #box >.colum .house').each(function() { $(this).hoverdir(); });

        // 討論區
        var disclass = $('.disclass'); //抓到要搞的區塊
        var au = setInterval(autoPg5, 2500);
        var time = 0;

        function autoPg5() {


            $('.disclass:eq(' + time + ')').addClass('hover');
            $('.disclass:eq(' + time + ')').find('.distitle').addClass('bgc');
            $('.disclass:eq(' + time + ')').siblings().removeClass('hover');
            $('.disclass:eq(' + time + ')').siblings().find('.distitle').removeClass('bgc');
            if (time == 3) {
                time = 0;
            } else {
                time++;
            }
        }

        disclass.on("click", function() { //設定點擊事件
                disclass.removeClass("open"); //先移除open ClassName
                $(this).addClass("open"); //加個ClassName給他
            })
            // autoPg5 = setInterval(autoPg5, 1800);

        $('.disclass').hover(mouseA, mouseB);

        function mouseA() {
            $(this).addClass('hover');
            $(this).find('.distitle').addClass('bgc');
            $(this).siblings().removeClass('hover');
            $(this).siblings().find('.distitle').removeClass('bgc');
            clearInterval(au);
        };

        function mouseB() {
            $(this).removeClass('hover');
            $(this).find('.distitle').removeClass('bgc');
            au = setInterval(autoPg5, 2500);
        };



    }


    if (windW < 768) {

        // 討論區
        $('.disclass').click(function() {
            $(this).toggleClass('open');
            $(this).find(".disInfo").fadeToggle(1000);
        })

        clearInterval(au);

        //房型
        $('.PageTwo .colum').addClass('change');

    }


});
$(document).ready(function() {
    //首頁文字畫圖

    var $svg = $('#first').drawsvg({
        duration: 3000
    });
    $svg.drawsvg('animate');

    $('#second g').css({
        "fill": "rgba(255,255,255,1)",
        "transition": "3s 3s"
    });
})

$(document).ready(function() {
    //========================投票========================
    new Photostack(document.getElementById('photostack-1'), {
        callback: function(item) {}
    });


    // function nextOne(e) {
    //     var circle = document.getElementsByClassName("myCircle");
    //     var obj = e.target;
    //     circle[i].click();
    // }
    var next = document.getElementById('right');
    next.onclick = nextOne;

    var nexti = 0;

    function nextOne() {
        var circle = document.getElementsByClassName("myCircle");
        if (nexti == circle.length) {
            nexti = 0;
        } else {
            nexti = nexti + 1;
        }
        circle[nexti].click();
    }
    var back = document.getElementById('left');
    back.onclick = backOne;

    function backOne() {
        var circle = document.getElementsByClassName("myCircle");
        if (nexti == 0) {
            nexti = circle.length - 1;
        } else {
            nexti = nexti - 1;
        }
        circle[nexti].click();
    }



    function setCircle(e) {
        var obj = e.target;
        var index = obj.index;
        document.getElementsByClassName("myCircle")[index].click();
    }

    var figures = document.getElementsByTagName("figure");
    for (var i = 0; i < figures.length; i++) {
        figures[i].onclick = setCircle;
        figures[i].index = i;
    }

    // var myCircle = $('.myCircle');
    // var figure= $('.photostack figure')
    // var time = 0;
    // var vt = setInterval(autoFigure,1000);
    // function autoFigure(){
    //      $('.photostack figure:eq('+time+')').addClass('photostack-current');
    //      $('.photostack figure:eq('+time+')').addClass('photostack-flip');
    //      if (time==15) {
    //             time=0;
    //         }else{
    //             time++;    
    //         }
    // }
    //========================投票  end========================
})

$(document).ready(function() {
    window.onload = cleardate;



    function cleardate() {
        sessionStorage.clear();
    }

    $('.i-dateClick').click(function() {
        $('#placeholder').fadeOut();
    })
    $('.closeLightBox').click(function(e) {
        var roomin = startDate;
        var roomout = endDate;
        var ri = $('#roomIn').text();
        var ro = $('#roomOut').text();
        // alert(aa);
        if (ri == "" || ro == "") {
            $('#placeholder').fadeIn();
        } else {
            sessionStorage['startDateY'] = roomin.getFullYear();
            sessionStorage['startDateM'] = roomin.getMonth();
            sessionStorage['startDateD'] = roomin.getDate();

            sessionStorage['endDateY'] = roomout.getFullYear();
            sessionStorage['endDateM'] = roomout.getMonth();
            sessionStorage['endDateD'] = roomout.getDate();


        }

    })
    $('.btnLink').click(function(e) {
        if (sessionStorage['startDateY'] == null && sessionStorage['startDateM'] == null && sessionStorage['startDateD'] == null && sessionStorage['endDateY'] == null && sessionStorage['endDateM'] == null &&sessionStorage['endDateD'] == null ) {
            e.preventDefault();
            alert("請選擇入住日期");
        }
    })
})
