# 実行計画: リファクタリング品質改善（先方フィードバック 2026-04-11）

> 元フィードバック: `docs/fix/feedback-of-refactalinc`
> ガイドライン: `docs/cording-guideline.md`
> 方針: チケット = 「何を・なぜ・受け入れ基準」のみ。実装コードは Plan に書かない。

---

## 先方の根本懸念

> 「リファクタリングの精度が少々低いことを懸念しております」
> 「細かく記載はしていませんが、HTMLの構成も御社内で再度精査していただけますと幸いです」

先方は個別の指摘だけでなく、**リファクタリング全体の品質**に対して懸念を表明している。
各チケットでは先方例示箇所だけでなく、**全ページ横断で同種の問題を調査・修正**することを必須とする。

---

## チケット一覧

| チケット | 内容 | 先方指摘 | 依存 |
|---------|------|---------|------|
| **RQ-01** | body `line-height: 100%` → デザイン照合のうえ適切な値に変更 | FB-E | なし |
| **RQ-02** | line-height 単位統一 → 単位なし（計290箇所） | FB-C | RQ-01 |
| **RQ-03** | font-size 単位統一 → rem + 誤差値の正規化 | FB-D, FB-A一部 | なし |
| **RQ-04** | 重複CSS調査 + 共通コンポーネント統合 | FB-A | RQ-03 |
| **RQ-05** | 不要なタグ入れ子の解消（全ページ横断） | FB-B | なし |
| **RQ-06** | alt属性の適正化（装飾画像 → `alt=""`） | FB-F | なし |
| **RQ-07** | SVG挿入方法の統一 + カラー違いSVGの統合 | FB-G, FB-H | なし |
| **RQ-08** | table化すべき部分のHTML見直し + 共通化 | FB-I | RQ-04 |
| **RQ-09** | a > button入れ子の解消（/protein） | FB-J | なし |
| **RQ-10** | /rules section入れ子・hタグ追加 | FB-K | なし |
| **RQ-11** | /personal イラスト alt・webp化 | FB-L | なし |

---

## 実行順序

```
Phase 1: CSS基盤（全ページに波及。先に片付ける）
  RQ-01 → RQ-02（body line-height → 各所line-height統一）
  RQ-03（font-size統一。RQ-01と並行可）

Phase 2: 重複CSS統合（調査 → 共通化 → HTML変更）
  RQ-04 → RQ-08（重複調査・統合 → table化+共通化）

Phase 3: HTML構造改善（独立した修正、並行可）
  RQ-05（タグ入れ子解消）
  RQ-06（alt適正化）
  RQ-07（SVG統一）
  RQ-09（a>button解消）
  RQ-10（rules section修正）
  RQ-11（personal画像修正）
```

### 先方確認ポイント

| タイミング | 内容 |
|-----------|------|
| RQ-01 着手前 | body line-height の変更値をデザイン照合結果と共に共有し、方針の合意を取る |
| RQ-04 調査完了後 | 重複パターン一覧と共通コンポーネント化の方針を共有 |
| RQ-07 着手前 | SVG統一方針（svg useタグの適用範囲）を共有 |
| RQ-11 着手前 | イラストのコーディング再現可否を共有 |

---

## チケット詳細

---

### RQ-01: body line-height 見直し

**何を:**
`assets/scss/foundation/_reset.scss` L8 の `line-height: 100%` を適切な値に変更する。

**なぜ:**
- 先方指摘：「bodyにline-height 100%を指定していることで各所にline-heightを指定しないといけないという状況になっている」
- 先方指摘：「全体を通して 1.8 程度のデザインだと思いますので、再度デザインと見比べて精査してください」
- `line-height: 100%` は `line-height: 1` と同義。全テキストが行間なしになるため、全コンポーネントに個別の line-height 指定が必要になっている
- この修正により多くの個別 line-height 指定が不要になり、RQ-02 の作業量が減る

**作業手順:**

1. **デザインカンプとの照合**（着手前に実施）
   - 本文テキスト、リスト、見出し下の説明文など、複数のテキスト要素で line-height をデザインから読み取る
   - 「1.8」が妥当か、あるいは別の値が適切かを判断する
   - 照合結果を先方に共有し、値の合意を取る

2. **_reset.scss の修正**
   - `line-height: 100%` → 合意した値（暫定 `1.8`）に変更

