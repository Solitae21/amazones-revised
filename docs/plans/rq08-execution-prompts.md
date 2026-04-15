# RQ-08 実行プロンプト集

> Plan: `docs/plans/rq08-table-conversion-plan.md`
> 実行順: チケット1 → チケット2 → チケット3 → チケット4

---

## チケット1: 共通コンポーネント `c-data-table` 作成

```
あなたは年収3000万円のフロントエンドエンジニアです。

## 作業指示: RQ-08 チケット1 — 共通コンポーネント `c-data-table` 作成

### コンテキスト
- Plan: `docs/plans/rq08-table-conversion-plan.md`
- ガイドライン: `docs/cording-guideline.md`
- FLOCSS構成: `assets/scss/object/component/` に配置
- 既存のテーブルコンポーネント参考: family/index.html の `p-family__table`

### 何を
price/protein で共通利用するテーブルの共通コンポーネント SCSS `c-data-table` を新設する。

### なぜ
先方指摘「ほとんど同じデザインですが、共通コンポーネントでまとめることは難しいでしょうか」への対応。
price の `p-price__item-row` と protein の `p-protein__flavor-item` は padding 以外ほぼ同一の CSS。

### 現在の共通CSS（2箇所で重複している部分）

price (`_price.scss` L221-240):
```scss
.p-price__item-row {
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid var(--base-gray);
  padding: 1rem 0;
}
.p-price__item-row p {
  font-size: var(--fs-base);
  line-height: 2;
  font-weight: 500;
}
.p-price__item-row span {
  font-weight: 500;
  color: var(--text-lightBlue);
}
```

protein (`_protein.scss` L329-334):
```scss
.p-protein__flavor-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--base-gray);
  padding: 1.5rem 0;
}
```

### 作業内容
1. `assets/scss/object/component/_data-table.scss` を新規作成
2. `<table>` 要素向けの基本スタイルを定義（border-collapse, width:100% 等）
3. 行（`<tr>`）の border-bottom スタイルを定義
4. セル（`<th>`, `<td>`）の基本スタイルを定義（text-align, vertical-align 等）
5. padding 等のページ固有差分は含めない（各 p-* SCSSで上書きする想定）
6. `assets/scss/global.scss` に @use を追加

### 受け入れ基準
- [ ] `assets/scss/object/component/_data-table.scss` が存在する
- [ ] FLOCSS の component プレフィクス `c-` を使用している
- [ ] テーブルの基本スタイル（border-bottom, フォント等）が定義されている
- [ ] padding はページ固有のため含まない
- [ ] `global.scss` に @use が追加されている
- [ ] コンパイルが通ること: `npx sass assets/scss/global.scss /dev/null`
```

---

## チケット2: price/index.html テーブル化

```
あなたは年収3000万円のフロントエンドエンジニアです。

## 作業指示: RQ-08 チケット2 — price/index.html テーブル化

### コンテキスト
- Plan: `docs/plans/rq08-table-conversion-plan.md`
- ガイドライン: `docs/cording-guideline.md`
- 前提: チケット1（c-data-table）が完了済みであること

### 何を
price/index.html の `p-price__item-row` で構成された料金リスト（5グループ、計15行）を
`<div>` + flex 構造から `<table>` に変換し、共通クラス `c-data-table` を適用する。

### なぜ
先方指摘「table で表現できる部分をあえて div flex で作り直しているのは何か理由があるか」への直接対応。
名前↔金額の対応関係は tabular data であり、セマンティック HTML として `<table>` が適切。

### 対象箇所（price/index.html）

#### グループ1: 基本料金（L421-456）
現状:
```html
<div class="p-price__text-container">
  <div class="p-price__item-row">
    <p class="p-price__item-row__name">スタンダード会員</p>
    <p class="p-price__item-row__value">月額 9,900円</p>
  </div>
  <div class="p-price__item-row">
    <p class="p-price__item-row__name">
      学生会員
      <span>（大学・専門学生含む / 学生期間のみ適用）</span>
    </p>
    <p class="p-price__item-row__value">月額 7,700円</p>
  </div>
  <!-- ... 計5行 -->
</div>
```

#### グループ2: 初期費用 — 入会金（L1076-1082）
```html
<div class="p-price__text-container u-flex-1">
  <div class="p-price__item-row">
    <p class="p-price__item-row__name">入会金・事務手数料</p>
    <p class="p-price__item-row__value">11,000円</p>
  </div>
</div>
```

#### グループ3: 初期費用 — セキュリティ（L1084-1090）
```html
<div class="p-price__text-container u-flex-1">
  <div class="p-price__item-row">
    <p class="p-price__item-row__name">セキュリティ登録料</p>
    <p class="p-price__item-row__value">5,500円</p>
  </div>
