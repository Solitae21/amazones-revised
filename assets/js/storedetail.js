// ─────────────────────────────────────────────
//  フォトギャラリースライダー
//  （スクリプトはdefer読み込みのためDOMは準備済み — DOMContentLoaded不要）
// ─────────────────────────────────────────────
(function () {
  const sliderEl = document.getElementById("js-slider");

  // モバイル: 専用ヒーロー画像を作成、サムネイルクリックでsrcを切り替え
  if (window.innerWidth < 768) {
    var grid = document.querySelector(".slider-thumbs .grid");
    if (!grid) return;
    var thumbs = grid.querySelectorAll(".js-thumb-button");
    if (!thumbs.length) return;

    // 最初のサムネイル画像からヒーロー要素を作成
    var hero = document.createElement("div");
    hero.className = "mobile-hero";
    var heroImg = document.createElement("img");
    var firstImg = thumbs[0].querySelector("img");
    heroImg.src = firstImg.src;
    heroImg.srcset = firstImg.srcset || "";
    heroImg.alt = firstImg.alt || "";
    hero.appendChild(heroImg);
    grid.prepend(hero);

    // 最初のサムネイルをアクティブにする
    thumbs[0].classList.add("swiper-slide-thumb-active");

    thumbs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var img = this.querySelector("img");
        heroImg.src = img.src;
        heroImg.srcset = img.srcset || "";
        // アクティブ状態を更新
        thumbs.forEach(function (b) { b.classList.remove("swiper-slide-thumb-active"); });
        this.classList.add("swiper-slide-thumb-active");
      });
    });
    return;
  }

  // デスクトップ: Swiperスライダー
  if (!sliderEl || typeof Swiper === "undefined") return;

  const swiper = new Swiper(sliderEl, {
    effect: "fade",
    fadeEffect: { crossFade: true },
    speed: 400,
    allowTouchMove: false,
  });

  const thumbButtons = document.querySelectorAll(".js-thumb-button");

  function setActiveThumb(index, scroll = true) {
    thumbButtons.forEach((b) => b.classList.remove("swiper-slide-thumb-active"));
    if (thumbButtons[index]) {
      thumbButtons[index].classList.add("swiper-slide-thumb-active");
      if (scroll) {
        thumbButtons[index].scrollIntoView({ block: "nearest", inline: "nearest" });
      }
    }
  }

  thumbButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-slide-index"), 10);
      swiper.slideTo(index);
      setActiveThumb(index);
    });
  });

  swiper.on("slideChange", function () {
    setActiveThumb(swiper.activeIndex);
  });

  setActiveThumb(0, false);
}());

// サービスセクション — モバイルスライダー（global.jsのinitMobileCarouselを使用）
initMobileCarousel({
  trackSelector: '.c-service__container',
  prevSelector: '.p-service__nav--prev',
  nextSelector: '.p-service__nav--next',
  cardSelector: '.c-service__wrapper',
  breakpoint: 1024
});
