# Step 5: セレクタ深さの修正（2階層以内）— 実行計画

作成日: 2026-03-30
対象: 全SCSSファイル内の3階層以上のセレクタを2階層以内に修正

---

## 最重要原則（再掲）

**フロントエンドの表示結果は一切変更しないこと。**
セレクタ深さの修正は「内部構造の改善」であり、ブラウザ上の見た目に影響を与えてはならない。

---

## 概要

- **対象**: 全SCSSファイル中の3階層以上のセレクタ
- **目標**: すべてのセレクタを2階層以内に修正（規約準拠）
- **除外**: WordPress由来コード（`_storedetail-introduction.scss`, `_responsive.scss`の一部）
- **JS変更**: 行わない（CSSセレクタのみ修正、HTML側にクラスを追加）

### 深さの数え方

- 子孫結合子（スペース）= 1階層追加
- 子結合子（`>`）= 1階層追加
- 隣接/一般兄弟結合子（`+` / `~`）= 1階層追加
- 同一要素へのチェーン（`.block__el.modifier`, `.block__el:hover`, `.block__el::after`）= 同一階層

例:
- `.a .b` = 2階層 (OK)
- `.a .b .c` = 3階層 (NG)
- `.a.active .b` = 2階層 (OK)
- `.a > .b > .c` = 3階層 (NG)
- `.a ~ .b .c` = 3階層 (NG)

---

## 修正方針

### 方針A: HTML側に直接クラスを追加してセレクタを1-2階層に短縮

最も安全な手法。対象要素にBEMクラスを新規付与し、CSSセレクタを簡素化する。

### 方針B: 中間階層を省略

構造上、中間の祖先が詳細度に寄与していない場合、省略して2階層に短縮する。

### 方針C: コンテキスト依存をBEMモディファイアに置換

`.parent .child` パターンを `.child--variant` に置き換える。

---

## ファイル別対象一覧

---

### 1. foundation/_reset.scss（1箇所）

| # | 行 | 現在のセレクタ | 深さ | 修正後 | 方針 | リスク |
|---|---|---|---|---|---|---|
| 1-1 | 9 | `html body a` | 3 | `a`（リセットCSS内なので `body a` で十分、もしくは `a` 単体） | B | Safe |

**備考**: `html body a` は詳細度を上げるためのパターンだが、リセットCSSでは不要。`a` 単体にすると詳細度が下がるため、他のルールとの競合を確認する必要がある。安全に `body a`（2階層）に短縮可能。

---

### 2. layout/_footer.scss（4箇所）

Step 4でIDセレクタをクラスに置換した結果、4階層のセレクタが発生している。

| # | 行 | 現在のセレクタ | 深さ | 修正後 | 方針 | リスク |
|---|---|---|---|---|---|---|
| 2-1 | 91-92 | `.l-header-floating-menu .l-header-floating-menu__btn .desktop-menu-icon` / `> p` | 3 | `.l-header-floating-menu__btn .desktop-menu-icon` / `.l-header-floating-menu__btn > p` | B | Safe |
| 2-2 | 102 | `.l-header-floating-menu .l-header-floating-menu__btn .l-header__hamburger` | 3 | `.l-header-floating-menu__btn .l-header__hamburger` | B | Safe |
| 2-3 | 111 | `.l-header-floating-menu .l-header-floating-menu__btn .mh-bar` | 3 | `.l-header-floating-menu__btn .mh-bar` | B | Safe |
| 2-4a | 123-127 | `.l-header-floating-menu.active .l-header-floating-menu__btn .l-header__hamburger .mh-bar:nth-child(1)` | 4 | `.l-header-floating-menu.active .l-header__hamburger-bar:nth-child(1)` (HTMLの `.mh-bar` に `.l-header__hamburger-bar` を追加) | A | Safe |
| 2-4b | 129-132 | 同上 `:nth-child(2)` | 4 | `.l-header-floating-menu.active .l-header__hamburger-bar:nth-child(2)` | A | Safe |
| 2-4c | 136-141 | 同上 `:nth-child(3)` | 4 | `.l-header-floating-menu.active .l-header__hamburger-bar:nth-child(3)` | A | Safe |
| 2-5 | 429 | `.l-footer__nav-section.open .l-footer__page-link img.accordion-arrow` | 3 | `.l-footer__nav-section.open .l-footer__page-link-arrow` (HTML側にクラス追加) | A | Needs care |

**備考**:
- 2-1〜2-3（方針B）: `.l-header-floating-menu__btn` はBEM子要素であり、grep確認で `.l-header-floating-menu` の外では使われていない。したがって親階層の省略は安全。**実行前にgrepで `l-header-floating-menu__btn` の全出現箇所を確認し、`l-header-floating-menu` 外での使用がないことを再検証すること。**
- 2-4a/b/c（方針A）: 4階層→2階層にするため、`.mh-bar` に新規クラス `.l-header__hamburger-bar` を追加してHTMLから直接指定する。同時に 2-3 の `.mh-bar` も `.l-header__hamburger-bar` に統一する。
- 2-5: `img.accordion-arrow` という修飾が入っているため、HTMLにクラスを付与する方が安全。

