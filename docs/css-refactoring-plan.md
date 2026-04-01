# CSS大規模リファクタリング計画書

作成日: 2026-03-29
対象: Amazonesブランディングサイト全CSS/SCSS/HTMLファイル
準拠元: `cording-guideline.md`

---

## 最重要原則（再掲）

**フロントエンドの表示結果は一切変更しないこと。**
すべてのリファクタリングは「内部構造の改善」であり、ブラウザ上の見た目に影響を与えてはならない。

---

## 現状の問題サマリ

| # | 規約項目 | 違反規模 |
|---|---------|---------|
| 1 | FLOCSS構成 | SCSSが完全にフラット。`_global.scss` 10,673行に全てが混在 |
| 2 | BEM記法 / FLOCSSプレフィクス | 推定750+クラスがプレフィクスなし。BEM `__` の代わりに `_` が約80件 |
| 3 | セレクタ深さ2階層まで | 69箇所が4階層以上（最深7階層） |
| 4 | IDセレクタ禁止 | 15個のID、46セレクタルールで使用 |
| 5 | `!important` 極力不使用 | SCSS全体で190箇所（global.scss 81件が最多） |
| 6 | カラー・フォントサイズ変数化 | カラー32箇所ハードコード、フォントサイズ変数ゼロ |

---

## リファクタリング順序

依存関係を考慮し、以下の順序で実施する。
先にインフラ（変数・構成）を整え、その上でセレクタ・命名を修正する。

```
Step 1: 変数定義の整備（カラー・フォントサイズ）
  ↓
Step 2: FLOCSS ディレクトリ構成への分離
  ↓
Step 3: BEM記法・FLOCSSプレフィクスの修正
  ↓
Step 4: IDセレクタ → クラスセレクタへの置換
  ↓
Step 5: セレクタ深さの修正（2階層以内）
  ↓
Step 6: !important の削減
  ↓
Step 7: ユーティリティクラスのプレフィクス統一
  ↓
Step 8: PC/SP 2ソース統一（HTML構造改善）
```

---

## Step 1: 変数定義の整備

### 1-1. カラー変数の整備

**現状**: `:root` に12色定義済み。32箇所でハードコード。

**作業内容**:
- 未定義カラーの変数追加（`:root` に追加）
  - `#faf8f5` → `--base-bgBeige`（body背景）
  - `#ccc` → `--base-borderGray`
  - `#333` → `--base-darkText`
  - `#555` → `--base-mediumText`
  - `#f5f5f5` → `--base-lightBg`
  - `#003032` → `--base-darkGreen`
  - `#5eada5` → `--base-greenAccent`
  - `#6c5ce7` / `#5b4bc4` → `--base-purple` / `--base-darkPurple`
  - `#1a1a2e` → `--base-navy`
  - `#e0e0e0` → `--base-borderLight`
  - `#4cc764` → `--base-successGreen`
  - その他グラデーション等で使用されている未変数カラー
- 既存変数があるのにハードコードしている箇所を `var()` に置き換え
  - `#4f4f4f` → `var(--text-black1)` / `var(--base-black)`
  - `#f53662` → `var(--text-red)` / `var(--base-red)`
  - `#81d8d0` → `var(--base-lightBlue)`
  - `#ffffff` → `var(--base-white)` （プロパティ値内の直書き）
  - `#ec73b2` → `var(--base-peach)`
  - `#8c4239` → `var(--base-brown)`

**対象ファイル**: `_global.scss`, `_top.scss`, `_medical.scss`, `_about.scss`, その他ハードコードがあるページSCSS

### 1-2. フォントサイズ変数の整備

**現状**: フォントサイズ変数は0件。コンポーネント内で63箇所以上がハードコード。

**作業内容**:
- 使用されているフォントサイズを洗い出し、変数として `:root` に定義

