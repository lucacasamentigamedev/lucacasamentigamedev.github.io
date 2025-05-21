document.addEventListener("DOMContentLoaded", function () {
    const videos = document.querySelectorAll(".portfolio-video-cover");

    videos.forEach(video => {
        const placeholder = video.parentElement.querySelector(".portfolio-video-poster");

        video.addEventListener("canplay", () => {
            if (placeholder) {
                // Avvia la transizione sull'opacità
                placeholder.style.opacity = "0";
                
                // Dopo 3 secondi (durata della transizione), nascondi del tutto il poster
                setTimeout(() => {
                    placeholder.style.display = "none";
                }, 3000); // 3000 ms = 3 secondi
            }
        });
    });
});
