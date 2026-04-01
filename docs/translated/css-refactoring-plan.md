# CSS Large-Scale Refactoring Plan

Created: 2026-03-29
Target: All CSS/SCSS/HTML files of the Amazones branding site
Reference: `cording-guideline.md`

---

## Core Principle (Reiterated)

**The frontend display must not change at all.**
All refactoring is "internal structure improvement" and must not affect the visual output in the browser.

---

## Current Issues Summary

| # | Guideline Item | Violation Scale |
|---|---------|---------|
| 1 | FLOCSS structure | SCSS is completely flat. `_global.scss` has 10,673 lines with everything mixed together |
| 2 | BEM notation / FLOCSS prefixes | An estimated 750+ classes lack prefixes. Approximately 80 cases use `_` instead of BEM `__` |
| 3 | Selector depth: 2 levels max | 69 locations exceed 4 levels (deepest: 7 levels) |
| 4 | ID selectors prohibited | 15 IDs used across 46 selector rules |
| 5 | Minimize `!important` usage | 190 occurrences across all SCSS (global.scss has the most at 81) |
| 6 | Variables for colors & font sizes | 32 hardcoded colors, zero font-size variables |

---

## Refactoring Order

Considering dependencies, the following order will be used.
Infrastructure (variables, structure) is set up first, then selectors and naming are corrected.

```
Step 1: Variable definitions (colors & font sizes)
  ↓
Step 2: FLOCSS directory structure separation
  ↓
Step 3: BEM notation & FLOCSS prefix corrections
  ↓
Step 4: ID selectors → class selectors replacement
  ↓
Step 5: Selector depth correction (2 levels max)
  ↓
Step 6: !important reduction
  ↓
Step 7: Utility class prefix unification
  ↓
Step 8: PC/SP dual-source unification (HTML structure improvement)
```

---

## Step 1: Variable Definition Setup

### 1-1. Color Variable Setup

**Current state**: 12 colors defined in `:root`. 32 hardcoded locations.

**Tasks**:
- Add variables for undefined colors (add to `:root`)
  - `#faf8f5` → `--base-bgBeige` (body background)
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
  - Other colors used in gradients that are not yet variables
- Replace hardcoded values where existing variables exist with `var()`
  - `#4f4f4f` → `var(--text-black1)` / `var(--base-black)`
  - `#f53662` → `var(--text-red)` / `var(--base-red)`
  - `#81d8d0` → `var(--base-lightBlue)`
  - `#ffffff` → `var(--base-white)` (inline values in properties)
  - `#ec73b2` → `var(--base-peach)`
  - `#8c4239` → `var(--base-brown)`

**Target files**: `_global.scss`, `_top.scss`, `_medical.scss`, `_about.scss`, and other page SCSS files with hardcoded values

### 1-2. Font Size Variable Setup

**Current state**: Zero font-size variables. 63+ hardcoded locations within components.

**Tasks**:
- Identify all font sizes in use and define them as variables in `:root`

```scss
:root {
  /* Font sizes */
  --fs-xs: 0.75rem;   /* 12px */
  --fs-sm: 0.875rem;  /* 14px */
  --fs-base: 1rem;    /* 16px */
  --fs-md: 1.125rem;  /* 18px */
  --fs-lg: 1.25rem;   /* 20px */
  --fs-xl: 1.5rem;    /* 24px */
  --fs-2xl: 1.875rem; /* 30px */
  --fs-3xl: 2.25rem;  /* 36px */
  --fs-4xl: 2.5rem;   /* 40px */
  /* ... add as needed */
}
```

- Keep existing `.fs-*` utility class definitions as-is (they may optionally reference variables internally)
- Replace hardcoded `font-size` values in component/layout files with `var()`

**Note**: Utility class definitions like `.fs-14` are "utility value definitions" and are not themselves targets for variable conversion. The issue is hardcoded values within component and layout files.

---

## Step 2: FLOCSS Directory Structure Separation

### 2-1. Directory Creation

