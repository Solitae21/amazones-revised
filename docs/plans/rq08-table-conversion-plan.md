# 実行計画: RQ-08 table化すべき部分のHTML見直し + 共通化

> コンテキスト: `docs/plans/feedback-improvement-context.md`
> 先方指摘: 「p-price__item-row / p-protein__flavor-item などの table で表現できる部分をあえて div flex で作り直しているのは何か理由があるか」「ほとんど同じデザインですが、共通コンポーネントでまとめることは難しいでしょうか」
> 方針: チケット = 「何を・なぜ・受け入れ基準」のみ。実装方法は既存コード + ガイドラインから判断する。

---

## 調査結果サマリ

### table化が必要な箇所（2ページ）

| ページ | クラス | CSS特性 | 出現数 |
|--------|--------|---------|--------|
| price/index.html | `p-price__item-row` | flex, space-between, border-bottom, padding:1rem 0 | 15行（5グループ） |
| protein/index.html | `p-protein__flavor-item` | flex, space-between, border-bottom, padding:1.5rem 0 | 33行（3フレーバー × 栄養7行+味4行） |

### 既にtable実装済み（対応不要）

- family/index.html: `p-family__table` で `<table>` 使用済み
- point_redemption/index.html: `p-point__table` で `<table>` 使用済み

### 全ページ調査済み — 他に同パターンなし

admission, payment, member, faq, rules, storelist, medical, personal, sportip, visitor, about, column, contact, family, information, point_redemption, sitemap — いずれも「flex + space-between + border-bottom」の行パターンは検出されず。

### CSSの類似度

```
p-price__item-row          p-protein__flavor-item
─────────────────          ──────────────────────
display: flex              display: flex
justify-content: s-b       justify-content: s-b
border-bottom: 1px solid   border-bottom: 1px solid
  var(--base-gray)           var(--base-gray)
padding: 1rem 0            padding: 1.5rem 0
```

→ 差はpaddingのみ。共通コンポーネント化が可能。

---

## 共通化の方針

price と protein のテーブル行は CSS がほぼ同一のため、共通コンポーネント `c-data-table` を新設する。
ページ固有の差分（padding、SPレスポンシブ等）は各ページの `p-*` SCSSで上書きする。

---

## チケット一覧

| # | チケット | 対象ファイル | 概要 |
|---|---------|-------------|------|
| 1 | 共通コンポーネント作成 | `_data-table.scss`, `global.scss` | `c-data-table` の SCSS 新設 |
| 2 | price テーブル化 | `price/index.html`, `_price.scss` | div → table 変換 + 共通クラス適用 |
| 3 | protein 栄養成分テーブル化 | `protein/index.html`, `_protein.scss` | 栄養成分 div → table 変換（3フレーバー分） |
| 4 | protein 味評価テーブル化 | `protein/index.html`, `_protein.scss` | 味評価 div → table 変換（3フレーバー分） |

---

## チケット詳細

### チケット 1: 共通コンポーネント `c-data-table` 作成

#### 何を
price/protein で共通利用するテーブルの共通コンポーネント SCSS を新設する。

#### なぜ
先方指摘「ほとんど同じデザインですが、共通コンポーネントでまとめることは難しいでしょうか」への対応。
price と protein のテーブル行は padding 以外ほぼ同一の CSS であり、共通化すべき。

#### 影響ファイル
- `assets/scss/object/component/_data-table.scss`（新規作成）
- `assets/scss/global.scss`（@use 追加）

#### 受け入れ基準
- [ ] `c-data-table` が FLOCSS component として作成されている
- [ ] テーブルの基本スタイル（border-bottom, フォント, 行間等）が定義されている
- [ ] padding 等のページ固有差分は含まない（各 p-* で上書きする想定）
- [ ] `global.scss` に @use が追加されている
- [ ] コンパイルが通ること

#### 検証
```bash
# ファイル存在確認
ls assets/scss/object/component/_data-table.scss

# コンパイル確認
npx sass assets/scss/global.scss /dev/null
```