```scss
:root {
  /* フォントサイズ */
  --fs-xs: 0.75rem;   /* 12px */
  --fs-sm: 0.875rem;  /* 14px */
  --fs-base: 1rem;    /* 16px */
  --fs-md: 1.125rem;  /* 18px */
  --fs-lg: 1.25rem;   /* 20px */
  --fs-xl: 1.5rem;    /* 24px */
  --fs-2xl: 1.875rem; /* 30px */
  --fs-3xl: 2.25rem;  /* 36px */
  --fs-4xl: 2.5rem;   /* 40px */
  /* ... 必要に応じて追加 */
}
```

- ユーティリティクラス `.fs-*` の定義はそのまま残す（値の内部で変数を参照する形も可）
- コンポーネント・レイアウト内のハードコード `font-size` を `var()` に置き換え

**注意**: ユーティリティクラス `.fs-14` 等の定義は「ユーティリティの値定義」であり、それ自体は変数化の対象外。問題はコンポーネント・レイアウト内で直書きしている箇所。

---

## Step 2: FLOCSS ディレクトリ構成への分離

### 2-1. ディレクトリ作成

```
assets/scss/
  foundation/
    _variables.scss      ← :root 変数定義（Step 1 で整備した内容）
    _reset.scss          ← html/body リセット
    _base.scss           ← 基本タイポグラフィ
  layout/
    _header.scss         ← .l-header 関連（global.scss 6461〜6994行目を移動）
    _footer.scss         ← .l-footer 関連（global.scss 6997〜7694行目を移動）
    _container.scss      ← .l-container, .c-maxWidth 等
  object/
    component/
      _btn.scss          ← .c-btn 関連（global.scss 143行目〜, 5287〜5423行目）
      _card.scss         ← .c-card 関連
      _form.scss         ← .c-form 関連
      _animation.scss    ← .c-reveal, .c-animation-jump 等
      _breadcrumb.scss   ← パンくず
      _speech-bubble.scss
      _slider.scss       ← スライダー共通
      _section.scss      ← .c-section, .c-announcement, .c-endNote 等
      _cookie.scss       ← .c-cookie-notice
    project/
      _top.scss          ← 既存 _top.scss を移動
      _about.scss
      _admission.scss
      _column.scss
      _column-slag.scss
      _contact.scss
      _family.scss
      _faq.scss
      _information.scss
      _medical.scss
      _member.scss
      _payment.scss
      _personal.scss
      _point-redemption.scss
      _price.scss
      _protein.scss
      _reservation.scss
      _rules.scss
      _sitemap.scss
      _sportip.scss
      _storedetail.scss
      _storedetail-introduction.scss
      _storedetail-review.scss
      _storelist.scss
      _visitor.scss
    utility/
      _color.scss        ← .u-bg-*, .u-text-* 等
      _display.scss      ← .u-block, .u-flex, .u-hidden 等
      _typography.scss   ← .u-fs-*, .u-fw-*, .u-lh-*, .u-ls-* 等
      _space.scss        ← .u-m-*, .u-p-*, .u-mt-*, .u-pt-* 等
      _layout.scss       ← .u-flex-row, .u-items-center, .u-gap-* 等
      _border.scss       ← .u-radius-*, .u-z-* 等
      _jsutil.scss       ← JSプラグイン用CSS上書き
  plugins/
    _swiper.scss         ← Swiperカスタマイズ等
  style.scss             ← 全体のインポート（更新）
```

### 2-2. `_global.scss` の分解

`_global.scss`（10,673行）を上記の各ファイルに分離する。

| 行範囲（概算） | 移動先 | 内容 |
|---|---|---|
| 1〜5 | `foundation/_variables.scss` | フォントインポート |
| 6〜34 | `foundation/_variables.scss` | `:root` 変数定義 |
| 36〜66 | `foundation/_reset.scss` | html/body リセット |
| 67〜5280 | `object/utility/` 各ファイル | ユーティリティクラス群 |
| 5281〜5284 | `object/utility/_display.scss` | `.display-sp`, `.display-desk` |
| 5287〜5423 | `object/component/_btn.scss` | ボタンコンポーネント |
| 5426〜5612 | `object/component/_animation.scss` | アニメーション |
| 5559〜5622 | `object/component/_speech-bubble.scss` | 吹き出し |
| 5626〜5750 | `object/component/_slider.scss` | スライダー共通 |
| 5753〜6432 | `object/component/` 各ファイル | その他コンポーネント |
| 6433〜6460 | `object/component/_section.scss` | セクションヘッダー |
| 6461〜6994 | `layout/_header.scss` | ヘッダー |
| 6997〜7694 | `layout/_footer.scss` | フッター |
| 7695〜8162 | `object/component/` | バナー、クリップ等 |
| 8163〜8342 | `object/component/_section.scss` | アナウンスメント、エンドノート |
| 8343〜8400 | `object/component/_cookie.scss` | Cookie通知 |
| 8401〜10673 | レスポンシブ対応 → 各移動先ファイル内に統合 | メディアクエリ |

