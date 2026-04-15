# kushi UI 調整マージ Plan

## 目的

`amazones-local-dir-kushi` ディレクトリで串さんが実施した **UI 調整分**（リファクタリングは除外）を、現ディレクトリ `amazones-local-dir` にマージする。対象は4ページ（rules / price / visitor / sitemap）。

## 背景

- 現ディレクトリは Phase 2-B（ユーティリティ吸収・FLOCSS整理・パス相対化）まで完了している
- kushi ディレクトリは Phase 2-B 相当のリファクタ＋UI 調整が混在している
- kushi の UI 調整のみを抽出して現ディレクトリに反映する必要がある
- リファクタリング差分は現ディレクトリの方が進んでいる箇所もあるため、単純コピー禁止

## ベースラインとディレクトリ

| 用途 | パス |
|---|---|
| マージ先（作業対象） | `/Users/ryoheishinke/dev/FTP/Amazones様/amazones-local-dir` |
| kushi 作業後（UI 調整を持っている） | `/Users/ryoheishinke/dev/FTP/Amazones様/amazones-local-dir-kushi` |
| kushi 作業前のベースライン HTML | `/Users/ryoheishinke/Desktop/{page}-old/index.html`（ページごと） |
| kushi 作業前のベースライン SCSS | `/Users/ryoheishinke/Desktop/assets-old/scss/object/project/_{page}.scss` |

「kushi が UI 調整で加えた変更」＝ `{page}-old` と `kushi/{page}` の diff。

## マージ時の正規化ルール

kushi と現ディレクトリでクラス名・構造が異なる場合は、**現ディレクトリの構造・クラス名を維持し、kushi の UI 調整の中身だけを当てる**。

### 具体例

```html
<!-- 現ディレクトリ（そのまま維持） -->
<a href="#" class="c-breadcrumb-link">ご利用規約</a>

<!-- kushi の変更（元クラスは banner-a-link） -->
<a href="rules/" class="u-text-white u-fs-14 banner-a-link">ご利用規約</a>

<!-- マージ結果: クラスは現ディレクトリ、href は kushi -->
<a href="rules/index.html" class="c-breadcrumb-link">ご利用規約</a>
```

### パス形式の正規化

kushi は `href="page/"` 形式だが、現ディレクトリは `<base href="/amazones-local-dir/">` + `href="page/index.html"` 形式に統一済み。マージ時に変換する:

| kushi の形式 | 現ディレクトリの形式 |
|---|---|
| `href="page/"` | `href="page/index.html"` |
| `href="/amazones-local-dir/page/"` | `href="page/index.html"` |
| `href="#"`（ブレッドクラム） | `href="page/index.html"`（※ブレッドクラムが意図的無効化でない場合） |

### SCSS の扱い

- kushi が追加した **リファクタ SCSS**（`u-*` 吸収）は**除外**（現ディレクトリが既にもっと進んでいる）
- kushi が追加した **純粋な UI 調整 SCSS**（新クラス・プロパティ変更）のみ適用
- 現ディレクトリ側に対応クラスが既にある場合、**そのクラスにプロパティを追記**
- 現ディレクトリ側に対応クラスがない場合、**新規追加**

## マージ作業フロー（1ページにつき）

1. **kushi 差分の再抽出**
   - `diff ~/Desktop/{page}-old/index.html ~/amazones-local-dir-kushi/{page}/index.html`
   - `diff ~/Desktop/assets-old/scss/object/project/_{page}.scss ~/amazones-local-dir-kushi/.../._{page}.scss`
2. **差分の分類**
   - **リファクタリング差分**（`u-*` 吸収、FLOCSS プレフィクス付与、`c-breadcrumb-link` への置換など）→ **除外**
   - **UI 調整差分**（リンク修正、テキスト変更、新スタイル、レイアウト調整、コンテンツ追加）→ **マージ対象**
3. **現ディレクトリの該当箇所を照合**
   - 各 UI 調整箇所について、現ディレクトリの HTML / SCSS を Read / Grep で確認
   - 分類: 既対応 / 未対応 / クラス名変更済み（正規化ルール適用） / 構造変更済み（要判断） / 対応クラス不在（新規追加）
4. **分類表をユーザーに提示して方針確認**
   - 判断ポイント（構造違い・意図確認が必要な箇所）を明示
   - 承認を得る
5. **Edit ツールで反映**
   - HTML → SCSS の順
   - 1箇所1 Edit、十分な context を含めて一意性確保
6. **SCSS コンパイル**
   - コマンド: `cd amazones-local-dir && npx --yes sass assets/scss/object/project/_{page}.scss assets/css/{page}.css --no-source-map`
   - タイムスタンプで更新確認
7. **ブラウザ確認をユーザーに依頼**
   - PC / SP 両方
   - 変更箇所の golden path と既存機能の退行チェック
