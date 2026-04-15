# 実行計画: Phase 3 — body 継承ユーティリティの一括削除

> 元チケット: `docs/plans/feedback-index-plan.md` チケット 3-1
> 前提: Phase 0（body デフォルト設定）完了済み
> デザイン基準: font-weight: 500 確認済み

---

## 概要

body / html に設定済みのデフォルトスタイルと同じ値のユーティリティクラスを、全 HTML ファイルから削除する。
SCSS の変更は不要（body 継承で同じ表示になるため）。

---

## body の設定（`_reset.scss`）

```scss
html, body {
  font-family: var(--font-zen);   // Zen Kaku Gothic New
  font-size: 16px;
  font-weight: 500;
  color: var(--text-black1);
}
h1, h2, h3, h4, h5, h6 {
  font-weight: inherit;           // ブラウザデフォルト bold を解除
}
```

---

## 削除対象と数量

| # | ユーティリティ | 値 | 総数 | 削除可能 | 除外 | 削除率 |
|---|--------------|-----|------|---------|------|--------|
| A | `u-fw-500` | font-weight: 500 | 450 | 444 | 6 | 98.7% |
| B | `u-fs-16` | font-size: 16px | 418 | 418 | 0 | 100% |
| C | `u-font-zen` | font-family: var(--font-zen) | 673 | 488 | 185 | 72.5% |
| D | `u-text-black1` | color: var(--text-black1) | 38 | 36 | 2 | 94.7% |
| | **合計** | | **1,579** | **1,386** | **193** | **87.8%** |

---

## ファイル別の削除数

| ファイル | u-fw-500 | u-fs-16 | u-font-zen | u-text-black1 | 合計 |
|---------|----------|---------|------------|---------------|------|
| index.html | 44 | 37 | 1 | 0 | 82 |
| about/index.html | 15 | 19 | 1 | 0 | 35 |
| admission/index.html | 37 | 36 | 1 | 0 | 74 |
| column/index.html | 13 | 13 | 1 | 0 | 27 |
| column/[slag]/index.html | 35 | 38 | 1 | 0 | 74 |
| contact/index.html | 0 | 2 | 1 | 0 | 3 |
| family/index.html | 14 | 26 | 3 | 0 | 43 |
| faq/index.html | 65 | 112 | 1 | 0 | 178 |
| information/index.html | 0 | 0 | 1 | 0 | 1 |
| medical/index.html | 13 | 15 | 71 | 7 | 106 |
| member/index.html | 41 | 1 | 1 | 0 | 43 |
| payment/index.html | 0 | 0 | 38 | 0 | 38 |
| personal/index.html | 1 | 0 | 41 | 4 | 46 |
| point_redemption/index.html | 22 | 39 | 3 | 0 | 64 |
| price/index.html | 4 | 0 | 117 | 0 | 121 |
| protein/index.html | 73 | 17 | 127 | 0 | 217 |
| reservation/index.html | 0 | 0 | 26 | 0 | 26 |
| rules/index.html | 25 | 25 | 1 | 25 | 76 |
| sitemap/index.html | 10 | 5 | 1 | 0 | 16 |
| sportip/index.html | 6 | 3 | 37 | 0 | 46 |
| storelist/index.html | 0 | 0 | 10 | 0 | 10 |
| storelist/[slag]/index.html | 28 | 22 | **除外** | 2 | 52 |
| visitor/index.html | 4 | 8 | 4 | 0 | 16 |

---

## 除外条件

### A. u-fw-500 の除外（6箇所）

h1-h6 タグに付いている u-fw-500。h1-h6 は `font-weight: inherit` でリセット済みのため理論上は削除可能だが、
親コンポーネントの SCSS が font-weight: 500 以外を設定している場合は削除不可。

**削除前に個別確認が必要な箇所:**

