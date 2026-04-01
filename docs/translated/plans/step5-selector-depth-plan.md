# Step 5: Selector Depth Fix (2 Levels or Less) -- Execution Plan

Created: 2026-03-30
Target: Fix all selectors with 3+ levels of depth across all SCSS files to 2 levels or less

---

## Most Important Principle (Restated)

**Do not change the frontend display results at all.**
Selector depth fixes are "internal structure improvements" and must not affect browser appearance.

---

## Overview

- **Target**: Selectors with 3+ levels of depth across all SCSS files
- **Goal**: Fix all selectors to 2 levels or less (guideline compliant)
- **Exclusions**: WordPress-derived code (`_storedetail-introduction.scss`, parts of `_responsive.scss`)
- **JS changes**: None (only CSS selectors are modified; classes are added to HTML)

### Depth Counting Method

- Descendant combinator (space) = +1 level
- Child combinator (`>`) = +1 level
- Adjacent/general sibling combinators (`+` / `~`) = +1 level
- Chaining on the same element (`.block__el.modifier`, `.block__el:hover`, `.block__el::after`) = same level

Examples:
- `.a .b` = 2 levels (OK)
- `.a .b .c` = 3 levels (NG)
- `.a.active .b` = 2 levels (OK)
- `.a > .b > .c` = 3 levels (NG)
- `.a ~ .b .c` = 3 levels (NG)

---

## Fix Approaches

### Approach A: Add class directly to HTML to shorten selector to 1-2 levels

The safest method. Add a new BEM class to the target element and simplify the CSS selector.

### Approach B: Omit intermediate levels

When the intermediate ancestor does not contribute to specificity structurally, omit it to shorten to 2 levels.

### Approach C: Replace context dependency with BEM modifier

Replace `.parent .child` pattern with `.child--variant`.

---

## File-by-File Target List

---

### 1. foundation/_reset.scss (1 location)

| # | Line | Current Selector | Depth | Fixed | Approach | Risk |
|---|---|---|---|---|---|---|
| 1-1 | 9 | `html body a` | 3 | `a` (within reset CSS, `body a` is sufficient, or just `a` alone) | B | Safe |

**Note**: `html body a` is a pattern to increase specificity, but unnecessary in reset CSS. Shortening to `a` alone lowers specificity, so check for conflicts with other rules. Can safely shorten to `body a` (2 levels).

---

### 2. layout/_footer.scss (4 locations)

Selectors with 4 levels resulted from Step 4's ID-to-class replacement.

| # | Line | Current Selector | Depth | Fixed | Approach | Risk |
|---|---|---|---|---|---|---|
| 2-1 | 91-92 | `.l-header-floating-menu .l-header-floating-menu__btn .desktop-menu-icon` / `> p` | 3 | `.l-header-floating-menu__btn .desktop-menu-icon` / `.l-header-floating-menu__btn > p` | B | Safe |
| 2-2 | 102 | `.l-header-floating-menu .l-header-floating-menu__btn .l-header__hamburger` | 3 | `.l-header-floating-menu__btn .l-header__hamburger` | B | Safe |
| 2-3 | 111 | `.l-header-floating-menu .l-header-floating-menu__btn .mh-bar` | 3 | `.l-header-floating-menu__btn .mh-bar` | B | Safe |
| 2-4a | 123-127 | `.l-header-floating-menu.active .l-header-floating-menu__btn .l-header__hamburger .mh-bar:nth-child(1)` | 4 | `.l-header-floating-menu.active .l-header__hamburger-bar:nth-child(1)` (add `.l-header__hamburger-bar` to `.mh-bar` in HTML) | A | Safe |
| 2-4b | 129-132 | Same as above `:nth-child(2)` | 4 | `.l-header-floating-menu.active .l-header__hamburger-bar:nth-child(2)` | A | Safe |
| 2-4c | 136-141 | Same as above `:nth-child(3)` | 4 | `.l-header-floating-menu.active .l-header__hamburger-bar:nth-child(3)` | A | Safe |
| 2-5 | 429 | `.l-footer__nav-section.open .l-footer__page-link img.accordion-arrow` | 3 | `.l-footer__nav-section.open .l-footer__page-link-arrow` (add class to HTML) | A | Needs care |