3. **全ページブラウザ確認**
   - body line-height 変更後、全ページを目視確認
   - 一行テキスト（ボタン、ラベル等）で上下余白が増えて崩れる箇所を特定
   - 崩れた箇所には個別に `line-height: 1` 等を追加して対処
   - 対処した箇所のリストを記録する

**影響範囲:**
- `_reset.scss` 1ファイルの変更だが、全ページの全テキスト要素に影響
- 既に個別 line-height が指定されている要素は影響を受けない

**受け入れ基準:**
- [ ] デザインカンプと照合した結果が記録されている
- [ ] `_reset.scss` の body line-height が合意値に変更されている
- [ ] SCSS コンパイルが通る
- [ ] 全ページブラウザ確認し、崩れた箇所を個別対処済み
- [ ] 個別対処した箇所のリストがある

**検証:**
```bash
grep -n 'line-height' assets/scss/foundation/_reset.scss
```

---

### RQ-02: line-height 単位統一 → 単位なし

**何を:**
全 SCSS ファイルの line-height 指定を「単位なし」に統一する。RQ-01 完了後、body 継承で不要になった指定は削除する。

**なぜ:**
- 先方指摘：「line-heightが px / % / em / rem / 単位無し と混在。明確な理由がなければ単位無しに統一」
- 先方指摘：「スマホ時だけが段落落ちするためモンキーパッチ的にline-heightを指定している箇所もあった」→ RQ-01 で body を修正すれば解消される見込み

**現状（SCSS 全体）:**
| 単位 | project/ | component/ | _global-responsive |
|------|---------|-----------|-------------------|
| px | 35 | 0 | 要調査 |
| % | 2 | 2 | 要調査 |
| em | 65 | 3 | 要調査 |
| rem | 90 | 1 | 要調査 |
| 単位なし | 98 | 5 | 要調査 |
| **計** | **290** | **11** | **17** |

**作業手順:**

1. **RQ-01 完了後の不要 line-height 洗い出し**
   - body が `1.8`（仮）になった結果、個別の `line-height: 1.8` / `line-height: 180%` / `line-height: 1.8em` 等は不要 → 削除
   - 「モンキーパッチ的に line-height を指定している箇所」を特定し、RQ-01 で解消されたか確認 → 解消済みなら削除

2. **残りの line-height を単位なしに変換**
   - `px` → デザインと照合して算出（例: `line-height: 30px` + `font-size: 16px` = `line-height: 1.875`）
   - `em` → 数値そのまま（例: `2em` → `2`）
   - `rem` → font-size との比率で算出（rem は root em なので、要素の font-size に依存しない点に注意）
   - `%` → 100 で割る（例: `180%` → `1.8`）

3. **ブラウザ確認**
   - 変換した全箇所でブラウザ表示を確認

**影響範囲:**
- `assets/scss/object/project/` 全ファイル
- `assets/scss/object/component/` 全ファイル
- `assets/scss/_global-responsive.scss`

**受け入れ基準:**
- [ ] line-height に px / em / rem / % の単位が残っていない（0件）
- [ ] body 継承と同値の line-height 指定が削除されている
- [ ] SCSS コンパイル通過
- [ ] 全ページブラウザ確認

**検証:**
```bash
# 全て0件であること
grep -rn 'line-height:.*px' assets/scss/object/ assets/scss/_global-responsive.scss
grep -rn 'line-height:.*[0-9]em' assets/scss/object/ assets/scss/_global-responsive.scss
grep -rn 'line-height:.*rem' assets/scss/object/ assets/scss/_global-responsive.scss
grep -rn 'line-height:.*%' assets/scss/object/ assets/scss/_global-responsive.scss
```

---

### RQ-03: font-size 単位統一 → rem + 誤差値の正規化

**何を:**
全 SCSS ファイルの font-size を `rem` に統一する。また、誤差範囲の値を正規化する。

**なぜ:**
- 先方指摘：「font-sizeも px / rem と混在。rem に統一」
- 先方指摘：「font-size 6.259rem と 6.25rem のサイズ差はほとんど誤差範囲なので統一」
- ガイドライン：「rem または em での指定を基本」

**現状:**
- project/ の px 指定: 104箇所（うち `calc()` 内の px 含む）
- component/ の px 指定: 9箇所
- rem 値の揺れ: `6.259rem` vs `6.25rem` 等

**作業手順:**

1. **px → rem 変換**（`16px = 1rem` 基準）
   - 通常の px 値 → rem に変換（例: `14px` → `0.875rem`）
   - `calc()` 内の px（レスポンシブ `clamp` 的な記述） → そのまま残す（calc は px が妥当な場合がある）
   - CSS 変数 `var(--fs-*)` 使用箇所 → 変換不要

