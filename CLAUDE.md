# CLAUDE.md - Amazones ブランディングサイト コーディング品質改善

## プロジェクト概要

Amazones（アマゾネス）ブランディングサイトのコーディング品質改善プロジェクト。
静的HTML/CSS/JSサイト（PHP対応可）。WordPressからの移行済み。

---

## 最重要原則: 見た目を絶対に崩さない

**フロントエンドの表示結果（レイアウト・色・フォント・アニメーション・レスポンシブ挙動）は一切変更しないこと。**
リファクタリングはすべて「内部構造の改善」であり、ブラウザ上の見た目に影響を与えてはならない。

- CSS修正時は必ず修正前後でブラウザ表示を確認すること
- クラス名変更時はHTML側の参照も漏れなく更新すること
- 削除対象のコードが本当に未使用かを grep 等で確認してから削除すること
- 判断に迷う場合は修正しない（安全側に倒す）

---

## コーディング規約（準拠元: `docs/cording-guideline.md`）

- HTML: インデント2スペース、セマンティックHTML、画像接頭辞ルール
- CSS: SCSS(dartsass)、FLOCSS構成、BEM記法、セレクタ深さ2階層まで、ID禁止
- JS: バニラJS（jQuery不使用）、ページ別ファイル分割
- 詳細は `docs/cording-guideline.md` を参照

---

## 全体進捗

リファクタリングは8ステップで構成されています。
詳細な計画は `docs/css-refactoring-plan.md` を参照してください。

### ✅ 完了済み（Step 1〜5）

| Step | 内容 | 計画ファイル |
|------|------|-------------|
| Step 1 | 変数定義の整備（カラー・フォントサイズ） | `docs/plans/step1-variables-plan.md` |
| Step 2 | FLOCSSディレクトリ構成への分離 | `docs/plans/step2-flocss-plan.md` |
| Step 3 | BEM記法・FLOCSSプレフィクスの修正（`l-`/`c-`/`p-` 付与、BEM区切り文字統一） | `docs/plans/step3-bem-plan.md` |
| Step 4 | IDセレクタ → クラスセレクタへの置換（13 ID, 32ルール） | `docs/plans/step4-id-selector-plan.md` |
| Step 5 | セレクタ深さの修正（2階層以内、約94箇所） | `docs/plans/step5-selector-depth-plan.md` |

### ✅ 完了済み（Step 6）

| Step | 内容 | 計画ファイル |
|------|------|-------------|
| Step 6 | `!important` の削減（190箇所 → 40箇所残存、約150件削除） | `docs/plans/step6-important-plan.md` |

### ✅ 完了済み（Step 7a）

| Step | 内容 | 計画ファイル |
|------|------|-------------|
| Step 7a | ユーティリティクラスの `u-` プレフィクス付与（SCSS 9ファイル 1,589クラス + HTML 23ファイル 10,254箇所） | `docs/plans/step7-utility-prefix-plan.md` |

### ✅ 完了済み（Step 7b）

| Step | 内容 | 計画ファイル |
|------|------|-------------|
| Step 7b | 未使用ユーティリティクラスの削除（1,492件削除、97件残存、CSS 11,229行→5,858行） | `docs/plans/step7b-unused-utility-plan.md` |

### ⏭ スキップ（Step 7c）

| Step | 内容 | 理由 |
|------|------|------|
| Step 7c | ユーティリティ命名・単位のガイドライン完全準拠（rem化・省略形化） | 現状 `u-fs-14` = `font-size: 14px` で名前と値が一致しており可読性の問題なし。10,000箇所の置換リスクに対して効果が低いためスキップ |

### ✅ 完了済み（Step 8）

| Step | 内容 | 規模 | 計画ファイル |
|------|------|------|-------------|
| Step 8 | PC/SP 2ソース統一（HTML構造改善） | Phase 1〜4 実施、Phase 5 スキップ | `docs/plans/step8-pc-sp-unify-plan.md` |

**Step 8 実施結果:**
- Phase 1（B-1, B-2, B-4）: テキスト配置切替 ✅ 6ファイル統合
- Phase 2（C-1 × 8箇所）: price title-row 統合 ✅ 2ファイル8箇所統合
- Phase 3（A-1, A-2, A-3, B-3）: c-shop セクション統合 ✅ 2ファイル統合
- Phase 4（C-2, D-1）: order ベース統合 ✅ 3ファイル統合、B-6 スキップ（並び順以外の差異）
- Phase 5（D-5 × 9箇所）: **全スキップ** — 全箇所でPC/SPが異なる親コンテナに配置されており CSS order では対応不可

**Step 4〜8 の詳細な対象一覧・置換マップは `docs/css-refactoring-plan.md` に記載済みです。**

---

## 作業手順（Step 4〜8 を進める場合）

**ユーザーが「Step N を開始」「Step N に着手」等の指示を出した場合、以下の手順を自動で実行すること。**

### Step 1: Plan 作成（自動実行）

ユーザーの着手指示を受けたら、**確認を求めずに即座に** Plan エージェントで以下を調査し、`docs/plans/step{N}-{slug}-plan.md` を作成する。

