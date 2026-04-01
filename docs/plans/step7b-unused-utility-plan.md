# Step 7b: 未使用ユーティリティクラスの削除 — 実行計画

## 概要

- **目的**: HTML/JS で未使用のユーティリティクラスを SCSS から削除し、CSS 肥大化を解消する
- **根拠**: コーディングガイドライン「Utility は最小限：汎用性の高いものだけ」に準拠
- **前提**: Step 7a 完了済み（全ユーティリティに `u-` プレフィクス付与済み）

## 調査結果サマリー

| 項目 | 数値 |
|------|------|
| 定義済みクラス総数 | 1,589 |
| **使用中クラス** | **97** |
| **未使用（削除対象）** | **1,492** |
| 使用率 | 6.1% |
| 対象 SCSS ファイル数 | 8 |
| 変更不要ファイル | 1（`_global-responsive.scss`） |
| 現在の global.css サイズ | 181KB / 11,229行 |

## 調査方法

3つの独立した手法で使用クラスを抽出し、**全手法で同一の97件**であることを確認した。

| 手法 | 概要 | 結果 |
|------|------|------|
| 手法A: grep `\b` | 全HTML/JSを `\b` 境界で grep | 97件 |
| 手法B: class属性分解 | HTML の `class="..."` を空白分解し u-* を抽出 | 97件 |
| 手法C: Python 正規表現 | 改行を含む class 属性にも対応した抽出 | 97件 |

追加検証:
- SCSS 内の `@extend` / `@include` / `@mixin` 相互参照 → **なし**
- `_global-responsive.scss` での `u-*` 参照 → 4件（すべて使用済み）
- JS ファイル内の classList 操作での `u-*` 参照 → **なし**（`u-btn` 等は ID の部分文字列であり偽陽性）
- 部分マッチのスポットチェック（`u-fs-10` vs `u-fs-100`, `u-mt-5` vs `u-mt-50`, `u-lh-15` vs `u-lh-150`）→ **全件正確**

## 重複定義の整理

以下の4クラスは `_responsive.scss` と `_global-responsive.scss` の両方で定義されている。
`_responsive.scss` 側を削除しても `_global-responsive.scss` 側が残るため、**CSS の出力結果は変わらない**。

| クラス | `_responsive.scss` | `_global-responsive.scss` | 方針 |
|--------|-------|-------|------|
| `u-lg-block` | L3 (`@media max-width:1024px` 内) | L91 | _responsive 側を削除。_global-responsive 側が残る |
| `u-md-block` | L943 (`@media max-width:768px` 内) | L16, L95 | 同上 |
| `u-display-sp` | L2847（メディアクエリ外） | L85 | 同上 |
| `u-display-desk` | L2850（メディアクエリ外） | L88 | 同上 |

## `_responsive.scss` 内の非ユーティリティコードの扱い

`_responsive.scss` には utility クラス定義以外のコードが混入している。
これらは **削除してはならない**。

| 行 | 内容 | 方針 |
|----|------|------|
| L1917-1920 | `#about-three-vehicles-section .u-img-wrapper img { ... }` | **残存**（`@media max-width:768px` ブロック内のプロジェクトスタイル） |
| L2820-2824 | `* { box-sizing: border-box; margin: 0; padding: 0; }` | **残存**（リセットCSS） |
| L2826-2830 | `body, html { margin: 0 !important; padding: 0 !important; }` | **残存** |
| L2832-2834 | `html { overflow-x: hidden; }` | **残存** |
| L2836-2838 | `body { overflow-x: clip; }` | **残存** |
| L2840-2842 | `html { scroll-behavior: smooth; }` | **残存** |
| L2844-2846 | `a { text-decoration: none; }` | **残存** |
| L2854-2856 | コメント `/* END GENERAL UTILITIES */` | **残存** |

> **注意**: L2820-2846 のリセットCSS は本来 `foundation/_reset.scss` に属すべきコードだが、移動は見た目に影響するリスクがあるため **Step 7b では移動せず現在位置に残す**。

## ファイル別 削除/残存 一覧

---

### 1. `_color.scss`（total: 18, keep: 13, delete: 5）

**残存（KEEP）** — 13件:

| クラス | 使用ファイル数 |
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

**削除（DELETE）** — 5件:
`u-bg-base-black1`（L4-6）, `u-bg-grayBlue`（L16-18）, `u-bg-lightGray`（L10-12）, `u-bg-linearLightGray`（L13-15）, `u-text-underline`（L56-58）

---

### 2. `_column.scss`（total: 15, keep: 1, delete: 14）

**残存（KEEP）** — 1件:

| クラス | 使用ファイル数 |
|--------|--------------|
| `u-w-full` | 6 |

**削除（DELETE）** — 14件:
`u-col-auto`（L1-3）, `u-col-1` 〜 `u-col-12`（L4-39, 12件）, `u-w-fit-content`（L45-47）
コメントブロック（L48-52）も削除

