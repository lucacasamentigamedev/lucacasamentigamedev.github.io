
function startSoftGlitch(element, finalText) {
    const chars = '01';
    const glitchInterval = setInterval(() => {
      const glitchIndex = Math.floor(Math.random() * finalText.length);
      const originalChar = finalText[glitchIndex];

      let tempText = finalText.split('');
      tempText[glitchIndex] = chars[Math.floor(Math.random() * chars.length)];
      element.textContent = tempText.join('');

      setTimeout(() => {
        element.textContent = finalText;
      }, 100);
    }, 1000);

    element.dataset.glitchIntervalId = glitchInterval;
}

function animateHackerText(className) {
    document.querySelectorAll('.' + className).forEach(word => {
      const finalText = word.textContent;
      startSoftGlitch(word, finalText, 40);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const target = document.querySelector('.red-bold-glitch-sentence')?.parentElement;
    let hasAnimated = false;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          animateHackerText('red-bold-glitch-sentence');
          animateHackerText('blue-bold-glitch-sentence');
          hasAnimated = true;
          obs.unobserve(target);
        }
      });
    }, { threshold: 0.4 });

    if (target) observer.observe(target);
});