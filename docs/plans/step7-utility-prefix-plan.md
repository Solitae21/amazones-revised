# Step 7a: ユーティリティクラスの `u-` プレフィクス付与 — 実行計画

作成日: 2026-04-01
ステータス: ✅ 完了（2026-04-01）
実績: SCSS 9ファイル 1,589クラス定義置換 + HTML 23ファイル 10,254箇所置換

---

## 概要

FLOCSS 名前空間の衝突解消を目的として、すべてのユーティリティクラスに `u-` プレフィクスを付与する。
対象は SCSS 定義（9ファイル）+ HTML 参照（23ファイル）。

**本ステップ（7a）のスコープ**: `u-` プレフィクス付与のみ。命名規則（rem化・省略形化）やユーティリティの棚卸しは将来の Step 7b/7c として別途実施する。

**JS ファイルの変更は不要**（調査の結果、JS はユーティリティクラスを参照していない）。

### ガイドライン準拠に関する注記

コーディングガイドラインでは、Utility の命名に `.u-fs1rem`, `.u-mt06rem` 等の省略形・rem 単位を求めている。
現在のユーティリティ（`.fs-15`, `.mt-10` 等）はこの規則に準拠していないが、命名規則の完全統一は作業量・リスクともに非常に大きいため、段階的に対応する。

| Step | 内容 | 目的 |
|------|------|------|
| **7a（本計画）** | `u-` プレフィクス付与 | FLOCSS 名前空間衝突の解消（特に `.p-*` パディング vs `.p-*` Project） |
| 7b（将来） | 未使用ユーティリティの削除 | 肥大化（1,094クラス）の解消 |
| 7c（将来） | 命名・単位のガイドライン完全準拠 | `.u-fs1rem` 形式への統一、rem化 |

---

## 対象ファイル

### SCSS（定義側）— 9ファイル

| ファイル | クラス数 | 内容 |
|---------|:---:|------|
| `assets/scss/object/utility/_color.scss` | 18 | bg-*, text-*（色） |
| `assets/scss/object/utility/_typography.scss` | 6 | font-*, text-italic 等 |
| `assets/scss/object/utility/_display.scss` | 8 | block, flex, hidden 等 |
| `assets/scss/object/utility/_font-size.scss` | 91 | fs-*, fw-*, lh-*, ls-* |
| `assets/scss/object/utility/_space.scss` | ~217 | p-*, pt-*, m-*, mt-* 等 |
| `assets/scss/object/utility/_layout.scss` | ~184 | position, flexbox, grid, gap 等 |
| `assets/scss/object/utility/_column.scss` | 15 | col-*, w-full, w-fit-content |
| `assets/scss/object/utility/_responsive.scss` | ~551 | lg-*, sm-* レスポンシブ変異体 |
| `assets/scss/_global-responsive.scss` | 4 | display-sp, display-desk, md-block, lg-block |
| **合計** | **~1,094** | |

### HTML（参照側）— 23ファイル

| ファイル | ユーティリティ使用数（推定） |
|---------|:---:|
| storelist/[slag]/index.html | 336 |
| index.html | 175 |
| medical/index.html | 169 |
| protein/index.html | 161 |
| price/index.html | 144 |
| reservation/index.html | 142 |
| sportip/index.html | 141 |
| point_redemption/index.html | 138 |
| admission/index.html | 136 |
| visitor/index.html | 134 |
| family/index.html | 131 |
| personal/index.html | 130 |
| payment/index.html | 129 |
| storelist/index.html | 125 |
| column/[slag]/index.html | 122 |
| contact/index.html | 118 |
| member/index.html | 113 |
| about/index.html | 111 |
| faq/index.html | 105 |
| sitemap/index.html | 97 |
| rules/index.html | 95 |
| column/index.html | 92 |
| information/index.html | 92 |
| **全 HTML 合計** | **~3,056箇所** |

### CSS（コンパイル後）

