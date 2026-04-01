# Step 3 実行計画: BEM記法・FLOCSSプレフィクスの修正

作成日: 2026-03-30
紐づき: `css-refactoring-plan.md` Step 3
準拠元: `cording-guideline.md`

---

## 目的

BEM記法違反（シングルアンダースコア `_` → ダブルアンダースコア `__` / モディファイア `--`）の修正、
および FLOCSSプレフィクス未付与クラスへの `l-` / `c-` / `p-` プレフィクス付与を行う。

---

## 最重要原則（再掲）

**フロントエンドの表示結果は一切変更しないこと。**
クラス名のリネームのみを行い、CSSルールの追加・削除・変更は一切行わない。

---

## 前提条件

- Step 1（変数定義の整備）完了済み
- Step 2（FLOCSSディレクトリ構成への分離）完了済み
- SCSSファイルは `assets/scss/` 配下の FLOCSS構成に分離済み

---

## 作業上の共通ルール

1. **各クラスについて SCSS → CSS → HTML → JS の全参照を検索し漏れなく置換する**
2. **1サブタスクずつ進め、都度SCSSコンパイルで出力CSSが同等であることを確認する**
3. **WordPress由来のクラス（`page_item`, `widget_recent_entries` 等）は外部依存のため対象外とする**
4. **複数ファイルで同名クラスが定義されている場合、全定義箇所を漏れなく置換する**
5. **JS内のクラス参照は `querySelector`, `classList`, `className`, `getElementsByClassName` 等を検索する**

---

## 影響範囲サマリ

| サブタスク | 対象クラス数 | SCSS | HTML | JS |
|-----------|:----------:|:----:|:----:|:--:|
| 3-1. BEM区切り文字修正 | ~80 | 8ファイル | 全23ページ | global.js, storedetail.js |
| 3-2. `l-` プレフィクス付与 | ~47 | 2ファイル | 全23ページ | global.js |
| 3-3. `c-` プレフィクス付与 | ~56 | 12ファイル | 全23ページ | global.js |
| 3-4. `p-` プレフィクス付与 | ~60 | 5ファイル | 5ページ | global.js, common.js |

---

## サブタスク 3-1: BEM区切り文字の修正（`_` → `__` / `--`）

### 概要

シングルアンダースコア `_` をBEM要素セパレータ `__` またはモディファイア `--` に修正する。
camelCase（`titleContainer`）も kebab-case（`title-container`）に統一する。

### 3-1-A. Announcement コンポーネント

| 現状 | 修正後 | SCSSファイル | SCSS行 |
|------|--------|-------------|--------|
| `.c-announcement_section` | `.c-announcement__section` | `object/component/_announcement.scss` | 4 |
| `.c-announcement_titleContainer` | `.c-announcement__title-container` | `object/component/_announcement.scss` | 25, 32, 38 |
| `.c-announcement_body` | `.c-announcement__body` | `object/component/_announcement.scss` | 43, 50 |
| `.c-announcement_btn` | `.c-announcement__btn` | `object/component/_announcement.scss` | 56 |

**レスポンシブ参照**: `_global-responsive.scss` 内にも同名セレクタあり（38, 43, 113, 120, 124, 128, 133行目付近）
**他ファイル参照**: `_medical.scss`（1054, 1062, 1067, 1068, 1172行目付近）、`_btn.scss`（54, 59行目）
**HTML**: 複数ページで使用
**JS**: なし

### 3-1-B. Section コンポーネント

| 現状 | 修正後 | SCSSファイル | SCSS行 |
|------|--------|-------------|--------|
| `.c-section_white` | `.c-section--white` | `object/component/_announcement.scss` | 69 |
| `.c-section_lightBlue` | `.c-section--light-blue` | `object/component/_announcement.scss` | 82 |
| `.c-section_white--padded` | `.c-section--white-padded` | `_global-responsive.scss` | 1517 |
| `.c-section_lightBlue--padded` | `.c-section--light-blue-padded` | `_global-responsive.scss` | 1305 |
| `.c-section_lightBlue--padded-50` | `.c-section--light-blue-padded-50` | `_global-responsive.scss` | 1521 |

**注意**: `_white` / `_lightBlue` はモディファイアなので `--` を使用。既に `--padded` が付いた混合構文あり。
**HTML**: `sportip/index.html`, `protein/index.html`, `medical/index.html` 等
**他ファイル参照**: `_protein.scss`（710, 769, 795, 802, 809, 814, 828, 833行目付近）

### 3-1-C. EndNote コンポーネント

| 現状 | 修正後 | SCSSファイル | SCSS行 |
|------|--------|-------------|--------|
| `.c-endNote_section` | `.c-end-note__section` | `object/component/_endnote.scss` | 該当行 |
| `.c-endNote_card` | `.c-end-note__card` | `object/component/_endnote.scss` | 該当行 |
| `.c-endNote_card_header` | `.c-end-note__card-header` | `object/component/_endnote.scss` | 該当行 |
| `.c-endNote_card_icon` | `.c-end-note__card-icon` | `object/component/_endnote.scss` | 該当行 |
| `.c-endNote_card_body` | `.c-end-note__card-body` | `object/component/_endnote.scss` | 該当行 |
| `.c-endNote_row` | `.c-end-note__row` | `object/component/_endnote.scss` | 該当行 |

