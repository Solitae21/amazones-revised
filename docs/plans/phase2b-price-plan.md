# チケット: price ページ固有ユーティリティ改善

## 対象ファイル
- `price/index.html`
- `assets/scss/object/project/_price.scss`

---

## Step 1: 現状調査

### タイポグラフィ系 u-* の洗い出し（ページ固有部分のみ）

共通コンポーネント（ヘッダー、フッター、バナー、お知らせセクション、テキストスライダー等）は Phase 1 で対応済みのため除外。

| 行 | 要素 | 現在のクラス | 対象 u-* | 出現数 |
|----|------|------------|----------|--------|
| 450, 529, 1094, 1147 | `<h2>` | `p-price__title` | `u-font-outfit` | 4 |
| 452, 531, 1096, 1149 | `<div>` | クラスなし（`c-reveal--scale` のみ） | `u-lh-200` | 4 |

### body 継承で不要な u-*

なし（該当なし）

### レイアウト・機能系 u-*（残す）

- `u-flex`, `u-flex-col`, `u-flex-1`: flexbox レイアウト
- `u-relative`: position 配置
- `u-block`: display 切替
- `u-cursor-pointer`: UI 挙動
- `u-text-white`, `u-text-lightBlue`: 共通コンポーネント内（Phase 1 対応済み）
- `u-font-outfit`: 共通コンポーネント内（バナー、お知らせセクション — Phase 1 対応済み）
- `u-fs-14`: 共通コンポーネント内（パンくずリスト — Phase 1 対応済み）

---

## Step 2: 改善チケット

### チケット P-1: `.p-price__title` に font-family 吸収

#### 何を
`.p-price__title` の SCSS に `font-family: var(--font-outfit);` を追加し、HTML から `u-font-outfit` を削除する。

#### なぜ
- 4箇所の `<h2 class="p-price__title u-font-outfit">` すべてで同じユーティリティ
- 既存クラスにタイポグラフィを追加するパターン（パターン A）

#### 対象箇所
- line 450: `<h2 class="p-price__title u-font-outfit">Monthly Plan</h2>`
- line 529: `<h2 class="p-price__title u-font-outfit">Special Plan</h2>`
- line 1094: `<h2 class="p-price__title u-font-outfit">Initial Cost</h2>`
- line 1147: `<h2 class="p-price__title u-font-outfit">Option</h2>`

#### 受け入れ基準
- [ ] `.p-price__title` に `font-family: var(--font-outfit)` が定義されている
- [ ] HTML から `p-price__title u-font-outfit` が 0 件
- [ ] コンパイルが通る

---

### チケット P-2: 説明文 div に line-height 吸収

#### 何を
`.p-price__title-row` 内の説明文 div（現在クラスなし + `u-lh-200`）に `.p-price__title-desc` を新設し、`line-height: 2em` を定義する。

#### なぜ
- 4箇所で同じパターン（クラスのない div に `u-lh-200` が付与）
- クラスがない要素に BEM 子要素クラスを新設するパターン（パターン B）

#### 対象箇所
- line 452: `<div class="u-lh-200 c-reveal--scale">`（Monthly Plan 説明）
- line 531: `<div class="u-lh-200 c-reveal--scale">`（Special Plan 説明）
- line 1096: `<div class="u-lh-200 c-reveal--scale">`（Initial Cost 説明）
- line 1149: `<div class="u-lh-200 c-reveal--scale">`（Option 説明）

#### 受け入れ基準
- [ ] `.p-price__title-desc` に `line-height: 2em` が定義されている
- [ ] HTML の4箇所が `class="p-price__title-desc c-reveal--scale"` に変更されている
- [ ] `u-lh-200` が price/index.html のページ固有部分に 0 件
- [ ] コンパイルが通る

---

## Step 3: 検証

1. grep で残存確認:
   ```bash
   grep -E "u-fs-|u-fw-|u-text-|u-lh-|u-font-|u-ls-" price/index.html
   ```
   → ページ固有部分に残存がないこと（共通コンポーネント内のみ許容）

2. SCSS コンパイル:
   ```bash
   npx sass assets/scss/global.scss assets/css/global.css --no-source-map
   ```

3. ブラウザ確認（PC / SP）