**Notes**:
- 2-1 to 2-3 (Approach B): `.l-header-floating-menu__btn` is a BEM child element; grep confirms it is not used outside `.l-header-floating-menu`. Therefore, omitting the parent level is safe. **Before execution, grep to confirm all occurrences of `l-header-floating-menu__btn` and re-verify no usage outside `l-header-floating-menu`.**
- 2-4a/b/c (Approach A): To go from 4 to 2 levels, add new class `.l-header__hamburger-bar` to `.mh-bar` for direct targeting from HTML. Also unify 2-3's `.mh-bar` to `.l-header__hamburger-bar`.
- 2-5: Since `img.accordion-arrow` modifier is involved, adding a class to HTML is safer.

---

### 3. layout/_header.scss (3 locations)

| # | Line | Current Selector | Depth | Fixed | Approach | Risk |
|---|---|---|---|---|---|---|
| 3-1 | 474 | `.l-header__hamburger.active .mh-bar:nth-child(1)` | 2 | -- (already 2 levels, OK) | -- | -- |
| 3-2 | 506-507 | `.l-header-wrapper .header-text` | 2 | -- (already 2 levels, OK) | -- | -- |

**Note**: _header.scss has no selectors with 3+ levels after examination. OK.

---

### 4. _global-responsive.scss (14 locations)

| # | Line | Current Selector | Depth | Fixed | Approach | Risk |
|---|---|---|---|---|---|---|
| 4-1 | 168 | `.c-text-slider .slide p` | 3 | `.c-text-slider__slide-text` (add class to HTML) | A | Safe |
| 4-2 | 275-276 | `[data-widget="tabs"] [data-type="fancy"].tabs-controls .tabs-control` | 3 | `.c-tabs-fancy .tabs-control` (add class to HTML) | A | Needs care |
| 4-3 | 289 | Same as above (within 1090px MQ) | 3 | Same | A | Needs care |
| 4-4 | 300-306 | `[data-widget="tabs"] [data-type="fancy"].tabs-controls .tabs-control:hover` / `[aria-selected="true"]` | 3 | `.c-tabs-fancy .tabs-control:hover` / `[aria-selected="true"]` | A | Needs care |
| 4-5 | 307 | `[data-widget="tabs"] [data-type="fancy"].tabs-controls .tabs-control::before` | 3 | `.c-tabs-fancy .tabs-control::before` | A | Needs care |
| 4-6 | 331 | `.news-section .c-panel-content:hover .c-news-info-container p:last-child` | 4 | `.c-panel-content:hover .c-news-info__last-text` (add class to HTML) | A | Safe |
| 4-7 | 336 | `.news-section .c-panel-content > img` | 3 | `.c-panel-content > .c-panel-content__arrow` (add class to HTML) | A | Safe |
| 4-8 | 378 | `[data-widget="tabs"] [data-type="fancy"].tabs-controls .tabs-control` (within MQ) | 3 | Same fix as 4-2 | A | Needs care |
| 4-9 | 1563 | `.c-faq__container__toggle:checked ~ .c-faq__accordion-header .c-faq__toggle-icon::after` | 3 | `.c-faq__container__toggle:checked ~ .c-faq__toggle-icon--collapse::after` (structural change not possible, Skip candidate) | -- | Needs care |
| 4-10 | 1670-1672 | `.c-faq__container__toggle:checked ~ .c-faq__accordion-header .c-faq__accordion-toggle::after` | 3 | Same pattern as 4-9 | -- | Needs care |
| 4-11 | 1893 | `.c-footer-banner__btn p img` | 3 | `.c-footer-banner__btn-icon` (add class to HTML) | A | Safe |
| 4-12 | 1941 | `.c-footer-banner__container h2 b` | 3 | `.c-footer-banner__heading-accent` (add class to HTML) | A | Safe |
| 4-13 | 2195 | `.c-other-details-banner-item .c-other-details-banner-item__title img` | 3 | `.c-other-details-banner-item__title-img` (add class to HTML) | A | Safe |
| 4-14 | 392 | `.c-panel-content .c-news-info-container` | 2 | -- (OK) | -- | -- |

