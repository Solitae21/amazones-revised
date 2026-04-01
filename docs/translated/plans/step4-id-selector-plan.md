# Step 4: ID Selector -> Class Selector Replacement -- Execution Plan (Revised)

Created: 2026-03-30
Revised: 2026-03-30 (Added specificity analysis, naming conventions, verification procedures)

---

## Overview

Replace all CSS ID selector usage (`#xxx`) with class selectors.
Guideline: "IDs are only allowed for elements requiring JS manipulation" -> Keep HTML `id` attributes for JS usage, but **CSS ID selector usage is prohibited**.

---

## Target Summary

| Category | ID Count | CSS Rule Count | Approach |
|---------|:---:|:---:|------|
| A. Has JS usage + CSS usage | 5 | 24 | CSS replaced with existing class. HTML id attribute kept for JS |
| B. Anchor link + CSS usage | 6 | 1 (group) | CSS replaced with new common class. HTML id attribute kept for anchors |
| C. CSS only (not in HTML/JS) | 5 | 13 | WordPress-derived -> **no changes** |
| D. CSS only (in HTML, no JS) | 1 | 3 | CSS replaced with new FLOCSS-compliant class. HTML class added, id attribute removed |
| E. CSS + HTML changes + new class addition | 1 | 4 | CSS replaced with new FLOCSS-compliant class. HTML class added |
| **Total** | **18** | **45** | **Targets for change: 13 IDs, 32 rules** |

---

## Specificity Impact Analysis

Changing from ID selector (0,1,0,0) to class selector (0,0,1,0) significantly lowers specificity.
Through the following investigation, **all competing rules targeting the same elements have been identified for all replacement targets, confirming that specificity win/loss order does not change**.

### Reasons It Is Safe

1. **A-1, A-2 (scroll-down-text, scroll-down-mobile):** Class selectors with the same name (`.scroll-down-text`, `.scroll-down-mobile`) already exist as base styles (_header.scss lines 76, 130). ID rules and class rules **do not override the same properties** (ID rules handle position/opacity, class rules handle flex direction/gap, etc., with separation of concerns). Bulk-replacing all ID selectors with classes maintains the relative specificity hierarchy.

2. **A-3, A-4 (floating-menu-btn, header-floating-menu):** Two IDs are used simultaneously in compound selectors (`#header-floating-menu #floating-menu-btn ...`). **Both are replaced with classes simultaneously**, so the mutual specificity balance is not disrupted. No property conflicts with existing `.l-header-floating-menu__btn` (_header.scss line 70) either (existing class sets flex basics, ID rules handle display switching within media queries, with separation of concerns).

3. **A-5 (nav-menu-popup):** Only 1 rule: `#nav-menu-popup .l-footer__blue-btn`. No conflicting rules for `width: fit-content` against `.l-footer__blue-btn`.

4. **E-1 (js-slider), D-1 (videoHolder):** No CSS rules exist for target elements other than ID selectors. New classes are added, so no conflicts.

5. **B-1 (region sections):** New common class `.p-storelist__region` has no other definitions, so no conflicts.

### Caution Areas

| Location | Specificity Change | Impact | Countermeasure |
|------|-----------|------|------|
| _footer.scss lines 123-141: `.l-header-floating-menu.active #floating-menu-btn .l-header__hamburger .mh-bar:nth-child(N)` | (0,1,2,1) -> (0,0,3,1) | Other rules targeting the same `.mh-bar` (line 111: (0,2,1,0)->(0,0,3,0)) also decrease simultaneously, so **relative hierarchy is maintained** | Must replace A-3/A-4 simultaneously |
| _header.scss line 445: `.l-header-floating-menu.active #scroll-down-text` (within media query) | (0,1,1,0) -> (0,0,2,0) | Line 113 with the same selector also decreases simultaneously. Has `!important` so it wins regardless of specificity | Bulk replacement of all IDs causes no issues |

---

