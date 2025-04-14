$(".navbar-nav a").on("click", function (event) {
    if (this.hash !== "") {
        event.preventDefault();
        const target = this.hash;
        $("html, body").stop().animate({
            scrollTop: $(target).offset().top - 70
        }, 150); // <-- velocity
    }
});