</div>
```

#### グループ4: オプション 左列（L1111-1136）
パーソナルトレーニング(1回)、パーソナルトレーニング(4回)、プロテイン飲み放題、水素水飲み放題 — 計4行

#### グループ5: オプション 右列（L1138-1169）
レンタルセット、レンタルセットプラス、専用ロッカー、ビジター利用 — 計4行

### SCSS（_price.scss）の関連セレクタ
- L221-227: `.p-price__item-row` — flex, space-between, border-bottom, padding
- L229-234: `.p-price__item-row p` — font-size, line-height, font-weight
- L236-240: `.p-price__item-row span` — font-weight, color
- L494-499: SP `.p-price__item-row__name` — flex-direction:column, flex:1
- L502-506: SP `.p-price__item-row__value` — flex-shrink:0, nowrap
- L509-512: SP `.p-price__item-row p` — font-size:0.85rem
- L514-517: SP `.p-price__item-row span` — font-size:var(--fs-xs)

### 作業内容
1. price/index.html: 各グループの `<div class="p-price__text-container">` を `<table class="c-data-table p-price__table">` に変換
2. 各 `<div class="p-price__item-row">` を `<tr>` に変換
3. `<p class="p-price__item-row__name">` を `<th>` に変換（補足 `<span>` はそのまま `<th>` 内に残す）
4. `<p class="p-price__item-row__value">` を `<td>` に変換
5. `_price.scss`: `.p-price__item-row` の flex 定義を削除し、`.p-price__table` の table スタイルに書き換え
6. SP レスポンシブ: `<th>` 内の補足テキスト折り返し、フォントサイズ調整を再現

### 注意点
- グループ2・3（初期費用）は `p-price__col-row` で横並び。各1行のテーブルが2つ並ぶ形でOK（親の flex レイアウトはそのまま維持）
- グループ4・5（オプション）は `p-price__flex-list` で横並び。同様に2つのテーブルが並ぶ形
- `p-price__text-block` が `.p-price__item-row p` とグループセレクタになっている（L229, L236）。分離が必要

### 受け入れ基準
- [ ] 全5グループの `p-price__item-row` が `<table>/<tr>/<th>/<td>` に変換されている
- [ ] 共通クラス `c-data-table` が各 `<table>` に適用されている
- [ ] `_price.scss` の旧 flex 定義が削除され、table 対応に書き換えられている
- [ ] SP レスポンシブが維持（名前+補足テキストの折り返し、フォントサイズ調整）
- [ ] ブラウザ表示が変わらないこと（PC/SP 両方）

### 検証
```bash
# 旧クラスが HTML に残っていないか
grep -n 'p-price__item-row' price/index.html
# → 0件であること

# table構造に変換されたか
grep -c '<table' price/index.html

# 共通クラスが適用されているか
grep -c 'c-data-table' price/index.html

# 旧SCSSセレクタが残っていないか
grep -n 'p-price__item-row' assets/scss/object/project/_price.scss
# → 0件であること

# コンパイル確認
npx sass assets/scss/global.scss /dev/null

# ブラウザ確認: price/index.html を PC/SP で目視
```
```

---

## チケット3: protein/index.html 栄養成分テーブル化

```
あなたは年収3000万円のフロントエンドエンジニアです。

## 作業指示: RQ-08 チケット3 — protein 栄養成分テーブル化

### コンテキスト
- Plan: `docs/plans/rq08-table-conversion-plan.md`
- ガイドライン: `docs/cording-guideline.md`
- 前提: チケット1（c-data-table）が完了済みであること

### 何を
protein/index.html の `p-protein__flavor-nutrition` 内の `p-protein__flavor-item` で構成された
栄養成分表（3フレーバー × 7行 = 21行）を `<table>` に変換する。

### なぜ
先方指摘と同根。「エネルギー: 139.7kcal」等のラベル↔値ペアは tabular data。
栄養成分表示は特にアクセシビリティの観点で `<table>` が重要。

### 対象箇所（protein/index.html）

#### アップルフレーバー 栄養成分（L952-993）
```html
<div class="p-protein__flavor-nutrition">
  <div class="p-protein__flavor-header u-mb-10 u-bg-red">
    <p>栄養成分表示 1食（35g）あたり</p>
  </div>
  <div class="p-protein__flavor-item">
    <p class="p-protein__flavor-label">エネルギー</p>
    <p class="">139.7kcal</p>
  </div>
  <!-- ... 計7行（エネルギー/たんぱく質/脂質/炭水化物/食塩相当量/ビタミンC/ビタミンB6） -->
