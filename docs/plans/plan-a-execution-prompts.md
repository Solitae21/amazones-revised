# Plan A 実行プロンプト集

> Plan: `docs/plans/plan-a-banner-breadcrumb.md`
> 1チケットずつ `/clear` → 新規チャットで実行すること

---

## BA-1: `p-banner-title` に color 吸収

```
## 作業指示: BA-1 p-banner-title に color 吸収

### コンテキスト
- Plan: `docs/plans/plan-a-banner-breadcrumb.md` の BA-1
- 先方フィードバック: `docs/plans/feedback-improvement-context.md` §1 FB1
- ガイドライン: `docs/cording-guideline.md`
  - カラーは変数化する（L179）
  - Utilityは最小限（L202）
  - 再利用優先：新しいスタイルはまずComponentに落とし込む（L200）

### 現状
- `assets/scss/object/component/_banner.scss:284` の `.p-banner-title` に `color` が未定義
- 全18ページの HTML で `class="p-banner-title u-text-white"` と u-* で色を指定している
- `u-text-white` = `color: #ffffff` = `var(--text-white)`（`_variables.scss:24`）

### 作業内容
1. `assets/scss/object/component/_banner.scss:284` の `.p-banner-title` に `color: var(--text-white)` を追加する
   - 挿入位置: 既存プロパティの末尾（`width: 90%;` の後）
   - 既存プロパティは一切変更しない
2. 以下の18ページの `index.html` で `p-banner-title` を含む行から `u-text-white` を削除する
   - admission, column, column/[slag], contact, faq, family, information, member
   - payment, point_redemption, price, protein, reservation, rules
   - sitemap, storelist, storelist/[slag], visitor
   - 注意: 一部ページは `p-banner-title u-text-white c-reveal` のように `c-reveal` もある → `c-reveal` は残すこと

### 各ページの該当行（実ファイル確認済み）
| ページ | 行 | 現在のclass属性 |
|--------|-----|----------------|
| admission/index.html | 331 | `p-banner-title u-text-white` |
| column/index.html | 333 | `p-banner-title u-text-white` |
| column/[slag]/index.html | 339 | `p-banner-title u-text-white` |
| contact/index.html | 334 | `p-banner-title u-text-white` |
| faq/index.html | 331 | `p-banner-title u-text-white` |
| family/index.html | 312 | `p-banner-title u-text-white` |
| information/index.html | 315 | `p-banner-title u-text-white` |
| member/index.html | 331 | `p-banner-title u-text-white` |
| payment/index.html | 316 | `p-banner-title u-text-white c-reveal` |
| point_redemption/index.html | 335 | `p-banner-title u-text-white` |
| price/index.html | 334 | `p-banner-title u-text-white c-reveal` |
| protein/index.html | 528 | `p-banner-title u-text-white c-reveal` |
| reservation/index.html | 471 | `p-banner-title u-text-white c-reveal` |
| rules/index.html | 331 | `p-banner-title u-text-white` |
| sitemap/index.html | 331 | `p-banner-title u-text-white` |
| storelist/index.html | 313 | `p-banner-title u-text-white c-reveal` |
| storelist/[slag]/index.html | 601 | `p-banner-title u-text-white c-reveal` |
| visitor/index.html | 336 | `p-banner-title u-text-white c-reveal` |

### 受け入れ基準
- [ ] `_banner.scss` の `.p-banner-title` に `color: var(--text-white)` がある
- [ ] 全18ページの HTML で `p-banner-title` 行に `u-text-white` が残っていない
- [ ] `c-reveal` を含むページで `c-reveal` が消えていない
- [ ] SCSS コンパイル成功（`npm run build` または sass コンパイルコマンド）

### 検証コマンド（作業完了後に必ず実行）
```bash
# 残存チェック（0件であること）
grep -rn "p-banner-title.*u-text-white" admission/index.html column/index.html "column/[slag]/index.html" contact/index.html faq/index.html family/index.html information/index.html member/index.html payment/index.html point_redemption/index.html price/index.html protein/index.html reservation/index.html rules/index.html sitemap/index.html storelist/index.html "storelist/[slag]/index.html" visitor/index.html

# c-reveal が消えていないことの確認（6件であること）
grep -rn "p-banner-title.*c-reveal" payment/index.html price/index.html protein/index.html reservation/index.html storelist/index.html "storelist/[slag]/index.html" visitor/index.html

# SCSS に color が追加されたことの確認
grep -A8 "^\.p-banner-title" assets/scss/object/component/_banner.scss | head -10
```