**Notes (4-2/4-3/4-5/4-8 tabs)**: `[data-widget="tabs"]` is a JS-derived attribute selector. Add `.c-tabs` class to the `[data-widget="tabs"]` HTML element, and add `.c-tabs-fancy` to `[data-type="fancy"].tabs-controls` to achieve 2 levels. However, under the constraint of not modifying JS, **keep existing HTML attributes and only add classes**.

**Notes (4-9/4-10 FAQ toggle)**: The `input:checked ~ header .icon::after` pattern is a structurally 3-level-required pattern that changes children of sibling elements based on checkbox state. Shortening the selector without changing the structure is difficult. **Skip this pattern** (2 locations).

---

### 5. object/component/_footer-banner.scss (2 locations)

| # | Line | Current Selector | Depth | Fixed | Approach | Risk |
|---|---|---|---|---|---|---|
| 5-1 | 133 | `.c-footer-banner__container a p img` | 4 | `.c-footer-banner__link-icon` (add class to HTML) | A | Safe |
| 5-2 | 173 | `.c-footer-banner__container h2 span` | 3 | `.c-footer-banner__heading-sub` (add class to HTML) | A | Safe |

---

### 6. object/component/_slider.scss (2 locations)

| # | Line | Current Selector | Depth | Fixed | Approach | Risk |
|---|---|---|---|---|---|---|
| 6-1 | 53 | `.c-text-slider .slide p` | 3 | `.c-text-slider__slide-text` (same class as 4-1) | A | Safe |
| 6-2 | 322 | `.c-topic-slider__track .slide img:not(a img)` | 4 | `.c-topic-slider__slide-img` (add class to HTML) | A | Safe |

**Note**: 6-1 targets the same element as 4-1 (duplicate definition). Fix both simultaneously.

---

### 7. object/project/_top.scss (4 locations)

| # | Line | Current Selector | Depth | Fixed | Approach | Risk |
|---|---|---|---|---|---|---|
| 7-1 | 394 | `.p-top__news-banner-sp .p-top__news-banner-context p:last-child` | 3 | `.p-top__news-banner-last-text` (add class to HTML) | A | Safe |
| 7-2 | 397-398 | `.p-top__news-banner-sp .p-top__news-30min-label` | 2 | -- (OK) | -- | -- |
| 7-3 | 403 | `.p-top__news-banner-sp .p-top__news-30min-label img` | 3 | `.p-top__news-30min-label-img` (add class to HTML) | A | Safe |
| 7-4 | 470 | `.c-text-slider .slide p` | 3 | Same fix as 4-1/6-1 | A | Safe |

---

### 8. object/project/_about.scss (1 location)

| # | Line | Current Selector | Depth | Fixed | Approach | Risk |
|---|---|---|---|---|---|---|
| 8-1 | 256 | `.p-attraction__page .c-shop__bg` | 2 | -- (OK) | -- | -- |

**Note**: _about.scss has no selectors with 3+ levels after examination.

---

### 9. object/project/_storedetail.scss (7 locations)

| # | Line | Current Selector | Depth | Fixed | Approach | Risk |
|---|---|---|---|---|---|---|
| 9-1 | 871 | `.p-storedetail__slider .swiper-slide img` | 3 | `.p-storedetail__slider-img` (add class to HTML) | A | Safe |
| 9-2 | 887 | `.slider-thumbs .js-thumb-button img` | 3 | `.slider-thumbs__img` (add class to HTML) | A | Safe |
| 9-3 | 1605 | `.p-storedetail__price-header > .c-section__sub-text > svg` | 3 | `.p-storedetail__price-header-svg` (add class to HTML) | A | Safe |
| 9-4 | 1610 | `.p-storedetail__price-header > .c-section__sub-text h3` | 3 | `.p-storedetail__price-header-title` (add class to HTML) | A | Safe |
| 9-5 | 1613 | `.p-storedetail__price-header > .c-section__sub-text p` | 3 | `.p-storedetail__price-header-desc` (add class to HTML) | A | Safe |
| 9-6 | 1885 | `.slider-thumbs .grid > *` | 3 | `.slider-thumbs__cell` (add class to HTML) | A | Safe |
| 9-7 | 1892 | `.slider-thumbs .js-thumb-button img` (within MQ) | 3 | Same as 9-2 | A | Safe |