---

### 3. layout/_header.scss（3箇所）

| # | 行 | 現在のセレクタ | 深さ | 修正後 | 方針 | リスク |
|---|---|---|---|---|---|---|
| 3-1 | 474 | `.l-header__hamburger.active .mh-bar:nth-child(1)` | 2 | -- (既に2階層、OK) | -- | -- |
| 3-2 | 506-507 | `.l-header-wrapper .header-text` | 2 | -- (既に2階層、OK) | -- | -- |

**備考**: _header.scss は精査の結果、3階層以上のセレクタなし。OK。

---

### 4. _global-responsive.scss（14箇所）

| # | 行 | 現在のセレクタ | 深さ | 修正後 | 方針 | リスク |
|---|---|---|---|---|---|---|
| 4-1 | 168 | `.c-text-slider .slide p` | 3 | `.c-text-slider__slide-text` (HTMLにクラス追加) | A | Safe |
| 4-2 | 275-276 | `[data-widget="tabs"] [data-type="fancy"].tabs-controls .tabs-control` | 3 | `.c-tabs-fancy .tabs-control` (HTMLにクラス追加) | A | Needs care |
| 4-3 | 289 | 同上（1090px MQ内） | 3 | 同上 | A | Needs care |
| 4-4 | 300-306 | `[data-widget="tabs"] [data-type="fancy"].tabs-controls .tabs-control:hover` / `[aria-selected="true"]` | 3 | `.c-tabs-fancy .tabs-control:hover` / `[aria-selected="true"]` | A | Needs care |
| 4-5 | 307 | `[data-widget="tabs"] [data-type="fancy"].tabs-controls .tabs-control::before` | 3 | `.c-tabs-fancy .tabs-control::before` | A | Needs care |
| 4-6 | 331 | `.news-section .c-panel-content:hover .c-news-info-container p:last-child` | 4 | `.c-panel-content:hover .c-news-info__last-text` (HTMLにクラス追加) | A | Safe |
| 4-7 | 336 | `.news-section .c-panel-content > img` | 3 | `.c-panel-content > .c-panel-content__arrow` (HTMLにクラス追加) | A | Safe |
| 4-8 | 378 | `[data-widget="tabs"] [data-type="fancy"].tabs-controls .tabs-control` (MQ内) | 3 | 4-2と同じ修正 | A | Needs care |
| 4-9 | 1563 | `.c-faq__container__toggle:checked ~ .c-faq__accordion-header .c-faq__toggle-icon::after` | 3 | `.c-faq__container__toggle:checked ~ .c-faq__toggle-icon--collapse::after` (構造変更不可、Skip候補) | -- | Needs care |
| 4-10 | 1670-1672 | `.c-faq__container__toggle:checked ~ .c-faq__accordion-header .c-faq__accordion-toggle::after` | 3 | 4-9と同パターン | -- | Needs care |
| 4-11 | 1893 | `.c-footer-banner__btn p img` | 3 | `.c-footer-banner__btn-icon` (HTMLにクラス追加) | A | Safe |
| 4-12 | 1941 | `.c-footer-banner__container h2 b` | 3 | `.c-footer-banner__heading-accent` (HTMLにクラス追加) | A | Safe |
| 4-13 | 2195 | `.c-other-details-banner-item .c-other-details-banner-item__title img` | 3 | `.c-other-details-banner-item__title-img` (HTMLにクラス追加) | A | Safe |
| 4-14 | 392 | `.c-panel-content .c-news-info-container` | 2 | -- (OK) | -- | -- |

**備考（4-2/4-3/4-5/4-8 tabs系）**: `[data-widget="tabs"]` はJS由来の属性セレクタ。HTMLの `[data-widget="tabs"]` 要素に `.c-tabs` クラスを追加し、`[data-type="fancy"].tabs-controls` に `.c-tabs-fancy` を追加することで2階層化できる。ただしJS側を変更しない制約があるため、**既存のHTML属性はそのまま残し、クラスを追加するだけ**とする。

**備考（4-9/4-10 FAQ toggle系）**: `input:checked ~ header .icon::after` というパターンは、チェックボックスの状態で兄弟要素の子を変更する構造的に3階層必須のパターン。構造を変えずにセレクタを短縮するのが困難。**このパターンはSkipする**（2箇所）。

---

### 5. object/component/_footer-banner.scss（2箇所）

