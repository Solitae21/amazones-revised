# Step 4: IDセレクタ → クラスセレクタへの置換 — 実行計画（修正版）

作成日: 2026-03-30
修正日: 2026-03-30（詳細度分析・命名規約・検証手順を追加）

---

## 概要

CSSセレクタとしてのID使用（`#xxx`）をすべてクラスセレクタに置き換える。
規約: 「jsでの操作が必要なものに限りIDの指定OK」→ HTMLの `id` 属性はJS操作用に残すが、**CSSセレクタとしてのID使用は禁止**。

---

## 対象サマリ

| カテゴリ | ID数 | CSSルール数 | 方針 |
|---------|:---:|:---:|------|
| A. JS操作あり + CSS使用あり | 5 | 24 | CSSは既存classで代替。HTMLのid属性はJS用に残す |
| B. アンカーリンク用 + CSS使用あり | 6 | 1（グループ） | CSSは新規共通classで代替。HTMLのid属性はアンカー用に残す |
| C. CSS専用（HTML/JSに不在） | 5 | 13 | WordPress由来 → **変更しない** |
| D. CSS専用（HTMLにあり、JSなし） | 1 | 3 | CSSを新規FLOCSS準拠classで代替。HTMLにclass追加、id属性は削除 |
| E. CSS + HTML変更 + class新規追加 | 1 | 4 | CSSを新規FLOCSS準拠classで代替。HTMLにclass追加 |
| **合計** | **18** | **45** | **うち変更対象: 13 ID, 32ルール** |

---

## 詳細度（specificity）影響分析

IDセレクタ（0,1,0,0）→ クラスセレクタ（0,0,1,0）への変更は詳細度を大幅に下げる。
以下の調査で、**全置換対象について同じ要素を指す競合ルールを洗い出し、詳細度の勝敗が変わらないことを確認済み**。

### 安全な理由

1. **A-1, A-2（scroll-down-text, scroll-down-mobile）:** 同名のクラスセレクタ（`.scroll-down-text`, `.scroll-down-mobile`）が既にベーススタイルとして存在する（_header.scss 行76, 130）。IDルールとクラスルールが**同じプロパティを上書きしていない**（IDルールは位置・透明度、クラスルールはflex方向・gap等で棲み分け）。全IDセレクタをクラスに一括置換すれば、相対的な詳細度序列は維持される。

2. **A-3, A-4（floating-menu-btn, header-floating-menu）:** 複合セレクタ内で2つのIDが同時に使われている（`#header-floating-menu #floating-menu-btn ...`）。**両方を同時にクラスに置換する**ため、相互の詳細度バランスは崩れない。既存の `.l-header-floating-menu__btn`（_header.scss 行70）とのプロパティ競合もなし（既存classはflex基本設定、IDルールはメディアクエリ内の表示切替で棲み分け）。

3. **A-5（nav-menu-popup）:** `#nav-menu-popup .l-footer__blue-btn` の1ルールのみ。`.l-footer__blue-btn` に対する他のルールと `width: fit-content` で競合するものなし。

4. **E-1（js-slider）, D-1（videoHolder）:** 対象要素にはIDセレクタ以外のCSSルールが存在しない。新規クラスを追加するため競合なし。

5. **B-1（地域セクション）:** 新規共通クラス `.p-storelist__region` は他に定義がないため競合なし。

### ⚠️ 要注意箇所

| 箇所 | 詳細度変化 | 影響 | 対策 |
|------|-----------|------|------|
| _footer.scss 行123-141: `.l-header-floating-menu.active #floating-menu-btn .l-header__hamburger .mh-bar:nth-child(N)` | (0,1,2,1) → (0,0,3,1) | 同じ `.mh-bar` を指す他ルール（行111: (0,2,1,0)→(0,0,3,0)）も同時に下がるため**相対序列は維持** | A-3/A-4 を必ず同時に置換 |
| _header.scss 行445: `.l-header-floating-menu.active #scroll-down-text` (メディアクエリ内) | (0,1,1,0) → (0,0,2,0) | 行113 の同セレクタも同時に下がる。`!important` 付きのため詳細度に関係なく勝つ | 全IDを一括置換で問題なし |

---

## A. JS操作あり + CSS使用あり（5 ID, 24ルール）

HTMLの `id` 属性はJS操作用に残し、CSSでは既存の `class` 属性を使う。

### A-1. `#scroll-down-text` → `.scroll-down-text`

**ファイル:** `assets/scss/layout/_header.scss`
**HTMLでの既存class:** `scroll-down-text`（id と同名の class が既にある）
**JS:** `global.js:29` — `getElementById("scroll-down-text")` → 変更不要（idは残す）

