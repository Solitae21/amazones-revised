# Step 8: PC/SP 2ソース統一 — 実行計画

作成日: 2026-04-01
ステータス: **承認済み（Phase 6 除外、Phase 1〜5 実施）**

---

## 目的

PC用とSP用でHTML構造を複製し `display` で切り替えているコードを1ソースに統一し、CSSメディアクエリでレスポンシブ対応する。

### メリット

- HTML重複の排除（保守性向上、コンテンツ更新時の修正漏れ防止）
- 帯域削減（特にvideoの二重読み込み解消: sportipページ）
- DOM軽量化

---

## 全量調査結果

全23 HTMLファイル + SCSS全体を調査した結果、以下の **5カテゴリ・17パターン** のPC/SP重複を確認した。

### カテゴリ概要

| カテゴリ | パターン数 | 対象ファイル数 | 統合難度 |
|---------|-----------|-------------|---------|
| A. c-shop セクション | 3 | 2 | 中 |
| B. テキスト配置切替（u-display-desk/sp） | 6 | 6 | **低** |
| C. 価格ページ title-row / speak-image | 5 | 2 | 低〜中 |
| D. ページ固有コンポーネント | 5 | 5 | 中〜**高** |
| E. ニュースバナー（index.html） | 1 | 1 | **高** |

---

## カテゴリA: c-shop セクション（index.html, about/index.html）

先方フィードバックで指摘済み。ブレークポイントは **1250px**。

### A-1. c-shop__header--desk / c-shop__header--sp

**対象ファイル・行番号:**

| ファイル | PC行 | SP行 |
|---------|------|------|
| `index.html` | 1058–1068 | 1071–1081 |
| `about/index.html` | 600–618 | 624–636 |

**PC版構造:**
```html
<div class="c-shop__header--desk">
  <img icon_amazones_shop.svg>
  <div class="c-shop__header--desk__inner">
    <div class="c-shop__header--desk__text">
      <p>女性専用24時間ジムの店舗数全国</p>
      <p>全店舗相互利用可能</p>
    </div>
    <img icon_amazones_no1.svg>
  </div>
</div>
```

**SP版構造:**
```html
<div class="c-shop__header--sp">
  <div class="c-shop__header--sp__row" style="gap: 5px">
    <p>女性専用24時間ジムの店舗数全国</p>
    <img icon_amazones_no1.svg>
  </div>
  <div class="c-shop__header--sp__row" style="gap: 10px">
    <img icon_amazones_shop.svg>
    <p>全店舗相互利用可能</p>
  </div>
</div>
```

**差分分析:**
- テキスト・画像は同一
- PC: 横一列（アイコン + テキスト2行 + No1アイコン）
- SP: 2行（1行目: テキスト + No1アイコン、2行目: ショップアイコン + テキスト）
- **要素の並び順が異なる**（PCではショップアイコンが先頭、SPでは2行目）
- inline style (`gap: 5px`, `gap: 10px`) がSP版に存在

**統合方針:**
```html
<!-- 統合後 -->
<div class="c-shop__header">
  <div class="c-shop__header__row1">
    <img icon_amazones_shop.svg class="c-shop__label-icon">
    <p>女性専用24時間ジムの店舗数全国</p>
    <img icon_amazones_no1.svg class="c-shop__no1-icon">
  </div>
  <p class="c-shop__header__interuse">全店舗相互利用可能</p>
</div>
```
- PC: flexbox で横一列表示（gap: 20px）、`c-shop__header__interuse` はテキストカラム内に配置
- SP: flex-direction: column、`order` プロパティで要素の並びを調整
- inline style を SCSS に移行

**統合難度: 中** — 要素の並び順が異なるため `order` や flex レイアウトの再設計が必要

**リスク:**
- PC版でアイコン・テキストの位置関係が微妙にずれるリスク
- inline style の gap 値を SCSS に移すため、意図しないレイアウト変更に注意

---

### A-2. c-shop__map-box / c-shop__map-box--sp

**対象ファイル・行番号:**