SCSSコンパイルで自動生成されるため手動変更不要。最後に `npx sass` で再コンパイル。

---

## 置換マップ

### カテゴリ 1: 背景色（_color.scss）

| 旧名 | 新名 | HTML使用数 |
|------|------|:---:|
| `.bg-base-black1` | `.u-bg-base-black1` | 0 |
| `.bg-brown` | `.u-bg-brown` | 3 |
| `.bg-gray` | `.u-bg-gray` | 3 |
| `.bg-grayBlue` | `.u-bg-grayBlue` | 0 |
| `.bg-lightBlue` | `.u-bg-lightBlue` | 2 |
| `.bg-lightGray` | `.u-bg-lightGray` | 0 |
| `.bg-linearLightGray` | `.u-bg-linearLightGray` | 0 |
| `.bg-peach` | `.u-bg-peach` | 3 |
| `.bg-red` | `.u-bg-red` | 3 |
| `.bg-white` | `.u-bg-white` | 5 |

### カテゴリ 2: テキスト色（_color.scss）

| 旧名 | 新名 | HTML使用数 |
|------|------|:---:|
| `.text-black1` | `.u-text-black1` | 120 |
| `.text-brown` | `.u-text-brown` | 6 |
| `.text-lightBlue` | `.u-text-lightBlue` | 468 |
| `.text-lightPink` | `.u-text-lightPink` | 12 |
| `.text-peach` | `.u-text-peach` | 6 |
| `.text-red` | `.u-text-red` | 20 |
| `.text-underline` | `.u-text-underline` | 0 |
| `.text-white` | `.u-text-white` | 716 |

### カテゴリ 3: テキストスタイル（_typography.scss）

| 旧名 | 新名 | HTML使用数 |
|------|------|:---:|
| `.font-outfit` | `.u-font-outfit` | 977 |
| `.font-zen` | `.u-font-zen` | 689 |
| `.text-italic` | `.u-text-italic` | 0 |
| `.text-decoration-none` | `.u-text-decoration-none` | 0 |
| `.cursor-pointer` | `.u-cursor-pointer` | 40 |
| `.text-blue-hover` | `.u-text-blue-hover` | 5 |
| `.text-link` | `.u-text-link` | 24 |

**除外**: `.c-btn`（_typography.scss 内に定義されているがコンポーネントクラスのため対象外）

### カテゴリ 4: ディスプレイ（_display.scss）

| 旧名 | 新名 | HTML使用数 |
|------|------|:---:|
| `.block` | `.u-block` | 6 |
| `.inline-block` | `.u-inline-block` | 0 |
| `.inline` | `.u-inline` | 0 |
| `.flex` | `.u-flex` | 25 |
| `.inline-flex` | `.u-inline-flex` | 0 |
| `.grid` | `.u-grid` | 1 |
| `.inline-grid` | `.u-inline-grid` | 0 |
| `.hidden` | `.u-hidden` | 6 |

### カテゴリ 5: フォントサイズ（_font-size.scss）

| 旧名パターン | 新名パターン | HTML使用数（主要） |
|------|------|:---:|
| `.fs-{N}` (42種) | `.u-fs-{N}` | fs-15: 1164, fs-16: 728, fs-14: 379, fs-18: 260 等 |
| `.fw-{N}` (9種) | `.u-fw-{N}` | fw-500: 2249, fw-700: 434, fw-300: 196 等 |
| `.lh-{N}` (23種) | `.u-lh-{N}` | lh-200: 208, lh-180: 89, lh-210: 82 等 |
| `.ls-{N}` (14種) | `.u-ls-{N}` | ls-20: 78, ls-10: 11 等 |

### カテゴリ 6: テキスト配置（_layout.scss）

| 旧名 | 新名 | HTML使用数 |
|------|------|:---:|
| `.text-center` | `.u-text-center` | 71 |
| `.text-justify` | `.u-text-justify` | 0 |
| `.text-left` | `.u-text-left` | 2 |
| `.text-right` | `.u-text-right` | 24 |