| 行 | 旧セレクタ | 新セレクタ |
|:---:|-----------|-----------|
| 102 | `#scroll-down-text` | `.scroll-down-text` |
| 113 | `.l-header-floating-menu.active #scroll-down-text` | `.l-header-floating-menu.active .scroll-down-text` |
| 119 | `#scroll-down-text.scrolling` | `.scroll-down-text.scrolling` |
| 445 | `.l-header-floating-menu.active #scroll-down-text` | `.l-header-floating-menu.active .scroll-down-text` |

**HTML出現箇所（5ファイル）:** 変更不要（既に `class="scroll-down-text"` あり）
- `index.html:91`
- `information/index.html:97`
- `sportip/index.html:145`
- `medical/index.html:146`
- `personal/index.html:140`

---

### A-2. `#scroll-down-mobile` → `.scroll-down-mobile`

**ファイル:** `assets/scss/layout/_header.scss`
**HTMLでの既存class:** `scroll-down-mobile`（id と同名の class が既にある）
**JS:** `global.js:41` — `getElementById("scroll-down-mobile")` → 変更不要

| 行 | 旧セレクタ | 新セレクタ |
|:---:|-----------|-----------|
| 137 | `#scroll-down-mobile` | `.scroll-down-mobile` |
| 141 | `#scroll-down-mobile.hidden-by-menu` | `.scroll-down-mobile.hidden-by-menu` |
| 146 | `#scroll-down-mobile` | `.scroll-down-mobile` |
| 162 | `#scroll-down-mobile p` | `.scroll-down-mobile p` |
| 168 | `#scroll-down-mobile img` | `.scroll-down-mobile img` |
| 172 | `#scroll-down-mobile.scrolling` | `.scroll-down-mobile.scrolling` |

**HTML出現箇所（4ファイル）:** 変更不要
- `index.html:2178`
- `sportip/index.html:1575`
- `medical/index.html:2154`
- `personal/index.html:1174`

---

### A-3. `#floating-menu-btn` + A-4. `#header-floating-menu`（同時処理）

この2つのIDは _footer.scss で複合セレクタとして共起するため、**必ず同時に置換する**。
片方だけ置換すると詳細度バランスが崩れる。

**A-3: `#floating-menu-btn` → `.l-header-floating-menu__btn`**
- **HTMLでの既存class:** `l-header-floating-menu__btn`
- **JS:** `global.js:51` — `getElementById("floating-menu-btn")` → 変更不要

**A-4: `#header-floating-menu` → `.l-header-floating-menu`**
- **HTMLでの既存class:** `l-header-floating-menu`
- **JS:** `global.js:53` — `getElementById("header-floating-menu")` → 変更不要

| ファイル | 行 | 旧セレクタ | 新セレクタ |
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

**HTML出現箇所（18+ファイル）:** 変更不要（既に両方のclassあり）

**⚠️ セレクタ深さ:** 置換後もセレクタ深さが4階層以上のものがある（行123-139）。これは Step 5 で対応予定。今回はIDのみ置換。

---

### A-5. `#nav-menu-popup` → `.l-nav-menu-popup`

**ファイル:** `assets/scss/layout/_footer.scss`
**HTMLでの既存class:** `l-nav-menu-popup`
**JS:** `global.js:54` — `getElementById("nav-menu-popup")` → 変更不要

| 行 | 旧セレクタ | 新セレクタ |
|:---:|-----------|-----------|
| 462 | `#nav-menu-popup .l-footer__blue-btn` | `.l-nav-menu-popup .l-footer__blue-btn` |

**HTML出現箇所（18+ファイル）:** 変更不要

---

## B. アンカーリンク用 + CSS使用あり（6 ID, 1グループルール）

アンカーリンク（`<a href="#hokkaido-tohoku">`）のために `id` 属性は残す。

### B-1. 地域セクションID群

**ファイル:** `assets/scss/object/project/_storelist.scss`
**HTML:** `storelist/index.html`
**コンテキスト:** メディアクエリ `@media screen and (max-width: 600px)` の**内部**にある（行348付近から始まるブロック）

