# フィードバック対応: 調査結果・方針・コンテキスト全量まとめ

> このファイルは、先方フィードバックへの対応にあたり、調査結果と議論内容を次のチャットに引き継ぐためのコンテキストドキュメントです。

---

## 1. 先方からのフィードバック原文

### フィードバック1: ユーティリティクラスの多用

> ガイドラインに準拠するとHTMLもCSSもユーティリティクラスを使用する頻度は下がると想定していましたが、現時点でも `c-panel-content-text-desk c-news-info__last-text u-fw-500 u-fs-16 u-ls-20` のような構成は改善が難しいということでしょうか。
> ユーティリティをコンポーネントで上書きしていることも気になる点となっております。

### フィードバック2: テキスト関連ユーティリティ

> `u-font-zen u-fw-500 u-fs-16` などテキスト関連のユーティリティクラスに関しまして、全体を通して `zen kaku gothic new` `weight Medium（500基準）`のデザインに見えていましたが、ユーティリティクラスで吸収しないと難しいでしょうか。
> 特に `u-font-zen` に関してはhtml bodyにて `var(--font-zen)` 指定があるので、本来であれば指定不要だと想定しています。

### フィードバック3: 重複コンポーネント

> 各ページごとにCSSやJSを作成いただくのは問題ないのですが、ページ特有のデザインではなくほぼ同一デザインのコンポーネントが存在している場合があるため、精査をお願いいたします。
> 例） `p-reservation-flow__nav p-faq__nav` ほぼ同一デザイン
> `c-footer-banner c-announcement__section` ほぼ同一デザイン

### フィードバック4: global.js / common.js の使い分け

> global.js common.jsの使い分けについて以前言及していましたが、使い分けの判断をご提示いただけますでしょうか。（global common はほぼ同義だと認識しております）

---

## 2. 他エンジニアの調査結果（5ドキュメント）

`docs/otherengineers-opinion/` に以下の5ファイルが格納されている。

### 2-1. フィードバック_ユーティリティクラス改善.md

#### 数値

| 指標 | 値 |
|------|-----|
| HTML全体の `u-*` クラス使用数 | **4,793箇所** |
| 3個以上の `u-*` を持つ要素数 | **1,849要素** |
| 最大で1要素に付与された `u-*` 数 | **6個** |

#### クライアント指摘例の所在

`c-panel-content-text-desk c-news-info__last-text u-fw-500 u-fs-16 u-ls-20` は以下に存在:

- `index.html` — 16箇所（L450, 460, 470, 480, 496, 506, 516, 526, 543, 553, 563, 573, 590, 600, 610, 620）
- `information/index.html` — 23箇所（L438〜987）
- 計39箇所

#### 繰り返し出現するユーティリティ過多パターン

| パターン | 出現数 | 所在 |
|----------|--------|------|
| `u-font-outfit u-fs-12 u-text-white u-ls-10 u-fw-500 text-vertical` | 全ページ共通 | フローティングメニュー |
| `c-section-header__text u-fs-100 u-lh-normal u-font-outfit u-fw-400` | 10ページ以上 | セクションヘッダー |
| `u-fw-500 u-fs-16 u-text-white u-lh-200` | index.html, information 等 | テキスト要素 |
| `u-font-zen u-text-lightBlue u-fs-24 u-fw-600 u-lh-100` | medical, top 等 | 見出し・バッジ |

#### SCSS 読み込み順の問題

`global.scss` の現在のimport順:

```
1. foundation（変数・リセット）
2. utility（u-* ← 先に読み込み）  ← 詳細度が低い
3. component（c-*）
4. layout（l-*）
5. project（p-*）               ← 後に読み込み = 同詳細度なら勝つ
```

ユーティリティが先に読み込まれるため、同じ詳細度のコンポーネント/プロジェクトルールに負ける。

#### 上書きの具体例

