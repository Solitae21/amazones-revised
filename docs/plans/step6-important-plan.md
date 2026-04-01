# Step 6: `!important` 削減 実行計画

作成日: 2026-03-30
対象: SCSS全体の `!important` 宣言 190件（24ファイル）

---

## 方針

- Step 4（IDセレクタ廃止）・Step 5（セレクタ深さ修正）完了済みのため、詳細度の競合が大幅に減少
- 各 `!important` について「削除しても同じ結果になるか」を1件ずつ検証し、不要なものを削除
- ユーティリティクラス・サードパーティ由来・JS状態切替に必要な `!important` は維持
- **見た目を絶対に崩さない** — 判断に迷う場合は維持

---

## サマリ

| 分類 | 件数 | 対応 |
|------|:---:|------|
| A. サードパーティ / ライブラリ由来 | 19 | 維持（修正不可） |
| B. ユーティリティクラス | 1 | 維持（規約上許可） |
| C. JS状態切替 | 5 | 維持（機能上必須） |
| D. body/html リセット | 2 | 維持（グローバルリセット） |
| E. WordPress連携（wpac上書き） | 5 | 維持（wpac の !important に対抗） |
| F. 削除候補（メディアクエリ内） | 138 | 検証後削除 |
| G. 削除候補（通常ルール） | 20 | 検証後削除 |
| **合計** | **190** | **削除候補158件、現実的には80〜100件** |

> **注**: 削除候補158件のうち、カスケードチェーン（§H参照）や競合セレクタの関係で維持すべきものが相当数出る見込み。実行時に1件ずつ詳細度を検証し、安全なもののみ削除する。

---

## A. 維持: サードパーティ / ライブラリ由来（19件）

これらはサードパーティライブラリのCSSであり、`!important` の削除は動作破壊のリスクがあるため修正しない。

### Hamburger メニューライブラリ（11件）
| # | ファイル | 行 | セレクタ | プロパティ |
|---|---------|:---:|---------|-----------|
| 1 | `_storedetail-introduction.scss` | 7625 | `.hamburger--3dx.is-active .hamburger-inner` | `background-color: transparent` |
| 2 | 同上 | 7657 | `.hamburger--3dx-r.is-active .hamburger-inner` | `background-color: transparent` |
| 3 | 同上 | 7689 | `.hamburger--3dy.is-active .hamburger-inner` | `background-color: transparent` |
| 4 | 同上 | 7721 | `.hamburger--3dy-r.is-active .hamburger-inner` | `background-color: transparent` |
| 5 | 同上 | 7753 | `.hamburger--3dxy.is-active .hamburger-inner` | `background-color: transparent` |
| 6 | 同上 | 7785 | `.hamburger--3dxy-r.is-active .hamburger-inner` | `background-color: transparent` |
| 7 | 同上 | 8137 | `.hamburger--emphatic.is-active .hamburger-inner` | `background-color: transparent` |
| 8 | 同上 | 8192 | `.hamburger--emphatic-r.is-active .hamburger-inner` | `background-color: transparent` |
| 9 | 同上 | 8419 | `.hamburger--spring.is-active .hamburger-inner` | `background-color: transparent` |
| 10 | 同上 | 8509 | `.hamburger--stand.is-active .hamburger-inner` | `background-color: transparent` |
| 11 | 同上 | 8555 | `.hamburger--stand-r.is-active .hamburger-inner` | `background-color: transparent` |

### Swiper ライブラリ（4件）
| # | ファイル | 行 | セレクタ | プロパティ |
|---|---------|:---:|---------|-----------|
| 12 | `_storedetail-introduction.scss` | 11111 | `.swiper-navigation-disabled .swiper-button-*` | `display: none` |
| 13 | 同上 | 11117 | `.swiper-button-*:after` | `text-transform: none` |
| 14 | 同上 | 11155 | `.swiper-pagination-disabled > .swiper-pagination` | `display: none` |
| 15 | 同上 | 11215 | `.swiper-pagination-bullet:only-child` | `display: none` |

### ez-toc プラグイン（3件）
| # | ファイル | 行 | セレクタ | プロパティ |
|---|---------|:---:|---------|-----------|
| 16 | `_storedetail-introduction.scss` | 7356 | `.ez-toc-list` (media内) | `padding-left: 3rem` |
| 17 | 同上 | 7377 | `.ez-toc-list ul` | `list-style: none` |
| 18 | 同上 | 7389 | `.ez-toc-list li` | `list-style: none` |

### WordPress レビューウィジェット（1件 = 1行443宣言）
| # | ファイル | 行 | 備考 |
|---|---------|:---:|------|
| 19 | `_storedetail-review.scss` | 1 | `.wpac` / `.wp-gr` 関連。ミニファイ済み1行に443個の `!important`。CLAUDE.md Phase 1-1 でスキップ済み |

---

## B. 維持: ユーティリティクラス（1件）

規約上、ユーティリティクラスの `!important` は許可されている。