| ファイル | PC行 | SP行 |
|---------|------|------|
| `index.html` | 1107–1114 | 1083–1090 |
| `about/index.html` | 680–692 | 648–663 |

**差分分析:**
- コンテンツ完全一致（地図画像 + 「30店舗」テキスト）
- PC: `position: absolute; top: 100px; right: 150px;` でセクション右上に配置
- SP: `display: none` → 1250px以下で `display: block`、フロー内インライン配置
- SP版には `text-nowrap` クラスが追加（PC版にはない）

**統合方針:**
- 1ソース（現在のSP版の位置= items-wrapper 内に配置）
- PC: `position: absolute` + 座標指定でセクション右上に引き上げ
- SP: `position: static` でフロー内配置
- `text-nowrap` をPC版にも適用（表示に影響なし）

**統合難度: 中** — absolute ↔ static の切替は実績のあるパターン

**リスク:**
- DOM位置の変更によりPC版の absolute 基準点が変わる可能性
- 複数ブレークポイント（1250px, 1000px, 900px, 570px, 500px）でのマップ位置調整が必要

---

### A-3. c-shop__sticker-desk / c-shop__sticker-sp

**対象ファイル・行番号:**

| ファイル | PC行 | SP行 |
|---------|------|------|
| `index.html` | 1137–1156 | 1117–1135 |
| `about/index.html` | 742–778 | 694–740 |

**差分分析:**
- 同一画像（sticker1, sticker2, speechBubble1, speechBubble2, ribbon）
- PC: 固定サイズ指定（`height="410px" width="149px"` 等）、absolute配置
- SP: autoサイズ（`height="auto" width="104px"` 等）、相対配置
- リボン: PC版 `c-shop__ribbon--desk`、SP版 `c-shop__ribbon--sp`（別画像ではなく同じSVG）
- クラス名が完全に異なる（`sticker-desk__figure1` vs `sticker-sp__figure1`）

**統合方針:**
```html
<!-- 統合後 -->
<aside class="c-shop__sticker c-shop__sticker-container u-relative">
  <div class="c-grow-wrapper-right c-shop__ribbon">
    <div class="c-clip-grow-right"><img ribbon.svg></div>
  </div>
  <figure class="c-shop__sticker__figure1">
    <img sticker1.webp>
    <img speechBubble1.svg class="c-shop__sticker__bubble1 c-speech-bubble">
  </figure>
  <figure class="c-shop__sticker__figure2">
    <img sticker2.webp>
    <img speechBubble2.svg class="c-shop__sticker__bubble2 c-speech-bubble">
  </figure>
</aside>
```
- PC: absolute配置 + 固定サイズ → メディアクエリで切替
- SP: relative配置 + auto幅 → `@media (max-width: 1250px)` で適用
- `width` / `height` 属性を削除し、CSSで制御

**統合難度: 中** — absolute配置の座標値が多数あり、各ブレークポイントでの検証が必要

---

## カテゴリB: テキスト配置切替（u-display-desk / u-display-sp）

テキスト内容は同一で、PC版は親コンテナ内、SP版は親コンテナ外に配置される軽微な重複。

### B-1. Voice セクション注釈文

| ファイル | PC行 | SP行 | 内容 |
|---------|------|------|------|
| `index.html` | 1410 | 1416 | 「※個人の感想です…」 |
| `member/index.html` | 388 | 394 | 同上 |

**差分:** PC版は `p-top__voice-sub-text-inner` 内、SP版は外側。テキスト同一。

**統合方針:** 1つの `<p>` のみ残し、PCでは `display: inline`/SPでは `display: block` + マージン調整で配置を変更。

**統合難度: 低**

---

### B-2. Column セクション説明文

| ファイル | PC行 | SP行 | 内容 |
|---------|------|------|------|
| `index.html` | 1696 | 1699 | 「ダイエットやトレーニングについてのコラムをお届けします。」 |
| `column/index.html` | 391 | 396 | 同上 |
| `storelist/[slag]/index.html` | 3356 | 3362 | 同上 |

**差分:** PC版は `c-column__sub-text__inner` 内、SP版は外側に `u-mt-20` 付き。テキスト同一。

