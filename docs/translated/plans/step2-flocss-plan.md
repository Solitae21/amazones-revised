# Step 2 Execution Plan: Separation into FLOCSS Directory Structure

Created: 2026-03-29
Related to: `css-refactoring-plan.md` Step 2
Based on: `cording-guideline.md`

---

## Purpose

Separate the massive 10,720-line `_global.scss` into a FLOCSS directory structure to improve maintainability.
Existing page-specific SCSS files (`_top.scss`, `_about.scss`, etc.) will be moved to `object/project/`.

---

## Most Important Principle (Restated)

**Do not change the frontend display results at all.**
Only perform file separation and `style.scss` import order changes; do not add, delete, or modify any CSS rules.

---

## Prerequisites

- Step 1 (variable definition setup) is completed
- Additional color variables and font size variables are defined in `:root` (_global.scss lines 1-81)

---

## Current State Analysis

### Current Directory Structure

```
assets/scss/
  style.scss              (34 lines - main imports)
  _global.scss            (10,720 lines - variables, utilities, components, responsive all mixed)
  _top.scss               (1,286 lines)
  _about.scss             (271 lines)
  _admission.scss         (456 lines)
  _column.scss            (37 lines)
  _column-slag.scss       (346 lines)
  _contact.scss           (408 lines)
  _family.scss            (313 lines)
  _faq.scss               (146 lines)
  _information.scss       (14 lines)
  _medical.scss           (1,242 lines)
  _member.scss            (172 lines)
  _payment.scss           (556 lines)
  _personal.scss          (760 lines)
  _point_redemption.scss  (485 lines)
  _price.scss             (681 lines)
  _protein.scss           (1,149 lines)
  _reservation.scss       (1,001 lines)
  _rules.scss             (50 lines)
  _sitemap.scss           (244 lines)
  _sportip.scss           (801 lines)
  _storedetail.scss       (2,028 lines)
  _storedetail-introduction.scss (11,330 lines)
  _storedetail-review.scss (empty file)
  _storelist.scss         (437 lines)
  _visitor.scss           (578 lines)
```

### `_global.scss` Section Structure (Measured Values)

| Line Range | Section | Destination |
|--------|-----------|--------|
| 1-4 | Google Fonts import + comments | `foundation/_variables.scss` |
| 5-81 | `:root` variable definitions (colors, font sizes, fonts) | `foundation/_variables.scss` |
| 82-113 | html/body/main reset, basic typography | `foundation/_reset.scss` |
| 114-5337 | Utility class groups (up to END GENERAL UTILITIES) | `object/utility/` various files |
| 5338-5471 | BUTTONS | `object/component/_btn.scss` |
| 5472-5601 | HOVER / SCROLL ANIMATIONS | `object/component/_animation.scss` |
| 5603-5661 | SPEECH BUBBLE AND STICKER | `object/component/_speech-bubble.scss` |
| 5663-5694 | RIBBONS | `object/component/_ribbon.scss` |
| 5696-5732 | MAXWIDTH AND BREADCRUMBS | `layout/_container.scss` |
| 5734-5797 | TEXT SLIDER | `object/component/_slider.scss` |
| 5799-6062 | CARDS SLIDER | Merged into `object/component/_slider.scss` |
| 6064-6242 | RECRUIT BANNER | `object/component/_banner.scss` |
| 6244-6249 | STICKER BANNER (empty section) | Merged into `object/component/_banner.scss` |
| 6250-6478 | banner-section, ribbon-banner, p-banner, etc. | Merged into `object/component/_banner.scss` |
| 6479-6506 | SECTION HEADER TEXT | `object/component/_section.scss` |
| 6507-7042 | HEADER CSS GLOBAL | `layout/_header.scss` |
| 7043-7509 | FOOTER SECTION (floating-menu, nav-menu-popup, footer) | `layout/_footer.scss` |
| 7510-7742 | FOOTER BANNER W/ SPEECH BUBBLES | `object/component/_footer-banner.scss` |
| 7743-8206 | HERO ANIMATION | `object/component/_hero.scss` |
| 8207-8296 | ANNOUNCEMENT SECTION | `object/component/_announcement.scss` |
| 8297-8300 | END ANNOUNCEMENT (comments only) | Not needed |
| 8301-8380 | END NOTE SECTION | `object/component/_endnote.scss` |
| 8381-8388 | GLOBAL UTILITYS (empty section) | Not needed |
| 8389-8439 | Cookie notice | `object/component/_cookie.scss` |
| 8440-10720 | GLOBAL RESPONSIVE STYLES + additional utilities | Merged into respective destination files |