| # | ファイル | 行 | セレクタ | プロパティ |
|---|---------|:---:|---------|-----------|
| 20 | `_typography.scss` | 15 | `.text-decoration-none` | `text-decoration: none` |

---

## C. 維持: JS状態切替（5件）

JavaScriptによるクラス付与（`.active`, `.scrolling`, `.hidden-by-menu`）で状態を切り替えるため、`!important` が必須。

| # | ファイル | 行 | セレクタ | プロパティ | 理由 |
|---|---------|:---:|---------|-----------|------|
| 21 | `_header.scss` | 115 | `.l-header-floating-menu.active .scroll-down-text` | `pointer-events: auto` | base の `none` を上書き |
| 22 | 同上 | 120 | `.scroll-down-text.scrolling` | `opacity: 0` | `.active` 状態を上書き |
| 23 | 同上 | 142 | `.scroll-down-mobile.hidden-by-menu` | `display: none` | JSトグル |
| 24 | 同上 | 446 | `.l-header-floating-menu.active .scroll-down-text` (media内) | `opacity: 0` | モバイルで非表示 |
| 25 | 同上 | 447 | 同上 | `pointer-events: none` | 同上 |

---

## D. 維持: body/html リセット（2件）

グローバルリセットとして全ページに適用。削除すると予期しない余白が発生する可能性。

| # | ファイル | 行 | セレクタ | プロパティ |
|---|---------|:---:|---------|-----------|
| 26 | `utility/_responsive.scss` | 2828 | `body, html` | `margin: 0` |
| 27 | 同上 | 2829 | `body, html` | `padding: 0` |

---

## E. 維持: WordPress連携 wpac上書き（5件）

`.wpac` CSSが `color: inherit !important` を設定しているため、これを上書きするには `!important` が必須。

| # | ファイル | 行 | セレクタ | プロパティ |
|---|---------|:---:|---------|-----------|
| 28 | `_storedetail.scss` | 83 | `.p-storedetail__google-blue` | `color: #6186ec` |
| 29 | 同上 | 84 | `.p-storedetail__google-red` | `color: #cd523f` |
| 30 | 同上 | 85 | `.p-storedetail__google-yellow` | `color: #eabe43` |
| 31 | 同上 | 86 | `.p-storedetail__google-green` | `color: #63a45d` |
| 32 | 同上 | 837 | `.wp-gr .wp-google-text` | `white-space: normal` |

---

## F. 削除候補: メディアクエリ内（111件）

Step 4/5 完了後、基本スタイルの詳細度が下がったため、メディアクエリ内の `!important` は大半が不要になったと推定。
各項目について、基本スタイルの詳細度と比較し、`!important` なしで上書きできるか検証する。

### F-1. `_global-responsive.scss`（50件）

