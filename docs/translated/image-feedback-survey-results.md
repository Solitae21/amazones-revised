# Image Feedback Survey Results

Survey date: 2026-03-28
Target: All files under assets/img/ (748 files)

---

## 1. File Format Issues: Photos and Large Images Exported as PNG

Photo images that do not require transparency and have a high color count are saved as PNG. Conversion to JPG (or WebP) is recommended.

### Particularly Large PNG Files (1MB+)

| File Path | Size | Transparency | Recommended Format |
|---|---|---|---|
| `common/img_gym05.png` | **4.6 MB** | Likely unnecessary | JPG/WebP |
| `common/img_gym06.png` | **4.1 MB** | Likely unnecessary | JPG/WebP |
| `common/img_gym_people04.png` | **4.2 MB** | Needs verification | JPG/WebP (non-transparent areas) |
| `common/img_gym07.png` | **2.9 MB** | Likely unnecessary | JPG/WebP |
| `common/bg_hero5.png` | **2.8 MB** | Not needed | JPG/WebP |
| `common/bg_hero3.png` | **2.6 MB** | Not needed | JPG/WebP |
| `common/bg_hero1.png` | **2.2 MB** | Not needed | JPG/WebP |
| `common/bg_hero4.png` | **1.8 MB** | Not needed | JPG/WebP |
| `common/bg_hero2.png` | **1.7 MB** | Not needed | JPG/WebP |
| `common/img_gym04.png` | 980 KB | Likely unnecessary | JPG/WebP |
| `top/bg_hero5.png` | **2.7 MB** | Not needed | JPG/WebP |
| `top/bg_hero3.png` | **2.5 MB** | Not needed | JPG/WebP |
| `top/bg_hero2.png` | **1.7 MB** | Not needed | JPG/WebP |
| `top/bg_hero4.png` | **1.7 MB** | Not needed | JPG/WebP |
| `personal/banner_personal.png` | **2.5 MB** | Needs verification | JPG/WebP |
| `medical/banner_medical_left.png` | **2.0 MB** | Needs verification | JPG/WebP |
| `medical/banner_medical_right.png` | **1.7 MB** | Needs verification | JPG/WebP |
| `medical/banner_medical.png` | **1.5 MB** | Needs verification | JPG/WebP |
| `sportip/banner_sportip.png` | **1.6 MB** | Needs verification | JPG/WebP |
| `storedetail/img_storedetail_price_endImg.png` | **2.1 MB** | Needs verification | JPG/WebP |
| `storedetail/img_storedetail_price_titleImg01_sp.png` | **2.1 MB** | Needs verification | JPG/WebP |
| `storedetail/img_storedetail_price_titleImg02_sp.png` | **2.1 MB** | Needs verification | JPG/WebP |
| `storedetail/img_storedetail_price_titleImg.png` | **1.4 MB** | Needs verification | JPG/WebP |
| `storedetail/img_storedetail_reason_people01.png` | **1.2 MB** | Needs verification | JPG/WebP |
| `about/img_space.png` | **1.4 MB** | Needs verification | JPG/WebP |
| `personal/img_personal_amazones_method.png` | **1.0 MB** | Needs verification | JPG/WebP |

### SP PNG Files (Under 500KB but Conversion Recommended)

