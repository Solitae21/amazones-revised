# Step 1 Execution Plan: Variable Definition Setup (Colors & Font Sizes)

Created: 2026-03-29
Related to: `css-refactoring-plan.md` Step 1
Based on: `cording-guideline.md`

---

## Purpose

Set up CSS variables (custom properties) and replace hardcoded color codes and font sizes with `var()`.
Having variables in place before subsequent Steps 2-8 makes it easier to maintain style consistency when modifying selectors and class names.

---

## Most Important Principle (Restated)

**Do not change the frontend display results at all.**

---

## Current `:root` Variable Definitions

Defined in `_global.scss` lines 6-34:

```scss
:root {
  /* Base colors */
  --base-black: #4f4f4f;
  --base-gray: #eef0f3;
  --base-lightGray: #fdfdfd;
  --base-grayBlue: #97a5b5;
  --base-white: #ffffff;
  --base-lightBlue: #81d8d0;
  --base-red: #f53662;
  --base-lightPink: #f53561;
  --base-peach: #ec73b2;
  --base-brown: #8c4239;
  --base-darkGray: #97a5b5;
  --base-darkBlueGray: #98a6b5;
  --base-inputGray: #cdd6dd;

  /* Text colors */
  --text-black1: #4f4f4f;
  --text-white: #ffffff;
  --text-lightBlue: #81d8d0;
  --text-red: #f53662;
  --text-peach: #ec73b2;
  --text-brown: #8c4239;
  --text-lightPink: #f53561;

  /* Fonts */
  --font-outfit: "Outfit";
  --font-zen: "Zen Kaku Gothic New";
}
```

Existing variables: 13 base colors + 7 text colors = 20 variables (some duplicate values)
Font size variables: 0

---

## Phase A: Adding New Variables to `:root`

### Work Content

Add the following to the `:root` block. **Only add definitions; do not change usage locations yet.**

### A-1. New Color Variables

| Color Code | Variable Name | Usage |
|---|---|---|
| `#faf8f5` | `--base-bgBeige` | body background |
| `#fafcfb` | `--base-bgLinearTop` | gradient start color |
| `#333` | `--base-darkText` | dark text |
| `#555` | `--base-mediumText` | medium text |
| `#ccc` | `--base-borderGray` | border (disabled, etc.) |
| `#f5f5f5` | `--base-lightBg` | light background |
| `#003032` | `--base-darkGreen` | dark green |
| `#5eada5` | `--base-greenAccent` | green accent |
| `#6c5ce7` | `--base-purple` | purple |
| `#5b4bc4` | `--base-darkPurple` | dark purple |
| `#1a1a2e` | `--base-navy` | navy |
| `#e0e0e0` | `--base-borderLight` | light border |
| `#eee` | `--base-borderLightGray` | light gray border |
| `#4cc764` | `--base-successGreen` | success color |

### A-2. storedetail-introduction Specific Color Variables

Colors used repeatedly in WordPress-derived `_storedetail-introduction.scss`.
Separated using the `--intro-*` namespace.

| Color Code | Variable Name | Usage Count |
|---|---|---|
| `#e5e7eb` | `--intro-border` | ~20 locations |
| `#4e6269` | `--intro-darkGreen` | ~30 locations |
| `#5fced8` | `--intro-cyan` | ~45 locations |
| `#a6bdc2` | `--intro-borderSage` | ~15 locations |
| `#f3f4f6` | `--intro-lightBg` | ~10 locations |
| `#314348` | `--intro-darkText` | 3 locations |
| `#ffff00` | `--intro-yellow` | ~10 locations |

### A-3. Font Size Variables

| Variable Name | Value | px Equivalent |
|---|---|---|
| `--fs-xs` | `0.75rem` | 12px |
| `--fs-2xs` | `0.8125rem` | 13px |
| `--fs-sm` | `0.875rem` | 14px |
| `--fs-sm2` | `0.9375rem` | 15px |
| `--fs-base` | `1rem` | 16px |
| `--fs-md` | `1.125rem` | 18px |
| `--fs-lg` | `1.25rem` | 20px |
| `--fs-lg2` | `1.375rem` | 22px |
| `--fs-xl` | `1.5rem` | 24px |
| `--fs-xl2` | `1.75rem` | 28px |
| `--fs-2xl` | `1.875rem` | 30px |
| `--fs-2xl2` | `2rem` | 32px |
| `--fs-3xl` | `2.25rem` | 36px |
| `--fs-4xl` | `2.5rem` | 40px |
| `--fs-5xl` | `3rem` | 48px |
| `--fs-6xl` | `3.75rem` | 60px |
| `--fs-7xl` | `4rem` | 64px |
| `--fs-8xl` | `4.5rem` | 72px |
| `--fs-9xl` | `5rem` | 80px |
| `--fs-display` | `6.25rem` | 100px |

