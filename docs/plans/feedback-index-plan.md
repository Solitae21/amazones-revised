# 実行計画: ユーティリティクラス設計改善

> コンテキスト: `docs/plans/feedback-improvement-context.md`
> 方針: チケット = 「何を・なぜ・受け入れ基準」のみ。実装方法は既存コード + ガイドラインから判断する。

---

## ⚠️ 戦略的注意（2026-04-06 追記）

### Phase 3 だけでは FB1 の根本原因を解消できない

Phase 3（body 継承ユーティリティ一括削除、Plan: `feedback-phase3-body-inherit-plan.md`）は
u-fw-500 / u-fs-16 / u-font-zen / u-text-black1 の計 ~1,386箇所を削除するが、
HTML 全体の u-* 使用数 ~4,793 の **29% にしか当たらない**。

Phase 3 で削除されないユーティリティ（body デフォルトと異なる値）の例:
- u-font-outfit, u-fw-700, u-fw-300, u-fw-400, u-fw-600
- u-fs-14, u-fs-15, u-fs-18, u-fs-24, u-fs-36, u-fs-100
- u-text-white, u-text-lightBlue, u-lh-200, u-lh-normal, u-ls-*

これらは **Phase 2（ページ固有コンポーネント SCSS 吸収）** で各コンポーネントに移さない限り残り続ける。

### 先方への共有には Phase 3 + Phase 2（代表ページ）のセットが必要

Phase 3 のみの成果では「body 継承分を消しただけ」であり、先方の指摘例のようなユーティリティ過多の HTML は大きくは変わらない。先方に Before/After を提示するには、Phase 2 で代表ページ（index.html 等）のページ固有コンポーネントも SCSS 吸収した状態が必要。

### 設計判断の記録

- デザイン基準の font-weight は 500（2026-04-06 確認済み）
- body { font-weight: 500 } はデザイン意図に合致。ブラウザデフォルト(400)との差は意図的な設計。

---

## 全体の流れ

```
[共通作業（分担前に1人で完了させる）]
  Phase 0: 基盤整備（読み込み順 + body ベーススタイル）
  Phase 1: 共通コンポーネント（header, footer, nav, btn 等）
      ↓
[先方に共有]
  index.html の Before/After を提示し、方向性の合意を取る
      ↓
[分担作業（各担当者がページ単位で実施）]
  Phase 2: 各担当ページのページ固有コンポーネント改善
  → 分担用チケットテンプレートに従って実施
```

---

## 設計方針

### 原則

1. **ガイドライン（`docs/cording-guideline.md`）が目指す基準**
2. **既存 SCSS のパターン（変数の使い方、メディアクエリ、コメント等）を参考に実装**
3. チケットに具体的な SCSS コードは書かない。受け入れ基準のみ。
4. 各チケット完了時に grep で全量確認 + コンパイル + ブラウザ検証

### 情報の優先順位（CLAUDE.md に追記すること）

```
1. コーディングガイドライン（docs/cording-guideline.md）= 目指す基準
2. 既存 SCSS のパターン = 実装方法の参考
3. Plan ファイル = 対象範囲と受け入れ基準のみ
4. コードとガイドラインが矛盾 → ガイドラインに寄せる
5. 判断に迷う → 人間に確認
```

---

## Phase 0: 基盤整備

### チケット 0-1: global.scss 読み込み順を FLOCSS 正規順に修正

#### 何を
global.scss の @import 順を FLOCSS 正規順（Foundation → Layout → Component → Utility）に変更する。

#### なぜ
- 現状: Utility が Component/Layout より先に読み込まれ、同詳細度で Component に負ける
- ガイドライン: FLOCSS 構成を採用しており、正規の読み込み順が前提
- コンテキスト §6 で影響分析済み。影響は限定的だが、正しい土台なしに作業すると二度手間になる

#### 対象ファイル
- `assets/scss/global.scss`

