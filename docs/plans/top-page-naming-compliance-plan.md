# トップページ命名規則コーディングガイドライン準拠 Plan

## ステータス: 🟡 保留（2026-04-09）

先方フィードバックの根本原因（FB1: u-* 多用、FB2: テキストユーティリティ、FB3: 重複コンポーネント）に対する直接的な解決策ではないため、以下の作業完了後に着手する。

**先行すべき作業**:
1. Phase 2-B（残り 22 ページのタイポグラフィ吸収） — FB1/FB2 対応
2. FB3 重複コンポーネント統合（`docs/plans/feedback-duplicate-components-plan.md`）

**本 Plan の位置づけ**: 保守性向上のための中長期タスク。先方が HTML を開いて体感できる改善ではなく、内部構造の整理。実施順序は上記完了後に再評価する。

## 目的

トップページ（`index.html` / `assets/scss/object/project/_top.scss`）の命名規則を、`docs/cording-guideline.md` に完全準拠させる。

## 背景

トップページは `p-top__*` 単一ブロック構造自体はガイドライン例（`.p-top .p-top__mv .p-top__block1`）に準拠しているが、詳細調査により以下の逸脱が判明した:

1. HTML に FLOCSS プレフィクスなしクラスが混在
2. Project SCSS（`_top.scss`）内に無プレフィクス汎用クラスが多数存在（`.active` / `.animate` / `.dots` / `.thumb` 等）— グローバル汚染リスク
3. Component レイヤーに属すべきクラスが `_top.scss`（Project レイヤー）内に定義されている
4. 一部 `c-*` クラスが実質トップページ専用なのに Component プレフィクスを持っている

## 原則（本 Plan 共通）

1. **コーディングガイドライン準拠を最優先**（CLAUDE.md 最重要原則 1）
2. **見た目を絶対に崩さない**（CLAUDE.md 最重要原則 2）
3. **クロスページで使われるものは Component（`c-*`）として正しい位置に配置**する — トップページ独自の命名にしない
4. **トップページのみで使われるものは `p-top__*` に統一**する
5. **リネーム時は HTML / SCSS / JS の 3 点同時修正**（JS 参照漏れ厳禁）
6. **1 チケット = 1 機能** — スコープを膨らませない
7. **各チケット完了時にブラウザ確認を必須化**

## クロスページ使用状況（調査結果）

| クラス | 使用ページ数 | 分類 |
|--------|------------|------|
| `desktop-menu-icon` | 23 ページ（全ページ） | Component（共通ヘッダー） |
| `sp-nav-link--icon` | 23 ページ（全ページ） | **SCSS 定義なし** → デッドクラス |
| `c-text-slider` / `c-text-slider__*` | 13 ページ | Component（ただし `_top.scss` に定義されている） |
| `c-service__*` | 2 ページ（top, storelist/[slag]） | Component |
| `c-dr-amazones__*` | 2 ページ（top, point_redemption） | Component |
| `.animate` | 5 ページ | 要 Component 化 |
| `.active` | 5 ページ | 要 Component 化（JS 連動の可能性大） |
| `.dots` | 3 ページ | 要 Component 化 |
| `.thumb` | 2 ページ | 要 Component 化 |
| `c-topic-sticker` / `top-topic-sticker` | 1 ページ（top のみ） | `p-top__*` にリネーム |
| `shop-training-machine-container` | 1 ページ（top のみ） | `p-top__*` にリネーム |
| `c-hero-ribbon` / `c-hero-text-slider-container` | 1 ページ（top のみ） | `p-top__*` にリネーム |
| `news-ribbon-sp` / `news-ribbon-sp2` | 1 ページ（top のみ） | `p-top__*` にリネーム |
| `service-topic-container` | 1 ページ（top のみ） | `p-top__*` にリネーム |
| `shop-ribbon-sp` | 0 ページ（HTML 未使用） | **デッド SCSS** → 削除 |

---

## セクション分割

チケットはセクション単位で独立して進められるよう設計。各セクションは完了後にブラウザ確認してからコミットし、次のセクションに進む。