**HTML**: 複数ページで使用
**JS**: なし

### 3-1-D. Button アイコン

| 現状 | 修正後 | SCSSファイル | SCSS行 |
|------|--------|-------------|--------|
| `.btn_icn_light_blue` | `.c-btn-icon--light-blue` | `object/component/_btn.scss` | 82, 91, 97 |

**HTML**: `payment/index.html`(1097), `reservation/index.html`(1170), `price/index.html`(1662), `storelist/[slag]/index.html`(8431)
**JS**: なし

### 3-1-E. Accordion / FAQ 関連

| 現状 | 修正後 | SCSSファイル | SCSS行 |
|------|--------|-------------|--------|
| `.accordion_inner` | `.c-faq__accordion-inner` | `_global-responsive.scss` | 1542, 1556 |
| `.accordion_header` | `.c-faq__accordion-header` | `_global-responsive.scss` | 1563 |
| `.one_i` | `.c-faq__toggle-icon` | `_global-responsive.scss` | 1563 |
| `.vertical_line` | `.c-faq__icon-vertical-line` | `object/project/_storedetail-introduction.scss` | 2814 |

**注意**: HTML側で `c-faq__accordion_inner`（シングル `_`）が使われている可能性あり。HTML側も合わせて修正。
**HTML**: 8+ページで使用
**JS**: なし

### 3-1-F. Recommended ボタン

| 現状 | 修正後 | SCSSファイル | SCSS行 |
|------|--------|-------------|--------|
| `.c-recommended_btn` | `.c-recommended__btn` | `object/project/_column-slag.scss` | 333 |
| `.p-recommended_btn` | `.p-recommended__btn` | `object/project/_point_redemption.scss` | 177 |

### 3-1-G. Storedetail プロジェクト（最大ボリューム: ~50クラス）

| 現状 | 修正後 | SCSS行 |
|------|--------|--------|
| `.p-storedetail_topic_header` | `.p-storedetail__topic-header` | 6, 16, 21 |
| `.p-storedetail_topic_break` | `.p-storedetail__topic-break` | 27 |
| `.p-storedetail_links-nav` | `.p-storedetail__links-nav` | 102 |
| `.p-storedetail_links-item` | `.p-storedetail__links-item` | 111, 124 |
| `.p-storedetail_links-divider` | `.p-storedetail__links-divider` | 128 |
| `.p-service_slider_wrapper` | `.p-service__slider-wrapper` | 137 |
| `.p-service_nav` | `.p-service__nav` | 141 |
| `.p-storedetail_opening_block` | `.p-storedetail__opening-block` | 145 |
| `.p-storedetail_opening_header` | `.p-storedetail__opening-header` | 152, 157, 163 |
| `.p-storedetail_opening_jump` | `.p-storedetail__opening-jump` | 169, 173 |
| `.p-storedetail_facility-tile` | `.p-storedetail__facility-tile` | 173 |
| `.p-storedetail_introduction_ribbon` | `.p-storedetail__introduction-ribbon` | 183 |
| `.p-storedetail_introduction_people` | `.p-storedetail__introduction-people` | 194, 205 |
| `.p-storedetail_introduction_people-img` | `.p-storedetail__introduction-people-img` | 205, 209, 212 |
| `.p-storedetail_introduction_people-img--01` | `.p-storedetail__introduction-people-img--01` | 209 |
| `.p-storedetail_introduction_people-img--02` | `.p-storedetail__introduction-people-img--02` | 212 |
| `.p-storedetail_gray_container` | `.p-storedetail__gray-container` | 218 |
| `.p-storedetail_cutout` | `.p-storedetail__cutout` | 228 |
| `.p-storedetail_map` | `.p-storedetail__map` | 237 |
| `.p-storedetail_price_image_container` | `.p-storedetail__price-image-container` | 293 |
| `.p-storedetail_price_image_left` | `.p-storedetail__price-image-left` | 316 |
| `.p-storedetail_price_image_right` | `.p-storedetail__price-image-right` | 320 |
| `.p-storedetail_whychooseus_text_container_left` | `.p-storedetail__whychooseus-text-left` | 325 |
| `.p-storedetail_whychooseus_text_container_right` | `.p-storedetail__whychooseus-text-right` | 338 |
| `.p-storedetail_reason_img01` | `.p-storedetail__reason-img01` | 351 |
| `.p-storedetail_reason_img02` | `.p-storedetail__reason-img02` | 369 |
| `.p-storedetail_reason_img03` | `.p-storedetail__reason-img03` | 379 |
| `.p-storedetail_reason_ribbon01` | `.p-storedetail__reason-ribbon01` | 389 |
| `.p-storedetail_reason_ribbon02` | `.p-storedetail__reason-ribbon02` | 399, 410 |
| `.p-storedetail_cta_container` | `.p-storedetail__cta-container` | 420 |
| `.p-storedetail_cta_ribbon` | `.p-storedetail__cta-ribbon` | 437 |
| `.p-storedetail_cta_content` | `.p-storedetail__cta-content` | 447 |
| `.p-storedetail_cta_heading` | `.p-storedetail__cta-heading` | 456 |
| `.p-storedetail_cta_stats` | `.p-storedetail__cta-stats` | 472 |
| `.p-storedetail_cta_stats_left` | `.p-storedetail__cta-stats-left` | 481 |
| `.p-storedetail_cta_stats_number` | `.p-storedetail__cta-stats-number` | 498 |
| `.p-storedetail_cta_note` | `.p-storedetail__cta-note` | 518 |
| `.p-storedetail_cta_note-mobile` | `.p-storedetail__cta-note-mobile` | 530 |
| `.p-storedetail_cta_people` | `.p-storedetail__cta-people` | 534 |
| `.p-storedetail_cta_person01` | `.p-storedetail__cta-person01` | 544 |
| `.p-storedetail_cta_person02` | `.p-storedetail__cta-person02` | 551 |
| `.p-storedetail_cta_btn` | `.p-storedetail__cta-btn` | 558 |
| `.p-storedetail_freetrial_speak_container01` | `.p-storedetail__freetrial-speak-container01` | 567 |
| `.p-storedetail_faq_ribbon` | `.p-storedetail__faq-ribbon` | 584 |
| `.p-storedetail_dr-amazones` | `.p-storedetail__dr-amazones` | 913 |
| `.p-storedetail_dr-amazones-pic` | `.p-storedetail__dr-amazones-pic` | 925 |
| `.p-storedetail_dr-amazones-content` | `.p-storedetail__dr-amazones-content` | 931 |
| `.p-storedetail_dr-amazones-triangle` | `.p-storedetail__dr-amazones-triangle` | 947 |
| `.p-storedetail_dr-amazones-inner` | `.p-storedetail__dr-amazones-inner` | 954 |
| `.p-storedetail_dr-amazones-header` | `.p-storedetail__dr-amazones-header` | 961 |
| `.p-storedetail_dr-amazones-label` | `.p-storedetail__dr-amazones-label` | 968 |
| `.p-storedetail_dr-amazones-body` | `.p-storedetail__dr-amazones-body` | 973 |
| `.p-storedetail_dr-amazones-btn` | `.p-storedetail__dr-amazones-btn` | 980 |