| File Path | Size |
|---|---|
| `common/bg_hero1_sp.png` | 461 KB |
| `common/bg_hero3_sp.png` | 439 KB |
| `common/bg_hero5_sp.png` | 398 KB |
| `top/bg_hero_sp1.png` | 386 KB |
| `top/bg_hero_sp3.png` | 360 KB |
| `personal/banner_personal_sp.png` | 361 KB |
| `common/bg_hero4_sp.png` | 335 KB |
| `sportip/banner_sportip_right.png` | 335 KB |
| `top/bg_hero_sp5.png` | 332 KB |
| `common/bg_hero2_sp.png` | 292 KB |
| `top/bg_hero_sp4.png` | 256 KB |
| `personal/img_personal_program_illustration02.png` | 247 KB |
| `price/img_price_speak_person01.png` | 240 KB |
| `medical/banner_medical_sp.png` | 248 KB |
| `sportip/banner_sportip_sp.png` | 218 KB |
| `top/bg_hero_sp2.png` | 215 KB |
| `personal/banner_personal_top_sp.png` | 223 KB |
| `personal/banner_personal_btm_sp.png` | 190 KB |
| `storedetail/img_storedetail_people03.png` | 193 KB |
| `storedetail/img_storedetail_people02.png` | 165 KB |
| `storedetail/img_storedetail_people01.png` | 172 KB |
| `sportip/img_sportip03.png` | 160 KB |
| `medical/banner_medical_left_sp.png` | 162 KB |
| `medical/banner_medical_right_sp.png` | 123 KB |
| `top/bg_banner.png` | 116 KB |

### Files Where PNG is Appropriate (Transparency Required)

| File Path | Size | Notes |
|---|---|---|
| `common/icon_voice_image1-4.png` | 4-5 KB | Small icons |
| `common/icon_24_white_green.png` | 2.1 KB | Icon |
| `common/img_amazones_logo.png` | 7.4 KB | Logo (transparency required) |
| `common/img_drAmazones_logo.png` | 13 KB | Logo (transparency required) |
| `common/img_sportip_logo.png` | 32 KB | Logo (transparency required) |
| `common/img_family.png` | 66 KB | Needs verification |
| `common/img_gym_people03.png` | 608 KB | Person cutout (transparency required) |
| `storedetail/img_storedetail_96point2_person01.png` | 591 KB | Person cutout (transparency required) |
| `storedetail/img_storedetail_96point2_person02.png` | 500 KB | Person cutout (transparency required) |
| `storedetail/img_storedetail_freetrial_speak_person01.png` | 81 KB | Person cutout (transparency required) |
| `storedetail/unnamed.png - unnamed(31).png` (32 files) | 1.6-7.7 KB each | Names not organized |
| `protein/protein_modal_*.png` (3 files) | 94-103 KB | Product images (may require transparency) |
| `top/img_recruit_img1-10.png` | 40-110 KB each | Recruitment images |
| `top/img_service1.png` | 94 KB | Service image |

---

## 2. SVG Files with Embedded Raster Images (PNG)

The following SVG files contain base64-encoded PNG images via `<image>` tags, which negates the benefits of SVG (lightweight, scalable). Re-export in the appropriate format is needed.

### img/top/ (11 files)

| File | Size | Notes |
|---|---|---|
| `bg_news_section.svg` | 189 KB | Effectively a PNG. Large size |
| `bg_service_topic.svg` | 195 KB | Effectively a PNG. Large size |
| `bg_topic.svg` | 20 KB | base64 PNG embedded |
| `img_trainingmachine_speechBubble1.svg` | - | base64 PNG embedded |
| `img_trainingmachine_speechBubble2.svg` | - | base64 PNG embedded |
| `img_triangle.svg` | - | base64 PNG embedded |
| `img_banner_speechbubble1.svg` | - | base64 PNG embedded |
| `img_banner_speechbubble2.svg` | - | base64 PNG embedded |
| `img_banner_sticker1.svg` | - | base64 PNG embedded |
| `img_topic_speech_bubbles1.svg` | - | base64 PNG embedded |
| `icon_amazones_no1.svg` | - | base64 PNG embedded |

### img/common/ (16 files)

| File | Notes |
|---|---|
| `icon_amazones_no1.svg` | base64 PNG embedded |
| `icon_energy_drink.svg` | base64 PNG embedded |
| `icon_stopwatch.svg` | base64 PNG embedded |
| `icon_heart_handshake.svg` | base64 PNG embedded |
| `icon_24_white.svg` | base64 PNG embedded |
| `icon_crown_gold.svg` | base64 PNG embedded |
| `icon_crown_silver.svg` | base64 PNG embedded |
| `icon_crown_bronze.svg` | base64 PNG embedded |
| `icon_ticket.svg` | base64 PNG embedded |
| `icon_diamond.svg` | base64 PNG embedded |
| `icon_water_bottle.svg` | base64 PNG embedded |
| `icon_gym_signage.svg` | base64 PNG embedded |
| `img_jcb_logo.svg` | base64 PNG embedded |
| `img_amex_logo.svg` | base64 PNG embedded |
| `img_dinersClub_logo.svg` | base64 PNG embedded |
| `img_sportip_logo.svg` | base64 PNG embedded |

