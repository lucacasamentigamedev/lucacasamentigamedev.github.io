function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // ⛔️ blocca lo scroll della pagina

        // ✅ Lazy load solo dei video della modale aperta
        const lazyVideos = modal.querySelectorAll('.lazy-video');
        lazyVideos.forEach(div => {
            const src = div.getAttribute('data-src');
            if (!src) return;

            const video = document.createElement('video');
            video.className = 'portfolio-work-video';
            video.setAttribute('autoplay', true);
            video.setAttribute('muted', true);
            video.setAttribute('loop', true);
            video.setAttribute('playsinline', true);
            video.setAttribute('controls', true);

            const source = document.createElement('source');
            source.src = src;
            source.type = 'video/mp4';

            video.appendChild(source);
            div.innerHTML = ''; // pulisce eventuali video già presenti
            div.appendChild(video);
        });

    } else {
        console.error(`Modal with id "${modalId}" not found.`);
    }
}


function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // ✅ ripristina lo scroll

        // 🧼 Pulisce i video caricati dinamicamente
        const lazyVideos = modal.querySelectorAll('.lazy-video');
        lazyVideos.forEach(div => {
            div.innerHTML = ''; // cancella il contenuto video
        });
    } else {
        console.error(`Modal with id "${modalId}" not found.`);
    }
}
