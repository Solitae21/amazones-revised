# Client Feedback Survey Results

Survey date: 2026-03-28
Target: All files of the Amazones test site

---

## HTML Files

### 1. Naming Rule Breakdown (l-footer inside l-header / p-medical inside service section)

**Survey result: Issues found**

#### l-header / l-footer Structure

- No instances of `l-footer` contained within `l-header` were found.
- The header uses the structure: `<header class="I-header">` → `I-header-wrapper` → `l-header__brand` + `l-header__actions`.
- The footer exists independently as `<footer class="I-footer">`.
- However, the header class name uses `I-header` (uppercase I), which deviates from the `l-header` (lowercase L = Layout) naming convention.

#### p-medical Exists Inside the Service Section

Location: `index.html` lines 847-896

```html
<div class="service-container-sp p-medical_voice_slider_wrapper">
  <button class="p-medical_voice_nav p-medical_voice_nav--prev">
  <button class="p-medical_voice_nav p-medical_voice_nav--next">
  <div class="p-medical_voice_grid">
    <a href="personal" class="p-medical_voice_card">
    <a href="sportip" class="p-medical_voice_card">
    <a href="about" class="p-medical_voice_card">
```

- `p-medical_voice_*` classes are used within the service section of the top page.
- `p-medical` is a prefix specific to the medical page, but its use in the top page's service section constitutes a naming rule breakdown.
- Proper naming would be `c-service__card` or `p-top__service-card`.

---

### 2. Overuse of Utility Classes

**Survey result: Issues found (all 23 files affected)**

Combinations of utility classes are heavily used across all pages.

#### Examples of Frequently Used Class Combinations

| Pattern | Usage Count |
|---|---|
| `font-outfit fw-300 fs-36 text-white` | ~28 times |
| `fw-500 fs-15` | ~27 times |
| `text-white fs-16 font-outfit` | ~16 times |
| `fw-500 fs-14 news-label` | ~16 times |
| `fs-16 fw-500 font-outfit text-lightBlue` | ~16 times |

#### Specific Examples

`index.html` line 782:
```html
<h2 class="reveal section-header-text fs-100 lh-normal font-outfit text-black1 fw-400">
```

`index.html` line 797:
```html
<p class="fs-16 fw-500 lh-200 text-center">
```

#### Improvement Suggestions

Repeated combinations of the same utility classes can be consolidated into BEM-based component classes. For example:

- `fw-500 fs-15` → Consolidate into a component class like `.c-nav-link`
- `text-white fs-14 fw-700` → Consolidate into `.c-header-btn__text`, etc.

---

### 3. Code Split Into PC and SP Dual Sources

**Survey result: Issues found**

#### c-shop Section (`index.html` lines 1055-1159, `about/index.html` lines 600-645)

HTML structure is fully duplicated for PC and SP versions.

```html
<!-- PC header -->
<div class="reveal c-shop__header--desk">...</div>

<!-- SP header -->
<div class="c-shop__header--sp">...</div>

<!-- SP map box -->
<figure class="c-shop__map-box c-shop__map-box--sp">...</figure>

<!-- PC map box -->
<figure class="c-shop__map-box">...</figure>

<!-- SP sticker -->
<aside class="c-shop__sticker-sp c-shop__sticker-container relative">...</aside>

<!-- PC sticker -->
<aside class="c-shop__sticker-desk">...</aside>
```

- The same content is written in two HTML structures, with CSS `display` toggling visibility.
- Responsive behavior should ideally be controlled by CSS only; duplicating HTML structure reduces maintainability.

#### l-header__wrapper

- Currently uses a single structure with CSS media queries for responsiveness (no issues).

---

## CSS Files

### 4. File Line Counts and Bloat

**Survey result: Issues found**

#### Line Counts Per CSS File

| File Name | Lines | Notes |
|---|---|---|
| storedetail-introduction.css | 11,330 | Largest |
| global.css | 10,674 | Includes utility classes |
| storedetail.css | 2,028 | |
| top.css | 1,286 | |
| medical.css | 1,242 | |
| protein.css | 1,149 | |
| reservation.css | 1,001 | |
| sportip.css | 823 | |
| personal.css | 787 | |
| price.css | 680 | |
| visitor.css | 578 | |
| payment.css | 561 | |
| point_redemption.css | 485 | |
| admission.css | 461 | |
| storelist.css | 437 | |
| contact.css | 408 | |
| column-slag.css | 346 | |
| family.css | 313 | |
| about.css | 288 | |
| sitemap.css | 244 | |
| member.css | 172 | |
| faq.css | 145 | |
| rules.css | 50 | |
| column.css | 37 | |
| storedetail-review.css | 0 lines (no line breaks, ~19KB/1 line) | Minified state |
| information.css | 14 | |
| **Total** | **~33,500 lines** | |

