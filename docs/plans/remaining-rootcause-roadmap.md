# 残存根本原因 対応ロードマップ

> Phase 2-B 新家担当（10ページ）完了後の残存課題を、先方フィードバックの根本原因解決の観点で整理した実行計画。
>
> - 作成日: 2026-04-10
> - 前提: 新家担当10ページで u-* 約628→92件（-85%）達成済み。ただし残存92件の大半は**共通コンポーネント由来**で、先方が最初に目にするバナー部分に先方指摘パターンがそのまま残っている。
> - 関連: `docs/progress.md`（Phase 2-B 新家担当完了サマリ）

---

## 全体方針

1. **1 Plan = 1 共通コンポーネント**に絞る（スコープを混ぜない）
2. **先方確認が不要なものから先に着手**（ナビハイライトは確認待ちなので並行で催促）
3. **次の先方共有は「共通バナー吸収後」をマイルストーンにする**（全ページ冒頭に効く、最大インパクト）
4. 串担当分の進捗を待たず、**新家担当分＋共通バナーで1回報告**する

---

## 実施順序

```
Step 1: Plan A（共通バナー吸収）着手
         ＋ 並行して Plan C を先方に催促
Step 2: Plan A 完了 → 全23ページブラウザ確認
Step 3: Plan B（c-other-details-banner）＋ Plan D 着手
Step 4: 【先方共有①】Phase 2-B 新家担当 + 共通バナー吸収 まとめて報告
Step 5: Plan C（ナビハイライト、先方OK後）
Step 6: 串担当分の進捗を待って合流 → 【先方共有②】全ページ完了報告
```

---

## Plan A: 共通バナー／パンくず u-* 吸収 【最優先・最小リスク】

### 対象

`p-banner-title` / `p-banner-subtitle` / `banner-a-link`（全23ページのヒーロー直下）

### 現状把握（実ファイル確認済み）

- `assets/scss/object/component/_banner.scss:284-301` に `.p-banner-title` / `.p-banner-subtitle` は既に存在し、font-size/line-height/letter-spacing/margin/font-weight は定義済み
- **欠けているのは `color` と `font-family` のみ**
- `.banner-a-link` は `_animation.scss:87` の `:hover` のみ定義されており、本体スタイルが未定義

### 作業内容

1. `_banner.scss` に以下を追記
   - `.p-banner-title` → `color: var(--text-white)`
   - `.p-banner-subtitle` → `font-family: var(--font-outfit)`
   - `.banner-a-link` → 本体作成: `color: var(--text-white); font-size: var(--fs-sm2)`
2. `u-mt-18` on `.p-banner-subtitle` の全ページ一貫性を grep で検証
   - 一貫なら SCSS 吸収（`margin-top` 追加）
   - 不一致なら残置
3. 全23ページ HTML から該当 u-* を削除
   - `u-text-white` / `u-font-outfit` / `u-fs-14` / （条件付き）`u-mt-18`

### 検証

- `grep -n "p-banner-title u-\|p-banner-subtitle u-\|banner-a-link" **/*.html` で残存ゼロ確認
- `npm run` コンパイル成功
- ブラウザ確認（PC/SP、代表3ページ: faq / admission / about）で差分なし

### 受け入れ基準

- 全23ページの該当要素から上記 u-* が消える
- 見た目の差分ゼロ
- 約100箇所の u-* 削減

### リスク評価

**極小** — SCSS への追記のみ。既存プロパティは変更しない。

---

## Plan B: `c-other-details-banner` u-* 吸収 + HTMLバグ修正

### 対象

admission / sitemap 他で共用されるセカンダリバナー（admission 残存24件中 約8件）

### 作業内容

1. `.c-other-details-banner` 配下の u-* を BEM 子要素に吸収
2. **HTMLバグ修正**: `admission/index.html:953` の不正クラス残骸 `md` を削除
3. `u-text-link` の扱い判断（汎用ユーティリティとして残置するか、吸収するか）を決める

### 対象ファイル

- `admission/index.html` ほか共用ページ
- `_other-details-banner.scss`（該当 SCSS）

### リスク

**小** — 影響ページが限定的

### 着手順

Plan A の後

---

## Plan C: 共通ナビ・フッターハイライトリンク `u-text-lightBlue` 吸収

### 対象

`.l-nav-menu-popup` 内と `.l-footer` 内のハイライトリンク（各ページ約7件 × 23ページ ≒ 約160件）

### 論点

**先方確認待ち**（`docs/plans/feedback-nav-highlight-links-plan.md`）

- Phase 1 で見落とした可能性あり
- `u-text-lightBlue` が通常時/ホバー時のカラー切替に使われている可能性あり

### 進め方

- Plan A 着手と**並行して先方に催促**する（催促文面は簡潔に、1〜2行）
- 確認が返ってきたら Plan A の後続として実装
- 確認が長引く場合は Plan A 単体で先方共有し、Plan C は次の報告に回す（クリティカルパスに乗せない）

### リスク

**中** — Phase 1 見落としの理由を読み解いた上で実装する必要あり

---

## Plan D: `c-announcement` の "GO!" h2 吸収（payment 等）

### 対象

`<h2 class="u-font-outfit">GO!</h2>`

### 進め方

単独 Plan にするほどでもないため、**Plan B のオマケとして同時吸収**する。

### リスク

**小** — 該当箇所が少ない

---

## 並行タスク: 死セレクタ清掃

Plan A〜D とは別に、Phase 2-B 新家担当作業中に検出した死セレクタを清掃する。

| ファイル | 箇所 | 内容 |
|---|---|---|
| `_admission.scss` | 209 | `.p-admission-item .fw-700 { line-height: 30px }` Step 7a 以降の死セレクタ |
| `_admission.scss` | 392 | `.p-admission-p.mt-60` Step 7a 以降の死セレクタ |

Plan A〜D の作業中に該当ページを触るタイミングで合わせて清掃する。

---

## マイルストーン

### 先方共有①（Plan A + B + D 完了後）

**報告内容**:
- Phase 2-B 新家担当 10ページ完了（約628→92件、-85%）
- 共通バナー/パンくず u-* 吸収（全23ページに波及、約100箇所削減）
- `c-other-details-banner` 吸収 + HTMLバグ修正
- `c-announcement` "GO!" 吸収
- **質的改善**: BEM 子要素大量新設、c-faq 共通化、死セレクタ修復、規約違反クラス解消

**期待する先方の反応**: 各ページを開いた時の「u-* の羅列」が目に入らなくなり、FB1 の改善実感が出る

### 先方共有②（串担当完了後 + Plan C 完了後）

全23ページ完了報告 + ナビハイライト吸収報告

---

## やらないこと

- 串担当ページを新家が触る
- Plan A〜D の途中で FB3（重複コンポーネント統合）に手を出す
- u-* 削減数を成果指標にする（質的改善＝BEM子要素化・コンポーネントへの責務集約で評価する）
- Plan C を先方確認前に着手する（手戻りリスク）

---

## 参照

- `docs/plans/feedback-improvement-context.md` — 先方フィードバック原文・調査結果
- `docs/progress.md` — Phase 2-B 新家担当完了サマリ
- `docs/cording-guideline.md` — コーディング規約
- `docs/plans/feedback-index-plan.md` — Plan 作成のお手本（Phase 2-A）
- `docs/plans/feedback-nav-highlight-links-plan.md` — Plan C 関連
