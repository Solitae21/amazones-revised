# Step 7c: Utility Naming Guideline Compliance (Abbreviation)

Created: 2026-04-01
Target: All utility SCSS files (9 files) + HTML 23 files
Based on: `docs/cording-guideline.md`

---

## Overview

After deleting unused classes in Step 7b, apply **naming abbreviation** to the remaining 97 classes for guideline compliance.

**px to rem conversion is skipped** (no client feedback on this, low risk-to-benefit ratio).
CSS values are not changed at all. Only class name renaming.

### Relevant Guideline Section (Excerpt)

> - _color.scss
>   - Text, border, background colors, etc.
>   - .u-cRed1 .u-bdcBlue1

> - _spase.scss
>   - margin, padding spacing, etc.
>   - .u-mt1em .u-my20em .u-pl1em .u-px15em

---

## Change Policy

- **CSS values are not changed** (remain in px)
- Only class name hyphen removal and abbreviation
- Align with guideline naming patterns:
  - color: `u-text-white` -> `u-cWhite`, `u-bg-red` -> `u-bgcRed`
  - space: `u-mt-20` -> `u-mt20`, `u-mx-auto` -> `u-mxAuto`
  - font: `u-fw-500` -> `u-fw500`, `u-fs-14` -> `u-fs14`
  - line-height: `u-lh-180` -> `u-lh180`
  - other: `u-font-outfit` -> `u-fontOutfit`, `u-text-center` -> `u-taCenter`

---

## Exclusions (Classes Not Changed and Reasons)

| Class | Reason |
|--------|------|
| `.c-btn` (within _typography.scss) | Not a utility, it's a component. Out of scope |
| `#about-three-vehicles-section .u-img-wrapper img` (within _responsive.scss) | ID selector + utility compound. Out of scope |
| `*`, `body, html`, `a` reset definitions (within _responsive.scss) | Not utility classes. Out of scope |

---

## Complete Replacement Map

### A. font-size Classes (_font-size.scss) -- 21 classes (naming change only)

| # | Old Class Name | New Class Name | CSS Value (unchanged) | HTML Count |
|---|-----------|-----------|-----------------|:---:|
| A-01 | `u-fs-12` | `u-fs12` | `font-size: 12px` | 56 |
| A-02 | `u-fs-13` | `u-fs13` | `font-size: 13px` | 23 |
| A-03 | `u-fs-14` | `u-fs14` | `font-size: 14px` | 379 |
| A-04 | `u-fs-15` | `u-fs15` | `font-size: 15px` | 1164 |
| A-05 | `u-fs-16` | `u-fs16` | `font-size: 16px` | 716 |
| A-06 | `u-fs-18` | `u-fs18` | `font-size: 18px` | 260 |
| A-07 | `u-fs-19` | `u-fs19` | `font-size: 19px` | 1 |
| A-08 | `u-fs-20` | `u-fs20` | `font-size: 20px` | 7 |
| A-09 | `u-fs-24` | `u-fs24` | `font-size: 24px` | 138 |
| A-10 | `u-fs-25` | `u-fs25` | `font-size: 25px` | 4 |
| A-11 | `u-fs-30` | `u-fs30` | `font-size: 30px` | 17 |
| A-12 | `u-fs-32` | `u-fs32` | `font-size: 32px` | 5 |
| A-13 | `u-fs-36` | `u-fs36` | `font-size: 36px` | 201 |
| A-14 | `u-fs-39` | `u-fs39` | `font-size: 39px` | 5 |
| A-15 | `u-fs-46` | `u-fs46` | `font-size: 46px` | 1 |
| A-16 | `u-fs-48` | `u-fs48` | `font-size: 48px` | 1 |
| A-17 | `u-fs-54` | `u-fs54` | `font-size: 54px` | 2 |
| A-18 | `u-fs-60` | `u-fs60` | `font-size: 60px` | 11 |
| A-19 | `u-fs-70` | `u-fs70` | `font-size: 70px` | 1 |
| A-20 | `u-fs-100` | `u-fs100` | `font-size: 100px` | 24 |
| A-21 | `u-fs-320` | `u-fs320` | `font-size: 320px` | 4 |