---

### チケット 2: price/index.html テーブル化

#### 何を
price/index.html の `p-price__item-row` で構成された料金リスト（5グループ、計15行）を `<table>` に変換する。

#### なぜ
- 先方指摘「table で表現できる部分をあえて div flex で作り直しているのは何か理由があるか」への直接対応
- 名前↔金額の対応関係は tabular data であり、セマンティック HTML として `<table>` が適切

#### 対象箇所（price/index.html）
- L421-456: 基本料金（5行 — スタンダード/学生/シニア/おさんぽ/休憩・休会）
- L1076-1082: 入会金・事務手数料（1行）
- L1084-1090: セキュリティ登録料（1行）
- L1111-1136: オプションサービス 左列（4行 — パーソナル/プロテイン/水素水）
- L1138-1169: オプションサービス 右列（4行 — レンタル/ロッカー/ビジター）

#### 影響ファイル
- `price/index.html`
- `assets/scss/object/project/_price.scss`

#### 注意点
- 補足テキスト `<span>`（「（大学・専門学生含む / 学生期間のみ適用）」等）は `<th>` 内に残す
- SP で `p-price__item-row__name` が `flex-direction: column` になっている挙動を table CSS で再現する必要あり
- `p-price__text-container` の親ラッパー構造（`p-price__col-row`, `p-price__flex-list`）は table 化に伴い簡素化される可能性がある
- 初期費用セクション（L1074-1091）は `p-price__col-row` で2つの `p-price__text-container` が横並びになっている。1つのテーブルにまとめるか、2つのテーブルに分けるかはデザインに合わせて判断

#### 受け入れ基準
- [ ] `p-price__item-row` の div 構造が `<table>/<tr>/<th>/<td>` に変換されている
- [ ] 共通クラス `c-data-table` が適用されている
- [ ] `p-price__item-row` の SCSS が table 対応に書き換えられている（旧 flex 定義を削除）
- [ ] SP レスポンシブ（名前+補足テキストの折り返し、フォントサイズ調整）が維持されている
- [ ] ブラウザ表示が変わらないこと（PC/SP 両方）

#### 検証
```bash
# div構造が残っていないか
grep -n 'p-price__item-row' price/index.html

# table構造に変換されたか
grep -n '<table\|<tr\|<th\|<td' price/index.html

# コンパイル確認
npx sass assets/scss/global.scss /dev/null
```

---

### チケット 3: protein/index.html 栄養成分テーブル化

#### 何を
protein/index.html の `p-protein__flavor-nutrition` 内の `p-protein__flavor-item` で構成された栄養成分表（3フレーバー × 7行 = 21行）を `<table>` に変換する。

#### なぜ
- 先方指摘と同根。「エネルギー: 139.7kcal」等のラベル↔値ペアは tabular data
- 栄養成分表示は特にアクセシビリティ（スクリーンリーダー）の観点で table が重要

#### 対象箇所（protein/index.html）
- L952-993: アップルフレーバー 栄養成分（7行）
- L1098-1139頃: ピーチフレーバー 栄養成分（7行）
- L1242-1283頃: プレーンフレーバー 栄養成分（7行）

#### 影響ファイル
- `protein/index.html`
- `assets/scss/object/project/_protein.scss`

#### 注意点
- ヘッダー（`p-protein__flavor-header`「栄養成分表示 1食（35g）あたり」）は `<caption>` または table 外の見出しとして配置
- 各フレーバーは独立したテーブル（構造が同一だが、データが異なる）

#### 受け入れ基準
- [ ] 3フレーバー分の栄養成分が `<table>/<tr>/<th>/<td>` に変換されている
- [ ] 共通クラス `c-data-table` が適用されている
- [ ] 栄養成分ヘッダー（「栄養成分表示 1食（35g）あたり」）が適切に配置されている
- [ ] SP レスポンシブが維持されている（padding 縮小、フォントサイズ調整）
- [ ] ブラウザ表示が変わらないこと（PC/SP 両方）