### 絶対にやらないこと
- `p-banner-title` の既存プロパティ（font-size, line-height 等）を変更する
- `u-text-white` 以外のクラスを削除する
- 対象18ページ以外の HTML を変更する
- SCSS の他のセレクタを変更する
```

---

## BA-2: `p-banner-subtitle` に font-family 吸収

```
## 作業指示: BA-2 p-banner-subtitle に font-family 吸収

### コンテキスト
- Plan: `docs/plans/plan-a-banner-breadcrumb.md` の BA-2
- 先方フィードバック: `docs/plans/feedback-improvement-context.md` §1 FB2
- ガイドライン: `docs/cording-guideline.md`
  - カラー、フォントサイズは変数化（L179）
  - Utilityは最小限（L202）
  - 再利用優先：新しいスタイルはまずComponentに落とし込む（L200）

### 現状
- `assets/scss/object/component/_banner.scss:293` の `.p-banner-subtitle` に `font-family` が未定義
- 全18ページの HTML で `u-font-outfit` をHTML側で付与している
- `u-font-outfit` = `font-family: "Outfit"` = `var(--font-outfit)`（`_variables.scss:79`）
- 一部ページには `u-mt-18`（8ページ）や `c-reveal`（8ページ）も付与されている → これらは削除しない

### 作業内容
1. `assets/scss/object/component/_banner.scss:293` の `.p-banner-subtitle` に `font-family: var(--font-outfit)` を追加する
   - 挿入位置: 既存プロパティの末尾（`padding-left: 0.75rem;` の後）
   - 既存プロパティは一切変更しない
2. 以下の18ページの `index.html` で `p-banner-subtitle` を含む行から `u-font-outfit` のみを削除する
   - admission, column, column/[slag], contact, faq, family, information, member
   - payment, point_redemption, price, protein, reservation, rules
   - sitemap, storelist, storelist/[slag], visitor
   - 重要: `u-mt-18` と `c-reveal` は絶対に削除しない

### 各ページの該当行（実ファイル確認済み）
| ページ | 行 | 現在のclass属性 | u-font-outfit 以外に残すクラス |
|--------|-----|----------------|-------------------------------|
| admission/index.html | 334 | `p-banner-subtitle u-font-outfit u-mt-18` | `u-mt-18` |
| column/index.html | 334 | `p-banner-subtitle u-font-outfit` | （なし） |
| column/[slag]/index.html | 340 | `p-banner-subtitle u-font-outfit` | （なし） |
| contact/index.html | 335 | `p-banner-subtitle u-font-outfit` | （なし） |
| faq/index.html | 332 | `p-banner-subtitle u-font-outfit u-mt-18` | `u-mt-18` |
| family/index.html | 315 | `p-banner-subtitle u-font-outfit u-mt-18` | `u-mt-18` |
| information/index.html | 316 | `p-banner-subtitle u-font-outfit u-mt-18` | `u-mt-18` |
| member/index.html | 334 | `p-banner-subtitle u-font-outfit u-mt-18` | `u-mt-18` |
| payment/index.html | 317 | `p-banner-subtitle u-font-outfit c-reveal` | `c-reveal` |
| point_redemption/index.html | 338 | `p-banner-subtitle u-font-outfit u-mt-18` | `u-mt-18` |
| price/index.html | 335 | `p-banner-subtitle u-font-outfit c-reveal` | `c-reveal` |
| protein/index.html | 531 | `p-banner-subtitle u-font-outfit c-reveal` | `c-reveal` |
| reservation/index.html | 474 | `p-banner-subtitle u-font-outfit c-reveal` | `c-reveal` |
| rules/index.html | 332 | `p-banner-subtitle u-font-outfit u-mt-18` | `u-mt-18` |
| sitemap/index.html | 332 | `p-banner-subtitle u-font-outfit u-mt-18` | `u-mt-18` |
| storelist/index.html | 314 | `p-banner-subtitle u-font-outfit c-reveal` | `c-reveal` |
| storelist/[slag]/index.html | 604 | `p-banner-subtitle u-font-outfit c-reveal` | `c-reveal` |
| visitor/index.html | 339 | `p-banner-subtitle u-font-outfit c-reveal` | `c-reveal` |

### 受け入れ基準
- [ ] `_banner.scss` の `.p-banner-subtitle` に `font-family: var(--font-outfit)` がある
- [ ] 全18ページの HTML で `p-banner-subtitle` 行に `u-font-outfit` が残っていない
- [ ] `u-mt-18` が必要な8ページで `u-mt-18` が残っている
- [ ] `c-reveal` が必要な8ページで `c-reveal` が残っている
- [ ] SCSS コンパイル成功