#### 受け入れ基準
- [ ] 読み込み順が Foundation → Layout → Component → Utility → global-responsive になっている
- [ ] コンパイルが通る
- [ ] **全ページ**をブラウザで確認し、表示崩れがない
- [ ] 崩れが見つかった場合はこのチケット内で修正する（原因は Component vs Utility の競合）

---

### チケット 0-2: body ベーススタイルの追加

#### 何を
`_reset.scss` の body に `font-weight: 500` と `font-size: 16px` を追加する。
h1-h6 のブラウザデフォルト bold を `font-weight: inherit` でリセットする。

#### なぜ
- 先方FB: 「u-font-zen u-fw-500 u-fs-16 は body 指定で不要では」
- デザイン基準値（font-size: 16px, font-weight: 500, font-family: Zen Kaku Gothic New）を body で定義することで、大量の冗長ユーティリティが不要になる
- font-family は既に `var(--font-zen)` として設定済み

#### 対象ファイル
- `assets/scss/foundation/_reset.scss`

#### 受け入れ基準
- [ ] body に font-weight: 500 と font-size: 16px が定義されている
- [ ] h1-h6 に font-weight: inherit が定義されている
- [ ] コンパイルが通る
- [ ] **全ページ**で h1-h6 の表示（太さ）が変わっていないことを確認
- [ ] 全ページの本文テキストの太さ・サイズが変わっていないことを確認

#### 注意
- `storelist/[slag]/index.html` は `html { font-family: kozuka-gothic-pr6n }` という上書きがある。このページは別途確認が必要。

---

## Phase 1: 共通コンポーネント（分担前に完了させる）

全ページの header / footer / nav / btn 等の共通部分を一括で改善する。
これを先に完了しないと、分担作業時にコンフリクトが発生する。

---

### チケット 1-1: ボタンテキスト（c-btn 系）

#### 何を
`c-btn--light-blue` 等のボタン内テキスト（`<p>` 要素）に付与されている `u-text-white u-fs-16 u-font-outfit` をコンポーネント SCSS に移す。

#### なぜ
- **23ファイル（ほぼ全ページ）** に存在する最も広範なパターン
- 全箇所で同じ3ユーティリティの組み合わせ = コンポーネントが持つべきスタイル

#### 受け入れ基準
- [ ] ボタン内テキストのタイポグラフィ（color, font-family）が SCSS で定義されている
- [ ] font-size: 16px は body 継承で不要（Phase 0 完了前提）
- [ ] **全 HTML ファイル**のボタン内テキストから該当ユーティリティが削除されている
- [ ] grep で残存が 0 件
- [ ] 既存の `_btn.scss` のパターンに準拠
- [ ] 全ページでボタンの見た目が変わっていない

---

### チケット 1-2: ナビメニュー（l-nav-menu-popup）

#### 何を
ナビゲーションメニュー内のテキスト要素（カテゴリヘッダー、リンク、下部リンク）のユーティリティをコンポーネント SCSS に移す。

#### なぜ
- **16ファイル**に存在。全ページ共通構造。
- カテゴリヘッダー: `u-font-outfit u-fs-18 u-fw-500` が毎回付与
- ナビリンク: `u-fw-500 u-fs-15` が毎回付与
- 下部リンク: `u-fw-500 u-fs-14` が毎回付与
- 一部リンクに `u-text-lightBlue`（アクセントカラー）あり

#### 受け入れ基準
- [ ] カテゴリヘッダー、ナビリンク、下部リンクのタイポグラフィが SCSS で定義されている
- [ ] アクセントカラーのリンクが BEM Modifier で表現されている
- [ ] **全 HTML ファイル**から該当ユーティリティが削除されている
- [ ] grep で残存が 0 件
- [ ] 全ページでナビメニューの見た目が変わっていない

---

### チケット 1-3: フッターアイコンリンク（l-footer__icon-link）

#### 何を
`l-footer__icon-link` に付与されている `u-fw-500 u-fs-15` をコンポーネント SCSS に移す。

#### なぜ
- **21ファイル**、180箇所以上。全箇所で同じ2ユーティリティ。