| # | 行 | セレクタ | プロパティ | メディアクエリ |
|---|:---:|---------|-----------|---------------|
| 33 | 28 | `.l-header__btn` | `padding-left: 14px` | `max-width: 1330px` |
| 34 | 29 | `.l-header__btn` | `padding-right: 14px` | `max-width: 1330px` |
| 35 | 169 | `.c-text-slider__slide-text` | `font-size: var(--fs-xl)` | `max-width: 1090px` |
| 36 | 180 | `.l-footer__main-container > div` | `flex-direction: column` | `max-width: 1090px` |
| 37 | 181 | 同上 | `align-items: flex-start` | `max-width: 1090px` |
| 38 | 182 | 同上 | `gap: 32px` | `max-width: 1090px` |
| 39 | 194 | `.l-footer__bottom` | `flex-direction: column` | `max-width: 1090px` |
| 40 | 195 | 同上 | `align-items: flex-start` | `max-width: 1090px` |
| 41 | 196 | 同上 | `gap: 20px` | `max-width: 1090px` |
| 42 | 209 | `.c-cookie-notice` | `padding-left: 1.25rem` | `max-width: 1090px` |
| 43 | 210 | 同上 | `padding-right: 1.25rem` | `max-width: 1090px` |
| 44 | 371 | `.tabs-controls` | `display: grid` | `max-width: 1090px` |
| 45 | 372 | 同上 | `grid-template-columns: repeat(2, 1fr)` | `max-width: 1090px` |
| 46 | 373 | 同上 | `row-gap: 10px` | `max-width: 1090px` |
| 47 | 374 | 同上 | `column-gap: 10px` | `max-width: 1090px` |
| 48 | 407 | `.news-label` | `padding-top: 8px` | `max-width: 1090px` |
| 49 | 408 | 同上 | `padding-bottom: 8px` | `max-width: 1090px` |
| 50 | 643 | `.c-shop__sticker-sp` | `display: block` | `max-width: 1090px` |
| 51 | 648 | `.c-shop__map-box--sp` | `display: block` | `max-width: 1090px` |
| 52 | 649 | 同上 | `position: relative` | `max-width: 1090px` |
| 53 | 655 | `.c-shop__map-box--sp .c-shop__map-img` | `margin: 0 auto` | `max-width: 1090px` |
| 54 | 656 | 同上 | `margin-left: 100px` | `max-width: 1090px` |
| 55 | 726 | `.c-shop__map-box--sp` | `left: 60px` | `max-width: 1000px` |
| 56 | 730 | `.c-shop__map-box--sp .c-shop__map-img` | `margin: 0 auto` | `max-width: 1000px` |
| 57 | 731 | 同上 | `margin-left: 0` | `max-width: 1000px` |
| 58 | 746 | `.c-shop__map-box--sp` | `left: 0` | `max-width: 900px` |
| 59 | 750 | 同上 | `width: 100%` | `max-width: 900px` |
| 60 | 752 | 同上 | `margin: 0` | `max-width: 900px` |
| 61 | 832 | `.c-shop__map-box--sp` | `left: -150px` | `max-width: 570px` |
| 62 | 836 | `.c-shop__map-box--sp .c-shop__map-img` | `margin-left: 190px` | `max-width: 570px` |
| 63 | 842 | `.c-shop__map-number` | `text-wrap: nowrap` | `max-width: 570px` |
| 64 | 846 | `.c-shop__map-number span` | `margin-left: -15px` | `max-width: 570px` |
| 65 | 851 | `.c-shop__ribbon--sp` | `margin-left: -180px` | `max-width: 570px` |
| 66 | 856 | `.c-shop__map-box--sp` | `left: -150px` | `max-width: 500px` |
| 67 | 860 | `.c-shop__map-box--sp .c-shop__map-img` | `margin-left: 190px` | `max-width: 500px` |
| 68 | 866 | `.c-shop__map-number` | `text-wrap: nowrap` | `max-width: 500px` |
| 69 | 870 | `.c-shop__map-number span` | `margin-left: -15px` | `max-width: 500px` |
| 70 | 1685 | `.c-faq__icon__q` | `width: 30px` | `max-width: 768px` |
| 71 | 1699 | `.c-faq__container__toggle--pc ~ .c-faq__accordion-inner` | `max-height: 0` | `max-width: 768px` |
| 72 | 1700 | 同上 | `opacity: 0` | `max-width: 768px` |
| 73 | 1701 | 同上 | `padding: 0` | `max-width: 768px` |
| 74 | 1702 | 同上 | `border-top-width: 0` | `max-width: 768px` |
| 75 | 1949 | `.c-footer-banner__stickers` | `display: flex` | `max-width: 768px` |
| 76 | 1961 | `.c-footer-banner__sticker1, __sticker2` | `display: block` | `max-width: 768px` |
| 77 | 1972 | `.c-footer-banner__sticker1 img:last-child` | `display: block` | `max-width: 768px` |
| 78 | 1982 | `.c-footer-banner__sticker1 img:first-child` | `display: block` | `max-width: 768px` |
| 79 | 1997 | `.c-footer-banner__sticker2 img:first-child` | `display: block` | `max-width: 768px` |
| 80 | 2200 | `.c-other-details-banner-item` | `gap: 15px` | `max-width: 500px` |
| 81 | 2204 | `.c-other-details-banner__list, -container` | `gap: 20px` | `max-width: 500px` |
| 82 | 2208 | `.c-other-details-banner-item__title` | `gap: 15px` | `max-width: 500px` |

### F-2. `_top.scss`（15件 — メディアクエリ内のもの）

| # | 行 | セレクタ | プロパティ | メディアクエリ |
|---|:---:|---------|-----------|---------------|
| 83 | 168 | `.p-top__hero-bg img` | `object-position: -70px 50px` | `max-width: 768px` |
| 84 | 171 | 同上 | `object-position: -30px 50px` | `max-width: 600px` |
| 85 | 174 | 同上 | `object-position: -100px center` | `max-width: 500px` |
| 86 | 398 | `.p-top__concept-store__img-text` | `padding-left: 20px` | `max-width: 768px` |
| 87 | 646 | `.p-top__medical-voice` | `margin-top: 0px` | `max-width: 768px` |
| 88 | 732 | `.p-top__point-column` | `flex-direction: column` | `max-width: 768px` |
| 89 | 735 | `.p-top__point-column .p-top__point-img` | `position: relative` | `max-width: 768px` |
| 90 | 989 | `.p-top__feature-img img` | `width: 60px` | `max-width: 768px` |
| 91 | 1110 | `.p-top__compare-item` | `gap: 10px` | `max-width: 768px` |
| 92 | 1142 | `.p-top__reason-column` | `flex-direction: column` | `max-width: 768px` |
| 93 | 1251 | `.p-top__instagram-grid` | `row-gap: 10px` | `max-width: 768px` |
| 94 | 1252 | 同上 | `column-gap: 10px` | `max-width: 768px` |
| 95 | 1253 | 同上 | `gap: 0px` | `max-width: 768px` |
| 96 | 1267 | `.p-top__instagram-grid__item` | `margin-left: 0px` | `max-width: 768px` |
| 97 | 1271 | `.p-top__instagram-icon-text` | `top: 180px` | `max-width: 768px` |