| ファイル | 行（概算） | 要素 | 確認内容 |
|---------|-----------|------|---------|
| index.html | ~317 | h1.c-reveal | 親の font-weight 設定 |
| about/index.html | ~549 | h1.c-reveal | 同上 |
| personal/index.html | ~379 | h1.c-reveal | 同上 |
| medical/index.html | ~504 | h1.c-reveal | 同上 |
| medical/index.html | ~540 | h5 | 同上 |
| sportip/index.html | ~505 | h1.c-reveal | 同上 |

### B. u-fs-16 の除外

なし。全418箇所削除可能。

### C. u-font-zen の除外（185箇所）

`storelist/[slag]/index.html` のみ除外。理由:
- `storedetail-introduction.css` が `html { font-family: kozuka-gothic-pr6n }` を設定
- body の `var(--font-zen)` が上書きされるため、u-font-zen で Zen Kaku Gothic New に戻す必要がある

他の全ページ（22ファイル）の u-font-zen は削除可能。

### D. u-text-black1 の除外（2箇所）

`storelist/[slag]/index.html` 内の2箇所。
他36箇所は削除可能だが、念のため親要素が別の color を設定していないか削除時に確認する。

---

## 処理順序

### Step 1: u-fs-16 の削除（418箇所、除外なし）

最もリスクが低い。ブラウザデフォルトが 16px であり、body 設定も 16px。
二重の安全性がある。

**手順:**
1. 全 HTML ファイルの class 属性から `u-fs-16` を削除
2. 削除後に grep で残存が 0 件であることを確認
3. コンパイル確認

### Step 2: u-fw-500 の削除（444箇所 + h1-h6 の6箇所を個別確認）

**手順:**
1. h1-h6 の6箇所について親コンポーネントの SCSS を確認
2. 全 HTML ファイルの class 属性から `u-fw-500` を削除（除外対象がある場合は後で戻す）
3. 削除後に grep で残存を確認
4. コンパイル確認

### Step 3: u-font-zen の削除（488箇所、storelist/[slag] 除外）

**手順:**
1. storelist/[slag]/index.html **以外**の全 HTML ファイルから `u-font-zen` を削除
2. storelist/[slag]/index.html の u-font-zen が残存していることを確認
3. コンパイル確認

### Step 4: u-text-black1 の削除（36箇所、storelist/[slag] 除外）

**手順:**
1. 対象4ファイル（personal, medical, rules, storelist/[slag]）の該当箇所を確認
2. 親要素が別の color を設定していないか確認
3. storelist/[slag]/index.html の2箇所を除き削除
4. 削除後に grep で残存を確認

### Step 5: 検証

1. SCSS コンパイル: `npx sass assets/scss/global.scss assets/css/global.css --no-source-map`
2. 全ページをブラウザで PC / SP 確認
3. 特に注意するページ:
   - storelist/[slag]/ — u-font-zen を残しているので表示が正しいか
   - rules/ — u-text-black1 が25箇所あった（最多）
   - faq/ — u-fs-16 が112箇所（最多）、u-fw-500 が65箇所

---

## 受け入れ基準

- [ ] `u-fw-500` の残存が h1-h6 の除外対象のみ（または 0 件）
- [ ] `u-fs-16` の残存が 0 件
- [ ] `u-font-zen` の残存が storelist/[slag]/index.html のみ（185箇所）
- [ ] `u-text-black1` の残存が storelist/[slag]/index.html のみ（2箇所）
- [ ] SCSS コンパイルが成功する
- [ ] 全ページで見た目が変わっていない

---

## クラス削除時の注意

- `class="u-fw-500 u-fs-16 u-font-zen"` → `class=""` のように空になる場合、class 属性ごと削除してもよい
- `class="u-fw-500 u-lh-200"` → `class="u-lh-200"` のように他クラスが残る場合、スペースの重複に注意
- 正規表現での置換時、`u-fw-500` が `u-fw-5000` 等の部分マッチにならないよう単語境界を考慮する
