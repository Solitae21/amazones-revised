# Step 3 Execution Plan: BEM Notation & FLOCSS Prefix Corrections

Created: 2026-03-30
Related to: `css-refactoring-plan.md` Step 3
Based on: `cording-guideline.md`

---

## Purpose

Fix BEM notation violations (single underscore `_` -> double underscore `__` / modifier `--`),
and add `l-` / `c-` / `p-` prefixes to classes without FLOCSS prefixes.

---

## Most Important Principle (Restated)

**Do not change the frontend display results at all.**
Only perform class name renaming; do not add, delete, or modify any CSS rules.

---

## Prerequisites

- Step 1 (variable definition setup) completed
- Step 2 (FLOCSS directory structure separation) completed
- SCSS files are separated into FLOCSS structure under `assets/scss/`

---

## Common Work Rules

1. **For each class, search all references in SCSS -> CSS -> HTML -> JS and replace without omissions**
2. **Proceed one subtask at a time, confirming output CSS is equivalent via SCSS compilation each time**
3. **WordPress-derived classes (`page_item`, `widget_recent_entries`, etc.) are excluded as external dependencies**
4. **If the same class name is defined in multiple files, replace all definition locations without omissions**
5. **Search for class references in JS using `querySelector`, `classList`, `className`, `getElementsByClassName`, etc.**

---

## Impact Scope Summary

| Subtask | Target Class Count | SCSS | HTML | JS |
|-----------|:----------:|:----:|:----:|:--:|
| 3-1. BEM delimiter fix | ~80 | 8 files | All 23 pages | global.js, storedetail.js |
| 3-2. `l-` prefix addition | ~47 | 2 files | All 23 pages | global.js |
| 3-3. `c-` prefix addition | ~56 | 12 files | All 23 pages | global.js |
| 3-4. `p-` prefix addition | ~60 | 5 files | 5 pages | global.js, common.js |

---

## Subtask 3-1: BEM Delimiter Fix (`_` -> `__` / `--`)

### Overview

Fix single underscore `_` to BEM element separator `__` or modifier `--`.
Also unify camelCase (`titleContainer`) to kebab-case (`title-container`).

### 3-1-A. Announcement Component

| Current | Fixed | SCSS File | SCSS Lines |
|------|--------|-------------|--------|
| `.c-announcement_section` | `.c-announcement__section` | `object/component/_announcement.scss` | 4 |
| `.c-announcement_titleContainer` | `.c-announcement__title-container` | `object/component/_announcement.scss` | 25, 32, 38 |
| `.c-announcement_body` | `.c-announcement__body` | `object/component/_announcement.scss` | 43, 50 |
| `.c-announcement_btn` | `.c-announcement__btn` | `object/component/_announcement.scss` | 56 |

**Responsive references**: Same-name selectors exist in `_global-responsive.scss` (around lines 38, 43, 113, 120, 124, 128, 133)
**Other file references**: `_medical.scss` (around lines 1054, 1062, 1067, 1068, 1172), `_btn.scss` (lines 54, 59)
**HTML**: Used across multiple pages
**JS**: None

### 3-1-B. Section Component

| Current | Fixed | SCSS File | SCSS Lines |
|------|--------|-------------|--------|
| `.c-section_white` | `.c-section--white` | `object/component/_announcement.scss` | 69 |
| `.c-section_lightBlue` | `.c-section--light-blue` | `object/component/_announcement.scss` | 82 |
| `.c-section_white--padded` | `.c-section--white-padded` | `_global-responsive.scss` | 1517 |
| `.c-section_lightBlue--padded` | `.c-section--light-blue-padded` | `_global-responsive.scss` | 1305 |
| `.c-section_lightBlue--padded-50` | `.c-section--light-blue-padded-50` | `_global-responsive.scss` | 1521 |

**Note**: `_white` / `_lightBlue` are modifiers so `--` should be used. Mixed syntax already exists with `--padded`.
**HTML**: `sportip/index.html`, `protein/index.html`, `medical/index.html`, etc.
**Other file references**: `_protein.scss` (around lines 710, 769, 795, 802, 809, 814, 828, 833)

### 3-1-C. EndNote Component

| Current | Fixed | SCSS File | SCSS Lines |
|------|--------|-------------|--------|
| `.c-endNote_section` | `.c-end-note__section` | `object/component/_endnote.scss` | relevant lines |
| `.c-endNote_card` | `.c-end-note__card` | `object/component/_endnote.scss` | relevant lines |
| `.c-endNote_card_header` | `.c-end-note__card-header` | `object/component/_endnote.scss` | relevant lines |
| `.c-endNote_card_icon` | `.c-end-note__card-icon` | `object/component/_endnote.scss` | relevant lines |
| `.c-endNote_card_body` | `.c-end-note__card-body` | `object/component/_endnote.scss` | relevant lines |
| `.c-endNote_row` | `.c-end-note__row` | `object/component/_endnote.scss` | relevant lines |