### 2-3. `style.scss` の更新

```scss
// ============================================
//  Amazones メインスタイルシート
// ============================================

// Foundation
@import "foundation/variables";
@import "foundation/reset";
@import "foundation/base";

// Layout
@import "layout/header";
@import "layout/footer";
@import "layout/container";

// Object - Component
@import "object/component/btn";
@import "object/component/card";
@import "object/component/form";
@import "object/component/animation";
@import "object/component/breadcrumb";
@import "object/component/speech-bubble";
@import "object/component/slider";
@import "object/component/section";
@import "object/component/cookie";

// Object - Project
@import "object/project/top";
@import "object/project/about";
// ... 各ページ

// Object - Utility
@import "object/utility/color";
@import "object/utility/display";
@import "object/utility/typography";
@import "object/utility/space";
@import "object/utility/layout";
@import "object/utility/border";
@import "object/utility/jsutil";

// Plugins
@import "plugins/swiper";
```

---

## Step 3: BEM記法・FLOCSSプレフィクスの修正

### 3-1. BEM区切り文字の修正（`_` → `__` / `--`）

**対象**: 約80クラス

| 現状 | 修正後 | ファイル |
|------|--------|---------|
| `.p-storedetail_topic_header` | `.p-storedetail__topic-header` | storedetail |
| `.p-storedetail_links-nav` | `.p-storedetail__links-nav` | storedetail |
| `.p-storedetail_opening_block` | `.p-storedetail__opening-block` | storedetail |
| `.p-storedetail_introduction_ribbon` | `.p-storedetail__introduction-ribbon` | storedetail |
| `.p-storedetail_gray_container` | `.p-storedetail__gray-container` | storedetail |
| `.p-storedetail_cutout` | `.p-storedetail__cutout` | storedetail |
| `.p-storedetail_map` | `.p-storedetail__map` | storedetail |
| `.p-storedetail_price_image_container` | `.p-storedetail__price-image-container` | storedetail |
| `.p-storedetail_cta_container` | `.p-storedetail__cta-container` | storedetail |
| `.p-storedetail_cta_stats_number` | `.p-storedetail__cta-stats-number` | storedetail |
| `.p-storedetail_dr-amazones` | `.p-storedetail__dr-amazones` | storedetail |
| `.p-storedetail_faq_ribbon` | `.p-storedetail__faq-ribbon` | storedetail |
| `.p-service_slider_wrapper` | `.p-service__slider-wrapper` | storedetail |
| `.p-service_nav` | `.p-service__nav` | storedetail |
| `.c-announcement_section` | `.c-announcement__section` | global |
| `.c-announcement_titleContainer` | `.c-announcement__title-container` | global |
| `.c-announcement_body` | `.c-announcement__body` | global |
| `.c-announcement_btn` | `.c-announcement__btn` | global |
| `.c-section_white` | `.c-section--white` | global |
| `.c-section_lightBlue` | `.c-section--light-blue` | global |
| `.c-endNote_section` | `.c-endNote__section` | global |
| `.c-endNote_card` | `.c-endNote__card` | global |
| `.c-endNote_card_header` | `.c-endNote__card-header` | global |
| `.c-endNote_card_icon` | `.c-endNote__card-icon` | global |
| `.c-endNote_card_body` | `.c-endNote__card-body` | global |
| `.c-endNote_row` | `.c-endNote__row` | global |
| `.btn_icn_light_blue` | `.c-btn__icn--light-blue` | global |
| `.accordion_inner` | `.c-accordion__inner` | global |
| `.c-recommended_btn` | `.c-recommended__btn` | global |
| `.p-attraction_page` | `.p-about__attraction` | about |
| `.p-protein_campaign_block` | `.p-protein__campaign-block` | protein等 |
| ... 他約50件 | ... | 各ファイル |

