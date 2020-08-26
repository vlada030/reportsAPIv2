$(document).ready(function() {
    // datum
    var formatedDate = new Date().getDate() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getFullYear() + '.';
    $('#date').text(formatedDate);
    // godina
    $(".year").text(new Date().getFullYear());
    // hamburger button
    $(document).ready(function () {
        $('#hamb').click(function () {
            $('#nav-icon3').toggleClass('open');
        });
    });
    // pokretanje tooltipa
    $('[data-toggle="tooltip"]').tooltip();
    // pokretanje modala
    //$('#myModal').modal();
});