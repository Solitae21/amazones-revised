# Step 8: PC/SP Dual-Source Unification -- Execution Plan

Created: 2026-04-01
Status: **Approved (Phase 6 excluded, Phases 1-5 implemented)**

---

## Purpose

Unify code that duplicates HTML structure for PC and SP versions and toggles with `display` into a single source, using CSS media queries for responsive behavior.

### Benefits

- Elimination of HTML duplication (improved maintainability, prevention of missed updates when content changes)
- Bandwidth reduction (especially eliminating double video loading: sportip page)
- DOM weight reduction

---

## Full Survey Results

After surveying all 23 HTML files + all SCSS, the following **5 categories, 17 patterns** of PC/SP duplication were identified.

### Category Overview

| Category | Pattern Count | Target File Count | Unification Difficulty |
|---------|-----------|-------------|---------|
| A. c-shop section | 3 | 2 | Medium |
| B. Text placement toggle (u-display-desk/sp) | 6 | 6 | **Low** |
| C. Price page title-row / speak-image | 5 | 2 | Low to Medium |
| D. Page-specific components | 5 | 5 | Medium to **High** |
| E. News banner (index.html) | 1 | 1 | **High** |

---

## Category A: c-shop Section (index.html, about/index.html)

Noted in client feedback. Breakpoint is **1250px**.

### A-1. c-shop__header--desk / c-shop__header--sp

**Target files & line numbers:**

| File | PC Lines | SP Lines |
|---------|------|------|
| `index.html` | 1058-1068 | 1071-1081 |
| `about/index.html` | 600-618 | 624-636 |

**PC version structure:**
```html
<div class="c-shop__header--desk">
  <img icon_amazones_shop.svg>
  <div class="c-shop__header--desk__inner">
    <div class="c-shop__header--desk__text">
      <p>Women's exclusive 24-hour gym locations nationwide</p>
      <p>All locations available for cross-use</p>
    </div>
    <img icon_amazones_no1.svg>
  </div>
</div>
```

**SP version structure:**
```html
<div class="c-shop__header--sp">
  <div class="c-shop__header--sp__row" style="gap: 5px">
    <p>Women's exclusive 24-hour gym locations nationwide</p>
    <img icon_amazones_no1.svg>
  </div>
  <div class="c-shop__header--sp__row" style="gap: 10px">
    <img icon_amazones_shop.svg>
    <p>All locations available for cross-use</p>
  </div>
</div>
```

**Diff analysis:**
- Text and images are identical
- PC: Single horizontal row (icon + 2 text lines + No1 icon)
- SP: 2 rows (row 1: text + No1 icon, row 2: shop icon + text)
- **Element order differs** (PC has shop icon first, SP has it in row 2)
- Inline styles (`gap: 5px`, `gap: 10px`) exist in SP version

**Unification approach:**
```html
<!-- After unification -->
<div class="c-shop__header">
  <div class="c-shop__header__row1">
    <img icon_amazones_shop.svg class="c-shop__label-icon">
    <p>Women's exclusive 24-hour gym locations nationwide</p>
    <img icon_amazones_no1.svg class="c-shop__no1-icon">
  </div>
  <p class="c-shop__header__interuse">All locations available for cross-use</p>
</div>
```
- PC: flexbox horizontal display (gap: 20px), `c-shop__header__interuse` placed within text column
- SP: flex-direction: column, `order` property to adjust element ordering
- Move inline styles to SCSS

**Unification difficulty: Medium** -- Element order differs, requiring `order` and flex layout redesign

**Risk:**
- PC version icon/text positioning may shift slightly
- Moving inline style gap values to SCSS requires attention to unintended layout changes

---

### A-2. c-shop__map-box / c-shop__map-box--sp

**Target files & line numbers:**

| File | PC Lines | SP Lines |
|---------|------|------|
| `index.html` | 1107-1114 | 1083-1090 |
| `about/index.html` | 680-692 | 648-663 |

**Diff analysis:**
- Content completely identical (map image + "30 locations" text)
- PC: `position: absolute; top: 100px; right: 150px;` positioned at section top-right
- SP: `display: none` -> `display: block` below 1250px, inline flow placement
- SP version has additional `text-nowrap` class (not in PC version)

