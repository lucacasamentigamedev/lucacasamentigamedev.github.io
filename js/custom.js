'use strict';

(function ($) {

    //counters
    document.addEventListener('DOMContentLoaded', function() {
        let hasAnimated = false;

        function animateCounters() {
            if (!hasAnimated) {
                $('.counter_num').each(function () {
                    $(this).prop('Counter', 0).animate({
                        Counter: $(this).text()
                    }, {
                        duration: 4000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(Math.ceil(now) + "+");
                        }
                    });
                });
                hasAnimated = true;
            }
        }

        const counterSection = document.getElementById('counterSection');

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target); // Stop observing after animation
                }
            });
        }, { threshold: 0.5 }); // Adjust threshold as needed

        observer.observe(counterSection);
    });

    //shake icons
    document.addEventListener('DOMContentLoaded', function() {
        const observerOptions = {
            threshold: 0.5 // Trigger the animation when 50% of the element is visible
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(document.querySelectorAll('.rotate-icon')).indexOf(entry.target);
                    entry.target.classList.add(`shake${index + 1}`);
                    observer.unobserve(entry.target); // Stop observing once the animation is triggered
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        document.querySelectorAll('.rotate-icon').forEach(icon => {
            observer.observe(icon);
        });
    });
    
    //carousel continue wait if click
    $(document).ready(function(){
        console.log('qui')
        var owl = $('.hero__slider').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            items: 1,
            autoplay: true,
            autoplayTimeout: 5000, // 5 seconds
            autoplayHoverPause: true
        });

        // Reset autoplay timeout on dot and nav button click
        $('.owl-dot, .owl-prev, .owl-next').click(function() {
            owl.trigger('stop.owl.autoplay');
            owl.trigger('play.owl.autoplay', [5000]);
        });
    });

})(jQuery);