**Subtotal: 3,020 HTML replacements**

### B. font-weight Classes (_font-size.scss) -- 6 classes

| # | Old Class Name | New Class Name | CSS Value (unchanged) | HTML Count |
|---|-----------|-----------|-----------------|:---:|
| B-01 | `u-fw-300` | `u-fw300` | `font-weight: 300` | 196 |
| B-02 | `u-fw-400` | `u-fw400` | `font-weight: 400` | 58 |
| B-03 | `u-fw-500` | `u-fw500` | `font-weight: 500` | 2249 |
| B-04 | `u-fw-600` | `u-fw600` | `font-weight: 600` | 109 |
| B-05 | `u-fw-700` | `u-fw700` | `font-weight: 700` | 434 |
| B-06 | `u-fw-800` | `u-fw800` | `font-weight: 800` | 1 |

**Subtotal: 3,047 HTML replacements**

### C. line-height Classes (_font-size.scss) -- 8 classes

| # | Old Class Name | New Class Name | CSS Value (unchanged) | HTML Count |
|---|-----------|-----------|-----------------|:---:|
| C-01 | `u-lh-100` | `u-lh100` | `line-height: 1em` | 7 |
| C-02 | `u-lh-140` | `u-lh140` | `line-height: 1.4em` | 1 |
| C-03 | `u-lh-150` | `u-lh150` | `line-height: 1.5em` | 31 |
| C-04 | `u-lh-160` | `u-lh160` | `line-height: 1.6em` | 1 |
| C-05 | `u-lh-180` | `u-lh180` | `line-height: 1.8em` | 89 |
| C-06 | `u-lh-200` | `u-lh200` | `line-height: 2em` | 208 |
| C-07 | `u-lh-210` | `u-lh210` | `line-height: 2.1em` | 82 |
| C-08 | `u-lh-normal` | `u-lhNormal` | `line-height: 100%` | 25 |

**Subtotal: 444 HTML replacements**

### D. letter-spacing Classes (_font-size.scss) -- 2 classes

| # | Old Class Name | New Class Name | CSS Value (unchanged) | HTML Count |
|---|-----------|-----------|-----------------|:---:|
| D-01 | `u-ls-10` | `u-ls10` | `letter-spacing: 0.1em` | 11 |
| D-02 | `u-ls-20` | `u-ls20` | `letter-spacing: 0.2em` | 78 |

**Subtotal: 89 HTML replacements**

### E. margin Classes (_space.scss) -- 19 classes

| # | Old Class Name | New Class Name | CSS Value (unchanged) | HTML Count |
|---|-----------|-----------|-----------------|:---:|
| E-01 | `u-mt-5` | `u-mt5` | `margin-top: 5px` | 1 |
| E-02 | `u-mt-10` | `u-mt10` | `margin-top: 10px` | 6 |
| E-03 | `u-mt-18` | `u-mt18` | `margin-top: 18px` | 8 |
| E-04 | `u-mt-20` | `u-mt20` | `margin-top: 20px` | 20 |
| E-05 | `u-mt-25` | `u-mt25` | `margin-top: 25px` | 1 |
| E-06 | `u-mt-30` | `u-mt30` | `margin-top: 30px` | 6 |
| E-07 | `u-mt-40` | `u-mt40` | `margin-top: 40px` | 12 |
| E-08 | `u-mt-50` | `u-mt50` | `margin-top: 50px` | 2 |
| E-09 | `u-mt-60` | `u-mt60` | `margin-top: 60px` | 2 |
| E-10 | `u-mb-10` | `u-mb10` | `margin-bottom: 10px` | 3 |
| E-11 | `u-ml-4` | `u-ml4` | `margin-left: 4px` | 9 |
| E-12 | `u-ml-20` | `u-ml20` | `margin-left: 20px` | 4 |
| E-13 | `u-ml-40` | `u-ml40` | `margin-left: 40px` | 2 |
| E-14 | `u-ml-auto` | `u-mlAuto` | `margin-left: auto` | 1 |
| E-15 | `u-mr-5` | `u-mr5` | `margin-right: 5px` | 94 |
| E-16 | `u-mr-10` | `u-mr10` | `margin-right: 10px` | 5 |
| E-17 | `u-mr-auto` | `u-mrAuto` | `margin-right: auto` | 1 |
| E-18 | `u-mx-auto` | `u-mxAuto` | `margin-left/right: auto` | 15 |
| E-19 | `u-my-15` | `u-my15` | `margin-top/bottom: 15px` | 1 |