</div>
```

#### ピーチフレーバー 栄養成分（L1098-1139）
同構造。ヘッダーの u-bg クラスが `u-bg-peach`。値が異なる。

#### チョコレートフレーバー 栄養成分（L1242-1283）
同構造。ヘッダーの u-bg クラスが `u-bg-brown`。値が異なる。

### SCSS（_protein.scss）の関連セレクタ
- L329-334: `.p-protein__flavor-item` — flex, space-between, border-bottom, padding:1.5rem 0
- L294-297: `.p-protein__flavor-label` — color:var(--text-lightBlue), font-weight:600
- L865-869: SP `.p-protein__flavor-item` — padding:0.6rem 0, gap:0.5rem, font-size:var(--fs-sm)

### 作業内容
1. 各フレーバーの `p-protein__flavor-nutrition` 内を `<table class="c-data-table p-protein__nutrition-table">` に変換
2. ヘッダー（`p-protein__flavor-header`）は table 外に残す（`<caption>` ではなく現状の div 構造を維持 — 背景色付きヘッダーのため）
3. 各 `<div class="p-protein__flavor-item">` を `<tr>` に変換
4. `<p class="p-protein__flavor-label">` を `<th>` に変換
5. `<p class="">` を `<td>` に変換
6. `_protein.scss`: `.p-protein__flavor-item` のうち栄養成分に関わる flex 定義を table 対応に書き換え

### 注意点
- `p-protein__flavor-item` は栄養成分と味評価の両方で使われている。チケット3では栄養成分側のみ変換する
- ただし SCSS の `.p-protein__flavor-item` セレクタは共通。チケット4（味評価）完了後にまとめて削除するか、チケット3の時点で新セレクタに分離するか判断が必要
  → 推奨: チケット3で `p-protein__nutrition-table` 用のセレクタを新設し、チケット4完了後に旧 `.p-protein__flavor-item` を削除

### 受け入れ基準
- [ ] 3フレーバー分の栄養成分が `<table>/<tr>/<th>/<td>` に変換されている
- [ ] 共通クラス `c-data-table` が各テーブルに適用されている
- [ ] ヘッダー（背景色付き）が適切に配置されている
- [ ] SP レスポンシブが維持（padding 縮小、フォントサイズ調整）
- [ ] ブラウザ表示が変わらないこと（PC/SP 両方）

### 検証
```bash
# 栄養成分側のdiv構造が残っていないか
grep -A2 'flavor-nutrition' protein/index.html | grep 'flavor-item'
# → 0件であること

# table構造に変換されたか
grep -c '<table' protein/index.html

# コンパイル確認
npx sass assets/scss/global.scss /dev/null

# ブラウザ確認: protein/index.html を PC/SP で目視
```
```

---

## チケット4: protein/index.html 味評価テーブル化

```
あなたは年収3000万円のフロントエンドエンジニアです。

## 作業指示: RQ-08 チケット4 — protein 味評価テーブル化

### コンテキスト
- Plan: `docs/plans/rq08-table-conversion-plan.md`
- ガイドライン: `docs/cording-guideline.md`
- 前提: チケット1（c-data-table）・チケット3（栄養成分テーブル化）が完了済み

### 何を
protein/index.html の `p-protein__flavor-ratings` 内の `p-protein__flavor-item` で構成された
味評価表（3フレーバー × 4行 = 12行）を `<table>` に変換する。

### なぜ
栄養成分と同根。「甘味: ★★★☆☆」等のラベル↔評価ペアは tabular data。

### 対象箇所（protein/index.html）

#### アップルフレーバー 味評価（L995-1036）
```html
<div class="p-protein__flavor-ratings">
  <div class="p-protein__flavor-header u-bg-red">
    <p>アップルフレーバーについて</p>
  </div>
  <div class="p-protein__flavor-item">
    <p class="p-protein__flavor-label">甘味</p>
    <div class="c-flex-gap-4">
      <p class="">ひかえめ</p>
      <p class="p-protein__flavor-stars--red">★★★☆☆</p>
      <p class="">しっかり</p>
    </div>
  </div>
  <!-- ... 計4行（甘味/酸味/キレ/まろやかさ） -->
  <div class="c-flex-col-end">
    <button class="c-btn--light-blue02 u-cursor-pointer" onclick="openIngredientsModalApple()">
      原材料・栄養成分・アレルギー情報 <svg>...</svg>
    </button>
  </div>