**SCSSファイル**: `object/project/_storedetail.scss`
**HTML**: `storelist/[slag]/index.html`
**JS**: `storedetail.js` で一部参照の可能性あり（要確認）

### 3-1-H. その他

| 現状 | 修正後 | SCSSファイル |
|------|--------|-------------|
| `.p-attraction_page` | `.p-attraction__page` | `object/project/_about.scss` (46) |
| `.p-protein_campaign_block` | `.p-protein__campaign-block` | `object/project/_family.scss` (197), `_point_redemption.scss` (456) |
| `.p-protein_campaign_header` | `.p-protein__campaign-header` | `object/project/_family.scss` (203), `_point_redemption.scss` (462) |
| `.storelist-text_size-heading` | `.storelist-text__size-heading` | `object/project/_storedetail-introduction.scss` (10787) |
| `.storelist-text_size-sub` | `.storelist-text__size-sub` | `object/project/_storedetail-introduction.scss` (10797) |
| `.c-banner-inner_two-lines` | `.c-banner__inner--two-lines` | `object/project/_storedetail-introduction.scss` (4480等) |

### 3-1 除外対象（WordPress由来）

以下のクラスは外部プラグイン由来のため修正対象外:

- `.page_item` — WordPress ページメニュー
- `.page_item_has_children` — WordPress サブメニュー
- `.widget_recent_entries` — WordPress ウィジェット

### 3-1 Phase A 実施時の追加修正・記録

#### 追加修正（実施済み）
- `.c-endNote` ブロック名を `.c-end-note` に変更（camelCase → kebab-case、ガイドライン準拠）

#### 3-1-D 命名修正（実施済み）
- `.btn_icn_light_blue` → `.c-btn-icon--light-blue` に変更。独立コンポーネントのため `__`（Element）ではなく Block + Modifier 構造に修正。3-3（c-プレフィクス付与）では対象外とする。

#### 後続Stepで対応が必要な事項
- **複合モディファイア `c-section--white-padded`**: BEM原則ではマルチクラス（`c-section--white` + `c-section--padded`）に分離すべきだが、CSS構造変更を伴うためリネーム範囲外。Phase 6 の別Stepとして計画する。
- **`storelist-text__size-heading` / `storelist-text__size-sub`**: FLOCSSプレフィクスなし。3-4（p-プレフィクス付与）で `p-storelist-text__size-heading` 等に変更する。

---

## サブタスク 3-2: Layout系クラスへの `l-` プレフィクス付与