```
assets/scss/
  foundation/
    _variables.scss      ← :root variable definitions (content from Step 1)
    _reset.scss          ← html/body reset
    _base.scss           ← Base typography
  layout/
    _header.scss         ← .l-header related (move global.scss lines 6461-6994)
    _footer.scss         ← .l-footer related (move global.scss lines 6997-7694)
    _container.scss      ← .l-container, .c-maxWidth, etc.
  object/
    component/
      _btn.scss          ← .c-btn related (global.scss line 143+, lines 5287-5423)
      _card.scss         ← .c-card related
      _form.scss         ← .c-form related
      _animation.scss    ← .c-reveal, .c-animation-jump, etc.
      _breadcrumb.scss   ← Breadcrumbs
      _speech-bubble.scss
      _slider.scss       ← Shared slider styles
      _section.scss      ← .c-section, .c-announcement, .c-endNote, etc.
      _cookie.scss       ← .c-cookie-notice
    project/
      _top.scss          ← Move existing _top.scss
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
      _color.scss        ← .u-bg-*, .u-text-*, etc.
      _display.scss      ← .u-block, .u-flex, .u-hidden, etc.
      _typography.scss   ← .u-fs-*, .u-fw-*, .u-lh-*, .u-ls-*, etc.
      _space.scss        ← .u-m-*, .u-p-*, .u-mt-*, .u-pt-*, etc.
      _layout.scss       ← .u-flex-row, .u-items-center, .u-gap-*, etc.
      _border.scss       ← .u-radius-*, .u-z-*, etc.
      _jsutil.scss       ← CSS overrides for JS plugins
  plugins/
    _swiper.scss         ← Swiper customization, etc.
  style.scss             ← Main import file (update)
```

### 2-2. Decomposition of `_global.scss`

Separate `_global.scss` (10,673 lines) into the files listed above.

| Line Range (approx.) | Destination | Content |
|---|---|---|
| 1-5 | `foundation/_variables.scss` | Font imports |
| 6-34 | `foundation/_variables.scss` | `:root` variable definitions |
| 36-66 | `foundation/_reset.scss` | html/body reset |
| 67-5280 | `object/utility/` files | Utility class groups |
| 5281-5284 | `object/utility/_display.scss` | `.display-sp`, `.display-desk` |
| 5287-5423 | `object/component/_btn.scss` | Button component |
| 5426-5612 | `object/component/_animation.scss` | Animations |
| 5559-5622 | `object/component/_speech-bubble.scss` | Speech bubbles |
| 5626-5750 | `object/component/_slider.scss` | Shared slider |
| 5753-6432 | `object/component/` files | Other components |
| 6433-6460 | `object/component/_section.scss` | Section header |
| 6461-6994 | `layout/_header.scss` | Header |
| 6997-7694 | `layout/_footer.scss` | Footer |
| 7695-8162 | `object/component/` | Banner, clip, etc. |
| 8163-8342 | `object/component/_section.scss` | Announcement, end note |
| 8343-8400 | `object/component/_cookie.scss` | Cookie notice |
| 8401-10673 | Responsive → integrate into respective destination files | Media queries |

### 2-3. Update `style.scss`