2. **誤差値の正規化**
   - 全 SCSS の font-size 値を一覧化
   - `6.259rem` と `6.25rem` のような微差は統一
   - 同一デザインパターンで値が揺れている箇所を調査・統一

3. **ブラウザ確認**
   - 変換した全箇所でブラウザ表示を確認

**影響範囲:**
- `assets/scss/object/project/` 全ファイル
- `assets/scss/object/component/` 全ファイル
- `assets/scss/_global-responsive.scss`

**受け入れ基準:**
- [ ] font-size の px 指定が 0件（`calc()` 内を除く）
- [ ] 誤差値が正規化されている（`6.259rem` → `6.25rem` 等）
- [ ] SCSS コンパイル通過
- [ ] ブラウザ確認

**検証:**
```bash
# calc() 内を除いて 0件であること
grep -rn 'font-size:.*px' assets/scss/object/ | grep -v 'calc('
grep -rn 'font-size:.*px' assets/scss/object/component/
# 誤差値の確認
grep -rn 'font-size:.*rem' assets/scss/object/project/ | sed 's/.*font-size://' | sort -u
```

---

### RQ-04: 重複CSS調査 + 共通コンポーネント統合

**何を:**
ほぼ同一デザインで複数ページに個別定義されている CSS を調査し、共通コンポーネントに統合する。

**なぜ:**
- 先方指摘：「ほぼ同一デザインでいくつも同じ内容のcssを記述している部分がある。確認・メンテナンス工数が増えるため」
- 先方指摘：**「指摘した以外の部分やページも再度確認してください」**

**作業手順:**

**Step 1: 全ページ横断調査**

以下のパターンを全 project SCSS から洗い出す:

(a) **ページ内ナビゲーション**（先方例示: `p-price__links-nav` / `p-reservation-flow__nav`）
調査済みの重複:
| セレクタ | ファイル | 差異 |
|---------|--------|------|
| `.p-price__links-nav` | _price.scss | gap:2rem, mb:10rem |
| `.p-reservation-flow__nav` | _reservation.scss | gap:2rem, mb:10rem（完全一致） |
| `.p-payment__links-nav` | _payment.scss | gap:2rem, mb:10rem（完全一致） |
| `.p-sportip__links-nav` | _sportip.scss | gap:2rem, mb:10rem（完全一致） |
| `.p-storelist__links-nav` | _storelist.scss | gap:2rem, mb:7rem（mb のみ異なる） |
| `.p-storedetail__links-nav` | _storedetail.scss | gap:3rem, mb:7rem（gap, mb 異なる） |
| `.p-faq__nav` | _faq.scss | 構造が異なる（max-width, padding 等追加） |

→ price / reservation / payment / sportip は完全一致。共通コンポーネント `c-page-nav` 等に統合。
→ storelist / storedetail は差異を modifier で対応。
→ faq は構造が異なるため対象外（ただし統合可能か検討）。

(b) **セクションタイトル**（先方例示: `p-price__title` / `p-protein__section-header`）
| セレクタ | font-size | font-weight | font-family |
|---------|-----------|-------------|-------------|
| `.p-price__title` | 6.259rem | 400 | outfit |
| `.p-protein__section-header h2` | var(--fs-display) | 400 | outfit |
→ font-size の値は異なるが、RQ-03 で `6.259rem` → `6.25rem` に正規化後、`--fs-display` と比較して統一可否を判断。

(c) **その他の重複パターン**（未調査）
- 各ページの CTA ボタン周辺
- カード型コンポーネント
- リスト・テーブル型コンポーネント

→ 全 project SCSS を開き、同一プロパティセットの繰り返しを機械的に検出する。

**Step 2: 共通コンポーネント設計**

- 統合対象ごとに `c-*` クラスを設計
- 差異は BEM modifier で対応（例: `c-page-nav--narrow`）
- `assets/scss/object/component/` に新規 SCSS ファイルを作成
- `global.scss` の import に追加

**Step 3: HTML 変更 + 旧定義削除**

- 対象ページの HTML クラスを新コンポーネントに置換
- 各 project SCSS から重複定義を削除
- レスポンシブ定義も移行

**影響範囲:**
- 新規: `assets/scss/object/component/` に共通 SCSS
- 変更: 統合対象の project SCSS
- 変更: 対象ページの HTML（クラス名変更）
- 全ページに波及する可能性あり