**統合方針:** B-1 と同様。1つの `<p>` を残し、CSS調整。

**統合難度: 低**

---

### B-3. Shop List サブテキスト

| ファイル | PC行 | SP行 |
|---------|------|------|
| `index.html` | 1049 | 1044 |
| `about/index.html` | 587 | 578 |

**差分:** PC版は `c-shop__sub-text` 内（`position: absolute; top: 170px; left: 760px`）、SP版は `hgroup` 内。テキスト同一（空の `<p>` タグ2つ）。

**注意:** テキストが空なので実質的に表示に影響しない。ただし将来コンテンツが入る可能性があるため統合は実施する。

**統合方針:** SP版の位置（hgroup内）に1ソースで配置。PCでは `position: absolute` で右側に移動。

**統合難度: 低〜中** — absolute 配置の調整が必要

---

### B-4. about ページ 料金プラン説明文

| ファイル | PC行 | SP行 |
|---------|------|------|
| `about/index.html` | 910 (desk内) | 915 |

**差分:** PC版は `c-price-plan__sub-text__inner` 内、SP版は外側。テキスト同一。

**統合方針:** B-1 と同パターン。

**統合難度: 低**

---

### B-5. SP専用改行 `<br class="u-display-sp">`

| ファイル | 行 | 内容 |
|---------|---|------|
| `index.html` | 1784 | フッターバナー見出し内改行 |
| `member/index.html` | 960 | フッターバナー内 |
| `admission/index.html` | 760 | フッターバナー内 |
| `family/index.html` | 927 | フッターバナー内 |
| `about/index.html` | 1073 | フッターバナー内 |

**判定: 対象外（そのまま維持）**

理由: `<br class="u-display-sp">` は1要素で完結しており、2ソース問題ではない。SP時のみ改行を入れる正当なレスポンシブ手法。

---

### B-6. Movie ステッカー（index.html）

| ファイル | PC行 | SP行 |
|---------|------|------|
| `index.html` | 1659–1666 | 1670–1678 |

**差分:**
- 同一画像（speech_bubble, sticker1, sticker2）
- PC: 通常フロー内、固定サイズ（`height="380px" width="165px"` 等）
- SP: `u-display-sp` + 別コンテナ、リボンSVG追加、autoサイズ（`width="130px"` 等）
- SP版にはリボン画像 `icon_movie_ribbon-sp.svg` が追加

**統合方針:**
- 1ソースにし、リボンは SP のみ `display: block` で表示
- 画像サイズは CSS で制御

**統合難度: 中** — SP版にリボン追加要素あり

---

## カテゴリC: 価格ページ title-row / speak-image

### C-1. p-price__title-row--desktop / --mobile

**対象ファイル・行番号:**

| ファイル | セクション | PC行 | SP行 |
|---------|-----------|------|------|
| `price/index.html` | Monthly Plan | 450 | 465 |
| `price/index.html` | Special Plan | 562 | 577 |
| `price/index.html` | Initial Cost | 1143 | 1177 |
| `price/index.html` | Option | 1213 | 1228 |
| `storelist/[slag]/index.html` | Monthly Plan | 1893 | 1908 |
| `storelist/[slag]/index.html` | Special Plan | 2006 | 2023 |
| `storelist/[slag]/index.html` | Initial Cost | 2590 | 2624 |
| `storelist/[slag]/index.html` | Option | 2660 | 2675 |

**差分:** テキスト・画像完全一致。PCは `c-section__header-row` ラッパーあり（横並び）、SPはラッパーなし（縦積み）。

**統合方針:**
```html
<div class="p-price__title-row">
  <div class="p-price__title-container c-reveal">...</div>
  <div class="u-font-zen u-fw-500 u-lh-200 c-reveal--scale">...</div>
</div>
```
- `.p-price__title-row`: PC で `display: flex; flex-direction: row;`、SPで `flex-direction: column;`
- ラッパー `c-section__header-row` は不要になる