### Risk: None

Since we are only defining variables without changing usage locations, there is zero impact on appearance.

---

## Phase B: Color Replacement with Existing Variables

### Work Content

Replace hardcoded values that match colors already defined in `:root` with `var()`.

### B-1. `#4f4f4f` -> `var(--base-black)`

| File | Line Numbers | Property |
|---|---|---|
| `_medical.scss` | 95, 450 | color |
| `_personal.scss` | 97, 214 | color |
| `_protein.scss` | 60 | color |
| `_storedetail.scss` | 10 | color |
| `_storedetail.scss` | 462-469, 488-495 | text-shadow (caution: multi-value property) |

### B-2. `#f53662` -> `var(--base-red)`

| File | Line Numbers | Property |
|---|---|---|
| `_medical.scss` | 132 | color |
| `_payment.scss` | 151 | color |

### B-3. `#f53561` -> `var(--base-lightPink)`

| File | Line Numbers | Property |
|---|---|---|
| `_admission.scss` | 123 | color |

### B-4. `#97a5b5` -> `var(--base-grayBlue)`

| File | Line Numbers | Property |
|---|---|---|
| `_price.scss` | 120 | color |

### B-5. `#ffffff` / `#fff` -> `var(--base-white)`

Target files: `_global.scss`, `_storedetail.scss`, `_price.scss`, `_protein.scss`, `_contact.scss`, `_column-slag.scss`, `_storedetail-introduction.scss`
Target locations: ~30 (excluding comments and Tailwind-derived `0 0 #0000` values)

### B-6. `white` keyword -> `var(--base-white)`

Target files: All SCSS files (~80 locations)
Exclusions: Within comments

### Risk: Low

Simple replacement of identical color codes, so no impact on appearance.
However, browser verification is recommended for `text-shadow` (B-1).

---

## Phase C: Color Replacement with New Variables

### C-1. Replacements in `_global.scss`

| Line | Old Value | New Value |
|---|---|---|
| 39 | `#faf8f5` | `var(--base-bgBeige)` |
| 80 | `#fafcfb` | `var(--base-bgLinearTop)` |
| 5851 | `#6c5ce7` | `var(--base-purple)` |
| 5861 | `#5b4bc4` | `var(--base-darkPurple)` |
| 5865 | `#ccc` | `var(--base-borderGray)` |
| 6687 | `#eee` | `var(--base-borderLightGray)` |
| 6702 | `#333` | `var(--base-darkText)` |
| 6708 | `#eee` | `var(--base-borderLightGray)` |
| 6776 | `#f5f5f5` | `var(--base-lightBg)` |
| 6783 | `#333` | `var(--base-darkText)` |
| 6837 | `#555` | `var(--base-mediumText)` |
| 7706 | `#003032` | `var(--base-darkGreen)` |
| 8026 | `#1a1a2e` | `var(--base-navy)` |
| 8053, 8057 | `#5eada5` | `var(--base-greenAccent)` |
| 8107, 8112 | `#5eada5` | `var(--base-greenAccent)` |
| 10143 | `#f5f5f5` | `var(--base-lightBg)` |

### C-2. Page-Specific SCSS Replacements

| File | Old Value | New Value | Count |
|---|---|---|---|
| `_storelist.scss` | `#333` | `var(--base-darkText)` | 1 |
| `_storelist.scss` | `#555` | `var(--base-mediumText)` | 1 |
| `_column-slag.scss` | `#333` | `var(--base-darkText)` | 2 |
| `_storedetail.scss` | `#555` | `var(--base-mediumText)` | 2 |
| `_storedetail.scss` | `#1a1a2e` | `var(--base-navy)` | 3 |
| `_storedetail.scss` | `#eee` | `var(--base-borderLightGray)` | 1 |
| `_storedetail.scss` | `#ddd` | *One-off unique color -> not variablized* | -- |
| `_medical.scss` | `#e0e0e0` | `var(--base-borderLight)` | 1 |
| `_medical.scss` | `#4cc764` | `var(--base-successGreen)` | 1 |
| `_storedetail.scss` | `#e0e0e0` | `var(--base-borderLight)` | 1 |
| `_top.scss` | `#fafcfb` | `var(--base-bgLinearTop)` | 1 |
| `_storedetail.scss` | `#fafcfb` | `var(--base-bgLinearTop)` | 1 |
| `_visitor.scss` | `#333` | `var(--base-darkText)` | 1 |

### C-3. `_storedetail-introduction.scss` Replacements (High Risk)