**手順**: 各クラスについて SCSS → CSS → HTML → JS の全参照を検索し、一括置換。

### 3-2. Layout系クラスへの `l-` プレフィクス付与

**対象**: `global.scss` 内の約50クラス

| 現状 | 修正後 |
|------|--------|
| `.header-btn` | `.l-header__btn` |
| `.header-btn--reservation` | `.l-header__btn--reservation` |
| `.header-floating-menu` | `.l-header-floating-menu` |
| `.floating-menu-btn` | `.l-header-floating-menu__btn` |
| `.floating-menu-content` | `.l-header-floating-menu__content` |
| `.mobile-header-overlay` | `.l-mobile-header-overlay` |
| `.sp-nav-header` | `.l-sp-nav__header` |
| `.sp-nav-*` (13種) | `.l-sp-nav__*` |
| `.mobile-hamburger` | `.l-header__hamburger` |
| `.sp-header-btn` | `.l-header__sp-btn` |
| `.nav-menu-popup` | `.l-nav-menu-popup` |
| `.footer-main-container` | `.l-footer__main-container` |
| `.footer-top` | `.l-footer__top` |
| `.footer-brand` | `.l-footer__brand` |
| `.footer-brand-logo` | `.l-footer__brand-logo` |
| `.footer-cta-links` | `.l-footer__cta-links` |
| `.footer-nav-*` (6種) | `.l-footer__nav-*` |
| `.footer-icon-link` | `.l-footer__icon-link` |
| `.footer-bottom` | `.l-footer__bottom` |
| `.footer-legal-links` | `.l-footer__legal-links` |
| `.footer-blue-btn` | `.l-footer__blue-btn` |
| `.scroll-up` | `.l-scroll-up` |

### 3-3. Component系クラスへの `c-` プレフィクス付与

**対象**: `global.scss`, ページ別SCSS内の約100クラス

| 現状 | 修正後 |
|------|--------|
| `.btn` | `.c-btn` |
| `.btn-green-wrapper` | `.c-btn--green-wrapper` |
| `.btn-light-blue` | `.c-btn--light-blue` |
| `.btn-light-blue02` | `.c-btn--light-blue02` |
| `.btn-red` | `.c-btn--red` |
| `.reveal` | `.c-reveal` |
| `.reveal-left` | `.c-reveal--left` |
| `.reveal-right` | `.c-reveal--right` |
| `.reveal-scale` | `.c-reveal--scale` |
| `.hover-text-underline` | `.c-hover-underline` |
| `.speech-bubble` | `.c-speech-bubble` |
| `.hero-ribbon` | `.c-hero-ribbon` |
| `.text-slider` | `.c-text-slider` |
| `.section-header-wrapper` | `.c-section-header__wrapper` |
| `.section-header-text` | `.c-section-header__text` |
| `.clip-img` | `.c-clip-img` |
| `.cookie-notice` | `.c-cookie-notice` |
| `.panel-content` | `.c-panel-content` |
| `.news-info-container` | `.c-news-info-container` |
| ... 他 | ... |

### 3-4. Project系クラスへの `p-` プレフィクス付与

**対象**: `top.css` 等のプレフィクスなしページ固有クラス

| 現状（top.css） | 修正後 |
|------|--------|
| `.carousel-container` | `.p-top__carousel-container` |
| `.carousel-img-container` | `.p-top__carousel-img-container` |
| `.mySlides` | `.p-top__slides` |
| `.hero-text-slider-container` | `.p-top__hero-text-slider` |
| `.hero-text` | `.p-top__hero-text` |
| `.news-banner-desk` | `.p-top__news-banner-desk` |
| `.news-banner-sp` | `.p-top__news-banner-sp` |
| `.service-container` | `.p-top__service-container` |
| `.service-wrapper` | `.p-top__service-wrapper` |
| `.service-img` | `.p-top__service-img` |
| `.dr-amazones-container` | `.p-top__dr-amazones` |
| `.training-machine-*` | `.p-top__training-machine-*` |
| `.voice-*` | `.p-top__voice-*` |
| `.movie-*` | `.p-top__movie-*` |
| ... 他 | ... |