### img/other directories (20 files)

| File | Notes |
|---|---|
| `personal/img_personal_program_illustration.svg` | base64 PNG embedded (large 1610x717 image) |
| `payment/img_payment_speak_bubble01.svg` | base64 PNG embedded |
| `payment/img_payment_speak_bubble02.svg` | base64 PNG embedded |
| `payment/img_payment_speak_bubble03.svg` | base64 PNG embedded |
| `protein/img_protein_speak_bubble01.svg` | base64 PNG embedded |
| `protein/img_protein_speak_bubble02.svg` | base64 PNG embedded |
| `member/img_member_speech_bubble1.svg` | base64 PNG embedded |
| `admission/icon_admission_speechBubble1.svg` | base64 PNG embedded |
| `admission/icon_admission_speechBubble3.svg` | base64 PNG embedded |
| `admission/icon_admission_speechBubble4.svg` | base64 PNG embedded |
| `sitemap/icon_sitemap_icon2.svg` | base64 PNG embedded |
| `reservation/bg_reservation.svg` | base64 PNG embedded |
| `price/img_price_speak_bubble01.svg` | base64 PNG embedded |
| `price/img_price_speak_bubble02.svg` | base64 PNG embedded |
| `price/img_price_speak_bubble03.svg` | base64 PNG embedded |
| `visitor/img_visitor_speak_bubble01.svg` | base64 PNG embedded |
| `visitor/img_visitor_speak_bubble02.svg` | base64 PNG embedded |
| `medical/img_medical02.svg` | base64 PNG embedded |
| `medical/img_medical_speak_bubble01.svg` | base64 PNG embedded |
| `medical/img_medical_speak_bubble02.svg` | base64 PNG embedded |

**Total: 47 SVG files** contain embedded raster images.

---

## 3. Gradient Images in img/top/

### Gradient Image List

The following gradient images have been created individually.

| File | Format | Size | Purpose |
|---|---|---|---|
| `bg_column.webp` | WebP | 9.7 KB | Column section background |
| `bg_column_sp.webp` | WebP | 4.0 KB | Column section background (SP) |
| `bg_news_banner_desk.webp` | WebP | 3.4 KB | News banner background (PC) |
| `bg_news_banner_sp.webp` | WebP | 2.4 KB | News banner background (SP) |
| `bg_news_section.webp` | WebP | 14 KB | News section background |
| `bg_news_section_sp.webp` | WebP | 2.9 KB | News section background (SP) |
| `bg_movie.webp` | WebP | 18 KB | Video section background |
| `bg_movie_sp.webp` | WebP | 3.6 KB | Video section background (SP) |
| `bg_price.webp` | WebP | 289 KB | Price section background |
| `bg_recruit.webp` | WebP | 154 KB | Recruitment section background |
| `bg_voice.webp` | WebP | 5.3 KB | Customer testimonials background |
| `bg_voice_sp.webp` | WebP | 2.8 KB | Customer testimonials background (SP) |
| `bg_service_topic.webp` | WebP | 20 KB | Service topic background |
| `bg_topic_sp.webp` | WebP | 3.9 KB | Topic background (SP) |
| `bg_training_machine.webp` | WebP | 6.3 KB | Training machine background |
| `bg_training_machine-sp.webp` | WebP | 3.1 KB | Training machine background (SP) |
| `bg_shop_training_machine.webp` | WebP | 23 KB | Shop/machine background |

### CSS Replacement Consideration

Many gradient images are expected to be **reproducible with CSS `linear-gradient` / `radial-gradient`**.