#### 受け入れ基準
- [ ] `l-footer__icon-link` の SCSS に font-size が追加されている
- [ ] **全 HTML ファイル**から `u-fw-500 u-fs-15` が削除されている
- [ ] grep で残存が 0 件
- [ ] 全ページでフッターリンクの見た目が変わっていない

---

### チケット 1-4: フッターナビヘッダー（l-footer__page-link）

#### 何を
フッターナビのセクションヘッダー（「About Us」「Service」等）に付与されているユーティリティをコンポーネント SCSS に移す。

#### なぜ
- **15ファイル以上**、200箇所以上。
- `u-font-outfit u-fs-18 u-fw-500` が毎回付与

#### 受け入れ基準
- [ ] ヘッダーテキストのタイポグラフィが SCSS で定義されている
- [ ] **全 HTML ファイル**から該当ユーティリティが削除されている
- [ ] grep で残存が 0 件
- [ ] 全ページでフッターナビの見た目が変わっていない

---

### チケット 1-5: セクションヘッダー（c-section-header）

#### 何を
セクションヘッダーの2要素（ラベル `<p>` と見出し `<h2>`）のユーティリティをコンポーネント SCSS に移す。

#### なぜ
- **12ファイル**に存在する共通パターン
- ラベル: `section-sub-text u-fs-18 u-fw-500 u-text-black1`
- 見出し: `c-section-header__text u-fs-100 u-lh-normal u-font-outfit u-text-black1 u-fw-400`
- `section-sub-text` は FLOCSS プレフィクスがない（要対応）
- 暗い背景セクションでは `u-text-white` が追加される

#### 受け入れ基準
- [ ] ラベルと見出しのタイポグラフィが SCSS で定義されている
- [ ] ラベルに FLOCSS 準拠のクラス名が使用されている
- [ ] 暗い背景の色違いが BEM Modifier で表現されている
- [ ] `section-sub-text` の既存レスポンシブ定義が新クラス名にも適用されている
- [ ] **全 HTML ファイル**から該当ユーティリティが削除されている
- [ ] grep で残存が 0 件
- [ ] 全ページでセクションヘッダーの見た目が変わっていない

---

### チケット 1-6: テキストスライダー（c-text-slider）

#### 何を
`c-text-slider__slide-text` に付与されている `u-font-outfit u-fw-300 u-fs-36 u-text-white` をコンポーネント SCSS に移す。

#### なぜ
- **3ファイル**（index, sportip, storelist/[slag]）、計60箇所以上
- 全箇所で完全に同一のユーティリティ4つ

#### 受け入れ基準
- [ ] タイポグラフィが SCSS で定義されている
- [ ] **全3ファイル**から該当ユーティリティが削除されている
- [ ] grep で残存が 0 件
- [ ] 3ページでスライダーの見た目が変わっていない

---

### チケット 1-7: ニュースアイテム（news-label, panel-content-text）

#### 何を
ニュースセクション内の3要素（ラベル、日付、タイトル）のユーティリティをコンポーネント SCSS に移す。

#### なぜ
- **2ファイル**（index, information）で計90箇所以上
- ラベル: `u-fw-500 u-fs-14` が毎回
- 日付 `<time>`: `u-fs-16 u-fw-500 u-font-outfit u-text-lightBlue` が毎回（クラスなし → 新設必要）
- タイトル: `c-panel-content-text-desk/sp` に `u-fw-500 u-fs-16 u-ls-20` が毎回

#### 受け入れ基準
- [ ] 各要素のタイポグラフィが SCSS で定義されている
- [ ] 日付 `<time>` にセマンティックなクラスが付与されている
- [ ] **全2ファイル**から該当ユーティリティが削除されている
- [ ] grep で残存が 0 件
- [ ] 2ページでニュースセクションの見た目が変わっていない

---

### チケット 1-8: フッターバナー（c-footer-banner）

#### 何を
1. `_footer-banner.scss` の3重定義を1定義に統合
2. バナー内テキスト要素のユーティリティをコンポーネント SCSS に移す