---

## Detailed Utility Class Split (Lines 114-5337)

| Line Range (Approx.) | Content | Destination |
|---------------|------|--------|
| 114-230 | COLOR UTILITIES (bg-*, text-* color classes) | `object/utility/_color.scss` |
| 231-340 | Font family, letter spacing, text alignment | `object/utility/_typography.scss` |
| 341-500 | Display classes (block, flex, hidden, display-sp, etc.) | `object/utility/_display.scss` |
| 501-837 | Position, overflow, cursor, box-sizing, etc. | `object/utility/_layout.scss` |
| 838-1600 | FONT SIZE, FONT WEIGHT, LINE HEIGHT, LETTER SPACING | Merged into `object/utility/_typography.scss` |
| 1601-2400 | WIDTH, HEIGHT, MARGIN, PADDING | `object/utility/_space.scss` |
| 2401-3200 | grid, flex-row, items-center, gap, etc. | Merged into `object/utility/_layout.scss` |
| 3201-4200 | radius, z-index, border, etc. | `object/utility/_border.scss` |
| 4201-5100 | Responsive utilities (lg-*, sm-*) | Merged into respective utility files |
| 5101-5337 | col-*, display-sp/desk, other remaining | `object/utility/_layout.scss` / `_display.scss` |

**Note**: The line ranges above are approximate. During actual work, use section comments as landmarks to split at exact boundaries.

---

## Handling of Responsive Section (Lines 8440-10720)

### Approach

Responsive styles will be **merged into the target component's file**.

Example: Header responsive styles -> moved to the end of `layout/_header.scss`

### Detailed Mapping

Read through the responsive section content, determine which component each rule within media queries belongs to, and move accordingly.
This section will be sorted one block at a time during actual work.

**Principle**: Base styles and responsive styles for the same component should be in the same file.

---

## Directories and Files to Create

### New Directories

```
assets/scss/
  foundation/
  layout/
  object/
    component/
    project/
    utility/
```

### New File List

#### foundation/

| File | Content | Source Line Range |
|---------|------|---------|
| `_variables.scss` | Google Fonts import + `:root` variable definitions | 1-81 |
| `_reset.scss` | html/body/main reset, basic typography | 82-113 |

#### layout/

| File | Content | Source Line Range |
|---------|------|---------|
| `_container.scss` | `.c-maxWidth`, `.c-breadcrumb`, etc. | 5696-5732 |
| `_header.scss` | `.l-header`, `.header-btn`, floating menu, hamburger, etc. | 6507-7042 |
| `_footer.scss` | floating-menu, nav-menu-popup, footer, etc. | 7043-7509 |

#### object/component/

| File | Content | Source Line Range |
|---------|------|---------|
| `_btn.scss` | `.header-btn:hover`, `.btn-light-blue`, etc. | 5338-5471 |
| `_animation.scss` | `.reveal`, `.c-animation-jump`, hover animations | 5472-5601 |
| `_speech-bubble.scss` | `.speech-bubble`, swing/jump keyframes | 5603-5661 |
| `_ribbon.scss` | `.hero-ribbon`, clipRevealRight | 5663-5694 |
| `_slider.scss` | text-slider + cards-slider (topic-container, etc.) | 5734-6062 |
| `_banner.scss` | recruit-banner, sticker-banner, p-banner, ribbon-banner, etc. | 6064-6478 |
| `_section.scss` | `.section-header-wrapper`, `.section-header-text`, etc. | 6479-6506 |
| `_footer-banner.scss` | `.c-footer-banner` entirety | 7510-7742 |
| `_hero.scss` | `.c-hero-slider`, `.c-hero-animate`, hero animations | 7743-8206 |
| `_announcement.scss` | `.c-announcement_*` styles | 8207-8296 |
| `_endnote.scss` | `.c-endNote_*` styles | 8301-8380 |
| `_cookie.scss` | `.cookie-notice` related | 8389-8439 |

#### object/project/

Existing page-specific files moved (no content changes):