The following are particularly suitable for CSS gradient replacement:
- Single-color to 2-color gradient backgrounds (`bg_column`, `bg_news_banner_*`, `bg_movie*`, `bg_voice*`)
- Small gradient images (under 10KB)

The following may contain photos or textures and may be difficult to replace with CSS:
- `bg_price.webp` (289 KB)
- `bg_recruit.webp` (154 KB)

---

## 4. Pattern Images in img/top/

### Pattern Image List

| File | Format | Size | Notes |
|---|---|---|---|
| `bg_service_topic.svg` | SVG | 195 KB | base64 PNG embedded. Pattern-like background |
| `bg_service_topic.webp` | WebP | 20 KB | WebP version of the same pattern |
| `bg_shop_training_machine.webp` | WebP | 23 KB | Training machine area pattern |
| `bg_training_machine.webp` | WebP | 6.3 KB | Training machine background pattern |
| `bg_training_machine-sp.webp` | WebP | 3.1 KB | Same, SP version |

Additionally, pattern images exist in `img/common/`:

| File | Format | Size | CSS Reference |
|---|---|---|---|
| `bg_white_pattern.webp` | WebP | 9.8 KB | global.css line 8233 |
| `bg_camouflage01.webp` | WebP | 22 KB | global.css line 8164 |

### Unification Possibilities

- `bg_training_machine.webp` and `bg_shop_training_machine.webp` can be unified if they are similar pattern images
- Simple repeating patterns could be unified using CSS `background-repeat` + small tile images
- Complex patterns (such as camouflage) are difficult to replicate with CSS, so keeping them as images is reasonable

---

## 5. Duplicate Icons in common and top

The following **28 files** exist with the same name in both `img/common/` and `img/top/`.

| # | File Name | Format |
|---|---|---|
| 1 | `icon_24.svg` | SVG |
| 2 | `icon_24_outline_white.svg` | SVG |
| 3 | `icon_24_white.svg` | SVG |
| 4 | `icon_amazones_no1.svg` | SVG |
| 5 | `icon_amazones_shop.svg` | SVG |
| 6 | `icon_arrow.svg` | SVG |
| 7 | `icon_arrow_blue.svg` | SVG |
| 8 | `icon_blueLine.svg` | SVG |
| 9 | `icon_btn_green_arrow.svg` | SVG |
| 10 | `icon_check_calender.svg` | SVG |
| 11 | `icon_edit.svg` | SVG |
| 12 | `icon_energy.svg` | SVG |
| 13 | `icon_instragram.svg` | SVG |
| 14 | `icon_line.svg` | SVG |
| 15 | `icon_line_sp.svg` | SVG |
| 16 | `icon_logo.svg` | SVG |
| 17 | `icon_menu.svg` | SVG |
| 18 | `icon_plan.svg` | SVG |
| 19 | `icon_recruitment.svg` | SVG |
| 20 | `icon_scroll_arrow.svg` | SVG |
| 21 | `icon_search.svg` | SVG |
| 22 | `icon_speaker.svg` | SVG |
| 23 | `icon_videos.svg` | SVG |
| 24 | `icon_voice_image1.png` | PNG |
| 25 | `icon_voice_image2.png` | PNG |
| 26 | `icon_voice_image3.png` | PNG |
| 27 | `icon_voice_image4.png` | PNG |
| 28 | `icon_youtube.svg` | SVG |

These should be unified under `common/`, with duplicate files in `top/` deleted and HTML paths updated to `assets/img/common/`.

---

## 6. Usage Status of img/common/bg_hero

### File List (PC + SP + Part Images)

#### Main Images (PC + SP)

| File | Size |
|---|---|
| `bg_hero1.png` | 2.2 MB |
| `bg_hero1_sp.png` | 461 KB |
| `bg_hero2.png` | 1.7 MB |
| `bg_hero2_sp.png` | 292 KB |
| `bg_hero3.png` | 2.6 MB |
| `bg_hero3_sp.png` | 439 KB |
| `bg_hero4.png` | 1.8 MB |
| `bg_hero4_sp.png` | 335 KB |
| `bg_hero5.png` | 2.8 MB |
| `bg_hero5_sp.png` | 398 KB |