### カテゴリ 7: ポジション（_layout.scss）

| 旧名 | 新名 | HTML使用数 |
|------|------|:---:|
| `.absolute` | `.u-absolute` | 2 |
| `.fixed` | `.u-fixed` | 0 |
| `.relative` | `.u-relative` | 188 |
| `.static` | `.u-static` | 0 |
| `.sticky` | `.u-sticky` | 0 |

### カテゴリ 8: ポジションオフセット・トランスフォーム（_layout.scss）

| 旧名 | 新名 | HTML使用数 |
|------|------|:---:|
| `.bottom-0` | `.u-bottom-0` | 0 |
| `.left-0` | `.u-left-0` | 0 |
| `.left-1\/2` | `.u-left-1\/2` | 0 |
| `.right-0` | `.u-right-0` | 0 |
| `.top-0` | `.u-top-0` | 0 |
| `.top-1\/2` | `.u-top-1\/2` | 0 |
| `.translate-x-1\/2` | `.u-translate-x-1\/2` | 0 |
| `.translate-y-1\/2` | `.u-translate-y-1\/2` | 0 |
| `.-translate-x-1\/2` | `.u--translate-x-1\/2` | 0 |
| `.-translate-y-1\/2` | `.u--translate-y-1\/2` | 0 |

### カテゴリ 9: ボーダー・z-index・overflow（_layout.scss）

| 旧名 | 新名 | HTML使用数 |
|------|------|:---:|
| `.radius-4` | `.u-radius-4` | 0 |
| `.radius-24` | `.u-radius-24` | 0 |
| `.radius-50` | `.u-radius-50` | 0 |
| `.radius-99` | `.u-radius-99` | 0 |
| `.radius-100` | `.u-radius-100` | 0 |
| `.z-0` | `.u-z-0` | 0 |
| `.z-10` | `.u-z-10` | 7 |
| `.z-3` | `.u-z-3` | 6 |
| `.z-20` | `.u-z-20` | 0 |
| `.z-30` | `.u-z-30` | 0 |
| `.z-40` | `.u-z-40` | 0 |
| `.z-50` | `.u-z-50` | 0 |
| `.overflow-auto` | `.u-overflow-auto` | 0 |
| `.overflow-hidden` | `.u-overflow-hidden` | 0 |
| `.overflow-scroll` | `.u-overflow-scroll` | 0 |

### カテゴリ 10: Flexbox（_layout.scss）

| 旧名 | 新名 | HTML使用数 |
|------|------|:---:|
| `.flex-col` | `.u-flex-col` | 78 |
| `.flex-col-reverse` | `.u-flex-col-reverse` | 0 |
| `.flex-row` | `.u-flex-row` | 5 |
| `.flex-row-reverse` | `.u-flex-row-reverse` | 0 |
| `.flex-nowrap` | `.u-flex-nowrap` | 0 |
| `.flex-wrap` | `.u-flex-wrap` | 0 |
| `.flex-wrap-reverse` | `.u-flex-wrap-reverse` | 0 |
| `.items-baseline` | `.u-items-baseline` | 0 |
| `.items-center` | `.u-items-center` | 0 |
| `.items-end` | `.u-items-end` | 0 |
| `.items-start` | `.u-items-start` | 0 |
| `.items-stretch` | `.u-items-stretch` | 0 |
| `.justify-around` | `.u-justify-around` | 0 |
| `.justify-between` | `.u-justify-between` | 0 |
| `.justify-center` | `.u-justify-center` | 0 |
| `.justify-end` | `.u-justify-end` | 0 |
| `.justify-evenly` | `.u-justify-evenly` | 0 |
| `.justify-start` | `.u-justify-start` | 0 |
| `.content-around` | `.u-content-around` | 0 |
| `.content-between` | `.u-content-between` | 0 |
| `.content-center` | `.u-content-center` | 0 |
| `.content-end` | `.u-content-end` | 0 |
| `.content-evenly` | `.u-content-evenly` | 0 |
| `.content-start` | `.u-content-start` | 0 |
| `.self-auto` | `.u-self-auto` | 0 |
| `.self-center` | `.u-self-center` | 0 |
| `.self-end` | `.u-self-end` | 0 |
| `.self-start` | `.u-self-start` | 1 |
| `.self-stretch` | `.u-self-stretch` | 0 |
| `.flex-1` | `.u-flex-1` | 0 |
| `.flex-auto` | `.u-flex-auto` | 0 |
| `.flex-initial` | `.u-flex-initial` | 0 |
| `.flex-none` | `.u-flex-none` | 0 |