**HTML**: Used across multiple pages
**JS**: None

### 3-1-D. Button Icon

| Current | Fixed | SCSS File | SCSS Lines |
|------|--------|-------------|--------|
| `.btn_icn_light_blue` | `.c-btn-icon--light-blue` | `object/component/_btn.scss` | 82, 91, 97 |

**HTML**: `payment/index.html`(1097), `reservation/index.html`(1170), `price/index.html`(1662), `storelist/[slag]/index.html`(8431)
**JS**: None

### 3-1-E. Accordion / FAQ Related

| Current | Fixed | SCSS File | SCSS Lines |
|------|--------|-------------|--------|
| `.accordion_inner` | `.c-faq__accordion-inner` | `_global-responsive.scss` | 1542, 1556 |
| `.accordion_header` | `.c-faq__accordion-header` | `_global-responsive.scss` | 1563 |
| `.one_i` | `.c-faq__toggle-icon` | `_global-responsive.scss` | 1563 |
| `.vertical_line` | `.c-faq__icon-vertical-line` | `object/project/_storedetail-introduction.scss` | 2814 |

**Note**: HTML may use `c-faq__accordion_inner` (single `_`). Fix HTML side as well.
**HTML**: Used in 8+ pages
**JS**: None

### 3-1-F. Recommended Button

| Current | Fixed | SCSS File | SCSS Lines |
|------|--------|-------------|--------|
| `.c-recommended_btn` | `.c-recommended__btn` | `object/project/_column-slag.scss` | 333 |
| `.p-recommended_btn` | `.p-recommended__btn` | `object/project/_point_redemption.scss` | 177 |

### 3-1-G. Storedetail Project (Largest Volume: ~50 classes)

| Current | Fixed | SCSS Lines |
|------|--------|--------|
| `.p-storedetail_topic_header` | `.p-storedetail__topic-header` | 6, 16, 21 |
| `.p-storedetail_topic_break` | `.p-storedetail__topic-break` | 27 |
| `.p-storedetail_links-nav` | `.p-storedetail__links-nav` | 102 |
| `.p-storedetail_links-item` | `.p-storedetail__links-item` | 111, 124 |
| `.p-storedetail_links-divider` | `.p-storedetail__links-divider` | 128 |
| `.p-service_slider_wrapper` | `.p-service__slider-wrapper` | 137 |
| `.p-service_nav` | `.p-service__nav` | 141 |
| `.p-storedetail_opening_block` | `.p-storedetail__opening-block` | 145 |
| `.p-storedetail_opening_header` | `.p-storedetail__opening-header` | 152, 157, 163 |
| `.p-storedetail_opening_jump` | `.p-storedetail__opening-jump` | 169, 173 |
| `.p-storedetail_facility-tile` | `.p-storedetail__facility-tile` | 173 |
| `.p-storedetail_introduction_ribbon` | `.p-storedetail__introduction-ribbon` | 183 |
| `.p-storedetail_introduction_people` | `.p-storedetail__introduction-people` | 194, 205 |
| `.p-storedetail_introduction_people-img` | `.p-storedetail__introduction-people-img` | 205, 209, 212 |
| `.p-storedetail_introduction_people-img--01` | `.p-storedetail__introduction-people-img--01` | 209 |
| `.p-storedetail_introduction_people-img--02` | `.p-storedetail__introduction-people-img--02` | 212 |
| `.p-storedetail_gray_container` | `.p-storedetail__gray-container` | 218 |
| `.p-storedetail_cutout` | `.p-storedetail__cutout` | 228 |
| `.p-storedetail_map` | `.p-storedetail__map` | 237 |
| `.p-storedetail_price_image_container` | `.p-storedetail__price-image-container` | 293 |
| `.p-storedetail_price_image_left` | `.p-storedetail__price-image-left` | 316 |
| `.p-storedetail_price_image_right` | `.p-storedetail__price-image-right` | 320 |
| `.p-storedetail_whychooseus_text_container_left` | `.p-storedetail__whychooseus-text-left` | 325 |
| `.p-storedetail_whychooseus_text_container_right` | `.p-storedetail__whychooseus-text-right` | 338 |
| `.p-storedetail_reason_img01` | `.p-storedetail__reason-img01` | 351 |
| `.p-storedetail_reason_img02` | `.p-storedetail__reason-img02` | 369 |
| `.p-storedetail_reason_img03` | `.p-storedetail__reason-img03` | 379 |
| `.p-storedetail_reason_ribbon01` | `.p-storedetail__reason-ribbon01` | 389 |
| `.p-storedetail_reason_ribbon02` | `.p-storedetail__reason-ribbon02` | 399, 410 |
| `.p-storedetail_cta_container` | `.p-storedetail__cta-container` | 420 |
| `.p-storedetail_cta_ribbon` | `.p-storedetail__cta-ribbon` | 437 |
| `.p-storedetail_cta_content` | `.p-storedetail__cta-content` | 447 |
| `.p-storedetail_cta_heading` | `.p-storedetail__cta-heading` | 456 |
| `.p-storedetail_cta_stats` | `.p-storedetail__cta-stats` | 472 |
| `.p-storedetail_cta_stats_left` | `.p-storedetail__cta-stats-left` | 481 |
| `.p-storedetail_cta_stats_number` | `.p-storedetail__cta-stats-number` | 498 |
| `.p-storedetail_cta_note` | `.p-storedetail__cta-note` | 518 |
| `.p-storedetail_cta_note-mobile` | `.p-storedetail__cta-note-mobile` | 530 |
| `.p-storedetail_cta_people` | `.p-storedetail__cta-people` | 534 |
| `.p-storedetail_cta_person01` | `.p-storedetail__cta-person01` | 544 |
| `.p-storedetail_cta_person02` | `.p-storedetail__cta-person02` | 551 |
| `.p-storedetail_cta_btn` | `.p-storedetail__cta-btn` | 558 |
| `.p-storedetail_freetrial_speak_container01` | `.p-storedetail__freetrial-speak-container01` | 567 |
| `.p-storedetail_faq_ribbon` | `.p-storedetail__faq-ribbon` | 584 |
| `.p-storedetail_dr-amazones` | `.p-storedetail__dr-amazones` | 913 |
| `.p-storedetail_dr-amazones-pic` | `.p-storedetail__dr-amazones-pic` | 925 |
| `.p-storedetail_dr-amazones-content` | `.p-storedetail__dr-amazones-content` | 931 |
| `.p-storedetail_dr-amazones-triangle` | `.p-storedetail__dr-amazones-triangle` | 947 |
| `.p-storedetail_dr-amazones-inner` | `.p-storedetail__dr-amazones-inner` | 954 |
| `.p-storedetail_dr-amazones-header` | `.p-storedetail__dr-amazones-header` | 961 |
| `.p-storedetail_dr-amazones-label` | `.p-storedetail__dr-amazones-label` | 968 |
| `.p-storedetail_dr-amazones-body` | `.p-storedetail__dr-amazones-body` | 973 |
| `.p-storedetail_dr-amazones-btn` | `.p-storedetail__dr-amazones-btn` | 980 |

