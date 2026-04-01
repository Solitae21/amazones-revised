# Step 1 実行計画: 変数定義の整備（カラー・フォントサイズ）

作成日: 2026-03-29
紐づき: `css-refactoring-plan.md` Step 1
準拠元: `cording-guideline.md`

---

## 目的

CSS変数（カスタムプロパティ）を整備し、ハードコードされたカラーコード・フォントサイズを `var()` に置き換える。
後続の Step 2〜8 でセレクタやクラス名を修正する際、変数が整備されていることでスタイルの一貫性を保ちやすくなる。

---

## 最重要原則（再掲）

**フロントエンドの表示結果は一切変更しないこと。**

---

## 現在の `:root` 変数定義

`_global.scss` 6〜34行目に以下が定義済み:

```scss
:root {
  /* ベースカラー */
  --base-black: #4f4f4f;
  --base-gray: #eef0f3;
  --base-lightGray: #fdfdfd;
  --base-grayBlue: #97a5b5;
  --base-white: #ffffff;
  --base-lightBlue: #81d8d0;
  --base-red: #f53662;
  --base-lightPink: #f53561;
  --base-peach: #ec73b2;
  --base-brown: #8c4239;
  --base-darkGray: #97a5b5;
  --base-darkBlueGray: #98a6b5;
  --base-inputGray: #cdd6dd;

  /* テキストカラー */
  --text-black1: #4f4f4f;
  --text-white: #ffffff;
  --text-lightBlue: #81d8d0;
  --text-red: #f53662;
  --text-peach: #ec73b2;
  --text-brown: #8c4239;
  --text-lightPink: #f53561;

  /* フォント */
  --font-outfit: "Outfit";
  --font-zen: "Zen Kaku Gothic New";
}
```

既存変数: ベース13色 + テキスト7色 = 20変数（重複値あり）
フォントサイズ変数: 0件

---

## Phase A: `:root` への新規変数追加

### 作業内容

`:root` ブロックに以下を追加する。**定義を追加するだけで、使用箇所はまだ変更しない。**

### A-1. 新規カラー変数

| カラーコード | 変数名 | 用途 |
|---|---|---|
| `#faf8f5` | `--base-bgBeige` | body背景 |
| `#fafcfb` | `--base-bgLinearTop` | グラデーション開始色 |
| `#333` | `--base-darkText` | 濃いテキスト |
| `#555` | `--base-mediumText` | 中間テキスト |
| `#ccc` | `--base-borderGray` | ボーダー（disabled等） |
| `#f5f5f5` | `--base-lightBg` | 薄い背景 |
| `#003032` | `--base-darkGreen` | 濃い緑 |
| `#5eada5` | `--base-greenAccent` | 緑アクセント |
| `#6c5ce7` | `--base-purple` | 紫 |
| `#5b4bc4` | `--base-darkPurple` | 濃い紫 |
| `#1a1a2e` | `--base-navy` | ネイビー |
| `#e0e0e0` | `--base-borderLight` | 薄いボーダー |
| `#eee` | `--base-borderLightGray` | 薄いグレーボーダー |
| `#4cc764` | `--base-successGreen` | 成功色 |

### A-2. storedetail-introduction 専用カラー変数

WordPress由来の `_storedetail-introduction.scss` で繰り返し使われる色。
名前空間 `--intro-*` で分離する。

| カラーコード | 変数名 | 使用箇所数 |
|---|---|---|
| `#e5e7eb` | `--intro-border` | 約20箇所 |
| `#4e6269` | `--intro-darkGreen` | 約30箇所 |
| `#5fced8` | `--intro-cyan` | 約45箇所 |
| `#a6bdc2` | `--intro-borderSage` | 約15箇所 |
| `#f3f4f6` | `--intro-lightBg` | 約10箇所 |
| `#314348` | `--intro-darkText` | 3箇所 |
| `#ffff00` | `--intro-yellow` | 約10箇所 |

### A-3. フォントサイズ変数

| 変数名 | 値 | px相当 |
|---|---|---|
| `--fs-xs` | `0.75rem` | 12px |
| `--fs-2xs` | `0.8125rem` | 13px |
| `--fs-sm` | `0.875rem` | 14px |
| `--fs-sm2` | `0.9375rem` | 15px |
| `--fs-base` | `1rem` | 16px |
| `--fs-md` | `1.125rem` | 18px |
| `--fs-lg` | `1.25rem` | 20px |
| `--fs-lg2` | `1.375rem` | 22px |
| `--fs-xl` | `1.5rem` | 24px |
| `--fs-xl2` | `1.75rem` | 28px |
| `--fs-2xl` | `1.875rem` | 30px |
| `--fs-2xl2` | `2rem` | 32px |
| `--fs-3xl` | `2.25rem` | 36px |
| `--fs-4xl` | `2.5rem` | 40px |
| `--fs-5xl` | `3rem` | 48px |
| `--fs-6xl` | `3.75rem` | 60px |
| `--fs-7xl` | `4rem` | 64px |
| `--fs-8xl` | `4.5rem` | 72px |
| `--fs-9xl` | `5rem` | 80px |
| `--fs-display` | `6.25rem` | 100px |

