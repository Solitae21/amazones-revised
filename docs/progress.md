# プロジェクト進捗詳細

CLAUDE.md から分離した詳細進捗。履歴・完了済みチケットの実装詳細・戦略の背景情報を記載。

---

## FB対応の戦略背景

### 先方 FB1 の本質

先方の原文:
> 現時点でも `c-panel-content-text-desk c-news-info__last-text u-fw-500 u-fs-16 u-ls-20` のような構成は改善が難しいということでしょうか。
> ユーティリティをコンポーネントで上書きしていることも気になる点となっております。

**先方が求めているのは「コンポーネントにスタイルを持たせる」という設計品質の改善であり、u-* の数を減らすこと自体が目的ではない。**

### 数値の推移（2026-04-06 時点）

- u-* 総数: **4,780 → 3,388**（Phase 3 完了後、1,392削除、29%減）
- Phase 3 で消えたのは body 継承と同じ値の冗長クラス（u-fw-500, u-fs-16, u-font-zen, u-text-black1）のみ
- 先方が問題視するパターン（`u-font-outfit u-fw-300 u-fs-36 u-text-white` 等）は Phase 3 では変わらない
- タイポグラフィ系の残存 u-*: **~1,800箇所以上**（Phase 2 で対応）

### 各作業の効果範囲（過大評価しないこと）

| 作業 | 状態 | 解決する問題 |
|------|------|------------|
| Phase 0（body デフォルト設定） | ✅ | 基盤。直接的な改善なし |
| Phase 1（共通コンポーネント吸収） | ✅ | FB1 の共通部分。質的改善 |
| Phase 3（body 継承削除、1,392箇所） | ✅ | FB2 のみ。冗長削除。先方への見た目の変化は小さい |
| **Phase 2（ページ固有コンポーネント吸収）** | **⬚** | **FB1 の本体。先方が実感できる唯一の改善。最優先。** |
| FB3（重複コンポーネント統合） | ⬚ | FB3。SCSS の重複削減。先方確認待ち |

### font-weight: 500 の設計判断

- デザイン基準は font-weight: 500（先方確認済み 2026-04-06）
- body { font-weight: 500 } は正しい
- h1-h6 は `font-weight: inherit` でリセット済み

---

## CSS大規模リファクタリング（Step 1〜8、完了済み）

詳細な計画は `docs/css-refactoring-plan.md` を参照。

| Step | 内容 | 状態 | 計画ファイル |
|------|------|------|-------------|
| Step 1 | 変数定義の整備（カラー・フォントサイズ） | ✅ | `step1-variables-plan.md` |
| Step 2 | FLOCSSディレクトリ構成への分離 | ✅ | `step2-flocss-plan.md` |
| Step 3 | BEM記法・FLOCSSプレフィクス修正 | ✅ | `step3-bem-plan.md` |
| Step 4 | IDセレクタ → クラスセレクタ置換 | ✅ | `step4-id-selector-plan.md` |
| Step 5 | セレクタ深さ修正（2階層以内） | ✅ | `step5-selector-depth-plan.md` |
| Step 6 | `!important` 削減（190→40箇所） | ✅ | `step6-important-plan.md` |
| Step 7a | `u-` プレフィクス付与（SCSS 1,589 + HTML 10,254箇所） | ✅ | `step7-utility-prefix-plan.md` |
| Step 7b | 未使用ユーティリティ削除（1,492件、CSS 11,229→5,858行） | ✅ | `step7b-unused-utility-plan.md` |
| Step 7c | ユーティリティ命名rem化 | ⏭スキップ | リスク対効果が低い |
| Step 8 | PC/SP 2ソース統一 | ✅ | `step8-pc-sp-unify-plan.md` |

Step 8 実施結果:
- Phase 1〜4 実施、Phase 5 スキップ（PC/SPが異なる親コンテナに配置されており CSS order では対応不可）

---