8. **OK なら次ページ、NG なら修正**

## 優先順位

| 順 | ページ | 状態 | 理由 |
|---|---|---|---|
| 1 | **rules** | ✅ 完了（2026-04-14） | 法的内容（条文追加）で最優先 |
| 2 | **price** | ⬚ 未着手 | 変更が最小（HTML リンク修正8件 + SCSS 6ブロック）、手順の習熟 |
| 3 | **visitor** | ⬚ 未着手 | SCSS・JS 追加があり複雑度が高い |
| 4 | **sitemap** | ⬚ 未着手 | 変更量最大（19件）、壊れた引用符修正も含む |

## 完了実績: rules ページ（リファレンスとして参照）

### 調査結果

- 現ディレクトリは **Phase 2-B 完了**（`<div>` + `<h3>` の構造、`p-rules__container__number` / `p-rules__list-number` 導入済み）
- kushi は `<section>` + `<p>` の構造（現ディレクトリの方がセマンティック）
- kushi の **リファクタ SCSS** は全て現ディレクトリで適用済み
- kushi の **UI 調整** は全て未適用

### 実施した変更

#### HTML（`rules/index.html`）

| # | 行（現ディレクトリ） | 変更内容 |
|---|---|---|
| 1 | 351 | バナー `href="#"` → `href="rules/index.html"`（クラス `c-breadcrumb-link` 維持） |
| 2 | 第6条 項目リスト末尾 | `<li>8. 当クラブが会員として不適当と判断した者</li>` 追加 |
| 3 | 第12条 本文 | 1段落を3段落に分割＋新段落追加（月次会費の支払義務） |
| 4 | 第15条 本文 | 2段落目追加（気象災害時の例外）— div ラップなし、直接 `<p>` 追加 |
| 5 | 第19条 本文 | 3段落目追加（損害賠償請求不可） |
| 6 | 第24条 本文 | `<br>` を5箇所挿入（段落間の視覚的スペーシング） |

#### SCSS（`_rules.scss`）

`.p-rules__container__item:last-child {}` の直後に以下を追加:

```scss
.p-rules__container__item address {
  font-style: normal;
}
```

### コンパイル

```bash
cd amazones-local-dir
npx --yes sass assets/scss/object/project/_rules.scss assets/css/rules.css --no-source-map
```

### 判断ポイントの記録

- **#1 バナー**: `href="#"` は意図的な無効化ではなく、クリック可能に修正したい意図だったため適用
- **#4 第15条**: div ラップせず、`.p-rules__container__item` の flex gap に任せる既存パターンを踏襲
- **#6 第24条 `<br>`**: セマンティックではないが、kushi の視覚意図を忠実に再現する方針で採用

---

## 未着手ページ: price

### 事前調査（完了）

kushi が加えた UI 調整は以下の通り:

#### HTML 変更（全8箇所、全てリンク修正）

| # | 行（kushi） | Before | After |
|---|---|---|---|
| 1 | 354 | `<a href="#" class="u-text-white u-fs-14 banner-a-link">料金案内</a>` | `<a href="price/" ...>料金案内</a>` |
| 2 | 1240 | `<a href="/reservation">` | `<a href="reservation/">` |
| 3 | 1408 | `<a href="/amazones-local-dir/information" class="c-btn--green-wrapper">` | `<a href="information/" ...>` |
| 4 | 1439 | `<a href="/amazones-local-dir/payment" ...>` | `<a href="payment/" ...>` |
| 5 | 1475 | `<a href="/amazones-local-dir/faq" ...>` | `<a href="faq/" ...>` |
| 6 | 1510 | `<a href="/amazones-local-dir/rules" ...>` | `<a href="rules/" ...>` |
| 7 | 1545 | `<a href="/amazones-local-dir/contact" ...>` | `<a href="contact/" ...>` |
| 8 | 1576 | `<a href="/amazones-local-dir/reservation" target="_blank" rel="noreferrer">` | `<a href="reservation/" ...>` |

**正規化ルール適用後**: 全て `href="page/index.html"` 形式に統一する

#### SCSS 変更（6ブロック、`_price.scss`）

##### 1. 新規: `.p-price__tier-crown img`（料金プランの王冠アイコンサイズ）

```scss
.p-price__tier-crown img {
  width: 3rem;
  height: auto;
}
```

##### 2. 変更: `.p-price__people-image`（ジャンプする人物イラストの配置）

```scss
/* Before */
position: relative;
top: -13rem;
right: -3rem;

/* After */
position: absolute;
top: -10rem;
right: 0;
```

##### 3. 変更: `.p-price__people-jump--01`

```scss
/* Before */
margin-right: -5.8rem;

/* After (※行自体が削除される = margin-right プロパティ削除) */
```

##### 4. 変更: `.p-price__people-jump`