---

### 3. `_display.scss`（total: 8, keep: 3, delete: 5）

**残存（KEEP）** — 3件:

| クラス | 使用ファイル数 |
|--------|--------------|
| `u-block` | 2 |
| `u-flex` | 5 |
| `u-grid` | 1 |

**削除（DELETE）** — 5件:
`u-hidden`（L23-25）, `u-inline`（L8-10）, `u-inline-block`（L5-7）, `u-inline-flex`（L14-16）, `u-inline-grid`（L20-22）

---

### 4. `_font-size.scss`（total: 88, keep: 37, delete: 51）

**残存（KEEP）** — 37件:

| カテゴリ | クラス（使用ファイル数） |
|---------|--------|
| font-size (21件) | `u-fs-12`(23), `u-fs-13`(23), `u-fs-14`(23), `u-fs-15`(23), `u-fs-16`(23), `u-fs-18`(23), `u-fs-19`(1), `u-fs-20`(3), `u-fs-24`(15), `u-fs-25`(2), `u-fs-30`(4), `u-fs-32`(5), `u-fs-36`(14), `u-fs-39`(5), `u-fs-46`(1), `u-fs-48`(1), `u-fs-54`(1), `u-fs-60`(8), `u-fs-70`(1), `u-fs-100`(10), `u-fs-320`(2) |
| font-weight (6件) | `u-fw-300`(13), `u-fw-400`(23), `u-fw-500`(23), `u-fw-600`(10), `u-fw-700`(23), `u-fw-800`(1) |
| line-height (8件) | `u-lh-100`(4), `u-lh-140`(1), `u-lh-150`(6), `u-lh-160`(1), `u-lh-180`(23), `u-lh-200`(14), `u-lh-210`(7), `u-lh-normal`(10) |
| letter-spacing (2件) | `u-ls-10`(5), `u-ls-20`(2) |

**削除（DELETE）** — 51件:

| カテゴリ | クラス |
|---------|--------|
| font-size (18件) | `u-fs-8`, `u-fs-10`, `u-fs-11`, `u-fs-17`, `u-fs-22`, `u-fs-23`, `u-fs-26`, `u-fs-27`, `u-fs-28`, `u-fs-35`, `u-fs-38`, `u-fs-40`, `u-fs-44`, `u-fs-50`, `u-fs-52`, `u-fs-56`, `u-fs-64`, `u-fs-66`, `u-fs-68`, `u-fs-74`, `u-fs-120` |
| font-weight (3件) | `u-fw-100`, `u-fw-200`, `u-fw-900` |
| line-height (15件) | `u-lh-5`, `u-lh-10`, `u-lh-15`, `u-lh-20`, `u-lh-25`, `u-lh-30`, `u-lh-40`, `u-lh-50`, `u-lh-75`, `u-lh-120`, `u-lh-130`, `u-lh-170`, `u-lh-190`, `u-lh-14px`, `u-lh-64px` |
| letter-spacing (12件) | `u-ls-3`, `u-ls-4`, `u-ls-5`, `u-ls-6`, `u-ls-7`, `u-ls-8`, `u-ls-9`, `u-ls-15`, `u-ls-25`, `u-ls-30`, `u-ls-40`, `u-ls-50` |

---

### 5. `_layout.scss`（total: 191, keep: 8, delete: 183）

**残存（KEEP）** — 8件:

| クラス | 使用ファイル数 |
|--------|--------------|
| `u-absolute` | 1 |
| `u-flex-1` | 2 |
| `u-flex-col` | 2 |
| `u-grid-cols-3` | 1 |
| `u-relative` | 23 |
| `u-text-center` | 23 |
| `u-text-right` | 23 |
| `u-z-10` | 2 |