### 概要

ヘッダー・フッター・ナビゲーション等のレイアウト系クラスに `l-` プレフィクスを付与する。

### 3-2-A. ヘッダー関連（SCSSファイル: `layout/_header.scss`）

| 現状 | 修正後 | SCSS行 | HTML | JS(global.js) |
|------|--------|--------|------|----------------|
| `.header-btn` | `.l-header__btn` | 11-26 | 全23ページ | — |
| `.header-btn__content` | `.l-header__btn-content` | 40 | 全23ページ | — |
| `.header-btn__text` | `.l-header__btn-text` | 46 | 全23ページ | — |
| `.header-btn--reservation` | `.l-header__btn--reservation` | 37-39 | 全23ページ | — |
| `.header-floating-menu` | `.l-header-floating-menu` | 53-69, 85-88 | 全23ページ | 53, 60, 61, 68, 76, 77, 85, 100, 113, 170 |
| `.floating-menu-btn` | `.l-header-floating-menu__btn` | 70-75 | 全23ページ | 51, 84, 85, 104, 107 |
| `.floating-menu-content` | `.l-header-floating-menu__content` | 90-100 | 全23ページ | 52, 86, 89, 104, 106 |
| `.mobile-header-overlay` | `.l-mobile-header-overlay` | 199-220 | 全23ページ | 166, 187, 199, 202 |
| `.sp-nav-header` | `.l-sp-nav__header` | 223-229 | 未使用の可能性 | — |
| `.sp-nav-logo` | `.l-sp-nav__logo` | 230-233 | 未使用の可能性 | — |
| `.sp-nav-close` | `.l-sp-nav__close` | 234-244 | 未確認 | 184 |
| `.sp-nav-main` | `.l-sp-nav__main` | 245-247 | 全23ページ | — |
| `.sp-nav-section` | `.l-sp-nav__section` | 248-250, 294-300, 311-314 | 全23ページ(複数箇所) | 178, 179 |
| `.sp-nav-head` | `.l-sp-nav__head` | 251-265 | 全23ページ(複数箇所) | — |
| `.sp-nav-plus` | `.l-sp-nav__plus` | 266-300 | 全23ページ(複数箇所) | — |
| `.sp-nav-list` | `.l-sp-nav__list` | 301-320 | 全23ページ(複数箇所) | — |
| `.sp-nav-link` | `.l-sp-nav__link` | 322-337 | 全23ページ(複数箇所) | — |
| `.sp-nav-sns-icon` | `.l-sp-nav__sns-icon` | 333-337 | 全23ページ | — |
| `.sp-nav-sub` | `.l-sp-nav__sub` | 338-346 | 全23ページ | — |
| `.sp-nav-btns` | `.l-sp-nav__btns` | 341-354 | 全23ページ | — |
| `.sp-nav-btn` | `.l-sp-nav__btn` | 355-367 | 未確認 | — |
| `.sp-nav-utility` | `.l-sp-nav__utility` | 368-383 | 全23ページ | — |
| `.mobile-hamburger` | `.l-header__hamburger` | 384-532 | 全23ページ | 167, 171, 188, 200, 203 |
| `.sp-header-btn` | `.l-header__sp-btn` | 387-391 | `information/index.html` | — |

**注意**: `.header-floating-menu` は `layout/_footer.scss` (5-9行) にも参照あり。

### 3-2-B. フッター関連（SCSSファイル: `layout/_footer.scss`）

| 現状 | 修正後 | SCSS行 | HTML | JS(global.js) |
|------|--------|--------|------|----------------|
| `.nav-menu-popup` | `.l-nav-menu-popup` | 12-151 | 全23ページ | 54, 61, 62, 69, 77, 87, 94, 102, 114, 117 |
| `.nav-menu-popup__columns` | `.l-nav-menu-popup__columns` | 36-41 | 全23ページ | — |
| `.nav-menu-popup__column` | `.l-nav-menu-popup__column` | 42-46 | 全23ページ | — |
| `.nav-menu-popup__group` | `.l-nav-menu-popup__group` | 47-51 | 全23ページ | — |
| `.nav-menu-popup__section` | `.l-nav-menu-popup__section` | 52-56 | 全23ページ(複数) | — |
| `.nav-menu-popup__links` | `.l-nav-menu-popup__links` | 57-62 | 全23ページ | — |
| `.nav-menu-popup__bottom` | `.l-nav-menu-popup__bottom` | 63-68 | 全23ページ | — |
| `.nav-menu-popup__bottom-btns` | `.l-nav-menu-popup__bottom-btns` | 69-73 | 全23ページ | — |
| `.nav-menu-popup__bottom-links` | `.l-nav-menu-popup__bottom-links` | 74-79 | 全23ページ | — |
| `.footer-main-container` | `.l-footer__main-container` | 164-169 | 全23ページ | — |
| `.footer-top` | `.l-footer__top` | 172-178 | 全23ページ | — |
| `.footer-brand` | `.l-footer__brand` | 181-187 | 全23ページ | — |
| `.footer-brand-logo` | `.l-footer__brand-logo` | 189-198 | 全23ページ | — |
| `.footer-cta-links` | `.l-footer__cta-links` | 200-204 | 全23ページ | — |
| `.footer-nav-columns` | `.l-footer__nav-columns` | 207-212 | 全23ページ | — |
| `.footer-nav-section` | `.l-footer__nav-section` | 215-229 | 全23ページ(複数) | 1062, 1067 |
| `.footer-nav-group` | `.l-footer__nav-group` | 225-229 | 全23ページ | — |
| `.footer-page-link` | `.l-footer__page-link` | 232-350 | 全23ページ(複数) | 1055, 1061, 1062, 1064 |
| `.footer-link-line` | `.l-footer__link-line` | 252-259 | 全23ページ(複数) | — |
| `.footer-nav-list` | `.l-footer__nav-list` | 269-287 | 全23ページ(複数) | — |
| `.footer-icon-link` | `.l-footer__icon-link` | 290-299 | 全23ページ(複数) | — |
| `.footer-bottom` | `.l-footer__bottom` | 306-312 | 全23ページ | — |
| `.footer-legal-links` | `.l-footer__legal-links` | 314-320 | 全23ページ | 1062, 1066 |
| `.footer-blue-btn` | `.l-footer__blue-btn` | 462付近 | 全23ページ(複数) | — |
| `.footer-btn` | `.l-footer__btn` | 335 | 全23ページ | 1023 |