### カテゴリ 11: Gap（_layout.scss）

| 旧名パターン | 新名パターン | HTML使用数（主要） |
|------|------|:---:|
| `.gap-{N}` (8種: 0-8) | `.u-gap-{N}` | gap-4: 30, gap-3: 13, gap-2: 3 |
| `.gap-{N}px` (100+種) | `.u-gap-{N}px` | gap-15: 7, gap-30: 6, gap-50: 3 |

### カテゴリ 12: Grid（_layout.scss）

| 旧名 | 新名 | HTML使用数 |
|------|------|:---:|
| `.grid-cols-1` 〜 `.grid-cols-12` | `.u-grid-cols-*` | grid-cols-3: 1 |
| `.grid-rows-1` 〜 `.grid-rows-4` | `.u-grid-rows-*` | 0 |
| `.place-content-center` | `.u-place-content-center` | 0 |
| `.place-items-center` | `.u-place-items-center` | 0 |

### カテゴリ 13: Vertical Align（_layout.scss）

| 旧名 | 新名 | HTML使用数 |
|------|------|:---:|
| `.align-baseline` | `.u-align-baseline` | 0 |
| `.align-bottom` | `.u-align-bottom` | 0 |
| `.align-middle` | `.u-align-middle` | 0 |
| `.align-top` | `.u-align-top` | 0 |

### カテゴリ 14: スペーシング — パディング（_space.scss）

| 旧名パターン | 新名パターン | HTML使用数 |
|------|------|:---:|
| `.p-{N}` (33種) | `.u-p-{N}` | **0**（HTML未使用。SCSS定義のみ変更） |
| `.pt-{N}` (34種) | `.u-pt-{N}` | 0 |
| `.pb-{N}` (33種) | `.u-pb-{N}` | 0 |
| `.pl-{N}` (30種) | `.u-pl-{N}` | 0 |
| `.pr-{N}` (31種) | `.u-pr-{N}` | 0 |
| `.px-{N}` (18種) | `.u-px-{N}` | 0 |
| `.py-{N}` (19種) | `.u-py-{N}` | 6 |

### カテゴリ 15: スペーシング — マージン（_space.scss）

| 旧名パターン | 新名パターン | HTML使用数（主要） |
|------|------|:---:|
| `.m-{N}` (32種) | `.u-m-{N}` | ※下記注意参照 |
| `.mt-{N}` (35種) | `.u-mt-{N}` | 60 |
| `.mb-{N}` (31種) | `.u-mb-{N}` | 69 |
| `.ml-{N}` (32種, ml-auto含む) | `.u-ml-{N}` | 16 |
| `.mr-{N}` (33種, mr-auto含む) | `.u-mr-{N}` | 100 |
| `.mx-{N}` (11種, mx-auto含む) | `.u-mx-{N}` | 15 |
| `.my-{N}` (11種, my-auto含む) | `.u-my-{N}` | 1 |
| `.cg-{N}` (20種) | `.u-cg-{N}` | 0 |

> **注意**: `m-*` の HTML 使用数 847 は `member`, `medical`, `map` 等のコンポーネントクラスも含むため過大。実際のマージンユーティリティ使用は限定的。

### カテゴリ 16: カラム（_column.scss）