| Source | Destination |
|--------|--------|
| `_top.scss` | `object/project/_top.scss` |
| `_about.scss` | `object/project/_about.scss` |
| `_admission.scss` | `object/project/_admission.scss` |
| `_column.scss` | `object/project/_column.scss` |
| `_column-slag.scss` | `object/project/_column-slag.scss` |
| `_contact.scss` | `object/project/_contact.scss` |
| `_family.scss` | `object/project/_family.scss` |
| `_faq.scss` | `object/project/_faq.scss` |
| `_information.scss` | `object/project/_information.scss` |
| `_medical.scss` | `object/project/_medical.scss` |
| `_member.scss` | `object/project/_member.scss` |
| `_payment.scss` | `object/project/_payment.scss` |
| `_personal.scss` | `object/project/_personal.scss` |
| `_point_redemption.scss` | `object/project/_point_redemption.scss` |
| `_price.scss` | `object/project/_price.scss` |
| `_protein.scss` | `object/project/_protein.scss` |
| `_reservation.scss` | `object/project/_reservation.scss` |
| `_rules.scss` | `object/project/_rules.scss` |
| `_sitemap.scss` | `object/project/_sitemap.scss` |
| `_sportip.scss` | `object/project/_sportip.scss` |
| `_storedetail.scss` | `object/project/_storedetail.scss` |
| `_storedetail-introduction.scss` | `object/project/_storedetail-introduction.scss` |
| `_storedetail-review.scss` | `object/project/_storedetail-review.scss` |
| `_storelist.scss` | `object/project/_storelist.scss` |
| `_visitor.scss` | `object/project/_visitor.scss` |

#### object/utility/

| File | Content |
|---------|------|
| `_color.scss` | `.bg-*`, `.text-*` (color classes) |
| `_display.scss` | `.block`, `.flex`, `.hidden`, `.display-sp`, `.display-desk`, etc. |
| `_typography.scss` | `.fs-*`, `.fw-*`, `.lh-*`, `.ls-*`, `.font-*`, `.text-center`, etc. |
| `_space.scss` | `.m-*`, `.mt-*`, `.p-*`, `.pt-*`, `.px-*`, `.py-*`, etc. |
| `_layout.scss` | `.flex-row`, `.items-center`, `.gap-*`, `.grid-cols-*`, `.col-*`, `.relative`, `.absolute`, etc. |
| `_border.scss` | `.radius-*`, `.z-*`, `.border-*`, etc. |

---

## Updated `style.scss` Structure

```scss
// ============================================
//  Amazones Main Stylesheet
// ============================================

// Foundation
@use "foundation/variables";
@use "foundation/reset";

// Layout
@use "layout/container";
@use "layout/header";
@use "layout/footer";

// Object - Component
@use "object/component/btn";
@use "object/component/animation";
@use "object/component/speech-bubble";
@use "object/component/ribbon";
@use "object/component/slider";
@use "object/component/banner";
@use "object/component/section";
@use "object/component/footer-banner";
@use "object/component/hero";
@use "object/component/announcement";
@use "object/component/endnote";
@use "object/component/cookie";

// Object - Project
@use "object/project/top";
@use "object/project/about";
@use "object/project/admission";
@use "object/project/column";
@use "object/project/column-slag";
@use "object/project/contact";
@use "object/project/family";
@use "object/project/faq";
@use "object/project/information";
@use "object/project/medical";
@use "object/project/member";
@use "object/project/payment";
@use "object/project/personal";
@use "object/project/point_redemption";
@use "object/project/price";
@use "object/project/protein";
@use "object/project/reservation";
@use "object/project/rules";
@use "object/project/sitemap";
@use "object/project/sportip";
@use "object/project/storedetail";
@use "object/project/storedetail-introduction";
@use "object/project/storedetail-review";
@use "object/project/storelist";
@use "object/project/visitor";

// Object - Utility (imported last = highest specificity order)
@use "object/utility/color";
@use "object/utility/display";
@use "object/utility/typography";
@use "object/utility/space";
@use "object/utility/layout";
@use "object/utility/border";
```

### `@import` vs `@use` Decision

- In Dart Sass, `@import` is deprecated (scheduled for future removal)
- However, `_global.scss` uses `:root` variables (CSS custom properties) and does not use SCSS variables (`$var`)
- CSS custom properties have global scope, so there are no scope issues with `@use`
- **Use `@use`** (however, if existing page SCSS files rely on SCSS variables from `@import`, keep `@import`)

**Verification item**: Before actual work, check whether SCSS variables (`$`-prefixed variables) are used in all page SCSS files. If not used, fully switch to `@use`. If used, maintain `@import`.

---

## Execution Steps

### Phase A: Directory Creation (Risk: None)

1. Create `assets/scss/foundation/`
2. Create `assets/scss/layout/`
3. Create `assets/scss/object/component/`
4. Create `assets/scss/object/project/`
5. Create `assets/scss/object/utility/`

