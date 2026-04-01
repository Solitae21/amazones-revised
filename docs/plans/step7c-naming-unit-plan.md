# Step 7c: ユーティリティ命名のガイドライン準拠（省略形化）

作成日: 2026-04-01
対象: 全ユーティリティSCSSファイル（9ファイル）+ HTML 23ファイル
準拠元: `docs/cording-guideline.md`

---

## 概要

Step 7b で未使用クラスを削除し、残存する97クラスについて**命名の省略形化**をガイドラインに準拠させる。

**px → rem 変換はスキップ**（先方フィードバックで指摘なし、リスク対効果が低いため）。
CSS 値は一切変更しない。クラス名のリネームのみ。

### ガイドライン該当箇所（抜粋）

> - _color.scss
>   - 文字 ボーダー 背景などのカラー など
>   - .u-cRed1 .u-bdcBlue1

> - _spase.scss
>   - margin paddingなどの余白指定 など
>   - .u-mt1em .u-my20em .u-pl1em .u-px15em

---

## 変更方針

- **CSS 値は変更しない**（px のまま）
- クラス名のハイフン省略・省略形化のみ
- ガイドラインの命名パターンに合わせる:
  - color 系: `u-text-white` → `u-cWhite`, `u-bg-red` → `u-bgcRed`
  - space 系: `u-mt-20` → `u-mt20`, `u-mx-auto` → `u-mxAuto`
  - font 系: `u-fw-500` → `u-fw500`, `u-fs-14` → `u-fs14`
  - line-height 系: `u-lh-180` → `u-lh180`
  - その他: `u-font-outfit` → `u-fontOutfit`, `u-text-center` → `u-taCenter`

---

## 除外事項（変更しないクラスとその理由）

| クラス | 理由 |
|--------|------|
| `.c-btn`（_typography.scss内） | ユーティリティではなくコンポーネント。スコープ外 |
| `#about-three-vehicles-section .u-img-wrapper img`（_responsive.scss内） | IDセレクタ + ユーティリティの複合。スコープ外 |
| `*`, `body, html`, `a` 等のリセット定義（_responsive.scss内） | ユーティリティクラスではない。スコープ外 |

---

## 完全置換マップ

### A. font-size クラス（_font-size.scss）— 21クラス（命名変更のみ）

| # | 旧クラス名 | 新クラス名 | CSS値（変更なし） | HTML出現数 |
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

**小計: HTML置換 3,020箇所**

### B. font-weight クラス（_font-size.scss）— 6クラス

| # | 旧クラス名 | 新クラス名 | CSS値（変更なし） | HTML出現数 |
|---|-----------|-----------|-----------------|:---:|
| B-01 | `u-fw-300` | `u-fw300` | `font-weight: 300` | 196 |
| B-02 | `u-fw-400` | `u-fw400` | `font-weight: 400` | 58 |
| B-03 | `u-fw-500` | `u-fw500` | `font-weight: 500` | 2249 |
| B-04 | `u-fw-600` | `u-fw600` | `font-weight: 600` | 109 |
| B-05 | `u-fw-700` | `u-fw700` | `font-weight: 700` | 434 |
| B-06 | `u-fw-800` | `u-fw800` | `font-weight: 800` | 1 |

**小計: HTML置換 3,047箇所**

### C. line-height クラス（_font-size.scss）— 8クラス

| # | 旧クラス名 | 新クラス名 | CSS値（変更なし） | HTML出現数 |
|---|-----------|-----------|-----------------|:---:|
| C-01 | `u-lh-100` | `u-lh100` | `line-height: 1em` | 7 |
| C-02 | `u-lh-140` | `u-lh140` | `line-height: 1.4em` | 1 |
| C-03 | `u-lh-150` | `u-lh150` | `line-height: 1.5em` | 31 |
| C-04 | `u-lh-160` | `u-lh160` | `line-height: 1.6em` | 1 |
| C-05 | `u-lh-180` | `u-lh180` | `line-height: 1.8em` | 89 |
| C-06 | `u-lh-200` | `u-lh200` | `line-height: 2em` | 208 |
| C-07 | `u-lh-210` | `u-lh210` | `line-height: 2.1em` | 82 |
| C-08 | `u-lh-normal` | `u-lhNormal` | `line-height: 100%` | 25 |

**小計: HTML置換 444箇所**

### D. letter-spacing クラス（_font-size.scss）— 2クラス

| # | 旧クラス名 | 新クラス名 | CSS値（変更なし） | HTML出現数 |
|---|-----------|-----------|-----------------|:---:|
| D-01 | `u-ls-10` | `u-ls10` | `letter-spacing: 0.1em` | 11 |
| D-02 | `u-ls-20` | `u-ls20` | `letter-spacing: 0.2em` | 78 |