#### なぜ
- 3重定義は明確なバグ
- **5ファイル**（index, family, admission, member, about）で使用

#### 受け入れ基準
- [ ] 重複定義が1つに統合されている（`overflow: visible` 含む）
- [ ] バナー内テキストのタイポグラフィが SCSS で定義されている
- [ ] **全5ファイル**から該当ユーティリティが削除されている
- [ ] 全5ページでフッターバナーの見た目が変わっていない

---

### チケット 1-9: ヘッダー（l-header）

#### 何を
ヘッダー内のテキスト要素（ブランド名、タグライン、MENU/CLOSE、SCROLL DOWN、CTAボタンテキスト）のユーティリティをコンポーネント SCSS に移す。

#### なぜ
- **全ページ共通**のヘッダー構造
- `header-text` は FLOCSS プレフィクスがない
- フローティングメニュー内テキストにユーティリティが繰り返し付与

#### 受け入れ基準
- [ ] 各テキスト要素のタイポグラフィが SCSS で定義されている
- [ ] FLOCSS プレフィクス準拠のクラス名が使用されている
- [ ] **全 HTML ファイル**から該当ユーティリティが削除されている
- [ ] 全ページでヘッダーの見た目が変わっていない

---

### チケット 1-10: フッターブランド（l-footer__brand）

#### 何を
フッターブランドエリア内のテキスト要素のユーティリティを SCSS に移す。

#### なぜ
- **全ページ共通**のフッター構造

#### 受け入れ基準
- [ ] テキスト要素のタイポグラフィが SCSS で定義されている
- [ ] **全 HTML ファイル**から該当ユーティリティが削除されている
- [ ] 全ページでフッターの見た目が変わっていない

---

## Phase 1 完了後: 先方への共有

Phase 1 完了時点で index.html を中心に Before/After を整理し、先方に方向性を共有する。

### 共有内容
- 改善前後の HTML 比較（代表的なセクション2〜3箇所）
- 「ユーティリティの多用」がどう改善されたかの説明
- 残作業（Phase 2 = ページ固有コンポーネント）の見通し

### 合意を取るポイント
- この方向性で全ページに展開してよいか
- クラス命名（BEM Modifier 等）に問題がないか

---

## Phase 2: ページ固有コンポーネント（分担作業）

Phase 1 で共通部分は完了している。各担当者が自分のページ内に残っている**ページ固有のユーティリティ過多パターン**を改善する。

---

### 分担用チケットテンプレート

各担当者は以下のテンプレートに従って作業する。

```markdown
# チケット: [ページ名] ページ固有ユーティリティ改善

## 対象ファイル
- [ページ名]/index.html
- 関連 SCSS ファイル（assets/scss/object/project/_[ページ名].scss 等）

## 作業手順

### Step 1: 現状調査
対象 HTML ファイル内で、ユーティリティのみ（または主に）でスタイリングされている
要素を洗い出す。特に以下に注目:
- クラスなしの <p>, <span>, <h2> 等にユーティリティが3個以上付与されている要素
- 繰り返し出現する同じユーティリティの組み合わせ
- コンポーネントクラスはあるがタイポグラフィがSCSSに定義されていない要素

### Step 2: 改善実施
まず以下を読んで既存パターンとガイドラインを把握すること:
1. docs/cording-guideline.md（コーディング規約）
2. 対象の SCSS ファイル（既存の変数・メディアクエリ・コメントパターン）

その上で:
- 既存クラスにタイポグラフィがない場合 → SCSS に追加
- クラスがない要素 → 親コンポーネントの BEM 子要素クラスを新設
- body 継承で不要なユーティリティ（u-fw-500, u-fs-16, u-font-zen, u-text-black1）→ 削除

### Step 3: 検証
- grep で旧ユーティリティの残存確認
- npx sass assets/scss/global.scss assets/css/global.css --no-source-map
- ブラウザで PC/SP 表示確認

## 受け入れ基準
- [ ] ページ内のタイポグラフィ系ユーティリティ（u-fs-*, u-fw-*, u-text-*, u-lh-*, u-font-*, u-ls-*）が
      コンポーネント SCSS に移されている
- [ ] body 継承で不要なユーティリティが削除されている
- [ ] 残存ユーティリティがレイアウト・機能系（u-relative, u-display-sp, u-mx-auto, u-mt-* 等）のみ
- [ ] 見た目が変わっていない
- [ ] コンパイルが通る
```