```scss
// ============================================
//  Amazones Main Stylesheet
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
// ... each page

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

## Step 3: BEM Notation & FLOCSS Prefix Corrections

### 3-1. BEM Delimiter Correction (`_` → `__` / `--`)

**Target**: Approximately 80 classes

| Current | Corrected | File |
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
| `.p-protein_campaign_block` | `.p-protein__campaign-block` | protein, etc. |
| ... approximately 50 more | ... | various files |

**Procedure**: For each class, search all references across SCSS → CSS → HTML → JS, and replace in bulk.

### 3-2. Adding `l-` Prefix to Layout Classes

**Target**: Approximately 50 classes in `global.scss`

| Current | Corrected |
|------|--------|
| `.header-btn` | `.l-header__btn` |
| `.header-btn--reservation` | `.l-header__btn--reservation` |
| `.header-floating-menu` | `.l-header-floating-menu` |
| `.floating-menu-btn` | `.l-header-floating-menu__btn` |
| `.floating-menu-content` | `.l-header-floating-menu__content` |
| `.mobile-header-overlay` | `.l-mobile-header-overlay` |
| `.sp-nav-header` | `.l-sp-nav__header` |
| `.sp-nav-*` (13 types) | `.l-sp-nav__*` |
| `.mobile-hamburger` | `.l-header__hamburger` |
| `.sp-header-btn` | `.l-header__sp-btn` |
| `.nav-menu-popup` | `.l-nav-menu-popup` |
| `.footer-main-container` | `.l-footer__main-container` |
| `.footer-top` | `.l-footer__top` |
| `.footer-brand` | `.l-footer__brand` |
| `.footer-brand-logo` | `.l-footer__brand-logo` |
| `.footer-cta-links` | `.l-footer__cta-links` |
| `.footer-nav-*` (6 types) | `.l-footer__nav-*` |
| `.footer-icon-link` | `.l-footer__icon-link` |
| `.footer-bottom` | `.l-footer__bottom` |
| `.footer-legal-links` | `.l-footer__legal-links` |
| `.footer-blue-btn` | `.l-footer__blue-btn` |
| `.scroll-up` | `.l-scroll-up` |

### 3-3. Adding `c-` Prefix to Component Classes

**Target**: Approximately 100 classes in `global.scss` and page-specific SCSS files

| Current | Corrected |
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
| ... others | ... |

### 3-4. Adding `p-` Prefix to Project Classes

**Target**: Unprefixed page-specific classes in `top.css`, etc.

| Current (top.css) | Corrected |
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
| ... others | ... |

Similarly correct unprefixed classes in `storedetail.css`, `storedetail-introduction.css`, etc.

---

## Step 4: ID Selectors → Class Selectors Replacement

**Target**: 15 IDs, 46 selector rules

### 4-1. ID Selectors in global.scss (20 rules)

| Current | Corrected | HTML Change |
|------|--------|---------|
| `#scroll-down-text` | `.js-scroll-down-text` | Change id → class, also update JS |
| `#scroll-down-mobile` | `.js-scroll-down-mobile` | Same as above |
| `#floating-menu-btn` | `.js-floating-menu-btn` | Same as above |
| `#header-floating-menu` | `.js-header-floating-menu` | Same as above |
| `#nav-menu-popup` | `.js-nav-menu-popup` | Same as above |
| `#about-three-vehicles-section` | `.p-about__three-vehicles` | Same as above |

**Note**: The guideline states "IDs are permitted only when needed for JS manipulation."
- The HTML `id` attribute may be kept for JS operations
- Only the use of IDs as CSS selectors is prohibited
- In CSS, use `.js-*` classes or existing classes

### 4-2. ID Selectors in storedetail-introduction.scss (13 rules)

| Current | Corrected |
|------|--------|
| `#footer-menu-05` | `.l-footer-menu--05` |
| `#footer-menu-03` | `.l-footer-menu--03` |
| `#ez-toc-container` | `.c-toc-container` |
| `#front-steps` | `.c-front-steps` |

### 4-3. ID Selectors in storelist.scss (6 rules)

| Current | Corrected | Notes |
|------|--------|------|
| `#hokkaido-tohoku` | `.p-storelist__region--hokkaido-tohoku` | Keep id for anchor links |
| `#kanto` | `.p-storelist__region--kanto` | Same as above |
| `#chubu` | `.p-storelist__region--chubu` | Same as above |
| `#kinki` | `.p-storelist__region--kinki` | Same as above |
| `#chugoku-shikoku` | `.p-storelist__region--chugoku-shikoku` | Same as above |
| `#kyushu-okinawa` | `.p-storelist__region--kyushu-okinawa` | Same as above |

### 4-4. Other ID Selectors

| File | Current | Corrected |
|---------|------|--------|
| storedetail.scss | `#js-slider` | `.js-slider` |
| top.scss | `#videoHolder` | `.js-video-holder` |

---

## Step 5: Selector Depth Correction (2 Levels Max)

**Target**: 69 locations (4+ levels)

### 5-1. storedetail-introduction.css (46 locations)

Most are from the old WordPress codebase. Replace with BEM classes.

Examples:
```css
/* Before (7 levels) */
.sp-navigation .menu .menu-item .sub-menu .menu-item .sub-menu .menu-item { }

/* After (2 levels) */
.l-sp-nav__sub-item { }
```

```css
/* Before (5 levels) */
.c-footer-menu #footer-menu-03 .sub-menu .sub-menu > li { }

/* After (1 level) */
.l-footer-menu__sub-item { }
```