**Subtotal: 193 HTML replacements**

### F. padding Classes (_space.scss) -- 1 class

| # | Old Class Name | New Class Name | CSS Value (unchanged) | HTML Count |
|---|-----------|-----------|-----------------|:---:|
| F-01 | `u-py-100` | `u-py100` | `padding-top/bottom: 100px` | 2 |

**Subtotal: 2 HTML replacements**

### G. color Classes (_color.scss) -- 13 classes

| # | Old Class Name | New Class Name | CSS Value (unchanged) | HTML Count |
|---|-----------|-----------|-----------------|:---:|
| G-01 | `u-bg-gray` | `u-bgcGray` | `background-color: var(--base-gray)` | 3 |
| G-02 | `u-bg-white` | `u-bgcWhite` | `background-color: var(--base-white)` | 5 |
| G-03 | `u-bg-lightBlue` | `u-bgcLightBlue` | `background-color: var(--base-lightBlue)` | 2 |
| G-04 | `u-bg-red` | `u-bgcRed` | `background-color: var(--base-red)` | 3 |
| G-05 | `u-bg-peach` | `u-bgcPeach` | `background-color: var(--base-peach)` | 3 |
| G-06 | `u-bg-brown` | `u-bgcBrown` | `background-color: var(--base-brown)` | 3 |
| G-07 | `u-text-black1` | `u-cBlack1` | `color: var(--text-black1)` | 120 |
| G-08 | `u-text-white` | `u-cWhite` | `color: var(--text-white)` | 693 |
| G-09 | `u-text-lightBlue` | `u-cLightBlue` | `color: var(--text-lightBlue)` | 468 |
| G-10 | `u-text-red` | `u-cRed` | `color: var(--text-red)` | 20 |
| G-11 | `u-text-peach` | `u-cPeach` | `color: var(--text-peach)` | 6 |
| G-12 | `u-text-brown` | `u-cBrown` | `color: var(--text-brown)` | 6 |
| G-13 | `u-text-lightPink` | `u-cLightPink` | `color: var(--text-lightPink)` | 12 |

**Subtotal: 1,344 HTML replacements**

### H. typography / other (_typography.scss) -- 5 classes

| # | Old Class Name | New Class Name | CSS Value (unchanged) | HTML Count |
|---|-----------|-----------|-----------------|:---:|
| H-01 | `u-font-outfit` | `u-fontOutfit` | `font-family: var(--font-outfit)` | 954 |
| H-02 | `u-font-zen` | `u-fontZen` | `font-family: var(--font-zen)` | 689 |
| H-03 | `u-cursor-pointer` | `u-cursorPointer` | `cursor: pointer` | 40 |
| H-04 | `u-text-blue-hover` | `u-cBlueHover` | `:hover` color + filter | 5 |
| H-05 | `u-text-link` | `u-cLink` | `color + text-decoration` | 21 |

**Subtotal: 1,709 HTML replacements**

### I. display / layout Classes -- No Changes (8 classes)

| Class Name | Reason |
|---------|------|
| `u-block` | Already compliant |
| `u-flex` | Already compliant |
| `u-grid` | Already compliant |
| `u-relative` | Already compliant |
| `u-absolute` | Already compliant |
| `u-flex-col` | Already compliant |
| `u-flex-1` | Already compliant |
| `u-grid-cols-3` | Already compliant |

### J. layout Utilities -- Naming Abbreviation (6 classes)

