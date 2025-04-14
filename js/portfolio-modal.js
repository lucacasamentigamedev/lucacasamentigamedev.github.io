function openModal() {
    document.getElementById('modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // ⛔️ blocca lo scroll della pagina
}
  
function closeModal() {
    document.getElementById('modal').classList.add('hidden');
    document.body.style.overflow = ''; // ✅ ripristina lo scroll
}