## A. Has JS Usage + CSS Usage (5 IDs, 24 rules)

Keep HTML `id` attributes for JS usage; use existing `class` attributes in CSS.

### A-1. `#scroll-down-text` -> `.scroll-down-text`

**File:** `assets/scss/layout/_header.scss`
**Existing HTML class:** `scroll-down-text` (class with the same name as id already exists)
**JS:** `global.js:29` -- `getElementById("scroll-down-text")` -> no change needed (id is kept)

| Line | Old Selector | New Selector |
|:---:|-----------|-----------|
| 102 | `#scroll-down-text` | `.scroll-down-text` |
| 113 | `.l-header-floating-menu.active #scroll-down-text` | `.l-header-floating-menu.active .scroll-down-text` |
| 119 | `#scroll-down-text.scrolling` | `.scroll-down-text.scrolling` |
| 445 | `.l-header-floating-menu.active #scroll-down-text` | `.l-header-floating-menu.active .scroll-down-text` |

**HTML locations (5 files):** No changes needed (already has `class="scroll-down-text"`)
- `index.html:91`
- `information/index.html:97`
- `sportip/index.html:145`
- `medical/index.html:146`
- `personal/index.html:140`

---

### A-2. `#scroll-down-mobile` -> `.scroll-down-mobile`

**File:** `assets/scss/layout/_header.scss`
**Existing HTML class:** `scroll-down-mobile` (class with the same name as id already exists)
**JS:** `global.js:41` -- `getElementById("scroll-down-mobile")` -> no change needed

| Line | Old Selector | New Selector |
|:---:|-----------|-----------|
| 137 | `#scroll-down-mobile` | `.scroll-down-mobile` |
| 141 | `#scroll-down-mobile.hidden-by-menu` | `.scroll-down-mobile.hidden-by-menu` |
| 146 | `#scroll-down-mobile` | `.scroll-down-mobile` |
| 162 | `#scroll-down-mobile p` | `.scroll-down-mobile p` |
| 168 | `#scroll-down-mobile img` | `.scroll-down-mobile img` |
| 172 | `#scroll-down-mobile.scrolling` | `.scroll-down-mobile.scrolling` |

**HTML locations (4 files):** No changes needed
- `index.html:2178`
- `sportip/index.html:1575`
- `medical/index.html:2154`
- `personal/index.html:1174`

---

### A-3. `#floating-menu-btn` + A-4. `#header-floating-menu` (Processed Simultaneously)

These two IDs co-occur in compound selectors in _footer.scss, so they **must be replaced simultaneously**.
Replacing only one would break the specificity balance.

**A-3: `#floating-menu-btn` -> `.l-header-floating-menu__btn`**
- **Existing HTML class:** `l-header-floating-menu__btn`
- **JS:** `global.js:51` -- `getElementById("floating-menu-btn")` -> no change needed

**A-4: `#header-floating-menu` -> `.l-header-floating-menu`**
- **Existing HTML class:** `l-header-floating-menu`
- **JS:** `global.js:53` -- `getElementById("header-floating-menu")` -> no change needed