### F-3. `_storedetail.scss`（14件 — メディアクエリ内）

| # | 行 | セレクタ | プロパティ | メディアクエリ |
|---|:---:|---------|-----------|---------------|
| 98 | 1367 | `.c-service__container` | `display: flex` | `max-width: 1090px` |
| 99 | 1368 | 同上 | `flex-direction: row` | `max-width: 1090px` |
| 100 | 1371 | 同上 | `justify-content: flex-start` | `max-width: 1090px` |
| 101 | 1379 | `.c-service__wrapper*` | `max-width: 100%` | `max-width: 1090px` |
| 102 | 1380 | 同上 | `width: 100%` | `max-width: 1090px` |
| 103 | 1381 | 同上 | `margin-top: 0` | `max-width: 1090px` |
| 104 | 1389 | `.c-service__img` | `width: 100%` | `max-width: 1090px` |
| 105 | 1854 | `.p-storedetail__slider` | `display: none` | `max-width: 768px` |
| 106 | 1864 | `.slider-thumbs .grid` | `display: grid` | `max-width: 768px` |
| 107 | 1932 | `.c-service__container` | `display: flex` | `max-width: 768px` |
| 108 | 1933 | 同上 | `flex-direction: row` | `max-width: 768px` |
| 109 | 1936 | 同上 | `justify-content: flex-start` | `max-width: 768px` |
| 110 | 1946 | `.c-service__wrapper*` | `margin-top: 0` | `max-width: 768px` |
| 111 | 1980 | `.p-storedetail__service-header h2` | `font-size: var(--fs-6xl)` | `max-width: 768px` |

### F-4. `_protein.scss`（17件 — 全てメディアクエリ内）

| # | 行 | セレクタ | プロパティ | メディアクエリ |
|---|:---:|---------|-----------|---------------|
| 112 | 694 | `.p-protein__hero-text` | `margin-top: 0` | `max-width: 1200px` |
| 113 | 698 | `.p-protein__hero-text h1` | `font-size: var(--fs-base)` | `max-width: 1200px` |
| 114 | 709 | `.p-protein__hero-items` | `margin-top: 2.5rem` | `max-width: 1200px` |
| 115 | 710 | 同上 | `gap: 1rem` | `max-width: 1200px` |
| 116 | 716 | `.p-protein__hero-items .p-protein__hero-item:first-child` | `margin-bottom: 0` | `max-width: 1200px` |
| 117 | 801 | `.p-protein__hero-text` | `margin-top: 0` | `max-width: 768px` |
| 118 | 805 | `.p-protein__hero-text h1` | `font-size: var(--fs-base)` | `max-width: 768px` |
| 119 | 818 | `.p-protein__hero-items` | `padding: 2rem 1.5rem` | `max-width: 768px` |
| 120 | 819 | 同上 | `gap: 1rem` | `max-width: 768px` |
| 121 | 858 | `.p-protein-about__section-title h1` | `font-size: var(--fs-xl2)` | `max-width: 768px` |
| 122 | 890 | `.p-protein-about__advantages` | `flex-direction: row` | `max-width: 768px` |
| 123 | 892 | 同上 | `gap: 0` | `max-width: 768px` |
| 124 | 968 | `.p-protein__hero-text` | `margin-top: 0` | `max-width: 500px` |
| 125 | 972 | `.p-protein__hero-text h1` | `font-size: var(--fs-base)` | `max-width: 500px` |
| 126 | 993 | `.p-protein__hero-items` | `margin-top: 2.5rem` | `max-width: 500px` |
| 127 | 994 | 同上 | `gap: 1rem` | `max-width: 500px` |
| 128 | 1000 | `.p-protein__hero-items .p-protein__hero-item:first-child` | `margin-bottom: 0` | `max-width: 500px` |

### F-5. `_admission.scss`（8件 — 全てメディアクエリ内）

| # | 行 | セレクタ | プロパティ | メディアクエリ |
|---|:---:|---------|-----------|---------------|
| 129 | 142 | `.p-admission__graph-top__text` | `margin-left: 10px` | `max-width: 1090px` |
| 130 | 146 | `.p-admission__graph-bottom__text` | `margin-right: 70px` | `max-width: 1090px` |
| 131 | 149 | `.p-admission__graph-bottom__text-two` | `margin-right: -40px` | `max-width: 1090px` |
| 132 | 219 | `.p-admission__graph-img img` | `height: 340px` | `max-width: 768px` |
| 133 | 225 | `.p-admission__graph-bottom__text-two` | `z-index: 2` | `max-width: 768px` |
| 134 | 232 | `.p-admission__graph-bottom__img img` | `height: 340px` | `max-width: 768px` |
| 135 | 399 | `.p-admission__graph-img img` | `height: 340px` | `max-width: 500px` |
| 136 | 453 | `.p-admission__graph-bottom__img img` | `height: 340px` | `max-width: 500px` |