| 旧名 | 新名 | HTML使用数 |
|------|------|:---:|
| `.col-auto` | `.u-col-auto` | 0 |
| `.col-1` 〜 `.col-12` | `.u-col-1` 〜 `.u-col-12` | 0 |
| `.w-full` | `.u-w-full` | 4 |
| `.w-fit-content` | `.u-w-fit-content` | 0 |

### カテゴリ 17: 表示切替（_global-responsive.scss）

| 旧名 | 新名 | HTML使用数 |
|------|------|:---:|
| `.display-sp` | `.u-display-sp` | 15 |
| `.display-desk` | `.u-display-desk` | 7 |
| `.md-block` | `.u-md-block` | 9 |

### カテゴリ 18: レスポンシブユーティリティ（_responsive.scss）

| 旧名パターン | 新名パターン | HTML使用数（主要） |
|------|------|:---:|
| `.lg-block` | `.u-lg-block` | _global-responsive で定義 |
| `.lg-hidden` | `.u-lg-hidden` | 0 |
| `.lg-flex` | `.u-lg-flex` | 0 |
| `.lg-flex-col` | `.u-lg-flex-col` | 0 |
| `.lg-text-center` | `.u-lg-text-center` | 0 |
| `.lg-fs-{N}` | `.u-lg-fs-{N}` | 0 |
| `.lg-fw-{N}` | `.u-lg-fw-{N}` | 0 |
| `.lg-lh-{N}` | `.u-lg-lh-{N}` | 0 |
| `.lg-p-{N}` 等 | `.u-lg-p-{N}` 等 | 0 |
| `.lg-m-{N}` 等 | `.u-lg-m-{N}` 等 | 0 |
| `.lg-col-{N}` | `.u-lg-col-{N}` | 0 |
| `.lg-cg-{N}` | `.u-lg-cg-{N}` | 0 |
| `.lg-gap-{N}px` | `.u-lg-gap-{N}px` | 0 |
| `.sm-block` | `.u-sm-block` | 8 |
| `.sm-hidden` | `.u-sm-hidden` | 0 |
| `.sm-flex` | `.u-sm-flex` | 0 |
| `.sm-flex-col` | `.u-sm-flex-col` | 0 |
| `.sm-text-center` | `.u-sm-text-center` | 0 |
| `.sm-fs-{N}` | `.u-sm-fs-{N}` | 0 |
| `.sm-fw-{N}` | `.u-sm-fw-{N}` | 0 |
| `.sm-lh-{N}` | `.u-sm-lh-{N}` | 0 |
| `.sm-p-{N}` 等 | `.u-sm-p-{N}` 等 | 0 |
| `.sm-m-{N}` 等 | `.u-sm-m-{N}` 等 | 0 |
| `.sm-py-{N}` | `.u-sm-py-{N}` | 4 (sm-py-50) |
| `.sm-col-{N}` | `.u-sm-col-{N}` | 0 |
| `.sm-cg-{N}` | `.u-sm-cg-{N}` | 0 |
| `.sm-gap-{N}px` | `.u-sm-gap-{N}px` | 0 |

---

## 除外対象

以下は **置換対象外** とする。

| クラス | 理由 |
|--------|------|
| `.c-btn`（_typography.scss 内） | コンポーネントクラス。`u-` 対象外 |
| `.text-vertical`（_header.scss 内） | レイアウトファイルで定義されるヘッダー専用クラス |
| `.text-nowrap`（HTML使用、SCSS未定義） | ユーティリティ SCSS に定義なし。別途対応 |
| `.c-bg-gray-full` 等 `-full` 系 | コンポーネントクラス（`c-` プレフィクス済み） |
| `.col-centered`, `.col-gap` 等 | ユーティリティ SCSS 未定義のコンポーネントクラス |
| `.flex-gap`, `.flex-list`, `.flex-start` | ユーティリティ SCSS 未定義のコンポーネントクラス |
| `.items-wrapper` | コンポーネントクラス |
| `.c-section__sub-text--sm-gap` 等 | BEM モディファイア（ユーティリティではない） |
| `.c-section__header-row--lg-gap` | 同上 |
| `.p-payment__list-sm-gap` | 同上 |
| `.text-slider`（HTML中の一部） | `.c-text-slider` コンポーネントの一部 |
| `.text-sp`, `.text-desk`（HTML中の一部） | `.c-panel-content-text-sp` 等コンポーネントの一部 |