</div>
```

#### ピーチフレーバー 味評価（L1141-1180）
同構造。★クラスが `p-protein__flavor-stars--peach`、onclick が `openIngredientsModalPeach()`。
★の数が異なる（甘味★4、酸味★3、キレ★2、まろやかさ★1）。

#### チョコレートフレーバー 味評価（L1285-1326）
同構造。★クラスが `p-protein__flavor-stars--brown`、onclick が `openIngredientsModalChocolate()`。
★の数が異なる（甘味★4、酸味★0、キレ★0、まろやかさ★4）。

### SCSS（_protein.scss）の関連セレクタ
- L329-334: `.p-protein__flavor-item` — flex, space-between, border-bottom, padding:1.5rem 0（栄養成分と共用、チケット3で対応済みのはず）
- L865-869: SP `.p-protein__flavor-item` — padding:0.6rem 0, gap:0.5rem, font-size:var(--fs-sm)
- L872-876: SP `.p-protein__flavor-item .c-flex-gap-4` — gap:0.35rem, flex-wrap:wrap, font-size:0.8rem
- L1236-1240: 別ブレークポイント SP `.p-protein__flavor-item` — padding:0.6rem 0, gap:0.5rem, font-size:var(--fs-sm)
- L1243-1247: 別ブレークポイント SP `.p-protein__flavor-item .c-flex-gap-4` — gap:0.35rem, flex-wrap:wrap, font-size:0.8rem

### 作業内容
1. 各フレーバーの `p-protein__flavor-ratings` 内の `p-protein__flavor-item` 部分を `<table class="c-data-table p-protein__ratings-table">` に変換
2. ヘッダー（`p-protein__flavor-header`）は table 外に残す
3. 各 `<div class="p-protein__flavor-item">` を `<tr>` に変換
4. `<p class="p-protein__flavor-label">` を `<th>` に変換
5. `<div class="c-flex-gap-4">` を `<td>` に変換（内部の `<p>` 要素と★評価はそのまま `<td>` 内に残す）
6. 「原材料・栄養成分・アレルギー情報」ボタン（`c-flex-col-end`）は table 外に配置
7. `_protein.scss`: 旧 `.p-protein__flavor-item` のセレクタをすべて削除し、新しい table セレクタに統合

### 注意点
- `<td>` 内に `<div class="c-flex-gap-4">` の横並びレイアウト（ひかえめ ★★★☆☆ しっかり）を維持すること
- SP で `c-flex-gap-4` に `flex-wrap: wrap` が適用されている。table セル内でもこの挙動を維持
- チケット3完了後、旧 `.p-protein__flavor-item` セレクタがまだ残っている場合はこのチケットで削除する

### 受け入れ基準
- [ ] 3フレーバー分の味評価が `<table>/<tr>/<th>/<td>` に変換されている
- [ ] 共通クラス `c-data-table` が各テーブルに適用されている
- [ ] `<td>` 内の★評価（`c-flex-gap-4`）の横並びレイアウトが維持されている
- [ ] 「原材料・栄養成分・アレルギー情報」ボタンが table 外に正常に表示されること
- [ ] SP レスポンシブが維持（gap 縮小、flex-wrap、フォントサイズ調整）
- [ ] 旧 `.p-protein__flavor-item` セレクタが `_protein.scss` から完全に削除されている
- [ ] ブラウザ表示が変わらないこと（PC/SP 両方）

### 検証
```bash
# 味評価側のdiv構造が残っていないか
grep -n 'p-protein__flavor-item' protein/index.html
# → 0件であること

# table構造
grep -c '<table' protein/index.html
# → 6件（栄養3 + 味評価3）

# ★評価の横並び構造が維持されているか
grep -c 'c-flex-gap-4' protein/index.html

# 旧SCSSセレクタが完全に削除されているか
grep -n 'p-protein__flavor-item' assets/scss/object/project/_protein.scss
# → 0件であること

# コンパイル確認
npx sass assets/scss/global.scss /dev/null

# ブラウザ確認: protein/index.html を PC/SP で目視
```
```

---

## 全チケット完了後の最終検証

```bash
# price: 旧クラスが完全に消えているか
grep -c 'p-price__item-row' price/index.html
# → 0件

# protein: 旧クラスが完全に消えているか
grep -c 'p-protein__flavor-item' protein/index.html
# → 0件

# 共通コンポーネントが使われているか
grep -c 'c-data-table' price/index.html protein/index.html

# table要素の数
grep -c '<table' price/index.html
# → 5件（基本料金1 + 初期費用2 + オプション2）
grep -c '<table' protein/index.html
# → 6件（栄養3 + 味評価3）

# 旧SCSSセレクタが残っていないか
grep -n 'p-price__item-row\|p-protein__flavor-item' assets/scss/object/project/_price.scss assets/scss/object/project/_protein.scss
# → 0件

# コンパイル確認
npx sass assets/scss/global.scss /dev/null

# ブラウザ確認: price/index.html, protein/index.html を PC/SP 両方で目視
```