```scss
/* Before */
height: 23rem;

/* After */
height: 21rem;
```

##### 5. 変更: `.p-price__people-jump--02`

```scss
/* Before */
height: 21rem;

/* After */
height: 19rem;
```

##### 6. 変更: `.p-price__people-jump--03`

```scss
/* Before */
height: 23rem;
margin-left: -4rem;

/* After */
height: 21rem;
margin-left: -3.5rem;
```

### 作業手順（price）

1. `diff ~/Desktop/price-old/index.html ~/amazones-local-dir-kushi/price/index.html` で差分確認
2. 現ディレクトリの `price/index.html` を Read して、上記8箇所のハードコード絶対パス（`/amazones-local-dir/xxx`）が残っているか確認
3. 現ディレクトリの `_price.scss` を Read して、上記6ブロックのセレクタの現状を確認
4. 分類表を作成してユーザーに提示
5. 承認後、Edit で反映
6. `npx sass _price.scss price.css` でコンパイル
7. ブラウザ確認依頼

### 注意ポイント（price）

- **ハードコード絶対パス**: 現ディレクトリで既にパス相対化済みか未処理か要確認
- **SCSS の行番号**: kushi の行番号ではなく、現ディレクトリ側の `_price.scss` の該当セレクタを探して編集
- **人物イラスト SCSS**: 現ディレクトリで既にリファクタ整理されている可能性があり、セレクタ構造が kushi と異なる場合あり

---

## 未着手ページ: visitor

### 事前調査（完了）

#### HTML 変更（7箇所）

| # | 行（kushi） | 変更内容 |
|---|---|---|
| 1 | 358 | バナーリンク `href="#"` → `href="visitor/"` |
| 2 | 435 | 料金「3時間利用 2,200円（税込）」を `<s>` で打ち消し線 |
| 3 | 526〜527 | 「※ ウェアやシューズ…」を `<p class="p-visitor__note">` で囲む |
| 4 | 652〜666 | SVG アイコン差し替え（`シェイプ 585`＋`Gym` → `シェイプ 571`＋`Gym`、viewBox 100×73 → 54×40） |
| 5 | 745, 764, 783, 802 | FAQ `<input>` に `checked` 属性追加（PC 初期オープン） |
| 6 | 858〜878 | ボタン「無料体験・見学予約はこちら」＋インライン SVG 矢印 → 「近くの店舗を探す」＋`icon_btn_green_arrow.svg` |
| 7 | 1203 以降 | SP 時に FAQ を強制クローズする `<script>` 追加 |

#### SCSS 変更（`_visitor.scss`）

##### 新規クラス

```scss
.p-visitor__note {
  white-space: nowrap;
}

.c-announcement__btn svg {
  flex-shrink: 0;
}
```

##### 既存クラスへの追記

- `.p-visitor__campaign` に `overflow: hidden;` 追加
- `.p-visitor__campaign-header` の padding を `1.5rem 2.5rem` → `1.5rem 2.5rem 3rem` に変更
- どこかのクラスから `height: 100%` 削除
- `.p-visitor__about` の gap を `100px` → `50px` に変更
- `.p-visitor__about-group` に `padding-bottom: 50px; border-bottom: 1px solid white;` 追加
- `.p-visitor__about-group:last-child { padding-bottom: 0; border-bottom: none; }` 新設
- どこかのクラスから `padding: 12px 0` 削除
- line-height `1.6` → `2`
- 既存クラスに `font-size: 10px` 追加

##### SP メディアクエリ内

```scss
.p-visitor__campaign-* {
  order: -1;
  width: 100%;
}
.p-visitor__campaign-header h2 { font-size: var(--fs-lg); }  /* 1.25rem から変更 */
.p-visitor__campaign-desc { line-height: 2; }
.p-visitor__note { white-space: normal; }
.c-announcement__title-container h2 { line-height: 1.6; }
.c-announcement__section .c-btn--light-blue { margin-bottom: 2rem; }
```

### 作業手順（visitor）

1. `diff ~/Desktop/visitor-old/index.html ~/amazones-local-dir-kushi/visitor/index.html`
2. 現ディレクトリの `visitor/index.html` を Read し、以下を確認:
   - バナー行のクラス名（`c-breadcrumb-link` に変わっている想定）
   - FAQ `<input>` の状態
   - ボタン「無料体験・見学予約はこちら」の現状
   - `<script>` の末尾位置
3. 現ディレクトリの `_visitor.scss` を Read し、上記の SCSS セレクタの現状を確認
4. 分類表を作成してユーザーに提示
5. 承認後、Edit で反映
6. コンパイル
7. ブラウザ確認依頼

### 注意ポイント（visitor）