**注意:** SP版の Initial Cost / Option で `c-reveal--scale` クラスが欠落している（バグの可能性）。統合時に PC 版に合わせて付与する。

**統合難度: 低** — 最も安全なパターン。計 8 箇所。

---

### C-2. p-price__speak-image--desktop / --mobile

| ファイル | PC行 | SP行 |
|---------|------|------|
| `price/index.html` | 539–552 | 525–536 |
| `storelist/[slag]/index.html` | 1983付近 | 1968付近 |

**差分:** 同一画像2枚。PCは `u-flex-1` 付きでテキストの**後**に配置。SPはテキストの**前**に配置。

**統合方針:**
- DOM上はSP版の位置（テキスト前）に配置
- PCでは CSS `order: 1` でテキスト後に移動

**統合難度: 中** — CSS order で対応可能

---

### C-3. p-price__people-image / p-price__people-image-mobile

| ファイル | PC行 | SP行 |
|---------|------|------|
| `price/index.html` | 1158–1174 | 1121–1137 |
| `storelist/[slag]/index.html` | 2568付近 | 同セクション内 |

**差分:** 同一画像3枚（personJump01〜03）。PCは title-row 内にネスト。SPは title-row の**外側**上部に配置。

**統合方針:**
- title-row の外側に配置し、PCでは `position: absolute` または CSS Grid で title-row 内に見えるよう配置
- または title-row 内に配置し、SPでは `order: -1` で上部に移動

**統合難度: 中〜高** — 異なる親コンテナ間の移動

---

## カテゴリD: ページ固有コンポーネント

### D-1. p-sportip__phone--desktop / --mobile

| ファイル | PC行 | SP行 |
|---------|------|------|
| `sportip/index.html` | 870–883 | 803–816 |

**差分:** 同一 video + 同一画像。PCは `c-reveal` アニメーション付きでテキスト後配置。SPはテキスト前配置。**video が2回読み込まれる帯域問題あり。**

**統合方針:**
- 1ソース（SP版の位置）に配置、CSS `order` でPC時にテキスト後に移動
- `c-reveal` は共通適用（SP でも問題なし）

**統合難度: 中** — C-2 と同パターン

---

### D-2. p-medical__online-consult-heading--lg / --sp

| ファイル | PC行 | SP行 |
|---------|------|------|
| `medical/index.html` | 625–631 | 633–644 |

**差分:**
- PC: バッジ1個（「アプリ不要・スマホで簡単に完結」）
- SP: バッジ2個（「アプリ不要・スマホで」+「簡単に完結」）
- テキストの折り返し位置が異なる

**統合方針:**
```html
<div class="p-medical__online-consult-heading c-reveal">
  <div class="c-badge-white">
    <p>アプリ不要・スマホで<br class="u-display-sp">簡単に完結</p>
  </div>
</div>
```
- SP用 `<br>` で折り返し位置を制御
- バッジ1個で統一

**判定: 要検証** — SPでの表示がバッジ2個分割と `<br>` による折り返しで見た目が異なる可能性がある。現状のSPデザインがバッジ間にスペースがある場合、この方法では再現できない。

**統合難度: 中**

**リスク:** SPでのバッジデザインが1個内折り返しと2個並びで見た目が異なる場合、**除外対象**

---

### D-3. p-payment__speak-mobile vs speak-container--02/03

| ファイル | PC行 | SP行 |
|---------|------|------|
| `payment/index.html` | 858–887 | 832–857 |

**差分:**
- 同一画像（bubble02/person02, bubble03/person03）
- PC: 各人物が独立した `position: absolute` コンテナで自由配置
- SP: 2人を横並び `flex` コンテナにグループ化
- **クラス名が完全に異なる**（PC: `--02`/`--03` 番号付き、SP: `mobile` サフィックス）

**統合方針の検討:**
- PC版は absolute 配置で画面上の任意位置に人物を浮かせるデザイン
- SP版は通常フロー内で横並び
- 統合するには PC 版のレイアウトを flex + order ベースに書き直す必要がある
- absolute 座標値が多数存在し、再現が困難

**判定: 除外（統合しない）**

