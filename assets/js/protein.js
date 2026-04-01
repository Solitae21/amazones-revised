// モーダル — common.jsのinitModalを使用
var modalApple = initModal('ingredientsModalApple');
var modalPeach = initModal('ingredientsModalPeach');
var modalChocolate = initModal('ingredientsModalChocolate');

// HTMLのonclick属性から参照されるグローバル関数
function openIngredientsModalApple() { modalApple.open(); }
function closeIngredientsModalApple() { modalApple.close(); }
function openIngredientsModalPeach() { modalPeach.open(); }
function closeIngredientsModalPeach() { modalPeach.close(); }
function openIngredientsModalChocolate() { modalChocolate.open(); }
function closeIngredientsModalChocolate() { modalChocolate.close(); }

// ポイントカードカルーセル（モバイル）— common.jsのinitMobileCarouselを使用
initMobileCarousel({
  trackSelector: '.p-protein__points-track',
  prevSelector: '.p-protein__points-nav--prev',
  nextSelector: '.p-protein__points-nav--next',
  cardSelector: '.p-protein__point-card'
});