## 不要コード削除・JS整理（完了済み）

### 不要コード削除

| # | 対象 | 状態 | 備考 |
|---|------|------|------|
| 1-1 | `.wpac` / `.wp-gr` 関連CSS | スキップ | `storelist/[slag]/index.html` でHTML使用中 |
| 1-2 | `public-main.js` | スキップ | Googleレビューセクション残存 |

### JS整理

| # | 対象 | 状態 |
|---|------|------|
| 2-1 | `init__tabs()` 重複定義修正 | ✅ |
| 2-2 | スクロールアップ重複修正 | ✅ |
| 2-3 | スムーズスクロール統一 | ✅（FB4 F4-2 で対応） |
| 2-4 | ブレークポイント統一 | スキップ（CSS側と連動、変更リスクあり） |

---

## FB1,2: ユーティリティクラス設計改善（チケット詳細）

Plan: `docs/plans/feedback-index-plan.md`
Phase 3 Plan: `docs/plans/feedback-phase3-body-inherit-plan.md`

| チケット | 内容 | 状態 |
|---------|------|------|
| 0-1 | global.scss 読み込み順修正 | ✅ |
| 0-2 | body ベーススタイル追加 | ✅ デザイン基準500確認済み |
| 1-1 | ボタンテキスト（c-btn 系） | ✅ c-btn--red に font-weight:700 追加含む |
| 1-2 | ナビメニュー（l-nav-menu-popup） | ✅ |
| 1-3 | フッターアイコンリンク（l-footer__icon-link） | ✅ font-size:15px 追加 |
| 1-4 | フッターナビヘッダー（l-footer__page-link） | ✅ font-weight:500 追加 |
| 1-5 | セクションヘッダー（c-section-header） | ✅ |
| 1-6 | テキストスライダー（c-text-slider） | ✅ |
| 1-7 | ニュースアイテム（news-label, panel-content-text） | ✅ line-height:2em 追加 |
| 1-8 | フッターバナー（c-footer-banner） | ✅ |
| 1-9 | ヘッダー（l-header） | ✅ SCROLL DOWN SCSS化、CTA の u-text-center/u-fs-15 は残存許容 |
| 1-10 | フッターブランド（l-footer__brand） | ✅ |
| Phase 3 | body 継承ユーティリティ一括削除（1,392箇所） | ✅ storelist/[slag]のu-font-zen 185+u-text-black1 2は除外 |

### Phase 2-A: index.html ページ固有コンポーネント吸収（2026-04-06）

Plan: `.claude/plans/synchronous-singing-porcupine.md`

**成果**: index.html u-* 行数 184→95（48%減）、タイポグラフィ系 ~140→24（83%減）

| チケット | 内容 | 群 | 状態 | 備考 |
|---------|------|---|------|------|
| 2A-2 | ニュースバナー（p-top__news-banner） | A | ✅ | news-banner-break リネーム、p-top__news-banner-title/text 新設 |
| 2A-3 | ヒーロー（p-top__hero） | A | ✅ | 壊れたレスポンシブ修復（.fs-39, .fs-19）、hero-text__cta→p-top__hero-cta リネーム |
| 2A-6 | トレーニングマシン | A | ✅ | machine-label-p/icon リネーム、ラベル×6 吸収 |
| 2A-8 | 会員の声（p-top__voice） | A | ✅ | 壊れたレスポンシブ修復（.fs-24）、voice-btn リネーム、カード4枚分 |
| 2A-9 | 動画（p-top__movie） | A | ✅ | 壊れたレスポンシブ修復（.fs-24）、movie-label-break/movie-speech-bubble リネーム |
| 2A-1 | サービス（c-service）[B群] | B | ✅ | service-content→c-service__content リネーム。影響: storelist/[slag] |
| 2A-4 | Dr.Amazones [B群] | B | ✅ | 壊れたレスポンシブ修復（.fs-18）、dr-amazones-label/btn リネーム。影響: point_redemption |
| 2A-5 | ショップリスト（c-shop）[B群] | B | ✅ | 壊れたレスポンシブ修復（.fs-36, .u-fs-18）、shop-break リネーム。影響: about, sitemap |
| 2A-7 | 料金プラン（c-price-plan）[B群] | B | ✅ | 壊れたレスポンシブ修復（.fs-24 ×2）。影響: about, column |
| 2A-10 | コラム（c-column）[B群] | B | ✅ | 壊れたレスポンシブ修復（.fs-15, .fs-16）。影響: column, column/[slag] |

