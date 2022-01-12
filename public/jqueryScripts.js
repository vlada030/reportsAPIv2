$(document).ready(function () {
    // godina na dnu strane
    $(".year").text(new Date().getFullYear());

    // hamburger button
    $("#hamb").click(function () {
        $("#nav-icon3").toggleClass("open");
    });

    // pokretanje tooltipa
    $('[data-toggle="tooltip"]').tooltip();
});