### F-6. `_slider.scss`（5件 — メディアクエリ内）

| # | 行 | セレクタ | プロパティ | メディアクエリ |
|---|:---:|---------|-----------|---------------|
| 137 | 266 | `.c-slider-tabs .tabs-control` | `padding-left: 16px` | `max-width: 1090px` |
| 138 | 277 | `.c-slider-tabs` | `background-image: url(...)` | `max-width: 1090px` |
| 139 | 286 | `.c-slider-tabs .c-slider-tabs__toggle-sp-container` | `display: block` | `max-width: 1090px` |
| 140 | 308 | `.c-slider-tabs .c-slider-tab__label` | `padding-left: 16px` | `max-width: 500px` |
| 141 | 59 | `.c-slider__item` | `height: 50px` | `max-width: 768px` |

### F-7. `_footer-banner.scss`（5件 — メディアクエリ内）

| # | 行 | セレクタ | プロパティ | メディアクエリ |
|---|:---:|---------|-----------|---------------|
| 143 | 182 | `.c-footer-banner__visual-container` | `display: flex` | `max-width: 1090px` |
| 144 | 194 | `.c-footer-banner__sticker1` | `display: block` | `max-width: 1090px` |
| 145 | 205 | `.c-footer-banner__sticker1 img:last-child` | `display: block` | `max-width: 1090px` |
| 146 | 214 | `.c-footer-banner__sticker1 img:first-child` | `display: block` | `max-width: 1090px` |
| 147 | 228 | `.c-footer-banner__sticker2 img:first-child` | `display: block` | `max-width: 1090px` |

### F-8. `_point_redemption.scss`（2件 — メディアクエリ内）

| # | 行 | セレクタ | プロパティ | メディアクエリ |
|---|:---:|---------|-----------|---------------|
| 148 | 391 | `.p-point-redemption__table-container` | `flex-direction: column` | `max-width: 768px` |
| 149 | 394 | `.p-point-redemption__table-container .p-point-redemption__table-inner` | `position: relative` | `max-width: 768px` |

### F-9. `_medical.scss`（4件 — 全てメディアクエリ内）

| # | 行 | セレクタ | プロパティ | メディアクエリ |
|---|:---:|---------|-----------|---------------|
| 150 | 1056 | `.p-medical__section` | `padding-left: 0.75rem` | `max-width: 768px` |
| 151 | 1057 | 同上 | `padding-right: 0.75rem` | `max-width: 768px` |
| 152 | 1074 | `.p-medical__content-card` | `width: calc(100% - 4rem)` | `max-width: 768px` |
| 153 | 1075 | 同上 | `padding: 2rem 1.75rem 14rem` | `max-width: 768px` |

### F-10. `_sportip.scss`（4件 — 全てメディアクエリ内）

| # | 行 | セレクタ | プロパティ | メディアクエリ |
|---|:---:|---------|-----------|---------------|
| 154 | 673 | `.p-sportip__cta-section` | `margin-bottom: 2rem` | `max-width: 768px` |
| 155 | 677 | `.p-sportip__cta-list` | `margin-top: 2.5rem` | `max-width: 768px` |
| 156 | 726 | `.p-sportip__content-wrap` | `max-width: 100%` | `max-width: 500px` |
| 157 | 727 | 同上 | `padding: 1rem 0.75rem` | `max-width: 500px` |

### F-11. `_price.scss`（4件 — 全てメディアクエリ内）

| # | 行 | セレクタ | プロパティ | メディアクエリ |
|---|:---:|---------|-----------|---------------|
| 158 | 566 | `.p-price__section-half` | `padding-top: 3rem` | `max-width: 768px` |
| 159 | 567 | 同上 | `padding-bottom: 3rem` | `max-width: 768px` |
| 160 | 571 | `.p-price__section-half:last-child` | `padding-top: 3rem` | `max-width: 768px` |
| 161 | 677 | `.p-price__course-detail` | `padding-bottom: 14rem` | `max-width: 768px` |

### F-12. `_footer.scss`（3件 — メディアクエリ内）

| # | 行 | セレクタ | プロパティ | メディアクエリ |
|---|:---:|---------|-----------|---------------|
| 162 | 140 | `.l-header-floating-menu__close` | `display: none` | `max-width: 1090px` |
| 163 | 352 | `.l-footer__page-link__arrow-icon` | `display: none` | `max-width: 768px` |
| 164 | 355 | `.l-footer__page-link__arrow-sign` | `display: inline-flex` | `max-width: 768px` |

> ※ `_footer.scss:20`（`.l-nav-menu-popup` の `background-color`）はメディアクエリ外のため G-3 に分類。

### F-13. `_personal.scss`（2件 — メディアクエリ内）

| # | 行 | セレクタ | プロパティ | メディアクエリ |
|---|:---:|---------|-----------|---------------|
| 165 | 602 | `.p-personal__section-half` | `padding-top: 3rem` | `max-width: 768px` |
| 166 | 603 | 同上 | `padding-bottom: 3rem` | `max-width: 768px` |