### 5-2. Other Files (23 locations)

Examples:
```css
/* Before (4 levels) */
.news-section .panel-content:hover .news-info-container p:last-child { }

/* After (2 levels) */
.c-panel-content:hover .c-news-info__text { }
```

```css
/* Before (4 levels) */
.c-footer-banner__container a p img { }

/* After (2 levels) */
.l-footer-banner__img { }
```

**Procedure**: For each selector:
1. Identify the target element
2. Add a new BEM class (add to HTML)
3. Rewrite the CSS selector to 2 levels or fewer
4. Verify the appearance is unchanged

---

## Step 6: `!important` Reduction

**Target**: 190 occurrences

### 6-1. Reduction Strategy

- After Step 4 (ID selector removal) and Step 5 (selector depth correction) are completed, specificity conflicts will be significantly reduced
- As a result, many `!important` declarations will become unnecessary
- After Steps 4/5 are completed, re-evaluate the necessity of each `!important` case by case

### 6-2. Per-File Approach

| File | Count | Approach |
|---------|:---:|---------|
| `_global.scss` | 81 | Expected to become largely unnecessary after Steps 4/5 |
| `_storedetail-introduction.scss` | 21 | WordPress-derived. Linked to selector corrections |
| `_storedetail.scss` | 19 | Linked to selector corrections |
| `_top.scss` | 18 | Linked to selector corrections |
| `_protein.scss` | 17 | Individual review |
| Other 11 files | 34 | Individual review |

### 6-3. Acceptable `!important` Usage

- Usage within Utility classes is permitted per the guideline
- `!important` within utility classes (`.u-*`) will be kept as-is

---

## Step 7: Utility Class Prefix Unification

**Target**: 600+ classes in `global.scss`

### 7-1. Naming Conversion Rules

| Current | Corrected | Example |
|------|--------|---|
| `.bg-*` | `.u-bg-*` | `.bg-white` → `.u-bg-white` |
| `.text-*` (color) | `.u-text-*` | `.text-white` → `.u-text-white` |
| `.text-*` (alignment) | `.u-text-*` | `.text-center` → `.u-text-center` |
| `.font-*` | `.u-font-*` | `.font-outfit` → `.u-font-outfit` |
| `.fs-*` | `.u-fs-*` | `.fs-14` → `.u-fs-14` |
| `.fw-*` | `.u-fw-*` | `.fw-500` → `.u-fw-500` |
| `.lh-*` | `.u-lh-*` | `.lh-200` → `.u-lh-200` |
| `.ls-*` | `.u-ls-*` | `.ls-3` → `.u-ls-3` |
| `.block`, `.flex`, `.hidden`, etc. | `.u-block`, `.u-flex`, `.u-hidden` | |
| `.relative`, `.absolute`, etc. | `.u-relative`, `.u-absolute` | |
| `.top-0`, `.right-0`, etc. | `.u-top-0`, `.u-right-0` | |
| `.radius-*` | `.u-radius-*` | |
| `.z-*` | `.u-z-*` | |
| `.overflow-*` | `.u-overflow-*` | |
| `.flex-row`, `.items-center`, etc. | `.u-flex-row`, `.u-items-center` | |
| `.gap-*` | `.u-gap-*` | |
| `.grid-cols-*` | `.u-grid-cols-*` | |
| `.p-0` to `.p-100` (padding) | `.u-p-0` to `.u-p-100` | **Important**: Resolves collision with FLOCSS `p-` prefix |
| `.pt-*`, `.pb-*`, `.pl-*`, `.pr-*`, `.px-*`, `.py-*` | `.u-pt-*`, `.u-pb-*`, etc. | |
| `.m-*`, `.mt-*`, `.mb-*`, etc. | `.u-m-*`, `.u-mt-*`, etc. | |
| `.cg-*` | `.u-cg-*` | |
| `.col-*` | `.u-col-*` | |
| `.w-full`, `.w-fit-content` | `.u-w-full`, `.u-w-fit-content` | |
| `.cursor-pointer` | `.u-cursor-pointer` | |
| `.display-sp`, `.display-desk` | `.u-display-sp`, `.u-display-desk` | |