| # | HTML要素 | ユーティリティ | 上書きするコンポーネント | 上書きされるプロパティ |
|---|----------|---------------|------------------------|---------------------|
| 1 | `about/index.html:937` `c-footer-banner__heading-accent u-fs-60` | `u-fs-60` → font-size: 60px | `_global-responsive.scss:1919` | font-size → var(--fs-3xl) に上書き（SP時） |
| 2 | `about/index.html:859` `c-price-plan__btn u-mt-30 u-mx-auto` | `u-mt-30` → margin-top: 30px | `_global-responsive.scss:1087` | margin-top → 0 に上書き（SP時） |
| 3 | `index.html:683` `p-top__news-banner-last-text u-text-center` | `u-text-center` → text-align: center | `_top.scss` SP media query | text-align → left に上書き（SP時） |
| 4 | `admission/index.html:695` `c-btn--light-blue u-mt-20 u-ml-40` | `u-mt-20`, `u-ml-40` | `_admission.scss:384-387` SP media query | margin → 0 auto に上書き |
| 5 | `family/index.html:416` `p-family__summary__label u-fw-700 u-text-white` | `u-fw-700`, `u-text-white` | `_family.scss:82` | font-weight, color を再定義 |

#### コーディングガイドラインとの乖離

`docs/cording-guideline.md` より:
> **「Utility は最小限：乱用すると管理が難しくなるため、汎用性の高いものだけ」**
> **「Utility には font-size line-height margin padding 等の px 指定を追加せず、肥大化しないように留意する」**

現状は「コンポーネント固有のスタイルまでユーティリティで実現」しており、ガイドライン違反の状態。

---

### 2-2. フィードバック_テキストユーティリティ改善.md

#### 使用状況サマリ

| ユーティリティ | 現在の使用数 | body/html での設定 | 削除可能な見込み |
|---------------|-------------|-------------------|----------------|
| `u-font-zen` | **673箇所** | `html, body { font-family: var(--font-zen); }` 設定済み | 大半が削除可能 |
| `u-fw-500` | **2,233箇所** | `body { font-weight: ... }` **未設定** | body に 500 を追加すれば大半が削除可能 |
| `u-fs-16` | **708箇所** | `body { font-size: ... }` **未設定**（ブラウザデフォルト16px） | 明示的に 16px を設定すれば大半が削除可能 |

#### u-font-zen の例外

`_storedetail-introduction.scss` に以下の記述がある:

```scss
html {
  font-family: kozuka-gothic-pr6n, sans-serif;  // ← bodyの設定を上書き
}
```

storelist/[slag]/ ページではこの上書きにより `u-font-zen` で明示的に戻す必要がある箇所がある。

また、以下のコンポーネントが個別に別フォントを設定:

| SCSS ファイル | セレクタ | 設定フォント |
|--------------|----------|-------------|
| `_storedetail-introduction.scss` | `.c-heading-primary`, `.c-heading-white` 等 | interstate, sans-serif |
| `_storedetail-introduction.scss` | `.c-heading-secondary` | kozuka-gothic-pr6n |
| `_storedetail-introduction.scss` | `.c-heading-4dots-sub`, `.c-feature-item-heading` | mitimasu, sans-serif |
| `_header.scss` | `.l-sp-nav__head` | "Outfit", sans-serif |
| `_contact.scss` | `.p-contact__postal-prefix` 等 | var(--ff-latin)（未定義変数） |

#### u-fw-500 の詳細

ページ別使用数:

| ファイル | u-fw-500 | u-fw-700 | u-fw-300 | u-fw-600 | u-fw-400 |
|----------|----------|----------|----------|----------|----------|
| index.html | 190 | 49 | 28 | 2 | 14 |
| information/index.html | 162 | 4 | 0 | 0 | 1 |
| faq/index.html | 134 | 69 | 0 | 0 | 1 |
| protein/index.html | 142 | 25 | 0 | 46 | 2 |
| member/index.html | 112 | 26 | 14 | 1 | 2 |
| admission/index.html | 109 | 16 | 14 | 1 | 3 |
| column/[slag]/index.html | 105 | 8 | 0 | 0 | 2 |
| storelist/[slag]/index.html | 98 | 24 | 14 | 2 | 3 |
| point_redemption/index.html | 94 | 43 | 0 | 0 | 4 |
| rules/index.html | 94 | 29 | 0 | 25 | 1 |
| about/index.html | 87 | 19 | 0 | 2 | 6 |
| family/index.html | 86 | 26 | 14 | 5 | 3 |
| medical/index.html | 84 | 16 | 14 | 17 | 1 |
| （その他10ページ） | 合計536 | 合計72 | 合計112 | 合計6 | 合計16 |
| **合計** | **2,233** | **426** | **196** | **107** | **58** |