**受け入れ基準:**
- [ ] Step 1 の調査結果（重複パターン一覧）が記録されている
- [ ] 先方例示の2ペアが共通コンポーネントに統合されている
- [ ] 全ページ横断で同種の重複を調査・対処済み
- [ ] 統合後のブラウザ表示が変わらないこと
- [ ] 新コンポーネントが FLOCSS `c-*` 命名に従っている

---

### RQ-05: 不要なタグ入れ子の解消

**何を:**
不要な `<div>` ラッパーを全ページ横断で調査し、HTML 構造を簡素化する。

**なぜ:**
- 先方指摘：「タグの入れ子が不要な部分は精査お願いします。指摘した以外の部分やページも再度確認してください」
- 例: `<a><div class="p-sportip__links-item"><span>...</span></div></a>` — `<a>` と `<span>` だけで十分

**作業手順:**

1. **全ページ横断調査**
   - `<a>` の直下に不要な `<div>` がある箇所（調査済み: price 4, reservation 5, sportip 5, information 25, medical 2, payment 6）
   - 単一子要素しか持たない `<div>` ラッパー
   - スタイル目的のみの冗長な入れ子

2. **修正**
   - 不要な `<div>` を削除し、スタイルを親または子要素に移動
   - SCSS セレクタを HTML 変更に追従

3. **ブラウザ確認**

**先方例示箇所:**
- `/sportip` — `p-sportip__links-item`（`<a>` 内の不要 `<div>`。L569, 587, 605）
- `/sportip` — `p-sportip__flex-col`（L1138。複数の `<p>` をラップする `<div>` が冗長な可能性）

**影響範囲:**
- 全ページの HTML
- 対象の SCSS セレクタ

**受け入れ基準:**
- [ ] 先方例示箇所が修正されている
- [ ] 全ページで同種の不要な入れ子を調査・修正済み
- [ ] 調査結果（修正箇所リスト）が記録されている
- [ ] SCSS セレクタが HTML 変更に追従している
- [ ] ブラウザ表示が変わらないこと

---

### RQ-06: alt属性の適正化

**何を:**
装飾目的の画像の alt を `alt=""` に変更する。不適切な alt は適切な内容に修正するか空にする。

**なぜ:**
- 先方指摘：「全ページ alt="予約バナー" となっている。装飾目的であれば alt=""」
- 先方指摘：「alt="リボン装飾" 等もあえて読ませる理由がない」
- ガイドライン：「img は装飾目的での利用であれば alt は空白でも問題ない」
- 先方指摘：「なぜaltを設定するのかということを意識して設定してください」

**作業手順:**

1. **全ページの alt 属性を一覧化**
   - `alt="予約バナー"`: 18箇所 → `alt=""` に変更
   - `alt="リボン装飾"`: 18箇所 → `alt=""` に変更
   - `alt="アイコン"`: 多数箇所 → 装飾アイコンは `alt=""` に変更
   - その他の不適切な alt を調査

2. **判定基準**
   - 装飾画像（背景、リボン、アイコン等） → `alt=""`
   - コンテンツ画像（写真、図解等で情報を伝える） → 内容を説明する alt
   - ロゴ → `alt="アマゾネス"` 等はそのまま（ブランド名として意味がある）

**影響範囲:**
- 全ページの HTML（表示には影響なし）

**受け入れ基準:**
- [ ] `alt="予約バナー"` が 0件
- [ ] `alt="リボン装飾"` が 0件
- [ ] 装飾アイコンの `alt="アイコン"` が `alt=""` に変更されている
- [ ] 全ページの alt を精査した記録がある

**検証:**
```bash
grep -rn 'alt="予約バナー"' */index.html         # 0件
grep -rn 'alt="リボン装飾"' */index.html         # 0件
grep -rn 'alt="アイコン"' */index.html            # 確認（残すべきものがないか）
```

---

### RQ-07: SVG挿入方法の統一 + カラー違いSVGの統合

**何を:**
(A) 同一ページ内で inline SVG と `<img>` による SVG 読み込みが混在している箇所を統一する。
(B) カラー違いだけの SVG ファイルを統合し、CSS `currentColor` または `svg use` タグで色を制御する。

**なぜ:**
- 先方指摘(A)：「svgタグをそのまま挿入している部分とimgで挿入している部分の明確な使い分けがあるか。なければ統一」
- 先方指摘(B)：「カラーの違いだけで複数画像を書きだしされている。svg useタグで1つに統一できないか」
- 先方参考: https://wellnessland.co.jp/ の SVG 実装