- **SVG 差し替え**: 大きな置換なので、Before/After のコード全体を一致させる Edit を行う
- **FAQ checked**: 4箇所あるため、各 `<input>` を正確に特定（`id="v-q1"` 等のIDで区別）
- **SP スクリプト**: 既に別の `<script>` がある可能性 → 重複しないよう末尾追加
- **`.p-visitor__about` gap 変更**: 現ディレクトリ側の値を確認してから変更

---

## 未着手ページ: sitemap

### 事前調査（完了）

#### HTML 変更（19箇所、リンク修正が大半）

| # | 行（kushi） | 変更内容 |
|---|---|---|
| 1 | 351 | バナーラベル `無料体験・見学予約` → `サイトマップ`、`href="#"` → `href="/amazones-local-dir/sitemap/"` |
| 2 | 385 | 壊れた引用符 `href="../reservation'` → `href="reservation/"` |
| 3 | 393〜395 | `href="../member'` → `href="admission/"`、`<a href="price/">料金案内</a>` を**新規追加** |
| 4 | 402〜405 | `href="#"` → `https://wellnessland.co.jp/` + `target="_blank"`、alt `アイコン` → `外部リンク` |
| 5 | 425 | `href="./"` → `href="about/"` |
| 6 | 428 | `href="#"` → `href="sportip/"` |
| 7 | 446 | `href="../storelist'` → `href="storelist/"` |
| 8 | 486 ↔ 503 | h2 テキスト入れ替え「Amazones以外の店舗」↔「Amazonesのトピックス」 |
| 9 | 490〜493 | 4件の `href="#"` → `family/` / `visitor/` / `point_redemption/` / `protein/` |
| 10 | 508〜512 | `href="#"` → `https://hqf.osaka/` + `target="_blank"` |
| 11 | 516〜520 | `href="#"` → `https://hercules.amazones.fit/` + `target="_blank"` |
| 12 | 517 | `Amazones & Hercules` → `Amazones &amp; Hercules`（HTML エスケープ） |
| 13 | 524〜528 | `href="#"` → `https://shop.amazones.fit/` + `target="_blank"` |
| 14 | 545〜549 | `href="#"` → `https://recruit.amazones.fit/` + `target="_blank"` |
| 15 | 566〜575 | YouTube `href="#"` → `https://www.youtube.com/channel/UCvpQu600VT18YsgIj-2BpiQ` + `target="_blank"` |
| 16 | 580〜589 | Instagram `href="#"` → `https://www.instagram.com/ama_zones_24h/` + `target="_blank"` |
| 17 | 615 | `href="../contact'` → `href="contact/"` |
| 18 | 632 | alt `お問い合わせ` → `マイページ` |
| 19 | 636 | `href="../reservation'` → `href="reservation/"` |

#### SCSS 変更（`_sitemap.scss`）

```scss
.p-sitemap-page__banner-list {
  width: 100%;  /* 追加 */
}

.p-sitemap-page__banner-list .c-other-details-banner-item {
  flex: 1;  /* 新規追加 */
}
```

### 作業手順（sitemap）

1. `diff ~/Desktop/sitemap-old/index.html ~/amazones-local-dir-kushi/sitemap/index.html`
2. 現ディレクトリの `sitemap/index.html` を Read し、以下を確認:
   - 壊れた引用符（`href="../reservation'` 等）が残っているか
   - h2 テキストのラベル状態
   - 外部リンクの `target="_blank"` 状態
   - alt 属性の状態
3. 現ディレクトリの `_sitemap.scss` を Read し、`.p-sitemap-page__banner-list` の現状を確認
4. 分類表を作成してユーザーに提示
5. 承認後、Edit で反映
6. コンパイル
7. ブラウザ確認依頼

### 注意ポイント（sitemap）

- **変更量最大**: 19箇所あるので、分類表の作成に時間がかかる
- **壊れた引用符**: 現ディレクトリで既に修正済みの可能性が高い（最近のパス相対化作業で修正された可能性）→ 現状必ず確認
- **新規項目追加**: 「料金案内」リンクの追加位置は周辺構造を確認してから決定
- **h2 ラベル入れ替え**: 「Amazones以外の店舗」と「Amazonesのトピックス」の内容を取り違えないよう注意

---

## 完了後の最終チェック

4ページ全てのマージ完了後:

- [ ] 4ページ全てブラウザ確認済み（PC / SP）
- [ ] 既存機能の退行なし
- [ ] SCSS コンパイルによる CSS ファイル更新（rules.css / price.css / visitor.css / sitemap.css）
- [ ] 先方への共有準備（Before/After 説明資料）

## トラブル時

- Edit が失敗した場合（`old_string` が一意でない）→ 前後の context を増やしてリトライ
- コンパイルエラー → Read でシンタックスエラー箇所を確認し修正
- 見た目が壊れた場合 → Edit した箇所を Read で再確認、既存スタイルとの衝突を疑う
- 判断に迷う場合 → **修正せず人間に確認**（CLAUDE.md 原則4）