#### u-fw-500 の削除できないケース

| ケース | 理由 |
|--------|------|
| `<h1>`〜`<h6>` に付与 | ブラウザデフォルトが bold（700）のため、500 に下げるには明示指定が必要 |
| `<b>`, `<strong>` に付与 | 同上 |
| 親要素で別の font-weight が設定 | 継承値が 500 以外 |

#### u-fs-16 と u-fs-15 の発見

font-size ユーティリティの使用頻度:

| ユーティリティ | 使用数 | 備考 |
|---------------|--------|------|
| **u-fs-15** | **1,164** | 最多。デザイン基準サイズの可能性 |
| u-fs-16 | 708 | 2番目 |
| u-fs-14 | 379 | 3番目 |
| u-fs-18 | 258 | |
| u-fs-36 | 199 | |
| u-fs-24 | 136 | |
| u-fs-12 | 56 | |
| u-fs-100 | 24 | セクションヘッダー用 |

**→ デザイン基準サイズは 15px or 16px、要確認。ユーザーの判断により 16px で進めることが決定。**

---

### 2-3. フィードバック_重複コンポーネント精査.md

クライアント指摘の2例に加え、**計11パターン**の重複コンポーネントを検出。

#### 指摘例1: ページ内ナビゲーション（6箇所重複）★★★

| クラス名 | SCSSファイル | HTMLファイル |
|----------|------------|------------|
| `p-reservation-flow__nav` / `__nav-item` | `_reservation.scss` L88-112 | `reservation/index.html` L513-570 |
| `p-price__links-nav` / `__links-item` | `_price.scss` L5-28 | `price/index.html` L371-407 |
| `p-payment__links-nav` / `__links-item` | `_payment.scss` L70-95 | `payment/index.html` |
| `p-sportip__links-nav` / `__links-item` | `_sportip.scss` L169-193 | `sportip/index.html` |
| `p-storelist__links-nav` / `__links-item` | `_storelist.scss` L10-56 | `storelist/index.html` |
| `p-faq__nav` | `_faq.scss` L1-14 | `faq/index.html` L367-484 |
| `p-admission-nav` / `__link` | `_admission.scss` L7-22 | `admission/index.html` L371-410 |

グループA（reservation, price, payment, sportip）は**クラス名以外すべて同一**。

```scss
// 4ファイルで以下がほぼコピペ
.p-{page}__links-nav {
  display: flex;
  align-items: center;
  padding-top: 3rem;
  gap: 2rem;
  cursor: pointer;
  margin-bottom: 10rem;
}
.p-{page}__links-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  font-size: var(--fs-sm2);
  color: var(--text-black1);
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;
}
```

FAQ / admission はレイアウト差異あり（max-width, flex-wrap, justify-content 等）。

#### 指摘例2: CTA バナー（12ページ使用）★★★

| コンポーネント | SCSSファイル | 使用ページ数 |
|---------------|------------|------------|
| `c-footer-banner` | `_footer-banner.scss`（234行） | 5ページ |
| `c-announcement__section` | `_announcement.scss`（94行）+ `_global-responsive.scss` | 7ページ |

共通点: Flexbox column/center/center、半透明白背景 rgba(255,255,255,0.9)、背景画像 + cover、CTA ボタン（c-btn--light-blue）
差異点: 背景画像が異なる、幅制約方法（max-width vs 固定width）、パディング・ギャップ値、c-footer-banner はキャラクターステッカー付き

#### 追加検出パターン

| # | パターン | 重複箇所数 | 優先度 |
|---|---------|-----------|--------|
| 3 | セクションヘッダー | 8箇所 | ★★★ |
| 4 | キャラクター吹き出し（speak） | 7箇所 | ★★☆ |
| 5 | ステップカード | 3箇所 | ★★☆ |
| 6 | キャンペーンヘッダー | 4箇所 | ★★☆ |
| 7 | テキストオーバーレイパネル | 2箇所 | ★☆☆ |
| 8 | テーブル構造 | 2箇所 | ★☆☆ |
| 9 | バナーオーバーレイ | 3箇所 | ★☆☆ |
| 10 | ライトブルー背景セクション | 4箇所 | ★☆☆ |
| 11 | テスティモニアルカード | 2箇所 | ★☆☆ |