---

### ページ一覧（分担割り振り用）

| # | ページ | 主な固有コンポーネント | 備考 |
|---|--------|---------------------|------|
| 1 | index.html | service, voice, column, price, shop, training-machine, dr-amazones, recruit, news-banner | Phase 1 で共通部分は完了済み |
| 2 | about/index.html | c-about__* | |
| 3 | admission/index.html | p-admission__* | |
| 4 | contact/index.html | p-contact__* | |
| 5 | faq/index.html | p-faq__* | |
| 6 | family/index.html | p-family__* | |
| 7 | information/index.html | ニュース詳細 | Phase 1 で news 系は対応済み |
| 8 | medical/index.html | p-medical__* | |
| 9 | member/index.html | p-member__* | |
| 10 | payment/index.html | p-payment__* | |
| 11 | personal/index.html | p-personal__* | |
| 12 | price/index.html | p-price__* | |
| 13 | protein/index.html | p-protein__* | |
| 14 | reservation/index.html | p-reservation__* | |
| 15 | rules/index.html | p-rules__* | |
| 16 | sportip/index.html | p-sportip__* | |
| 17 | storelist/index.html | p-storelist__* | |
| 18 | storelist/[slag]/index.html | p-storedetail__* | html font-family 上書きあり。要注意 |
| 19 | visitor/index.html | p-visitor__* | |
| 20 | point_redemption/index.html | p-point__* | |
| 21 | sitemap/index.html | — | 最小限の可能性 |
| 22 | column/index.html | c-column__* | |
| 23 | column/[slag]/index.html | コラム詳細 | |

---

## Phase 3: 最終検証（分担作業完了後）

### チケット 3-1: 全体 body 継承ユーティリティの残存確認

#### 何を
全ページの分担作業完了後、全 HTML ファイルに body 継承で不要なユーティリティが残っていないか最終確認する。

#### 受け入れ基準
- [ ] `u-fw-500` の残存が h/b/strong 要素のみ（または 0 件）
- [ ] `u-fs-16` の残存が 0 件
- [ ] `u-font-zen` の残存が storelist/[slag] 以外で 0 件
- [ ] `u-text-black1` の残存が 0 件

---

### チケット 3-2: 最終コンパイル・全ページ検証

#### 受け入れ基準
- [ ] コンパイルが成功する
- [ ] 全23ページを PC / SP でブラウザ確認
- [ ] 残存ユーティリティがレイアウト・機能系のみ

---

## ユーティリティとして残すもの（全 Phase 共通）

| ユーティリティ | 理由 |
|---------------|------|
| `u-relative`, `u-absolute` | レイアウト配置。汎用 |
| `u-z-10` | z-index 調整。汎用 |
| `u-display-sp` | レスポンシブ表示切替 |
| `u-mx-auto`, `u-mt-*`, `u-ml-*`, `u-mr-*` | マージン調整 |
| `u-popup` | JS 連携用 |
| `u-w-full` | width 調整。汎用 |
| `u-cursor-pointer` | UI 挙動。汎用 |
| `u-bg-white` | 背景色。汎用 |
| `u-text-center` | テキスト配置（コンポーネント吸収済みの箇所は削除） |

---

## 事前確認チェックリスト（Phase 0 開始前）

- [ ] 全 HTML ファイルの `<b>`, `<strong>` に `u-fw-500` が付いているか確認
- [ ] 全 HTML ファイルの `<h1>`〜`<h6>` で `u-fw-*` なしのものがないか確認
- [ ] ヘッダー・フッターの HTML が全ページで同一構造か確認
- [ ] 関連 SCSS ファイルの実際のパスを確認