### 検証コマンド（作業完了後に必ず実行）
```bash
# u-font-outfit 残存チェック（0件であること）
grep -rn "p-banner-subtitle.*u-font-outfit" admission/index.html column/index.html "column/[slag]/index.html" contact/index.html faq/index.html family/index.html information/index.html member/index.html payment/index.html point_redemption/index.html price/index.html protein/index.html reservation/index.html rules/index.html sitemap/index.html storelist/index.html "storelist/[slag]/index.html" visitor/index.html

# u-mt-18 が消えていないことの確認（8件であること）
grep -rn "p-banner-subtitle.*u-mt-18" admission/index.html faq/index.html family/index.html information/index.html member/index.html point_redemption/index.html rules/index.html sitemap/index.html

# c-reveal が消えていないことの確認（8件であること）
grep -rn "p-banner-subtitle.*c-reveal" payment/index.html price/index.html protein/index.html reservation/index.html storelist/index.html "storelist/[slag]/index.html" visitor/index.html

# SCSS に font-family が追加されたことの確認
grep -A10 "^\.p-banner-subtitle" assets/scss/object/component/_banner.scss | head -12
```

### 絶対にやらないこと
- `p-banner-subtitle` の既存プロパティ（font-size, line-height, color 等）を変更する
- `u-font-outfit` 以外のクラス（`u-mt-18`, `c-reveal`）を削除する
- 対象18ページ以外の HTML を変更する
- SCSS の他のセレクタを変更する
```

---

## BA-3: `c-breadcrumb-link` 新設 + パンくずリンク u-* 吸収

```
## 作業指示: BA-3 c-breadcrumb-link 新設 + パンくずリンク u-* 吸収

### コンテキスト
- Plan: `docs/plans/plan-a-banner-breadcrumb.md` の BA-3
- 先方フィードバック: `docs/plans/feedback-improvement-context.md` §1 FB1
- ガイドライン: `docs/cording-guideline.md`
  - BEM記法をベースに、クラス名は「意味」ではなく「役割・構造」で命名（L99）
  - Prefixで役割を明確化することで、クラス名の衝突を防ぐ（L140）
  - Object/Component: 再利用可能なコンポーネント（L151）
  - セレクタの深さ: 原則2階層まで（L173）
  - カラー、フォントサイズは変数化（L179）

### 背景
現在、パンくずリンクに `banner-a-link` というクラスが使われているが、FLOCSS プレフィクスがない（`c-` も `p-` もなし）。
ガイドラインの「Prefixで役割を明確化」に違反している。

パンくずコンポーネントには既に BEM 子要素が定義されている:
- `c-breadcrumb`（ブロック）— `_container.scss:12`
- `c-breadcrumb-home`（子要素）— `_container.scss:19`
- `c-breadcrumb-separator`（子要素）— `_container.scss:25`
- `c-breadcrumb-link`（**欠落** — 本チケットで新設する）

### 現状
- `_animation.scss:87`: `.banner-a-link:hover { color: var(--base-lightBlue); transition: all 0.3s ease-in-out; }`
- 18ページの HTML パンくず内: `<a class="u-text-white u-fs-14 banner-a-link">テキスト</a>`
- `u-text-white` = `color: var(--text-white)` = `#ffffff`（`_variables.scss:24`）
- `u-fs-14` = `font-size: 0.875rem` = `var(--fs-sm)`（`_variables.scss:59`）

### 作業内容
1. `assets/scss/layout/_container.scss` の `.c-breadcrumb-separator` 定義の直後（L28 の後）に `.c-breadcrumb-link` を新設する

   `.c-breadcrumb-link` に必要なプロパティ:
   - `color: var(--text-white)` — 元 `u-text-white`
   - `font-size: var(--fs-sm)` — 元 `u-fs-14`（`0.875rem`）
   - `&:hover` または `.c-breadcrumb-link:hover` — 元 `banner-a-link:hover` から移植:
     - `color: var(--base-lightBlue)`
     - `transition: all 0.3s ease-in-out`

   ※ SCSS 記法（`&:hover` を使うネスト）ではなく、既存ファイルのパターンに合わせること。
   `_container.scss` の既存コードはネストを使っていない（フラットな `.c-breadcrumb-home` 等）。
   → `.c-breadcrumb-link { ... }` と `.c-breadcrumb-link:hover { ... }` をフラットに書く