| File | Line | Old Selector | New Selector |
|---------|:---:|-----------|-----------|
| _footer.scss | 91 | `#header-floating-menu #floating-menu-btn .desktop-menu-icon` | `.l-header-floating-menu .l-header-floating-menu__btn .desktop-menu-icon` |
| _footer.scss | 92 | `#header-floating-menu #floating-menu-btn > p` | `.l-header-floating-menu .l-header-floating-menu__btn > p` |
| _footer.scss | 97 | `#header-floating-menu:not(.active)` | `.l-header-floating-menu:not(.active)` |
| _footer.scss | 102 | `#header-floating-menu #floating-menu-btn .l-header__hamburger` | `.l-header-floating-menu .l-header-floating-menu__btn .l-header__hamburger` |
| _footer.scss | 111 | `#header-floating-menu #floating-menu-btn .mh-bar` | `.l-header-floating-menu .l-header-floating-menu__btn .mh-bar` |
| _footer.scss | 123-126 | `.l-header-floating-menu.active #floating-menu-btn .l-header__hamburger .mh-bar:nth-child(1)` | `.l-header-floating-menu.active .l-header-floating-menu__btn .l-header__hamburger .mh-bar:nth-child(1)` |
| _footer.scss | 129-132 | `.l-header-floating-menu.active #floating-menu-btn .l-header__hamburger .mh-bar:nth-child(2)` | `.l-header-floating-menu.active .l-header-floating-menu__btn .l-header__hamburger .mh-bar:nth-child(2)` |
| _footer.scss | 136-139 | `.l-header-floating-menu.active #floating-menu-btn .l-header__hamburger .mh-bar:nth-child(3)` | `.l-header-floating-menu.active .l-header-floating-menu__btn .l-header__hamburger .mh-bar:nth-child(3)` |
| _header.scss | 425 | `#floating-menu-btn` | `.l-header-floating-menu__btn` |
| _header.scss | 431 | `#floating-menu-btn p` | `.l-header-floating-menu__btn p` |

**HTML locations (18+ files):** No changes needed (both classes already exist)

**Selector depth note:** Some selectors remain at 4+ levels of depth after replacement (lines 123-139). This will be addressed in Step 5. Only ID replacement is performed here.

---

### A-5. `#nav-menu-popup` -> `.l-nav-menu-popup`

**File:** `assets/scss/layout/_footer.scss`
**Existing HTML class:** `l-nav-menu-popup`
**JS:** `global.js:54` -- `getElementById("nav-menu-popup")` -> no change needed

| Line | Old Selector | New Selector |
|:---:|-----------|-----------|
| 462 | `#nav-menu-popup .l-footer__blue-btn` | `.l-nav-menu-popup .l-footer__blue-btn` |

**HTML locations (18+ files):** No changes needed

---

## B. Anchor Link + CSS Usage (6 IDs, 1 Group Rule)

HTML `id` attributes are kept for anchor links (`<a href="#hokkaido-tohoku">`).

### B-1. Region Section ID Group

**File:** `assets/scss/object/project/_storelist.scss`
**HTML:** `storelist/index.html`
**Context:** Located **inside** the media query `@media screen and (max-width: 600px)` (block starting around line 348)

**Old (inside media query, 6 lines of ID + descendant selectors):**
```scss
/* Inside @media screen and (max-width: 600px) */
#hokkaido-tohoku .c-maxWidth,
#kanto .c-maxWidth,
#chubu .c-maxWidth,
#kinki .c-maxWidth,
#chugoku-shikoku .c-maxWidth,
#kyushu-okinawa .c-maxWidth {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
```

**New (replaced with common class):**
```scss
/* Inside @media screen and (max-width: 600px) */
.p-storelist__region .c-maxWidth {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
```

**HTML changes (6 locations -- `storelist/index.html`):**
| Line | Old | New |
|:---:|-----|-----|
| 347 | `<section id="hokkaido-tohoku" class="c-section--white">` | `<section id="hokkaido-tohoku" class="c-section--white p-storelist__region">` |
| 962 | `<section id="kanto" class="c-section--light-blue relative">` | `<section id="kanto" class="c-section--light-blue relative p-storelist__region">` |
| 2610 | `<section id="chubu" class="c-section--white">` | `<section id="chubu" class="c-section--white p-storelist__region">` |
| 3346 | `<section id="kinki" class="c-section--light-blue">` | `<section id="kinki" class="c-section--light-blue p-storelist__region">` |
| 5640 | `<section id="chugoku-shikoku" class="c-section--white relative">` | `<section id="chugoku-shikoku" class="c-section--white relative p-storelist__region">` |
| 6382 | `<section id="kyushu-okinawa" class="c-section--light-blue">` | `<section id="kyushu-okinawa" class="c-section--light-blue p-storelist__region">` |