**Unification approach:**
- Single source (current SP version position = inside items-wrapper)
- PC: `position: absolute` + coordinates to pull up to section top-right
- SP: `position: static` for in-flow placement
- Apply `text-nowrap` to PC version as well (no display impact)

**Unification difficulty: Medium** -- absolute <-> static switching is a proven pattern

**Risk:**
- DOM position change may alter the absolute reference point for PC version
- Map position adjustments needed at multiple breakpoints (1250px, 1000px, 900px, 570px, 500px)

---

### A-3. c-shop__sticker-desk / c-shop__sticker-sp

**Target files & line numbers:**

| File | PC Lines | SP Lines |
|---------|------|------|
| `index.html` | 1137-1156 | 1117-1135 |
| `about/index.html` | 742-778 | 694-740 |

**Diff analysis:**
- Same images (sticker1, sticker2, speechBubble1, speechBubble2, ribbon)
- PC: Fixed size (`height="410px" width="149px"`, etc.), absolute positioning
- SP: Auto size (`height="auto" width="104px"`, etc.), relative positioning
- Ribbon: PC `c-shop__ribbon--desk`, SP `c-shop__ribbon--sp` (same SVG, not different images)
- Class names completely different (`sticker-desk__figure1` vs `sticker-sp__figure1`)

**Unification approach:**
```html
<!-- After unification -->
<aside class="c-shop__sticker c-shop__sticker-container u-relative">
  <div class="c-grow-wrapper-right c-shop__ribbon">
    <div class="c-clip-grow-right"><img ribbon.svg></div>
  </div>
  <figure class="c-shop__sticker__figure1">
    <img sticker1.webp>
    <img speechBubble1.svg class="c-shop__sticker__bubble1 c-speech-bubble">
  </figure>
  <figure class="c-shop__sticker__figure2">
    <img sticker2.webp>
    <img speechBubble2.svg class="c-shop__sticker__bubble2 c-speech-bubble">
  </figure>
</aside>
```
- PC: Absolute positioning + fixed sizes -> toggle via media query
- SP: Relative positioning + auto width -> apply at `@media (max-width: 1250px)`
- Remove `width` / `height` attributes, control via CSS

**Unification difficulty: Medium** -- Many absolute positioning coordinate values, verification needed at each breakpoint

---

## Category B: Text Placement Toggle (u-display-desk / u-display-sp)

Text content is identical; PC version is inside parent container, SP version is outside parent container. Minor duplication.

### B-1. Voice Section Annotation

| File | PC Line | SP Line | Content |
|---------|------|------|------|
| `index.html` | 1410 | 1416 | "* Individual impressions..." |
| `member/index.html` | 388 | 394 | Same |

**Diff:** PC version inside `p-top__voice-sub-text-inner`, SP version outside. Text identical.

**Unification approach:** Keep only one `<p>`, PC uses `display: inline` / SP uses `display: block` + margin adjustment for placement.

**Unification difficulty: Low**

---

### B-2. Column Section Description

| File | PC Line | SP Line | Content |
|---------|------|------|------|
| `index.html` | 1696 | 1699 | "Delivering columns about dieting and training." |
| `column/index.html` | 391 | 396 | Same |
| `storelist/[slag]/index.html` | 3356 | 3362 | Same |

**Diff:** PC version inside `c-column__sub-text__inner`, SP version outside with `u-mt-20`. Text identical.

**Unification approach:** Same as B-1. Keep one `<p>`, CSS adjustment.

**Unification difficulty: Low**

---

### B-3. Shop List Subtext

| File | PC Line | SP Line |
|---------|------|------|
| `index.html` | 1049 | 1044 |
| `about/index.html` | 587 | 578 |

**Diff:** PC version inside `c-shop__sub-text` (`position: absolute; top: 170px; left: 760px`), SP version inside `hgroup`. Text identical (2 empty `<p>` tags).

**Note:** Text is empty so effectively no display impact. However, unification is performed since content may be added in the future.

**Unification approach:** Single source at SP position (inside hgroup). PC uses `position: absolute` to move to the right side.

**Unification difficulty: Low to Medium** -- absolute positioning adjustment needed

---

### B-4. About Page Pricing Plan Description

| File | PC Line | SP Line |
|---------|------|------|
| `about/index.html` | 910 (inside desk) | 915 |

**Diff:** PC version inside `c-price-plan__sub-text__inner`, SP version outside. Text identical.

**Unification approach:** Same pattern as B-1.

