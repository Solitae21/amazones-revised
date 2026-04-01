/**
 * 複数ページで使用する共通ユーティリティ関数
 * ページ固有スクリプトより前にインポートしてください
 */

/**
 * コンテナ内のアンカーリンク用スムーススクロールナビゲーション
 * @param {string} selector - CSS selector for the nav link container (e.g. '.p-payment__links-nav a')
 */
function initSmoothScroll(selector) {
  document.querySelectorAll(selector).forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/**
 * 前/次ナビゲーション付きモバイルカルーセル
 * @param {Object} config
 * @param {string} config.trackSelector - CSS selector for the scrollable track/grid
 * @param {string} config.prevSelector  - CSS selector for the previous button
 * @param {string} config.nextSelector  - CSS selector for the next button
 * @param {string} config.cardSelector  - CSS selector for individual cards within the track
 * @param {number} [config.breakpoint=767] - Max width in px for mobile mode
 */
function initMobileCarousel(config) {
  var track = document.querySelector(config.trackSelector);
  var btnPrev = document.querySelector(config.prevSelector);
  var btnNext = document.querySelector(config.nextSelector);
  if (!track || !btnPrev || !btnNext) return;

  var cards = track.querySelectorAll(config.cardSelector);
  var total = cards.length;
  var current = 0;
  var breakpoint = config.breakpoint || 767;

  function isMobile() {
    return window.innerWidth <= breakpoint;
  }

  function goTo(index) {
    if (!isMobile()) return;
    current = (index + total) % total;
    track.style.transform = 'translateX(-' + current * 100 + '%)';
  }

  btnPrev.addEventListener('click', function () {
    goTo(current - 1);
  });

  btnNext.addEventListener('click', function () {
    goTo(current + 1);
  });

  window.addEventListener('resize', function () {
    if (!isMobile()) {
      track.style.transform = '';
      current = 0;
    }
  });
}

/**
 * オーバーレイクリックとEscキー対応の汎用モーダル開閉
 * @param {string} modalId - The DOM id of the modal overlay element
 * @returns {Object} - { open, close } functions
 */
function initModal(modalId) {
  var overlay = document.getElementById(modalId);
  if (!overlay) return null;

  function open() {
    overlay.classList.add('is-open');
    document.documentElement.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('is-open');
    overlay.addEventListener('transitionend', function restore() {
      document.documentElement.style.overflow = '';
      overlay.removeEventListener('transitionend', restore);
    });
  }

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
  });

  return { open: open, close: close };
}