**小計: HTML置換 89箇所**

### E. margin クラス（_space.scss）— 19クラス

| # | 旧クラス名 | 新クラス名 | CSS値（変更なし） | HTML出現数 |
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

**小計: HTML置換 193箇所**

### F. padding クラス（_space.scss）— 1クラス

| # | 旧クラス名 | 新クラス名 | CSS値（変更なし） | HTML出現数 |
|---|-----------|-----------|-----------------|:---:|
| F-01 | `u-py-100` | `u-py100` | `padding-top/bottom: 100px` | 2 |

**小計: HTML置換 2箇所**

### G. color クラス（_color.scss）— 13クラス

| # | 旧クラス名 | 新クラス名 | CSS値（変更なし） | HTML出現数 |
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

**小計: HTML置換 1,344箇所**

### H. typography / その他（_typography.scss）— 5クラス

| # | 旧クラス名 | 新クラス名 | CSS値（変更なし） | HTML出現数 |
|---|-----------|-----------|-----------------|:---:|
| H-01 | `u-font-outfit` | `u-fontOutfit` | `font-family: var(--font-outfit)` | 954 |
| H-02 | `u-font-zen` | `u-fontZen` | `font-family: var(--font-zen)` | 689 |
| H-03 | `u-cursor-pointer` | `u-cursorPointer` | `cursor: pointer` | 40 |
| H-04 | `u-text-blue-hover` | `u-cBlueHover` | `:hover` color + filter | 5 |
| H-05 | `u-text-link` | `u-cLink` | `color + text-decoration` | 21 |

**小計: HTML置換 1,709箇所**

### I. display / layout クラス — 変更なし（8クラス）

| クラス名 | 理由 |
|---------|------|
| `u-block` | 既に準拠 |
| `u-flex` | 既に準拠 |
| `u-grid` | 既に準拠 |
| `u-relative` | 既に準拠 |
| `u-absolute` | 既に準拠 |
| `u-flex-col` | 既に準拠 |
| `u-flex-1` | 既に準拠 |
| `u-grid-cols-3` | 既に準拠 |

### J. layout ユーティリティ — 命名省略形化（6クラス）

| # | 旧クラス名 | 新クラス名 | CSS値（変更なし） | HTML出現数 |
|---|-----------|-----------|-----------------|:---:|
| J-01 | `u-text-center` | `u-taCenter` | `text-align: center` | 71 |
| J-02 | `u-text-right` | `u-taRight` | `text-align: right` | 23 |
| J-03 | `u-z-10` | `u-z10` | `z-index: 10` | 7 |
| J-04 | `u-w-full` | `u-wFull` | `width: 100%` | 9 |
| J-05 | `u-display-sp` | `u-displaySp` | `display: none / block` | 15 |
| J-06 | `u-display-desk` | `u-displayDesk` | `display: block / none` | 7 |

**小計: HTML置換 132箇所**

### K. レスポンシブユーティリティ（_responsive.scss + _global-responsive.scss）— 9クラス

| # | 旧クラス名 | 新クラス名 | CSS値（変更なし） | HTML出現数 |
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

**小計: HTML置換 37箇所**

---

## 総置換数サマリ

| カテゴリ | クラス数 | HTML置換箇所数 |
|---------|:---:|:---:|
| A. font-size | 21 | 3,020 |
| B. font-weight | 6 | 3,047 |
| C. line-height | 8 | 444 |
| D. letter-spacing | 2 | 89 |
| E. margin | 19 | 193 |
| F. padding | 1 | 2 |
| G. color | 13 | 1,344 |
| H. typography/その他 | 5 | 1,709 |
| I. display/layout（変更なし） | 8 | 0 |
| J. layout | 6 | 132 |
| K. レスポンシブ | 9 | 37 |
| **合計** | **98 (うち変更対象 82)** | **約 10,017** |

---

## 処理順序

部分マッチを避けるため、数値の大きいクラスから先に置換する。

### Phase 1: font-size（長い数値から）

```
u-fs-320 → u-fs320
u-fs-100 → u-fs100
u-fs-70  → u-fs70
u-fs-60  → u-fs60
u-fs-54  → u-fs54
u-fs-48  → u-fs48
u-fs-46  → u-fs46
u-fs-39  → u-fs39
u-fs-36  → u-fs36
u-fs-32  → u-fs32
u-fs-30  → u-fs30
u-fs-25  → u-fs25
u-fs-24  → u-fs24
u-fs-20  → u-fs20
u-fs-19  → u-fs19
u-fs-18  → u-fs18
u-fs-16  → u-fs16
u-fs-15  → u-fs15
u-fs-14  → u-fs14
u-fs-13  → u-fs13
u-fs-12  → u-fs12
```