**Unification difficulty: Low**

---

### B-5. SP-only Line Break `<br class="u-display-sp">`

| File | Line | Content |
|---------|---|------|
| `index.html` | 1784 | Line break in footer banner heading |
| `member/index.html` | 960 | Inside footer banner |
| `admission/index.html` | 760 | Inside footer banner |
| `family/index.html` | 927 | Inside footer banner |
| `about/index.html` | 1073 | Inside footer banner |

**Determination: Out of scope (maintain as-is)**

Reason: `<br class="u-display-sp">` is self-contained in one element and is not a dual-source issue. It is a legitimate responsive technique to insert line breaks only on SP.

---

### B-6. Movie Stickers (index.html)

| File | PC Lines | SP Lines |
|---------|------|------|
| `index.html` | 1659-1666 | 1670-1678 |

**Diff:**
- Same images (speech_bubble, sticker1, sticker2)
- PC: Normal flow, fixed sizes (`height="380px" width="165px"`, etc.)
- SP: `u-display-sp` + separate container, ribbon SVG added, auto sizes (`width="130px"`, etc.)
- SP version adds ribbon image `icon_movie_ribbon-sp.svg`

**Unification approach:**
- Single source, ribbon shown only on SP via `display: block`
- Image sizes controlled via CSS

**Unification difficulty: Medium** -- SP version has additional ribbon element

---

## Category C: Price Page title-row / speak-image

### C-1. p-price__title-row--desktop / --mobile

**Target files & line numbers:**

| File | Section | PC Line | SP Line |
|---------|-----------|------|------|
| `price/index.html` | Monthly Plan | 450 | 465 |
| `price/index.html` | Special Plan | 562 | 577 |
| `price/index.html` | Initial Cost | 1143 | 1177 |
| `price/index.html` | Option | 1213 | 1228 |
| `storelist/[slag]/index.html` | Monthly Plan | 1893 | 1908 |
| `storelist/[slag]/index.html` | Special Plan | 2006 | 2023 |
| `storelist/[slag]/index.html` | Initial Cost | 2590 | 2624 |
| `storelist/[slag]/index.html` | Option | 2660 | 2675 |

**Diff:** Text and images completely identical. PC has `c-section__header-row` wrapper (horizontal layout), SP has no wrapper (vertical stack).

**Unification approach:**
```html
<div class="p-price__title-row">
  <div class="p-price__title-container c-reveal">...</div>
  <div class="u-font-zen u-fw-500 u-lh-200 c-reveal--scale">...</div>
</div>
```
- `.p-price__title-row`: PC `display: flex; flex-direction: row;`, SP `flex-direction: column;`
- Wrapper `c-section__header-row` becomes unnecessary

**Note:** SP version's Initial Cost / Option are missing `c-reveal--scale` class (possibly a bug). Apply from PC version during unification.

**Unification difficulty: Low** -- safest pattern. 8 locations total.

---

### C-2. p-price__speak-image--desktop / --mobile

| File | PC Line | SP Line |
|---------|------|------|
| `price/index.html` | 539-552 | 525-536 |
| `storelist/[slag]/index.html` | ~1983 | ~1968 |

**Diff:** Same 2 images. PC has `u-flex-1` and placed **after** text. SP placed **before** text.

**Unification approach:**
- Place at SP position (before text) in DOM
- PC uses CSS `order: 1` to move after text

**Unification difficulty: Medium** -- achievable with CSS order

---

### C-3. p-price__people-image / p-price__people-image-mobile

| File | PC Line | SP Line |
|---------|------|------|
| `price/index.html` | 1158-1174 | 1121-1137 |
| `storelist/[slag]/index.html` | ~2568 | Within same section |

**Diff:** Same 3 images (personJump01-03). PC nested inside title-row. SP placed at **upper outer** side of title-row.

**Unification approach:**
- Place outside title-row, PC uses `position: absolute` or CSS Grid to appear inside title-row
- Or place inside title-row, SP uses `order: -1` to move to top

**Unification difficulty: Medium to High** -- moving between different parent containers

---

## Category D: Page-Specific Components

### D-1. p-sportip__phone--desktop / --mobile

| File | PC Line | SP Line |
|---------|------|------|
| `sportip/index.html` | 870-883 | 803-816 |