---

### 10. object/project/_admission.scss (11 locations)

| # | Line | Current Selector | Depth | Fixed | Approach | Risk |
|---|---|---|---|---|---|---|
| 10-1 | 104 | `.p-admission-step4-ul li div` | 3 | `.p-admission-step4__item-content` (add class to HTML) | A | Safe |
| 10-2 | 212 | `.p-admission-page .c-banner__sticker2 img:first-child` | 3 | `.p-admission-page__sticker2-img01` (add class to HTML) | A | Safe |
| 10-3 | 218 | `.p-admission-page .c-banner__sticker2 img:last-child` | 3 | `.p-admission-page__sticker2-img02` (add class to HTML) | A | Safe |
| 10-4 | 228 | `.p-admission-page .c-footer-banner__sticker2 img:first-child` | 3 | `.p-admission-page__footer-sticker2-img01` (add class to HTML) | A | Needs care |
| 10-5 | 231 | `.p-admission-page .c-footer-banner__sticker2 img:last-child` | 3 | `.p-admission-page__footer-sticker2-img02` (add class to HTML) | A | Needs care |
| 10-6 | 339 | `.p-admission-item .p-admission-item__header img` | 3 | `.p-admission-item__header-img` (add class to HTML) | A | Safe |
| 10-7 | 402 | `.p-admission-page .c-footer-banner__sticker2 img:first-child` (MQ) | 3 | Same class as 10-4 | A | Needs care |
| 10-8 | 406 | `.p-admission-page .c-footer-banner__sticker2 img:last-child` (MQ) | 3 | Same class as 10-5 | A | Needs care |
| 10-9 | 448 | `.p-admission-page .c-footer-banner__sticker2 img:first-child` (MQ) | 3 | Same class as 10-4 | A | Needs care |
| 10-10 | 452 | `.p-admission-page .c-footer-banner__sticker2 img:last-child` (MQ) | 3 | Same class as 10-5 | A | Needs care |

**Note**: 10-4/5/7/8/9/10 are page-specific sticker image size adjustments. Styles spanning multiple MQs for the same `img` element. Adding one class to the HTML handles all MQs.

---

### 11. object/project/_column-slag.scss (4 locations)

| # | Line | Current Selector | Depth | Fixed | Approach | Risk |
|---|---|---|---|---|---|---|
| 11-1 | 38 | `.p-column-slag__wrapper h2 span` | 3 | `.p-column-slag__heading-icon` (add class to HTML) | A | Safe |
| 11-2 | 215 | `.p-article-body__content-blue ul li` | 3 | `.p-article-body__content-blue-item` (add class to HTML) | A | Safe |
| 11-3 | 219 | `.p-article-body__content-blue ul li::marker` | 3 | `.p-article-body__content-blue-item::marker` | A | Safe |
| 11-4 | 246 | `.p-column-slag__wrapper article img` | 3 | `.p-column-slag__article-img` (add class to HTML) | A | Safe |

---

### 12. object/project/_family.scss (14 locations)