---

## リスク評価

### 高リスク

| リスク | 詳細 | 対策 |
|--------|------|------|
| **部分マッチ誤置換** | `text-white` → HTML内で `c-hero__text-white` のように部分一致する可能性 | クラス属性内のワード境界 (`\b`) を使った正規表現で置換。SCSS側は行頭 `.` に続くパターンで限定 |
| **`relative` の大量置換（188箇所）** | 最も使用数が多いユーティリティ。1つでも漏れると表示崩れ | HTML の class 属性内のみを対象に、ワード境界で限定 |
| **`font-outfit`/`font-zen` の大量置換（計1,666箇所）** | 非常に多い。一括置換の信頼性が重要 | `font-outfit` → `u-font-outfit` は部分マッチリスクなし（他にこの文字列を含むクラスなし） |
| **`text-*` の曖昧性** | `text-lightBlue` はユーティリティだが、`c-text-slider` はコンポーネント | `text-` 単体でなく、`text-lightBlue`, `text-white` 等の完全一致で置換 |

### 中リスク

| リスク | 詳細 | 対策 |
|--------|------|------|
| **`m-{N}` の誤検出** | HTML内で `m-` を含むコンポーネントクラス名が多数 | `m-` 単独の全置換ではなく、定義済みの値（m-0, m-4, m-5, ...）を個別に置換 |
| **`.p-{N}` と FLOCSS `.p-` の衝突** | HTML では未使用だがSCSS定義は変更必要 | SCSS 内のみの変更。`\.p-(\d+)` パターンで限定 |
| **`_global-responsive.scss` 内の混在** | ユーティリティ（display-sp等）とコンポーネント（.c-maxWidth等）が混在 | ユーティリティクラスのみを対象に、行単位で特定して置換 |

### 低リスク

| リスク | 詳細 |
|--------|------|
| **SCSS定義のみのクラス（HTML未使用）** | 多数のユーティリティがHTML未使用。SCSS側の変更のみで影響なし |
| **CSSコンパイル** | SCSS変更後に再コンパイルすれば自動反映 |

---

## 処理順序

部分マッチを防ぐため、**長いクラス名 → 短いクラス名** の順で処理する。

### Phase 1: SCSS ユーティリティファイルの置換

各ファイル内のクラス定義（`.className`）を `.u-className` に変更。
SCSS ファイルは1ファイルにつき1つの置換タスクとして処理する。

**処理順序**:
1. `_responsive.scss` — レスポンシブ変異体（lg-*, sm-*）
2. `_space.scss` — スペーシング
3. `_layout.scss` — レイアウト
4. `_font-size.scss` — フォント関連
5. `_color.scss` — カラー
6. `_typography.scss` — タイポグラフィ
7. `_display.scss` — ディスプレイ
8. `_column.scss` — カラム
9. `_global-responsive.scss` — display-sp, display-desk, md-block のみ

### Phase 2: HTML の置換

クラス属性内のユーティリティクラス名を一括置換。
**長い名前 → 短い名前** の順で処理し、部分マッチを防止する。

