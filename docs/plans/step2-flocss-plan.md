# Step 2 実行計画: FLOCSS ディレクトリ構成への分離

作成日: 2026-03-29
紐づき: `css-refactoring-plan.md` Step 2
準拠元: `cording-guideline.md`

---

## 目的

10,720行の巨大な `_global.scss` を FLOCSS ディレクトリ構成に分離し、保守性を向上させる。
既存のページ別SCSSファイル（`_top.scss`, `_about.scss` 等）は `object/project/` に移動する。

---

## 最重要原則（再掲）

**フロントエンドの表示結果は一切変更しないこと。**
ファイル分離と `style.scss` のインポート順変更のみを行い、CSSルールの追加・削除・変更は一切行わない。

---

## 前提条件

- Step 1（変数定義の整備）が完了済み
- `:root` に追加カラー変数・フォントサイズ変数が定義済み（_global.scss 1〜81行目）

---

## 現状分析

### 現在のディレクトリ構成

```
assets/scss/
  style.scss              (34行 - メインインポート)
  _global.scss            (10,720行 - 変数・ユーティリティ・コンポーネント・レスポンシブ全混在)
  _top.scss               (1,286行)
  _about.scss             (271行)
  _admission.scss         (456行)
  _column.scss            (37行)
  _column-slag.scss       (346行)
  _contact.scss           (408行)
  _family.scss            (313行)
  _faq.scss               (146行)
  _information.scss       (14行)
  _medical.scss           (1,242行)
  _member.scss            (172行)
  _payment.scss           (556行)
  _personal.scss          (760行)
  _point_redemption.scss  (485行)
  _price.scss             (681行)
  _protein.scss           (1,149行)
  _reservation.scss       (1,001行)
  _rules.scss             (50行)
  _sitemap.scss           (244行)
  _sportip.scss           (801行)
  _storedetail.scss       (2,028行)
  _storedetail-introduction.scss (11,330行)
  _storedetail-review.scss (空ファイル)
  _storelist.scss         (437行)
  _visitor.scss           (578行)
```

### `_global.scss` のセクション構成（実測値）

| 行範囲 | セクション | 移動先 |
|--------|-----------|--------|
| 1〜4 | Google Fonts インポート + コメント | `foundation/_variables.scss` |
| 5〜81 | `:root` 変数定義（カラー・フォントサイズ・フォント） | `foundation/_variables.scss` |
| 82〜113 | html/body/main リセット、基本タイポグラフィ | `foundation/_reset.scss` |
| 114〜5337 | ユーティリティクラス群（END GENERAL UTILITIES まで） | `object/utility/` 各ファイル |
| 5338〜5471 | BUTTONS | `object/component/_btn.scss` |
| 5472〜5601 | HOVER / SCROLL ANIMATIONS | `object/component/_animation.scss` |
| 5603〜5661 | SPEECH BUBBLE AND STICKER | `object/component/_speech-bubble.scss` |
| 5663〜5694 | RIBBONS | `object/component/_ribbon.scss` |
| 5696〜5732 | MAXWIDTH AND BREADCRUMBS | `layout/_container.scss` |
| 5734〜5797 | TEXT SLIDER | `object/component/_slider.scss` |
| 5799〜6062 | CARDS SLIDER | `object/component/_slider.scss` に統合 |
| 6064〜6242 | RECRUIT BANNER | `object/component/_banner.scss` |
| 6244〜6249 | STICKER BANNER（空セクション） | `object/component/_banner.scss` に統合 |
| 6250〜6478 | banner-section, ribbon-banner, p-banner 等 | `object/component/_banner.scss` に統合 |
| 6479〜6506 | SECTION HEADER TEXT | `object/component/_section.scss` |
| 6507〜7042 | HEADER CSS GLOBAL | `layout/_header.scss` |
| 7043〜7509 | FOOTER SECTION（floating-menu, nav-menu-popup, footer） | `layout/_footer.scss` |
| 7510〜7742 | FOOTER BANNER W/ SPEECH BUBBLES | `object/component/_footer-banner.scss` |
| 7743〜8206 | HERO ANIMATION | `object/component/_hero.scss` |
| 8207〜8296 | ANNOUNCEMENT SECTION | `object/component/_announcement.scss` |
| 8297〜8300 | END ANNOUNCEMENT（コメントのみ） | 不要 |
| 8301〜8380 | END NOTE SECTION | `object/component/_endnote.scss` |
| 8381〜8388 | GLOBAL UTILITYS（空セクション） | 不要 |
| 8389〜8439 | Cookie通知 | `object/component/_cookie.scss` |
| 8440〜10720 | GLOBAL RESPONSIVE STYLES + 追加ユーティリティ | 各移動先ファイル内に統合 |

