# 実行計画: 共通バナー・パンくず u-* 吸収（Plan A）

> コンテキスト: `docs/plans/feedback-improvement-context.md`
> 先方指摘: FB1（ユーティリティクラスの多用）、FB2（テキスト関連ユーティリティ）
> ガイドライン: `docs/cording-guideline.md`
> 方針: チケット = 「何を・なぜ・受け入れ基準」のみ。実装コードは Plan に書かない。

---

## 背景

全18ページの共通バナー（`p-banner-title` / `p-banner-subtitle` / パンくずリンク）に u-* が残存。
先方が各ページを開いた際に最初に目にする箇所であり、FB1 の改善実感に直結する。

---

## 対象ページ（18ページ）

admission, column, column/[slag], contact, faq, family, information, member, payment, point_redemption, price, protein, reservation, rules, sitemap, storelist, storelist/[slag], visitor

※ about / index / medical / personal / sportip は独自バナー構造のため対象外

---

## 調査結果

### p-banner-title（`_banner.scss:284`）

- 既存定義: font-size, line-height, letter-spacing, margin-bottom, font-weight, width
- **欠落: `color`** — 全18ページで `u-text-white` をHTML側で付与している

### p-banner-subtitle（`_banner.scss:293`）

- 既存定義: font-size, line-height, color, letter-spacing, margin-bottom, font-weight, padding-left
- **欠落: `font-family`** — 全18ページで `u-font-outfit` をHTML側で付与している
- `u-mt-18`（`margin-top: 18px`）は 8/18 ページのみ → **不一致のため吸収しない**
  - あり: admission, faq, family, information, member, point_redemption, rules, sitemap
  - なし: column, column/[slag], contact, payment, price, protein, reservation, storelist, storelist/[slag], visitor

### banner-a-link（`_animation.scss:87`）

- **FLOCSS プレフィクスなし** — ガイドライン違反
- `:hover` のみ定義（`color: var(--base-lightBlue); transition: all 0.3s ease-in-out`）
- **3つの使用コンテキスト**:
  1. パンくずリンク: `class="u-text-white u-fs-14 banner-a-link"` — 18ページ（約22箇所）
  2. FAQ ナビリンク: `class="banner-a-link"` — faq/index.html のみ（9箇所、u-* なし）
  3. admission ナビリンク: `class="p-admission-nav__link banner-a-link"` — admission/index.html のみ（2箇所）

### パンくずリンクの u-* 内訳

- `u-text-white` → `color: var(--text-white)` = `#ffffff`
- `u-fs-14` → `font-size: 0.875rem` = `var(--fs-sm)`

---

## チケット一覧

| チケット | 内容 | 影響範囲 | 依存 |
|---------|------|---------|------|
| **BA-1** | `p-banner-title` に `color` 追加 → HTML から `u-text-white` 削除 | 18ページ × 1箇所 = 18件 | なし |
| **BA-2** | `p-banner-subtitle` に `font-family` 追加 → HTML から `u-font-outfit` 削除 | 18ページ × 1箇所 = 18件 | なし |
| **BA-3** | `c-breadcrumb-link` 新設 → パンくずリンクの `u-text-white u-fs-14 banner-a-link` を 1 クラスに集約 | 18ページ × 約22箇所 | なし |
| **BA-4** | faq / admission の `banner-a-link` を各コンポーネント SCSS に吸収 + `_animation.scss` の `.banner-a-link:hover` 削除 | faq: 9箇所, admission: 2箇所 | BA-3 |

---

## チケット詳細

### BA-1: `p-banner-title` に color 吸収

**何を:**
`_banner.scss:284` の `.p-banner-title` に `color: var(--text-white)` を追加し、18ページの HTML から `u-text-white` を削除する。

**なぜ:**
先方指摘 FB1「ユーティリティクラスの多用」— バナータイトルの色はコンポーネントの責務であり、u-* で個別指定する設計ではない。