### Phase 2: font-weight, line-height, letter-spacing

```
u-fw-800 → u-fw800
u-fw-700 → u-fw700
u-fw-600 → u-fw600
u-fw-500 → u-fw500
u-fw-400 → u-fw400
u-fw-300 → u-fw300
u-lh-210 → u-lh210
u-lh-200 → u-lh200
u-lh-180 → u-lh180
u-lh-160 → u-lh160
u-lh-150 → u-lh150
u-lh-140 → u-lh140
u-lh-100 → u-lh100
u-lh-normal → u-lhNormal
u-ls-20  → u-ls20
u-ls-10  → u-ls10
```

### Phase 3: margin / padding（長い数値から）

```
u-mt-60  → u-mt60
u-mt-50  → u-mt50
u-mt-40  → u-mt40
u-mt-30  → u-mt30
u-mt-25  → u-mt25
u-mt-20  → u-mt20
u-mt-18  → u-mt18
u-mt-10  → u-mt10
u-mt-5   → u-mt5
u-mb-10  → u-mb10
u-ml-40  → u-ml40
u-ml-20  → u-ml20
u-ml-4   → u-ml4
u-mr-10  → u-mr10
u-mr-5   → u-mr5
u-my-15  → u-my15
u-py-100 → u-py100
u-ml-auto → u-mlAuto
u-mr-auto → u-mrAuto
u-mx-auto → u-mxAuto
```

### Phase 4: color

```
u-bg-lightBlue → u-bgcLightBlue
u-bg-gray      → u-bgcGray
u-bg-white     → u-bgcWhite
u-bg-red       → u-bgcRed
u-bg-peach     → u-bgcPeach
u-bg-brown     → u-bgcBrown
u-text-lightBlue → u-cLightBlue
u-text-lightPink → u-cLightPink
u-text-black1    → u-cBlack1
u-text-white     → u-cWhite
u-text-red       → u-cRed
u-text-peach     → u-cPeach
u-text-brown     → u-cBrown
```

### Phase 5: typography, layout, responsive

```
u-font-outfit    → u-fontOutfit
u-font-zen       → u-fontZen
u-cursor-pointer → u-cursorPointer
u-text-blue-hover → u-cBlueHover
u-text-link      → u-cLink
u-text-center    → u-taCenter
u-text-right     → u-taRight
u-z-10           → u-z10
u-w-full         → u-wFull
u-display-sp     → u-displaySp
u-display-desk   → u-displayDesk
u-sm-block       → u-smBlock
u-md-block       → u-mdBlock
u-lg-block       → u-lgBlock
u-md-fs-16       → u-mdFs16
u-md-fs-20       → u-mdFs20
u-md-fs-50       → u-mdFs50
u-md-mt-20       → u-mdMt20
u-md-mt-70       → u-mdMt70
u-sm-py-50       → u-smPy50
```

---

## 部分マッチ要注意ペア

| 短いクラス | 長いクラス | 対策 |
|-----------|-----------|------|
| `u-fs-12` | `u-fs-120`（削除済み） | 削除済みだが念のためワードバウンダリ使用 |
| `u-fs-13` | `u-fs-130`（存在しない） | リスクなし |
| `u-mt-5` | `u-mt-50` | 50を先に置換 |
| `u-mt-10` | なし | リスクなし |
| `u-mr-5` | なし | リスクなし |
| `u-mr-10` | `u-mr-100`（削除済み） | リスクなし |
| `u-lh-100` | なし | リスクなし |
| `u-ls-10` | なし | リスクなし |
| `u-text-blue-hover` | なし | ハイフン込みで一意 |
| `u-text-center` | なし | `u-text-` 系は color 系より先に置換しない。Phase 5 で最後に処理 |

---

## 検証手順

1. **SCSSコンパイル**: `npx sass assets/scss/global.scss assets/css/global.css --no-source-map`
2. **旧クラス名の残存チェック**: 全ての旧クラス名で SCSS/HTML/CSS を grep し残存がないことを確認
3. **新クラス名の存在チェック**: 全ての新クラス名で CSS を grep し存在することを確認
4. **ブラウザ確認**: 主要ページをPC/SPで目視確認

---

## リスク評価

| リスク | 評価 | 理由 |
|--------|------|------|
| 見た目の崩れ | **なし** | CSS値は一切変更しない。クラス名のリネームのみ |
| 部分マッチ誤置換 | **低** | 数値の大きいクラスから先に処理。ワードバウンダリ使用 |
| 大量置換による漏れ | **低〜中** | 置換後に旧名で grep し残存ゼロを確認 |
| コンパイルエラー | **なし** | 単純なクラス名変更のみ |
