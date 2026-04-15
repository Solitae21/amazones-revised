# Phase 2 引き継ぎ・進捗報告

作成日: 2026-04-06

---

## 1. プロジェクト概要

Amazones ブランディングサイトのコーディング品質改善プロジェクト。
先方から受けたフィードバック（9 項目）に対し、HTML/CSS/JS の設計品質を改善中。

### 先方 FB の要点

> 「`c-panel-content-text-desk c-news-info__last-text u-fw-500 u-fs-16 u-ls-20` のような構成は改善が難しいのか。ユーティリティをコンポーネントで上書きしていることも気になる。」

**先方が求めているのは「コンポーネントに適切にスタイルを持たせる」設計品質の改善。**

---

## 2. 完了済み作業

| 作業 | 内容 | 成果 |
|------|------|------|
| CSS リファクタリング Step 1〜8 | 変数整備、FLOCSS 構成、BEM 修正、ID 廃止、セレクタ深さ修正、!important 削減、u-プレフィクス付与、未使用ユーティリティ削除、PC/SP 統一 | CSS 11,229→5,858 行、!important 190→40 |
| FB4: JS 整理 | common.js → global.js 統合、重複関数修正、スムーズスクロール統一 | JS ファイル 4 つ削除 |
| Phase 0: body ベーススタイル | `body { font-weight: 500; font-size: 16px; }` 設定 | Phase 3 の前提 |
| Phase 1: 共通コンポーネント吸収（1-1〜1-10） | ヘッダー・フッター・ボタン・ナビ・セクションヘッダー等の u-* をSCSS に移動 | 全 23 ページの共通部分改善 |
| Phase 3: body 継承ユーティリティ一括削除 | u-fw-500, u-fs-16, u-font-zen, u-text-black1 を全ページから削除 | 1,392 箇所削除 |
| **Phase 2-A: index.html ページ固有コンポーネント吸収** | **10 チケット完了（下記参照）** | **タイポグラフィ系 u-* : 140→24（83%減）** |

### Phase 2-A の詳細

index.html 内のページ固有セクション（ヒーロー、ニュースバナー、サービス、Dr.Amazones、ショップ、トレーニングマシン、料金プラン、会員の声、動画、コラム）のタイポグラフィ系ユーティリティクラスを SCSS コンポーネントに吸収。

**やったこと:**
- タイポグラフィ系 u-*（fw, fs, text, lh, font, ls）を HTML から削除し、SCSS コンポーネントクラスに定義
- FLOCSS プレフィクスなしのクラス名を BEM 準拠にリネーム（15 箇所）
- Step 7a で壊れていたレスポンシブ上書きセレクタを修復（10 箇所）
- B群（共通コンポーネント）は影響ページの HTML も同時修正

**影響を受けたファイル（計 12）:**
- HTML: index.html, about/index.html, column/index.html, column/[slag]/index.html, storelist/[slag]/index.html, point_redemption/index.html
- CSS: assets/css/global.css, assets/css/top.css
- SCSS: _top.scss, _global-responsive.scss, _storedetail.scss, _point_redemption.scss

---

## 3. 現在の状態

### 次にやるべきこと（優先順）

| # | 作業 | 状態 | 備考 |
|---|------|------|------|
| 1 | **先方共有: Before/After 提示** | **未着手** | index.html の HTML 比較を整理して方向性の合意を取る |
| 2 | **Phase 2-B: 残り 22 ページのコンポーネント吸収** | **未着手** | 先方合意後に着手。分担作業可能 |
| 3 | FB3: 重複コンポーネント統合 | 未着手 | 先方確認待ち |
| 4 | 最終コンパイル・全ページ検証 | 未着手 | 全作業完了後 |

### やってはいけないこと

- **先方確認を挟まずに全ページの Phase 2 を進める**
- u-* の削除数を成果指標にする（HTML の可読性・保守性で評価する）
- ブラウザ確認を省略する

---

## 4. Phase 2-B の作業方法（分担作業用）

### 各ページの作業手順

Plan 詳細: `docs/plans/feedback-index-plan.md` の「分担用チケットテンプレート」を参照。

```
1. 対象 HTML ファイル内のタイポグラフィ系 u-* を洗い出す
2. 対象 SCSS ファイルの既存パターンを確認
3. SCSS にタイポグラフィを追加（コンポーネントクラスに）
4. HTML から u-* を削除
5. grep で残存確認
6. SCSS コンパイル: npx sass assets/scss/global.scss assets/css/global.css --no-source-map
7. ブラウザで PC / SP 確認
```