| # | 行 | 現在のセレクタ | 深さ | 修正後 | 方針 | リスク |
|---|---|---|---|---|---|---|
| 5-1 | 133 | `.c-footer-banner__container a p img` | 4 | `.c-footer-banner__link-icon` (HTMLにクラス追加) | A | Safe |
| 5-2 | 173 | `.c-footer-banner__container h2 span` | 3 | `.c-footer-banner__heading-sub` (HTMLにクラス追加) | A | Safe |

---

### 6. object/component/_slider.scss（2箇所）

| # | 行 | 現在のセレクタ | 深さ | 修正後 | 方針 | リスク |
|---|---|---|---|---|---|---|
| 6-1 | 53 | `.c-text-slider .slide p` | 3 | `.c-text-slider__slide-text` (4-1と同じクラス) | A | Safe |
| 6-2 | 322 | `.c-topic-slider__track .slide img:not(a img)` | 4 | `.c-topic-slider__slide-img` (HTMLにクラス追加) | A | Safe |

**備考**: 6-1は4-1と同じ要素を対象としている（重複定義）。両方同時に修正する。

---

### 7. object/project/_top.scss（4箇所）

| # | 行 | 現在のセレクタ | 深さ | 修正後 | 方針 | リスク |
|---|---|---|---|---|---|---|
| 7-1 | 394 | `.p-top__news-banner-sp .p-top__news-banner-context p:last-child` | 3 | `.p-top__news-banner-last-text` (HTMLにクラス追加) | A | Safe |
| 7-2 | 397-398 | `.p-top__news-banner-sp .p-top__news-30min-label` | 2 | -- (OK) | -- | -- |
| 7-3 | 403 | `.p-top__news-banner-sp .p-top__news-30min-label img` | 3 | `.p-top__news-30min-label-img` (HTMLにクラス追加) | A | Safe |
| 7-4 | 470 | `.c-text-slider .slide p` | 3 | 4-1/6-1と同じ修正 | A | Safe |

---

### 8. object/project/_about.scss（1箇所）

| # | 行 | 現在のセレクタ | 深さ | 修正後 | 方針 | リスク |
|---|---|---|---|---|---|---|
| 8-1 | 256 | `.p-attraction__page .c-shop__bg` | 2 | -- (OK) | -- | -- |

**備考**: _about.scss は精査の結果、3階層以上のセレクタなし。

---

### 9. object/project/_storedetail.scss（7箇所）

| # | 行 | 現在のセレクタ | 深さ | 修正後 | 方針 | リスク |
|---|---|---|---|---|---|---|
| 9-1 | 871 | `.p-storedetail__slider .swiper-slide img` | 3 | `.p-storedetail__slider-img` (HTMLにクラス追加) | A | Safe |
| 9-2 | 887 | `.slider-thumbs .js-thumb-button img` | 3 | `.slider-thumbs__img` (HTMLにクラス追加) | A | Safe |
| 9-3 | 1605 | `.p-storedetail__price-header > .c-section__sub-text > svg` | 3 | `.p-storedetail__price-header-svg` (HTMLにクラス追加) | A | Safe |
| 9-4 | 1610 | `.p-storedetail__price-header > .c-section__sub-text h3` | 3 | `.p-storedetail__price-header-title` (HTMLにクラス追加) | A | Safe |
| 9-5 | 1613 | `.p-storedetail__price-header > .c-section__sub-text p` | 3 | `.p-storedetail__price-header-desc` (HTMLにクラス追加) | A | Safe |
| 9-6 | 1885 | `.slider-thumbs .grid > *` | 3 | `.slider-thumbs__cell` (HTMLにクラス追加) | A | Safe |
| 9-7 | 1892 | `.slider-thumbs .js-thumb-button img` (MQ内) | 3 | 9-2と同じ | A | Safe |

---

### 10. object/project/_admission.scss（11箇所）

| # | 行 | 現在のセレクタ | 深さ | 修正後 | 方針 | リスク |
|---|---|---|---|---|---|---|
| 10-1 | 104 | `.p-admission-step4-ul li div` | 3 | `.p-admission-step4__item-content` (HTMLにクラス追加) | A | Safe |
| 10-2 | 212 | `.p-admission-page .c-banner__sticker2 img:first-child` | 3 | `.p-admission-page__sticker2-img01` (HTMLにクラス追加) | A | Safe |
| 10-3 | 218 | `.p-admission-page .c-banner__sticker2 img:last-child` | 3 | `.p-admission-page__sticker2-img02` (HTMLにクラス追加) | A | Safe |
| 10-4 | 228 | `.p-admission-page .c-footer-banner__sticker2 img:first-child` | 3 | `.p-admission-page__footer-sticker2-img01` (HTMLにクラス追加) | A | Needs care |
| 10-5 | 231 | `.p-admission-page .c-footer-banner__sticker2 img:last-child` | 3 | `.p-admission-page__footer-sticker2-img02` (HTMLにクラス追加) | A | Needs care |
| 10-6 | 339 | `.p-admission-item .p-admission-item__header img` | 3 | `.p-admission-item__header-img` (HTMLにクラス追加) | A | Safe |
| 10-7 | 402 | `.p-admission-page .c-footer-banner__sticker2 img:first-child` (MQ) | 3 | 10-4と同じクラス | A | Needs care |
| 10-8 | 406 | `.p-admission-page .c-footer-banner__sticker2 img:last-child` (MQ) | 3 | 10-5と同じクラス | A | Needs care |
| 10-9 | 448 | `.p-admission-page .c-footer-banner__sticker2 img:first-child` (MQ) | 3 | 10-4と同じクラス | A | Needs care |
| 10-10 | 452 | `.p-admission-page .c-footer-banner__sticker2 img:last-child` (MQ) | 3 | 10-5と同じクラス | A | Needs care |