| # | Line | Current Selector | Depth | Fixed | Approach | Risk |
|---|---|---|---|---|---|---|
| 12-1 | 23 | `.p-family__container__content01 > div p` | 3 | `.p-family__content01-text` (add class to HTML) | A | Safe |
| 12-2 | 78 | `.p-family__table thead th` | 3 | `.p-family__table-th` (add class to HTML) | A | Safe |
| 12-3 | 88 | `.p-family__table tbody td` | 3 | `.p-family__table-td` (add class to HTML) | A | Safe |
| 12-4 | 95 | `.p-family__table tbody tr:hover` | 3 | `.p-family__table-row:hover` (add class to HTML) | A | Safe |
| 12-5 | 100 | `.p-family__table tbody tr td:first-child` | 4 | `.p-family__table-td--first` (add class to HTML) | A | Safe |
| 12-6 | 103 | `.p-family__table tbody tr td:last-child` | 4 | `.p-family__table-td--last` (add class to HTML) | A | Safe |
| 12-7 | 144 | `.p-family__main .c-banner__sticker2 .c-banner__speechbubble1` | 3 | `.p-family__sticker2-img0201` (add class to HTML) | A | Safe |
| 12-8 | 147 | `.p-family__main .c-banner__sticker2 .banner-img02` | 3 | `.p-family__sticker2-img02` (add class to HTML) | A | Safe |
| 12-9 | 155 | `.p-family__main .c-footer-banner__sticker2 img:first-child` | 3 | `.p-family__footer-sticker2-img01` (add class to HTML) | A | Safe |
| 12-10 | 159 | `.p-family__main .c-footer-banner__sticker2 img:last-child` | 3 | `.p-family__footer-sticker2-img02` (add class to HTML) | A | Safe |
| 12-11 | 237 | `.p-family__container__content01 .c-flex-gap-30 img` | 3 | `.p-family__content01-img` (add class to HTML) | A | Safe |
| 12-12 | 259 | `.p-family__table tbody tr td:first-child` (MQ) | 4 | Same class as 12-5 | A | Safe |
| 12-13 | 272 | `.p-family__table tbody td` (MQ) | 3 | Same class as 12-3 | A | Safe |
| 12-14 | 291/296 | `.p-family__main .c-footer-banner__sticker2 img:last-child/first-child` (MQ) | 3 | Same classes as 12-9/12-10 | A | Safe |

---

### 13. object/project/_faq.scss (1 location)

| # | Line | Current Selector | Depth | Fixed | Approach | Risk |
|---|---|---|---|---|---|---|
| 13-1 | 115 | `.p-faq__page__item .c-faq__accordion-header img` | 3 | `.p-faq__accordion-icon` (add class to HTML) | A | Safe |

---

### 14. object/project/_medical.scss (8 locations)

| # | Line | Current Selector | Depth | Fixed | Approach | Risk |
|---|---|---|---|---|---|---|
| 14-1 | 621 | `.p-medical__banner-logo--pc ~ h1 p > span` | 4 | `.p-medical__banner-heading-span` (add class to HTML) | A | Needs care |
| 14-2 | 637 | `.p-medical__banner-logo--pc ~ h1 p > span` (within MQ) | 4 | Same as above | A | Needs care |
| 14-3 | 671 | `.p-medical__banner-content svg[viewBox="0 0 441 67"]` | 5 | `.p-medical__banner-logo-svg` (add class to HTML) | A | Safe |
| 14-4 | 720 | `.p-medical__engagement-logo svg[viewBox="0 0 441 67"]` | 5 | `.p-medical__engagement-logo-svg` (add class to HTML) | A | Safe |
| 14-5 | 862 | `.p-medical__online-consultation-banner .c-badge-white p` | 3 | `.p-medical__badge-text` (add class to HTML) | A | Safe |
| 14-6 | 1062 | `.c-announcement__body .bg-gray > p:last-child` | 3 | `.p-medical__announcement-last-text` (add class to HTML) | A | Safe |
| 14-7 | 1068 | `.c-announcement__body .bg-gray div p` | 4 | `.p-medical__announcement-desc` (add class to HTML) | A | Safe |

**Note**: 14-1/14-2 use the `~` (general sibling combinator) pattern. Add a class to the `span` inside `h1 p > span` and replace with direct targeting. 14-3/14-4 use attribute selector `svg[viewBox="..."]` to select specific SVGs, which is a fragile structure that breaks if the viewBox value changes. Adding a class is safer.

---

### 15. object/project/_personal.scss (1 location)

| # | Line | Current Selector | Depth | Fixed | Approach | Risk |
|---|---|---|---|---|---|---|
| 15-1 | 38 | `.p-personal-banner .c-hero-slider__frames__clip1 .c-clip-img` | 3 | `.p-personal-banner .c-clip-img` (omit intermediate level) | B | Safe |

**Note**: Uses Approach B (intermediate level omission). **Before execution, grep to confirm all occurrences of `.c-clip-img` and if it is used outside `.p-personal-banner`, switch to Approach A and add a class to HTML.**

