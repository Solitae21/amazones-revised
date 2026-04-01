# Step 7b: Deletion of Unused Utility Classes -- Execution Plan

## Overview

- **Purpose**: Delete utility classes unused in HTML/JS from SCSS to resolve CSS bloat
- **Basis**: Coding guideline "Utility should be minimal: only highly versatile ones"
- **Prerequisite**: Step 7a completed (all utilities have `u-` prefix applied)

## Investigation Results Summary

| Item | Count |
|------|------|
| Total defined classes | 1,589 |
| **Used classes** | **97** |
| **Unused (deletion targets)** | **1,492** |
| Usage rate | 6.1% |
| Target SCSS file count | 8 |
| Files with no changes needed | 1 (`_global-responsive.scss`) |
| Current global.css size | 181KB / 11,229 lines |

## Investigation Method

Used classes were extracted using 3 independent methods, confirming **all 3 methods produced the same 97 items**.

| Method | Overview | Result |
|------|------|------|
| Method A: grep `\b` | Grep all HTML/JS with `\b` boundary | 97 items |
| Method B: class attribute decomposition | Split HTML `class="..."` by whitespace, extract u-* | 97 items |
| Method C: Python regex | Extraction that handles class attributes spanning newlines | 97 items |

Additional verification:
- `@extend` / `@include` / `@mixin` cross-references within SCSS -> **none**
- `u-*` references in `_global-responsive.scss` -> 4 items (all already in used list)
- `u-*` references in JS file classList operations -> **none** (`u-btn` etc. are ID substrings, false positives)
- Spot checks for partial matches (`u-fs-10` vs `u-fs-100`, `u-mt-5` vs `u-mt-50`, `u-lh-15` vs `u-lh-150`) -> **all accurate**

## Duplicate Definition Cleanup

The following 4 classes are defined in both `_responsive.scss` and `_global-responsive.scss`.
Deleting the `_responsive.scss` side still leaves the `_global-responsive.scss` side, so **CSS output does not change**.

| Class | `_responsive.scss` | `_global-responsive.scss` | Approach |
|--------|-------|-------|------|
| `u-lg-block` | L3 (inside `@media max-width:1024px`) | L91 | Delete _responsive side. _global-responsive side remains |
| `u-md-block` | L943 (inside `@media max-width:768px`) | L16, L95 | Same |
| `u-display-sp` | L2847 (outside media query) | L85 | Same |
| `u-display-desk` | L2850 (outside media query) | L88 | Same |

## Non-Utility Code in `_responsive.scss`

`_responsive.scss` contains code other than utility class definitions.
These **must not be deleted**.

| Line | Content | Approach |
|----|------|------|
| L1917-1920 | `#about-three-vehicles-section .u-img-wrapper img { ... }` | **Keep** (project style inside `@media max-width:768px` block) |
| L2820-2824 | `* { box-sizing: border-box; margin: 0; padding: 0; }` | **Keep** (reset CSS) |
| L2826-2830 | `body, html { margin: 0 !important; padding: 0 !important; }` | **Keep** |
| L2832-2834 | `html { overflow-x: hidden; }` | **Keep** |
| L2836-2838 | `body { overflow-x: clip; }` | **Keep** |
| L2840-2842 | `html { scroll-behavior: smooth; }` | **Keep** |
| L2844-2846 | `a { text-decoration: none; }` | **Keep** |
| L2854-2856 | Comment `/* END GENERAL UTILITIES */` | **Keep** |

> **Note**: The reset CSS at L2820-2846 should properly belong in `foundation/_reset.scss`, but moving it risks affecting appearance, so **it will not be moved in Step 7b and remains in its current location**.

## File-by-File Delete/Keep List

---

### 1. `_color.scss` (total: 18, keep: 13, delete: 5)

**Keep (KEEP)** -- 13 items:

| Class | Files Used In |
|--------|--------------|
| `u-bg-brown` | 1 |
| `u-bg-gray` | 2 |
| `u-bg-lightBlue` | 1 |
| `u-bg-peach` | 1 |
| `u-bg-red` | 1 |
| `u-bg-white` | 5 |
| `u-text-black1` | 23 |
| `u-text-brown` | 1 |
| `u-text-lightBlue` | 23 |
| `u-text-lightPink` | 1 |
| `u-text-peach` | 1 |
| `u-text-red` | 5 |
| `u-text-white` | 23 |

**Delete (DELETE)** -- 5 items:
`u-bg-base-black1`(L4-6), `u-bg-grayBlue`(L16-18), `u-bg-lightGray`(L10-12), `u-bg-linearLightGray`(L13-15), `u-text-underline`(L56-58)

---

### 2. `_column.scss` (total: 15, keep: 1, delete: 14)

**Keep (KEEP)** -- 1 item:

| Class | Files Used In |
|--------|--------------|
| `u-w-full` | 6 |

**Delete (DELETE)** -- 14 items:
`u-col-auto`(L1-3), `u-col-1` through `u-col-12`(L4-39, 12 items), `u-w-fit-content`(L45-47)
Comment block (L48-52) also deleted

---

### 3. `_display.scss` (total: 8, keep: 3, delete: 5)

**Keep (KEEP)** -- 3 items:

| Class | Files Used In |
|--------|--------------|
| `u-block` | 2 |
| `u-flex` | 5 |
| `u-grid` | 1 |

**Delete (DELETE)** -- 5 items:
`u-hidden`(L23-25), `u-inline`(L8-10), `u-inline-block`(L5-7), `u-inline-flex`(L14-16), `u-inline-grid`(L20-22)

---

### 4. `_font-size.scss` (total: 88, keep: 37, delete: 51)

**Keep (KEEP)** -- 37 items:

| Category | Classes (files used in) |
|---------|--------|
| font-size (21 items) | `u-fs-12`(23), `u-fs-13`(23), `u-fs-14`(23), `u-fs-15`(23), `u-fs-16`(23), `u-fs-18`(23), `u-fs-19`(1), `u-fs-20`(3), `u-fs-24`(15), `u-fs-25`(2), `u-fs-30`(4), `u-fs-32`(5), `u-fs-36`(14), `u-fs-39`(5), `u-fs-46`(1), `u-fs-48`(1), `u-fs-54`(1), `u-fs-60`(8), `u-fs-70`(1), `u-fs-100`(10), `u-fs-320`(2) |
| font-weight (6 items) | `u-fw-300`(13), `u-fw-400`(23), `u-fw-500`(23), `u-fw-600`(10), `u-fw-700`(23), `u-fw-800`(1) |
| line-height (8 items) | `u-lh-100`(4), `u-lh-140`(1), `u-lh-150`(6), `u-lh-160`(1), `u-lh-180`(23), `u-lh-200`(14), `u-lh-210`(7), `u-lh-normal`(10) |
| letter-spacing (2 items) | `u-ls-10`(5), `u-ls-20`(2) |

**Delete (DELETE)** -- 51 items:

| Category | Classes |
|---------|--------|
| font-size (18 items) | `u-fs-8`, `u-fs-10`, `u-fs-11`, `u-fs-17`, `u-fs-22`, `u-fs-23`, `u-fs-26`, `u-fs-27`, `u-fs-28`, `u-fs-35`, `u-fs-38`, `u-fs-40`, `u-fs-44`, `u-fs-50`, `u-fs-52`, `u-fs-56`, `u-fs-64`, `u-fs-66`, `u-fs-68`, `u-fs-74`, `u-fs-120` |
| font-weight (3 items) | `u-fw-100`, `u-fw-200`, `u-fw-900` |
| line-height (15 items) | `u-lh-5`, `u-lh-10`, `u-lh-15`, `u-lh-20`, `u-lh-25`, `u-lh-30`, `u-lh-40`, `u-lh-50`, `u-lh-75`, `u-lh-120`, `u-lh-130`, `u-lh-170`, `u-lh-190`, `u-lh-14px`, `u-lh-64px` |
| letter-spacing (12 items) | `u-ls-3`, `u-ls-4`, `u-ls-5`, `u-ls-6`, `u-ls-7`, `u-ls-8`, `u-ls-9`, `u-ls-15`, `u-ls-25`, `u-ls-30`, `u-ls-40`, `u-ls-50` |