##### セクションヘッダー（8箇所）の詳細

| クラス名 | SCSSファイル |
|----------|------------|
| `p-medical__section-header` | `_medical.scss` L91-107 |
| `p-personal-section__header` | `_personal.scss` L93-109 |
| `p-payment__title-container` | `_payment.scss` L102-119 |
| `p-price__title-container` | `_price.scss` L37-70 |
| `p-sportip__title-container` | `_sportip.scss` L71-87 |
| `p-visitor__title-container` | `_visitor.scss` L22-41 |
| `p-storedetail__topic-header` | `_storedetail-review.scss` L6-25 |
| `p-reservation-flow__title-container` | `_reservation.scss` L120-137 |

##### キャラクター吹き出し（7箇所）

| クラス名 | SCSSファイル |
|----------|------------|
| `p-medical__speak-*` | `_medical.scss` |
| `p-payment__speak-*` | `_payment.scss` |
| `p-price__speak-*` | `_price.scss` |
| `p-personal-speak-*` | `_personal.scss` |
| `p-reservation-speak-*` | `_reservation.scss` |
| `p-protein__speak-*` | `_protein.scss` |
| `p-sportip__speak-*` | `_sportip.scss` |

##### バナーオーバーレイ（3箇所）— ユーティリティ化が最適

```scss
// 3ファイルに同一の3行がコピペ
position: absolute; inset: 0; background: rgba(0,0,0,0.4); z-index: 3; pointer-events: none;
```

---

### 2-4. フィードバック_common-top重複画像の整理.md

`assets/img/common/` と `assets/img/top/` を全件比較した結果、**35ファイルが重複**。

| 種別 | ファイル数 | 合計サイズ |
|------|-----------|-----------|
| 完全一致の重複 | 28 | 約9.5MB |
| ファイル名同一だが中身が異なる | 6 | 約9.3MB |
| top/ 固有ファイル | 119 | — |

**削除対象: 34ファイル、約10.5MB**（コード上の参照はすべて common/ 側を使用、top/ 側は未参照）

削除対象ファイル一覧:
```
# アイコン（SVG）22件
assets/img/top/icon_24.svg
assets/img/top/icon_24_outline_white.svg
assets/img/top/icon_amazones_no1.svg
assets/img/top/icon_amazones_shop.svg
assets/img/top/icon_arrow.svg
assets/img/top/icon_arrow_blue.svg
assets/img/top/icon_blueLine.svg
assets/img/top/icon_btn_green_arrow.svg
assets/img/top/icon_check_calender.svg
assets/img/top/icon_edit.svg
assets/img/top/icon_energy.svg
assets/img/top/icon_instragram.svg
assets/img/top/icon_line.svg
assets/img/top/icon_line_sp.svg
assets/img/top/icon_logo.svg
assets/img/top/icon_menu.svg
assets/img/top/icon_plan.svg
assets/img/top/icon_recruitment.svg
assets/img/top/icon_scroll_arrow.svg
assets/img/top/icon_search.svg
assets/img/top/icon_speaker.svg
assets/img/top/icon_videos.svg

# アイコン（PNG）4件
assets/img/top/icon_voice_image1.png
assets/img/top/icon_voice_image2.png
assets/img/top/icon_voice_image3.png
assets/img/top/icon_voice_image4.png

# SNSアイコン 1件
assets/img/top/icon_youtube.svg

# ヒーロー / 背景画像 5件
assets/img/top/bg_hero2.png
assets/img/top/bg_hero3.png
assets/img/top/bg_hero4.png
assets/img/top/bg_hero5.png
assets/img/top/bg_slide_hero1left.webp

# 内部構造が異なるが未使用 1件
assets/img/top/icon_24_white.svg
```

---

### 2-5. フィードバック_commonヒーロー画像の使用状況.md

bg_hero1〜4 はトップページ + 各サービスページで横断使用しており、`common/` 配置は適切。