**除外理由:**
1. PCとSPでレイアウト戦略が根本的に異なる（absolute自由配置 vs flexグループ）
2. CSS書き直しの規模が大きく、見た目を崩すリスクが高い
3. 「安全側に倒す」原則に基づき、現状維持

---

### D-4. p-reservation-speak__mobile-row vs speak-container--04/05

| ファイル | PC行 | SP行 |
|---------|------|------|
| `reservation/index.html` | 909–929 | 931–947 |
| `storelist/[slag]/index.html` | 対応箇所 | 8211–8217 |

**差分:** D-3 と同パターン。PC: 個別 absolute コンテナ。SP: グループ化 row。

**判定: 除外（統合しない）** — D-3 と同じ理由

---

### D-5. u-md-block / u-sm-block によるコンテンツ重複

| ファイル | PC行 | SP行 | 内容 |
|---------|------|------|------|
| `protein/index.html` | 608 | 582 | オープニング画像 |
| `protein/index.html` | 927 | 907 | speak person02 |
| `point_redemption/index.html` | 412 | 393 | コンテンツ画像 |
| `family/index.html` | 382 | 364 | ファミリー画像 |
| `personal/index.html` | 470 | 478 | トピック副題 (section1) |
| `personal/index.html` | 585 | 593 | トピック副題 (section2) |
| `storelist/[slag]/index.html` | 1800 | 1808 | プラン説明文 |
| `storelist/[slag]/index.html` | 3190 | 3200 | 「選ばれる理由」説明文 |
| `medical/index.html` | 898 | 904 | サブ本文 |

**差分:** 全て同一コンテンツ。PCはテキスト/画像と横並びの親コンテナ内、SPは親コンテナ外（または異なる位置）に配置。

**統合方針:** 各箇所で CSS `order` + flex-direction 切替、または Grid レイアウトで1ソース化。

**統合難度: 中** — 個別に親コンテナとの関係を確認する必要がある。9箇所。

---

## カテゴリE: ニュースバナー（index.html）

### E-1. p-top__news-banner-desk / p-top__news-banner-sp

| ファイル | PC行 | SP行 |
|---------|------|------|
| `index.html` | 639–666 | 668–696 |

**差分:**
- テキスト: ほぼ同一だが、SP版は本文が途中で切れている（「自然と続く」で終了、PC版は「トレーニング習慣が身につきます。」まで）
- 見出し: SP版に `<br>` あり（「継続できる健康と<br>美しい身体」）
- ステッカー画像: 同一画像だが **サイズが異なる**（PC: width=210/139/274/205、SP: width=138/88/161/123）
- リボンSVG: **別ファイル**（PC: `bg_news_banner_ribbon-desk.svg` / `bg_news_banner_ribbon-desk2.svg`、SP: `bg_news_banner_ribbon.svg` / `bg_news_banner_ribbon2.svg`）
- SP版に追加クラス: `p-top__news-banner-context--sp`, `p-top__news-banner-heading--sp`, `p-top__news-banner-last-text`
- SP版の 30min ラベル内に追加クラス `min-30 p-top__news-30min-label-img`
- クラス名が大幅に異なる（`sticker1` vs `sticker1-sp`、`news-ribbon-desk` vs `news-ribbon-sp`）
- ブレークポイント: 1090px

**判定: 除外（統合しない）**

**除外理由:**
1. テキスト内容が一部異なる（SP版で本文が短縮されている）
2. リボン画像が別ファイル（PC用とSP用で異なるSVG）
3. ステッカーのサイズ差が大きく、CSS制御だけでは再現困難
4. クラス名・構造の差���が大きく、統合のCSS書き直し規模が非常に大きい
5. 見た目崩壊リスクが最も高い箇所

---

## 実施対象・除外まとめ

### 実施対象（11パターン、Phase 1〜5）