- Utility classes account for approximately 2,500-3,000 lines (25-30%) of `global.css`.
- `storedetail-introduction.css` is the largest at 11,330 lines and contains many styles from the old site (WordPress).

---

### 5. Disconnect Between Utility Class Naming and Actual Role

**Survey result: Issues found**

The pattern noted by the client, such as `.p-top-hero__text .u-fs19{ font-size: 15px; }`, does not currently exist in the code. The `u-` prefixed utility classes have been replaced with shorthand utility classes like `fs-14`, `fw-500`, `text-white`.

However, a similar issue exists:
- Utility classes (`fs-14` = font-size 14px) are combined with component classes, and CSS media queries override the size.
- This can result in situations where `fs-14` does not actually produce the expected size.

---

### 6. High Selector Specificity

**Survey result: Issues found (primarily in `storedetail-introduction.css`)**

#### Examples of High-Specificity Selectors

Concentrated in `storedetail-introduction.css`:

| Line | Selector | Issue |
|---|---|---|
| 744 | `.main-navigation .navbar-nav > li > .header-nav-child` | Deep nesting + child selectors |
| 1009 | `.c-footer-menu #footer-menu-03 .sub-menu .sub-menu > li` | ID selector + deep nesting |
| 2269 | `.c-policy-content > * + h2:not([class*="mt"])` | Negation pseudo-class + attribute selector |
| 2334 | `.c-policy-content > ul > li > dl > dt` | 5-level child selectors |
| 984 | `#footer-menu-05 > li:not(:first-child)` | ID selector |

Also in `global.css`:

| Line | Selector | Issue |
|---|---|---|
| 4351 | `#about-three-vehicles-section .img-wrapper img` | ID selector + element selector |
| 7087 | `#header-floating-menu #floating-menu-btn > p` | Multiple ID selectors |
| 7118-7129 | `.header-floating-menu.active #floating-menu-btn .mobile-hamburger .mh-bar:nth-child(1)` | 4 levels + ID selector + pseudo-class |

- `!important` is used **81 times** within `global.css`.
  - Many cases use brute force to resolve specificity conflicts; fundamental improvement is needed.

---

### 7. `.wpac` / `.wp-gr` Classes (WordPress Plugin Origin)

**Survey result: Deletable locations found**

| File | Content | Verdict |
|---|---|---|
| `storedetail-review.css` | Massive reset CSS starting with `.wpac` (1 line, ~19KB) | WordPress plugin not in use; **can be deleted** |
| `storedetail.css` line 836 | `.wp-gr .wp-google-text { white-space: normal !important; }` | Plugin not in use; **can be deleted** |
| `public-main.js` (1,788 lines) | JS file referencing `.wpac` / `.wp-gr` | For WordPress Google Reviews plugin; **can be deleted** |

- There is **no usage** of `.wpac` / `.wp-gr` classes in HTML files.
- Since the current site does not use WordPress, there are no project-class overrides either, and everything can be safely deleted.

---

## JS Files

### 8. Separation Rationale for global.js and common.js

**Survey result: The separation itself has valid reasoning. However, issues exist**

#### Line Counts and Roles Per JS File

| File | Lines | Role |
|---|---|---|
| global.js | 1,088 | Global page-wide functionality (scroll control, menus, sliders, tabs, animations, etc.) |
| common.js | 100 | Reusable utility functions (`initSmoothScroll`, `initMobileCarousel`, `initModal`) |
| public-main.js | 1,788 | For Google Reviews plugin (WordPress-derived, can be deleted) |
| storedetail.js | 118 | Store detail page (smooth scroll, gallery, slider) |
| top.js | 105 | Top page (hero slider control) |
| family.js | 27 | Family page (FAQ control) |
| protein.js | 20 | Protein page (modal, carousel) |
| medical.js | 7 | Medical page |
| payment.js | 1 | Payment page (`initSmoothScroll` call only) |
| reservation.js | 1 | Reservation page (`initSmoothScroll` call only) |
| price.js | 1 | Price page (`initSmoothScroll` call only) |
| sportip.js | 1 | Sportip page (`initSmoothScroll` call only) |

