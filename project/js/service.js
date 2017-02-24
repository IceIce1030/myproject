$(document).ready(function() {
    //tab變選到active，上背景色

    $('.roomTab').click(function() {
        $('.roomTab').removeClass('active');
        $(this).addClass('active');

        //tab選到下方出現相對應內容
        var roomTypeName = $('.active .txt p').text();

        $('#roomTypeName').text(roomTypeName);

        //tab選到下方出現相對應image
        var roomImageSrc = $('.active img').attr('src');
        console.log(roomImageSrc);
        $('#roomTypeImage').attr('src',roomImageSrc);
    });
});