1. `docs/css-refactoring-plan.md` から該当 Step の対象一覧を読み込む
2. 対象ファイルの現状を grep/read で全量調査する
3. 以下を含む Plan ファイルを生成する:
   - 対象箇所の全量リスト（ファイル名・行番号）
   - 旧名 → 新名の置換マップ
   - 除外条件（WordPress由来等）
   - 部分マッチ回避の処理順序
   - リスク評価
4. Plan 完成後、内容をユーザーに提示して承認を求める

### Step 2: 作業実行（ユーザー承認後）

- Plan にない変更は行わない
- 各クラスについて **SCSS → CSS → HTML → JS** の全参照を検索し漏れなく置換する
- 置換前に旧クラス名で grep して全出現箇所を把握する
- 置換後に旧クラス名で grep して残存がないことを確認する

### Step 3: 検証

- SCSSコンパイル: `npx sass assets/scss/global.scss assets/css/global.css --no-source-map`
- ブラウザで見た目が変わっていないことを確認

### Step 4: 完了処理

- 本ファイル（CLAUDE.md）の「全体進捗」テーブルを更新する（⬚ → ✅、計画ファイル欄を更新）
- **ユーザーに `/clear` の実行を勧める**（トークン節約のため、次の Step は新しいチャットで開始することを推奨）

---

## SCSS構成（Step 2 で整備済み）

```
assets/scss/
├── global.scss              # エントリポイント
├── _global-responsive.scss  # グローバルのレスポンシブ
├── foundation/
│   ├── _variables.scss      # カラー・フォントサイズ変数
│   └── _reset.scss          # リセットCSS
├── layout/
│   ├── _header.scss         # ヘッダー (l-header, l-header-floating-menu 等)
│   └── _footer.scss         # フッター (l-footer 等)
├── object/
│   ├── component/           # 再利用コンポーネント (c-*)
│   │   ├── _animation.scss
│   │   ├── _btn.scss
│   │   ├── _slider.scss
│   │   └── ...
│   ├── project/             # ページ固有スタイル (p-*)
│   │   ├── _top.scss
│   │   ├── _about.scss
│   │   ├── _storedetail.scss
│   │   └── ...
│   └── utility/             # ユーティリティ (u-* 統一は Step 7)
│       ├── _color.scss
│       ├── _typography.scss
│       └── _display.scss
```

---

## 完了済みタスクの詳細

### Phase 1: 不要コード削除

| # | 対象 | 状態 | 備考 |
|---|------|------|------|
| 1-1 | `.wpac` / `.wp-gr` 関連CSS | **スキップ** | `storelist/[slag]/index.html` でHTMLが使用中のため削除不可 |
| 1-2 | `public-main.js` | **スキップ** | Googleレビューセクションが残存しているため削除不可 |

### Phase 2: JS整理

| # | 対象 | 状態 |
|---|------|------|
| 2-1 | `init__tabs()` 重複定義修正 | **完了** |
| 2-2 | スクロールアップ重複修正 | **完了** |
| 2-3 | スムーズスクロール統一 | **スキップ** — 各実装の用途が異なり統一すると動作が変わるリスクあり |
| 2-4 | ブレークポイント統一 | **スキップ** — CSS側メディアクエリと連動しており変更リスクあり |

### Phase 3 / Phase 6 Step 1〜3: CSS大規模リファクタリング

| 対象 | 状態 |
|------|------|
| Step 1: カラー・フォントサイズ変数化 | **完了** |
| Step 2: FLOCSS ディレクトリ構成分離 | **完了** |
| Step 3: BEM記法・FLOCSSプレフィクス修正（~250クラス） | **完了** |
| `p-medical_voice_*` → `p-top__service-*` リネーム | **完了** |

---

## 対象外（本プロジェクトでは着手しない）

| 対象 | 理由 |
|------|------|
| 画像最適化（PNG→WebP、SVG再書き出し等） | デザイナー確認が必要 |
| 画像ファイルの重複削除・パス統一 | 画像関連は見送り |
| リンク未設定箇所（`href="#"`） | リンク先URLはクライアント側で決定 |
| alt未設定箇所（コンテンツ画像） | テキスト内容はクライアント確認が必要 |

---

## 参照ドキュメント

| ファイル | 内容 |
|---------|------|
| `docs/cording-guideline.md` | コーディング規約 |
| `docs/css-refactoring-plan.md` | CSS大規模リファクタリング全体計画（Step 1〜8 の詳細） |
| `docs/plans/step1-variables-plan.md` | Step 1 実行計画（完了済み） |
| `docs/plans/step2-flocss-plan.md` | Step 2 実行計画（完了済み） |
| `docs/plans/step3-bem-plan.md` | Step 3 実行計画（完了済み） |
| `docs/フィードバック調査結果.md` | 先方フィードバック調査結果（HTML/CSS/JS） |
| `docs/画像フィードバック調査結果.md` | 画像に関するフィードバック調査結果 |
| `docs/Amazonesブランディングサイトコーディング引継ぎ内容.md` | デザイナー引継ぎ資料 |
| `docs/リンク未設定箇所まとめ.md` | リンク未設定箇所一覧 |