**備考**: 10-4/5/7/8/9/10はページ固有のスティッカー画像のサイズ調整。同じ `img` 要素の複数MQにまたがるスタイル。HTMLに1つクラスを付与すれば全MQで対応可能。

---

### 11. object/project/_column-slag.scss（4箇所）

| # | 行 | 現在のセレクタ | 深さ | 修正後 | 方針 | リスク |
|---|---|---|---|---|---|---|
| 11-1 | 38 | `.p-column-slag__wrapper h2 span` | 3 | `.p-column-slag__heading-icon` (HTMLにクラス追加) | A | Safe |
| 11-2 | 215 | `.p-article-body__content-blue ul li` | 3 | `.p-article-body__content-blue-item` (HTMLにクラス追加) | A | Safe |
| 11-3 | 219 | `.p-article-body__content-blue ul li::marker` | 3 | `.p-article-body__content-blue-item::marker` | A | Safe |
| 11-4 | 246 | `.p-column-slag__wrapper article img` | 3 | `.p-column-slag__article-img` (HTMLにクラス追加) | A | Safe |

---

### 12. object/project/_family.scss（14箇所）

| # | 行 | 現在のセレクタ | 深さ | 修正後 | 方針 | リスク |
|---|---|---|---|---|---|---|
| 12-1 | 23 | `.p-family__container__content01 > div p` | 3 | `.p-family__content01-text` (HTMLにクラス追加) | A | Safe |
| 12-2 | 78 | `.p-family__table thead th` | 3 | `.p-family__table-th` (HTMLにクラス追加) | A | Safe |
| 12-3 | 88 | `.p-family__table tbody td` | 3 | `.p-family__table-td` (HTMLにクラス追加) | A | Safe |
| 12-4 | 95 | `.p-family__table tbody tr:hover` | 3 | `.p-family__table-row:hover` (HTMLにクラス追加) | A | Safe |
| 12-5 | 100 | `.p-family__table tbody tr td:first-child` | 4 | `.p-family__table-td--first` (HTMLにクラス追加) | A | Safe |
| 12-6 | 103 | `.p-family__table tbody tr td:last-child` | 4 | `.p-family__table-td--last` (HTMLにクラス追加) | A | Safe |
| 12-7 | 144 | `.p-family__main .c-banner__sticker2 .c-banner__speechbubble1` | 3 | `.p-family__sticker2-img0201` (HTMLにクラス追加) | A | Safe |
| 12-8 | 147 | `.p-family__main .c-banner__sticker2 .banner-img02` | 3 | `.p-family__sticker2-img02` (HTMLにクラス追加) | A | Safe |
| 12-9 | 155 | `.p-family__main .c-footer-banner__sticker2 img:first-child` | 3 | `.p-family__footer-sticker2-img01` (HTMLにクラス追加) | A | Safe |
| 12-10 | 159 | `.p-family__main .c-footer-banner__sticker2 img:last-child` | 3 | `.p-family__footer-sticker2-img02` (HTMLにクラス追加) | A | Safe |
| 12-11 | 237 | `.p-family__container__content01 .c-flex-gap-30 img` | 3 | `.p-family__content01-img` (HTMLにクラス追加) | A | Safe |
| 12-12 | 259 | `.p-family__table tbody tr td:first-child` (MQ) | 4 | 12-5と同じクラス | A | Safe |
| 12-13 | 272 | `.p-family__table tbody td` (MQ) | 3 | 12-3と同じクラス | A | Safe |
| 12-14 | 291/296 | `.p-family__main .c-footer-banner__sticker2 img:last-child/first-child` (MQ) | 3 | 12-9/12-10と同じクラス | A | Safe |

---

### 13. object/project/_faq.scss（1箇所）

| # | 行 | 現在のセレクタ | 深さ | 修正後 | 方針 | リスク |
|---|---|---|---|---|---|---|
| 13-1 | 115 | `.p-faq__page__item .c-faq__accordion-header img` | 3 | `.p-faq__accordion-icon` (HTMLにクラス追加) | A | Safe |

