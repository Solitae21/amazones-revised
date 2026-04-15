# 実行計画: RQ-08 補足 — storelist/[slag] 料金テーブル化

> コンテキスト: `docs/plans/feedback-improvement-context.md`
> 親Plan: `docs/plans/rq08-table-conversion-plan.md`
> 先方指摘: 「table で表現できる部分をあえて div flex で作り直しているのは何か理由があるか」「ほぼ同じデザインですが、共通コンポーネントでまとめることは難しいでしょうか」

---

## 背景

RQ-08（price/protein のテーブル化）の実施時に、`_price.scss` から旧セレクタ `.p-price__item-row` を削除した。
しかし `storelist/[slag]/index.html` が同じ `p-price__item-row` クラスを使用して料金テーブルを表示しており、スタイルが崩れた状態になっている。

### なぜ見落としたか

親 Plan の調査時に storelist を「該当なし」と判定したが、`storelist/index.html`（一覧ページ）のみを調査し、`storelist/[slag]/index.html`（店舗詳細ページ）を見落としていた。

---

## 対象箇所

`storelist/[slag]/index.html` の料金セクション。price/index.html と**完全に同一の HTML 構造・同一のクラス名・同一のグループ構成**。

| グループ | 行数 | 行番号 |
|---------|------|--------|
| 基本料金 | 5行 | L1832-1867 |
| 初期費用 — 入会金 | 1行 | L2490-2495 |
| 初期費用 — セキュリティ | 1行 | L2498-2503 |
| オプション左列 | 4行 | L2525-2549 |
| オプション右列 | 4行 | L2552-2583 |

計15行、5テーブル。

---

## チケット一覧

| # | 内容 | 影響ファイル |
|---|------|------------|
| 1 | storelist/[slag]/index.html の `p-price__item-row` を `<table>/<tr>/<th>/<td>` に変換 | storelist/[slag]/index.html のみ |

SCSS の変更は不要（price チケット2 で `p-price__table` のセレクタは定義済み、`c-data-table` も作成済み）。

---

## チケット1: storelist/[slag] 料金テーブル化

### 何を

storelist/[slag]/index.html の `p-price__item-row` で構成された料金リスト（5グループ、計15行）を price/index.html と同じ `<table>` 構造に変換する。

### なぜ

1. 先方指摘「table で表現できる部分をあえて div flex で作り直しているのは何か理由があるか」への対応漏れ
2. RQ-08 で `_price.scss` から旧セレクタを削除済みのため、現状スタイルが崩れている
3. 名前↔金額の対応関係は tabular data であり `<table>` が適切

### 作業内容

price/index.html で実施したものと同一の変換:
- `<div class="p-price__text-container">` 内に `<table class="c-data-table p-price__table">` を配置
- `<div class="p-price__item-row">` → `<tr>`
- `<p class="p-price__item-row__name">` → `<th>`（`<span>` はそのまま `<th>` 内に残す）
- `<p class="p-price__item-row__value">` → `<td>`

### 受け入れ基準

- [ ] 全5グループの `p-price__item-row` が `<table>/<tr>/<th>/<td>` に変換されている
- [ ] 共通クラス `c-data-table` と `p-price__table` が各 `<table>` に適用されている
- [ ] HTML に `p-price__item-row` が残っていないこと
- [ ] SCSS の変更なし（既存の `p-price__table` セレクタで対応可能）
- [ ] ブラウザ表示が price/index.html と同一であること（PC/SP 両方）

### 検証

```bash
# 旧クラスが残っていないか
grep -n 'p-price__item-row' storelist/\[slag\]/index.html
# → 0件

# table構造
grep -c '<table' storelist/\[slag\]/index.html

# 共通クラス
grep -c 'c-data-table' storelist/\[slag\]/index.html

# コンパイル確認（SCSS変更なしのため不要だが念のため）
npx sass assets/scss/global.scss /dev/null

# ブラウザ確認: storelist/[slag]/index.html の料金セクションを PC/SP で目視
```