### リスク: なし

変数を定義するだけで、使用箇所を変更しないため、見た目への影響はゼロ。

---

## Phase B: 既存変数へのカラー置換

### 作業内容

既に `:root` に定義されているカラーと同じ値がハードコードされている箇所を `var()` に置き換える。

### B-1. `#4f4f4f` → `var(--base-black)`

| ファイル | 行番号 | プロパティ |
|---|---|---|
| `_medical.scss` | 95, 450 | color |
| `_personal.scss` | 97, 214 | color |
| `_protein.scss` | 60 | color |
| `_storedetail.scss` | 10 | color |
| `_storedetail.scss` | 462-469, 488-495 | text-shadow（要注意: 多値プロパティ） |

### B-2. `#f53662` → `var(--base-red)`

| ファイル | 行番号 | プロパティ |
|---|---|---|
| `_medical.scss` | 132 | color |
| `_payment.scss` | 151 | color |

### B-3. `#f53561` → `var(--base-lightPink)`

| ファイル | 行番号 | プロパティ |
|---|---|---|
| `_admission.scss` | 123 | color |

### B-4. `#97a5b5` → `var(--base-grayBlue)`

| ファイル | 行番号 | プロパティ |
|---|---|---|
| `_price.scss` | 120 | color |

### B-5. `#ffffff` / `#fff` → `var(--base-white)`

対象ファイル: `_global.scss`, `_storedetail.scss`, `_price.scss`, `_protein.scss`, `_contact.scss`, `_column-slag.scss`, `_storedetail-introduction.scss`
対象箇所: 約30箇所（コメント内・`0 0 #0000` のTailwind由来値は除外）

### B-6. `white` キーワード → `var(--base-white)`

対象ファイル: 全SCSSファイル（約80箇所）
除外: コメント内

### リスク: 低

同一カラーコードの単純置換のため、見た目への影響なし。
ただし `text-shadow` 内（B-1）はブラウザ確認を推奨。

---

## Phase C: 新規変数へのカラー置換

### C-1. `_global.scss` 内の置換

| 行 | 旧値 | 新値 |
|---|---|---|
| 39 | `#faf8f5` | `var(--base-bgBeige)` |
| 80 | `#fafcfb` | `var(--base-bgLinearTop)` |
| 5851 | `#6c5ce7` | `var(--base-purple)` |
| 5861 | `#5b4bc4` | `var(--base-darkPurple)` |
| 5865 | `#ccc` | `var(--base-borderGray)` |
| 6687 | `#eee` | `var(--base-borderLightGray)` |
| 6702 | `#333` | `var(--base-darkText)` |
| 6708 | `#eee` | `var(--base-borderLightGray)` |
| 6776 | `#f5f5f5` | `var(--base-lightBg)` |
| 6783 | `#333` | `var(--base-darkText)` |
| 6837 | `#555` | `var(--base-mediumText)` |
| 7706 | `#003032` | `var(--base-darkGreen)` |
| 8026 | `#1a1a2e` | `var(--base-navy)` |
| 8053, 8057 | `#5eada5` | `var(--base-greenAccent)` |
| 8107, 8112 | `#5eada5` | `var(--base-greenAccent)` |
| 10143 | `#f5f5f5` | `var(--base-lightBg)` |

### C-2. ページ別SCSSの置換

| ファイル | 旧値 | 新値 | 箇所数 |
|---|---|---|---|
| `_storelist.scss` | `#333` | `var(--base-darkText)` | 1 |
| `_storelist.scss` | `#555` | `var(--base-mediumText)` | 1 |
| `_column-slag.scss` | `#333` | `var(--base-darkText)` | 2 |
| `_storedetail.scss` | `#555` | `var(--base-mediumText)` | 2 |
| `_storedetail.scss` | `#1a1a2e` | `var(--base-navy)` | 3 |
| `_storedetail.scss` | `#eee` | `var(--base-borderLightGray)` | 1 |
| `_storedetail.scss` | `#ddd` | ※1回限りの固有色 → 変数化しない | — |
| `_medical.scss` | `#e0e0e0` | `var(--base-borderLight)` | 1 |
| `_medical.scss` | `#4cc764` | `var(--base-successGreen)` | 1 |
| `_storedetail.scss` | `#e0e0e0` | `var(--base-borderLight)` | 1 |
| `_top.scss` | `#fafcfb` | `var(--base-bgLinearTop)` | 1 |
| `_storedetail.scss` | `#fafcfb` | `var(--base-bgLinearTop)` | 1 |
| `_visitor.scss` | `#333` | `var(--base-darkText)` | 1 |

### C-3. `_storedetail-introduction.scss` の置換（高リスク）

段階的に1色ずつ置換する。各色の置換後にコンパイル+ブラウザ確認を行う。