---

### 14. object/project/_medical.scss（8箇所）

| # | 行 | 現在のセレクタ | 深さ | 修正後 | 方針 | リスク |
|---|---|---|---|---|---|---|
| 14-1 | 621 | `.p-medical__banner-logo--pc ~ h1 p > span` | 4 | `.p-medical__banner-heading-span` (HTMLにクラス追加) | A | Needs care |
| 14-2 | 637 | `.p-medical__banner-logo--pc ~ h1 p > span` (MQ内) | 4 | 同上 | A | Needs care |
| 14-3 | 671 | `.p-medical__banner-content svg[viewBox="0 0 441 67"]` | 5 | `.p-medical__banner-logo-svg` (HTMLにクラス追加) | A | Safe |
| 14-4 | 720 | `.p-medical__engagement-logo svg[viewBox="0 0 441 67"]` | 5 | `.p-medical__engagement-logo-svg` (HTMLにクラス追加) | A | Safe |
| 14-5 | 862 | `.p-medical__online-consultation-banner .c-badge-white p` | 3 | `.p-medical__badge-text` (HTMLにクラス追加) | A | Safe |
| 14-6 | 1062 | `.c-announcement__body .bg-gray > p:last-child` | 3 | `.p-medical__announcement-last-text` (HTMLにクラス追加) | A | Safe |
| 14-7 | 1068 | `.c-announcement__body .bg-gray div p` | 4 | `.p-medical__announcement-desc` (HTMLにクラス追加) | A | Safe |

**備考**: 14-1/14-2は `~`（一般兄弟結合子）を使ったパターン。`h1 p > span` 内の `span` にクラスを追加して直接指定に置き換える。14-3/14-4は属性セレクタ `svg[viewBox="..."]` で特定のSVGを選択しており、viewBoxの値が変わると壊れる脆弱な構造。クラスを追加するのが安全。

---

### 15. object/project/_personal.scss（1箇所）

| # | 行 | 現在のセレクタ | 深さ | 修正後 | 方針 | リスク |
|---|---|---|---|---|---|---|
| 15-1 | 38 | `.p-personal-banner .c-hero-slider__frames__clip1 .c-clip-img` | 3 | `.p-personal-banner .c-clip-img` (中間階層省略) | B | Safe |

**備考**: 方針B（中間階層省略）を使用。**実行前にgrepで `.c-clip-img` の全出現箇所を確認し、`.p-personal-banner` 外での使用がある場合はスタイル漏れが発生するため、方針Aに切り替えてHTMLにクラスを追加すること。**

---

### 16. object/project/_point_redemption.scss（13箇所）

| # | 行 | 現在のセレクタ | 深さ | 修正後 | 方針 | リスク |
|---|---|---|---|---|---|---|
| 16-1 | 102 | `.p-point .p-point__table thead th` | 4 | `.p-point__table-th` (HTMLにクラス追加) | A | Safe |
| 16-2 | 112 | `.p-point .p-point__table tbody td` | 4 | `.p-point__table-td` (HTMLにクラス追加) | A | Safe |
| 16-3 | 121 | `.p-point__table tbody tr:hover` | 3 | `.p-point__table-row:hover` (HTMLにクラス追加) | A | Safe |
| 16-4 | 126 | `.p-point__table tbody tr td:first-child` | 4 | `.p-point__table-td--first` (HTMLにクラス追加) | A | Safe |
| 16-5 | 130 | `.p-point__table tbody tr td:last-child` | 4 | `.p-point__table-td--last` (HTMLにクラス追加) | A | Safe |
| 16-6 | 167 | `.p.point__item_summary-warn ul li::marker` | 3 | `.p-point__warn-item::marker` (HTMLにクラス追加) | A | Safe |
| 16-7 | 227 | `.point__item_summary-warn ul li` | 3 | `.p-point__warn-item` (HTMLにクラス追加) | A | Safe |
| 16-8 | 230 | `.p-point ul li p:not(.p-point__item_summary_label)` | 4 | `.p-point__item-text` (HTMLにクラス追加) | A | Needs care |
| 16-9 | 251 | `.p-point__container__content01-wrapper .c-flex-gap-30 img` | 3 | `.p-point__content01-img` (HTMLにクラス追加) | A | Safe |
| 16-10 | 295 | `.p-point__table tbody tr td:first-child` (MQ) | 4 | 16-4と同じクラス | A | Safe |
| 16-11 | 330 | `.p-hospitality .c-flex-gap-30 img` | 3 | `.p-hospitality__img` (HTMLにクラス追加) | A | Safe |
| 16-12 | 333 | `.p-hospitality .c-flex-gap-30 p.fs-24` | 3 | `.p-hospitality__title` (HTMLにクラス追加) | A | Safe |
| 16-13 | 349 | `.p-point .p-point__table thead th` (MQ) | 4 | 16-1と同じクラス | A | Safe |