| 画像 | トップページ | about | sportip | personal | medical |
|------|------------|-------|---------|----------|---------|
| bg_hero1 | スライダー | ヒーロー | — | — | — |
| bg_hero2 | スライダー | — | ヒーロー | — | — |
| bg_hero3 | スライダー | — | — | ヒーロー | — |
| bg_hero4 | スライダー | — | — | — | ヒーロー |
| bg_hero5 | スライダー | — | — | — | — |

**bg_hero5 のみトップページ専用** → `top/` への移動が望ましい。

hero2 と hero5 で `top_right` に JPG と WebP の両方が存在（重複）。

---

## 3. 独自調査結果

### 3-1. 客観評価

Step 1〜8 のリファクタリングは「表面的な整理」に留まっており、設計上の根本問題には手をつけていない。

- BEM命名、FLOCSSプレフィクス、IDセレクタ排除、セレクタ深さ制限、`!important` 削減 — これらは「器」の整備として正しい
- しかし「中身」（スタイルの設計思想）はリファクタリング前のまま
- ユーティリティクラスが「スタイリングの主役」になっている = Tailwind CSS を FLOCSS の中でやっている状態
- `u-fs-12` から `u-fs-320` まで20段階の px ベース font-size ユーティリティが定義されており、ガイドラインの「rem/em基準、px指定追加せず」に矛盾

### 3-2. global.js / common.js の調査結果

#### common.js（3.2KB）
全ページで読み込み。汎用関数3つ:
- `initSmoothScroll(selector)` — ネイティブ scrollIntoView API ベース
- `initMobileCarousel(config)` — モバイル向けカルーセル
- `initModal(modalId)` — モーダルダイアログ制御

#### global.js（35.9KB）
全ページで読み込み。ページ共通UI:
- `smoothScrollTo(targetY, duration)` — rAF ベースのカスタムスムーズスクロール（**common.js と重複**）
- `scrollToNextSection()` — 次セクションへの自動スクロール
- スクロールダウンボタン（PC/SP）
- フローティングメニューシステム
- モバイルヘッダー（ハンバーガーメニュー、アコーディオン）
- IntersectionObserver によるアニメーション
- `initSliders()` — 無限ループスライダー（タッチ/スワイプ対応）

#### 問題点
- 名前が「global」「common」でほぼ同義
- スムーズスクロールが両方に別実装で存在
- 両方とも全ページで読み込み

---

## 4. index.html のユーティリティクラス詳細監査

### 4-1. 基本情報

- ファイル行数: 2,124行
- 読み込みCSS: `global.css`, `top.css`
- 読み込みJS: `common.js`, `global.js`, `top.js`

### 4-2. ユーティリティクラス使用数

#### Font Weight (u-fw-*)
- u-fw-500: **190**
- u-fw-700: **49**
- u-fw-300: **28**
- u-fw-400: **14**
- u-fw-600: **2**

#### Font Size (u-fs-*)
- u-fs-16: **102**（最多）
- u-fs-15: **60**
- u-fs-14: **38**
- u-fs-36: **29**
- u-fs-18: **22**
- u-fs-24: **13**
- u-fs-100: **10**
- u-fs-30: **6**
- u-fs-12: **4**
- u-fs-54: **2**
- u-fs-20: **2**
- u-fs-60, u-fs-39, u-fs-320, u-fs-32, u-fs-25, u-fs-19, u-fs-13: 各 **1**

#### Letter Spacing (u-ls-*)
- u-ls-20: **32**
- u-ls-10: **4**

#### Line Height (u-lh-*)
- u-lh-200: **31**
- u-lh-180: **19**
- u-lh-normal: **11**
- u-lh-140: **1**

#### Text Color / Alignment (u-text-*)
- u-text-white: **78**
- u-text-lightBlue: **53**
- u-text-black1: **18**
- u-text-center: **11**
- u-text-right: **1**
- u-text-blue-hover: **1**

#### Font Family (u-font-*)
- u-font-outfit: **93**
- u-font-zen: **1**