**削除（DELETE）** — 183件:
- position 系 (3): `u-static`, `u-fixed`, `u-sticky`
- top/right/bottom/left 系 (6): `u-top-0`, `u-right-0`, `u-bottom-0`, `u-left-0`, `u-top-1/2`, `u-left-1/2`
- transform 系 (4): `u-translate-x-1/2`, `u-translate-y-1/2`, `u--translate-x-1/2`, `u--translate-y-1/2`
- border-radius 系 (5): `u-radius-4`, `u-radius-24`, `u-radius-50`, `u-radius-99`, `u-radius-100`
- z-index 系 (5): `u-z-0`, `u-z-20`, `u-z-30`, `u-z-40`, `u-z-50`
- overflow 系 (3): `u-overflow-hidden`, `u-overflow-auto`, `u-overflow-scroll`
- flex-direction 系 (3): `u-flex-row`, `u-flex-row-reverse`, `u-flex-col-reverse`
- flex-wrap 系 (3): `u-flex-wrap`, `u-flex-nowrap`, `u-flex-wrap-reverse`
- align-items 系 (5): `u-items-start`, `u-items-center`, `u-items-end`, `u-items-stretch`, `u-items-baseline`
- justify-content 系 (6): `u-justify-start`, `u-justify-center`, `u-justify-end`, `u-justify-between`, `u-justify-around`, `u-justify-evenly`
- align-content 系 (6): `u-content-center`, `u-content-start`, `u-content-end`, `u-content-between`, `u-content-around`, `u-content-evenly`
- align-self 系 (5): `u-self-auto`, `u-self-start`, `u-self-center`, `u-self-end`, `u-self-stretch`
- flex 拡大 系 (3): `u-flex-auto`, `u-flex-initial`, `u-flex-none`
- gap 系 (108): `u-gap-0` 〜 `u-gap-8`(rem), `u-gap-1px` 〜 `u-gap-100px`, `u-gap-150px`
- grid-cols 系 (6): `u-grid-cols-1`, `u-grid-cols-2`, `u-grid-cols-4`, `u-grid-cols-5`, `u-grid-cols-6`, `u-grid-cols-12`
- grid-rows 系 (4): `u-grid-rows-1` 〜 `u-grid-rows-4`
- place 系 (2): `u-place-items-center`, `u-place-content-center`
- text-align 系 (2): `u-text-left`, `u-text-justify`
- vertical-align 系 (4): `u-align-top`, `u-align-middle`, `u-align-bottom`, `u-align-baseline`

---

### 6. `_space.scss`（total: 402, keep: 20, delete: 382）

**残存（KEEP）** — 20件:

| クラス | 使用ファイル数 |
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

**削除（DELETE）** — 382件:
- 全 `u-p-*` 系 (34件)
- 全 `u-pt-*` 系 (34件)
- 全 `u-pr-*` 系 (30件)
- 全 `u-pb-*` 系 (35件)
- 全 `u-pl-*` 系 (28件)
- 全 `u-px-*` 系 (18件)
- `u-py-*` 系のうち `u-py-100` 以外 (17件)
- 全 `u-m-*` 系 (32件)
- `u-mt-*` 系のうち KEEP 以外 (28件)
- `u-mr-*` 系のうち KEEP 以外 (30件)
- `u-mb-*` 系のうち `u-mb-10` 以外 (31件)
- `u-ml-*` 系のうち KEEP 以外 (28件)
- `u-mx-*` 系のうち `u-mx-auto` 以外 (10件)
- `u-my-*` 系のうち `u-my-15` 以外 (10件)
- 全 `u-cg-*` 系 (20件)

---

### 7. `_typography.scss`（total: 7, keep: 5, delete: 2）

**残存（KEEP）** — 5件:

| クラス | 使用ファイル数 |
|--------|--------------|
| `u-cursor-pointer` | 23 |
| `u-font-outfit` | 23 |
| `u-font-zen` | 23 |
| `u-text-blue-hover` | 5 |
| `u-text-link` | 3 |

※ `u-text-blue-hover` は `.u-text-blue-hover:hover` + `.u-text-blue-hover:hover ~ .img-blue` の2ルール — 両方残存
※ `.c-btn`（L18-22）は component クラスの混入 — Step 7b では触らない（残存）

**削除（DELETE）** — 2件:
`u-text-italic`（L11-13）, `u-text-decoration-none`（L14-16）

---

### 8. `_responsive.scss`（total: 860 utility + 非utility, keep: 10 utility + 非utility, delete: 850 utility）

**ファイル構造:**

| 行範囲 | 内容 | 方針 |
|--------|------|------|
| L1 | コメント | 残存 |
| L2-907 | `@media (max-width: 1024px)` — lg 系 285件 | 全 utility 削除 → **メディアクエリごと削除** |
| L909-1921 | `@media (max-width: 768px)` — md 系 | md utility 削除。**L1917-1920 の非utility ルールは残存** |
| L1923-1925 | `.u-sm-block { display: none }` | 残存 |
| L1927-2818 | `@media (max-width: 767px)` — sm 系 | sm utility 削除。**`u-sm-py-50` は残存** |
| L2820-2846 | **リセットCSS（非utility）** | **絶対に削除しない** |
| L2847-2852 | `u-display-sp`, `u-display-desk` | 残存 |
| L2854-2856 | コメント | 残存 |

**残存（KEEP）** — utility 10件 + 非utility コード:

| クラス/コード | 行 | 理由 |
|-------|-----|------|
| `u-display-sp` | L2847-2849 | HTML 7ファイルで使用 |
| `u-display-desk` | L2850-2852 | HTML 5ファイルで使用 |
| `u-md-block` | L943 | HTML 6ファイルで使用（※ `_global-responsive.scss` にも重複定義あり） |
| `u-md-fs-16` | md ブロック内 | HTML 1ファイルで使用 |
| `u-md-fs-20` | md ブロック内 | HTML 1ファイルで使用 |
| `u-md-fs-50` | md ブロック内 | HTML 1ファイルで使用 |
| `u-md-mt-20` | md ブロック内 | HTML 1ファイルで使用 |
| `u-md-mt-70` | md ブロック内 | HTML 1ファイルで使用 |
| `u-sm-block` | L1923-1925 + L1928-1930 | HTML 6ファイルで使用 |
| `u-sm-py-50` | sm ブロック内 | HTML 1ファイルで使用 |
| `u-img-wrapper` 参照 | L1917-1920 | 非utility（`#about-three-vehicles-section .u-img-wrapper img`）。**削除禁止** |
| リセットCSS | L2820-2846 | `*`, `body`, `html`, `a` のリセット。**削除禁止** |
| コメント | L2854-2856 | 残存 |

**重複定義の注意点:**

`u-lg-block`（L3）, `u-md-block`（L943）, `u-display-sp`（L2847）, `u-display-desk`（L2850）は `_global-responsive.scss` にも定義がある。`_responsive.scss` 側を削除しても `_global-responsive.scss` 側が残るため CSS 出力は変わらない。ただし `u-md-block` の `_responsive.scss` 側定義は `@media (max-width: 768px)` 内にあり、`_global-responsive.scss` 側のメディアクエリ条件が同じか要確認。

確認結果:
- `_responsive.scss` L943: `@media (max-width: 768px)` 内 → `display: block`
- `_global-responsive.scss` L16: `@media (max-width: 1024px)` 内 → `display: block`
- `_global-responsive.scss` L95: `@media (max-width: 767px)` 内 → `display: none`

→ **ブレークポイントが異なる（768px vs 1024px）。** `_responsive.scss` 側を削除すると 768px〜1024px 間の挙動が変わる可能性があるため、**安全側に倒し `_responsive.scss` 側の `u-md-block`（L943）も残存とする。**

**削除（DELETE）** — 850件: lg 全系、md 系のうち上記 KEEP 以外、sm 系のうち上記 KEEP 以外

---

### 9. `_global-responsive.scss`（変更不要）

`u-md-block`（L16, L95）, `u-display-sp`（L85）, `u-display-desk`（L88）, `u-lg-block`（L91）を定義。
すべて使用中のため変更なし。

---

## 除外条件

1. **HTML/JS で1箇所以上使用されている**クラスは残存
2. **SCSS 内の `@extend` 参照** → 調査済み、該当なし
3. **`_global-responsive.scss` での定義** → 変更不要
4. **`.c-btn`（`_typography.scss` L18-22）** → component クラスの混入、Step 7b 範囲外
5. **リセットCSS（`_responsive.scss` L2820-2846）** → 非utility コード、削除禁止
6. **`#about-three-vehicles-section .u-img-wrapper img`（`_responsive.scss` L1917-1920）** → 非utility ルール、削除禁止
7. **ブレークポイントが異なる重複定義**（`u-md-block`）→ 安全側に倒し両方残存

## 作業順序

SCSS のみの変更（HTML/JS は変更なし）:

1. `_color.scss` — 5件削除
2. `_column.scss` — 14件削除（`u-w-full` のみ残す）
3. `_display.scss` — 5件削除
4. `_font-size.scss` — 51件削除
5. `_layout.scss` — 183件削除
6. `_space.scss` — 382件削除
7. `_typography.scss` — 2件削除（`.c-btn` は残す）
8. `_responsive.scss` — 850件削除（**非utility コード L1917-1920, L2820-2856 は残す**）
9. SCSS コンパイル: `npx sass assets/scss/global.scss assets/css/global.css --no-source-map`
10. 残存チェック: 削除クラスのサンプル10件を CSS で grep し、存在しないことを確認
11. 残存チェック: KEEP クラス全97件を CSS で grep し、存在することを確認
12. ブラウザ確認依頼

## リスク評価

| リスク | 評価 | 理由 |
|--------|------|------|
| 見た目の崩れ | **極低** | 削除するのは HTML/JS で参照されていないクラスのみ。3手法で検証済み |
| 非utility コードの誤削除 | **なし** | `_responsive.scss` 内の非utility コード（リセットCSS, #about ルール）を明確に特定・除外済み |
| 重複定義の不整合 | **なし** | `u-md-block` はブレークポイント差異の可能性があるため安全側に倒し残存 |
| コンパイルエラー | **なし** | 単純なクラス定義削除のみ。変数や mixin の依存関係なし |

## 期待される効果

- **CSS 行数**: 約 11,229行 → 推定 約 5,500行（約50%削減）
- **CSS サイズ**: 約 181KB → 推定 約 90KB（約50%削減）
- **Step 7c の作業対象**: 1,589クラス → 97クラスに大幅削減