| セクション | チケット数 | 優先度 | スコープ |
|-----------|----------|-------|---------|
| [セクション 1: 事前調査](#セクション-1-事前調査) | 3 | 🔴 最優先 | JS 参照・衝突・デッドコード確認 |
| [セクション 2: デッドコード削除](#セクション-2-デッドコード削除) | 2 | 🔴 高 | リスクなし、先に片付け |
| [セクション 3: トップ専用クラスの `p-top__*` 化](#セクション-3-トップ専用クラスの-p-top-化) | 6 | 🔴 高 | `_top.scss` 内で完結 |
| [セクション 4: 無プレフィクス汎用クラスの Component 化](#セクション-4-無プレフィクス汎用クラスの-component-化) | 4 | 🔴 高 | クロスページ影響あり、慎重に |
| [セクション 5: Project 内 Component クラスの分離](#セクション-5-project-内-component-クラスの分離) | 4 | 🟡 中 | `_top.scss` からファイル切り出し |
| [セクション 6: ヘッダー・ナビ系の FLOCSS 準拠](#セクション-6-ヘッダーナビ系の-flocss-準拠) | 2 | 🟡 中 | 全 23 ページ波及 |
| [セクション 7: 最終検証](#セクション-7-最終検証) | 2 | 🔴 必須 | 全ページ回帰確認 |

---

## セクション 1: 事前調査

### チケット 1-1: JavaScript 参照調査

#### 何を

以下のクラスが JavaScript から参照されているかを全調査し、結果を本 Plan の末尾「JS 参照調査結果」セクションに追記する。

- `.active`
- `.animate`
- `.dots`
- `.thumb` / `.active-thumb`
- `.shop-training-machine-container`
- `.service-topic-container`
- `.news-ribbon-sp` / `.news-ribbon-sp2`
- `.triangle-icon`
- `c-service__*`
- `c-dr-amazones__*`
- `c-hero-ribbon` / `c-hero-text-slider-container`
- `c-topic-sticker` / `top-topic-sticker`
- `c-text-slider` / `.slide-track` / `.slide`
- `desktop-menu-icon`
- `sp-nav-link--icon`

#### なぜ

JavaScript が `querySelector('.dots')` のようにクラス名を直接参照している場合、リネーム時に JS も同時修正が必要。見落とすと挙動が壊れる。

#### 対象ファイル

- `assets/js/*.js` 全ファイル
- HTML 内のインライン `<script>` タグ

#### 検証コマンド

```bash
grep -rn "dots\|animate\|thumb\|active-thumb\|shop-training-machine-container\|service-topic-container\|news-ribbon-sp\|triangle-icon\|c-service__\|c-dr-amazones\|c-hero-ribbon\|c-topic-sticker\|top-topic-sticker\|c-text-slider\|desktop-menu-icon\|sp-nav-link--icon" assets/js/
```

#### 受け入れ基準

- [ ] 全クラスの JS 参照箇所がリストアップされている
- [ ] Plan 末尾「JS 参照調査結果」セクションに記録されている
- [ ] JS 側でリネームが必要な箇所が明示されている

---

### チケット 1-2: 無プレフィクス汎用クラスの他ページ使用状況調査

#### 何を

以下のクラスが **どのページで、どのセクションで、どういう役割で** 使われているかを調査し、Component 化の設計を決定する。

- `.active`（5 ページ）
- `.animate`（5 ページ）
- `.dots`（3 ページ）
- `.thumb`（2 ページ）

#### なぜ

これらはトップページ以外でも使われており、「トップ独自命名にしない」原則に従うと Component 化が必要。ただし他ページで別の意味で使われている可能性もあり、そのままリネームすると別ページの挙動を壊すリスクがある。

#### 対象ファイル

- 全ページの HTML
- 該当する SCSS 定義箇所

#### 検証コマンド

```bash
grep -rn 'class="[^"]*\bactive\b' --include="index.html" .
grep -rn 'class="[^"]*\banimate\b' --include="index.html" .
grep -rn 'class="[^"]*\bdots\b' --include="index.html" .
grep -rn 'class="[^"]*\bthumb\b' --include="index.html" .
```

#### 受け入れ基準

- [ ] 各クラスが使われる全コンテキストがリストアップされている
- [ ] 同じ名前で別用途に使われているケースが識別されている
- [ ] Component 名の設計案が Plan に追記されている（例: `c-carousel__dot`, `c-reveal--animate`, `c-thumb-btn`）

---

### チケット 1-3: 先方合意範囲の確認

#### 何を

トップページ 2026-04-07 先方合意の範囲を確認する。本 Plan の命名規則修正が合意範囲内か範囲外かを判断する。

#### なぜ

合意済みのトップページに追加修正を入れる場合、先方への再報告が必要か確認が必要。「見た目を崩さない」限り内部整理は合意範囲内と解釈できるが、明示確認が望ましい。

#### 対象ファイル

- `docs/plans/feedback-improvement-context.md`
- 先方合意時の共有資料（あれば）

#### 受け入れ基準

- [ ] 合意範囲が明文化されている
- [ ] 本 Plan の修正が合意範囲内か否かの判定が記録されている
- [ ] 範囲外の場合、先方再報告のタイミングが決まっている

---

## セクション 2: デッドコード削除

### チケット 2-1: `sp-nav-link--icon` クラスの削除

#### 何を

HTML から `sp-nav-link--icon` クラスを削除する。

#### なぜ

SCSS 定義が存在しないデッドクラス。全 23 ページで `class="l-sp-nav__link sp-nav-link--icon"` の形で使われているが、スタイルが当たっていない。放置すると「このクラスは何？」という混乱を生む。

#### 対象ファイル

- 全 23 ページの `index.html`（`index.html`, `about/index.html`, ... 全ページ）

#### 検証コマンド

```bash
# 削除前確認
grep -rn 'sp-nav-link--icon' --include="index.html" . | wc -l

# SCSS 定義がないことの再確認
grep -rn 'sp-nav-link--icon' assets/scss/

# 削除後確認
grep -rn 'sp-nav-link--icon' --include="index.html" .  # → 0 件であること
```

#### 受け入れ基準

- [ ] 全ページから `sp-nav-link--icon` が削除されている
- [ ] ブラウザ確認で SP ナビの SNS アイコンが崩れていない
- [ ] `l-sp-nav__link` クラスは残っている（これは正しい Layout クラス）

---

### チケット 2-2: `.shop-ribbon-sp` デッド SCSS の削除

#### 何を

`assets/scss/object/project/_top.scss:775` 周辺の `.shop-ribbon-sp` 定義を削除する。

#### なぜ

HTML で使用されておらず、SCSS 定義のみ残っているデッドコード。

#### 対象ファイル

- `assets/scss/object/project/_top.scss`

#### 検証コマンド

```bash
# HTML で未使用であることの確認
grep -rn 'shop-ribbon-sp' --include="index.html" .  # → 0 件

# SCSS 定義削除後
grep -rn 'shop-ribbon-sp' assets/scss/  # → 0 件
```

#### 受け入れ基準

- [ ] `.shop-ribbon-sp` の SCSS 定義が削除されている
- [ ] SCSS がコンパイルエラーなく通る
- [ ] ブラウザ確認で影響なし

---

## セクション 3: トップ専用クラスの `p-top__*` 化

### チケット 3-1: `c-hero-ribbon` / `c-hero-text-slider-container` を `p-top__*` 化

#### 何を

以下をリネーム:
- `.c-hero-ribbon` → `.p-top__hero-ribbon`
- `.c-hero-text-slider-container` → `.p-top__hero-text-slider-container`

#### なぜ

トップページでのみ使用されているため、`c-*`（Component）ではなく `p-top__*`（Project）が適切。ガイドラインの FLOCSS 階層原則に準拠。

#### 対象ファイル

- `index.html`
- `assets/scss/object/project/_top.scss:53-60, 91`
- JS ファイル（チケット 1-1 の調査結果次第）

#### 検証コマンド

```bash
grep -rn 'c-hero-ribbon\|c-hero-text-slider-container' .
```

#### 受け入れ基準

- [ ] HTML / SCSS / JS の全参照がリネームされている
- [ ] ブラウザでトップのヒーローセクション表示に変化なし
- [ ] グローバル検索で旧クラス名が 0 件

---

### チケット 3-2: `c-topic-sticker` / `top-topic-sticker` を `p-top__*` 化

#### 何を

以下をリネーム:
- `.c-topic-sticker` → `.p-top__topic-sticker`
- `.top-topic-sticker`（HTML 側のみ存在、`c-topic-sticker` とペア）→ 削除 or モディファイア化

#### なぜ

`c-topic-sticker` はトップ 1 ページのみ使用。`top-topic-sticker` は無プレフィクスで FLOCSS 違反かつ、すぐ隣に `c-topic-sticker` があるため重複気味。

#### 対象ファイル

- `index.html:937`
- `assets/scss/object/component/_slider.scss:272, 289, 292`（要確認: トップ専用なのに component にある）
- JS ファイル（要確認）

#### 注意

`_slider.scss` に定義があるということは Slider Component の一部として扱われている可能性がある。`_slider.scss` を読んで、`.top-topic-sticker` が Slider の派生要素か独立要素か確認してから進める。

#### 受け入れ基準

- [ ] `c-topic-sticker` / `top-topic-sticker` の使い分けが整理されている
- [ ] トップページ専用であることを命名で明示
- [ ] ブラウザで表示変化なし

---

### チケット 3-3: `shop-training-machine-container` を `p-top__*` 化

#### 何を

`.shop-training-machine-container` → `.p-top__shop-training-machine-container` にリネーム。

#### なぜ

トップページのみで使用されている背景画像コンテナ。無プレフィクス＋トップ専用のため `p-top__*` が正しい。

#### 注意

既存の `.p-top__training-machine-container`（`_top.scss:846`）とは別物（背景画像コンテナ vs コンテンツコンテナ）。チケット 1-1 調査で実体を確認してから命名を決定する。衝突を避けるため `p-top__shop-training-machine` のような別名も検討。

#### 対象ファイル

- `index.html:999`
- `assets/scss/object/project/_top.scss:502`

#### 受け入れ基準

- [ ] 新旧クラスの役割が整理されている
- [ ] リネーム後に背景画像が正しく表示される
- [ ] `_top.scss:846` との衝突がないことを確認

---

### チケット 3-4: `service-topic-container` を `p-top__*` 化

#### 何を

`.service-topic-container` → `.p-top__service-topic-container` にリネーム。

#### なぜ

トップページのみで使用。無プレフィクスのためガイドライン違反。

#### 対象ファイル

- `index.html`（要確認）
- `assets/scss/object/project/_top.scss:507`

#### 受け入れ基準

- [ ] HTML / SCSS 両方リネーム
- [ ] ブラウザ確認で変化なし

---

### チケット 3-5: `news-ribbon-sp` / `news-ribbon-sp2` を `p-top__*` 化

#### 何を

- `.news-ribbon-sp` → `.p-top__news-ribbon-sp`
- `.news-ribbon-sp2` → `.p-top__news-ribbon-sp2`

#### なぜ

トップページのみで使用。既に `.p-top__news-ribbon-desk` / `-desk2` があるため、SP 側も同じ命名体系に揃える。

#### 対象ファイル

- `index.html`
- `assets/scss/object/project/_top.scss:309, 314`

#### 受け入れ基準

- [ ] 命名が `desk` / `sp` で統一された
- [ ] SP 表示で news ribbon が正しく表示される

---

### チケット 3-6: `.dots` / `.active` / `.animate` / `.thumb` の暫定 `p-top__*` 化 or 保留判断

#### 何を

チケット 1-2 の調査結果を踏まえ、以下を判断:
- 他ページと同じ用途で使われている → セクション 4 で Component 化
- 他ページと別用途 or トップだけで使われている部分がある → `p-top__*` にリネーム
- JS 連動で軽率にリネームできない → 保留、別チケット化

#### 対象ファイル

- `index.html`
- `assets/scss/object/project/_top.scss:32-47, 1157-1164`
- JS ファイル

#### 受け入れ基準

- [ ] 各クラスについて「Component 化」or「`p-top__*` 化」or「保留」が決定されている
- [ ] 決定が本 Plan に記録されている
- [ ] ブラウザ・カルーセル動作に影響なし

---

## セクション 4: 無プレフィクス汎用クラスの Component 化

### チケット 4-1: `.animate` の Component 化

#### 何を

`.animate`（アニメーションユーティリティ）を Component または Utility として正しく命名する。

#### なぜ

5 ページで使用される共通機能。無プレフィクスのためガイドライン違反。`.animate` という汎用名は命名衝突のリスクも高い。

#### 候補

- `c-reveal--animate`（既存 `c-reveal` の拡張）
- `u-animate-in`（Utility として扱う）
- 独自 Component 新設

#### 対象ファイル

- 全 5 ページ（チケット 1-2 で特定）
- 該当する SCSS 定義

#### 注意

`c-reveal` という既存の Component があり、アニメーション関連のクラスが既に存在する可能性がある。調査してから新規作成するか既存拡張するかを判断。

#### 受け入れ基準

- [ ] FLOCSS プレフィクス付きの名前にリネームされている
- [ ] 5 ページ全てで動作確認済み
- [ ] JS 側の参照もリネームされている

---

### チケット 4-2: `.active` の整理

#### 何を

`.active`（状態クラス）を FLOCSS 準拠の命名に変更する。

#### なぜ

5 ページで使用。極めて汎用的な名前で、グローバル汚染の最大リスク源。

#### 候補

- `is-active`（State クラスプレフィクス、FLOCSS 拡張）
- `js-active`（JS 連動明示）
- 文脈に応じて `c-*__item--active` のように BEM モディファイア化

#### 注意

- **JS 連動の可能性が極めて高い**（カルーセル・タブ・アコーディオン等）。チケット 1-1 の調査結果必須
- 同名クラスが複数の Component で使われている場合、それぞれの文脈に応じて個別リネームが必要になる可能性

#### 受け入れ基準

- [ ] 全使用箇所の文脈が整理されている
- [ ] 文脈ごとに適切な命名に変更されている
- [ ] JS 側も同期してリネームされている
- [ ] 全該当ページで動作確認済み

---

### チケット 4-3: `.dots` の Component 化

#### 何を

`.dots`（カルーセルドット）を Component 化する。

#### なぜ

3 ページで使用。カルーセル UI の一部。

#### 候補

- `c-carousel__dots` / `c-carousel__dot`
- `c-slider-dots`

#### 対象ファイル

- 全 3 ページ
- `assets/scss/object/project/_top.scss:32-47`（他ページの SCSS 定義も要確認）

#### 受け入れ基準

- [ ] BEM 準拠の Component 名に統一
- [ ] 3 ページ全てで動作確認済み
- [ ] JS 側（カルーセルライブラリ or 独自実装）の参照も更新

---

### チケット 4-4: `.thumb` / `.active-thumb` の Component 化

#### 何を

`.thumb` / `.thumb:hover` / `.thumb.active-thumb`（動画サムネイルボタン）を Component 化する。

#### なぜ

2 ページで使用。動画選択 UI の一部。`.thumb` は極めて汎用的で衝突リスク大。

#### 候補

- `c-thumb-btn` / `c-thumb-btn--active`
- `c-video-thumb` / `c-video-thumb--active`

#### 対象ファイル

- 2 ページ
- `assets/scss/object/project/_top.scss:1157-1164`

#### 受け入れ基準

- [ ] BEM 準拠の Component 名
- [ ] 2 ページ全てで動作確認済み
- [ ] JS（動画切り替え処理）の参照も更新

---

## セクション 5: Project 内 Component クラスの分離

### チケット 5-1: `c-text-slider` を独立ファイルに分離

#### 何を

`_top.scss:468-495` の `.c-text-slider` / `.c-text-slider__slide-text` / `.slide-track` / `.slide` を `assets/scss/object/component/_text-slider.scss` に切り出す。

#### なぜ

13 ページで使用される真の Component。Project ファイル（`_top.scss`）に居るのは FLOCSS 階層違反。

#### 注意

`.slide-track` / `.slide` は無プレフィクス。これらも Component 化の対象:
- `.slide-track` → `.c-text-slider__track`
- `.slide` → `.c-text-slider__slide`

ただしカルーセルライブラリ（Slick / Swiper 等）が生成するクラスの可能性もあり、その場合はライブラリ上書きなので `_jsutil.scss` に移動すべき。要調査。

#### 対象ファイル

- `assets/scss/object/component/_text-slider.scss`（新規）
- `assets/scss/object/project/_top.scss:468-495`（削除）
- `assets/scss/global.scss`（import 追加）
- 13 ページの HTML（`.slide-track` / `.slide` リネームの場合）

#### 受け入れ基準

- [ ] `_text-slider.scss` が新規作成され、クラスが移動されている
- [ ] `_top.scss` から該当クラスが削除されている
- [ ] 13 ページ全てで動作確認済み
- [ ] ライブラリ由来クラスは `_jsutil.scss` に分離されている

---

### チケット 5-2: `c-service__*` を独立ファイルに分離

#### 何を

`_top.scss:514-655` の `.c-service__*` 系クラス全て（約 15 クラス）を `assets/scss/object/component/_service.scss` に切り出す。

#### なぜ

2 ページ（top, storelist/[slag]）で使用される Component。Project ファイルに居るのは階層違反。

#### 対象クラス

`.c-service__section`, `.c-service__container`, `.c-service__section-title`, `.c-service__subtitle`, `.c-service__title`, `.c-service__desc`, `.c-service__content`, `.c-service__wrapper`, `.c-service__wrapper2`, `.c-service__wrapper3`, `.c-service__img`, `.c-service__img-wrapper`, `.c-service__ribbon`, `.c-service__container-sp`

#### 対象ファイル

- `assets/scss/object/component/_service.scss`（新規）
- `assets/scss/object/project/_top.scss:514-655`（削除）
- `assets/scss/global.scss`（import 追加）

#### 注意

- `.c-service__wrapper2` / `wrapper3` という命名はガイドライン違反の兆候（意味のある Modifier に変えるべき）。ただし本チケットではファイル移動のみに限定し、命名整理は別チケット化
- セレクタ深さ 2 階層ルール違反が含まれている可能性（例: `.c-service__section .c-service__content`）。要確認、違反していれば SCSS ネスト構造の見直し

#### 受け入れ基準

- [ ] `_service.scss` 新規作成、全クラス移動
- [ ] top / storelist[slag] 両ページで表示確認済み
- [ ] セレクタ深さ違反が解消されている

---

### チケット 5-3: `c-dr-amazones__*` を独立ファイルに分離

#### 何を

`_top.scss:719-770` の `.c-dr-amazones__*` 系クラス全てを `assets/scss/object/component/_dr-amazones.scss` に切り出す。

#### なぜ

2 ページ（top, point_redemption）で使用される Component。

#### 対象クラス

`.c-dr-amazones__container`, `.c-dr-amazones__section`, `.c-dr-amazones__inner`, `.c-dr-amazones__header`, `.c-dr-amazones__header-text`, `.c-dr-amazones__body`, `.c-dr-amazones__title`, `.c-dr-amazones__desc`

#### 注意

`_top.scss:770` の `.c-dr-amazones__section .triangle-icon` は、`.triangle-icon` が無プレフィクス。これも `.c-dr-amazones__triangle` のようにリネームする。

#### 対象ファイル

- `assets/scss/object/component/_dr-amazones.scss`（新規）
- `assets/scss/object/project/_top.scss:719-770`（削除）
- `assets/scss/global.scss`（import 追加）
- `index.html` / `point_redemption/index.html`（`.triangle-icon` リネームの場合）

#### 受け入れ基準

- [ ] ファイル分離完了
- [ ] `.triangle-icon` がプレフィクス付きに統一
- [ ] top / point_redemption 両ページで確認済み

---

### チケット 5-4: `.news-c-footer-banner__sticker1` の整理

#### 何を

`_top.scss:240` の `.news-c-footer-banner__sticker1` を正しい命名に修正する。

#### なぜ

「news」「c-」「footer」が混ざった奇妙な命名。`_top.scss` に定義されているがクラス名には `footer-banner` が入っており、どこの何を指しているか不明。

#### 調査必須

- このクラスが HTML で実際に使われているか
- 他に類似クラスがないか
- 隣接する `.p-top__news-banner-sticker1` との関係

#### 対象ファイル

- `assets/scss/object/project/_top.scss:240`
- `index.html`

#### 受け入れ基準

- [ ] クラスの実体が明確になっている
- [ ] 適切な命名（`p-top__news-banner-sticker1` 統合 or 独立 Component 化）に修正
- [ ] 表示に影響なし

---

## セクション 6: ヘッダー・ナビ系の FLOCSS 準拠

### チケット 6-1: `desktop-menu-icon` の Component 化

#### 何を

`desktop-menu-icon` を FLOCSS 準拠の命名に変更する。

#### なぜ

全 23 ページで使用される共通ヘッダー要素。無プレフィクスのためガイドライン違反。

#### 候補

- `c-menu-icon--desktop`（Component + Modifier）
- `l-header__menu-icon--desktop`（Layout の子要素として）

#### 推奨

ヘッダーの一部なので `l-header__menu-icon` が最適。ただし SCSS 定義は既に `_header.scss:493` 配下にあるので、Layout 命名が自然。

#### 対象ファイル

- 全 23 ページの HTML
- `assets/scss/layout/_header.scss:493`
- `assets/scss/layout/_footer.scss:94`（参照あり）

#### 注意

全ページ波及の大規模リネーム。1 箇所の漏れでヘッダーが崩れる。

#### 受け入れ基準

- [ ] 全 23 ページでリネーム完了
- [ ] 全ページで PC 表示時のヘッダー確認済み
- [ ] SP 表示には影響しないことを確認

---

### チケット 6-2: ヘッダー周辺の他の無プレフィクスクラス一斉調査

#### 何を

`_header.scss` / `_footer.scss` / SP ナビ関連 SCSS を全文読み、無プレフィクスクラスが他にないか調査する。

#### なぜ

チケット 6-1 と同時に他の違反も洗い出すことで、ヘッダー関連のガイドライン準拠を一度で完了させる。

#### 対象ファイル

- `assets/scss/layout/_header.scss`
- `assets/scss/layout/_footer.scss`
- SP ナビ関連（`l-sp-nav` 等）

#### 受け入れ基準

- [ ] 無プレフィクスクラスの一覧が作成されている
- [ ] 各クラスについて「Component 化」or「Layout 化」or「削除」の方針が決まっている
- [ ] 必要に応じて追加チケットが本 Plan に追記されている

---

## セクション 7: 最終検証

### チケット 7-1: 全ページ回帰確認

#### 何を

全 23 ページをブラウザで PC / SP 両方確認し、見た目に影響がないことを確認する。

#### 確認ポイント

- ヘッダー（desktop menu icon 等）
- フッター
- 各ページ固有のセクション
- カルーセル・スライダー動作
- 動画サムネイル切り替え
- アコーディオン・タブ等の状態切り替え（`.active` 関連）

#### 受け入れ基準

- [ ] 全 23 ページ × PC/SP で目視確認完了
- [ ] スクリーンショット比較（可能なら）
- [ ] JavaScript コンソールエラーなし

---

### チケット 7-2: Grep による最終違反チェック

#### 何を

以下のコマンドで FLOCSS 違反がないことを確認する。

```bash
# HTML に無プレフィクスクラスが残っていないか
grep -rnhoE 'class="[^"]*"' --include="index.html" . \
  | grep -oE '[a-zA-Z][a-zA-Z0-9_-]*' \
  | grep -vE '^(p-|c-|l-|u-|js-|is-)' \
  | sort -u

# SCSS に無プレフィクスクラス定義が残っていないか
grep -rnE '^\.[a-z]' assets/scss/object/ \
  | grep -vE '\.(p-|c-|l-|u-|js-|is-)'
```

#### 受け入れ基準

- [ ] HTML の無プレフィクスクラスが許可リスト以外 0 件
- [ ] SCSS の無プレフィクスクラス定義が許可リスト以外 0 件
- [ ] 許可リスト（`is-*` 等の例外）が明文化されている

---

## JS 参照調査結果

_※ チケット 1-1 完了時に記入_

| クラス | JS 参照箇所 | 備考 |
|--------|-----------|------|
| `.active` | _未調査_ | |
| `.animate` | _未調査_ | |
| `.dots` | _未調査_ | |
| `.thumb` / `.active-thumb` | _未調査_ | |
| ... | | |

---

## 他ページ使用状況調査結果（`.active` / `.animate` / `.dots` / `.thumb`）

_※ チケット 1-2 完了時に記入_

---

## 進め方

1. **セクション 1 から順番に実施**。各セクション完了時に本 Plan にチェックを入れる
2. **1 チケット完了ごとにブラウザ確認 → コミット**（巻き戻しやすくするため）
3. **セクション完了時に区切りの中間報告**
4. **セクション間で判断が必要な場合は人間に確認**
5. **本 Plan の「調査結果」セクションは実施しながら随時更新**

## リスク管理

| リスク | 対策 |
|--------|------|
| JS 参照漏れによる機能破壊 | チケット 1-1 で事前調査必須 |
| クロスページ影響による他ページ崩れ | チケット 1-2 で事前調査、全ページ動作確認 |
| リネーム漏れによるスタイル外れ | 検証コマンドで 0 件確認必須 |
| 先方合意範囲外の修正 | チケット 1-3 で範囲確認 |
| カルーセル・アニメーション動作破壊 | セクション完了時に動作確認必須 |

## 参考

- `docs/cording-guideline.md` — コーディングガイドライン
- `CLAUDE.md` — プロジェクト原則（最重要原則 1: ガイドライン準拠最優先）
- `docs/plans/feedback-improvement-context.md` — 先方フィードバック