---

### 5. `_layout.scss` (total: 191, keep: 8, delete: 183)

**Keep (KEEP)** -- 8 items:

| Class | Files Used In |
|--------|--------------|
| `u-absolute` | 1 |
| `u-flex-1` | 2 |
| `u-flex-col` | 2 |
| `u-grid-cols-3` | 1 |
| `u-relative` | 23 |
| `u-text-center` | 23 |
| `u-text-right` | 23 |
| `u-z-10` | 2 |

**Delete (DELETE)** -- 183 items:
- position (3): `u-static`, `u-fixed`, `u-sticky`
- top/right/bottom/left (6): `u-top-0`, `u-right-0`, `u-bottom-0`, `u-left-0`, `u-top-1/2`, `u-left-1/2`
- transform (4): `u-translate-x-1/2`, `u-translate-y-1/2`, `u--translate-x-1/2`, `u--translate-y-1/2`
- border-radius (5): `u-radius-4`, `u-radius-24`, `u-radius-50`, `u-radius-99`, `u-radius-100`
- z-index (5): `u-z-0`, `u-z-20`, `u-z-30`, `u-z-40`, `u-z-50`
- overflow (3): `u-overflow-hidden`, `u-overflow-auto`, `u-overflow-scroll`
- flex-direction (3): `u-flex-row`, `u-flex-row-reverse`, `u-flex-col-reverse`
- flex-wrap (3): `u-flex-wrap`, `u-flex-nowrap`, `u-flex-wrap-reverse`
- align-items (5): `u-items-start`, `u-items-center`, `u-items-end`, `u-items-stretch`, `u-items-baseline`
- justify-content (6): `u-justify-start`, `u-justify-center`, `u-justify-end`, `u-justify-between`, `u-justify-around`, `u-justify-evenly`
- align-content (6): `u-content-center`, `u-content-start`, `u-content-end`, `u-content-between`, `u-content-around`, `u-content-evenly`
- align-self (5): `u-self-auto`, `u-self-start`, `u-self-center`, `u-self-end`, `u-self-stretch`
- flex grow (3): `u-flex-auto`, `u-flex-initial`, `u-flex-none`
- gap (108): `u-gap-0` through `u-gap-8`(rem), `u-gap-1px` through `u-gap-100px`, `u-gap-150px`
- grid-cols (6): `u-grid-cols-1`, `u-grid-cols-2`, `u-grid-cols-4`, `u-grid-cols-5`, `u-grid-cols-6`, `u-grid-cols-12`
- grid-rows (4): `u-grid-rows-1` through `u-grid-rows-4`
- place (2): `u-place-items-center`, `u-place-content-center`
- text-align (2): `u-text-left`, `u-text-justify`
- vertical-align (4): `u-align-top`, `u-align-middle`, `u-align-bottom`, `u-align-baseline`

---

### 6. `_space.scss` (total: 402, keep: 20, delete: 382)

**Keep (KEEP)** -- 20 items:

| Class | Files Used In |
|--------|--------------|
| `u-mb-10` | 1 |
| `u-ml-4` | 5 |
| `u-ml-20` | 1 |
| `u-ml-40` | 1 |
| `u-ml-auto` | 1 |
| `u-mr-5` | 23 |
| `u-mr-10` | 1 |
| `u-mr-auto` | 1 |
| `u-mt-5` | 1 |
| `u-mt-10` | 2 |
| `u-mt-18` | 8 |
| `u-mt-20` | 8 |
| `u-mt-25` | 1 |
| `u-mt-30` | 3 |
| `u-mt-40` | 4 |
| `u-mt-50` | 2 |
| `u-mt-60` | 2 |
| `u-mx-auto` | 8 |
| `u-my-15` | 1 |
| `u-py-100` | 2 |

**Delete (DELETE)** -- 382 items:
- All `u-p-*` (34 items)
- All `u-pt-*` (34 items)
- All `u-pr-*` (30 items)
- All `u-pb-*` (35 items)
- All `u-pl-*` (28 items)
- All `u-px-*` (18 items)
- `u-py-*` except `u-py-100` (17 items)
- All `u-m-*` (32 items)
- `u-mt-*` except KEEP items (28 items)
- `u-mr-*` except KEEP items (30 items)
- `u-mb-*` except `u-mb-10` (31 items)
- `u-ml-*` except KEEP items (28 items)
- `u-mx-*` except `u-mx-auto` (10 items)
- `u-my-*` except `u-my-15` (10 items)
- All `u-cg-*` (20 items)

---

### 7. `_typography.scss` (total: 7, keep: 5, delete: 2)

**Keep (KEEP)** -- 5 items:

| Class | Files Used In |
|--------|--------------|
| `u-cursor-pointer` | 23 |
| `u-font-outfit` | 23 |
| `u-font-zen` | 23 |
| `u-text-blue-hover` | 5 |
| `u-text-link` | 3 |

* `u-text-blue-hover` has 2 rules: `.u-text-blue-hover:hover` + `.u-text-blue-hover:hover ~ .img-blue` -- both kept
* `.c-btn` (L18-22) is a component class mixed in -- not touched in Step 7b (kept)

**Delete (DELETE)** -- 2 items:
`u-text-italic`(L11-13), `u-text-decoration-none`(L14-16)

---

### 8. `_responsive.scss` (total: 860 utility + non-utility, keep: 10 utility + non-utility, delete: 850 utility)

**File structure:**

| Line Range | Content | Approach |
|--------|------|------|
| L1 | Comment | Keep |
| L2-907 | `@media (max-width: 1024px)` -- lg series 285 items | Delete all utilities -> **delete entire media query** |
| L909-1921 | `@media (max-width: 768px)` -- md series | Delete md utilities. **Non-utility rule at L1917-1920 is kept** |
| L1923-1925 | `.u-sm-block { display: none }` | Keep |
| L1927-2818 | `@media (max-width: 767px)` -- sm series | Delete sm utilities. **`u-sm-py-50` is kept** |
| L2820-2846 | **Reset CSS (non-utility)** | **Never delete** |
| L2847-2852 | `u-display-sp`, `u-display-desk` | Keep |
| L2854-2856 | Comment | Keep |

**Keep (KEEP)** -- 10 utility items + non-utility code:

| Class/Code | Line | Reason |
|-------|-----|------|
| `u-display-sp` | L2847-2849 | Used in 7 HTML files |
| `u-display-desk` | L2850-2852 | Used in 5 HTML files |
| `u-md-block` | L943 | Used in 6 HTML files (* also has duplicate definition in `_global-responsive.scss`) |
| `u-md-fs-16` | Within md block | Used in 1 HTML file |
| `u-md-fs-20` | Within md block | Used in 1 HTML file |
| `u-md-fs-50` | Within md block | Used in 1 HTML file |
| `u-md-mt-20` | Within md block | Used in 1 HTML file |
| `u-md-mt-70` | Within md block | Used in 1 HTML file |
| `u-sm-block` | L1923-1925 + L1928-1930 | Used in 6 HTML files |
| `u-sm-py-50` | Within sm block | Used in 1 HTML file |
| `u-img-wrapper` reference | L1917-1920 | Non-utility (`#about-three-vehicles-section .u-img-wrapper img`). **Do not delete** |
| Reset CSS | L2820-2846 | `*`, `body`, `html`, `a` resets. **Do not delete** |
| Comment | L2854-2856 | Keep |