**SCSS File**: `object/project/_storedetail.scss`
**HTML**: `storelist/[slag]/index.html`
**JS**: Some references possibly in `storedetail.js` (needs verification)

### 3-1-H. Others

| Current | Fixed | SCSS File |
|------|--------|-------------|
| `.p-attraction_page` | `.p-attraction__page` | `object/project/_about.scss` (46) |
| `.p-protein_campaign_block` | `.p-protein__campaign-block` | `object/project/_family.scss` (197), `_point_redemption.scss` (456) |
| `.p-protein_campaign_header` | `.p-protein__campaign-header` | `object/project/_family.scss` (203), `_point_redemption.scss` (462) |
| `.storelist-text_size-heading` | `.storelist-text__size-heading` | `object/project/_storedetail-introduction.scss` (10787) |
| `.storelist-text_size-sub` | `.storelist-text__size-sub` | `object/project/_storedetail-introduction.scss` (10797) |
| `.c-banner-inner_two-lines` | `.c-banner__inner--two-lines` | `object/project/_storedetail-introduction.scss` (4480, etc.) |

### 3-1 Exclusions (WordPress-derived)

The following classes are excluded as they come from external plugins:

- `.page_item` -- WordPress page menu
- `.page_item_has_children` -- WordPress submenu
- `.widget_recent_entries` -- WordPress widget

### 3-1 Phase A Additional Fixes & Records

#### Additional Fixes (Completed)
- Changed `.c-endNote` block name to `.c-end-note` (camelCase -> kebab-case, guideline compliant)

#### 3-1-D Naming Fix (Completed)
- Changed `.btn_icn_light_blue` to `.c-btn-icon--light-blue`. Fixed to Block + Modifier structure instead of `__` (Element) as it is an independent component. Excluded from 3-3 (c- prefix addition).

#### Items Requiring Action in Subsequent Steps
- **Compound modifier `c-section--white-padded`**: Per BEM principles, should be split into multi-class (`c-section--white` + `c-section--padded`), but since this involves CSS structure changes, it is outside the rename scope. Plan as a separate Step in Phase 6.
- **`storelist-text__size-heading` / `storelist-text__size-sub`**: Missing FLOCSS prefix. Will be changed to `p-storelist-text__size-heading`, etc. in 3-4 (p- prefix addition).

---

## Subtask 3-2: Adding `l-` Prefix to Layout Classes

### Overview

Add `l-` prefix to layout classes for header, footer, navigation, etc.

