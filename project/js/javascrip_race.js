 $(document).ready(function(){

     // 數票數

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


    // 卡片留言

    $(".add_table").click(function() {
        var text = $(this).siblings('.msg').val();
        if (text != "") {
        $(this).siblings('.post').append("<table><td><span class='name'>silvia:&nbsp</span><span> " + text + "</span></td></table>");
        $(".msg").val('');
        }
    });

        //  $('.text').keypress(function(event) {
       //           var text = $(".msg").val();
        //      if (event.which == 13 && text != "") {
       //           $(".post").prepend("<table><td><h1> " + text + "</h1></td></table>");
       //           $(".msg").val('');
       //           }
            // });

    // 分類和排序

    var $aaaa = $('.aaaa').isotope({
      itemSelector: '.element-item',
      layoutMode: 'fitRows',
      getSortData: {
        name: '.name',
        symbol: '.symbol',
        number: '.number parseInt',
        category: '[data-category]',
        votes: function( itemElem ) {
          var votes = $( itemElem ).find('.votes').text();
          return parseFloat( votes.replace( /[\(\)]/g, '') );
        }
      }
    });

    // filter functions
    var filterFns = {
      // show if number is greater than 50
      numberGreaterThan50: function() {
        var number = $(this).find('.number').text();
        return parseInt( number, 10 ) > 50;
      },
      // show if name ends with -ium
      ium: function() {
        var name = $(this).find('.name').text();
        return name.match( /ium$/ );
      }
    };


    // bind filter button click
    $('#filters').on( 'click', 'button', function() {
      var filterValue = $( this ).attr('data-filter');
      // use filterFn if matches value
      filterValue = filterFns[ filterValue ] || filterValue;
      $aaaa.isotope({ filter: filterValue });
    });

    // bind sort button click
    $('#sorts').on( 'click', 'button', function() {
      var sortByValue = $(this).attr('data-sort-by');
      $aaaa.isotope({ sortBy: sortByValue });
    });

    $aaaa.isotope({
      sortAscending: {
        number: true,
        votes: false
    }     
    });

    // change is-checked class on buttons
    $('.button-group').each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );
      $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $( this ).addClass('is-checked');
      });
    });
 });