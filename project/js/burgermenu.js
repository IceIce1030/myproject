$(document).ready(function() {


    $("#hamburger").click(function() {
        $("nav .content").slideToggle("slow", function() {
            $("#hamburger").hide();
            $("#cross").show();
        });
    });

    $("#cross").click(function() {
        $("nav .content").slideToggle("slow", function() {
            $("#cross").hide();
            $("#hamburger").show();
        });
    });



});