#### Margin (u-m*)
- u-mx-auto: **6**
- u-mt-40: **4**
- u-mr-5: **4**
- u-mt-10: **3**
- u-mt-30: **2**
- u-ml-4: **2**
- u-mt-50, u-mt-20, u-mr-auto, u-ml-auto: 各 **1**

#### その他
- u-relative: **26**
- u-popup: **18**
- u-z-10: **5**
- u-display-sp: **3**
- u-absolute: **2**
- u-w-full, u-cursor-pointer, u-vertical-text, u-bg-white, u-icon, u-btn, u-content: 各 **1**

### 4-3. 高頻度パターン（上位20）

| Count | ユーティリティ組み合わせ | 非ユーティリティクラス |
|-------|----------------------|-------------------|
| 28 | u-font-outfit, u-fw-300, u-fs-36, u-text-white | c-text-slider__slide-text |
| 27 | u-fw-500, u-fs-15 | （なし） |
| 16 | u-text-white, u-fs-16, u-font-outfit | （なし） |
| 16 | u-fw-500, u-fs-14 | news-label |
| 16 | u-fs-16, u-fw-500, u-font-outfit, u-text-lightBlue | （なし） |
| 13 | u-fw-500, u-fs-15 | l-footer__icon-link |
| 12 | u-fw-500, u-fs-16, u-ls-20 | c-panel-content-text-sp |
| 12 | u-fw-500, u-fs-16, u-ls-20 | c-panel-content-text-desk, c-news-info__last-text |
| 10 | u-font-outfit, u-fs-18, u-fw-500 | （なし） |
| 8 | u-fw-700, u-fs-16, u-text-lightBlue | （なし） |
| 8 | u-fs-15, u-fw-500, u-lh-180 | （なし） |
| 8 | u-fs-18, u-fw-500, u-text-black1 | c-reveal, section-sub-text |
| 7 | u-fw-500, u-fs-15, u-text-lightBlue | （なし） |
| 6 | u-fw-500, u-text-white, u-fs-14 | p-top__training-machine-label |
| 6 | u-fs-30, u-text-lightBlue, u-fw-700 | （なし） |
| 6 | u-fs-16, u-fw-700 | （なし） |
| 6 | u-fs-16, u-fw-500, u-lh-200, u-text-center | （なし） |
| 6 | u-relative | slide-content |
| 5 | u-fw-500, u-fs-16, u-lh-200 | （なし） |
| 5 | u-fs-100, u-lh-normal, u-font-outfit, u-text-black1, u-fw-400 | c-reveal, c-section-header__text |

### 4-4. 見出し要素の u-fw-500

index.html で u-fw-500 が付いた見出しは **h1 が1箇所のみ**（L318）。
他の h2 はすべて u-fw-400 または u-fw-700。

### 4-5. u-text-black1 の安全性

- 18箇所中3箇所で `u-text-black1` と `u-text-white` が同一要素に共存（L1224, L1225, L1839）
  → `u-text-black1` は冗長（`u-text-white` が勝つ）
- 残り15箇所: body の `color: var(--text-black1)` で継承されるため不要
- **全18箇所を安全に削除可能**

---

## 5. コンポーネント SCSS の現状（index.html 関連）

### 5-1. c-section-header__text（_section.scss）

```scss
// ベーススタイルなし — モバイルのみ定義
@media (max-width: 767px) {
  .c-section-header__text {
    font-size: var(--fs-6xl);
    z-index: 10;
    position: relative;
  }
}
```

HTMLでは `u-fs-100 u-lh-normal u-font-outfit u-fw-400` が毎回付与されている。
→ ベーススタイルとして `font-size: 100px; line-height: 100%; font-family: var(--font-outfit); font-weight: 400` を追加すべき。

### 5-2. section-sub-text（_global-responsive.scss）

```scss
// ベーススタイルなし — モバイルのみ定義
@media (max-width: 767px) {
  .section-sub-text {
    font-size: var(--fs-base);
    z-index: 10;
  }
}
```

HTMLでは `u-fs-18 u-fw-500 u-text-black1` が毎回付与。
→ `font-size: 18px` をベーススタイルとして追加。u-fw-500, u-text-black1 は body 継承で不要。

### 5-3. c-text-slider__slide-text（_top.scss L470-472）