---

## ユーティリティクラスの詳細分割（114〜5337行）

| 行範囲（概算） | 内容 | 移動先 |
|---------------|------|--------|
| 114〜230 | 🎨 COLOR UTILITIES（bg-*, text-* 色系） | `object/utility/_color.scss` |
| 231〜340 | フォントファミリ、レタースペーシング、テキスト配置 | `object/utility/_typography.scss` |
| 341〜500 | display 系（block, flex, hidden, display-sp等） | `object/utility/_display.scss` |
| 501〜837 | position, overflow, cursor, box-sizing 等 | `object/utility/_layout.scss` |
| 838〜1600 | FONT SIZE, FONT WEIGHT, LINE HEIGHT, LETTER SPACING | `object/utility/_typography.scss` に統合 |
| 1601〜2400 | WIDTH, HEIGHT, MARGIN, PADDING | `object/utility/_space.scss` |
| 2401〜3200 | grid, flex-row, items-center, gap 等 | `object/utility/_layout.scss` に統合 |
| 3201〜4200 | radius, z-index, border 等 | `object/utility/_border.scss` |
| 4201〜5100 | レスポンシブユーティリティ（lg-*, sm-*） | 各ユーティリティファイルに統合 |
| 5101〜5337 | col-*, display-sp/desk, その他残り | `object/utility/_layout.scss` / `_display.scss` |

**注意**: 上記行範囲は概算値。実作業では各セクションコメントを目印にして正確な境界で分割する。

---

## レスポンシブ部分（8440〜10720行）の扱い

### 方針

レスポンシブスタイルは **対象コンポーネントのファイル内に統合** する。

例: ヘッダーのレスポンシブスタイル → `layout/_header.scss` の末尾に移動

### 詳細マッピング

レスポンシブ部分の内容を読み解き、各メディアクエリ内のルールがどのコンポーネントに属するかを判別して移動する。
この部分は実作業時に1ブロックずつ確認しながら振り分ける。

**原則**: 同じコンポーネントのベーススタイルとレスポンシブスタイルは同じファイルに置く。

---

## 作成するディレクトリとファイル

### 新規ディレクトリ

```
assets/scss/
  foundation/
  layout/
  object/
    component/
    project/
    utility/
```

### 新規ファイル一覧

#### foundation/

| ファイル | 内容 | 元行範囲 |
|---------|------|---------|
| `_variables.scss` | Google Fonts インポート + `:root` 変数定義 | 1〜81 |
| `_reset.scss` | html/body/main リセット、基本タイポグラフィ | 82〜113 |

#### layout/

| ファイル | 内容 | 元行範囲 |
|---------|------|---------|
| `_container.scss` | `.c-maxWidth`, `.c-breadcrumb` 等 | 5696〜5732 |
| `_header.scss` | `.l-header`, `.header-btn`, floating menu, ハンバーガー等 | 6507〜7042 |
| `_footer.scss` | floating-menu, nav-menu-popup, footer 等 | 7043〜7509 |

#### object/component/