---

### 16. object/project/_point_redemption.scss (13 locations)

| # | Line | Current Selector | Depth | Fixed | Approach | Risk |
|---|---|---|---|---|---|---|
| 16-1 | 102 | `.p-point .p-point__table thead th` | 4 | `.p-point__table-th` (add class to HTML) | A | Safe |
| 16-2 | 112 | `.p-point .p-point__table tbody td` | 4 | `.p-point__table-td` (add class to HTML) | A | Safe |
| 16-3 | 121 | `.p-point__table tbody tr:hover` | 3 | `.p-point__table-row:hover` (add class to HTML) | A | Safe |
| 16-4 | 126 | `.p-point__table tbody tr td:first-child` | 4 | `.p-point__table-td--first` (add class to HTML) | A | Safe |
| 16-5 | 130 | `.p-point__table tbody tr td:last-child` | 4 | `.p-point__table-td--last` (add class to HTML) | A | Safe |
| 16-6 | 167 | `.p.point__item_summary-warn ul li::marker` | 3 | `.p-point__warn-item::marker` (add class to HTML) | A | Safe |
| 16-7 | 227 | `.point__item_summary-warn ul li` | 3 | `.p-point__warn-item` (add class to HTML) | A | Safe |
| 16-8 | 230 | `.p-point ul li p:not(.p-point__item_summary_label)` | 4 | `.p-point__item-text` (add class to HTML) | A | Needs care |
| 16-9 | 251 | `.p-point__container__content01-wrapper .c-flex-gap-30 img` | 3 | `.p-point__content01-img` (add class to HTML) | A | Safe |
| 16-10 | 295 | `.p-point__table tbody tr td:first-child` (MQ) | 4 | Same class as 16-4 | A | Safe |
| 16-11 | 330 | `.p-hospitality .c-flex-gap-30 img` | 3 | `.p-hospitality__img` (add class to HTML) | A | Safe |
| 16-12 | 333 | `.p-hospitality .c-flex-gap-30 p.fs-24` | 3 | `.p-hospitality__title` (add class to HTML) | A | Safe |
| 16-13 | 349 | `.p-point .p-point__table thead th` (MQ) | 4 | Same class as 16-1 | A | Safe |

---

### 17. object/project/_protein.scss (12 locations)

| # | Line | Current Selector | Depth | Fixed | Approach | Risk |
|---|---|---|---|---|---|---|
| 17-1 | 499 | `.p-protein__text-container--left > .p-protein__flavor-inner > .c-flex-gap-50` | 3 | `.p-protein__flavor-row` (add class to HTML) | A | Safe |
| 17-2 | 579 | `.p-protein__content > .c-flex-gap-30 > div:last-child img` | 4 | `.p-protein__opening-img` (add class to HTML) | A | Safe |
| 17-3 | 633 | `div:has(> img[alt="peach flavor"]) > img` | 4 | Skip (`:has` is not structurally deep, but `alt` attribute dependency is fragile) | -- | Skip |
| 17-4 | 666 | `.p-protein__text-container--left > .p-protein__flavor-inner > .c-flex-gap-50` (MQ) | 3 | Same class as 17-1 | A | Safe |
| 17-5 | 695 | `.p-protein__about > .c-section__header-row > .c-flex-gap-3` | 3 | `.p-protein__about-header-meta` (add class to HTML) | A | Safe |
| 17-6 | 699 | `.p-protein__about > .c-section__header-row .c-section__stack-50 h3` | 4 | `.p-protein__about-title` (add class to HTML) | A | Safe |
| 17-7 | 769 | `.c-section--light-blue > .c-maxWidth > .c-flex-gap-30` | 3 | `.p-protein__section-content` (add class to HTML) | A | Needs care |
| 17-8 | 795 | `.c-section--light-blue .c-maxWidth > .c-section__header-row` | 3 | `.p-protein__section-header-row` (add class to HTML) | A | Needs care |
| 17-9 | 809 | `.c-section--light-blue .c-maxWidth > .c-section__header-row h3` | 4 | `.p-protein__section-title` (add class to HTML) | A | Needs care |
| 17-10 | 814 | `.c-section--light-blue .c-maxWidth > .c-flex-gap-30` | 3 | Same class as 17-7 | A | Needs care |
| 17-11 | 972/976 | Same as 17-5/17-6 (MQ) | 3-4 | Same classes | A | Safe |
| 17-12 | 1095 | Same as 17-1 (MQ) | 3 | Same class | A | Safe |