### 3-2-A. Header Related (SCSS File: `layout/_header.scss`)

| Current | Fixed | SCSS Lines | HTML | JS(global.js) |
|------|--------|--------|------|----------------|
| `.header-btn` | `.l-header__btn` | 11-26 | All 23 pages | -- |
| `.header-btn__content` | `.l-header__btn-content` | 40 | All 23 pages | -- |
| `.header-btn__text` | `.l-header__btn-text` | 46 | All 23 pages | -- |
| `.header-btn--reservation` | `.l-header__btn--reservation` | 37-39 | All 23 pages | -- |
| `.header-floating-menu` | `.l-header-floating-menu` | 53-69, 85-88 | All 23 pages | 53, 60, 61, 68, 76, 77, 85, 100, 113, 170 |
| `.floating-menu-btn` | `.l-header-floating-menu__btn` | 70-75 | All 23 pages | 51, 84, 85, 104, 107 |
| `.floating-menu-content` | `.l-header-floating-menu__content` | 90-100 | All 23 pages | 52, 86, 89, 104, 106 |
| `.mobile-header-overlay` | `.l-mobile-header-overlay` | 199-220 | All 23 pages | 166, 187, 199, 202 |
| `.sp-nav-header` | `.l-sp-nav__header` | 223-229 | Possibly unused | -- |
| `.sp-nav-logo` | `.l-sp-nav__logo` | 230-233 | Possibly unused | -- |
| `.sp-nav-close` | `.l-sp-nav__close` | 234-244 | Unconfirmed | 184 |
| `.sp-nav-main` | `.l-sp-nav__main` | 245-247 | All 23 pages | -- |
| `.sp-nav-section` | `.l-sp-nav__section` | 248-250, 294-300, 311-314 | All 23 pages (multiple locations) | 178, 179 |
| `.sp-nav-head` | `.l-sp-nav__head` | 251-265 | All 23 pages (multiple locations) | -- |
| `.sp-nav-plus` | `.l-sp-nav__plus` | 266-300 | All 23 pages (multiple locations) | -- |
| `.sp-nav-list` | `.l-sp-nav__list` | 301-320 | All 23 pages (multiple locations) | -- |
| `.sp-nav-link` | `.l-sp-nav__link` | 322-337 | All 23 pages (multiple locations) | -- |
| `.sp-nav-sns-icon` | `.l-sp-nav__sns-icon` | 333-337 | All 23 pages | -- |
| `.sp-nav-sub` | `.l-sp-nav__sub` | 338-346 | All 23 pages | -- |
| `.sp-nav-btns` | `.l-sp-nav__btns` | 341-354 | All 23 pages | -- |
| `.sp-nav-btn` | `.l-sp-nav__btn` | 355-367 | Unconfirmed | -- |
| `.sp-nav-utility` | `.l-sp-nav__utility` | 368-383 | All 23 pages | -- |
| `.mobile-hamburger` | `.l-header__hamburger` | 384-532 | All 23 pages | 167, 171, 188, 200, 203 |
| `.sp-header-btn` | `.l-header__sp-btn` | 387-391 | `information/index.html` | -- |

**Note**: `.header-floating-menu` is also referenced in `layout/_footer.scss` (lines 5-9).

### 3-2-B. Footer Related (SCSS File: `layout/_footer.scss`)