### 注意事項（Phase 2-A で学んだこと）

| 項目 | 説明 |
|------|------|
| **ユーティリティの値を必ず確認** | `u-lh-180` = `line-height: 1.8em`（`180%` ではない）。`u-ls-10` = `letter-spacing: 0.1em`（`10px` ではない）。定義は `assets/scss/object/utility/_font-size.scss` を参照 |
| **color 変数名** | テキスト色は `var(--text-white)`, `var(--text-lightBlue)` 等。`var(--base-white)` は背景色用。定義は `assets/scss/foundation/_variables.scss` |
| **壊れたレスポンシブ上書き** | SCSS 内に `.fs-24` のような旧クラス名を参照するセレクタが残っている場合がある（Step 7a で u-プレフィクス付与時に更新漏れ）。コンポーネント SCSS に正しいセレクタで再定義し、旧セレクタは削除する |
| **replace_all の影響範囲** | `line-height: 200%` のような汎用的な値を一括置換すると、対象外の既存行を巻き込む危険がある。ファイル内の影響範囲を事前確認する |
| **共通コンポーネント（c-*）は他ページに影響** | SCSS 変更時は全使用ページの HTML も同時修正し、全ページで検証する |

### 残すユーティリティ（削除しない）

| ユーティリティ | 理由 |
|---------------|------|
| `u-relative`, `u-absolute`, `u-z-10` | レイアウト配置 |
| `u-display-sp` | レスポンシブ表示切替 |
| `u-mx-auto`, `u-mt-*`, `u-ml-*`, `u-mr-*` | マージン調整 |
| `u-w-full` | width 調整 |
| `u-cursor-pointer` | UI 挙動 |
| `u-bg-white` | 背景色 |
| `u-text-center` | テキスト配置（1 箇所だけなら残す） |

### ページ一覧と u-* 行数（現時点）

| # | ページ | u-* 行数 | 備考 |
|---|--------|---------|------|
| 1 | index.html | 95 | **Phase 2-A 完了** |
| 2 | storelist/[slag]/index.html | 329 | 最大。WordPress 由来のスタイル多い。要注意 |
| 3 | faq/index.html | 199 | |
| 4 | rules/index.html | 165 | |
| 5 | protein/index.html | 165 | |
| 6 | member/index.html | 130 | |
| 7 | medical/index.html | 116 | |
| 8 | admission/index.html | 115 | |
| 9 | point_redemption/index.html | 110 | 一部 Phase 2-A で修正済み |
| 10 | family/index.html | 102 | |
| 11 | column/[slag]/index.html | 88 | 一部 Phase 2-A で修正済み |
| 12 | about/index.html | 77 | 一部 Phase 2-A で修正済み |
| 13 | sportip/index.html | 74 | |
| 14 | price/index.html | 66 | |
| 15 | sitemap/index.html | 64 | |
| 16 | reservation/index.html | 63 | |
| 17 | personal/index.html | 59 | |
| 18 | storelist/index.html | 59 | |
| 19 | payment/index.html | 57 | |
| 20 | visitor/index.html | 56 | |
| 21 | contact/index.html | 51 | |
| 22 | column/index.html | 50 | 一部 Phase 2-A で修正済み |
| 23 | information/index.html | 46 | |

---

## 5. 参照ドキュメント

| ファイル | 内容 |
|---------|------|
| `CLAUDE.md` | プロジェクト全体の状態と原則 |
| `docs/progress.md` | 全チケットの詳細進捗 |
| `docs/plans/feedback-index-plan.md` | Phase 2 の Plan（分担テンプレート含む） |
| `docs/cording-guideline.md` | コーディング規約 |
| `docs/フィードバック調査結果.md` | 先方 FB の調査結果（9 項目） |
| `.claude/plans/synchronous-singing-porcupine.md` | Phase 2-A の詳細 Plan |

---

## 6. コンパイル手順

```bash
# グローバル CSS
npx sass assets/scss/global.scss assets/css/global.css --no-source-map

# ページ固有 CSS（例: top）
npx sass assets/scss/object/project/_top.scss assets/css/top.css --no-source-map
```

ページ固有 SCSS は `assets/scss/object/project/` に `_[ページ名].scss` として格納。
コンパイル後のファイルは `assets/css/[ページ名].css` に出力。