| ファイル | 内容 | 元行範囲 |
|---------|------|---------|
| `_btn.scss` | `.header-btn:hover`, `.btn-light-blue` 等 | 5338〜5471 |
| `_animation.scss` | `.reveal`, `.c-animation-jump`, hover アニメーション | 5472〜5601 |
| `_speech-bubble.scss` | `.speech-bubble`, swing/jump keyframes | 5603〜5661 |
| `_ribbon.scss` | `.hero-ribbon`, clipRevealRight | 5663〜5694 |
| `_slider.scss` | text-slider + cards-slider（topic-container 等） | 5734〜6062 |
| `_banner.scss` | recruit-banner, sticker-banner, p-banner, ribbon-banner 等 | 6064〜6478 |
| `_section.scss` | `.section-header-wrapper`, `.section-header-text` 等 | 6479〜6506 |
| `_footer-banner.scss` | `.c-footer-banner` 全体 | 7510〜7742 |
| `_hero.scss` | `.c-hero-slider`, `.c-hero-animate`, hero アニメーション | 7743〜8206 |
| `_announcement.scss` | `.c-announcement_*` スタイル | 8207〜8296 |
| `_endnote.scss` | `.c-endNote_*` スタイル | 8301〜8380 |
| `_cookie.scss` | `.cookie-notice` 関連 | 8389〜8439 |

#### object/project/

既存ページ別ファイルを移動（内容変更なし）:

| 移動元 | 移動先 |
|--------|--------|
| `_top.scss` | `object/project/_top.scss` |
| `_about.scss` | `object/project/_about.scss` |
| `_admission.scss` | `object/project/_admission.scss` |
| `_column.scss` | `object/project/_column.scss` |
| `_column-slag.scss` | `object/project/_column-slag.scss` |
| `_contact.scss` | `object/project/_contact.scss` |
| `_family.scss` | `object/project/_family.scss` |
| `_faq.scss` | `object/project/_faq.scss` |
| `_information.scss` | `object/project/_information.scss` |
| `_medical.scss` | `object/project/_medical.scss` |
| `_member.scss` | `object/project/_member.scss` |
| `_payment.scss` | `object/project/_payment.scss` |
| `_personal.scss` | `object/project/_personal.scss` |
| `_point_redemption.scss` | `object/project/_point_redemption.scss` |
| `_price.scss` | `object/project/_price.scss` |
| `_protein.scss` | `object/project/_protein.scss` |
| `_reservation.scss` | `object/project/_reservation.scss` |
| `_rules.scss` | `object/project/_rules.scss` |
| `_sitemap.scss` | `object/project/_sitemap.scss` |
| `_sportip.scss` | `object/project/_sportip.scss` |
| `_storedetail.scss` | `object/project/_storedetail.scss` |
| `_storedetail-introduction.scss` | `object/project/_storedetail-introduction.scss` |
| `_storedetail-review.scss` | `object/project/_storedetail-review.scss` |
| `_storelist.scss` | `object/project/_storelist.scss` |
| `_visitor.scss` | `object/project/_visitor.scss` |

#### object/utility/

| ファイル | 内容 |
|---------|------|
| `_color.scss` | `.bg-*`, `.text-*`（色系） |
| `_display.scss` | `.block`, `.flex`, `.hidden`, `.display-sp`, `.display-desk` 等 |
| `_typography.scss` | `.fs-*`, `.fw-*`, `.lh-*`, `.ls-*`, `.font-*`, `.text-center` 等 |
| `_space.scss` | `.m-*`, `.mt-*`, `.p-*`, `.pt-*`, `.px-*`, `.py-*` 等 |
| `_layout.scss` | `.flex-row`, `.items-center`, `.gap-*`, `.grid-cols-*`, `.col-*`, `.relative`, `.absolute` 等 |
| `_border.scss` | `.radius-*`, `.z-*`, `.border-*` 等 |

---