2. 以下の18ページの HTML パンくず `<a>` 要素で `u-text-white u-fs-14 banner-a-link` → `c-breadcrumb-link` に置換する

   注意: このチケットでは **パンくずリスト内（`<nav class="c-breadcrumb ...">` の中）** の `banner-a-link` のみを対象とする。
   faq/index.html の `.p-faq__nav` 内や admission/index.html の `.p-admission-nav` 内にある `banner-a-link` は **BA-4 で対応するため触らない**。

### 各ページの該当箇所（実ファイル確認済み）
| ページ | 行 | 現在の class 属性 |
|--------|-----|------------------|
| admission/index.html | 353 | `u-text-white u-fs-14 banner-a-link` |
| admission/index.html | 355 | `u-text-white u-fs-14 banner-a-link` |
| column/index.html | 353 | `u-text-white u-fs-14 banner-a-link` |
| column/[slag]/index.html | 359 | `u-text-white u-fs-14 banner-a-link` |
| column/[slag]/index.html | 363 | `u-text-white u-fs-14 banner-a-link` |
| contact/index.html | 354 | `u-text-white u-fs-14 banner-a-link` |
| faq/index.html | 351 | `u-text-white u-fs-14 banner-a-link` |
| family/index.html | 334 | `u-text-white u-fs-14 banner-a-link` |
| information/index.html | 335 | `u-text-white u-fs-14 banner-a-link` |
| member/index.html | 353 | `u-text-white u-fs-14 banner-a-link` |
| payment/index.html | 336 | `u-text-white u-fs-14 banner-a-link` |
| payment/index.html | 338 | `u-text-white u-fs-14 banner-a-link` |
| point_redemption/index.html | 357 | `u-text-white u-fs-14 banner-a-link` |
| price/index.html | 354 | `u-text-white u-fs-14 banner-a-link` |
| protein/index.html | 550 | `u-text-white u-fs-14 banner-a-link` |
| reservation/index.html | 493 | `u-text-white u-fs-14 banner-a-link` |
| rules/index.html | 351 | `u-text-white u-fs-14 banner-a-link` |
| sitemap/index.html | 351 | `u-text-white u-fs-14 banner-a-link` |
| storelist/index.html | 333 | `u-text-white u-fs-14 banner-a-link` |
| storelist/[slag]/index.html | 623 | `u-text-white u-fs-14 banner-a-link` |
| storelist/[slag]/index.html | 627 | `u-text-white u-fs-14 banner-a-link` |
| visitor/index.html | 358 | `u-text-white u-fs-14 banner-a-link` |

合計: 22箇所

### 受け入れ基準
- [ ] `_container.scss` に `.c-breadcrumb-link` と `.c-breadcrumb-link:hover` が定義されている
- [ ] `.c-breadcrumb-link` に `color: var(--text-white)` と `font-size: var(--fs-sm)` がある
- [ ] `.c-breadcrumb-link:hover` に `color: var(--base-lightBlue)` と `transition: all 0.3s ease-in-out` がある
- [ ] 全22箇所の HTML で `u-text-white u-fs-14 banner-a-link` → `c-breadcrumb-link` に置き換わっている
- [ ] faq/index.html の `.p-faq__nav` 内の `banner-a-link`（9箇所）は変更されていない
- [ ] admission/index.html の `.p-admission-nav__link banner-a-link`（2箇所）は変更されていない
- [ ] SCSS コンパイル成功
- [ ] ブラウザ確認（PC/SP で faq, admission, storelist/[slag]）: パンくずリンクの表示・ホバー動作に差分なし

### 検証コマンド（作業完了後に必ず実行）
```bash
# パンくず内に旧パターンが残っていないこと（0件）
grep -rn "u-text-white u-fs-14 banner-a-link" admission/index.html column/index.html "column/[slag]/index.html" contact/index.html faq/index.html family/index.html information/index.html member/index.html payment/index.html point_redemption/index.html price/index.html protein/index.html reservation/index.html rules/index.html sitemap/index.html storelist/index.html "storelist/[slag]/index.html" visitor/index.html

# c-breadcrumb-link が適用されていること（22件）
grep -rn "c-breadcrumb-link" admission/index.html column/index.html "column/[slag]/index.html" contact/index.html faq/index.html family/index.html information/index.html member/index.html payment/index.html point_redemption/index.html price/index.html protein/index.html reservation/index.html rules/index.html sitemap/index.html storelist/index.html "storelist/[slag]/index.html" visitor/index.html

# faq の p-faq__nav 内 banner-a-link が残っていること（9件）
grep -n "banner-a-link" faq/index.html

# admission の p-admission-nav__link banner-a-link が残っていること（2件）
grep -n "p-admission-nav__link banner-a-link" admission/index.html

# SCSS 定義の確認
grep -A5 "c-breadcrumb-link" assets/scss/layout/_container.scss
```