---

### 17. object/project/_protein.scss（12箇所）

| # | 行 | 現在のセレクタ | 深さ | 修正後 | 方針 | リスク |
|---|---|---|---|---|---|---|
| 17-1 | 499 | `.p-protein__text-container--left > .p-protein__flavor-inner > .c-flex-gap-50` | 3 | `.p-protein__flavor-row` (HTMLにクラス追加) | A | Safe |
| 17-2 | 579 | `.p-protein__content > .c-flex-gap-30 > div:last-child img` | 4 | `.p-protein__opening-img` (HTMLにクラス追加) | A | Safe |
| 17-3 | 633 | `div:has(> img[alt="peach flavor"]) > img` | 4 | Skip (`:has` は構造的に深くないが、`alt` 属性依存は脆弱) | -- | Skip |
| 17-4 | 666 | `.p-protein__text-container--left > .p-protein__flavor-inner > .c-flex-gap-50` (MQ) | 3 | 17-1と同じクラス | A | Safe |
| 17-5 | 695 | `.p-protein__about > .c-section__header-row > .c-flex-gap-3` | 3 | `.p-protein__about-header-meta` (HTMLにクラス追加) | A | Safe |
| 17-6 | 699 | `.p-protein__about > .c-section__header-row .c-section__stack-50 h3` | 4 | `.p-protein__about-title` (HTMLにクラス追加) | A | Safe |
| 17-7 | 769 | `.c-section--light-blue > .c-maxWidth > .c-flex-gap-30` | 3 | `.p-protein__section-content` (HTMLにクラス追加) | A | Needs care |
| 17-8 | 795 | `.c-section--light-blue .c-maxWidth > .c-section__header-row` | 3 | `.p-protein__section-header-row` (HTMLにクラス追加) | A | Needs care |
| 17-9 | 809 | `.c-section--light-blue .c-maxWidth > .c-section__header-row h3` | 4 | `.p-protein__section-title` (HTMLにクラス追加) | A | Needs care |
| 17-10 | 814 | `.c-section--light-blue .c-maxWidth > .c-flex-gap-30` | 3 | 17-7と同じクラス | A | Needs care |
| 17-11 | 972/976 | 17-5/17-6と同じ (MQ) | 3-4 | 同じクラス | A | Safe |
| 17-12 | 1095 | 17-1と同じ (MQ) | 3 | 同じクラス | A | Safe |

**備考**: 17-3は `:has()` + 属性セレクタの組み合わせで実質的にはalt値でフィルタリングしている。このセレクタはスキップする。17-7〜17-10は `.c-section--light-blue` 内の特定ページ用スタイルで、protein.html固有のスタイリング。HTMLにクラスを追加するのが安全。

---

### 18. object/project/_sitemap.scss（5箇所）

| # | 行 | 現在のセレクタ | 深さ | 修正後 | 方針 | リスク |
|---|---|---|---|---|---|---|
| 18-1 | 49 | `.p-sitemap-ul li a` | 3 | `.p-sitemap-ul__link` (HTMLにクラス追加) | A | Safe |
| 18-2 | 57 | `.p-sitemap-ul li a::after` | 3 | `.p-sitemap-ul__link::after` | A | Safe |
| 18-3 | 68 | `.p-sitemap-ul li a:hover::after` | 3 | `.p-sitemap-ul__link:hover::after` | A | Safe |
| 18-4 | 112 | `.p-sitemap-page .c-other-details-banner ul.flex-col` | 3 | `.p-sitemap-page__banner-list` (HTMLにクラス追加) | A | Safe |
| 18-5 | 163 | `.p-sitemap-page .c-other-details-banner ul.flex-col` (MQ) | 3 | 18-4と同じクラス | A | Safe |

---

### 19. object/project/_sportip.scss（3箇所）

| # | 行 | 現在のセレクタ | 深さ | 修正後 | 方針 | リスク |
|---|---|---|---|---|---|---|
| 19-1 | 571 | `.p-sportip__content .c-flex-gap-3 h4` | 3 | `.p-sportip__content-title` (HTMLにクラス追加) | A | Safe |
| 19-2 | 585 | `div:has(> .p-sportip__text-container) > .p-sportip__img` | 3 | `.p-sportip__section .p-sportip__img` or `.p-sportip__img--with-text` (HTMLにクラス追加) | A | Safe |
| 19-3 | 613 | `div:has(> .p-sportip__text-container--02) > .p-sportip__img` | 3 | 19-2と同パターン | A | Safe |

---

### 20. object/utility/_responsive.scss — **Skip（WordPress由来）**

| # | 行 | 現在のセレクタ | 深さ | 修正後 | 方針 | リスク |
|---|---|---|---|---|---|---|
| 20-1 | 1917 | `#about-three-vehicles-section .img-wrapper img` | 3 | **Skip** | -- | -- |