**Duplicate definition notes:**

`u-lg-block`(L3), `u-md-block`(L943), `u-display-sp`(L2847), `u-display-desk`(L2850) also have definitions in `_global-responsive.scss`. Deleting the `_responsive.scss` side leaves the `_global-responsive.scss` side, so CSS output doesn't change. However, for `u-md-block`, the `_responsive.scss` side definition's media query condition needs verification.

Verification result:
- `_responsive.scss` L943: Inside `@media (max-width: 768px)` -> `display: block`
- `_global-responsive.scss` L16: Inside `@media (max-width: 1024px)` -> `display: block`
- `_global-responsive.scss` L95: Inside `@media (max-width: 767px)` -> `display: none`

-> **Breakpoints differ (768px vs 1024px).** Deleting the `_responsive.scss` side may change behavior between 768px-1024px, so **erring on the safe side, `u-md-block` (L943) in `_responsive.scss` is also kept.**

**Delete (DELETE)** -- 850 items: All lg series, md series except KEEP items above, sm series except KEEP items above

---

### 9. `_global-responsive.scss` (no changes needed)

Defines `u-md-block`(L16, L95), `u-display-sp`(L85), `u-display-desk`(L88), `u-lg-block`(L91).
All are in use, so no changes.

---

## Exclusion Conditions

1. Classes **used in 1+ locations in HTML/JS** are kept
2. **`@extend` references within SCSS** -> investigated, none found
3. **Definitions in `_global-responsive.scss`** -> no changes needed
4. **`.c-btn` (`_typography.scss` L18-22)** -> component class mixed in, outside Step 7b scope
5. **Reset CSS (`_responsive.scss` L2820-2846)** -> non-utility code, deletion prohibited
6. **`#about-three-vehicles-section .u-img-wrapper img` (`_responsive.scss` L1917-1920)** -> non-utility rule, deletion prohibited
7. **Duplicate definitions with different breakpoints** (`u-md-block`) -> erring on the safe side, both kept

## Work Order

SCSS only (no HTML/JS changes):

1. `_color.scss` -- delete 5 items
2. `_column.scss` -- delete 14 items (keep only `u-w-full`)
3. `_display.scss` -- delete 5 items
4. `_font-size.scss` -- delete 51 items
5. `_layout.scss` -- delete 183 items
6. `_space.scss` -- delete 382 items
7. `_typography.scss` -- delete 2 items (keep `.c-btn`)
8. `_responsive.scss` -- delete 850 items (**keep non-utility code L1917-1920, L2820-2856**)
9. SCSS compilation: `npx sass assets/scss/global.scss assets/css/global.css --no-source-map`
10. Residual check: Grep CSS for 10 sample deleted classes, confirm they do not exist
11. Residual check: Grep CSS for all 97 KEEP classes, confirm they exist
12. Request browser verification

## Risk Assessment

| Risk | Rating | Reason |
|--------|------|------|
| Appearance breakage | **Very low** | Only deleting classes not referenced in HTML/JS. Verified by 3 methods |
| Accidental deletion of non-utility code | **None** | Non-utility code in `_responsive.scss` (reset CSS, #about rule) clearly identified and excluded |
| Duplicate definition inconsistency | **None** | `u-md-block` kept on safe side due to possible breakpoint discrepancy |
| Compilation errors | **None** | Only simple class definition deletions. No variable or mixin dependencies |

## Expected Results

- **CSS line count**: ~11,229 lines -> estimated ~5,500 lines (~50% reduction)
- **CSS size**: ~181KB -> estimated ~90KB (~50% reduction)
- **Step 7c work target**: 1,589 classes -> 97 classes (major reduction)