同様に `storedetail.css`, `storedetail-introduction.css` 等のプレフィクスなしクラスも修正。

---

## Step 4: IDセレクタ → クラスセレクタへの置換

**対象**: 15個のID、46セレクタルール

### 4-1. global.scss のIDセレクタ（20ルール）

| 現状 | 修正後 | HTML変更 |
|------|--------|---------|
| `#scroll-down-text` | `.js-scroll-down-text` | id → class に変更、JS側も修正 |
| `#scroll-down-mobile` | `.js-scroll-down-mobile` | 同上 |
| `#floating-menu-btn` | `.js-floating-menu-btn` | 同上 |
| `#header-floating-menu` | `.js-header-floating-menu` | 同上 |
| `#nav-menu-popup` | `.js-nav-menu-popup` | 同上 |
| `#about-three-vehicles-section` | `.p-about__three-vehicles` | 同上 |

**注意**: 規約では「jsでの操作が必要なものに限りIDの指定OK」とある。
- HTMLの `id` 属性はJS操作用に残してもよい
- CSSセレクタとしてのID使用のみを禁止する
- CSSでは `.js-*` クラスまたは既存のクラスを使用する

### 4-2. storedetail-introduction.scss のIDセレクタ（13ルール）

| 現状 | 修正後 |
|------|--------|
| `#footer-menu-05` | `.l-footer-menu--05` |
| `#footer-menu-03` | `.l-footer-menu--03` |
| `#ez-toc-container` | `.c-toc-container` |
| `#front-steps` | `.c-front-steps` |

### 4-3. storelist.scss のIDセレクタ（6ルール）

| 現状 | 修正後 | 備考 |
|------|--------|------|
| `#hokkaido-tohoku` | `.p-storelist__region--hokkaido-tohoku` | アンカーリンク用のidは残す |
| `#kanto` | `.p-storelist__region--kanto` | 同上 |
| `#chubu` | `.p-storelist__region--chubu` | 同上 |
| `#kinki` | `.p-storelist__region--kinki` | 同上 |
| `#chugoku-shikoku` | `.p-storelist__region--chugoku-shikoku` | 同上 |
| `#kyushu-okinawa` | `.p-storelist__region--kyushu-okinawa` | 同上 |

### 4-4. その他のIDセレクタ

| ファイル | 現状 | 修正後 |
|---------|------|--------|
| storedetail.scss | `#js-slider` | `.js-slider` |
| top.scss | `#videoHolder` | `.js-video-holder` |

---

## Step 5: セレクタ深さの修正（2階層以内）

**対象**: 69箇所（4階層以上）

### 5-1. storedetail-introduction.css（46箇所）

旧WordPress由来のセレクタが大半。BEMクラスに置き換える。

例:
```css
/* Before (7階層) */
.sp-navigation .menu .menu-item .sub-menu .menu-item .sub-menu .menu-item { }

/* After (2階層) */
.l-sp-nav__sub-item { }
```

```css
/* Before (5階層) */
.c-footer-menu #footer-menu-03 .sub-menu .sub-menu > li { }

/* After (1階層) */
.l-footer-menu__sub-item { }
```

### 5-2. その他ファイル（23箇所）

例:
```css
/* Before (4階層) */
.news-section .panel-content:hover .news-info-container p:last-child { }

/* After (2階層) */
.c-panel-content:hover .c-news-info__text { }
```

```css
/* Before (4階層) */
.c-footer-banner__container a p img { }

/* After (2階層) */
.l-footer-banner__img { }
```

**手順**: 各セレクタについて
1. 対象要素を特定
2. BEMクラスを新規付与（HTMLに追加）
3. CSSセレクタを2階層以内に書き換え
4. 見た目が変わらないことを確認

---

## Step 6: `!important` の削減