| Current | Fixed | SCSS Lines | HTML | JS(global.js) |
|------|--------|--------|------|----------------|
| `.nav-menu-popup` | `.l-nav-menu-popup` | 12-151 | All 23 pages | 54, 61, 62, 69, 77, 87, 94, 102, 114, 117 |
| `.nav-menu-popup__columns` | `.l-nav-menu-popup__columns` | 36-41 | All 23 pages | -- |
| `.nav-menu-popup__column` | `.l-nav-menu-popup__column` | 42-46 | All 23 pages | -- |
| `.nav-menu-popup__group` | `.l-nav-menu-popup__group` | 47-51 | All 23 pages | -- |
| `.nav-menu-popup__section` | `.l-nav-menu-popup__section` | 52-56 | All 23 pages (multiple) | -- |
| `.nav-menu-popup__links` | `.l-nav-menu-popup__links` | 57-62 | All 23 pages | -- |
| `.nav-menu-popup__bottom` | `.l-nav-menu-popup__bottom` | 63-68 | All 23 pages | -- |
| `.nav-menu-popup__bottom-btns` | `.l-nav-menu-popup__bottom-btns` | 69-73 | All 23 pages | -- |
| `.nav-menu-popup__bottom-links` | `.l-nav-menu-popup__bottom-links` | 74-79 | All 23 pages | -- |
| `.footer-main-container` | `.l-footer__main-container` | 164-169 | All 23 pages | -- |
| `.footer-top` | `.l-footer__top` | 172-178 | All 23 pages | -- |
| `.footer-brand` | `.l-footer__brand` | 181-187 | All 23 pages | -- |
| `.footer-brand-logo` | `.l-footer__brand-logo` | 189-198 | All 23 pages | -- |
| `.footer-cta-links` | `.l-footer__cta-links` | 200-204 | All 23 pages | -- |
| `.footer-nav-columns` | `.l-footer__nav-columns` | 207-212 | All 23 pages | -- |
| `.footer-nav-section` | `.l-footer__nav-section` | 215-229 | All 23 pages (multiple) | 1062, 1067 |
| `.footer-nav-group` | `.l-footer__nav-group` | 225-229 | All 23 pages | -- |
| `.footer-page-link` | `.l-footer__page-link` | 232-350 | All 23 pages (multiple) | 1055, 1061, 1062, 1064 |
| `.footer-link-line` | `.l-footer__link-line` | 252-259 | All 23 pages (multiple) | -- |
| `.footer-nav-list` | `.l-footer__nav-list` | 269-287 | All 23 pages (multiple) | -- |
| `.footer-icon-link` | `.l-footer__icon-link` | 290-299 | All 23 pages (multiple) | -- |
| `.footer-bottom` | `.l-footer__bottom` | 306-312 | All 23 pages | -- |
| `.footer-legal-links` | `.l-footer__legal-links` | 314-320 | All 23 pages | 1062, 1066 |
| `.footer-blue-btn` | `.l-footer__blue-btn` | around 462 | All 23 pages (multiple) | -- |
| `.footer-btn` | `.l-footer__btn` | 335 | All 23 pages | 1023 |

### 3-2-C. Others

| Current | Fixed | SCSS File | SCSS Lines | JS |
|------|--------|-------------|--------|-----|
| `.scroll-up` | `.l-scroll-up` | `layout/_footer.scss` | 321-328 | global.js:1075 |

---

## Subtask 3-3: Adding `c-` Prefix to Component Classes

### Overview

Add `c-` prefix to reusable component classes.

### 3-3-A. Animation Related (SCSS File: `object/component/_animation.scss`)

| Current | Fixed | SCSS Lines | HTML Count | JS(global.js) |
|------|--------|--------|:----------:|----------------|
| `.reveal` | `.c-reveal` | 7 | ~677 | 723 |
| `.reveal-left` | `.c-reveal--left` | 20 | ~14 | 723 |
| `.reveal-right` | `.c-reveal--right` | 33 | ~14 | 723 |
| `.reveal-scale` | `.c-reveal--scale` | 46 | ~253 | 723 |
| `.hover-text-underline` | `.c-hover-text-underline` | 61 | 0 (unused?) | -- |

**Risk: High** -- `.reveal` is used heavily across all pages (677 locations). Pay maximum attention to replacement omissions.
**JS dependency**: Referenced as IntersectionObserver target in `global.js` line 723.

### 3-3-B. Button Related (SCSS File: `object/component/_btn.scss`)

| Current | Fixed | SCSS Lines | HTML Count | JS |
|------|--------|--------|:----------:|-----|
| `.btn-green-wrapper` | `.c-btn--green-wrapper` | 13 | ~62 | -- |
| `.btn-light-blue` | `.c-btn--light-blue` | 34 | ~193 | -- |
| `.btn-light-blue02` | `.c-btn--light-blue02` | 66 | ~7 | -- |
| `.btn-red` | `.c-btn--red` | 112 | ~4 | -- |

**`.btn` standalone (445 locations) will also be changed to `c-btn`.** Per the guideline, `_btn.scss` is classified as Object/Component, so `c-btn` is correct.

### 3-3-C. Speech Bubble (SCSS File: `object/component/_speech-bubble.scss`)

| Current | Fixed | SCSS Lines | HTML Count | JS(global.js) |
|------|--------|--------|:----------:|----------------|
| `.speech-bubble` | `.c-speech-bubble` | 4 | ~61 | 147 |

### 3-3-D. Ribbon & Hero Related (SCSS Files: `object/component/_ribbon.scss`, `_hero.scss`)

| Current | Fixed | SCSS File | HTML Count | JS(global.js) |
|------|--------|-------------|:----------:|----------------|
| `.hero-ribbon` | `.c-hero-ribbon` | `_ribbon.scss` (11) | ~1 | -- |
| `.grow-wrapper-right` | `.c-grow-wrapper-right` | `_ribbon.scss` (4) | ~13 | -- |
| `.clip-grow-right` | `.c-clip-grow-right` | `_ribbon.scss` (18) | ~50 | 148 |
| `.clip-img` | `.c-clip-img` | `_hero.scss` (29) | 0 (descendant only?) | -- |

### 3-3-E. Slider Related (SCSS File: `object/component/_slider.scss`)