**作業手順:**

**Step 1: 方針決定（先方確認）**

SVG 挿入方法の使い分けルールを決め、先方に共有:
- `<img>` で読み込む: 色変更不要な SVG（写真的な装飾、複雑なイラスト）
- inline SVG: CSSで色を動的に変更する必要がある SVG（hover で色が変わるアイコン等）
- `svg use` + `currentColor`: カラー違いのアイコン（arrow 系等）

**Step 2: カラー違い SVG の統合**

対象（調査済み）:
- `icon_arrow.svg`（白, 20x5）
- `icon_arrow_white.svg`（白, 21x6）
- `icon_arrow_blue.svg`（青, 31x6）
- `icon_arrow_gray.svg`（グレー, 21x6）
- その他のカラー違いアイコンを調査

作業:
- 共通 SVG スプライトファイルを作成（または `currentColor` 対応の単一 SVG）
- wellnessland.co.jp の実装を参考にする
- HTML の `<img>` を `<svg><use>` に置換、色は CSS で制御

**Step 3: inline SVG の整理**

現状（inline SVG 数）:
| ページ | 数 | 主な内容 |
|--------|---|---------|
| storelist | 276 | アイコン多数（要調査） |
| medical | 31 | アイコン |
| protein | 22 | ナビ矢印、購入ボタン等 |
| payment | 17 | アイコン |
| reservation | 16 | ナビ矢印 |
| price | 14 | ナビ矢印 |
| sportip | 12 | ナビ矢印 |
| visitor | 12 | アイコン |
| faq | 11 | アイコン |
| personal | 8 | アイコン |

- 同一 SVG の繰り返し inline → `<img>` または `<svg><use>` に置換
- CSS で色制御が必要な inline SVG → `currentColor` に変更して `<svg><use>` 化

**影響範囲:**
- 全ページの HTML
- `assets/img/common/` の SVG ファイル
- SCSS（色制御の追加）

**受け入れ基準:**
- [ ] 使い分けルールが決まり、先方に共有済み
- [ ] 同一ページ内で同じアイコンが inline SVG と `<img>` で混在していない
- [ ] カラー違いのみの SVG が統合されている（arrow 系は最低限）
- [ ] wellnessland.co.jp の実装を参考にした `svg use` or `currentColor` パターンが適用されている
- [ ] ブラウザ表示が変わらないこと

---

### RQ-08: table化すべき部分のHTML見直し + 共通化

**何を:**
表形式データを `<div>` + `flex` で表現している箇所を `<table>` に変更する。同一デザインは共通コンポーネント化する。

**なぜ:**
- 先方指摘：「p-price__item-row / p-protein__flavor-item などの table で表現できる部分をあえて div flex で作り直しているのは何か理由があるか」
- 先方指摘：「ほとんど同じデザインですが、共通コンポーネントでまとめることは難しいでしょうか」
- セマンティック HTML の観点で、表形式データには `<table>` が適切

**対象（調査済み）:**
| セレクタ | ページ | パターン |
|---------|--------|---------|
| `.p-price__item-row` | /price | flex, justify-content:space-between, border-bottom |
| `.p-protein__flavor-item` | /protein | flex, justify-content:space-between, border-bottom |

→ ほぼ同一の CSS。共通コンポーネント化が可能。

**作業手順:**

1. **全ページで table 相当のパターンを調査**
   - `display:flex` + `justify-content:space-between` + `border-bottom` のような行パターン
   - 名前と値のペアが繰り返される構造

2. **`<table>` に変換**
   - セマンティックに適切な `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` を使用
   - 既存のデザインを table CSS で再現

3. **共通コンポーネント化**
   - RQ-04 で設計した共通コンポーネントと連動
   - `c-data-table` 等の共通クラスを作成

**受け入れ基準:**
- [ ] 先方指摘の2箇所が `<table>` に変更されている
- [ ] 全ページで同種のパターンを調査・対処済み
- [ ] 同一デザインが共通コンポーネントにまとまっている
- [ ] ブラウザ表示が変わらないこと

---

### RQ-09: a > button入れ子の解消（/protein）

**何を:**
`/protein` の「ご購入はこちら」ボタンの `<a>` > `<button>` 入れ子を解消する。

**なぜ:**
- 先方指摘：「a タグ button タグを入れ子にしているのは何か理由があるか」
- HTML 仕様上、`<a>` の中に `<button>` はインタラクティブコンテンツの入れ子で不正