---

## C. CSS Only -- WordPress-Derived (5 IDs, 13 rules) -> No Changes

These IDs do not exist in HTML/JS files. They are WordPress-derived styles within `_storedetail-introduction.scss` and `_responsive.scss`.
HTML is dynamically generated by WordPress, so changing ID selectors to classes would **prevent styles from being applied**.

### Decision: No Changes (erring on the safe side)

| File | ID | Line | Reason |
|---------|-----|:---:|------|
| _storedetail-introduction.scss | `#footer-menu-05` | 984 | WordPress dynamic generation |
| _storedetail-introduction.scss | `#footer-menu-03` | 1009 | WordPress dynamic generation |
| _storedetail-introduction.scss | `#ez-toc-container` | 7327 | WordPress Ez TOC plugin |
| _storedetail-introduction.scss | `#front-steps` | 8895-8981 | WordPress dynamic generation (10 rules) |
| _responsive.scss | `#about-three-vehicles-section` | 1917 | Not in HTML (likely WordPress-derived) |

---

## D. CSS Only -- In HTML, No JS (1 ID, 3 rules)

### D-1. `#videoHolder` -> `.p-top__video-holder`

**File:** `assets/scss/object/project/_top.scss`
**HTML:** 2 locations in `index.html` (lines 1551, 1626)
**Existing class:** `relative` only -> add new class `.p-top__video-holder`
**JS:** No references (confirmed via grep)
**Anchor link:** `href="#videoHolder"` is not present in any HTML (confirmed via grep)
**-> id attribute is unused by both JS and anchors, so it will be removed**

| Line | Old Selector | New Selector |
|:---:|-----------|-----------|
| 1065 | `#videoHolder` | `.p-top__video-holder` |
| 1171 | `#videoHolder` | `.p-top__video-holder` |
| 1182 | `#videoHolder .mt-40` | `.p-top__video-holder .mt-40` |

**HTML changes:**
- `index.html:1551` -- `<div id="videoHolder" class="relative">` -> `<div class="relative p-top__video-holder">`
- `index.html:1626` -- same as above

---

## E. CSS + HTML Changes + New Class Addition (1 ID, 4 rules)

### E-1. `#js-slider` -> `.p-storedetail__slider`

**File:** `assets/scss/object/project/_storedetail.scss`
**Existing HTML class:** `swiper`, `lg:w-2/3` (no styling-purpose class)
**JS:** `storedetail.js:20` -- `getElementById("js-slider")` -> no change needed (id is kept)

**Naming:** The `js-` prefix is for JS hooks, and using it for CSS styling violates naming conventions.
Use FLOCSS-compliant `.p-storedetail__slider`.

| Line | Old Selector | New Selector |
|:---:|-----------|-----------|
| 858 | `#js-slider` | `.p-storedetail__slider` |
| 867 | `#js-slider:not(.swiper-initialized) .swiper-slide:not(:first-child)` | `.p-storedetail__slider:not(.swiper-initialized) .swiper-slide:not(:first-child)` |
| 871 | `#js-slider .swiper-slide img` | `.p-storedetail__slider .swiper-slide img` |
| 1853 | `#js-slider` | `.p-storedetail__slider` |

**HTML changes:**
- `storelist/[slag]/index.html:1061` -- `<div class="lg:w-2/3 swiper" id="js-slider">` -> `<div class="lg:w-2/3 swiper p-storedetail__slider" id="js-slider">`

---

## Processing Order

To avoid partial matches, replace in the following order:

1. **`#header-floating-menu` + `#floating-menu-btn`** (_footer.scss -- many compound selectors, **must be processed simultaneously**)
2. **`#floating-menu-btn`** (_header.scss -- standalone usage)
3. **`#scroll-down-text`** (_header.scss -- all 4 locations at once)
4. **`#scroll-down-mobile`** (_header.scss -- all 6 locations at once)
5. **`#nav-menu-popup`** (_footer.scss)
6. **`#js-slider`** -> `.p-storedetail__slider` (_storedetail.scss + HTML class addition)
7. **`#videoHolder`** -> `.p-top__video-holder` (_top.scss + HTML id removal & class addition)
8. **Region section ID group** (_storelist.scss + HTML class addition)