| Current | Fixed | SCSS Lines | HTML Count | JS(global.js) |
|------|--------|--------|:----------:|----------------|
| `.text-slider` | `.c-text-slider` | 26 | ~15 | 150 |
| `.topic-container` | `.c-topic-container` | 69 | ~3 | 150 |
| `.topic-section-header` | `.c-topic-section-header` | 77 | ~2 | -- |
| `.topic-buttons-container` | `.c-topic-buttons-container` | 81 | ~5 | -- |
| `.topic-slider` | `.c-topic-slider` | N/A | ~1 | 150 |
| `.topic-sticker` | `.c-topic-sticker` | 189 | ~2 | -- |
| `.topic-speech-bubble` | `.c-topic-speech-bubble` | 195 | ~1 | -- |
| `.topic-bg` | `.c-topic-bg` | 241 | ~1 | -- |
| `.topic-ribbon` | `.c-topic-ribbon` | 248 | ~1 | -- |

### 3-3-F. Section Header (SCSS File: `object/component/_section.scss`)

| Current | Fixed | SCSS Lines | HTML Count |
|------|--------|--------|:----------:|
| `.section-header-wrapper` | `.c-section-header__wrapper` | 4 | ~23 |
| `.section-header-text` | `.c-section-header__text` | 19 | ~24 |

### 3-3-G. Cookie Notice (SCSS File: `object/component/_cookie.scss`)

| Current | Fixed | SCSS Lines | HTML Count | JS(global.js) |
|------|--------|--------|:----------:|----------------|
| `.cookie-notice` | `.c-cookie-notice` | 10 | ~23 | 1015 |
| `.cookie-notice-sub` | `.c-cookie-notice__sub` | 55 | 0 | -- |

### 3-3-H. Banner Related (SCSS Files: `object/component/_banner.scss`, `_footer-banner.scss`)

| Current | Fixed | SCSS File | HTML Count |
|------|--------|-------------|:----------:|
| `.recruit-banner-section` | `.c-recruit-banner__section` | `_banner.scss` (4) | ~4 |
| `.recruit-banner` | `.c-recruit-banner` | `_banner.scss` (18) | ~4 |
| `.recruit-banner-track` | `.c-recruit-banner__track` | `_banner.scss` (50) | ~2 |
| `.recruit-banner-track2` | `.c-recruit-banner__track2` | `_banner.scss` (57) | ~1 |
| `.recruit-info` | `.c-recruit-info` | `_banner.scss` (26) | ~1 |
| `.banner-section` | `.c-banner-section` | `_banner.scss` (187) | ~19 |
| `.banner-speechbubble1` | `.c-banner__speechbubble1` | `_footer-banner.scss` (31) | 0 |
| `.banner-speechbubble2` | `.c-banner__speechbubble2` | `_footer-banner.scss` (41) | 0 |
| `.banner-sticker2` | `.c-banner__sticker2` | `_footer-banner.scss` (36) | ~2 |
| `.banner-stickers-row` | `.c-banner__stickers-row` | `_footer-banner.scss` (138) | 0 |

### 3-3-I. News Related (SCSS File: `_global-responsive.scss`)

| Current | Fixed | SCSS Lines | HTML Count |
|------|--------|--------|:----------:|
| `.panel-content` | `.c-panel-content` | 317 | ~117 |
| `.news-info-container` | `.c-news-info-container` | 342 | ~39 |

**Risk: Medium** -- `.panel-content` has 117 locations.

---

## Subtask 3-4: Adding `p-` Prefix to Project Classes

### Overview

Add `p-` prefix to page-specific classes. Classes already with `p-` are excluded.

### 3-4-A. Top Page (SCSS File: `object/project/_top.scss`)

#### Carousel & Hero

| Current | Fixed | SCSS Lines |
|------|--------|--------|
| `.carousel-container` | `.p-top__carousel-container` | 5 |
| `.carousel-img-container` | `.p-top__carousel-img-container` | 14 |
| `.mySlides` | `.p-top__slides` | 20 |
| `.hero-text-slider-container` | `.p-top__hero-text-slider-container` | 60 |
| `.hero-text` | `.p-top__hero-text` | 69 |

**Decision**: `.hero-text-slider-container` is shared across top/about, so use `c-hero-text-slider-container` (common component). Handle in 3-3.

#### News Banner

| Current | Fixed | SCSS Lines |
|------|--------|--------|
| `.news-banner-desk` | `.p-top__news-banner-desk` | 181 |
| `.news-banner-sp` | `.p-top__news-banner-sp` | 274 |
| `.news-banner-context` | `.p-top__news-banner-context` | 191 |
| `.news-banner__heading` | `.p-top__news-banner-heading` | 207 |
| `.news-30min-label` | `.p-top__news-30min-label` | 257 |
| `.news-banner-sticker1` | `.p-top__news-banner-sticker1` | 236 |
| `.news-banner-sticker2` | `.p-top__news-banner-sticker2` | 245 |
| `.news-banner-sticker3` | `.p-top__news-banner-sticker3` | 250 |
| `.news-banner-sticker4` | `.p-top__news-banner-sticker4` | (relevant line) |
| `.news-ribbon-desk` | `.p-top__news-ribbon-desk` | 217 |
| `.news-ribbon-desk2` | `.p-top__news-ribbon-desk2` | 223 |