**Diff:** Same video + same image. PC has `c-reveal` animation and placed after text. SP placed before text. **Bandwidth issue with video loaded twice.**

**Unification approach:**
- Single source (at SP position), CSS `order` to move after text on PC
- Apply `c-reveal` universally (no issues on SP)

**Unification difficulty: Medium** -- same pattern as C-2

---

### D-2. p-medical__online-consult-heading--lg / --sp

| File | PC Line | SP Line |
|---------|------|------|
| `medical/index.html` | 625-631 | 633-644 |

**Diff:**
- PC: 1 badge ("No app needed, easy to complete on smartphone")
- SP: 2 badges ("No app needed, on smartphone" + "Easy to complete")
- Text line break position differs

**Unification approach:**
```html
<div class="p-medical__online-consult-heading c-reveal">
  <div class="c-badge-white">
    <p>No app needed, on smartphone<br class="u-display-sp">Easy to complete</p>
  </div>
</div>
```
- SP `<br>` controls line break position
- Unify to 1 badge

**Determination: Needs verification** -- SP display may differ between badge 2-piece split and `<br>` line break. If current SP design has spacing between badges, this method cannot reproduce it.

**Unification difficulty: Medium**

**Risk:** If SP badge design differs between single-badge line break and two-badge side-by-side, **this becomes an exclusion target**

---

### D-3. p-payment__speak-mobile vs speak-container--02/03

| File | PC Lines | SP Lines |
|---------|------|------|
| `payment/index.html` | 858-887 | 832-857 |

**Diff:**
- Same images (bubble02/person02, bubble03/person03)
- PC: Each person in independent `position: absolute` containers with free placement
- SP: 2 people grouped in a `flex` container side by side
- **Class names completely different** (PC: `--02`/`--03` numbered, SP: `mobile` suffix)

**Unification approach considerations:**
- PC version uses absolute positioning to float people at arbitrary screen positions
- SP version is normal flow with horizontal layout
- Unification requires rewriting PC layout to flex + order based
- Many absolute coordinate values exist, reproduction is difficult

**Determination: Excluded (not unified)**

**Exclusion reasons:**
1. PC and SP layout strategies are fundamentally different (absolute free placement vs flex grouping)
2. CSS rewrite scope is large, high risk of breaking appearance
3. Based on the "err on the safe side" principle, maintain current state

---

### D-4. p-reservation-speak__mobile-row vs speak-container--04/05

| File | PC Lines | SP Lines |
|---------|------|------|
| `reservation/index.html` | 909-929 | 931-947 |
| `storelist/[slag]/index.html` | Corresponding location | 8211-8217 |

**Diff:** Same pattern as D-3. PC: individual absolute containers. SP: grouped row.

**Determination: Excluded (not unified)** -- same reasons as D-3

---

### D-5. Content Duplication via u-md-block / u-sm-block

| File | PC Line | SP Line | Content |
|---------|------|------|------|
| `protein/index.html` | 608 | 582 | Opening image |
| `protein/index.html` | 927 | 907 | speak person02 |
| `point_redemption/index.html` | 412 | 393 | Content image |
| `family/index.html` | 382 | 364 | Family image |
| `personal/index.html` | 470 | 478 | Topic subtitle (section1) |
| `personal/index.html` | 585 | 593 | Topic subtitle (section2) |
| `storelist/[slag]/index.html` | 1800 | 1808 | Plan description |
| `storelist/[slag]/index.html` | 3190 | 3200 | "Why we're chosen" description |
| `medical/index.html` | 898 | 904 | Sub body text |

**Diff:** All identical content. PC is inside parent container with text/image horizontal layout, SP is outside parent container (or at different position).

**Unification approach:** For each location, use CSS `order` + flex-direction switching, or Grid layout for single-source.

**Unification difficulty: Medium** -- need to check parent container relationship for each location. 9 locations.

---

## Category E: News Banner (index.html)

### E-1. p-top__news-banner-desk / p-top__news-banner-sp

| File | PC Lines | SP Lines |
|---------|------|------|
| `index.html` | 639-666 | 668-696 |

