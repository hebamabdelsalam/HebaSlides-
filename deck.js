(function () {
  'use strict';

  const slides  = Array.from(document.querySelectorAll('.slide'));
  const dots    = Array.from(document.querySelectorAll('.deck__dot'));
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const counter = document.getElementById('slide-counter');
  const total   = slides.length;
  let current   = 0;

  // Touch tracking
  let touchStartX = 0;
  let touchStartY = 0;

  function goTo(index) {
    if (index < 0 || index >= total) return;

    slides[current].classList.remove('slide--active');
    dots[current].classList.remove('deck__dot--active');
    dots[current].removeAttribute('aria-current');

    current = index;

    slides[current].classList.add('slide--active');
    dots[current].classList.add('deck__dot--active');
    dots[current].setAttribute('aria-current', 'true');

    btnPrev.disabled = current === 0;
    btnNext.disabled = current === total - 1;
    counter.textContent = `Slide ${current + 1} of ${total}`;
  }

  btnPrev.addEventListener('click', () => goTo(current - 1));
  btnNext.addEventListener('click', () => goTo(current + 1));

  dots.forEach((dot) => {
    dot.addEventListener('click', () => goTo(parseInt(dot.dataset.target, 10)));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  // Swipe support
  const stage = document.querySelector('.deck__stage');

  stage.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  stage.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    const dy = e.changedTouches[0].screenY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx < 0 ? goTo(current + 1) : goTo(current - 1);
    }
  }, { passive: true });

  // Init state
  goTo(0);
})();