| # | パターン | 対象ファイル | 難度 | Phase |
|---|---------|------------|------|-------|
| A-1 | c-shop__header 統合 | index.html, about/index.html | 中 | 3 |
| A-2 | c-shop__map-box 統合 | index.html, about/index.html | 中 | 3 |
| A-3 | c-shop__sticker 統合 | index.html, about/index.html | 中 | 3 |
| B-1 | Voice 注釈文 | index.html, member/index.html | 低 | 1 |
| B-2 | Column 説明文 | index.html, column/index.html, storelist/[slag]/index.html | 低 | 1 |
| B-3 | Shop List サブテキスト | index.html, about/index.html | 低〜中 | 3 |
| B-4 | about 料金プラン説明文 | about/index.html | 低 | 1 |
| B-6 | Movie ステッカー | index.html | 中 | 4 |
| C-1 | price title-row (×8箇所) | price/index.html, storelist/[slag]/index.html | 低 | 2 |
| C-2 | price speak-image | price/index.html, storelist/[slag]/index.html | 中 | 4 |
| D-1 | sportip phone video | sportip/index.html | 中 | 4 |
| D-5 | u-md/sm-block 重複 (×9箇所) | 9ファイル | 中 | 5 |

### 除外対象（6パターン）

| # | パターン | 除外理由 |
|---|---------|---------|
| B-5 | `<br class="u-display-sp">` | 2ソース問題ではない（1要素で完結する正当な手法） |
| C-3 | price people-image | 親コンテナが異なり、統合難度が高い（中〜高リスク） |
| D-2 | medical バッジ分割 | バッジ1個内折り返しと2個並びで見た目が異なる可能性。要検証だが安全側に倒して除外 |
| D-3 | payment speak-mobile | PCがabsolute自由配置、レイアウト戦略が根本的に異なる |
| D-4 | reservation speak-mobile | D-3 と同じ理由 |
| E-1 | ニュースバナー | テキスト差異・別画像ファイル・構造差が大きすぎる |

---

## 実施順序

依存関係と安全性を考慮し、以下の順序で実施する。

### Phase 1: 低リスク（テキ���ト配置切替）

**B-1, B-2, B-4** — 同一テキストの配置違いのみ。CSS調整で完結。

作業手順:
1. SP版の `<p>` を削除
2. PC版の `<p>` から `u-display-desk` を削除
3. `_global-responsive.scss` にメディアクエリ追加（SP時のマージン・配置変更）
4. SCSSコンパイル → ブラウザ確認（PC + SP）

### Phase 2: 低リスク（price title-row 統合）

**C-1** — 8箇所の同一パターン。ラッパー削除のみ。

作業手順:
1. PC版（`--desktop`）のHTML内容を残し、外側ラッパーを `p-price__title-row` に統一
2. SP版（`--mobile`）のHTMLを削除
3. `_price.scss` に `.p-price__title-row` のレスポンシブルール追加
4. SP版で欠落していた `c-reveal--scale` を追加（バグ修正）
5. SCSSコンパイル → ブラウザ確認

### Phase 3: 中リスク（c-shop セクション）

**A-1, A-2, A-3, B-3** — 先方指摘箇所。1セクションとして一括対応。

作業手順:
1. `index.html` の c-shop セクションを統合
2. `_global-responsive.scss` の c-shop 関連ルールを書き換え
3. SCSSコンパイル → PC/SP 両方でブラウザ確認
4. 問題なければ `about/index.html` にも適用

### Phase 4: 中リスク（order ベース統合）

**C-2, D-1, B-6** — CSS `order` で DOM 位置の違いを吸収。

作業手順:
1. 各箇所で SP 版の HTML を削除
2. 残った HTML に統合クラスを付与
3. 各ページの SCSS にメディアクエリ + `order` ルール追加
4. SCSSコンパイル → ブラウザ確認

### Phase 5: 中リスク（u-md/sm-block 統合）

**D-5** — 9箇所を個別に対応。

作業手順:
1. 各箇所の親コンテナの flex/grid 構造を確認
2. SP版 HTML を削除
3. PC版に CSS `order` + メディアクエリ追加
4. 各ページ個別に SCSSコンパイル → ブラウザ確認

### ~~Phase 6: 除外~~

**C-3（people-image）** — 親コンテナが異なり統合難度が高いため除外。

