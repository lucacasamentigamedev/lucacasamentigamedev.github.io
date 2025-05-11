(function ($) {
    "use strict";

    // Mostra il bottone quando scrolli più di 200px
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    // Scrolla verso l'alto su click (senza easing extra)
    $('.back-to-top').click(function (e) {
        e.preventDefault(); // Previene comportamento href="#"
        $('html, body').animate({ scrollTop: 0 }, 600, 'swing');
    });

})(jQuery);