```scss
.c-text-slider__slide-text {
  text-wrap: nowrap;
}
```

HTMLでは28箇所すべてに `u-font-outfit u-fw-300 u-fs-36 u-text-white` が付与。
→ font-family, font-weight, font-size, color を追加。

### 5-4. news-label（_global-responsive.scss L349-356）

```scss
.news-label {
  background-color: var(--base-gray);
  padding: 10px 0;
  min-width: 140px;
  width: fit-content;
  text-align: center;
  flex-shrink: 0;
  // font-size なし
}
```

HTMLでは `u-fw-500 u-fs-14` が毎回付与。→ `font-size: 14px` を追加。

### 5-5. c-panel-content-text-desk / c-panel-content-text-sp

c-panel-content-text-desk にはベース定義がない（メディアクエリで `display: none` のみ）。
c-panel-content-text-sp: `display: none; width: 100%; margin-top: 20px; line-height: 25px;`

HTMLでは `u-fw-500 u-fs-16 u-ls-20`（一部 `u-lh-200`）が付与。
→ `letter-spacing: 0.2em` を追加。u-fw-500, u-fs-16 は body 継承で不要。

### 5-6. l-footer__icon-link（_footer.scss L282-291）

```scss
.l-footer__icon-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  // font-size なし
}
```

HTMLでは13箇所に `u-fw-500 u-fs-15` が付与。→ `font-size: 15px` を追加。

### 5-7. p-top__training-machine-label（_top.scss L812-823）

レイアウトプロパティのみ。HTMLでは `u-fw-500 u-text-white u-fs-14` が付与。
→ `font-size: 14px; color: var(--base-white)` を追加。

### 5-8. _footer-banner.scss の3重定義

L4-48, L53-92, L96-137 に `.c-footer-banner` と関連クラスが3回重複定義。
3つ目のみ `.c-footer-banner__container` に `overflow: visible` が追加されている。
→ 1定義に統合し、`overflow: visible` を含める。

---

## 6. SCSS 読み込み順変更の影響分析

### 現状と正規の順序

```
現状: Foundation → Utility → Component → Layout → global-responsive
正規: Foundation → Layout → Component → Utility → global-responsive
```

### 影響を受けないもの

- **`global-responsive.scss`**: 現在も最後に読み込み、変更後も最後 → レスポンシブ上書きは不変
- **Project ファイル（`top.css` 等）**: 別CSSファイルとして `global.css` の後に読み込み → 不変
- **`@media` ブロック内のルール**: 読み込み順ではなくメディアクエリの条件で評価

### 影響を受けるもの（global.css 内の Component vs Utility の直接競合）

| コンポーネント | プロパティ | 競合する可能性のあるユーティリティ |
|--------------|----------|-------------------------------|
| `c-announcement__body` | font-weight: 500, line-height: 2 | u-fw-*, u-lh-* |
| `c-announcement__btn` | font-weight: 700, font-size: var(--fs-lg) | u-fw-*, u-fs-* |
| `c-announcement__title-container h2` | font-size: var(--fs-2xl2), font-weight: 700 | u-fs-*, u-fw-* |
| `c-end-note__card-body` | font-weight: 500, font-size: var(--fs-base), line-height: 1.5 | u-fw-*, u-fs-*, u-lh-* |
| `c-end-note__card-header h3` | font-size: var(--fs-xl), font-weight: 600 | u-fs-*, u-fw-* |
| `c-btn--light-blue02` | color: white, font-size: var(--fs-base) | u-text-*, u-fs-* |
| `c-btn--red` | color: var(--text-white) | u-text-* |
| `p-banner-title` | font-size, font-weight: 400, line-height, letter-spacing, margin-bottom | u-fs-*, u-fw-*, u-lh-*, u-ls-*, u-mb-* |
| `p-banner-subtitle` | font-size, font-weight: 300, line-height, color, letter-spacing, margin-bottom | u-fs-*, u-fw-*, u-lh-*, u-text-*, u-ls-*, u-mb-* |
| `l-sp-nav__head` | font-size, font-weight: 600, text-align: left | u-fs-*, u-fw-*, u-text-* |
| `l-sp-nav__link` | font-size, color | u-fs-*, u-text-* |
| `c-breadcrumb-separator` | font-size, color | u-fs-*, u-text-* |