**対象ファイル:**
- SCSS: `assets/scss/object/component/_banner.scss:284`
- HTML: 18ページの `index.html`（各ページの `p-banner-title` 行）

**受け入れ基準:**
- `_banner.scss` の `.p-banner-title` に `color: var(--text-white)` がある
- 全18ページの HTML で `p-banner-title` 行に `u-text-white` が残っていない
- SCSS コンパイル成功
- ブラウザ確認（PC/SP 3ページ: faq, admission, price）で見た目差分なし

**検証コマンド:**
```bash
grep -rn "p-banner-title.*u-text-white" */index.html column/\[slag\]/index.html storelist/\[slag\]/index.html
# → 0件であること
```

---

### BA-2: `p-banner-subtitle` に font-family 吸収

**何を:**
`_banner.scss:293` の `.p-banner-subtitle` に `font-family: var(--font-outfit)` を追加し、18ページの HTML から `u-font-outfit` を削除する。

**なぜ:**
先方指摘 FB2「テキスト関連ユーティリティ」— サブタイトルの英字フォントはコンポーネントの責務。

**対象ファイル:**
- SCSS: `assets/scss/object/component/_banner.scss:293`
- HTML: 18ページの `index.html`（各ページの `p-banner-subtitle` 行）

**注意:**
- `u-mt-18` は 8/18 ページのみ付与されており不一致 → **削除しない。そのまま残す**
- `c-reveal` クラスも一部ページにあるが、アニメーション用のため触らない

**受け入れ基準:**
- `_banner.scss` の `.p-banner-subtitle` に `font-family: var(--font-outfit)` がある
- 全18ページの HTML で `p-banner-subtitle` 行に `u-font-outfit` が残っていない
- `u-mt-18` と `c-reveal` は影響を受けていない
- SCSS コンパイル成功
- ブラウザ確認（PC/SP 3ページ: faq, admission, price）で見た目差分なし

**検証コマンド:**
```bash
grep -rn "p-banner-subtitle.*u-font-outfit" */index.html column/\[slag\]/index.html storelist/\[slag\]/index.html
# → 0件であること
```

---

### BA-3: パンくずリンク `c-breadcrumb-link` 新設 + u-* 吸収

**何を:**
パンくずリンク（`<a class="u-text-white u-fs-14 banner-a-link">`）を `c-breadcrumb-link` 1クラスに集約する。

1. `_container.scss` に `.c-breadcrumb-link` を新設（color, font-size, hover を定義）
2. 18ページの HTML で `u-text-white u-fs-14 banner-a-link` → `c-breadcrumb-link` に置換

**なぜ:**
- `banner-a-link` は FLOCSS プレフィクスなし — ガイドライン「Prefixで役割を明確化」に違反
- パンくずリンクに必要なスタイルは `c-breadcrumb` コンポーネントの BEM 子要素として定義すべき
  - 既存の BEM パターン: `c-breadcrumb-home`, `c-breadcrumb-separator` → `c-breadcrumb-link` は自然な命名

**対象ファイル:**
- SCSS: `assets/scss/layout/_container.scss`（`c-breadcrumb` 関連定義の直後）
- HTML: 18ページの `index.html`（パンくずリスト内の `<a>` 要素、約22箇所）

**`.c-breadcrumb-link` に必要なプロパティ:**
- `color: var(--text-white)` — 元 `u-text-white`
- `font-size: var(--fs-sm)` — 元 `u-fs-14`（`0.875rem`）
- `&:hover` — 元 `banner-a-link:hover`（`color: var(--base-lightBlue); transition: all 0.3s ease-in-out`）

**受け入れ基準:**
- `_container.scss` に `.c-breadcrumb-link` が定義されている
- 全18ページのパンくず `<a>` から `u-text-white`, `u-fs-14`, `banner-a-link` が消え、`c-breadcrumb-link` に置き換わっている
- SCSS コンパイル成功
- ブラウザ確認（PC/SP 3ページ: faq, admission, storelist/[slag]）でリンク表示・ホバー動作に差分なし