**備考**: `#about-three-vehicles-section` は Step 4 でカテゴリC（WordPress由来、HTMLに不在）として **明示的に除外済み**。Step 5 でも同じ理由で除外する。HTMLにid属性が存在しないため、クラスの追加先がない。

---

### 21. object/project/_storedetail-introduction.scss — **Skip（WordPress由来）**

以下はすべてWordPress由来のコードであり、Step 5ではスキップする。

**スキップ理由**:
- WordPress テーマ/プラグインのHTML構造に依存
- クラスの追加や変更ができない（WordPressが生成するHTML）
- 変更すると storelist/[slug]/index.html のレイアウトが崩れるリスク

**スキップ対象**: 全 _storedetail-introduction.scss 内の3階層以上セレクタ（約120箇所）

主要なパターン:
- `.sp-navigation .menu .menu-item .sub-menu ...` (7階層)
- `.c-footer-menu .sub-menu ...`
- `.main-navigation .menu > li > a`
- `.c-policy-content > ol > li > dl > dt`
- `.entry-content ...`
- `.c-banner-2 .c-banner-link .c-banner-inner ...`
- `.about-stepped-bg-* .c-stepped-unit .c-stepped-item:nth-child(*)`
- `.flow-stepped-bg .c-stepped-item:nth-child(1) ...`
- `.widget ul > li ...`
- `.ez-toc-list ...`
- `.wsp-lists-list ...`
- `.swiper-*` (Swiperライブラリ由来)
- `.c-categories ...`
- `.breadcrumbs > span ...`
- `.c-form ...`
- `.c-card-media ...`
- `.c-card-links ...`
- `.is-loaded .c-news-ticker-item ...`
- `.c-choose-item:nth-child ...`
- `.record-status ...`
- `.c-banner-reservation-text-foot span span`

---

## サマリー

### 対象数

| カテゴリ | 箇所数 |
|---------|:---:|
| 修正対象（Safe） | 約75 |
| 修正対象（Needs care） | 約20 |
| Skip（FAQ toggle構造的制約） | 2 |
| Skip（`:has` + alt属性依存） | 1 |
| Skip（WordPress由来 _storedetail-introduction.scss） | 約120 |
| Skip（WordPress由来 _responsive.scss） | 1（20-1） |
| **合計** | **約218** |
| **実際の修正対象** | **約94** |

### ファイル別修正数

| ファイル | 修正数 | Skip数 |
|---------|:---:|:---:|
| `foundation/_reset.scss` | 1 | 0 |
| `layout/_footer.scss` | 7 | 0 |
| `_global-responsive.scss` | 12 | 2 |
| `object/component/_footer-banner.scss` | 2 | 0 |
| `object/component/_slider.scss` | 2 | 0 |
| `object/project/_top.scss` | 3 | 0 |
| `object/project/_storedetail.scss` | 7 | 0 |
| `object/project/_admission.scss` | 10 | 0 |
| `object/project/_column-slag.scss` | 4 | 0 |
| `object/project/_family.scss` | 14 | 0 |
| `object/project/_faq.scss` | 1 | 0 |
| `object/project/_medical.scss` | 7 | 0 |
| `object/project/_personal.scss` | 1 | 0 |
| `object/project/_point_redemption.scss` | 13 | 0 |
| `object/project/_protein.scss` | 11 | 1 |
| `object/project/_sitemap.scss` | 5 | 0 |
| `object/project/_sportip.scss` | 3 | 0 |
| `object/utility/_responsive.scss` | 0 | 1 |
| `object/project/_storedetail-introduction.scss` | 0 | ~120 |

---

## 処理順序

安全性と依存関係を考慮し、以下の順序で修正する。

### Phase 1: コンポーネント・レイアウト層（影響範囲が広い）

1. `foundation/_reset.scss` — リセットCSS（全ページに影響）
2. `layout/_footer.scss` — フッター/ヘッダー（全ページに影響）
3. `object/component/_footer-banner.scss` — フッターバナー（複数ページで使用）
4. `object/component/_slider.scss` — スライダー（複数ページで使用）

### Phase 2: グローバルレスポンシブ

5. `_global-responsive.scss` — グローバルレスポンシブ（ニュース、ショップ、FAQ等）

### Phase 3: プロジェクト固有（ページ別・影響範囲限定）

6. `object/project/_top.scss`
7. `object/project/_storedetail.scss`
8. `object/project/_admission.scss`
9. `object/project/_family.scss`
10. `object/project/_point_redemption.scss`
11. `object/project/_protein.scss`
12. `object/project/_medical.scss`
13. `object/project/_column-slag.scss`
14. `object/project/_sitemap.scss`
15. `object/project/_sportip.scss`
16. `object/project/_personal.scss`
17. `object/project/_faq.scss`

