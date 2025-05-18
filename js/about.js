/* learn about me */

function hackerReveal(element, finalText, delayPerFrame = 40) {
    const chars = '01';
    let revealedCount = 0;

    const revealInterval = setInterval(() => {
      let displayText = '';

      for (let i = 0; i < finalText.length; i++) {
        if (i < revealedCount) {
          displayText += finalText[i];
        } else {
          displayText += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      element.textContent = displayText;

      if (revealedCount >= finalText.length) {
        clearInterval(revealInterval);
        element.textContent = finalText;
        startSoftGlitch(element, finalText);
      }

      revealedCount++;
    }, delayPerFrame);
}

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
      }, 100); // brevissimo glitch, poi torna
    }, 1000); // ogni secondo un glitch random

    // 👇 opzionale: salva l'intervallo se vuoi fermarlo poi
    element.dataset.glitchIntervalId = glitchInterval;
}

function animateHackerText(className) {
    document.querySelectorAll('.' + className).forEach(word => {
      const finalText = word.textContent;
      word.textContent = '0'.repeat(finalText.length);
      hackerReveal(word, finalText, 40);
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