**対象**: 190箇所

### 6-1. 削減方針

- Step 4（IDセレクタ廃止）と Step 5（セレクタ深さ修正）が完了すると、詳細度の競合が大幅に減少する
- その結果、多くの `!important` が不要になる
- Step 4/5 完了後に改めて `!important` の必要性を1件ずつ検証

### 6-2. ファイル別の対応

| ファイル | 件数 | 対応方針 |
|---------|:---:|---------|
| `_global.scss` | 81 | Step 4/5 完了後に大半が不要になる見込み |
| `_storedetail-introduction.scss` | 21 | WordPress由来。セレクタ修正と連動 |
| `_storedetail.scss` | 19 | セレクタ修正と連動 |
| `_top.scss` | 18 | セレクタ修正と連動 |
| `_protein.scss` | 17 | 個別検証 |
| その他11ファイル | 34 | 個別検証 |

### 6-3. 許容する `!important`

- Utility クラスでの使用は規約上許可されている
- ユーティリティクラス（`.u-*`）内の `!important` はそのまま残す

---

## Step 7: ユーティリティクラスのプレフィクス統一

**対象**: `global.scss` 内の約600+クラス

### 7-1. 命名変換ルール

| 現状 | 修正後 | 例 |
|------|--------|---|
| `.bg-*` | `.u-bg-*` | `.bg-white` → `.u-bg-white` |
| `.text-*`（色系） | `.u-text-*` | `.text-white` → `.u-text-white` |
| `.text-*`（配置系） | `.u-text-*` | `.text-center` → `.u-text-center` |
| `.font-*` | `.u-font-*` | `.font-outfit` → `.u-font-outfit` |
| `.fs-*` | `.u-fs-*` | `.fs-14` → `.u-fs-14` |
| `.fw-*` | `.u-fw-*` | `.fw-500` → `.u-fw-500` |
| `.lh-*` | `.u-lh-*` | `.lh-200` → `.u-lh-200` |
| `.ls-*` | `.u-ls-*` | `.ls-3` → `.u-ls-3` |
| `.block`, `.flex`, `.hidden` 等 | `.u-block`, `.u-flex`, `.u-hidden` | |
| `.relative`, `.absolute` 等 | `.u-relative`, `.u-absolute` | |
| `.top-0`, `.right-0` 等 | `.u-top-0`, `.u-right-0` | |
| `.radius-*` | `.u-radius-*` | |
| `.z-*` | `.u-z-*` | |
| `.overflow-*` | `.u-overflow-*` | |
| `.flex-row`, `.items-center` 等 | `.u-flex-row`, `.u-items-center` | |
| `.gap-*` | `.u-gap-*` | |
| `.grid-cols-*` | `.u-grid-cols-*` | |
| `.p-0`〜`.p-100`（パディング） | `.u-p-0`〜`.u-p-100` | **重要**: FLOCSS `p-` との衝突を解消 |
| `.pt-*`, `.pb-*`, `.pl-*`, `.pr-*`, `.px-*`, `.py-*` | `.u-pt-*`, `.u-pb-*` 等 | |
| `.m-*`, `.mt-*`, `.mb-*` 等 | `.u-m-*`, `.u-mt-*` 等 | |
| `.cg-*` | `.u-cg-*` | |
| `.col-*` | `.u-col-*` | |
| `.w-full`, `.w-fit-content` | `.u-w-full`, `.u-w-fit-content` | |
| `.cursor-pointer` | `.u-cursor-pointer` | |
| `.display-sp`, `.display-desk` | `.u-display-sp`, `.u-display-desk` | |

### 7-2. レスポンシブプレフィクス

現状 `lg-fs-*`, `sm-block` 等のレスポンシブユーティリティも存在。これらも統一。

| 現状 | 修正後 |
|------|--------|
| `.lg-fs-*` | `.u-lg-fs-*` |
| `.sm-block` | `.u-sm-block` |
| `.sm-fs-*` | `.u-sm-fs-*` |

### 7-3. 影響範囲

全23 HTMLファイルの `class` 属性内でユーティリティクラスが大量に使用されている。
置換は SCSS + CSS + 全HTML に対して一括で実施する。