### 3-2-C. その他

| 現状 | 修正後 | SCSSファイル | SCSS行 | JS |
|------|--------|-------------|--------|-----|
| `.scroll-up` | `.l-scroll-up` | `layout/_footer.scss` | 321-328 | global.js:1075 |

---

## サブタスク 3-3: Component系クラスへの `c-` プレフィクス付与

### 概要

再利用可能なコンポーネントクラスに `c-` プレフィクスを付与する。

### 3-3-A. アニメーション関連（SCSSファイル: `object/component/_animation.scss`）

| 現状 | 修正後 | SCSS行 | HTML出現数 | JS(global.js) |
|------|--------|--------|:----------:|----------------|
| `.reveal` | `.c-reveal` | 7 | ~677 | 723 |
| `.reveal-left` | `.c-reveal--left` | 20 | ~14 | 723 |
| `.reveal-right` | `.c-reveal--right` | 33 | ~14 | 723 |
| `.reveal-scale` | `.c-reveal--scale` | 46 | ~253 | 723 |
| `.hover-text-underline` | `.c-hover-text-underline` | 61 | 0(未使用?) | — |

**リスク: 高** — `.reveal` は全ページで大量使用（677箇所）。置換漏れに最大限注意。
**JS依存**: `global.js` 723行目で `IntersectionObserver` のターゲットとして参照。

### 3-3-B. ボタン関連（SCSSファイル: `object/component/_btn.scss`）

| 現状 | 修正後 | SCSS行 | HTML出現数 | JS |
|------|--------|--------|:----------:|-----|
| `.btn-green-wrapper` | `.c-btn--green-wrapper` | 13 | ~62 | — |
| `.btn-light-blue` | `.c-btn--light-blue` | 34 | ~193 | — |
| `.btn-light-blue02` | `.c-btn--light-blue02` | 66 | ~7 | — |
| `.btn-red` | `.c-btn--red` | 112 | ~4 | — |

**`.btn` 単体（445箇所）も `c-btn` に変更する。** ガイドラインで `_btn.scss` は Object/Component に分類されており、`c-btn` が正しい。

### 3-3-C. スピーチバブル（SCSSファイル: `object/component/_speech-bubble.scss`）

| 現状 | 修正後 | SCSS行 | HTML出現数 | JS(global.js) |
|------|--------|--------|:----------:|----------------|
| `.speech-bubble` | `.c-speech-bubble` | 4 | ~61 | 147 |

### 3-3-D. リボン・ヒーロー関連（SCSSファイル: `object/component/_ribbon.scss`, `_hero.scss`）

| 現状 | 修正後 | SCSSファイル | HTML出現数 | JS(global.js) |
|------|--------|-------------|:----------:|----------------|
| `.hero-ribbon` | `.c-hero-ribbon` | `_ribbon.scss` (11) | ~1 | — |
| `.grow-wrapper-right` | `.c-grow-wrapper-right` | `_ribbon.scss` (4) | ~13 | — |
| `.clip-grow-right` | `.c-clip-grow-right` | `_ribbon.scss` (18) | ~50 | 148 |
| `.clip-img` | `.c-clip-img` | `_hero.scss` (29) | 0(子孫のみ?) | — |

### 3-3-E. スライダー関連（SCSSファイル: `object/component/_slider.scss`）