### 7-2. Responsive Prefixes

Responsive utilities like `lg-fs-*`, `sm-block`, etc. also exist. These will be unified as well.

| Current | Corrected |
|------|--------|
| `.lg-fs-*` | `.u-lg-fs-*` |
| `.sm-block` | `.u-sm-block` |
| `.sm-fs-*` | `.u-sm-fs-*` |

### 7-3. Impact Scope

Utility classes are heavily used in the `class` attributes across all 23 HTML files.
Replacement will be applied in bulk across SCSS + CSS + all HTML.

**Special note**: `.p-0` through `.p-100` collide with the FLOCSS `p-` (Project) prefix, so they should be changed to `.u-p-*` with the highest priority.

---

## Step 8: PC/SP Dual-Source Unification (HTML Structure Improvement)

### 8-1. c-shop Section (index.html, about/index.html)

**Current state**: HTML structure is fully duplicated for PC and SP, toggled with `display`.

```html
<!-- Current: 2 sources -->
<div class="c-shop__header--desk">...</div>
<div class="c-shop__header--sp">...</div>
<figure class="c-shop__map-box c-shop__map-box--sp">...</figure>
<figure class="c-shop__map-box">...</figure>
```

**After correction**: Single source with CSS media queries for responsive behavior.

```html
<!-- After correction: 1 source -->
<div class="c-shop__header">...</div>
<figure class="c-shop__map-box">...</figure>
```

**Procedure**:
1. Compare HTML differences between PC and SP versions
2. Identify structures that can be unified
3. Implement display switching with CSS media queries
4. Remove duplicate HTML
5. Browser verification (PC/tablet/SP)

---

## Common Work Rules

1. **Proceed one step at a time, verifying in the browser after each step**
2. **When changing class names, always search all references across SCSS → CSS → HTML → JS and replace without omissions**
3. **When in doubt, do not modify (err on the side of safety)**
4. **Handle WordPress-derived code (storedetail-introduction.css, etc.) with extra caution**
5. **Get user confirmation before starting each Step**
6. **Create a Plan before starting each Step and save it in the `plans/` directory (see below)**

---

## Step-Specific Plan Operating Rules

### Purpose

In a large-scale refactoring involving `_global.scss` with 10,673 lines, starting without prior investigation easily leads to missed or incorrect replacements.
By creating a Plan before each Step, documenting **target locations, replacement maps, exclusion conditions, and risk assessments**, we achieve:

- Prevention of missed replacements (checklists based on complete survey)
- Prevention of incorrect replacements (clear exclusion conditions)
- Prior identification and mitigation of risks to visual appearance
- Continuity of work across sessions

### Operating Rules

1. Conduct a current-state survey using the Plan agent before starting each Step
2. Save survey results as `plans/step{N}-{slug}-plan.md`
3. Plans must include specific replacement maps with file names, line numbers, old values, and new values
4. Explicitly mark high-risk locations (WordPress-derived, inside multi-value properties, inside gradients, etc.)
5. Explicitly state exclusions and non-target conditions
6. Obtain user approval before starting work based on the Plan

### Plan File List

| Step | Plan File | Status |
|------|-------------|-----------|
| Step 1 | `plans/step1-variables-plan.md` | Created |
| Step 2 | `plans/step2-flocss-plan.md` | Not started |
| Step 3 | `plans/step3-bem-plan.md` | Not started |
| Step 4 | `plans/step4-id-selector-plan.md` | Not started |
| Step 5 | `plans/step5-selector-depth-plan.md` | Not started |
| Step 6 | `plans/step6-important-plan.md` | Not started |
| Step 7 | `plans/step7-utility-prefix-plan.md` | Not started |
| Step 8 | `plans/step8-pc-sp-unify-plan.md` | Not started |

---

## Affected Files (Overview)

| Category | File Count | Content |
|---------|:---:|------|
| SCSS | 27 | All SCSS files (separation, renaming, content modification) |
| CSS | 26 | All CSS files (SCSS compilation output) |
| HTML | 23 | All HTML files (class name changes) |
| JS | 4-5 | global.js, common.js, storedetail.js, etc. (selector reference updates) |
| style.scss | 1 | Import path changes |