### 絶対にやらないこと
- `_animation.scss:87` の `.banner-a-link:hover` を削除する（BA-4 で対応）
- faq/index.html の `.p-faq__nav` 内の `banner-a-link` を変更する（BA-4 で対応）
- admission/index.html の `.p-admission-nav__link banner-a-link` を変更する（BA-4 で対応）
- `_container.scss` の既存セレクタ（`.c-breadcrumb`, `.c-breadcrumb-home`, `.c-breadcrumb-separator`）を変更する
- セレクタのネストを使う（既存ファイルがフラット記法のため合わせる）
```

---

## BA-4: faq / admission の `banner-a-link` 吸収 + 元定義削除

```
## 作業指示: BA-4 faq / admission の banner-a-link 吸収 + 元定義削除

### 前提
BA-3 が完了していること（パンくずリンクの `banner-a-link` は `c-breadcrumb-link` に置換済み）。
本チケットの作業完了後、プロジェクト全体から `banner-a-link` が完全に消える。

### コンテキスト
- Plan: `docs/plans/plan-a-banner-breadcrumb.md` の BA-4
- ガイドライン: `docs/cording-guideline.md`
  - Prefixで役割を明確化（L140）
  - セレクタの深さ: 原則2階層まで（L173）
  - ページ固有はProjectへ（L201）

### 現状
BA-3 完了後、`banner-a-link` が残る箇所は以下の2ファイルのみ:

#### faq/index.html — `.p-faq__nav` 内（9箇所）
```html
<div class="c-faq__accordion-header" style="gap: 10px">
  <a href="#faq-初めての方へ" class="banner-a-link">初めての方へ</a>
  <svg ...>
</div>
```
- `banner-a-link` は hover 効果（`color: var(--base-lightBlue)`）のみ提供
- `.p-faq__nav a` には既に `font-size: var(--fs-sm)` が定義されている（`_faq.scss:41`）
- `.c-faq__accordion-header:hover` には `opacity: 0.7` が定義されている（`_global-responsive.scss:1242`）

#### admission/index.html — `.p-admission-nav` 内（2箇所）
```html
<a href="#store-membership" class="p-admission-nav__link banner-a-link">
  店頭入会のご案内 <svg ...>
</a>
```
- `banner-a-link` は hover 効果のみ提供
- `.p-admission-nav__link` には hover 定義がない（`_admission.scss:17-23`）

#### SCSS 元定義
- `assets/scss/object/component/_animation.scss:87`:
  ```scss
  .banner-a-link:hover {
    color: var(--base-lightBlue);
    transition: all 0.3s ease-in-out;
  }
  ```

### 作業内容
1. **faq の hover 吸収**
   - `assets/scss/object/project/_faq.scss` の `.p-faq__nav a`（L41-43）の直後に hover を追加する:
     ```
     .p-faq__nav a:hover {
       color: var(--base-lightBlue);
       transition: all 0.3s ease-in-out;
     }
     ```
   - ※ セレクタ深さ: `.p-faq__nav a:hover` = 2階層（クラス + 要素）→ ガイドライン準拠
   - `faq/index.html` の `.p-faq__nav` 内 9箇所の `<a>` から `banner-a-link` クラスを削除する
   - 該当行: 368, 386, 404, 422, 442, 462, 480, 498, 516

2. **admission の hover 吸収**
   - `assets/scss/object/project/_admission.scss` の `.p-admission-nav__link`（L17-23）の直後に hover を追加する:
     ```
     .p-admission-nav__link:hover {
       color: var(--base-lightBlue);
       transition: all 0.3s ease-in-out;
     }
     ```
   - ※ セレクタ深さ: 1階層 → ガイドライン準拠
   - `admission/index.html` の `.p-admission-nav` 内 2箇所の `<a>` から `banner-a-link` を削除する
   - 該当行: 373, 392
   - 変更後: `class="p-admission-nav__link banner-a-link"` → `class="p-admission-nav__link"`