**旧（メディアクエリ内、6行のID + 子孫セレクタ）:**
```scss
/* @media screen and (max-width: 600px) 内 */
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

**新（共通クラスで代替）:**
```scss
/* @media screen and (max-width: 600px) 内 */
.p-storelist__region .c-maxWidth {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
```

**HTML変更（6箇所 — `storelist/index.html`）:**
| 行 | 旧 | 新 |
|:---:|-----|-----|
| 347 | `<section id="hokkaido-tohoku" class="c-section--white">` | `<section id="hokkaido-tohoku" class="c-section--white p-storelist__region">` |
| 962 | `<section id="kanto" class="c-section--light-blue relative">` | `<section id="kanto" class="c-section--light-blue relative p-storelist__region">` |
| 2610 | `<section id="chubu" class="c-section--white">` | `<section id="chubu" class="c-section--white p-storelist__region">` |
| 3346 | `<section id="kinki" class="c-section--light-blue">` | `<section id="kinki" class="c-section--light-blue p-storelist__region">` |
| 5640 | `<section id="chugoku-shikoku" class="c-section--white relative">` | `<section id="chugoku-shikoku" class="c-section--white relative p-storelist__region">` |
| 6382 | `<section id="kyushu-okinawa" class="c-section--light-blue">` | `<section id="kyushu-okinawa" class="c-section--light-blue p-storelist__region">` |

---

## C. CSS専用 — WordPress由来（5 ID, 13ルール）→ 変更しない

これらのIDはHTML/JSファイルに存在しない。`_storedetail-introduction.scss` と `_responsive.scss` 内のWordPress由来のスタイル。
HTMLはWordPress側で動的生成されるため、IDセレクタをクラスに変更すると**スタイルが適用されなくなる**。

### ⚠️ 判断: 変更しない（安全側に倒す）

| ファイル | ID | 行 | 理由 |
|---------|-----|:---:|------|
| _storedetail-introduction.scss | `#footer-menu-05` | 984 | WordPress動的生成 |
| _storedetail-introduction.scss | `#footer-menu-03` | 1009 | WordPress動的生成 |
| _storedetail-introduction.scss | `#ez-toc-container` | 7327 | WordPress Ez TOCプラグイン |
| _storedetail-introduction.scss | `#front-steps` | 8895-8981 | WordPress動的生成（10ルール） |
| _responsive.scss | `#about-three-vehicles-section` | 1917 | HTMLに不在（WordPress由来の可能性大） |

---

## D. CSS専用 — HTMLにあり、JSなし（1 ID, 3ルール）

### D-1. `#videoHolder` → `.p-top__video-holder`

**ファイル:** `assets/scss/object/project/_top.scss`
**HTML:** `index.html` に2箇所（行1551, 1626）
**既存class:** `relative` のみ → 新規class `.p-top__video-holder` を追加
**JS:** 参照なし（grep確認済み）
**アンカーリンク:** `href="#videoHolder"` は全HTMLに不在（grep確認済み）
**→ id属性はJS・アンカーいずれにも未使用のため削除する**

| 行 | 旧セレクタ | 新セレクタ |
|:---:|-----------|-----------|
| 1065 | `#videoHolder` | `.p-top__video-holder` |
| 1171 | `#videoHolder` | `.p-top__video-holder` |
| 1182 | `#videoHolder .mt-40` | `.p-top__video-holder .mt-40` |

**HTML変更:**
- `index.html:1551` — `<div id="videoHolder" class="relative">` → `<div class="relative p-top__video-holder">`
- `index.html:1626` — 同上

---

## E. CSS + HTML変更 + class新規追加（1 ID, 4ルール）

### E-1. `#js-slider` → `.p-storedetail__slider`

**ファイル:** `assets/scss/object/project/_storedetail.scss`
**HTMLでの既存class:** `swiper`, `lg:w-2/3`（スタイリング用classなし）
**JS:** `storedetail.js:20` — `getElementById("js-slider")` → 変更不要（idは残す）

**命名:** `js-` プレフィクスはJSフック用であり、CSSスタイリングに使うのは命名規約に反する。
FLOCSS準拠の `.p-storedetail__slider` を使用する。

| 行 | 旧セレクタ | 新セレクタ |
|:---:|-----------|-----------|
| 858 | `#js-slider` | `.p-storedetail__slider` |
| 867 | `#js-slider:not(.swiper-initialized) .swiper-slide:not(:first-child)` | `.p-storedetail__slider:not(.swiper-initialized) .swiper-slide:not(:first-child)` |
| 871 | `#js-slider .swiper-slide img` | `.p-storedetail__slider .swiper-slide img` |
| 1853 | `#js-slider` | `.p-storedetail__slider` |

**HTML変更:**
- `storelist/[slag]/index.html:1061` — `<div class="lg:w-2/3 swiper" id="js-slider">` → `<div class="lg:w-2/3 swiper p-storedetail__slider" id="js-slider">`

---

## 処理順序

部分マッチ回避のため、以下の順序で置換する:

1. **`#header-floating-menu` + `#floating-menu-btn`**（_footer.scss — 複合セレクタが多いため**必ず同時処理**）
2. **`#floating-menu-btn`**（_header.scss — 単独使用分）
3. **`#scroll-down-text`**（_header.scss — 全4箇所を一括）
4. **`#scroll-down-mobile`**（_header.scss — 全6箇所を一括）
5. **`#nav-menu-popup`**（_footer.scss）
6. **`#js-slider`** → `.p-storedetail__slider`（_storedetail.scss + HTML class追加）
7. **`#videoHolder`** → `.p-top__video-holder`（_top.scss + HTML id削除 & class追加）
8. **地域セクションID群**（_storelist.scss + HTML class追加）

---

## 検証手順

### 各置換後の確認

1. **残存チェック:** 旧IDセレクタで SCSS を grep → 残存がないことを確認（除外対象の5IDは除く）
2. **SCSSコンパイル（全対象）:**
   ```bash
   npx sass assets/scss/global.scss assets/css/global.css --no-source-map
   npx sass assets/scss/object/project/_top.scss assets/css/top.css --no-source-map
   npx sass assets/scss/object/project/_storedetail.scss assets/css/storedetail.css --no-source-map
   npx sass assets/scss/object/project/_storelist.scss assets/css/storelist.css --no-source-map
   ```
3. **コンパイルエラーチェック:** 上記コマンドの exit code が 0 であること
4. **ブラウザ確認:** 以下のページで見た目が変わっていないことを確認
   - `index.html` — ヘッダー（フローティングメニュー、スクロールダウン）、動画セクション
   - `storelist/index.html` — 地域セクションのパディング
   - `storelist/[slag]/index.html` — フォトギャラリースライダー

### 最終確認

5. **全IDセレクタ残存チェック:**
   ```bash
   grep -rn '#[a-zA-Z]' assets/scss/ --include='*.scss' | grep -v '//' | grep -v 'color\|background\|border\|shadow\|gradient\|url\|font\|rgba\|var('
   ```
   → 除外対象の5ID以外のIDセレクタがないことを確認

---

## リスク評価

| リスク | 影響度 | 対策 |
|--------|:---:|------|
| 詳細度の低下で他ルールに負ける | **低**（調査済み） | 全対象の競合ルールを事前調査済み。同一要素を指す全IDセレクタを一括置換するため相対序列は維持される |
| A-3/A-4 を別々に置換して詳細度バランスが崩れる | **高** | **必ず同時に置換**（処理順序で明記） |
| WordPress由来のID変更でスタイル崩壊 | **高** | **変更しない**（カテゴリC 全5ID除外） |
| JS の getElementById が壊れる | **回避済み** | HTMLのid属性はJS使用箇所で全て残す |
| アンカーリンクが壊れる | **回避済み** | HTMLのid属性はアンカーリンク使用箇所で全て残す |
| HTML への class 追加漏れ | 中 | 置換前後にgrepで全量確認 |
| `.js-slider` の命名規約違反 | **回避済み** | `.p-storedetail__slider` に変更（FLOCSS準拠） |

---

## 変更対象ファイル一覧

### SCSS（5ファイル）
- `assets/scss/layout/_header.scss` — 10箇所（#scroll-down-text ×4, #scroll-down-mobile ×6）
- `assets/scss/layout/_footer.scss` — 10箇所（#header-floating-menu + #floating-menu-btn ×9, #nav-menu-popup ×1）
- `assets/scss/object/project/_storedetail.scss` — 4箇所（#js-slider）
- `assets/scss/object/project/_top.scss` — 3箇所（#videoHolder）
- `assets/scss/object/project/_storelist.scss` — 1箇所（6行のグループセレクタ → 1行に統合）

### HTML（3ファイル）
- `storelist/[slag]/index.html` — 1箇所（class `p-storedetail__slider` 追加）
- `index.html` — 2箇所（id `videoHolder` 削除 + class `p-top__video-holder` 追加）
- `storelist/index.html` — 6箇所（class `p-storelist__region` 追加）

### CSS（コンパイルで自動更新、4ファイル）
- `assets/css/global.css`
- `assets/css/top.css`
- `assets/css/storedetail.css`
- `assets/css/storelist.css`

### 変更しないファイル
- JS ファイル — 全て `getElementById` のまま（id属性は残すため）
- `_storedetail-introduction.scss` — WordPress由来のID（5つ）は除外
- `_responsive.scss` — `#about-three-vehicles-section` は除外