### F-14. `_contact.scss`（1件 — メディアクエリ内）

| # | 行 | セレクタ | プロパティ | メディアクエリ |
|---|:---:|---------|-----------|---------------|
| 167 | 346 | `.p-contact__notes__item` | `margin-top: 40px` | `max-width: 768px` |

### F-15. `_about.scss`（1件 — メディアクエリ内）

| # | 行 | セレクタ | プロパティ | メディアクエリ |
|---|:---:|---------|-----------|---------------|
| 168 | 247 | `.p-about__concept-img` | `transform: none` | `max-width: 1090px` |

### F-16. `_visitor.scss`（1件 — メディアクエリ内）

| # | 行 | セレクタ | プロパティ | メディアクエリ |
|---|:---:|---------|-----------|---------------|
| 169 | 493 | `.p-visitor__course-detail` | `padding-bottom: 14rem` | `max-width: 768px` |

### F-17. `_storedetail-introduction.scss`（2件 — メディアクエリ内）

| # | 行 | セレクタ | プロパティ | メディアクエリ |
|---|:---:|---------|-----------|---------------|
| 170 | 696 | `.main-navigation [href*="channel"]::before, ...` | `display: block` | `min-width: 768px` |
| 171 | 1630 | `.c-heading-w-line.add-link` | `align-items: baseline` | `min-width: 640px` |

---

## G. 削除候補: 通常ルール（20件）

メディアクエリ外で使用されている `!important`。基本スタイルとの詳細度比較で削除可否を判断。

### G-1. `_top.scss`（3件）

| # | 行 | セレクタ | プロパティ | 備考 |
|---|:---:|---------|-----------|------|
| 172 | 501 | `.p-top__concept-store__flex` | `align-items: flex-start` | 通常ルール |
| 173 | 547 | `.p-top__concept-store__bg-img img` | `object-position: center center` | 通常ルール |
| 174 | 1272 | `.p-top__instagram-icon-text span` | `left: -20px` | 通常ルール |

### G-2. `_header.scss`（2件）

| # | 行 | セレクタ | プロパティ | 備考 |
|---|:---:|---------|-----------|------|
| 175 | 205 | `.l-mobile-header-overlay` | `background: #ffffff` | base定義で十分な可能性 |
| 176 | 388 | `.l-header__sp-btn` | `width: 100%` | 通常ルール |

### G-3. `_footer.scss`（1件）

| # | 行 | セレクタ | プロパティ | 備考 |
|---|:---:|---------|-----------|------|
| 177 | 20 | `.l-nav-menu-popup` | `background-color: white` | base定義で十分な可能性 |

### G-4. `_slider.scss`（2件）

| # | 行 | セレクタ | プロパティ | 備考 |
|---|:---:|---------|-----------|------|
| 178 | 90 | `.c-slider__list` | `margin-left: 0` | 通常ルール（旧 Plan で F-6 にも重複記載されていた） |
| 179 | 113 | `.c-slider__item:last-child` | `padding-right: 0px` | 通常ルール |

### G-5. `_point_redemption.scss`（3件）

| # | 行 | セレクタ | プロパティ | 備考 |
|---|:---:|---------|-----------|------|
| 180 | 100 | `.p-point-redemption__badge` | `line-height: 30px` | 通常ルール |
| 181 | 119 | `.p-point-redemption__badge-blue` | `line-height: 30px` | 通常ルール |
| 182 | 255 | `.p-point-redemption__step-badge` | `line-height: 30px` | 通常ルール（メディアクエリ内とも重複確認要） |

### G-6. `_contact.scss`（1件）

| # | 行 | セレクタ | プロパティ | 備考 |
|---|:---:|---------|-----------|------|
| 183 | 197 | `.p-contact__form__checkbox-icon` | `margin-left: -48px` | 通常ルール |

### G-7. `_about.scss`（1件）

| # | 行 | セレクタ | プロパティ | 備考 |
|---|:---:|---------|-----------|------|
| 184 | 135 | `.p-about__concept-img` | `transform: translateY(-50%)` | 通常ルール |

### G-8. `_banner.scss`（2件）

| # | 行 | セレクタ | プロパティ | 備考 |
|---|:---:|---------|-----------|------|
| 185 | 44 | `.c-banner__text-main` | `white-space: normal` | 通常ルール |
| 186 | 47 | `.c-banner__text-main` | `text-wrap: wrap` | 通常ルール |

### G-9. `_hero.scss`（1件）

| # | 行 | セレクタ | プロパティ | 備考 |
|---|:---:|---------|-----------|------|
| 187 | 324 | `.c-hero__bg-img` | `overflow: hidden` | 通常ルール |

### G-10. `_family.scss`（1件）

| # | 行 | セレクタ | プロパティ | 備考 |
|---|:---:|---------|-----------|------|
| 188 | 152 | `.p-family__list` | `list-style-type: none` | 通常ルール |