#### 壊れたレスポンシブ修復（Step 7a の u-プレフィクス付与で不一致になっていたセレクタ）

| ファイル | 旧セレクタ（死） | 新セレクタ | 値 |
|---------|----------------|-----------|-----|
| _top.scss | `.p-top__hero-text .fs-39` | `.p-top__hero-heading` | `font-size: var(--fs-lg2)` @900px |
| _top.scss | `.p-top__hero-text .fs-19` | `.p-top__hero-sub` | `font-size: var(--fs-sm2)` @900px |
| _top.scss | `.c-dr-amazones__section .fs-18` | `.c-dr-amazones__header-text` | `font-size: var(--fs-base)` @767px |
| _top.scss | `.p-top__voice-section .fs-24` | `.p-top__voice-title` | `font-size: var(--fs-lg)` @900px |
| _top.scss | `.movie-label-break .fs-24` | `.p-top__movie-title` | `font-size: var(--fs-md)` @767px |
| _global-responsive.scss | `.c-shop__map-number .fs-36` | `.c-shop__map-unit` | `font-size: var(--fs-md)` @767px |
| _global-responsive.scss | `.c-shop__header .u-fs-18`（生） | `.c-shop__header__text1` | `font-size: var(--fs-sm2)` @370px |
| _global-responsive.scss | `.c-price-plan__sub-text .fs-24` | `.c-price-plan__sub-title` | `font-size: var(--fs-lg)` @767px |
| _global-responsive.scss | `.c-price-plan__info-container .fs-24` | `.c-price-plan__info-card__title` | `font-size: var(--fs-md)` @767px |
| _global-responsive.scss | `.c-column__item .fs-15` | `.c-column__item-title` | `font-size: 11px` @767px |

#### クロスページ影響（B群で同時修正したファイル）

| ファイル | 修正内容 |
|---------|---------|
| `storelist/[slag]/index.html` | service-content リネーム、c-service__subtitle/title/desc 置換 |
| `point_redemption/index.html` | c-dr-amazones__title/desc 置換、dr-amazones-label/btn リネーム |
| `about/index.html` | c-shop__header__text1/2 u-* 削除、c-shop__map-number/unit 置換、c-price-plan 系 u-* 削除 |
| `column/index.html` | c-column__date/item-title 置換 |
| `column/[slag]/index.html` | c-column__date/item-title 置換 |
| `_storedetail.scss` | service-content→c-service__content リネーム |
| `_point_redemption.scss` | dr-amazones-label/btn リネーム |

### Phase 2-B: ページ別作業（2026-04-09〜）

担当割り振り: `docs/phase2b-guide.md`

#### 新家担当