## `style.scss` の更新後の形

```scss
// ============================================
//  Amazones メインスタイルシート
// ============================================

// Foundation
@use "foundation/variables";
@use "foundation/reset";

// Layout
@use "layout/container";
@use "layout/header";
@use "layout/footer";

// Object - Component
@use "object/component/btn";
@use "object/component/animation";
@use "object/component/speech-bubble";
@use "object/component/ribbon";
@use "object/component/slider";
@use "object/component/banner";
@use "object/component/section";
@use "object/component/footer-banner";
@use "object/component/hero";
@use "object/component/announcement";
@use "object/component/endnote";
@use "object/component/cookie";

// Object - Project
@use "object/project/top";
@use "object/project/about";
@use "object/project/admission";
@use "object/project/column";
@use "object/project/column-slag";
@use "object/project/contact";
@use "object/project/family";
@use "object/project/faq";
@use "object/project/information";
@use "object/project/medical";
@use "object/project/member";
@use "object/project/payment";
@use "object/project/personal";
@use "object/project/point_redemption";
@use "object/project/price";
@use "object/project/protein";
@use "object/project/reservation";
@use "object/project/rules";
@use "object/project/sitemap";
@use "object/project/sportip";
@use "object/project/storedetail";
@use "object/project/storedetail-introduction";
@use "object/project/storedetail-review";
@use "object/project/storelist";
@use "object/project/visitor";

// Object - Utility（最後にインポート＝最高の詳細度順位）
@use "object/utility/color";
@use "object/utility/display";
@use "object/utility/typography";
@use "object/utility/space";
@use "object/utility/layout";
@use "object/utility/border";
```

### `@import` vs `@use` の判断

- Dart Sass では `@import` は非推奨（将来削除予定）
- ただし、`_global.scss` は `:root` 変数（CSS カスタムプロパティ）を使用しており、SCSS変数（`$var`）は使っていない
- CSS カスタムプロパティはグローバルスコープなので `@use` でもスコープ問題は発生しない
- **`@use` を使用する**（ただし、既存のページ別SCSSが `@import` 前提の SCSS変数を使っている場合は `@import` のままにする）

**確認事項**: 実作業前に全ページSCSSで SCSS変数（`$`付き変数）が使われているか確認する。使われていなければ全面 `@use` 化。使われている場合は `@import` を維持。

---

## 実行手順

### Phase A: ディレクトリ作成（リスク: なし）

1. `assets/scss/foundation/` 作成
2. `assets/scss/layout/` 作成
3. `assets/scss/object/component/` 作成
4. `assets/scss/object/project/` 作成
5. `assets/scss/object/utility/` 作成

### Phase B: ページ別SCSSの移動（リスク: 低）

1. 既存の `_top.scss` 〜 `_visitor.scss`（25ファイル）を `object/project/` に移動
2. `style.scss` のインポートパスを更新
3. **SCSSコンパイル → CSS差分比較で出力が同一であることを確認**

### Phase C: `_global.scss` の Foundation 分離（リスク: 低）

1. 1〜81行目 → `foundation/_variables.scss` にコピー
2. 82〜113行目 → `foundation/_reset.scss` にコピー
3. `style.scss` にインポートを追加
4. `_global.scss` から該当行を削除
5. **SCSSコンパイル → CSS差分比較**

### Phase D: `_global.scss` の Utility 分離（リスク: 中）

**ユーティリティ部分が最大（約5,200行）で、境界の判断が最も重要**

1. セクションコメントを目印に各ユーティリティカテゴリを切り出す
2. 1カテゴリずつ:
   - 該当範囲をユーティリティファイルにコピー
   - `_global.scss` から該当範囲を削除
   - SCSSコンパイル → CSS差分比較
3. レスポンシブユーティリティ（`lg-*`, `sm-*` 等）も対応するユーティリティファイルに統合

### Phase E: `_global.scss` の Component 分離（リスク: 中）