---

## Verification Procedure

### Checks After Each Replacement

1. **Residual check:** Grep SCSS for old ID selectors -> confirm none remain (excluding the 5 excluded IDs)
2. **SCSS compilation (all targets):**
   ```bash
   npx sass assets/scss/global.scss assets/css/global.css --no-source-map
   npx sass assets/scss/object/project/_top.scss assets/css/top.css --no-source-map
   npx sass assets/scss/object/project/_storedetail.scss assets/css/storedetail.css --no-source-map
   npx sass assets/scss/object/project/_storelist.scss assets/css/storelist.css --no-source-map
   ```
3. **Compilation error check:** Confirm exit code is 0 for above commands
4. **Browser check:** Confirm appearance is unchanged on the following pages:
   - `index.html` -- Header (floating menu, scroll down), video section
   - `storelist/index.html` -- Region section padding
   - `storelist/[slag]/index.html` -- Photo gallery slider

### Final Check

5. **Full ID selector residual check:**
   ```bash
   grep -rn '#[a-zA-Z]' assets/scss/ --include='*.scss' | grep -v '//' | grep -v 'color\|background\|border\|shadow\|gradient\|url\|font\|rgba\|var('
   ```
   -> Confirm no ID selectors exist other than the 5 excluded IDs

---

## Risk Assessment

| Risk | Impact | Countermeasure |
|--------|:---:|------|
| Other rules winning due to specificity decrease | **Low** (investigated) | Competing rules for all targets pre-investigated. Bulk replacement of all ID selectors targeting the same elements maintains relative hierarchy |
| Replacing A-3/A-4 separately breaking specificity balance | **High** | **Must replace simultaneously** (explicitly stated in processing order) |
| Style breakdown from changing WordPress-derived IDs | **High** | **No changes** (all 5 IDs in Category C excluded) |
| Breaking JS getElementById | **Avoided** | HTML id attributes kept at all JS usage locations |
| Breaking anchor links | **Avoided** | HTML id attributes kept at all anchor link usage locations |
| Missing HTML class additions | Medium | Full grep verification before and after replacement |
| `.js-slider` naming convention violation | **Avoided** | Changed to `.p-storedetail__slider` (FLOCSS compliant) |

---

## Changed File List

### SCSS (5 files)
- `assets/scss/layout/_header.scss` -- 10 locations (#scroll-down-text x4, #scroll-down-mobile x6)
- `assets/scss/layout/_footer.scss` -- 10 locations (#header-floating-menu + #floating-menu-btn x9, #nav-menu-popup x1)
- `assets/scss/object/project/_storedetail.scss` -- 4 locations (#js-slider)
- `assets/scss/object/project/_top.scss` -- 3 locations (#videoHolder)
- `assets/scss/object/project/_storelist.scss` -- 1 location (6-line group selector -> consolidated to 1 line)

### HTML (3 files)
- `storelist/[slag]/index.html` -- 1 location (class `p-storedetail__slider` added)
- `index.html` -- 2 locations (id `videoHolder` removed + class `p-top__video-holder` added)
- `storelist/index.html` -- 6 locations (class `p-storelist__region` added)

### CSS (auto-updated by compilation, 4 files)
- `assets/css/global.css`
- `assets/css/top.css`
- `assets/css/storedetail.css`
- `assets/css/storelist.css`

### Unchanged Files
- JS files -- all remain using `getElementById` (id attributes are kept)
- `_storedetail-introduction.scss` -- WordPress-derived IDs (5) excluded
- `_responsive.scss` -- `#about-three-vehicles-section` excluded