#### Service Section

| Current | Fixed | SCSS Lines | Other Files |
|------|--------|--------|-----------|
| `.service-container` | `.c-service__container` | 495 | `_storedetail.scss` (999) |
| `.service-wrapper` | `.c-service__wrapper` | 517 | `_storedetail.scss` (1036) |
| `.service-img` | `.c-service__img` | 543 | `_storedetail.scss` (1043) |
| `.service-wrapper2` | `.c-service__wrapper2` | 550 | `_storedetail.scss` (1048) |
| `.service-wrapper3` | `.c-service__wrapper3` | 554 | `_storedetail.scss` (1052) |
| `.service-section` | `.c-service__section` | 489 | -- |
| `.service-ribbon` | `.c-service__ribbon` | 557 | -- |

**Decision**: `.service-*` will be componentized (`c-service__*`). Shared across top/storedetail. Consider consolidating SCSS into `object/component/_service.scss`.

#### Dr.Amazones Section

| Current | Fixed | SCSS Lines | Other Files |
|------|--------|--------|-----------|
| `.dr-amazones-container` | `.c-dr-amazones__container` | 682 | `_storedetail.scss`(1342), `_point_redemption.scss`(360) |
| `.dr-amazones-section` | `.c-dr-amazones__section` | 692 | `_storedetail.scss`(1352), `_point_redemption.scss`(366) |
| `.dr-amazones-section__inner` | `.c-dr-amazones__inner` | 706 | -- |
| `.dr-amazones-section__header` | `.c-dr-amazones__header` | 711 | -- |
| `.dr-amazones-section__body` | `.c-dr-amazones__body` | 716 | -- |

**Decision**: `.dr-amazones-*` will be componentized (`c-dr-amazones__*`). Shared across top/storedetail/point_redemption (3 pages). Consider consolidating SCSS into `object/component/_dr-amazones.scss`. The storedetail-side `p-storedetail_dr-amazones` will also be unified into `c-dr-amazones__*` in 3-1-G.

#### Training Machine Section

| Current | Fixed | SCSS Lines |
|------|--------|--------|
| `.training-machine-section` | `.p-top__training-machine-section` | 786 |
| `.training-machine-container` | `.p-top__training-machine-container` | 798 |
| `.training-machine__info` | `.p-top__training-machine-info` | 805 |
| `.training-machine-label` | `.p-top__training-machine-label` | 812 |
| `.training-sticker1` | `.p-top__training-sticker1` | 824 |
| `.training-sticker2` | `.p-top__training-sticker2` | 834 |
| `.training-speech-bubble1` | `.p-top__training-speech-bubble1` | 829 |
| `.training-speech-bubble2` | `.p-top__training-speech-bubble2` | 839 |

#### Voice Section

| Current | Fixed | SCSS Lines |
|------|--------|--------|
| `.voice-section` | `.p-top__voice-section` | 887 |
| `.voice-section__inner` | `.p-top__voice-inner` | 895 |
| `.voice-section__header` | `.p-top__voice-header` | 900 |
| `.voice-section__sub-text` | `.p-top__voice-sub-text` | 907 |
| `.voice-section__sub-text__inner` | `.p-top__voice-sub-text-inner` | 914 |
| `.voice-slide-content` | `.p-top__voice-slide-content` | 920 |
| `.voice-img-box` | `.p-top__voice-img-box` | 926 |
| `.voice-slide` | `.p-top__voice-slide` | 933 |
| `.voice-label` | `.p-top__voice-label` | 938 |
| `.voice-name` | `.p-top__voice-name` | 945 |

#### Movie Section

| Current | Fixed | SCSS Lines |
|------|--------|--------|
| `.movie-section` | `.p-top__movie-section` | 1014 |
| `.movie-section__header` | `.p-top__movie-header` | 1025 |
| `.movie-section__info` | `.p-top__movie-info` | 1031 |
| `.movie-section__label-inner` | `.p-top__movie-label-inner` | 1037 |
| `.movie-section__thumbs` | `.p-top__movie-thumbs` | 1043 |
| `.movie-section-container` | `.p-top__movie-container` | 1049 |
| `.movie-thumbnail` | `.p-top__movie-thumbnail` | 1056 |
| `.movie-video` | `.p-top__movie-video` | 1061 |
| `.movie-sticker-container` | `.p-top__movie-sticker-container` | 1082 |
| `.movie-sticker-girl` | `.p-top__movie-sticker-girl` | (relevant line) |
| `.movie-sticker1` | `.p-top__movie-sticker1` | (relevant line) |
| `.movie-sticker2` | `.p-top__movie-sticker2` | (relevant line) |
| `.movie-ribbon` | `.p-top__movie-ribbon` | (relevant line) |
| `.movie-sticker-container-sp` | `.p-top__movie-sticker-container-sp` | 1188 |
| `.movie-sticker-sp1` | `.p-top__movie-sticker-sp1` | 1197 |
| `.movie-sticker-sp2` | `.p-top__movie-sticker-sp2` | 1202 |
| `.movie-ribbon-sp` | `.p-top__movie-ribbon-sp` | 1207 |