**ただし、これらは「実際にHTMLで同一要素にユーティリティとコンポーネントが共存しているか」の確認が必要。** コンポーネント内部の子セレクタ（h2, a 等）への指定が多く、実際の競合は限定的。

### 結論

読み込み順の変更は**最初に実施すべき**。理由:
1. 影響範囲が限定的（global.css 内の Component vs Utility 直接競合のみ）
2. 間違った土台で作業すると二度手間になる
3. 競合が表面化するのは「修正すべきバグ」であり、早期発見が望ましい

---

## 7. 合意済みの方針

### 対象ページ

**index.html（トップページ）のみ**を最初の対象とし、完了後に他ページへ展開する。

### デザイン基準値

- フォントサイズ: **16px**
- フォントウェイト: **500**
- フォントファミリー: **Zen Kaku Gothic New**（var(--font-zen)）

### 「追加のみ → ページ単位で削除」方式

SCSS 変更は「値の追加」であり、他ページの HTML にはまだ同じ値の utility が残っているため「同じ値の二重指定 = 見た目は変わらない」。
HTML のユーティリティ削除はページ単位で進めるため、他ページに影響しない。

### 実施順序

```
Step 0: global.scss の読み込み順を FLOCSS 正規順に修正
    └→ コンパイル → 全ページざっと確認 → 崩れがあれば即修正

Step 1: ベーススタイル整備（_reset.scss）
    └→ body { font-weight: 500; font-size: 16px } + h1-h6 リセット

Step 2: コンポーネント SCSS にユーティリティを吸収（追加のみ）
    └→ 7つのコンポーネントにタイポグラフィ追加

Step 3: index.html の冗長ユーティリティを削除
    └→ u-fw-500(190), u-fs-16(102), u-font-zen(1), u-text-black1(18) + 吸収済み分

Step 4: footer-banner 3重定義の修正

Step 5: コンパイル・最終検証
```

### 修正対象ファイル一覧

| ファイル | 変更内容 |
|---------|---------|
| `assets/scss/global.scss` | 読み込み順修正 |
| `assets/scss/foundation/_reset.scss` | body + h1-h6 のベーススタイル追加 |
| `assets/scss/object/component/_section.scss` | c-section-header__text, section-sub-text のベーススタイル追加 |
| `assets/scss/object/component/_footer-banner.scss` | 3重定義 → 1定義に統合 |
| `assets/scss/object/project/_top.scss` | c-text-slider__slide-text, p-top__training-machine-label に吸収 |
| `assets/scss/layout/_footer.scss` | l-footer__icon-link に font-size 追加 |
| `assets/scss/_global-responsive.scss` | news-label に font-size、c-panel-content-text-* に letter-spacing 追加 |
| `index.html` | 冗長ユーティリティクラスの削除 |
| `assets/css/global.css` | コンパイル結果 |

### 削減効果の見込み（index.html）

| 指標 | Before | After | 削減 |
|------|--------|-------|------|
| u-* クラス使用数 | ~950 | ~550 | ~400（42%減） |
| u-fw-500 | 190 | 0 | -190 |
| u-fs-16 | 102 | 0 | -102 |
| u-font-outfit（吸収分） | ~50 | ~43 | -50 |
| u-text-black1 | 18 | 0 | -18 |

---

## 8. 未着手・要確認事項

### クライアント/デザイナーへの確認事項

1. `storelist/[slag]` ページの `html { font-family: kozuka-gothic-pr6n }` はデザイン意図か？
2. CTA バナーの統一方針（ステッカー付き/なしはバリアントで分けるか）
3. ナビゲーションの統一範囲（FAQ/admission のレイアウト差異はデザイン意図か）
4. 背景画像の差異（`bg_banner.png` と `bg_camouflage01.webp`）はデザイン意図か

### 今回スコープ外

- 重複コンポーネントの統合（11パターン） — 別作業として実施
- global.js / common.js の整理 — 別作業として実施
- 画像重複の削除（34ファイル、10.5MB）— 別作業として実施
- 他ページの HTML ユーティリティ削除 — index.html 完了後に順次実施