**Diff:**
- Text: Mostly identical, but SP version body text is truncated (ends at "naturally continues", PC version goes to "training habits will be established.")
- Heading: SP version has `<br>` ("A continuable healthy and<br>beautiful body")
- Sticker images: Same images but **different sizes** (PC: width=210/139/274/205, SP: width=138/88/161/123)
- Ribbon SVGs: **Different files** (PC: `bg_news_banner_ribbon-desk.svg` / `bg_news_banner_ribbon-desk2.svg`, SP: `bg_news_banner_ribbon.svg` / `bg_news_banner_ribbon2.svg`)
- SP version has additional classes: `p-top__news-banner-context--sp`, `p-top__news-banner-heading--sp`, `p-top__news-banner-last-text`
- SP version's 30min label has additional classes `min-30 p-top__news-30min-label-img`
- Class names differ significantly (`sticker1` vs `sticker1-sp`, `news-ribbon-desk` vs `news-ribbon-sp`)
- Breakpoint: 1090px

**Determination: Excluded (not unified)**

**Exclusion reasons:**
1. Text content partially differs (SP version has shortened body text)
2. Ribbon images are different files (different SVGs for PC and SP)
3. Sticker size differences are large, CSS control alone cannot reproduce
4. Class name and structural differences are large, CSS rewrite scope for unification is very large
5. Highest risk location for appearance breakage

---

## Implementation / Exclusion Summary

### Implementation Targets (11 patterns, Phases 1-5)

| # | Pattern | Target Files | Difficulty | Phase |
|---|---------|------------|------|-------|
| A-1 | c-shop__header unification | index.html, about/index.html | Medium | 3 |
| A-2 | c-shop__map-box unification | index.html, about/index.html | Medium | 3 |
| A-3 | c-shop__sticker unification | index.html, about/index.html | Medium | 3 |
| B-1 | Voice annotation | index.html, member/index.html | Low | 1 |
| B-2 | Column description | index.html, column/index.html, storelist/[slag]/index.html | Low | 1 |
| B-3 | Shop List subtext | index.html, about/index.html | Low to Medium | 3 |
| B-4 | about pricing plan description | about/index.html | Low | 1 |
| B-6 | Movie stickers | index.html | Medium | 4 |
| C-1 | price title-row (x8 locations) | price/index.html, storelist/[slag]/index.html | Low | 2 |
| C-2 | price speak-image | price/index.html, storelist/[slag]/index.html | Medium | 4 |
| D-1 | sportip phone video | sportip/index.html | Medium | 4 |
| D-5 | u-md/sm-block duplication (x9 locations) | 9 files | Medium | 5 |

### Exclusion Targets (6 patterns)

| # | Pattern | Exclusion Reason |
|---|---------|---------|
| B-5 | `<br class="u-display-sp">` | Not a dual-source issue (legitimate technique using single element) |
| C-3 | price people-image | Different parent containers, high unification difficulty (medium to high risk) |
| D-2 | medical badge split | 1-badge line break vs 2-badge side-by-side may look different. Excluded on safe side after verification needed |
| D-3 | payment speak-mobile | PC uses absolute free placement, fundamentally different layout strategy |
| D-4 | reservation speak-mobile | Same reason as D-3 |
| E-1 | News banner | Text differences, different image files, structural differences too large |

---

## Implementation Order

Considering dependencies and safety, implement in the following order.

### Phase 1: Low Risk (Text Placement Toggle)

**B-1, B-2, B-4** -- Only placement differences of identical text. Completed with CSS adjustment.

Work procedure:
1. Delete SP version `<p>`
2. Remove `u-display-desk` from PC version `<p>`
3. Add media query to `_global-responsive.scss` (SP margin/placement changes)
4. SCSS compile -> browser check (PC + SP)

### Phase 2: Low Risk (price title-row Unification)

**C-1** -- 8 locations of identical pattern. Wrapper removal only.

Work procedure:
1. Keep PC version (`--desktop`) HTML content, unify outer wrapper to `p-price__title-row`
2. Delete SP version (`--mobile`) HTML
3. Add responsive rules for `.p-price__title-row` to `_price.scss`
4. Add `c-reveal--scale` missing from SP version (bug fix)
5. SCSS compile -> browser check

### Phase 3: Medium Risk (c-shop Section)

**A-1, A-2, A-3, B-3** -- Client feedback item. Handle as one section.

Work procedure:
1. Unify c-shop section in `index.html`
2. Rewrite c-shop related rules in `_global-responsive.scss`
3. SCSS compile -> browser check on both PC/SP
4. If no issues, apply to `about/index.html` as well