**HTML**: `index.html` only
**JS**: Some references possibly in `common.js` for carousel control

### 3-4-B. Other Pages

Besides `.hero-text-slider-container` being used in `_about.scss`,
other project files (medical, protein, payment, personal, reservation, etc.)
already have the `p-` prefix applied.

---

## Execution Order

Considering risk and impact scope, execute in the following order:

### Phase A: Low Risk, Small Quantity (get a feel first)

1. **3-1-F**: Recommended button (2 classes)
2. **3-1-C**: EndNote component (6 classes)
3. **3-1-A**: Announcement component (4 classes)
4. **3-1-B**: Section component (5 classes)
5. **3-1-D**: Button icon (1 class)
6. **3-1-H**: Other BEM fixes (6 classes)

### Phase B: Medium Risk, Medium Quantity

7. **3-3-F**: Section header `c-` addition (2 classes)
8. **3-3-G**: Cookie notice `c-` addition (2 classes)
9. **3-3-C**: Speech bubble `c-` addition (1 class)
10. **3-3-D**: Ribbon & hero `c-` addition (4 classes)
11. **3-3-E**: Slider `c-` addition (9 classes)
12. **3-3-H**: Banner `c-` addition (10 classes)
13. **3-1-E**: Accordion / FAQ (4 classes)

### Phase C: High Risk, Large Quantity (proceed carefully)

14. **3-3-B**: Button `c-` addition (4 classes, 193 locations, etc.)
15. **3-3-I**: News related `c-` addition (2 classes, 117 locations, etc.)
16. **3-3-A**: Animation `c-` addition (5 classes, 677 locations, etc.) -- **highest risk**

### Phase D: Layout Classes (affects all pages)

17. **3-2-C**: scroll-up (1 class)
18. **3-2-B**: Footer `l-` addition (~25 classes)
19. **3-2-A**: Header `l-` addition (~22 classes)

### Phase E: Project Classes

20. **3-4-B**: About page and other individual fixes
21. **3-4-A**: Top page `p-` addition (~60 classes)
22. **3-1-G**: Storedetail BEM fix (~50 classes) -- **largest volume**

---

## Risk Assessment

### High Risk Items

| Target | Risk Factor | Countermeasure |
|------|-----------|------|
| `.reveal` (677 locations) | Heavy usage across all pages, JS dependency | Bulk replace with regex, then visually check all pages |
| `.btn-light-blue` (193 locations) | Used in many HTML files | Staged replacement by file |
| `.panel-content` (117 locations) | Used in many HTML files | Same as above |
| Layout classes overall | Affects all 23 pages, many JS dependencies | Pre-list class references in global.js, replace SCSS/HTML/JS simultaneously |
| Storedetail BEM fix | Bulk replacement of 50 classes | Concentrated in 1 HTML file: `storelist/[slag]/index.html`. Complete HTML file in one pass |

### WordPress-Derived Exclusions

- `.page_item`, `.page_item_has_children`, `.widget_recent_entries`
- Old WordPress structure in `storedetail-introduction.scss` will be handled in Step 5 (selector depth fix)

### Decisions Made

1. **`.btn` standalone** -> **`c-btn`** (component). Per the guideline, `_btn.scss` is classified as Object/Component, with `c-btn1` shown as an example.
2. **`.hero-text-slider-container`** -> **`c-hero-text-slider-container`** (common component). Shared across top/about.
3. **`.service-*` classes** -> **`c-service-*`** (common component). Shared across top/storedetail. Consider consolidating SCSS into `object/component/_service.scss`.
4. **`.dr-amazones-*`** -> **`c-dr-amazones-*`** (common component). Shared across top/storedetail/point_redemption (3 pages). Consider consolidating SCSS into `object/component/_dr-amazones.scss`.

---

## Verification Method

Perform the following at the completion of each Phase:

1. **SCSS compilation**: Confirm compilation completes without errors
2. **CSS diff check**: Confirm only selector names changed in compiled CSS, and property values remain unchanged
3. **HTML grep**: Confirm old class names no longer exist in HTML
4. **JS grep**: Confirm old class names no longer exist in JS
5. **Browser check**: Confirm appearance is unchanged on main pages (top, storedetail, medical, protein)
