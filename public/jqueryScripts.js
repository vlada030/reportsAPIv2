$(document).ready(function() {
    // datum
    var formatedDate = new Date().getDate() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getFullYear() + '.';
    $('#date').text(formatedDate);
    // datum domaci
    // document.querySelector('#datum').valueAsDate = new Date();
    // console.log(document.querySelector('#datum').placeholder);
    // document.querySelector('#datum').value = new Intl.DateTimeFormat('sr-RS').format(new Date())
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