#### Intent Behind the Separation

- **common.js**: Modularized reusable functions (`initSmoothScroll`, `initMobileCarousel`, `initModal`)
  - Dependencies: payment.js, reservation.js, price.js, sportip.js, medical.js, protein.js
- **global.js**: Page-wide state management and initialization (scroll monitoring, menus, animations, etc.)

The separation itself is understandable as an intent to isolate "reusable functions" from "global initialization."

#### Issues

1. **`init__tabs()` function is defined twice in global.js** (line 833: empty function / line 841: implementation)
2. **Scroll-to-top is implemented in two places**
   - global.js lines 2-7: `smoothScrollTo(0, 600)` custom function version
   - global.js lines 1087-1088: `window.scrollTo({ top: 0, behavior: "smooth" })` native version

---

### 9. Smooth Scroll Processing Scattered Across Multiple Locations

**Survey result: Issues found (3 types of implementations mixed, 12 locations total)**

| File | Line | Implementation | Target Selector |
|---|---|---|---|
| global.js | 5 | `smoothScrollTo()` custom function | `.scroll-up` |
| global.js | 32 | `smoothScrollTo()` custom function | Section auto-scroll |
| global.js | 763 | `scrollIntoView({ behavior: 'smooth' })` | All hash anchors `a[href^="#"]` |
| global.js | 905 | `container.scrollTo()` | Tab button horizontal scroll |
| global.js | 914 | `window.scrollTo()` | Scroll to tab target |
| global.js | 1088 | `window.scrollTo()` | Scroll-up button |
| common.js | 18 | `scrollIntoView({ behavior: 'smooth' })` | `initSmoothScroll()` function |
| storedetail.js | 11 | `scrollIntoView({ behavior: 'smooth' })` | `.p-storedetail_links-nav a` |
| payment.js | 1 | `initSmoothScroll()` (via common.js) | `.p-payment__links-nav a` |
| reservation.js | 1 | `initSmoothScroll()` (via common.js) | `.p-reservation-flow__nav a` |
| price.js | 1 | `initSmoothScroll()` (via common.js) | `.p-price__links-nav a` |
| sportip.js | 1 | `initSmoothScroll()` (via common.js) | `.p-sportip__links-nav a` |

#### Mixed Implementation Methods

1. **Custom function `smoothScrollTo()`** — `requestAnimationFrame`-based (global.js proprietary)
2. **`scrollIntoView({ behavior: 'smooth' })`** — Browser native (common.js / storedetail.js)
3. **`window.scrollTo({ behavior: 'smooth' })`** — Another browser native pattern (within global.js)

#### Other Duplications

**Mobile carousel duplicate implementation:**
- common.js `initMobileCarousel()` and storedetail.js standalone carousel (lines 93-118) perform nearly identical processing

**Inconsistent mobile detection breakpoints:**

| File | Breakpoint |
|---|---|
| common.js | `<= 767px` |
| family.js | `<= 767px` |
| storedetail.js | `<= 1024px` |
| global.js | `<= 1091px` |

- Four different breakpoints are defined for the same purpose of "mobile detection."

---

## Summary

| # | Issue | Status | Improvement Difficulty |
|---|---|---|---|
| 1 | Naming rule breakdown (p-medical in service) | Not improved | Medium |
| 2 | Utility class overuse | Not improved | High (all files affected) |
| 3 | PC/SP dual-source split (c-shop) | Not improved | Medium |
| 4 | CSS line count bloat (~33,500 lines total) | Not improved | High |
| 5 | Disconnect between utility class naming and role | Partially improved (u- prefix removed) | Medium |
| 6 | High selector specificity | Not improved (mainly storedetail-introduction.css) | High |
| 7 | .wpac/.wp-gr classes | Can be deleted (confirmed unused in HTML) | Low |
| 8 | global.js / common.js separation | Separation rationale exists. Duplicate definition issues | Low |
| 9 | Smooth scroll processing scattered | Not improved (3 types of implementations mixed) | Medium |
