# Step 6: `!important` Reduction Execution Plan

Created: 2026-03-30
Target: 190 `!important` declarations across all SCSS (24 files)

---

## Policy

- Steps 4 (ID selector removal) and 5 (selector depth fix) are complete, so specificity conflicts are significantly reduced
- Verify each `!important` one by one to determine if removing it produces the same result, and delete unnecessary ones
- Keep `!important` for utility classes, third-party derived, and JS state toggle
- **Never break the appearance** -- when in doubt, keep it

---

## Summary

| Category | Count | Action |
|------|:---:|------|
| A. Third-party / library derived | 19 | Keep (cannot modify) |
| B. Utility classes | 1 | Keep (allowed by guideline) |
| C. JS state toggle | 5 | Keep (functionally required) |
| D. body/html reset | 2 | Keep (global reset) |
| E. WordPress integration (wpac override) | 5 | Keep (countering wpac's !important) |
| F. Deletion candidates (within media queries) | 138 | Delete after verification |
| G. Deletion candidates (normal rules) | 20 | Delete after verification |
| **Total** | **190** | **158 deletion candidates, realistically 80-100** |

> **Note**: Of the 158 deletion candidates, a significant number should be kept due to cascade chains (see section H) and competing selectors. During execution, specificity is verified one by one, and only safe ones are deleted.

---

## A. Keep: Third-Party / Library Derived (19 items)

These are third-party library CSS; removing `!important` risks breaking functionality.

### Hamburger Menu Library (11 items)
| # | File | Line | Selector | Property |
|---|---------|:---:|---------|-----------|
| 1 | `_storedetail-introduction.scss` | 7625 | `.hamburger--3dx.is-active .hamburger-inner` | `background-color: transparent` |
| 2 | Same | 7657 | `.hamburger--3dx-r.is-active .hamburger-inner` | `background-color: transparent` |
| 3 | Same | 7689 | `.hamburger--3dy.is-active .hamburger-inner` | `background-color: transparent` |
| 4 | Same | 7721 | `.hamburger--3dy-r.is-active .hamburger-inner` | `background-color: transparent` |
| 5 | Same | 7753 | `.hamburger--3dxy.is-active .hamburger-inner` | `background-color: transparent` |
| 6 | Same | 7785 | `.hamburger--3dxy-r.is-active .hamburger-inner` | `background-color: transparent` |
| 7 | Same | 8137 | `.hamburger--emphatic.is-active .hamburger-inner` | `background-color: transparent` |
| 8 | Same | 8192 | `.hamburger--emphatic-r.is-active .hamburger-inner` | `background-color: transparent` |
| 9 | Same | 8419 | `.hamburger--spring.is-active .hamburger-inner` | `background-color: transparent` |
| 10 | Same | 8509 | `.hamburger--stand.is-active .hamburger-inner` | `background-color: transparent` |
| 11 | Same | 8555 | `.hamburger--stand-r.is-active .hamburger-inner` | `background-color: transparent` |

### Swiper Library (4 items)
| # | File | Line | Selector | Property |
|---|---------|:---:|---------|-----------|
| 12 | `_storedetail-introduction.scss` | 11111 | `.swiper-navigation-disabled .swiper-button-*` | `display: none` |
| 13 | Same | 11117 | `.swiper-button-*:after` | `text-transform: none` |
| 14 | Same | 11155 | `.swiper-pagination-disabled > .swiper-pagination` | `display: none` |
| 15 | Same | 11215 | `.swiper-pagination-bullet:only-child` | `display: none` |

### ez-toc Plugin (3 items)
| # | File | Line | Selector | Property |
|---|---------|:---:|---------|-----------|
| 16 | `_storedetail-introduction.scss` | 7356 | `.ez-toc-list` (within media) | `padding-left: 3rem` |
| 17 | Same | 7377 | `.ez-toc-list ul` | `list-style: none` |
| 18 | Same | 7389 | `.ez-toc-list li` | `list-style: none` |

### WordPress Review Widget (1 item = 1 line with 443 declarations)
| # | File | Line | Note |
|---|---------|:---:|------|
| 19 | `_storedetail-review.scss` | 1 | `.wpac` / `.wp-gr` related. Minified single line with 443 `!important`. Skipped in CLAUDE.md Phase 1-1 |

---

## B. Keep: Utility Classes (1 item)

Per guideline, `!important` is allowed for utility classes.

| # | File | Line | Selector | Property |
|---|---------|:---:|---------|-----------|
| 20 | `_typography.scss` | 15 | `.text-decoration-none` | `text-decoration: none` |

---

## C. Keep: JS State Toggle (5 items)

Required for state switching via JavaScript class addition (`.active`, `.scrolling`, `.hidden-by-menu`).

| # | File | Line | Selector | Property | Reason |
|---|---------|:---:|---------|-----------|------|
| 21 | `_header.scss` | 115 | `.l-header-floating-menu.active .scroll-down-text` | `pointer-events: auto` | Overrides base `none` |
| 22 | Same | 120 | `.scroll-down-text.scrolling` | `opacity: 0` | Overrides `.active` state |
| 23 | Same | 142 | `.scroll-down-mobile.hidden-by-menu` | `display: none` | JS toggle |
| 24 | Same | 446 | `.l-header-floating-menu.active .scroll-down-text` (within media) | `opacity: 0` | Hidden on mobile |
| 25 | Same | 447 | Same | `pointer-events: none` | Same |

---

## D. Keep: body/html Reset (2 items)

Global reset applied to all pages. Removing may cause unexpected margins.

| # | File | Line | Selector | Property |
|---|---------|:---:|---------|-----------|
| 26 | `utility/_responsive.scss` | 2828 | `body, html` | `margin: 0` |
| 27 | Same | 2829 | `body, html` | `padding: 0` |

---

## E. Keep: WordPress Integration wpac Override (5 items)

`.wpac` CSS sets `color: inherit !important`, so `!important` is required to override it.

| # | File | Line | Selector | Property |
|---|---------|:---:|---------|-----------|
| 28 | `_storedetail.scss` | 83 | `.p-storedetail__google-blue` | `color: #6186ec` |
| 29 | Same | 84 | `.p-storedetail__google-red` | `color: #cd523f` |
| 30 | Same | 85 | `.p-storedetail__google-yellow` | `color: #eabe43` |
| 31 | Same | 86 | `.p-storedetail__google-green` | `color: #63a45d` |
| 32 | Same | 837 | `.wp-gr .wp-google-text` | `white-space: normal` |

---

## F. Deletion Candidates: Within Media Queries (111 items)

After Steps 4/5, base style specificity has been lowered, so most `!important` within media queries are estimated to be unnecessary.
For each item, compare with the base style specificity to verify whether it can override without `!important`.

### F-1. `_global-responsive.scss` (50 items)

| # | Line | Selector | Property | Media Query |
|---|:---:|---------|-----------|---------------|
| 33 | 28 | `.l-header__btn` | `padding-left: 14px` | `max-width: 1330px` |
| 34 | 29 | `.l-header__btn` | `padding-right: 14px` | `max-width: 1330px` |
| 35 | 169 | `.c-text-slider__slide-text` | `font-size: var(--fs-xl)` | `max-width: 1090px` |
| 36 | 180 | `.l-footer__main-container > div` | `flex-direction: column` | `max-width: 1090px` |
| 37 | 181 | Same | `align-items: flex-start` | `max-width: 1090px` |
| 38 | 182 | Same | `gap: 32px` | `max-width: 1090px` |
| 39 | 194 | `.l-footer__bottom` | `flex-direction: column` | `max-width: 1090px` |
| 40 | 195 | Same | `align-items: flex-start` | `max-width: 1090px` |
| 41 | 196 | Same | `gap: 20px` | `max-width: 1090px` |
| 42 | 209 | `.c-cookie-notice` | `padding-left: 1.25rem` | `max-width: 1090px` |
| 43 | 210 | Same | `padding-right: 1.25rem` | `max-width: 1090px` |
| 44 | 371 | `.tabs-controls` | `display: grid` | `max-width: 1090px` |
| 45 | 372 | Same | `grid-template-columns: repeat(2, 1fr)` | `max-width: 1090px` |
| 46 | 373 | Same | `row-gap: 10px` | `max-width: 1090px` |
| 47 | 374 | Same | `column-gap: 10px` | `max-width: 1090px` |
| 48 | 407 | `.news-label` | `padding-top: 8px` | `max-width: 1090px` |
| 49 | 408 | Same | `padding-bottom: 8px` | `max-width: 1090px` |
| 50 | 643 | `.c-shop__sticker-sp` | `display: block` | `max-width: 1090px` |
| 51 | 648 | `.c-shop__map-box--sp` | `display: block` | `max-width: 1090px` |
| 52 | 649 | Same | `position: relative` | `max-width: 1090px` |
| 53 | 655 | `.c-shop__map-box--sp .c-shop__map-img` | `margin: 0 auto` | `max-width: 1090px` |
| 54 | 656 | Same | `margin-left: 100px` | `max-width: 1090px` |
| 55 | 726 | `.c-shop__map-box--sp` | `left: 60px` | `max-width: 1000px` |
| 56 | 730 | `.c-shop__map-box--sp .c-shop__map-img` | `margin: 0 auto` | `max-width: 1000px` |
| 57 | 731 | Same | `margin-left: 0` | `max-width: 1000px` |
| 58 | 746 | `.c-shop__map-box--sp` | `left: 0` | `max-width: 900px` |
| 59 | 750 | Same | `width: 100%` | `max-width: 900px` |
| 60 | 752 | Same | `margin: 0` | `max-width: 900px` |
| 61 | 832 | `.c-shop__map-box--sp` | `left: -150px` | `max-width: 570px` |
| 62 | 836 | `.c-shop__map-box--sp .c-shop__map-img` | `margin-left: 190px` | `max-width: 570px` |
| 63 | 842 | `.c-shop__map-number` | `text-wrap: nowrap` | `max-width: 570px` |
| 64 | 846 | `.c-shop__map-number span` | `margin-left: -15px` | `max-width: 570px` |
| 65 | 851 | `.c-shop__ribbon--sp` | `margin-left: -180px` | `max-width: 570px` |
| 66 | 856 | `.c-shop__map-box--sp` | `left: -150px` | `max-width: 500px` |
| 67 | 860 | `.c-shop__map-box--sp .c-shop__map-img` | `margin-left: 190px` | `max-width: 500px` |
| 68 | 866 | `.c-shop__map-number` | `text-wrap: nowrap` | `max-width: 500px` |
| 69 | 870 | `.c-shop__map-number span` | `margin-left: -15px` | `max-width: 500px` |
| 70 | 1685 | `.c-faq__icon__q` | `width: 30px` | `max-width: 768px` |
| 71 | 1699 | `.c-faq__container__toggle--pc ~ .c-faq__accordion-inner` | `max-height: 0` | `max-width: 768px` |
| 72 | 1700 | Same | `opacity: 0` | `max-width: 768px` |
| 73 | 1701 | Same | `padding: 0` | `max-width: 768px` |
| 74 | 1702 | Same | `border-top-width: 0` | `max-width: 768px` |
| 75 | 1949 | `.c-footer-banner__stickers` | `display: flex` | `max-width: 768px` |
| 76 | 1961 | `.c-footer-banner__sticker1, __sticker2` | `display: block` | `max-width: 768px` |
| 77 | 1972 | `.c-footer-banner__sticker1 img:last-child` | `display: block` | `max-width: 768px` |
| 78 | 1982 | `.c-footer-banner__sticker1 img:first-child` | `display: block` | `max-width: 768px` |
| 79 | 1997 | `.c-footer-banner__sticker2 img:first-child` | `display: block` | `max-width: 768px` |
| 80 | 2200 | `.c-other-details-banner-item` | `gap: 15px` | `max-width: 500px` |
| 81 | 2204 | `.c-other-details-banner__list, -container` | `gap: 20px` | `max-width: 500px` |
| 82 | 2208 | `.c-other-details-banner-item__title` | `gap: 15px` | `max-width: 500px` |

### F-2 through F-17

(Sections F-2 through F-17 cover `_top.scss` (15 items), `_storedetail.scss` (14 items), `_protein.scss` (17 items), `_admission.scss` (8 items), `_slider.scss` (5 items), `_footer-banner.scss` (5 items), `_point_redemption.scss` (2 items), `_medical.scss` (4 items), `_sportip.scss` (4 items), `_price.scss` (4 items), `_footer.scss` (3 items), `_personal.scss` (2 items), `_contact.scss` (1 item), `_about.scss` (1 item), `_visitor.scss` (1 item), and `_storedetail-introduction.scss` (2 items) -- all within media queries. Each item follows the same format as F-1 above.)

---

## G. Deletion Candidates: Normal Rules (20 items)

`!important` used outside media queries. Delete eligibility is determined by specificity comparison with base styles.

### G-1. `_top.scss` (3 items)

| # | Line | Selector | Property | Note |
|---|:---:|---------|-----------|------|
| 172 | 501 | `.p-top__concept-store__flex` | `align-items: flex-start` | Normal rule |
| 173 | 547 | `.p-top__concept-store__bg-img img` | `object-position: center center` | Normal rule |
| 174 | 1272 | `.p-top__instagram-icon-text span` | `left: -20px` | Normal rule |

### G-2 through G-12

(Sections G-2 through G-12 cover `_header.scss` (2 items), `_footer.scss` (1 item), `_slider.scss` (2 items), `_point_redemption.scss` (3 items), `_contact.scss` (1 item), `_about.scss` (1 item), `_banner.scss` (2 items), `_hero.scss` (1 item), `_family.scss` (1 item), `_storedetail-introduction.scss` (1 item), and `utility/_responsive.scss` (2 items with ID selectors).)

---

## H. Cascade Chains (Caution Required)

The following groups have `!important` declarations with the same selector + property overriding each other across multiple breakpoints.
**Within a group, `!important` must either be "all removed" or "all kept"**. Removing only one breaks the cascade.

### Chain 1: `.c-shop__map-box--sp` `left` (5 items)

| Line | Media Query | Value |
|:---:|---------------|-----|
| 649 | `max-width: 1090px` | *(position: relative enables left)* |
| 726 | `max-width: 1000px` | `left: 60px` |
| 746 | `max-width: 900px` | `left: 0` |
| 832 | `max-width: 570px` | `left: -150px` |
| 856 | `max-width: 500px` | `left: -150px` |

### Chain 2: `.c-shop__map-box--sp .c-shop__map-img` `margin-left` (6 items)

### Chain 3: `.c-shop__map-number` related (4 items)

### Chain 4: `.c-service__container` flex settings (6 items x 2 files)

### Chain 5: `.p-protein__hero-text` related (9 items)

Repeated across 3 breakpoints (1200px, 768px, 500px) with the same selectors and properties.

### Chain 6: `.p-admission__graph-*` height (4 items)

### Chain 7: `.c-footer-banner__sticker*` display (duplicate definitions x 2 files)

**Chain total: ~34 items are interdependent**

> **Execution principle**: For all items in a chain, identify the base style (outside media queries), and **remove !important from all items in a chain only if all items can override without !important**. If even 1 item cannot, keep the entire chain.

---

## Execution Order

### Phase 1: Remove `!important` from Normal Rules (18 items)

Start with lower-risk `!important` in normal rules.
Target: G-1 through G-11 (excluding G-12).

**Procedure (one at a time)**:
1. Grep the target selector and find all competing selectors for the same element/property
2. Calculate specificity of competing selectors and determine if intended value wins without `!important`
3. Check for competing inline styles or utility classes in HTML
4. If determined safe -> remove `!important`
5. If in doubt -> **keep**
6. SCSS compilation + browser check **per file**

### Phase 2: Remove `!important` from Media Queries (non-chain)

Process independent media query `!important` not included in chains (section H).
Target: ~104 items from section F not in section H.

**Procedure (per file)**:
1. Identify the base style (outside media query) for each `!important`
2. Compare selector specificity with base style:
   - Equal or media query side is higher -> remove `!important` (later declaration wins)
   - Base style is higher -> check if selector adjustment is possible; if not, keep
3. **SCSS compilation + browser check (PC / tablet / SP) after processing each file**
4. If display breaks, immediately revert and change the item to "keep"

**File processing order** (from smallest impact scope):
1. `_visitor.scss` (1 item)
2. `_about.scss` (1 item)
3. `_contact.scss` (1 item)
4. `_personal.scss` (2 items)
5. `_storedetail-introduction.scss` (2 items)
6. `_point_redemption.scss` (2 items)
7. `_price.scss` (4 items)
8. `_sportip.scss` (4 items)
9. `_medical.scss` (4 items)
10. `_footer.scss` (3 items)
11. `_footer-banner.scss` (5 items)
12. `_slider.scss` (5 items)
13. `_admission.scss` (8 items -- only 4 excluding Chain 6)
14. `_storedetail.scss` (14 items -- only 8 excluding Chain 4)
15. `_top.scss` (15 items)
16. `_protein.scss` (17 items -- only 8 excluding Chain 5)
17. `_global-responsive.scss` (50 items -- only ~35 excluding Chains 1-3, 7)

### Phase 3: Remove `!important` from Cascade Chains

Process chain groups from section H one group at a time.

**Procedure (per group)**:
1. Identify base style (outside media queries) for all items in the group
2. Verify all items cascade correctly without `!important`
3. **All OK -> bulk remove**. Even 1 NG -> **keep entire group**
4. After removal, SCSS compilation + **browser check at all breakpoints**

### Phase 4: Final Verification

- Final SCSS compilation: `npx sass assets/scss/global.scss assets/css/global.css --no-source-map`
- Browser check all pages x all breakpoints (PC 1440px / tablet 1090px / SP 768px / SP 500px / SP 375px)
- Count remaining `!important` and reconcile with this plan's exclusions

---

## Exclusions

| Target | Reason |
|------|------|
| `_storedetail-review.scss` entirety | WordPress review widget (third-party, 443 declarations). Skipped in CLAUDE.md Phase 1-1 |
| Hamburger CSS / Swiper / ez-toc | Third-party libraries. Changes risk breaking functionality |
| JS state toggle `!important` (5 items) | Required for `.active`, `.scrolling`, etc. JS toggles |
| `#about-three-vehicles-section` (2 items) | ID selector remains. Possibly Step 4 exclusion target |

---

## Risk Assessment

| Risk Level | Target | Count | Note |
|:---:|---------|:---:|------|
| Low | Normal rules (G-1 through G-11) | 18 | Few competing selectors. Verify individually during execution |
| Medium | Media query non-chain (F excluding section H) | ~104 | Specificity comparison with base styles required |
| High | Cascade chains (section H) | ~34 | Group-level bulk decision. If even 1 item is not possible, entire group is kept |
| -- | Keep items (A through E) | 32 | No modifications |

**Realistic deletion estimate**: 80-100 items / 190 items
- Normal rules: ~15 of 18 items likely deletable
- Non-chain MQ: ~60-70 of 104 items likely deletable
- Chains: If all groups can be fully deleted, max 34 items; may reduce to 0 per group
- **Estimated remaining: 90-110 items** (32 kept + 60-80 undeletable)