| ページ | 状態 | 備考 |
|--------|------|------|
| about | ✅ 完了 | 先行着手。`docs/plans/phase2b-about-plan.md`。ブラウザ確認済み |
| admission | ✅ 完了（2026-04-09） | u-* 66→24（42件削除）。詳細下記 |
| column | ✅ 完了（2026-04-10） | column/index.html はクラス置換のみ（SCSS変更なし）。column/[slag] は `_column-slag.scss` に2階層セレクタで約35件吸収 |
| contact | ✅ 完了（2026-04-10） | 2件削除。`fw-50` 未定義クラスも同時解消。`_contact.scss` に `.p-contact__intro-text` 新設 |
| payment | ✅ 完了（2026-04-10） | 5→1（-80%）。`.p-payment__title` に font-family、`.p-payment__about-caption p:first-child` で red text 吸収。残1は共通 `c-announcement` "GO!" h2（別スコープ） |
| information | ✅ 完了（2026-04-10） | ページ固有 u-* ゼロ、作業不要 |
| faq | ✅ 完了（2026-04-10、ブラウザ確認済） | 173→36（-79%）。`.p-faq__page__item h2`、`.p-faq__nav a` 追加。死セレクタ `.p-faq__page__item .fs-24` 修復。`c-faq` 共通ルールは `_global-responsive.scss` に集約 |
| family | ✅ 完了（2026-04-10、ブラウザ確認済） | 101→12（-88%）。BEM 子要素多数新設（`p-family__case__label/highlight/price` など）。`answer-text` 未定義クラス解消 |
| medical | ✅ 完了（2026-04-10、ブラウザ確認済） | 108→8（-93%）。BEM 子要素多数新設。hero h1 は既存 `.c-hero-slider__title h1` 上書きで u-* を no-op として除去 |
| member | ✅ 完了（2026-04-10、ブラウザ確認済） | 136→11（-92%）。voice カード 22枚分を `.p-member-voice-label/name/body` に集約 |

#### admission 実施内容（2026-04-09）

Plan: `docs/plans/phase2b-admission-plan.md`（修正版）

| チケット | 内容 | 結果 |
|---|---|---|
| 2B-admission-1 | `p-admission-nav__link` の `u-fs-14` | ✅ 2件削除 |
| 2B-admission-2 | Step ラベル/タイトル BEM 子要素吸収 + 死セレクタ削除 + HTMLバグ | ✅ 12件削除。`p-admission-item__step-label/title` 新設。死セレクタ `.p-admission-item__title .text-lightBlue` 削除。SP は16px統一。HTMLバグ `u-md-fs-16 u-md-fs-16` 重複解消 |
| 2B-admission-3 | Step 本文 `u-lh-*` | ⚠️ 部分完了。context override（`.p-admission-container .p-admission-p`, `.p-admission-web-container .p-admission-p`）で5件吸収。`admission-p` リネームは視覚リスクで保留 |
| 2B-admission-4 | Step4/WEB1 nested | ✅ 23件削除。`p-admission-step4__subtitle/num` 新設、body p は `.p-admission-step4__item-content p`（2階層）で吸収 |
| 2B-admission-5 | step-warning 内 p | ✅ 1件削除。`.p-step-warning p` で吸収 |

**成果**: admission の u-* 66→24（-64%）、死セレクタ1件削除、HTMLバグ1件修正

**admission 残存24件の内訳**（すべて別スコープ）:
- 共通ナビ・フッターハイライトリンク 7件 → `feedback-nav-highlight-links-plan.md`
- バナー・パンくず 4件 → 未作成（`feedback-common-banner-plan.md`）
- `c-other-details-banner` 8件 → 未作成（`feedback-other-details-banner-plan.md`）
- `admission-p` リネーム 3件 → 未作成（`feedback-admission-p-rename-plan.md`）
- `u-text-right`（レイアウト系、残存許容）1件
- `u-text-link`（`c-other-details-banner` 内）1件

#### admission 作業中に発見した追加問題

| # | ファイル/箇所 | 問題 | 対応 |
|---|------|------|------|
| 1 | `_admission.scss:209` | `.p-admission-item .fw-700 { line-height: 30px }` は Step 7a 以降の死セレクタ | 別途清掃 |
| 2 | `_admission.scss:392` | `.p-admission-p.mt-60` も Step 7a 以降の死セレクタ（`u-mt-60` のため） | 別途清掃 |
| 3 | `admission/index.html:953` | `class="u-fw-700 u-fs-24 u-md-fs-16 md"` の末尾 `md` は不正クラス残骸 | `c-other-details-banner` 別 Plan 内で修正 |
| 4 | `admission-p` ⇔ `p-admission-p` の SP `line-height:30px` と `u-lh-200` の specificity/source order 相互作用 | 視覚リスクのため Plan 切り出し | `feedback-admission-p-rename-plan.md` |