**現状（protein/index.html L1713-1735 他 計3箇所）:**
```html
<a href="..." target="_blank">
  <button type="button" class="btn-buyNow u-bg-red u-mt-20">
    ご購入はこちら <svg>...</svg>
  </button>
</a>
```

**作業手順:**

1. `<button>` を削除し、`<a>` にボタンのスタイルクラスを移動
2. クラス名 `btn-buyNow` → FLOCSS 準拠の命名にリネーム（例: `c-btn--buy` or `p-protein__buy-btn`）
3. SCSS を対応修正
4. 全ページで同様の `<a>` > `<button>` パターンがないか調査

**受け入れ基準:**
- [ ] `<a>` > `<button>` の入れ子が 0件
- [ ] クラス名が FLOCSS 準拠
- [ ] ブラウザ表示・クリック動作が変わらないこと
- [ ] 全ページで同様のパターンがないか調査済み

**検証:**
```bash
# 全ページで a > button パターンを検索
grep -rn '<button' */index.html | grep -v 'type="button" class="l-\|js-'
```

---

### RQ-10: /rules section入れ子・hタグ追加

**何を:**
`/rules` の section 入れ子を解消し、各規約項目に適切な見出しタグを追加する。

**なぜ:**
- 先方指摘：「section を入れ子にしている理由があるか」
- 先方指摘：「section 内に h タグを含んで作成してください（ガイドラインにも記載）」
- 先方指摘：「"適用範囲" などは見出しとして設定するのが適切」
- ガイドライン：「各 section には h2 以下の見出しと文章を含むこと」

**現状（rules/index.html L364-）:**
```html
<section class="p-rules">                          <!-- 外側 section -->
  <div class="p-rules__container">
    <section class="p-rules__container__item">      <!-- 入れ子 section -->
      <p class="p-rules__container__label">         <!-- p だが見出しが適切 -->
        <b>01</b>適用範囲
      </p>
```

**作業手順:**

1. 内側の `<section>` → `<div>` または `<article>` に変更（入れ子解消）
   - または外側の `<section>` をそのまま維持し、内側を `<div>` にする
2. `<p class="p-rules__container__label">` → `<h3>` に変更
3. SCSS セレクタを追従修正（`p` → `h3` の font-weight リセット等）
4. ブラウザ確認

**受け入れ基準:**
- [ ] section の不要な入れ子がない
- [ ] 各規約項目に `<h3>` 等の見出しタグがある
- [ ] SCSS が対応している
- [ ] ブラウザ表示が変わらないこと

---

### RQ-11: /personal イラスト alt・webp化

**何を:**
`/personal` のプログラムイラスト画像の alt を適切に修正し、PNG → WebP に変換する。コーディング再現の可否を判断する。

**なぜ:**
- 先方指摘：「alt="パーソナルプログラム01" と意味が伝わらない。なぜ alt を設定するのかを意識して」
- 先方指摘：「png になっているため書き出すのであれば webp に統一」
- 先方指摘：「コーディングで再現は難しいでしょうか」

**現状:**
- `img_personal_program_illustration02.png` — PNG（ラスター）
- `img_personal_program_illustration.svg` — SVG 版も存在
- `alt="パーソナルプログラム01"` — 内容を説明していない

**作業手順:**

1. **コーディング再現の可否判断**（先方確認前に調査）
   - SVG 版 (`img_personal_program_illustration.svg`) の内容を確認
   - HTML/CSS でコーディング再現が可能か判断
   - 判断結果を先方に共有

2. **画像として残す場合**
   - PNG → WebP に変換
   - alt を適切に設定（装飾なら `alt=""`、情報として必要なら内容を説明）
   - HTML の src パスを更新

3. **コーディング再現する場合**
   - HTML/CSS で再現し、画像を削除

**受け入れ基準:**
- [ ] コーディング再現の可否判断が記録されている
- [ ] 画像として残す場合: WebP 形式、適切な alt
- [ ] コーディング再現する場合: HTML/CSS で再現済み
- [ ] ブラウザ確認

---

## 完了後の全体検証

全チケット完了後、以下の最終検証を実施する:

- [ ] 全ページブラウザ確認（PC + SP）
- [ ] SCSS コンパイルエラーなし
- [ ] 先方フィードバックの12項目を1つずつ読み返し、対応漏れがないか確認
- [ ] 「指摘した以外の部分やページも再度確認してください」の要求に応えられているか確認
