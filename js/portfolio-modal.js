function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // ⛔️ blocca lo scroll della pagina
    } else {
        console.error(`Modal with id "${modalId}" not found.`);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // ✅ ripristina lo scroll
    } else {
        console.error(`Modal with id "${modalId}" not found.`);
    }
}