**Note**: 17-3 uses a combination of `:has()` + attribute selector, essentially filtering by alt value. This selector is skipped. 17-7 to 17-10 are page-specific styles within `.c-section--light-blue`, specific to protein.html. Adding classes to HTML is safer.

---

### 18. object/project/_sitemap.scss (5 locations)

| # | Line | Current Selector | Depth | Fixed | Approach | Risk |
|---|---|---|---|---|---|---|
| 18-1 | 49 | `.p-sitemap-ul li a` | 3 | `.p-sitemap-ul__link` (add class to HTML) | A | Safe |
| 18-2 | 57 | `.p-sitemap-ul li a::after` | 3 | `.p-sitemap-ul__link::after` | A | Safe |
| 18-3 | 68 | `.p-sitemap-ul li a:hover::after` | 3 | `.p-sitemap-ul__link:hover::after` | A | Safe |
| 18-4 | 112 | `.p-sitemap-page .c-other-details-banner ul.flex-col` | 3 | `.p-sitemap-page__banner-list` (add class to HTML) | A | Safe |
| 18-5 | 163 | `.p-sitemap-page .c-other-details-banner ul.flex-col` (MQ) | 3 | Same class as 18-4 | A | Safe |

---

### 19. object/project/_sportip.scss (3 locations)

| # | Line | Current Selector | Depth | Fixed | Approach | Risk |
|---|---|---|---|---|---|---|
| 19-1 | 571 | `.p-sportip__content .c-flex-gap-3 h4` | 3 | `.p-sportip__content-title` (add class to HTML) | A | Safe |
| 19-2 | 585 | `div:has(> .p-sportip__text-container) > .p-sportip__img` | 3 | `.p-sportip__section .p-sportip__img` or `.p-sportip__img--with-text` (add class to HTML) | A | Safe |
| 19-3 | 613 | `div:has(> .p-sportip__text-container--02) > .p-sportip__img` | 3 | Same pattern as 19-2 | A | Safe |

---

### 20. object/utility/_responsive.scss -- **Skip (WordPress-derived)**

| # | Line | Current Selector | Depth | Fixed | Approach | Risk |
|---|---|---|---|---|---|---|
| 20-1 | 1917 | `#about-three-vehicles-section .img-wrapper img` | 3 | **Skip** | -- | -- |

**Note**: `#about-three-vehicles-section` was **explicitly excluded in Step 4** as Category C (WordPress-derived, not in HTML). Also excluded in Step 5 for the same reason. Since the id attribute does not exist in HTML, there is no target to add a class to.

---

### 21. object/project/_storedetail-introduction.scss -- **Skip (WordPress-derived)**

All items below are WordPress-derived code and are skipped in Step 5.

**Skip reasons**:
- Depends on WordPress theme/plugin HTML structure
- Classes cannot be added or changed (WordPress-generated HTML)
- Changes risk breaking layout of storelist/[slug]/index.html

**Skip targets**: All 3+ level selectors in _storedetail-introduction.scss (~120 locations)

Major patterns:
- `.sp-navigation .menu .menu-item .sub-menu ...` (7 levels)
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
- `.swiper-*` (Swiper library derived)
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

## Summary

### Target Count

| Category | Count |
|---------|:---:|
| Fix targets (Safe) | ~75 |
| Fix targets (Needs care) | ~20 |
| Skip (FAQ toggle structural constraint) | 2 |
| Skip (`:has` + alt attribute dependency) | 1 |
| Skip (WordPress-derived _storedetail-introduction.scss) | ~120 |
| Skip (WordPress-derived _responsive.scss) | 1 (20-1) |
| **Total** | **~218** |
| **Actual fix targets** | **~94** |

### Fix Count by File

| File | Fix Count | Skip Count |
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

## Processing Order