**カテゴリ別の処理順序**:
1. レスポンシブ変異体（sm-py-50, sm-block 等）— 最も長い名前から
2. フォントファミリー（font-outfit, font-zen）
3. テキスト色（text-lightBlue, text-lightPink, text-black1 等）— 長い名前から
4. テキスト配置（text-center, text-right, text-left, text-justify）
5. テキストスタイル（text-italic, text-decoration-none, text-link, text-blue-hover）
6. フォントサイズ（fs-320, fs-100, ... fs-8）— 大きい数値から
7. フォントウェイト（fw-900, ... fw-100）
8. ラインハイト（lh-210, ... lh-5）
9. レタースペーシング（ls-50, ... ls-3）
10. 背景色（bg-linearLightGray, bg-base-black1, ... bg-red）
11. スペーシング（py-*, mx-*, mt-*, mb-*, ml-*, mr-*, my-*）
12. Gap（gap-150px, ... gap-0）
13. Flexbox（flex-col-reverse, flex-row-reverse, ... flex-col, flex-row）
14. Grid（grid-cols-12, ... grid-cols-1）
15. ポジション（relative, absolute）
16. ディスプレイ（inline-block, inline-flex, inline-grid, block, flex, grid, hidden）
17. Z-index（z-10, z-3）
18. カラム幅（w-full, w-fit-content）
19. セルフ（self-start）
20. カーソル（cursor-pointer）
21. 表示切替（display-sp, display-desk, md-block）

### Phase 3: `_global-responsive.scss` の置換

コンポーネントクラスと混在しているため、対象行を特定して個別に置換。

### Phase 4: SCSSコンパイル・検証

```bash
npx sass assets/scss/global.scss assets/css/global.css --no-source-map
```

ブラウザで全ページの表示確認。

---

## 作業手順の詳細

### SCSS 置換の方法

各 SCSS ファイルで、クラス定義の `.className` を `.u-className` に sed/Edit で一括置換。

例（_color.scss）:
```
.bg-white → .u-bg-white
.text-white → .u-text-white
```

例（_responsive.scss）:
```
.lg-block → .u-lg-block
.sm-fs-14 → .u-sm-fs-14
```

### HTML 置換の方法

class 属性内のワード境界を活用して置換。

```
class="... text-white ..." → class="... u-text-white ..."
class="... relative ..." → class="... u-relative ..."
class="font-outfit fw-500 fs-15" → class="u-font-outfit u-fw-500 u-fs-15"
```

**注意**: 以下のパターンは **置換しない**:
- `c-text-slider` → `text-slider` 部分はコンポーネント名の一部
- `p-top__service-*` → FLOCSS Project プレフィクス
- `l-footer__*` → FLOCSS Layout プレフィクス

### 検証方法

1. 置換後、旧クラス名で grep して残存がないことを確認
2. SCSS コンパイルが通ることを確認
3. ブラウザで全ページの見た目が変わっていないことを確認

---

## 工数見積

| Phase | 内容 | 推定クラス数 |
|-------|------|:---:|
| Phase 1 | SCSS 9ファイルの定義置換 | ~1,094 |
| Phase 2 | HTML 23ファイルの参照置換 | ~3,056箇所 |
| Phase 3 | _global-responsive.scss 個別置換 | 4 |
| Phase 4 | コンパイル・検証 | — |

---

## 注意事項

1. **`.c-btn` は対象外**: _typography.scss 内に定義があるが、コンポーネントクラスのため変更しない
2. **`.text-vertical` は対象外**: _header.scss で定義されたヘッダー固有クラス
3. **`.text-nowrap` は対象外**: ユーティリティ SCSS に定義がない（別途調査・対応が必要な場合あり）
4. **`.p-{N}` は SCSS のみ変更**: HTML で使用されていないが、FLOCSS 命名衝突を解消するため SCSS 定義は変更する
5. **`_global-responsive.scss` はユーティリティクラスのみ変更**: コンポーネントクラス（`.c-maxWidth`, `.l-footer__*` 等）は変更しない
6. **`.img-blue`（_typography.scss 内 `.text-blue-hover:hover ~ .img-blue`）**: `.text-blue-hover` を `.u-text-blue-hover` に変更する際、セレクタ内の `.img-blue` はそのまま（コンポーネントクラスのため）