**特に注意**: `.p-0` 〜 `.p-100` は FLOCSS の `p-`(Project) プレフィクスと衝突するため、最優先で `.u-p-*` に変更する。

---

## Step 8: PC/SP 2ソース統一（HTML構造改善）

### 8-1. c-shop セクション（index.html, about/index.html）

**現状**: PC用とSP用でHTML構造を完全に複製し、`display` で切り替え。

```html
<!-- 現状: 2ソース -->
<div class="c-shop__header--desk">...</div>
<div class="c-shop__header--sp">...</div>
<figure class="c-shop__map-box c-shop__map-box--sp">...</figure>
<figure class="c-shop__map-box">...</figure>
```

**修正後**: 1ソースにし、CSSメディアクエリでレスポンシブ対応。

```html
<!-- 修正後: 1ソース -->
<div class="c-shop__header">...</div>
<figure class="c-shop__map-box">...</figure>
```

**手順**:
1. PC版とSP版のHTML差分を比較
2. 共通化可能な構造を特定
3. CSSのメディアクエリで表示切替を実装
4. 重複HTMLを削除
5. ブラウザ確認（PC/タブレット/SP）

---

## 作業上の共通ルール

1. **1ステップずつ進め、都度ブラウザ確認を行う**
2. **クラス名変更時は必ず SCSS → CSS → HTML → JS の全参照を検索し漏れなく置換する**
3. **判断に迷う場合は修正しない（安全側に倒す）**
4. **WordPress由来のコード（storedetail-introduction.css等）は特に慎重に扱う**
5. **各Stepの着手前にユーザーに確認を取る**
6. **各Stepの着手前に Plan を作成し、`plans/` ディレクトリに保存する（下記参照）**

---

## Step別 Plan の運用ルール

### 目的

10,673行の `_global.scss` を含む大規模リファクタリングでは、事前調査なしに着手すると置換漏れ・誤置換が発生しやすい。
各Stepの着手前にPlanを作成し、**対象箇所・置換マップ・除外条件・リスク評価**を明文化することで、以下を実現する:

- 置換漏れの防止（全量調査に基づくチェックリスト化）
- 誤置換の防止（除外条件の明確化）
- 見た目を崩すリスクの事前把握と対策
- セッションをまたいだ作業の引き継ぎ

### 運用ルール

1. 各Stepの作業開始前に、Planエージェントで現状調査を実施する
2. 調査結果を `plans/step{N}-{slug}-plan.md` として保存する
3. Planにはファイル名・行番号・旧値・新値の具体的な置換マップを含める
4. リスクの高い箇所（WordPress由来、多値プロパティ内、グラデーション内等）を明示する
5. 変数化対象外・除外条件を明示する
6. ユーザーの承認を得てからPlanに基づいて作業を開始する

### Plan ファイル一覧

| Step | Plan ファイル | ステータス |
|------|-------------|-----------|
| Step 1 | `plans/step1-variables-plan.md` | 作成済み |
| Step 2 | `plans/step2-flocss-plan.md` | 未着手 |
| Step 3 | `plans/step3-bem-plan.md` | 未着手 |
| Step 4 | `plans/step4-id-selector-plan.md` | 未着手 |
| Step 5 | `plans/step5-selector-depth-plan.md` | 未着手 |
| Step 6 | `plans/step6-important-plan.md` | 未着手 |
| Step 7 | `plans/step7-utility-prefix-plan.md` | 未着手 |
| Step 8 | `plans/step8-pc-sp-unify-plan.md` | 未着手 |

---

## 影響を受けるファイル（全体像）

| カテゴリ | ファイル数 | 内容 |
|---------|:---:|------|
| SCSS | 27 | 全SCSSファイル（分離・リネーム・内容修正） |
| CSS | 26 | 全CSSファイル（SCSSコンパイル結果） |
| HTML | 23 | 全HTMLファイル（クラス名変更） |
| JS | 4〜5 | global.js, common.js, storedetail.js 等（セレクタ参照の修正） |
| style.scss | 1 | インポートパス変更 |