3. **元定義の削除**
   - `assets/scss/object/component/_animation.scss:87-90` の `.banner-a-link:hover { ... }` を削除する
   - 削除対象:
     ```scss
     .banner-a-link:hover {
       color: var(--base-lightBlue);
       transition: all 0.3s ease-in-out;
     }
     ```

### 受け入れ基準
- [ ] `_faq.scss` に `.p-faq__nav a:hover` が定義されている
- [ ] `_admission.scss` に `.p-admission-nav__link:hover` が定義されている
- [ ] `_animation.scss` から `.banner-a-link:hover` が削除されている
- [ ] **プロジェクト全体の HTML + SCSS から `banner-a-link` が完全に消えている**
- [ ] SCSS コンパイル成功
- [ ] ブラウザ確認:
  - faq/index.html: ナビリンク（「初めての方へ」等）のホバーで文字色が lightBlue に変わる
  - admission/index.html: ナビリンク（「店頭入会のご案内」「WEB入会のご案内」）のホバーで文字色が lightBlue に変わる

### 検証コマンド（作業完了後に必ず実行）
```bash
# プロジェクト全体から banner-a-link が完全に消えていること（0件）
grep -rn "banner-a-link" */index.html column/\[slag\]/index.html storelist/\[slag\]/index.html assets/scss/

# faq に hover が追加されたことの確認
grep -A3 "\.p-faq__nav a:hover" assets/scss/object/project/_faq.scss

# admission に hover が追加されたことの確認
grep -A3 "\.p-admission-nav__link:hover" assets/scss/object/project/_admission.scss

# _animation.scss から削除されたことの確認（0件であること）
grep -n "banner-a-link" assets/scss/object/component/_animation.scss
```

### 絶対にやらないこと
- `.c-faq__accordion-header:hover { opacity: 0.7 }` を変更する（既存のホバー効果は維持）
- `.p-admission-nav__link` の既存プロパティを変更する
- BA-3 で置換済みの `c-breadcrumb-link` を変更する
- パンくずリスト内のクラスを変更する
```

---

## 全チケット完了後の最終検証

```
## 最終検証: Plan A 全チケット完了確認

### 検証内容
BA-1 〜 BA-4 の全チケットが正しく完了しているかを横断的に検証する。

### 検証コマンド
```bash
# 1. p-banner-title に u-text-white が残っていないこと（0件）
grep -rn "p-banner-title.*u-text-white" */index.html column/\[slag\]/index.html storelist/\[slag\]/index.html

# 2. p-banner-subtitle に u-font-outfit が残っていないこと（0件）
grep -rn "p-banner-subtitle.*u-font-outfit" */index.html column/\[slag\]/index.html storelist/\[slag\]/index.html

# 3. banner-a-link がプロジェクト全体から消えていること（0件）
grep -rn "banner-a-link" */index.html column/\[slag\]/index.html storelist/\[slag\]/index.html assets/scss/

# 4. c-breadcrumb-link が22箇所に適用されていること
grep -c "c-breadcrumb-link" */index.html column/\[slag\]/index.html storelist/\[slag\]/index.html | grep -v ":0$"

# 5. u-mt-18 と c-reveal が消えていないこと
grep -rn "p-banner-subtitle.*u-mt-18" */index.html | wc -l
# → 8件
grep -rn "p-banner-subtitle.*c-reveal" */index.html storelist/\[slag\]/index.html | wc -l
# → 8件（visitor含む。ただし visitor のパスにより 7 or 8）

# 6. SCSS コンパイル成功
# （プロジェクトのビルドコマンドを実行）

# 7. _banner.scss に color と font-family が追加されていること
grep -A12 "^\.p-banner-title" assets/scss/object/component/_banner.scss | head -14
grep -A12 "^\.p-banner-subtitle" assets/scss/object/component/_banner.scss | head -14
```

### ブラウザ確認（PC + SP）
以下のページで見た目の差分がないこと:
- faq/index.html — バナー + パンくず + ナビリンクホバー
- admission/index.html — バナー + パンくず（2リンク）+ ナビリンクホバー
- price/index.html — バナー（c-reveal あり）+ パンくず
- storelist/[slag]/index.html — バナー（c-reveal あり）+ パンくず（2リンク）
- column/index.html — バナー + パンくず（u-mt-18 なし）
```

---

**トークン節約のため、`/clear` コマンドでこのチャットを終了して、新規チャットに上記の実行プロンプトを BA-1 から順に入力してください。**
BA-1 と BA-2 は独立しているため、別チャットで並行実行も可能です。BA-3 → BA-4 は順序依存です。