---

## 除外リスト

| ファイル | 理由 |
|---------|------|
| `object/project/_storedetail-introduction.scss` 全体 | WordPress由来のHTML構造に依存。クラス追加不可 |
| `object/utility/_responsive.scss` 20-1 (`#about-three-vehicles-section`) | WordPress由来（Step 4 カテゴリCで除外済み）。HTMLにid属性が存在しないためクラス追加先がない |
| FAQ toggleパターン（`input:checked ~ header .icon::after`）| チェックボックスハック構造で3階層が必須 |
| `:has()` + alt属性セレクタ (protein.scss L633) | alt属性依存の脆弱なセレクタだが修正にはHTML構造変更が必要 |

---

## リスク評価

### 低リスク（Safe）

- HTMLに新規BEMクラスを追加し、CSSセレクタを短縮するだけ
- 既存のスタイルは変わらない（セレクタの詳細度が下がるだけ）
- **ただし**: 詳細度が下がることで、他のルールに上書きされる可能性がある。各修正後に以下を確認:
  - 対象プロパティが他のルールで定義されていないか
  - `!important` が関与していないか

### 中リスク（Needs care）

- **tabs系セレクタ (4-2〜4-5)**: `[data-widget="tabs"]` は JS プラグインが付与する属性。HTML側にクラスを追加する際、JS由来の属性はそのまま残す必要がある
- **admission/family sticker系**: ページ固有のスティッカー位置調整。複数のメディアクエリにまたがるため、すべてのMQでの見た目確認が必要
- **protein section系 (17-7〜17-10)**: `.c-section--light-blue` というコンポーネントクラスをコンテキストとして使っているため、他ページの `.c-section--light-blue` に影響しないよう注意
- **medical banner-logo系 (14-1/14-2)**: `~` 兄弟結合子を使った複雑なパターン

### 高リスク（Skip）

- WordPress由来コードすべて
- FAQ チェックボックスハック

---

## 検証手順

### 各修正後の確認

1. **grepで旧セレクタの残存確認**: 修正したセレクタが他の場所に残っていないか
2. **SCSSコンパイル**: `npx sass assets/scss/global.scss assets/css/global.css --no-source-map`
3. **ブラウザ確認**: 対象ページをPC/SP両方で表示し、見た目が変わっていないことを確認

### 全体完了後の確認

1. 全HTMLファイルをブラウザで表示確認
2. 特に以下のページを重点確認:
   - `index.html`（トップ: ニュース、ショップ、スライダー）
   - `storedetail/*/index.html`（店舗詳細: スライダー、料金表）
   - `admission/index.html`（入会: ステップ、スティッカー）
   - `family/index.html`（家族: テーブル、スティッカー）
   - `protein/index.html`（プロテイン: フレーバーカード）
   - `medical/index.html`（メディカル: バナー、エンゲージメント）
   - `point-redemption/index.html`（ポイント: テーブル）
3. レスポンシブ確認: 各主要ブレークポイント（1090px, 767px, 500px）

---

## HTML変更対象ファイル（推定）

HTMLにクラスを追加する必要があるファイル:

| HTMLファイル | 対応SCSS |
|-------------|---------|
| `index.html` | _global-responsive, _top, _slider, _footer-banner |
| `about/index.html` | _global-responsive, _slider |
| `storedetail/*/index.html` | _storedetail |
| `admission/index.html` | _admission |
| `family/index.html` | _family |
| `faq/index.html` | _faq |
| `medical/index.html` | _medical |
| `personal/index.html` | _personal |
| `point-redemption/index.html` | _point_redemption |
| `protein/index.html` | _protein |
| `sitemap/index.html` | _sitemap |
| `sportip/index.html` | _sportip |
| `column/*/index.html` | _column-slag |
| 全ページ（共通フッター/ヘッダー） | _footer, _reset |

---

## 注意事項

1. **JSファイルは変更しない** — HTMLにクラスを追加するだけ。JSが参照するIDやクラスは変更しない
2. **既存クラスは削除しない** — 新規クラスを追加するのみ。既存クラスはHTMLに残す
3. **CSSの修正は「セレクタの書き換え」のみ** — プロパティ値は変更しない
4. **重複定義（_slider.scss と _global-responsive.scss の `.c-text-slider .slide p`）は両方同時に修正する**
5. **メディアクエリ内のセレクタも対象** — 同じ要素への複数MQにまたがるスタイルは、1つのクラスで対応
6. **行番号は参考値** — 本計画はStep 4完了後に作成されたが、行番号はファイル編集によりずれる可能性がある。各修正時にgrepで対象セレクタの実際の行番号を確認してから作業すること
7. **方針B（中間階層省略）を使う場合は、省略する親セレクタの外で子セレクタが使われていないことをgrepで検証してから実行すること**