Considering safety and dependencies, fix in the following order.

### Phase 1: Component & Layout Layer (wide impact scope)

1. `foundation/_reset.scss` -- Reset CSS (affects all pages)
2. `layout/_footer.scss` -- Footer/Header (affects all pages)
3. `object/component/_footer-banner.scss` -- Footer banner (used across multiple pages)
4. `object/component/_slider.scss` -- Slider (used across multiple pages)

### Phase 2: Global Responsive

5. `_global-responsive.scss` -- Global responsive (news, shop, FAQ, etc.)

### Phase 3: Project-Specific (page-by-page, limited impact scope)

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

## Exclusion List

| File | Reason |
|---------|------|
| `object/project/_storedetail-introduction.scss` entirety | Depends on WordPress HTML structure. Cannot add classes |
| `object/utility/_responsive.scss` 20-1 (`#about-three-vehicles-section`) | WordPress-derived (excluded as Step 4 Category C). id attribute does not exist in HTML, so there is no target to add a class to |
| FAQ toggle pattern (`input:checked ~ header .icon::after`) | Checkbox hack structure requires 3 levels |
| `:has()` + alt attribute selector (protein.scss L633) | Fragile selector depending on alt attribute, but fixing requires HTML structure changes |

---

## Risk Assessment

### Low Risk (Safe)

- Only adds new BEM classes to HTML and shortens CSS selectors
- Existing styles do not change (only specificity decreases)
- **However**: Specificity decrease may cause other rules to override. After each fix, verify:
  - Whether the target property is defined by other rules
  - Whether `!important` is involved

### Medium Risk (Needs care)

- **tabs selectors (4-2 to 4-5)**: `[data-widget="tabs"]` is an attribute set by JS plugin. When adding classes to HTML, existing JS-derived attributes must be kept
- **admission/family sticker series**: Page-specific sticker position adjustments. Spanning multiple media queries, so appearance verification is needed at all MQs
- **protein section series (17-7 to 17-10)**: Uses `.c-section--light-blue` component class as context, so be careful not to affect `.c-section--light-blue` on other pages
- **medical banner-logo series (14-1/14-2)**: Complex pattern using `~` sibling combinator

### High Risk (Skip)

- All WordPress-derived code
- FAQ checkbox hack

---

## Verification Procedure

### Checks After Each Fix

1. **Grep for old selector residuals**: Confirm the fixed selector does not remain in other places
2. **SCSS compilation**: `npx sass assets/scss/global.scss assets/css/global.css --no-source-map`
3. **Browser check**: Display target pages on both PC/SP and confirm appearance is unchanged

### Final Check After All Complete

1. Display all HTML files in browser for confirmation
2. Focus check on the following pages:
   - `index.html` (Top: news, shop, slider)
   - `storedetail/*/index.html` (Store detail: slider, price table)
   - `admission/index.html` (Admission: steps, stickers)
   - `family/index.html` (Family: table, stickers)
   - `protein/index.html` (Protein: flavor cards)
   - `medical/index.html` (Medical: banner, engagement)
   - `point-redemption/index.html` (Points: table)
3. Responsive check: Each major breakpoint (1090px, 767px, 500px)

---

## HTML Change Target Files (Estimated)

Files that need class additions to HTML:

| HTML File | Corresponding SCSS |
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
| All pages (common footer/header) | _footer, _reset |

---

## Important Notes

1. **JS files are not changed** -- Only classes are added to HTML. IDs and classes referenced by JS are not changed
2. **Existing classes are not removed** -- Only new classes are added. Existing classes remain in HTML
3. **CSS modifications are "selector rewriting" only** -- Property values are not changed
4. **Duplicate definitions (_slider.scss and _global-responsive.scss `.c-text-slider .slide p`) must be fixed simultaneously**
5. **Selectors within media queries are also targets** -- Styles spanning multiple MQs for the same element use a single class
6. **Line numbers are reference values** -- This plan was created after Step 4 completion, but line numbers may shift due to file edits. Grep for actual line numbers of target selectors before each fix
7. **When using Approach B (intermediate level omission), grep to verify the child selector is not used outside the omitted parent selector before execution**