| 順番 | 旧値 | 新値 | 箇所数 |
|---|---|---|---|
| 1 | `#5fced8` | `var(--intro-cyan)` | 約45 |
| 2 | `#4e6269` | `var(--intro-darkGreen)` | 約30 |
| 3 | `#e5e7eb` | `var(--intro-border)` | 約20 |
| 4 | `#a6bdc2` | `var(--intro-borderSage)` | 約15 |
| 5 | `#f3f4f6` | `var(--intro-lightBg)` | 約10 |
| 6 | `#314348` | `var(--intro-darkText)` | 3 |
| 7 | `#ffff00` | `var(--intro-yellow)` | 約10 |

### リスク評価

| 対象 | リスク | 理由 |
|---|---|---|
| 単純プロパティ（color, background-color, border-color） | 低 | 機械的置換 |
| border shorthand 内 | 中 | `var()` はモダンブラウザで問題なし |
| グラデーション内 | 中 | 要テスト |
| text-shadow / box-shadow 内 | 中 | 多値プロパティだが問題なし |
| `_storedetail-introduction.scss` 全体 | 高 | WordPress由来、1色ずつ段階的に |

---

## Phase D: フォントサイズの変数置換

### 対象範囲

- コンポーネント・レイアウト内で直書きされている `font-size` のみ
- ユーティリティクラス定義（`.fs-*`, `.lg-fs-*`, `.sm-fs-*`）は対象外

### 除外条件

以下は変数化しない:

- `calc()` 式（例: `calc(100 / 375 * 23 * 1vw)`）
- `clamp()` 式
- `vw` 単位
- `em` 単位（親要素依存）
- `font-size: 0`（レイアウトハック）
- `_storedetail-review.scss` 全体（第三者コード）

### D-1. `_global.scss`（ユーティリティ除外後: 約50箇所）

セクションヘッダー、ヘッダー、ナビゲーション、フッター、バナー、コンポーネント等。

### D-2. ページ別SCSS（introduction除外: 約170箇所）

| ファイル | 箇所数 | 優先順 |
|---|---|---|
| `_storedetail.scss` | 46 | 1 |
| `_medical.scss` | 36 | 2 |
| `_reservation.scss` | 30 | 3 |
| `_protein.scss` | 25 | 4 |
| `_sportip.scss` | 18 | 5 |
| `_personal.scss` | 18 | 6 |
| `_price.scss` | 14 | 7 |
| `_contact.scss` | 13 | 8 |
| `_column-slag.scss` | 12 | 9 |
| `_storelist.scss` | 10 | 10 |
| `_top.scss` | 8 | 11 |
| `_point_redemption.scss` | 7 | 12 |
| `_about.scss` | 5 | 13 |
| `_sitemap.scss` | 2 | 14 |
| `_faq.scss` | 1 | 15 |

### D-3. `_storedetail-introduction.scss`（約230箇所 — 最後に対応）

- rem値 → 標準サイズ変数にマッピング可能なもののみ変数化
- px値 → rem相当の変数にマッピング可能なもののみ変数化（例: `14px` → `var(--fs-sm)`）
- 装飾的巨大フォントサイズ（40px〜200px）は除外

### リスク: 中〜高

px → rem変数への置換では、ブラウザの計算値が完全に同一であることを確認する必要がある。

---

## 変数化対象外（カラー）

以下は1回限りの固有色、または外部由来のため変数化しない。

| カテゴリ | カラー | ファイル |
|---|---|---|
| Googleブランドカラー | `#6186ec`, `#cd523f`, `#eabe43`, `#63a45d` | `_storedetail.scss` |
| Googleスター / ボタン色 | `#fbbc04`, `#1a73e8`, `#1557b0` | `_storedetail.scss` |
| `rgba()` 内のカラー（約40箇所） | — | 全ファイル |
| `_storedetail-review.scss` 全体 | — | 第三者ウィジェット |
| ページ固有の1回限り色 | `#3bb8b8`, `#999`, `#aaa`, `#f0f0f0` 等 | 各ファイル |

---

## 検証方法

各Phase完了時に以下を実施:

1. SCSSコンパイルがエラーなく通ること
2. 主要ページ（トップ、about、medical、storedetail、storedetail-introduction）をPC/SPでブラウザ確認
3. 変更前後のCSSの計算値が同一であることをDevToolsで確認

---

## 作業順序まとめ

```
Phase A: :root に変数定義を追加（見た目影響ゼロ）
  ↓
Phase B: 既存変数と同一のハードコード値を var() に置換（低リスク）
  ↓
Phase C-1: _global.scss 内のカラー置換（低リスク）
Phase C-2: ページ別SCSS のカラー置換（中リスク）
Phase C-3: _storedetail-introduction.scss のカラー置換（高リスク、1色ずつ）
  ↓
Phase D-1: _global.scss のフォントサイズ置換
Phase D-2: ページ別SCSS のフォントサイズ置換
Phase D-3: _storedetail-introduction.scss のフォントサイズ置換（最後）
```