| 現状 | 修正後 | SCSS行 | HTML出現数 | JS(global.js) |
|------|--------|--------|:----------:|----------------|
| `.text-slider` | `.c-text-slider` | 26 | ~15 | 150 |
| `.topic-container` | `.c-topic-container` | 69 | ~3 | 150 |
| `.topic-section-header` | `.c-topic-section-header` | 77 | ~2 | — |
| `.topic-buttons-container` | `.c-topic-buttons-container` | 81 | ~5 | — |
| `.topic-slider` | `.c-topic-slider` | N/A | ~1 | 150 |
| `.topic-sticker` | `.c-topic-sticker` | 189 | ~2 | — |
| `.topic-speech-bubble` | `.c-topic-speech-bubble` | 195 | ~1 | — |
| `.topic-bg` | `.c-topic-bg` | 241 | ~1 | — |
| `.topic-ribbon` | `.c-topic-ribbon` | 248 | ~1 | — |

### 3-3-F. セクションヘッダー（SCSSファイル: `object/component/_section.scss`）

| 現状 | 修正後 | SCSS行 | HTML出現数 |
|------|--------|--------|:----------:|
| `.section-header-wrapper` | `.c-section-header__wrapper` | 4 | ~23 |
| `.section-header-text` | `.c-section-header__text` | 19 | ~24 |

### 3-3-G. Cookie通知（SCSSファイル: `object/component/_cookie.scss`）

| 現状 | 修正後 | SCSS行 | HTML出現数 | JS(global.js) |
|------|--------|--------|:----------:|----------------|
| `.cookie-notice` | `.c-cookie-notice` | 10 | ~23 | 1015 |
| `.cookie-notice-sub` | `.c-cookie-notice__sub` | 55 | 0 | — |

### 3-3-H. バナー関連（SCSSファイル: `object/component/_banner.scss`, `_footer-banner.scss`）

| 現状 | 修正後 | SCSSファイル | HTML出現数 |
|------|--------|-------------|:----------:|
| `.recruit-banner-section` | `.c-recruit-banner__section` | `_banner.scss` (4) | ~4 |
| `.recruit-banner` | `.c-recruit-banner` | `_banner.scss` (18) | ~4 |
| `.recruit-banner-track` | `.c-recruit-banner__track` | `_banner.scss` (50) | ~2 |
| `.recruit-banner-track2` | `.c-recruit-banner__track2` | `_banner.scss` (57) | ~1 |
| `.recruit-info` | `.c-recruit-info` | `_banner.scss` (26) | ~1 |
| `.banner-section` | `.c-banner-section` | `_banner.scss` (187) | ~19 |
| `.banner-speechbubble1` | `.c-banner__speechbubble1` | `_footer-banner.scss` (31) | 0 |
| `.banner-speechbubble2` | `.c-banner__speechbubble2` | `_footer-banner.scss` (41) | 0 |
| `.banner-sticker2` | `.c-banner__sticker2` | `_footer-banner.scss` (36) | ~2 |
| `.banner-stickers-row` | `.c-banner__stickers-row` | `_footer-banner.scss` (138) | 0 |

### 3-3-I. ニュース関連（SCSSファイル: `_global-responsive.scss`）

| 現状 | 修正後 | SCSS行 | HTML出現数 |
|------|--------|--------|:----------:|
| `.panel-content` | `.c-panel-content` | 317 | ~117 |
| `.news-info-container` | `.c-news-info-container` | 342 | ~39 |

**リスク: 中** — `.panel-content` は117箇所と多い。

---

## サブタスク 3-4: Project系クラスへの `p-` プレフィクス付与

### 概要

ページ固有のクラスに `p-` プレフィクスを付与する。既に `p-` が付いているクラスは対象外。

### 3-4-A. Top ページ（SCSSファイル: `object/project/_top.scss`）

#### カルーセル・ヒーロー

| 現状 | 修正後 | SCSS行 |
|------|--------|--------|
| `.carousel-container` | `.p-top__carousel-container` | 5 |
| `.carousel-img-container` | `.p-top__carousel-img-container` | 14 |
| `.mySlides` | `.p-top__slides` | 20 |
| `.hero-text-slider-container` | `.p-top__hero-text-slider-container` | 60 |
| `.hero-text` | `.p-top__hero-text` | 69 |

**決定**: `.hero-text-slider-container` は top/about で共有のため `c-hero-text-slider-container`（共通コンポーネント）とする。3-3 で対応。

#### ニュースバナー

| 現状 | 修正後 | SCSS行 |
|------|--------|--------|
| `.news-banner-desk` | `.p-top__news-banner-desk` | 181 |
| `.news-banner-sp` | `.p-top__news-banner-sp` | 274 |
| `.news-banner-context` | `.p-top__news-banner-context` | 191 |
| `.news-banner__heading` | `.p-top__news-banner-heading` | 207 |
| `.news-30min-label` | `.p-top__news-30min-label` | 257 |
| `.news-banner-sticker1` | `.p-top__news-banner-sticker1` | 236 |
| `.news-banner-sticker2` | `.p-top__news-banner-sticker2` | 245 |
| `.news-banner-sticker3` | `.p-top__news-banner-sticker3` | 250 |
| `.news-banner-sticker4` | `.p-top__news-banner-sticker4` | (該当行) |
| `.news-ribbon-desk` | `.p-top__news-ribbon-desk` | 217 |
| `.news-ribbon-desk2` | `.p-top__news-ribbon-desk2` | 223 |