#### Part Images (WebP + some JPG)

- `bg_hero1top_sp.webp`, `bg_hero1bottom_sp.webp`
- `bg_hero2top_left.webp`, `bg_hero2top_right.webp` (.jpg also exists), `bg_hero2top_sp.webp`, `bg_hero2bottom_sp.webp`
- `bg_hero3top_left.webp`, `bg_hero3top_right.webp`, `bg_hero3top_sp.webp`, `bg_hero3bottom_sp.webp`
- `bg_hero4top_left.webp`, `bg_hero4top_right.webp`, `bg_hero4top_sp.webp`, `bg_hero4bottom_sp.webp`
- `bg_hero5top_left.webp`, `bg_hero5top_right.webp` (.jpg also exists), `bg_hero5top_sp.webp`, `bg_hero5bottom_sp.webp`

### Usage Per Page

| Page | Hero Images Used | Lines |
|---|---|---|
| **Top Page** (`index.html`) | bg_hero1-5 (PC+SP, 5 each) | Lines 340-388 |
| **About Amazones** (`about/index.html`) | bg_hero1, bg_hero1_sp | Lines 507-510 |
| **AI Posture Diagnosis & Improvement** (`sportip/index.html`) | bg_hero2, bg_hero2_sp | Lines 461-464 |
| **Personal Training** (`personal/index.html`) | bg_hero3, bg_hero3_sp | Lines 337-340 |
| **Dr.Amazones** (`medical/index.html`) | bg_hero4, bg_hero4_sp | Lines 461-464 |

### Answer

**Yes, `common/bg_hero` images are used across multiple pages.**

| Image | Pages Used |
|---|---|
| bg_hero1 | Top + about |
| bg_hero2 | Top + sportip |
| bg_hero3 | Top + personal |
| bg_hero4 | Top + medical |
| bg_hero5 | Top only |

The top page uses all 5 images in a slider, while each subpage uses the one corresponding to its service as a hero image. Therefore, placing them in `common/` is appropriate.

### Notes

- `img/top/` also contains `bg_hero2-5.png` and `bg_hero_sp1-5.png`, which duplicate those in `common/`.
- Check whether the hero images in `top/` are referenced from HTML; if unused, they should be deleted.

---

## 7. Icons Unique to img/top/ (No Cleanup Needed)

The following exist only in `img/top/` and are exclusive to the top page.

| File Name | Purpose |
|---|---|
| `icon_1min.svg` | 1-minute icon |
| `icon_24hrs.svg` | 24-hour icon |
| `icon_30min.svg` | 30-minute icon |
| `icon_amazones_movie.svg` | Movie icon |
| `icon_movie_ribbon-sp.svg` | Movie ribbon (SP) |
| `icon_movie_ribbon.svg` | Movie ribbon |
| `icon_option.svg` | Option icon |
| `icon_ribbon_service.svg` | Service ribbon |
| `icon_training_machine.svg` | Training machine icon |

---

## Summary

| # | Issue | Status | Action Items |
|---|---|---|---|
| 1 | Photo images exported as PNG | Not improved | Convert 26+ files to JPG/WebP (estimated ~40MB reduction) |
| 2 | PNG embedded in SVG | Not improved | Re-export 47 files in appropriate formats |
| 3 | Gradient image unification/CSS conversion | Not improved | Small gradients can be CSS-ified. Those containing photos should remain as images |
| 4 | Pattern image unification | Not improved | Consider unifying similar patterns / CSS background-repeat conversion |
| 5 | Duplicate icons in common/top | Not improved | Unify 28 files under common, delete top duplicates |
| 6 | common/bg_hero usage status | Cross-page usage, common placement is appropriate | Consider deleting duplicate hero images in top/ |
| 7 | storedetail/unnamed*.png | Not organized | 32 files with unorganized names (renaming per naming conventions recommended) |