### G-11. `_storedetail-introduction.scss`（1件）

| # | 行 | セレクタ | プロパティ | 備考 |
|---|:---:|---------|-----------|------|
| 189 | 366 | `.l-stick-image-container .l-stick-image-text` | `line-height: 2` | 同セレクタ内で重複（`line-height: 1.25rem` の直後） |

### G-12. `utility/_responsive.scss`（2件 — IDセレクタ残存）

| # | 行 | セレクタ | プロパティ | 備考 |
|---|:---:|---------|-----------|------|
| 190 | 1918 | `#about-three-vehicles-section .img-wrapper img` | `height: unset` | IDセレクタ使用（Step 4 除外対象と推定） |
| — | 1919 | 同上 | `width: 100%` | 同上 |

> **注**: #190 は IDセレクタを使用しているため、IDをクラスに変更すれば `!important` も不要になる可能性がある。ただし Step 4 で除外された理由の確認が必要。このペアはStep 6では維持とし、必要に応じて別途対応。

---

## H. カスケードチェーン（要注意）

以下のグループは、同じセレクタ＋プロパティが複数ブレークポイントにまたがって `!important` 付きで上書きし合っている。
**グループ内の `!important` は「全部外す」か「全部残す」の二択**。1箇所だけ外すとカスケードが壊れる。

### Chain 1: `.c-shop__map-box--sp` の `left`（5件）

| 行 | メディアクエリ | 値 |
|:---:|---------------|-----|
| 649 | `max-width: 1090px` | *(position: relative で left が有効化)* |
| 726 | `max-width: 1000px` | `left: 60px` |
| 746 | `max-width: 900px` | `left: 0` |
| 832 | `max-width: 570px` | `left: -150px` |
| 856 | `max-width: 500px` | `left: -150px` |

### Chain 2: `.c-shop__map-box--sp .c-shop__map-img` の `margin-left`（6件）

| 行 | メディアクエリ | 値 |
|:---:|---------------|-----|
| 655 | `max-width: 1090px` | `margin: 0 auto` |
| 656 | `max-width: 1090px` | `margin-left: 100px` |
| 730 | `max-width: 1000px` | `margin: 0 auto` |
| 731 | `max-width: 1000px` | `margin-left: 0` |
| 836 | `max-width: 570px` | `margin-left: 190px` |
| 860 | `max-width: 500px` | `margin-left: 190px` |

### Chain 3: `.c-shop__map-number` 関連（4件）

| 行 | メディアクエリ | セレクタ | 値 |
|:---:|---------------|---------|-----|
| 842 | `max-width: 570px` | `.c-shop__map-number` | `text-wrap: nowrap` |
| 846 | `max-width: 570px` | `.c-shop__map-number span` | `margin-left: -15px` |
| 866 | `max-width: 500px` | `.c-shop__map-number` | `text-wrap: nowrap` |
| 870 | `max-width: 500px` | `.c-shop__map-number span` | `margin-left: -15px` |

### Chain 4: `.c-service__container` の flex 設定（6件 × 2ファイル）

`_storedetail.scss` 内で同じプロパティが2つのブレークポイントに出現:

| 行 | メディアクエリ | プロパティ |
|:---:|---------------|-----------|
| 1367-1371 | `max-width: 1090px` | `display: flex`, `flex-direction: row`, `justify-content: flex-start` |
| 1932-1936 | `max-width: 768px` | 同上（同じ値） |

### Chain 5: `.p-protein__hero-text` 関連（9件）

3ブレークポイント（1200px, 768px, 500px）で同じセレクタ・プロパティが繰り返し:

| セレクタ | プロパティ | 行（1200px / 768px / 500px） |
|---------|-----------|---------------------------|
| `.p-protein__hero-text` | `margin-top: 0` | 694 / 801 / 968 |
| `.p-protein__hero-text h1` | `font-size: var(--fs-base)` | 698 / 805 / 972 |
| `.p-protein__hero-items` | `gap: 1rem` | 710 / 819 / 994 |

### Chain 6: `.p-admission__graph-*` の height（4件）

| セレクタ | 行（768px / 500px） |
|---------|-------------------|
| `.p-admission__graph-img img { height: 340px }` | 219 / 399 |
| `.p-admission__graph-bottom__img img { height: 340px }` | 232 / 453 |

### Chain 7: `.c-footer-banner__sticker*` の display（重複定義 × 2ファイル）

`_footer-banner.scss`（1090px）と `_global-responsive.scss`（768px）の両方に同じセレクタの `display` が存在:

| ファイル | 行 | メディアクエリ | セレクタ |
|---------|:---:|---------------|---------|
| `_footer-banner.scss` | 194 | `max-width: 1090px` | `.c-footer-banner__sticker1 { display: block }` |
| `_global-responsive.scss` | 1961 | `max-width: 768px` | `.c-footer-banner__sticker1, __sticker2 { display: block }` |
| 他、img 要素の display も同様パターン | | | |

**チェーン合計: 約34件が相互依存**

