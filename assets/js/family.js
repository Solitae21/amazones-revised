document.addEventListener('DOMContentLoaded', function () {
  const isMobile = () => window.innerWidth <= 767;

  function initFAQ() {
    if (isMobile()) {
      document.querySelectorAll('.c-faq__container__toggle').forEach(toggle => {
        toggle.checked = false;
      });

      document.querySelectorAll('.faq-container').forEach(container => {
        const firstToggle = container.querySelector('.c-faq__container__toggle');
        if (firstToggle) firstToggle.checked = true;
      });
    } else {
      document.querySelectorAll('.c-faq__container__toggle').forEach(toggle => {
        toggle.checked = true;
      });
    }
  }

  initFAQ();

  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initFAQ, 150);
  });
});