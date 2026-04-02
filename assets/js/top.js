const slideContent = [
  {
    h1: "女性による<span class='block'> 女性のための</span><span class='block'> 女性専用24時間ジム</span>",
    p: "Amazonesの特徴をみる",
    href: "about/index.html",
    img: ""
  },
  {
    h1: "科学的アプローチで実現する <span class='block'>最適なトレーニング環境</span>",
    p: "AI姿勢診断・改善",
    href: "sportip/index.html",
    img: "assets/img/common/img_sportip_logo.webp"
  },
  {
    h1: "女性トレーナーが <span class='block'>貴方を全力でサポート</span>Amazonesの ",
    p: "パーソナルトレーニング",
    href: "personal/index.html",
    img: ""
  },
  {
    h1: "ダイエット効<span>果を最大化する</span><span class='block'>オンライン診療サービス</span>",
    p: "ドクターアマゾネス",
    href: "medical/index.html",
    img: "assets/img/common/img_drAmazones_logo.webp"
  },
  {
    h1: "諦めるのはまだ早い<span class='block'>いつ始めても遅くない！ム</span><span class='block'>無料体験・見学を予約する</span>",
    p: "店舗一覧をみる",
    href: "reservation/index.html",
    img: ""
  }
];

let slideIndex = 0;
let timer = 20;
const _timer = 20;

const slides = document.querySelectorAll(".p-top__slides");
const dots = document.querySelectorAll(".dots");
const h1 = document.querySelector(".p-top__hero-text h1");
const p = document.querySelector(".p-top__hero-text p");
const a = document.querySelector(".p-top__hero-text a");
const img = document.querySelector(".hero-slider-img");

showSlides();

function nextSlide() {
  slideIndex++;
  showSlides();
  timer = _timer;
}

function prevSlide() {
  slideIndex--;
  showSlides();
  timer = _timer;
}

function currentSlide(n) {
  slideIndex = n - 1;
  showSlides();
  timer = _timer;
}

function showSlides() {
  if (slideIndex > slides.length - 1) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;

  slides.forEach((slide) => (slide.style.display = "none"));
  slides[slideIndex].style.display = "block";

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[slideIndex].classList.add("active");

  const current = slideContent[slideIndex];

  if (current) {
    const isMobile = window.innerWidth <= 767;

    let h1Content = current.h1;

    if (isMobile) {
      h1Content = h1Content.replace(/<span(.*?)>/g, "<span class='block'>");
    }

    h1.innerHTML = h1Content;
    p.textContent = current.p;
    a.href = current.href;

    if (current.img && !isMobile) {
      img.src = current.img;
      img.style.display = "block";
    } else {
      img.removeAttribute("src");
      img.style.display = "none";
    }
  }
}
setInterval(() => {
  timer--;

  if (timer <= 0) {
    nextSlide();
    timer = _timer;
  }
}, 1000);