Replace one color at a time. Compile + browser check after each color replacement.

| Order | Old Value | New Value | Count |
|---|---|---|---|
| 1 | `#5fced8` | `var(--intro-cyan)` | ~45 |
| 2 | `#4e6269` | `var(--intro-darkGreen)` | ~30 |
| 3 | `#e5e7eb` | `var(--intro-border)` | ~20 |
| 4 | `#a6bdc2` | `var(--intro-borderSage)` | ~15 |
| 5 | `#f3f4f6` | `var(--intro-lightBg)` | ~10 |
| 6 | `#314348` | `var(--intro-darkText)` | 3 |
| 7 | `#ffff00` | `var(--intro-yellow)` | ~10 |

### Risk Assessment

| Target | Risk | Reason |
|---|---|---|
| Simple properties (color, background-color, border-color) | Low | Mechanical replacement |
| Inside border shorthand | Medium | `var()` is fine in modern browsers |
| Inside gradients | Medium | Requires testing |
| Inside text-shadow / box-shadow | Medium | Multi-value property but no issues |
| `_storedetail-introduction.scss` overall | High | WordPress-derived, process one color at a time |

---

## Phase D: Font Size Variable Replacement

### Target Scope

- Only `font-size` values hardcoded within components and layouts
- Utility class definitions (`.fs-*`, `.lg-fs-*`, `.sm-fs-*`) are excluded

### Exclusion Conditions

The following will not be variablized:

- `calc()` expressions (e.g., `calc(100 / 375 * 23 * 1vw)`)
- `clamp()` expressions
- `vw` units
- `em` units (parent element dependent)
- `font-size: 0` (layout hack)
- `_storedetail-review.scss` entirely (third-party code)

### D-1. `_global.scss` (after excluding utilities: ~50 locations)

Section headers, header, navigation, footer, banners, components, etc.

### D-2. Page-Specific SCSS (excluding introduction: ~170 locations)

| File | Count | Priority |
|---|---|---|
| `_storedetail.scss` | 46 | 1 |
| `_medical.scss` | 36 | 2 |
| `_reservation.scss` | 30 | 3 |
| `_protein.scss` | 25 | 4 |
| `_sportip.scss` | 18 | 5 |
| `_personal.scss` | 18 | 6 |
| `_price.scss` | 14 | 7 |
| `_contact.scss` | 13 | 8 |
| `_column-slag.scss` | 12 | 9 |
| `_storelist.scss` | 10 | 10 |
| `_top.scss` | 8 | 11 |
| `_point_redemption.scss` | 7 | 12 |
| `_about.scss` | 5 | 13 |
| `_sitemap.scss` | 2 | 14 |
| `_faq.scss` | 1 | 15 |

### D-3. `_storedetail-introduction.scss` (~230 locations -- handled last)

- rem values -> variablize only those that can be mapped to standard size variables
- px values -> variablize only those that can be mapped to rem-equivalent variables (e.g., `14px` -> `var(--fs-sm)`)
- Decorative large font sizes (40px-200px) are excluded

### Risk: Medium to High

When replacing px with rem variables, it is necessary to confirm that the browser's computed values are completely identical.

---

## Not Variablized (Colors)

The following are one-off unique colors or externally derived, so they will not be variablized.

| Category | Colors | File |
|---|---|---|
| Google brand colors | `#6186ec`, `#cd523f`, `#eabe43`, `#63a45d` | `_storedetail.scss` |
| Google star / button colors | `#fbbc04`, `#1a73e8`, `#1557b0` | `_storedetail.scss` |
| Colors inside `rgba()` (~40 locations) | -- | All files |
| `_storedetail-review.scss` entirely | -- | Third-party widget |
| Page-specific one-off colors | `#3bb8b8`, `#999`, `#aaa`, `#f0f0f0`, etc. | Various files |

---

## Verification Method

Perform the following at the completion of each Phase:

1. SCSS compilation completes without errors
2. Browser check main pages (top, about, medical, storedetail, storedetail-introduction) on PC/SP
3. Confirm computed CSS values are identical before and after changes using DevTools

---

## Work Order Summary

```
Phase A: Add variable definitions to :root (zero impact on appearance)
  |
Phase B: Replace hardcoded values identical to existing variables with var() (low risk)
  |
Phase C-1: Color replacement in _global.scss (low risk)
Phase C-2: Color replacement in page-specific SCSS (medium risk)
Phase C-3: Color replacement in _storedetail-introduction.scss (high risk, one color at a time)
  |
Phase D-1: Font size replacement in _global.scss
Phase D-2: Font size replacement in page-specific SCSS
Phase D-3: Font size replacement in _storedetail-introduction.scss (last)
```