1. セクションコメントの境界に従い、1セクションずつ:
   - 該当範囲をコンポーネントファイルにコピー
   - `_global.scss` から該当範囲を削除
   - SCSSコンパイル → CSS差分比較
2. 順序: btn → animation → speech-bubble → ribbon → slider → banner → section

### Phase F: `_global.scss` の Layout 分離（リスク: 中）

1. container（5696〜5732）→ `layout/_container.scss`
2. header（6507〜7042）→ `layout/_header.scss`
3. footer（7043〜7509）→ `layout/_footer.scss`
4. 各移動後に SCSSコンパイル → CSS差分比較

### Phase G: 残りのセクション分離（リスク: 中）

1. footer-banner → `object/component/_footer-banner.scss`
2. hero → `object/component/_hero.scss`
3. announcement → `object/component/_announcement.scss`
4. endnote → `object/component/_endnote.scss`
5. cookie → `object/component/_cookie.scss`

### Phase H: レスポンシブ部分の振り分け（リスク: 高）

**最もリスクが高い工程。メディアクエリ内のルールを正しいファイルに分配する必要がある。**

1. 8440行目以降のメディアクエリを1ブロックずつ読み解く
2. 各ルールがどのコンポーネント/レイアウト/ユーティリティに属するか判別
3. 対応するファイルの末尾に移動
4. **1ブロック移動ごとに SCSSコンパイル → CSS差分比較**

### Phase I: `_global.scss` の削除と最終確認

1. `_global.scss` が空（または不要コメントのみ）になったことを確認
2. `_global.scss` を削除
3. `style.scss` から `@import "global"` / `@use "global"` を削除
4. **最終 SCSSコンパイル → 全ページのCSS差分比較**
5. ブラウザで主要ページ（トップ、店舗詳細、about、medical、storelist）を確認

---

## リスク評価と対策

| リスク | 影響 | 対策 |
|--------|------|------|
| インポート順序の変更によるCSS詳細度の変化 | スタイルの競合で見た目が変わる可能性 | コンパイル後のCSS出力を diff で比較。差分があればインポート順を調整 |
| レスポンシブ部分の振り分けミス | メディアクエリ内のルールが欠落する可能性 | 1ブロックずつ移動し、毎回コンパイル確認 |
| `@use` と `@import` の混在問題 | Dart Sass のスコープ差異によるエラー | 全ファイルで `$` 変数の使用有無を事前確認 |
| ページ別SCSSが `_global.scss` のクラスをSCSS的に参照（@extend 等） | コンパイルエラー | 事前に `@extend` の使用を grep で確認 |

---

## 検証方法

### 各Phase共通

1. `npx sass assets/scss/style.scss assets/css/style.css` でコンパイル
2. コンパイルエラーがないことを確認
3. 分離前のCSS出力と `diff` で比較し、**差分がゼロ**であることを確認

### 最終検証

1. 全CSSファイルのコンパイルが成功すること
2. コンパイル後のCSS出力が分離前と完全一致すること
3. ブラウザで以下のページを確認:
   - トップページ
   - 店舗詳細ページ
   - about ページ
   - medical ページ
   - storelist ページ

---

## 除外事項

- CSSルールの追加・削除・変更は一切行わない
- クラス名のリネームは行わない（Step 3 以降の作業）
- セレクタの修正は行わない（Step 4〜5 の作業）
- `!important` の削減は行わない（Step 6 の作業）
- ユーティリティプレフィクスの変更は行わない（Step 7 の作業）

---

## 事前確認チェックリスト

- [ ] 全ページSCSSで `$` 付き SCSS変数が使われているか確認
- [ ] `@extend` がファイル間で使用されているか確認
- [ ] 現在の `style.scss` コンパイル結果をバックアップ（diff比較の基準）
- [ ] Dart Sass のバージョン確認（`@use` 対応版か）