| # | Old Class Name | New Class Name | CSS Value (unchanged) | HTML Count |
|---|-----------|-----------|-----------------|:---:|
| J-01 | `u-text-center` | `u-taCenter` | `text-align: center` | 71 |
| J-02 | `u-text-right` | `u-taRight` | `text-align: right` | 23 |
| J-03 | `u-z-10` | `u-z10` | `z-index: 10` | 7 |
| J-04 | `u-w-full` | `u-wFull` | `width: 100%` | 9 |
| J-05 | `u-display-sp` | `u-displaySp` | `display: none / block` | 15 |
| J-06 | `u-display-desk` | `u-displayDesk` | `display: block / none` | 7 |

**Subtotal: 132 HTML replacements**

### K. Responsive Utilities (_responsive.scss + _global-responsive.scss) -- 9 classes

| # | Old Class Name | New Class Name | CSS Value (unchanged) | HTML Count |
|---|-----------|-----------|-----------------|:---:|
| K-01 | `u-sm-block` | `u-smBlock` | `display: none / block` | 8 |
| K-02 | `u-md-block` | `u-mdBlock` | `display: block` | 9 |
| K-03 | `u-md-fs-16` | `u-mdFs16` | `font-size: 16px` | 11 |
| K-04 | `u-md-fs-20` | `u-mdFs20` | `font-size: 20px` | 1 |
| K-05 | `u-md-fs-50` | `u-mdFs50` | `font-size: 50px` | 2 |
| K-06 | `u-md-mt-20` | `u-mdMt20` | `margin-top: 20px` | 1 |
| K-07 | `u-md-mt-70` | `u-mdMt70` | `margin-top: 70px` | 1 |
| K-08 | `u-sm-py-50` | `u-smPy50` | `padding: 50px` | 4 |
| K-09 | `u-lg-block` | `u-lgBlock` | `display: block` | 0 |

**Subtotal: 37 HTML replacements**

---

## Total Replacement Summary

| Category | Class Count | HTML Replacement Count |
|---------|:---:|:---:|
| A. font-size | 21 | 3,020 |
| B. font-weight | 6 | 3,047 |
| C. line-height | 8 | 444 |
| D. letter-spacing | 2 | 89 |
| E. margin | 19 | 193 |
| F. padding | 1 | 2 |
| G. color | 13 | 1,344 |
| H. typography/other | 5 | 1,709 |
| I. display/layout (no changes) | 8 | 0 |
| J. layout | 6 | 132 |
| K. responsive | 9 | 37 |
| **Total** | **98 (of which 82 changed)** | **~10,017** |

---

## Processing Order

To avoid partial matches, replace starting with larger numeric values.

### Phase 1: font-size (from larger numbers)

```
u-fs-320 -> u-fs320
u-fs-100 -> u-fs100
u-fs-70  -> u-fs70
u-fs-60  -> u-fs60
u-fs-54  -> u-fs54
u-fs-48  -> u-fs48
u-fs-46  -> u-fs46
u-fs-39  -> u-fs39
u-fs-36  -> u-fs36
u-fs-32  -> u-fs32
u-fs-30  -> u-fs30
u-fs-25  -> u-fs25
u-fs-24  -> u-fs24
u-fs-20  -> u-fs20
u-fs-19  -> u-fs19
u-fs-18  -> u-fs18
u-fs-16  -> u-fs16
u-fs-15  -> u-fs15
u-fs-14  -> u-fs14
u-fs-13  -> u-fs13
u-fs-12  -> u-fs12
```

### Phase 2: font-weight, line-height, letter-spacing

```
u-fw-800 -> u-fw800
u-fw-700 -> u-fw700
u-fw-600 -> u-fw600
u-fw-500 -> u-fw500
u-fw-400 -> u-fw400
u-fw-300 -> u-fw300
u-lh-210 -> u-lh210
u-lh-200 -> u-lh200
u-lh-180 -> u-lh180
u-lh-160 -> u-lh160
u-lh-150 -> u-lh150
u-lh-140 -> u-lh140
u-lh-100 -> u-lh100
u-lh-normal -> u-lhNormal
u-ls-20  -> u-ls20
u-ls-10  -> u-ls10
```