**検証コマンド:**
```bash
# パンくず内の旧クラスが残っていないこと
grep -rn "c-breadcrumb.*banner-a-link\|c-breadcrumb.*u-text-white.*u-fs-14" */index.html column/\[slag\]/index.html storelist/\[slag\]/index.html
# → 0件

# 新クラスが適用されていること
grep -rn "c-breadcrumb-link" */index.html column/\[slag\]/index.html storelist/\[slag\]/index.html
# → 約22件
```

---

### BA-4: faq / admission の `banner-a-link` を各コンポーネントに吸収 + 元定義削除

**何を:**
BA-3 でパンくず用途は `c-breadcrumb-link` に移行済み。残る `banner-a-link` 使用箇所（faq ナビ 9箇所 + admission ナビ 2箇所）のホバー効果を各コンポーネント SCSS に吸収し、HTML から `banner-a-link` を削除。最後に `_animation.scss:87` の `.banner-a-link:hover` を削除する。

**なぜ:**
- `banner-a-link` は FLOCSS プレフィクスなしのガイドライン違反クラス
- BA-3 でパンくず用途を移行した後、faq / admission にのみ残る
- 各コンポーネントは既に固有の SCSS を持っており、ホバー効果はそこに含めるのが FLOCSS の設計原則

**対象ファイル:**
- `faq/index.html` — `.c-faq__accordion-header` 内の `banner-a-link`（9箇所）
- `assets/scss/_global-responsive.scss` — `.c-faq__accordion-header` 関連セレクタ（既に hover 定義あり: L1242）
- `admission/index.html` — `.p-admission-nav__link banner-a-link`（2箇所）
- `assets/scss/object/project/_admission.scss` — `.p-admission-nav__link`（L17）
- `assets/scss/object/component/_animation.scss:87` — `.banner-a-link:hover`（削除）

**確認事項:**
- `_global-responsive.scss:1242` に `.c-faq__accordion-header:hover` が既にある → `banner-a-link:hover` と重複していないか確認
- `.p-admission-nav__link` に hover 定義があるか確認 → なければ追加

**受け入れ基準:**
- 全 HTML ファイルから `banner-a-link` クラスが完全に消えている
- `_animation.scss` から `.banner-a-link:hover` が削除されている
- faq ナビリンクのホバー動作（文字色 → lightBlue）が維持されている
- admission ナビリンクのホバー動作が維持されている
- SCSS コンパイル成功
- ブラウザ確認（faq / admission）でホバー動作に差分なし

**検証コマンド:**
```bash
# banner-a-link が全ファイルから消えていること
grep -rn "banner-a-link" */index.html column/\[slag\]/index.html storelist/\[slag\]/index.html assets/scss/
# → 0件
```

---

## 実行順序

```
BA-1（title color）→ BA-2（subtitle font-family）
  ※ BA-1 と BA-2 は独立しており並行可能
      ↓
BA-3（c-breadcrumb-link 新設 + パンくず置換）
      ↓
BA-4（faq/admission 吸収 + banner-a-link 完全削除）
```

---

## 削減見込み

| 要素 | 削減 u-* 件数 |
|------|-------------|
| `p-banner-title` の `u-text-white` | 18件 |
| `p-banner-subtitle` の `u-font-outfit` | 18件 |
| パンくずリンクの `u-text-white` + `u-fs-14` | 約44件（22箇所 × 2クラス）|
| **合計** | **約80件** |

※ `banner-a-link` のリネーム/削除はプレフィクス付与（ガイドライン準拠）であり u-* 削減数には含まない

---

## リスク評価

| チケット | リスク | 理由 |
|---------|--------|------|
| BA-1 | 極小 | SCSS に 1 プロパティ追加のみ |
| BA-2 | 極小 | SCSS に 1 プロパティ追加のみ |
| BA-3 | 小 | 新クラス作成 + HTML 一括置換。セレクタ深さ 1 階層 |
| BA-4 | 小〜中 | faq の hover 重複確認が必要。ただし影響は 2 ページ限定 |