#### 検証
```bash
# 変換前のdiv構造が残っていないか（栄養成分側）
grep -n 'p-protein__flavor-nutrition' protein/index.html

# table構造に変換されたか
grep -n '<table\|<tr\|<th\|<td' protein/index.html

# コンパイル確認
npx sass assets/scss/global.scss /dev/null
```

---

### チケット 4: protein/index.html 味評価テーブル化

#### 何を
protein/index.html の `p-protein__flavor-ratings` 内の `p-protein__flavor-item` で構成された味評価表（3フレーバー × 4行 = 12行）を `<table>` に変換する。

#### なぜ
- 栄養成分と同じく「甘味: ★★★☆☆」等のラベル↔値ペアは tabular data

#### 対象箇所（protein/index.html）
- L995-1036: アップルフレーバー 味評価（4行 — 甘味/酸味/キレ/まろやかさ）
- L1141-1182頃: ピーチフレーバー 味評価（4行）
- L1285-1326頃: プレーンフレーバー 味評価（4行）

#### 影響ファイル
- `protein/index.html`
- `assets/scss/object/project/_protein.scss`

#### 注意点
- 味評価の値は単純テキストではなく `<div class="c-flex-gap-4">` でラップされた3要素（「ひかえめ」★★★☆☆「しっかり」）の横並び。`<td>` 内にこの構造を維持する必要がある
- 評価ヘッダー（「アップルフレーバーについて」等）は `<caption>` または table 外の見出しとして配置
- 味評価の直後に「原材料・栄養成分・アレルギー情報」ボタン（`c-btn--light-blue02`）がある。これは table 外に配置する

#### 受け入れ基準
- [ ] 3フレーバー分の味評価が `<table>/<tr>/<th>/<td>` に変換されている
- [ ] 共通クラス `c-data-table` が適用されている
- [ ] `<td>` 内の★評価（`c-flex-gap-4`）の横並びレイアウトが維持されている
- [ ] SP レスポンシブが維持されている（gap 縮小、flex-wrap 等）
- [ ] 「原材料・栄養成分・アレルギー情報」ボタンが正常に表示されること
- [ ] ブラウザ表示が変わらないこと（PC/SP 両方）

#### 検証
```bash
# 変換前のdiv構造が残っていないか（味評価側）
grep -n 'p-protein__flavor-ratings' protein/index.html

# ★評価の横並び構造が維持されているか
grep -n 'c-flex-gap-4' protein/index.html

# コンパイル確認
npx sass assets/scss/global.scss /dev/null
```

---

## 実行順序

```
チケット1（共通コンポーネント作成）
  ↓
チケット2（price テーブル化）— チケット1に依存
  ↓
チケット3（protein 栄養成分）— チケット1に依存、チケット2と並行可
  ↓
チケット4（protein 味評価）— チケット3と同じファイルのため直列
```

---

## 全体の検証（全チケット完了後）

```bash
# price: div構造が残っていないか
grep -c 'p-price__item-row' price/index.html
# → 0件（旧クラスが完全に置き換えられていること）

# protein: div構造が残っていないか
grep -c 'p-protein__flavor-item' protein/index.html
# → 0件（旧クラスが完全に置き換えられていること）

# 共通コンポーネントが使われているか
grep -c 'c-data-table' price/index.html protein/index.html

# table要素が存在するか
grep -c '<table' price/index.html protein/index.html

# 旧SCSSセレクタが残っていないか
grep -n 'p-price__item-row\|p-protein__flavor-item' assets/scss/object/project/_price.scss assets/scss/object/project/_protein.scss
# → 0件（旧セレクタが削除されていること）

# コンパイル確認
npx sass assets/scss/global.scss /dev/null

# ブラウザ確認: price/index.html, protein/index.html を PC/SP 両方で目視
```