#### サービスセクション

| 現状 | 修正後 | SCSS行 | 他ファイル |
|------|--------|--------|-----------|
| `.service-container` | `.c-service__container` | 495 | `_storedetail.scss` (999) |
| `.service-wrapper` | `.c-service__wrapper` | 517 | `_storedetail.scss` (1036) |
| `.service-img` | `.c-service__img` | 543 | `_storedetail.scss` (1043) |
| `.service-wrapper2` | `.c-service__wrapper2` | 550 | `_storedetail.scss` (1048) |
| `.service-wrapper3` | `.c-service__wrapper3` | 554 | `_storedetail.scss` (1052) |
| `.service-section` | `.c-service__section` | 489 | — |
| `.service-ribbon` | `.c-service__ribbon` | 557 | — |

**決定**: `.service-*` はコンポーネント化（`c-service__*`）。top/storedetail で共有。SCSSは `object/component/_service.scss` に集約も検討。

#### Dr.Amazonesセクション

| 現状 | 修正後 | SCSS行 | 他ファイル |
|------|--------|--------|-----------|
| `.dr-amazones-container` | `.c-dr-amazones__container` | 682 | `_storedetail.scss`(1342), `_point_redemption.scss`(360) |
| `.dr-amazones-section` | `.c-dr-amazones__section` | 692 | `_storedetail.scss`(1352), `_point_redemption.scss`(366) |
| `.dr-amazones-section__inner` | `.c-dr-amazones__inner` | 706 | — |
| `.dr-amazones-section__header` | `.c-dr-amazones__header` | 711 | — |
| `.dr-amazones-section__body` | `.c-dr-amazones__body` | 716 | — |

**決定**: `.dr-amazones-*` はコンポーネント化（`c-dr-amazones__*`）。top/storedetail/point_redemption の3ページで共有。SCSSは `object/component/_dr-amazones.scss` に集約も検討。storedetail側の `p-storedetail_dr-amazones` も 3-1-G で `c-dr-amazones__*` に統合する。

#### トレーニングマシンセクション

| 現状 | 修正後 | SCSS行 |
|------|--------|--------|
| `.training-machine-section` | `.p-top__training-machine-section` | 786 |
| `.training-machine-container` | `.p-top__training-machine-container` | 798 |
| `.training-machine__info` | `.p-top__training-machine-info` | 805 |
| `.training-machine-label` | `.p-top__training-machine-label` | 812 |
| `.training-sticker1` | `.p-top__training-sticker1` | 824 |
| `.training-sticker2` | `.p-top__training-sticker2` | 834 |
| `.training-speech-bubble1` | `.p-top__training-speech-bubble1` | 829 |
| `.training-speech-bubble2` | `.p-top__training-speech-bubble2` | 839 |

#### ボイスセクション

| 現状 | 修正後 | SCSS行 |
|------|--------|--------|
| `.voice-section` | `.p-top__voice-section` | 887 |
| `.voice-section__inner` | `.p-top__voice-inner` | 895 |
| `.voice-section__header` | `.p-top__voice-header` | 900 |
| `.voice-section__sub-text` | `.p-top__voice-sub-text` | 907 |
| `.voice-section__sub-text__inner` | `.p-top__voice-sub-text-inner` | 914 |
| `.voice-slide-content` | `.p-top__voice-slide-content` | 920 |
| `.voice-img-box` | `.p-top__voice-img-box` | 926 |
| `.voice-slide` | `.p-top__voice-slide` | 933 |
| `.voice-label` | `.p-top__voice-label` | 938 |
| `.voice-name` | `.p-top__voice-name` | 945 |

#### ムービーセクション

| 現状 | 修正後 | SCSS行 |
|------|--------|--------|
| `.movie-section` | `.p-top__movie-section` | 1014 |
| `.movie-section__header` | `.p-top__movie-header` | 1025 |
| `.movie-section__info` | `.p-top__movie-info` | 1031 |
| `.movie-section__label-inner` | `.p-top__movie-label-inner` | 1037 |
| `.movie-section__thumbs` | `.p-top__movie-thumbs` | 1043 |
| `.movie-section-container` | `.p-top__movie-container` | 1049 |
| `.movie-thumbnail` | `.p-top__movie-thumbnail` | 1056 |
| `.movie-video` | `.p-top__movie-video` | 1061 |
| `.movie-sticker-container` | `.p-top__movie-sticker-container` | 1082 |
| `.movie-sticker-girl` | `.p-top__movie-sticker-girl` | (該当行) |
| `.movie-sticker1` | `.p-top__movie-sticker1` | (該当行) |
| `.movie-sticker2` | `.p-top__movie-sticker2` | (該当行) |
| `.movie-ribbon` | `.p-top__movie-ribbon` | (該当行) |
| `.movie-sticker-container-sp` | `.p-top__movie-sticker-container-sp` | 1188 |
| `.movie-sticker-sp1` | `.p-top__movie-sticker-sp1` | 1197 |
| `.movie-sticker-sp2` | `.p-top__movie-sticker-sp2` | 1202 |
| `.movie-ribbon-sp` | `.p-top__movie-ribbon-sp` | 1207 |