### Phase B: Move Page-Specific SCSS (Risk: Low)

1. Move existing `_top.scss` through `_visitor.scss` (25 files) to `object/project/`
2. Update import paths in `style.scss`
3. **SCSS compile -> CSS diff comparison to confirm output is identical**

### Phase C: Separate Foundation from `_global.scss` (Risk: Low)

1. Copy lines 1-81 -> `foundation/_variables.scss`
2. Copy lines 82-113 -> `foundation/_reset.scss`
3. Add imports to `style.scss`
4. Delete corresponding lines from `_global.scss`
5. **SCSS compile -> CSS diff comparison**

### Phase D: Separate Utilities from `_global.scss` (Risk: Medium)

**The utility section is the largest (~5,200 lines), and boundary judgment is most critical**

1. Use section comments as landmarks to extract each utility category
2. One category at a time:
   - Copy the relevant range to the utility file
   - Delete the relevant range from `_global.scss`
   - SCSS compile -> CSS diff comparison
3. Also merge responsive utilities (`lg-*`, `sm-*`, etc.) into the corresponding utility files

### Phase E: Separate Components from `_global.scss` (Risk: Medium)

1. Following section comment boundaries, one section at a time:
   - Copy the relevant range to the component file
   - Delete the relevant range from `_global.scss`
   - SCSS compile -> CSS diff comparison
2. Order: btn -> animation -> speech-bubble -> ribbon -> slider -> banner -> section

### Phase F: Separate Layout from `_global.scss` (Risk: Medium)

1. container (5696-5732) -> `layout/_container.scss`
2. header (6507-7042) -> `layout/_header.scss`
3. footer (7043-7509) -> `layout/_footer.scss`
4. SCSS compile -> CSS diff comparison after each move

### Phase G: Separate Remaining Sections (Risk: Medium)

1. footer-banner -> `object/component/_footer-banner.scss`
2. hero -> `object/component/_hero.scss`
3. announcement -> `object/component/_announcement.scss`
4. endnote -> `object/component/_endnote.scss`
5. cookie -> `object/component/_cookie.scss`

### Phase H: Distribute Responsive Section (Risk: High)

**The highest risk step. Rules within media queries must be correctly distributed to the right files.**

1. Read through media queries from line 8440 onward, one block at a time
2. Determine which component/layout/utility each rule belongs to
3. Move to the end of the corresponding file
4. **SCSS compile -> CSS diff comparison after each block move**

### Phase I: Delete `_global.scss` and Final Verification

1. Confirm `_global.scss` is empty (or contains only unnecessary comments)
2. Delete `_global.scss`
3. Remove `@import "global"` / `@use "global"` from `style.scss`
4. **Final SCSS compile -> CSS diff comparison for all pages**
5. Browser check main pages (top, store detail, about, medical, storelist)

---

## Risk Assessment and Countermeasures

| Risk | Impact | Countermeasure |
|--------|------|------|
| CSS specificity changes due to import order changes | Style conflicts may change appearance | Compare compiled CSS output with diff. Adjust import order if differences exist |
| Misdistribution of responsive section | Rules within media queries may be missing | Move one block at a time, compile and verify each time |
| Issues with mixing `@use` and `@import` | Errors due to Dart Sass scope differences | Pre-check all files for `$` variable usage |
| Page SCSS referencing `_global.scss` classes via SCSS (e.g., @extend) | Compilation errors | Pre-check `@extend` usage with grep |

---

## Verification Method

### Common for Each Phase

1. Compile with `npx sass assets/scss/style.scss assets/css/style.css`
2. Confirm no compilation errors
3. Compare with pre-separation CSS output using `diff` and confirm **zero differences**

### Final Verification

1. All CSS files compile successfully
2. Compiled CSS output is a perfect match with pre-separation output
3. Browser check the following pages:
   - Top page
   - Store detail page
   - About page
   - Medical page
   - Storelist page

---

## Exclusions

- No addition, deletion, or modification of CSS rules
- No class name renaming (work for Step 3 onward)
- No selector modifications (work for Steps 4-5)
- No `!important` reduction (work for Step 6)
- No utility prefix changes (work for Step 7)

---

## Pre-Work Checklist

- [ ] Check whether `$`-prefixed SCSS variables are used in all page SCSS files
- [ ] Check whether `@extend` is used across files
- [ ] Back up current `style.scss` compilation result (baseline for diff comparison)
- [ ] Verify Dart Sass version (`@use` compatible)