---

## 影響ファイル一覧

### HTML（修正対象）

| ファイル | 修正箇所数 |
|---------|-----------|
| `index.html` | 8 |
| `about/index.html` | 5 |
| `price/index.html` | 6 |
| `storelist/[slag]/index.html` | 8 |
| `member/index.html` | 1 |
| `column/index.html` | 1 |
| `sportip/index.html` | 1 |
| `protein/index.html` | 2 |
| `point_redemption/index.html` | 1 |
| `family/index.html` | 1 |
| `personal/index.html` | 2 |
| `medical/index.html` | 1 |

### SCSS（修正対象）

| ファイル | 修正内容 |
|---------|---------|
| `_global-responsive.scss` | c-shop 関連ルール書き換え、テキスト配置ルール追加 |
| `object/project/_top.scss` | Movie ステッカー統合 |
| `object/project/_price.scss` | title-row / speak-image 統合 |
| `object/project/_sportip.scss` | phone 統合 |
| `object/project/_protein.scss` | 画像・speak 統合 |
| `object/project/_personal.scss` | topic subtitle 統合 |
| `object/project/_storedetail.scss` | title-row / speak 統合（storelist） |
| `object/project/_medical.scss` | （除外の場合は修正なし） |
| `object/project/_payment.scss` | （除外のため修正なし） |
| `object/project/_reservation.scss` | （除外のため修正なし） |

### 削除対象クラス（統合により不要になるもの）

```
c-shop__header--desk, c-shop__header--desk__inner, c-shop__header--desk__text
c-shop__header--sp, c-shop__header--sp__row
c-shop__map-box--sp
c-shop__sticker-desk, c-shop__sticker-desk__figure1/2, c-shop__sticker-desk__bubble1/2
c-shop__sticker-sp, c-shop__sticker-sp__figure1/2, c-shop__sticker-sp__bubble1/2
c-shop__ribbon--desk, c-shop__ribbon--sp
p-price__title-row--desktop, p-price__title-row--mobile
p-price__speak-image--desktop, p-price__speak-image--mobile
p-sportip__phone--desktop, p-sportip__phone--mobile
p-top__movie-sticker-container-sp, p-top__movie-ribbon-sp
```

---

## リスク評価

| リスク | 影響度 | 対策 |
|-------|-------|------|
| PC版レイアウト崩れ（特に absolute 配置箇所） | 高 | Phase ごとにブラウザ確認。c-shop は 1250px/1000px/900px/767px/570px/500px の全ブレークポイントで検証 |
| SP版レイアウト崩れ（flex order 切替） | 中 | iPhone SE〜iPad のビューポートで確認 |
| inline style の移行漏れ | 中 | HTML の `style=""` を全て grep で抽出し、SCSS に移行したことを確認 |
| c-reveal アニメーションの欠落 | 低 | 統合時に PC 版のアニメーションクラスを維持 |
| storelist/[slag]/index.html の動的部分 | 中 | 店舗固有データがあるかを確認してから修正 |

---

## 検証チェックリスト

各 Phase 完了後に実施:

- [ ] `npx sass assets/scss/global.scss assets/css/global.css --no-source-map` が成功すること
- [ ] 各ページ固有 SCSS のコンパイルが成功すること
- [ ] PC表示（1920px, 1440px）でレイアウトが変わらないこと
- [ ] タブレット表示（1250px, 1024px）でレイアウトが変わらないこと
- [ ] SP表示（767px, 375px）でレイアウトが変わらないこと
- [ ] 旧クラス名で grep して HTML/SCSS 内に残存がないこと
- [ ] `u-display-desk` / `u-display-sp` の使用箇所が減少していること

---

## 備考

- D-2（medical バッジ分割）は除外としたが、ユーザーが希望すれば検証の上で対応可能
- E-1（ニュースバナー）は構造差が大きすぎるため、このステップでは対応しない。将来的にデザイナーと協議の上でリデザインと同時に統合することを推奨
- D-3/D-4（payment/reservation speak）も同様に、デザインリニューアル時に合わせて統合を推奨