**HTML**: `index.html` のみ
**JS**: `common.js` でカルーセル制御に一部参照の可能性あり

### 3-4-B. その他ページ

`.hero-text-slider-container` が `_about.scss` で重複使用されている以外は、
他のプロジェクトファイル（medical, protein, payment, personal, reservation 等）は
既に `p-` プレフィクスが付与済み。

---

## 実行順序

リスクと影響範囲を考慮し、以下の順序で実施する:

### Phase A: 低リスク・少量（まず感触をつかむ）

1. **3-1-F**: Recommended ボタン（2クラス）
2. **3-1-C**: EndNote コンポーネント（6クラス）
3. **3-1-A**: Announcement コンポーネント（4クラス）
4. **3-1-B**: Section コンポーネント（5クラス）
5. **3-1-D**: Button アイコン（1クラス）
6. **3-1-H**: その他 BEM修正（6クラス）

### Phase B: 中リスク・中量

7. **3-3-F**: Section ヘッダー `c-` 付与（2クラス）
8. **3-3-G**: Cookie通知 `c-` 付与（2クラス）
9. **3-3-C**: スピーチバブル `c-` 付与（1クラス）
10. **3-3-D**: リボン・ヒーロー `c-` 付与（4クラス）
11. **3-3-E**: スライダー `c-` 付与（9クラス）
12. **3-3-H**: バナー `c-` 付与（10クラス）
13. **3-1-E**: Accordion / FAQ（4クラス）

### Phase C: 高リスク・大量（慎重に）

14. **3-3-B**: ボタン `c-` 付与（4クラス、193箇所等）
15. **3-3-I**: ニュース関連 `c-` 付与（2クラス、117箇所等）
16. **3-3-A**: アニメーション `c-` 付与（5クラス、677箇所等）— **最大リスク**

### Phase D: Layout系（全ページ影響）

17. **3-2-C**: scroll-up（1クラス）
18. **3-2-B**: フッター `l-` 付与（~25クラス）
19. **3-2-A**: ヘッダー `l-` 付与（~22クラス）

### Phase E: Project系

20. **3-4-B**: About等の個別修正
21. **3-4-A**: Top ページ `p-` 付与（~60クラス）
22. **3-1-G**: Storedetail BEM修正（~50クラス）— **最大ボリューム**

---

## リスク評価

### 高リスク箇所

| 対象 | リスク要因 | 対策 |
|------|-----------|------|
| `.reveal` (677箇所) | 全ページ大量使用、JS依存 | 正規表現で一括置換後、全ページの目視確認 |
| `.btn-light-blue` (193箇所) | 多数のHTMLで使用 | ファイル別に段階的置換 |
| `.panel-content` (117箇所) | 多数のHTMLで使用 | 同上 |
| Layout系全般 | 全23ページに影響、JS依存多数 | global.js のクラス参照を事前にリスト化し、SCSS/HTML/JS を同時に置換 |
| Storedetail BEM修正 | 50クラスの大量置換 | `storelist/[slag]/index.html` 1ファイルに集中。HTMLファイルを1回で完了 |

### WordPress由来の除外対象

- `.page_item`, `.page_item_has_children`, `.widget_recent_entries`
- `storedetail-introduction.scss` 内の旧WordPress構造は Step 5（セレクタ深さ修正）で対応

### 決定済み事項

1. **`.btn` 単体** → **`c-btn`**（コンポーネント）。ガイドラインで `_btn.scss` は Object/Component に分類、`c-btn1` が例示されている。
2. **`.hero-text-slider-container`** → **`c-hero-text-slider-container`**（共通コンポーネント化）。top/about で共有するため。
3. **`.service-*` クラス** → **`c-service-*`**（共通コンポーネント化）。top/storedetail で共有するため。SCSSは `object/component/_service.scss` に集約も検討。
4. **`.dr-amazones-*`** → **`c-dr-amazones-*`**（共通コンポーネント化）。top/storedetail/point_redemption の3ページで共有するため。SCSSは `object/component/_dr-amazones.scss` に集約も検討。

---

## 検証方法

各Phase完了時に以下を実施:

1. **SCSSコンパイル**: エラーなくコンパイルが通ることを確認
2. **CSS差分確認**: コンパイル後のCSSでセレクタ名のみが変わり、プロパティ値は変わっていないことを確認
3. **HTML grep**: 旧クラス名がHTML内に残っていないことを確認
4. **JS grep**: 旧クラス名がJS内に残っていないことを確認
5. **ブラウザ確認**: 主要ページ（top, storedetail, medical, protein）の見た目が変わっていないことを確認