### Phase 3: margin / padding (from larger numbers)

```
u-mt-60  -> u-mt60
u-mt-50  -> u-mt50
u-mt-40  -> u-mt40
u-mt-30  -> u-mt30
u-mt-25  -> u-mt25
u-mt-20  -> u-mt20
u-mt-18  -> u-mt18
u-mt-10  -> u-mt10
u-mt-5   -> u-mt5
u-mb-10  -> u-mb10
u-ml-40  -> u-ml40
u-ml-20  -> u-ml20
u-ml-4   -> u-ml4
u-mr-10  -> u-mr10
u-mr-5   -> u-mr5
u-my-15  -> u-my15
u-py-100 -> u-py100
u-ml-auto -> u-mlAuto
u-mr-auto -> u-mrAuto
u-mx-auto -> u-mxAuto
```

### Phase 4: color

```
u-bg-lightBlue -> u-bgcLightBlue
u-bg-gray      -> u-bgcGray
u-bg-white     -> u-bgcWhite
u-bg-red       -> u-bgcRed
u-bg-peach     -> u-bgcPeach
u-bg-brown     -> u-bgcBrown
u-text-lightBlue -> u-cLightBlue
u-text-lightPink -> u-cLightPink
u-text-black1    -> u-cBlack1
u-text-white     -> u-cWhite
u-text-red       -> u-cRed
u-text-peach     -> u-cPeach
u-text-brown     -> u-cBrown
```

### Phase 5: typography, layout, responsive

```
u-font-outfit    -> u-fontOutfit
u-font-zen       -> u-fontZen
u-cursor-pointer -> u-cursorPointer
u-text-blue-hover -> u-cBlueHover
u-text-link      -> u-cLink
u-text-center    -> u-taCenter
u-text-right     -> u-taRight
u-z-10           -> u-z10
u-w-full         -> u-wFull
u-display-sp     -> u-displaySp
u-display-desk   -> u-displayDesk
u-sm-block       -> u-smBlock
u-md-block       -> u-mdBlock
u-lg-block       -> u-lgBlock
u-md-fs-16       -> u-mdFs16
u-md-fs-20       -> u-mdFs20
u-md-fs-50       -> u-mdFs50
u-md-mt-20       -> u-mdMt20
u-md-mt-70       -> u-mdMt70
u-sm-py-50       -> u-smPy50
```

---

## Partial Match Caution Pairs

| Shorter Class | Longer Class | Countermeasure |
|-----------|-----------|------|
| `u-fs-12` | `u-fs-120` (already deleted) | Already deleted but use word boundary just in case |
| `u-fs-13` | `u-fs-130` (does not exist) | No risk |
| `u-mt-5` | `u-mt-50` | Replace 50 first |
| `u-mt-10` | None | No risk |
| `u-mr-5` | None | No risk |
| `u-mr-10` | `u-mr-100` (already deleted) | No risk |
| `u-lh-100` | None | No risk |
| `u-ls-10` | None | No risk |
| `u-text-blue-hover` | None | Unique with hyphens |
| `u-text-center` | None | Do not replace `u-text-` series before color series. Process last in Phase 5 |

---

## Verification Procedure

1. **SCSS compilation**: `npx sass assets/scss/global.scss assets/css/global.css --no-source-map`
2. **Old class name residual check**: Grep all old class names across SCSS/HTML/CSS to confirm no residuals
3. **New class name existence check**: Grep all new class names in CSS to confirm they exist
4. **Browser check**: Visual check of main pages on PC/SP

---

## Risk Assessment

| Risk | Rating | Reason |
|--------|------|------|
| Appearance breakage | **None** | CSS values are not changed at all. Only class name renaming |
| Partial match false replacement | **Low** | Larger numeric classes processed first. Word boundary used |
| Omissions due to bulk replacement | **Low to Medium** | After replacement, grep old names to confirm zero residuals |
| Compilation errors | **None** | Simple class name changes only |