> **実行時の原則**: チェーン内の全項目について基本スタイル（メディアクエリ外）を特定し、**全項目を `!important` なしで上書きできる場合のみ一括削除**。1件でも不可なら全件維持。

---

## 実行順序

### Phase 1: 通常ルール内の `!important` 削除（18件）

リスクが低い通常ルール内の `!important` から着手。
対象: G-1 〜 G-11（G-12 は除外）。

**手順（1件ずつ）**:
1. 対象セレクタで grep し、同じ要素・プロパティに対する競合セレクタを全て洗い出す
2. 競合セレクタの詳細度を計算し、`!important` なしで意図した値が勝つか判定
3. HTMLにインラインスタイルやユーティリティクラスでの競合がないか確認
4. 安全と判定 → `!important` を削除
5. 判断に迷う → **維持**
6. **ファイルごとに** SCSS コンパイル＋ブラウザ確認

### Phase 2: メディアクエリ内（非チェーン）の `!important` 削除

チェーン（§H）に含まれない独立したメディアクエリ内 `!important` を処理。
対象: F セクションのうち §H に含まれない約104件。

**手順（ファイルごと）**:
1. 対象の `!important` について、メディアクエリ外の基本スタイルを特定
2. 基本スタイルのセレクタ詳細度と比較:
   - 同等 or メディアクエリ側が高い → `!important` 削除（後出しで勝てる）
   - 基本スタイルの方が高い → セレクタ調整で対応可能か検討、不可なら維持
3. **ファイル処理後にSCSSコンパイル＋ブラウザ確認（PC / タブレット / SP）**
4. 表示崩れがあれば即座にrevertし、該当項目を「維持」に変更

**ファイル処理順序**（影響範囲の小さいものから）:
1. `_visitor.scss`（1件）
2. `_about.scss`（1件）
3. `_contact.scss`（1件）
4. `_personal.scss`（2件）
5. `_storedetail-introduction.scss`（2件）
6. `_point_redemption.scss`（2件）
7. `_price.scss`（4件）
8. `_sportip.scss`（4件）
9. `_medical.scss`（4件）
10. `_footer.scss`（3件）
11. `_footer-banner.scss`（5件）
12. `_slider.scss`（5件）
13. `_admission.scss`（8件 — Chain 6 除く4件のみ）
14. `_storedetail.scss`（14件 — Chain 4 除く8件のみ）
15. `_top.scss`（15件）
16. `_protein.scss`（17件 — Chain 5 除く8件のみ）
17. `_global-responsive.scss`（50件 — Chain 1〜3,7 除く約35件のみ）

### Phase 3: カスケードチェーンの `!important` 削除

§H のチェーングループを1グループずつ処理。

**手順（グループごと）**:
1. グループ内の全項目について、メディアクエリ外の基本スタイルを特定
2. 全項目が `!important` なしで正しくカスケードするか検証
3. **全項目 OK → 一括削除**。1件でも NG → **グループ全体を維持**
4. 削除後 SCSS コンパイル＋**全ブレークポイントでブラウザ確認**

### Phase 4: 最終検証

- SCSS 最終コンパイル: `npx sass assets/scss/global.scss assets/css/global.css --no-source-map`
- 全ページ × 全ブレークポイント（PC 1440px / タブレット 1090px / SP 768px / SP 500px / SP 375px）でブラウザ確認
- 残った `!important` 件数をカウントし、この Plan の除外事項と照合

---

## 除外事項

| 対象 | 理由 |
|------|------|
| `_storedetail-review.scss` 全体 | WordPress レビューウィジェット（サードパーティ、443宣言）。CLAUDE.md Phase 1-1 でスキップ済み |
| Hamburger CSS / Swiper / ez-toc | サードパーティライブラリ。変更すると動作破壊のリスク |
| JS状態切替用 `!important`（5件） | `.active`, `.scrolling` 等のJSトグルに必須 |
| `#about-three-vehicles-section`（2件） | IDセレクタ残存。Step 4 除外対象の可能性 |

---

## リスク評価

| リスクレベル | 対象 | 件数 | 備考 |
|:---:|---------|:---:|------|
| 低 | 通常ルール内（G-1〜G-11） | 18 | 競合セレクタが少ない。実行時に個別検証 |
| 中 | メディアクエリ内・非チェーン（F のうち §H 除外） | ~104 | 基本スタイルとの詳細度比較が必要 |
| 高 | カスケードチェーン（§H） | ~34 | グループ単位の一括判定。1件でも不可ならグループ全体維持 |
| — | 維持項目（A〜E） | 32 | 修正しない |

**削除見込み（現実的）**: 80〜100件 / 190件
- 通常ルール: 18件中 15件程度は削除可能
- 非チェーンMQ: 104件中 60〜70件程度は削除可能
- チェーン: 34件中、全グループ削除可能なら最大34件、不可のグループがあれば0件単位で減少
- **残存見込み: 90〜110件**（維持32件 + 削除不可 60〜80件）