### Phase 2-B 新家担当 完了サマリ（2026-04-10）

**全10ページ完了**。合計 **約628件 → 92件**（約536件削除、**-85%**）。

#### ページ別実績

| ページ | Before | After | 削減 |
|---|---|---|---|
| about | 先行 | 完 | — |
| admission | 66 | 24 | -64% |
| column + [slag] | 約37 | 0 | -100% |
| contact | 2 | 0 | -100% |
| payment | 5 | 1 | -80% |
| information | 0 | 0 | — |
| faq | 173 | 36 | -79% |
| family | 101 | 12 | -88% |
| medical | 108 | 8 | -93% |
| member | 136 | 11 | -92% |

#### 副産物的な改善

- **`c-faq` 共通化**: `_global-responsive.scss` に `.c-faq__accordion-header p { font-weight: 700 }` / `.c-faq__accordion-box p { line-height: 2.1em }` を追加。faq/family/medical/visitor/storelist/[slag]/protein の6ページが自動恩恵
- **死セレクタ修復**: `_admission.scss:344`（Step ラベル SP 18px → 16px 統一）、`_faq.scss:32`（カテゴリ h2）
- **HTMLバグ修正**: `admission:454` の `u-md-fs-16` 重複
- **規約違反クラス解消**: `fw-50`（contact）、`admission-p`（admission 一部、残りは別 Plan）、`answer-text`（family/faq）
- **BEM 子要素の大量新設**: ガイドライン準拠のページ固有クラスを整備
- **セレクタ深さ2階層以内を厳守**

#### 残存92件の内訳（すべて別スコープ）

| 分類 | 件数 | 対応 |
|---|---|---|
| 共通ナビ・フッターハイライトリンク（`u-text-lightBlue`） | 約60 | `feedback-nav-highlight-links-plan.md`（先方確認待ち） |
| バナー・パンくず（`p-banner-title u-text-white`, `banner-a-link u-fs-14` 等） | 約25 | 共通バナー Plan（未作成） |
| `u-text-right`（レイアウト系、残存許容） | 10 | 対応不要 |
| `u-text-link`（faq 内の本文リンク、汎用ユーティリティ） | 約20 | 保留 |
| `u-text-lightBlue`（faq 内のインライン強調ラベル） | 4 | 保留 |
| admission 内の他スコープ（c-other-details-banner、admission-p rename、c-announcement h2） | 約13 | 各別 Plan |

---

## FB3: 重複コンポーネント統合

Plan: `docs/plans/feedback-duplicate-components-plan.md`

| チケット | 内容 | 状態 |
|---------|------|------|
| F3-1 | ナビゲーション統合（7箇所） | ⬚ 先方確認待ち |
| F3-2 | CTA バナー統合 | ⬚ 先方確認待ち |
| F3-3 | セクションヘッダー確認（FB1 依存） | ⬚ |
| F3-4 | 吹き出し統合（7箇所） | ⬚ |
| F3-5 | バナーオーバーレイ | ⬚ |
| F3-6〜10 | 残りパターン | ⬚ 先方確認待ち |

---

## FB4: global.js / common.js 整理（完了）

Plan: `docs/plans/feedback-js-organization-plan.md`

| チケット | 内容 | 状態 |
|---------|------|------|
| F4-1 | 使い分け方針整理 | ✅ A案（統合）で確定 |
| F4-2 | スムーズスクロール重複解消 | ✅ initSmoothScroll削除、href="#"ガード追加、4ファイル削除 |
| F4-3 | common.js → global.js 統合 | ✅ 全23HTMLからscriptタグ削除 |