### Phase 4: Medium Risk (order-based Unification)

**C-2, D-1, B-6** -- Absorb DOM position differences with CSS `order`.

Work procedure:
1. Delete SP version HTML for each location
2. Add unified classes to remaining HTML
3. Add media query + `order` rules to each page's SCSS
4. SCSS compile -> browser check

### Phase 5: Medium Risk (u-md/sm-block Unification)

**D-5** -- Handle 9 locations individually.

Work procedure:
1. Check flex/grid structure of parent container for each location
2. Delete SP version HTML
3. Add CSS `order` + media query to PC version
4. SCSS compile -> browser check per page

### ~~Phase 6: Excluded~~

**C-3 (people-image)** -- Different parent containers, high unification difficulty, excluded.

---

## Affected File List

### HTML (modification targets)

| File | Modification Count |
|---------|-----------|
| `index.html` | 8 |
| `about/index.html` | 5 |
| `price/index.html` | 6 |
| `storelist/[slag]/index.html` | 8 |
| `member/index.html` | 1 |
| `column/index.html` | 1 |
| `sportip/index.html` | 1 |
| `protein/index.html` | 2 |
| `point_redemption/index.html` | 1 |
| `family/index.html` | 1 |
| `personal/index.html` | 2 |
| `medical/index.html` | 1 |

### SCSS (modification targets)

| File | Modification Content |
|---------|---------|
| `_global-responsive.scss` | c-shop related rule rewrite, text placement rule additions |
| `object/project/_top.scss` | Movie sticker unification |
| `object/project/_price.scss` | title-row / speak-image unification |
| `object/project/_sportip.scss` | phone unification |
| `object/project/_protein.scss` | image / speak unification |
| `object/project/_personal.scss` | topic subtitle unification |
| `object/project/_storedetail.scss` | title-row / speak unification (storelist) |
| `object/project/_medical.scss` | (no modifications if excluded) |
| `object/project/_payment.scss` | (no modifications, excluded) |
| `object/project/_reservation.scss` | (no modifications, excluded) |

### Classes to Delete (no longer needed after unification)

```
c-shop__header--desk, c-shop__header--desk__inner, c-shop__header--desk__text
c-shop__header--sp, c-shop__header--sp__row
c-shop__map-box--sp
c-shop__sticker-desk, c-shop__sticker-desk__figure1/2, c-shop__sticker-desk__bubble1/2
c-shop__sticker-sp, c-shop__sticker-sp__figure1/2, c-shop__sticker-sp__bubble1/2
c-shop__ribbon--desk, c-shop__ribbon--sp
p-price__title-row--desktop, p-price__title-row--mobile
p-price__speak-image--desktop, p-price__speak-image--mobile
p-sportip__phone--desktop, p-sportip__phone--mobile
p-top__movie-sticker-container-sp, p-top__movie-ribbon-sp
```

---

## Risk Assessment

| Risk | Impact | Countermeasure |
|-------|-------|------|
| PC layout breakage (especially absolute positioning areas) | High | Browser check per Phase. c-shop verified at all breakpoints: 1250px/1000px/900px/767px/570px/500px |
| SP layout breakage (flex order switching) | Medium | Check across viewports from iPhone SE to iPad |
| Inline style migration omissions | Medium | Extract all `style=""` from HTML via grep, confirm migrated to SCSS |
| c-reveal animation loss | Low | Maintain PC version animation classes during unification |
| storelist/[slag]/index.html dynamic portions | Medium | Check for store-specific data before modifications |

---

## Verification Checklist

Perform after each Phase completion:

- [ ] `npx sass assets/scss/global.scss assets/css/global.css --no-source-map` succeeds
- [ ] Each page-specific SCSS compilation succeeds
- [ ] PC display (1920px, 1440px) layout unchanged
- [ ] Tablet display (1250px, 1024px) layout unchanged
- [ ] SP display (767px, 375px) layout unchanged
- [ ] Grep for old class names, confirm no residuals in HTML/SCSS
- [ ] `u-display-desk` / `u-display-sp` usage count has decreased

---

## Notes

- D-2 (medical badge split) is excluded, but can be addressed upon user request after verification
- E-1 (news banner) has too large structural differences for this step. Recommended to unify alongside a future redesign in consultation with the designer
- D-3/D-4 (payment/reservation speak) are similarly recommended for unification alongside a design renewal
