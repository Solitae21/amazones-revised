# RQ チケット実行プロンプト集

> Plan: `docs/plans/feedback-refactoring-quality-plan.md`
> 実行順: RQ-01 → RQ-02 → RQ-03 → RQ-04 → RQ-08 → RQ-05, 06, 07, 09, 10, 11（並行可）

---

## RQ-01: body line-height 見直し

```
## 作業指示: RQ-01 body line-height 見直し

### コンテキスト
- Plan: `docs/plans/feedback-refactoring-quality-plan.md` の RQ-01
- 先方フィードバック: `docs/fix/feedback-of-refactalinc` L18-21
- ガイドライン: `docs/cording-guideline.md`

### 現状
- `assets/scss/foundation/_reset.scss` L8: `line-height: 100%`（= line-height: 1、行間なし）
- この設定のせいで全コンポーネントに個別の line-height 指定が必要になっている
- 先方：「全体を通して 1.8 程度のデザイン」

### 作業内容
1. `assets/scss/foundation/_reset.scss` L8 の `line-height: 100%` を `line-height: 1.8` に変更
2. SCSS コンパイル確認
3. 変更後に崩れが想定される箇所を調査:
   - ボタン内テキスト、ラベル、バッジ等の一行要素（line-height が増えると上下余白が変わる）
   - 以下のコマンドで既に `line-height: 1` や `line-height: normal` を指定している箇所を確認:
     ```bash
     grep -rn 'line-height: 1;' assets/scss/
     grep -rn 'line-height: normal' assets/scss/
     ```
4. 崩れた箇所は個別に `line-height` を指定して対処。対処した箇所をリストアップ

### 受け入れ基準
- [ ] `_reset.scss` の body line-height が `1.8` に変更されている
- [ ] SCSS コンパイル通過
- [ ] 崩れ対処箇所のリストがある

### 注意
- この変更は全ページに影響する。慎重に作業すること
- 見た目を絶対に崩さない（CLAUDE.md 原則2）
```

---

## RQ-02: line-height 単位統一

```
## 作業指示: RQ-02 line-height 単位統一 → 単位なし

### コンテキスト
- Plan: `docs/plans/feedback-refactoring-quality-plan.md` の RQ-02
- 前提: RQ-01 完了済み（body line-height: 1.8）

### 現状
line-height に px / em / rem / % が混在（project/ 内だけで約290箇所）:
- px: 35箇所
- em: 65箇所
- rem: 90箇所
- %: 2箇所
- 単位なし: 98箇所（これが正）

component/ 内: 11箇所、_global-responsive.scss: 17箇所も対象。

### 作業内容

#### Step 1: body 継承で不要な line-height を削除
RQ-01 で body が 1.8 になったため、以下は削除可能:
- `line-height: 1.8`
- `line-height: 1.8em`
- `line-height: 180%`
- `line-height: 1.8rem`（※ font-size が 1rem の場合のみ）
削除前にブラウザで変化がないことを確認。

#### Step 2: 残りの line-height を単位なしに変換
- px → デザインと照合（例: line-height: 30px, font-size: 16px → line-height: 1.875）
- em → 数値そのまま（例: 2em → 2）
- rem → font-size との比率で算出
- % → 100で割る（例: 200% → 2）

#### Step 3: 検証
```bash
# 全て0件であること
grep -rn 'line-height:.*px' assets/scss/object/ assets/scss/_global-responsive.scss
grep -rn 'line-height:.*[0-9]em' assets/scss/object/ assets/scss/_global-responsive.scss
grep -rn 'line-height:.*rem' assets/scss/object/ assets/scss/_global-responsive.scss
grep -rn 'line-height:.*%' assets/scss/object/ assets/scss/_global-responsive.scss
```

### 受け入れ基準
- [ ] line-height に px / em / rem / % が残っていない（0件）
- [ ] body 継承と同値の不要な line-height が削除されている
- [ ] SCSS コンパイル通過
- [ ] ブラウザ確認（主要ページ PC + SP）

### 注意
- px → 単位なし変換時は、その要素の font-size を確認して正しい比率を算出すること
- 見た目を絶対に崩さない
```

---

## RQ-03: font-size 単位統一

```
## 作業指示: RQ-03 font-size 単位統一 → rem + 誤差値の正規化

### コンテキスト
- Plan: `docs/plans/feedback-refactoring-quality-plan.md` の RQ-03

### 現状
- project/ の px 指定: 104箇所
- component/ の px 指定: 9箇所
- 誤差値: `6.259rem` と `6.25rem` が混在

### 作業内容

#### Step 1: px → rem 変換（16px = 1rem 基準）
対象ファイル:
- `assets/scss/object/project/` 全ファイル
- `assets/scss/object/component/` 全ファイル
- `assets/scss/_global-responsive.scss`

変換例:
- 12px → 0.75rem
- 14px → 0.875rem
- 18px → 1.125rem
- 20px → 1.25rem
- 24px → 1.5rem
- 32px → 2rem
- 36px → 2.25rem
- 60px → 3.75rem
- 100px → 6.25rem

除外:
- `calc()` 内の px はそのまま残す（レスポンシブ計算に px が必要）
- CSS 変数 `var(--fs-*)` 使用箇所は変換不要

#### Step 2: 誤差値の正規化
- `6.259rem` → `6.25rem` に統一
- 全 rem 値を一覧化し、微差を統一

#### Step 3: 検証
```bash
# calc() 内を除いて 0件であること
grep -rn 'font-size:.*px' assets/scss/object/ | grep -v 'calc('
grep -rn 'font-size:.*px' assets/scss/object/component/
# 誤差値の確認
grep -rn '6\.259' assets/scss/
```

### 受け入れ基準
- [ ] font-size の px 指定が 0件（calc() 内を除く）
- [ ] 誤差値が正規化されている
- [ ] SCSS コンパイル通過
- [ ] ブラウザ確認

### 注意
- CSS 変数 `var(--fs-*)` が定義されている値と同じ px 値は、rem 変換ではなく変数に置き換える方が望ましい
- `_variables.scss` の `--fs-*` 定義を確認してから作業すること
```

---

## RQ-04: 重複CSS調査 + 共通コンポーネント統合

```
## 作業指示: RQ-04 重複CSS調査 + 共通コンポーネント統合

### コンテキスト
- Plan: `docs/plans/feedback-refactoring-quality-plan.md` の RQ-04
- 先方指摘例: p-price__links-nav / p-reservation-flow__nav、p-price__title / p-protein__section-header

### 作業内容

#### Step 1: 調査済みの重複ナビパターンを共通化

以下は完全一致（gap:2rem, mb:10rem）:
- p-price__links-nav（_price.scss L5）
- p-reservation-flow__nav（_reservation.scss L93）
- p-payment__links-nav（_payment.scss L70）
- p-sportip__links-nav（_sportip.scss L171）

近似（mb のみ異なる）:
- p-storelist__links-nav（_storelist.scss L10, mb:7rem）
- p-storedetail__links-nav（_storedetail.scss L112, gap:3rem, mb:7rem）

作業:
1. `assets/scss/object/component/_page-nav.scss` を新規作成
2. 共通定義 `.c-page-nav` を作成。差異は modifier で対応
3. `global.scss` に import 追加
4. 対象ページの HTML クラスを `.c-page-nav` に変更
5. 各 project SCSS から重複ナビ定義を削除
6. レスポンシブ定義も移行

#### Step 2: セクションタイトルパターンの共通化

p-price__title（6.25rem, weight:400, outfit）と p-protein__section-header h2 を比較し、
共通コンポーネント化の可否を判断。

#### Step 3: 全ページ横断で追加の重複を調査

以下の観点で全 project SCSS を確認:
- 同一プロパティセットの繰り返し
- font-family: var(--font-outfit) を使うクラス（20箇所以上）のうち統合可能なもの
- CTA、カード、リスト等の共通パターン

調査結果を記録し、統合対象を一覧化。

### 受け入れ基準
- [ ] ナビパターン4箇所以上が共通コンポーネントに統合
- [ ] 全ページ横断調査の結果が記録されている
- [ ] 新コンポーネントが FLOCSS `c-*` 命名
- [ ] 各ページのブラウザ表示が変わらないこと
- [ ] SCSS コンパイル通過
```

---

## RQ-05: 不要なタグ入れ子の解消

```
## 作業指示: RQ-05 不要なタグ入れ子の解消（全ページ横断）

### コンテキスト
- Plan: `docs/plans/feedback-refactoring-quality-plan.md` の RQ-05
- 先方例示: /sportip の p-sportip__links-item, p-sportip__flex-col

### 作業内容

#### Step 1: 先方例示箇所の修正

(a) sportip/index.html L569, 587, 605:
```html
<!-- Before -->
<a href="#sportip"><div class="p-sportip__links-item"><span>Sportip</span><svg>...</svg></div></a>
<!-- After: div を削除、スタイルを a に移動 -->
```

(b) sportip/index.html L1138: p-sportip__flex-col の必要性を確認

#### Step 2: 全ページ横断調査

以下のページで a > div パターンを確認:
- information: 25箇所
- payment: 6箇所
- reservation: 5箇所
- sportip: 5箇所
- price: 4箇所
- medical: 2箇所

各箇所で div が本当に不要か（スタイル上の理由があるか）を確認し、不要なら削除。

#### Step 3: SCSS セレクタの追従修正

HTML からクラスを削除/移動した場合、対応する SCSS セレクタを修正。

### 検証
- 修正箇所のリストを記録
- 各ページブラウザ確認

### 受け入れ基準
- [ ] 先方例示箇所が修正されている
- [ ] 全ページ調査・修正済み
- [ ] SCSS が HTML 変更に追従
- [ ] ブラウザ表示が変わらないこと
```

---

## RQ-06: alt属性の適正化

```
## 作業指示: RQ-06 alt属性の適正化

### コンテキスト
- Plan: `docs/plans/feedback-refactoring-quality-plan.md` の RQ-06
- ガイドライン: 「img は装飾目的での利用であれば alt は空白でも問題ない」

### 作業内容

#### 一括修正
1. `alt="予約バナー"` → `alt=""`（18箇所、全ページのバナー背景画像）
2. `alt="リボン装飾"` → `alt=""`（18箇所、装飾リボン）
3. `alt="アイコン"` → `alt=""`（装飾アイコン。ただしリンク内で唯一のコンテンツの場合は alt を残す）

#### 全ページ精査
全ページの img タグの alt を確認し、以下を判定:
- 装飾画像（背景、リボン、アイコン等） → `alt=""`
- コンテンツ画像（写真、図解等で情報を伝える） → 内容を説明する適切な alt
- ロゴ → `alt="アマゾネス"` 等はそのまま（ブランド名として意味がある）

### 検証
```bash
grep -rn 'alt="予約バナー"' */index.html         # 0件
grep -rn 'alt="リボン装飾"' */index.html         # 0件
```

### 受け入れ基準
- [ ] alt="予約バナー" が 0件
- [ ] alt="リボン装飾" が 0件
- [ ] 装飾アイコンの alt="アイコン" が alt="" に変更
- [ ] 全ページの alt 精査記録あり
```

---

## RQ-07: SVG挿入方法の統一 + カラー違い統合

```
## 作業指示: RQ-07 SVG挿入方法の統一 + カラー違いSVGの統合

### コンテキスト
- Plan: `docs/plans/feedback-refactoring-quality-plan.md` の RQ-07
- 先方参考: https://wellnessland.co.jp/ のSVG実装
- 先方例示: /protein メインビジュアルのリボンは img、よくあるご質問のリボンは svg

### 作業内容

#### Part A: SVG挿入方法の統一

使い分けルール:
- `<img>`: 色変更不要な SVG
- inline SVG: CSS で色を動的に変更する SVG（hover 等）
- `<svg><use>` + currentColor: カラー違いのアイコン

各ページの inline SVG を確認（多い順）:
- storelist: 276（最優先で調査）
- medical: 31
- protein: 22
- payment: 17
- reservation: 16
- price: 14
- sportip: 12
- visitor: 12
- faq: 11
- personal: 8

同一 SVG の繰り返し inline → `<img>` または `<svg><use>` に置換。

#### Part B: カラー違い SVG の統合

対象:
- icon_arrow.svg（白, 20x5）
- icon_arrow_white.svg（白, 21x6）
- icon_arrow_blue.svg（青, 31x6）
- icon_arrow_gray.svg（グレー, 21x6）

1. まず wellnessland.co.jp の SVG 実装を確認して参考にする
2. 共通 SVG を currentColor 対応に修正
3. HTML の img → svg use に置換、色は CSS の color で制御
4. 不要な SVG ファイルを削除

### 受け入れ基準
- [ ] 同一ページ内で同じアイコンが inline SVG と img で混在していない
- [ ] カラー違い SVG（arrow 系）が統合されている
- [ ] ブラウザ表示が変わらないこと
- [ ] SCSS コンパイル通過

### 注意
- 工数が大きいため、まず arrow 系アイコンの統合から着手
- storelist の 276 inline SVG は別途調査が必要
```

---

## RQ-08: table化 + 共通化

```
## 作業指示: RQ-08 table化すべき部分のHTML見直し + 共通化

### コンテキスト
- Plan: `docs/plans/feedback-refactoring-quality-plan.md` の RQ-08
- 前提: RQ-04 の共通コンポーネント設計と連動

### 対象
- /price — p-price__item-row（_price.scss: flex, space-between, border-bottom, padding:1rem）
- /protein — p-protein__flavor-item（_protein.scss: flex, space-between, border-bottom, padding:1.5rem）
- 全ページで同様のパターンを調査

### 作業内容

1. price/index.html の p-price__item-row 周辺の HTML を確認（L471〜）
2. protein/index.html の p-protein__flavor-item 周辺の HTML を確認（L959〜）
3. 両方を `<table>` に変換
4. 共通コンポーネント `c-data-table` 等を作成（RQ-04 と連動）
5. SCSS を table レイアウト対応に修正
6. 全ページで同様の行パターンを調査

### 受け入れ基準
- [ ] 先方指摘の2箇所が `<table>` に変更
- [ ] 同一デザインが共通コンポーネントにまとまっている
- [ ] 全ページ調査済み
- [ ] ブラウザ表示が変わらないこと
```

---

## RQ-09: a > button入れ子の解消

```
## 作業指示: RQ-09 a > button入れ子の解消（/protein）

### コンテキスト
- Plan: `docs/plans/feedback-refactoring-quality-plan.md` の RQ-09

### 対象
protein/index.html 計3箇所（L1713-1735, 他2箇所）:
```html
<a href="..." target="_blank">
  <button type="button" class="btn-buyNow u-bg-red u-mt-20">
    ご購入はこちら <svg>...</svg>
  </button>
</a>
```

### 作業内容
1. `<button>` を削除し、`<a>` にスタイルクラスを移動
2. `btn-buyNow` → FLOCSS 準拠にリネーム（例: `p-protein__buy-btn`）
3. `u-bg-red` → SCSS に吸収（Phase 2-B のパターン）
4. SCSS の `.btn-buyNow` セレクタを新クラス名に変更
5. 全ページで `<a>` > `<button>` パターンがないか調査:
   ```bash
   grep -rn '<button' */index.html
   ```

### 受け入れ基準
- [ ] a > button 入れ子が 0件
- [ ] クラス名が FLOCSS 準拠
- [ ] ブラウザ表示・クリック動作が同じ
```

---

## RQ-10: /rules section入れ子・hタグ追加

```
## 作業指示: RQ-10 /rules section入れ子・hタグ追加

### コンテキスト
- Plan: `docs/plans/feedback-refactoring-quality-plan.md` の RQ-10
- ガイドライン: 「各 section には h2 以下の見出しと文章を含むこと」

### 現状（rules/index.html L364-）
```html
<section class="p-rules">
  <div class="p-rules__container">
    <section class="p-rules__container__item">   ← 入れ子 section
      <p class="p-rules__container__label">      ← p だが見出しが適切
        <b>01</b>適用範囲
```

### 作業内容
1. 内側の `<section class="p-rules__container__item">` → `<div>` に変更
2. `<p class="p-rules__container__label">` → `<h3 class="p-rules__container__label">` に変更
3. SCSS で h3 に対する font-weight リセット等を確認・追従
4. ブラウザ確認

### 受け入れ基準
- [ ] section の不要な入れ子がない
- [ ] 各規約項目に h3 タグがある
- [ ] SCSS 追従済み
- [ ] ブラウザ表示が変わらないこと
```

---

## RQ-11: /personal イラスト alt・webp化

```
## 作業指示: RQ-11 /personal イラスト alt・webp化

### コンテキスト
- Plan: `docs/plans/feedback-refactoring-quality-plan.md` の RQ-11

### 現状
- personal/index.html L793-795:
  `<img src="assets/img/personal/img_personal_program_illustration02.png" alt="パーソナルプログラム01">`
- PNG ファイル: `assets/img/personal/img_personal_program_illustration02.png`
- SVG 版も存在: `assets/img/personal/img_personal_program_illustration.svg`

### 作業内容
1. SVG 版の内容を確認し、コーディング再現の可否を判断
2. 画像として残す場合:
   - PNG → WebP に変換（`cwebp` or 同等ツール）
   - alt を適切に設定（装飾なら `alt=""`、情報なら内容を説明）
   - HTML の src パスを更新
3. コーディング再現する場合:
   - HTML/CSS で再現
   - 画像ファイルを削除

### 受け入れ基準
- [ ] 判断結果が記録されている
- [ ] 画像の場合: WebP + 適切な alt
- [ ] ブラウザ確認

### 注意
- 画像最適化はデザイナー確認が必要な可能性あり（CLAUDE.md 対象外リスト参照）
- WebP 変換ツールが必要。なければ先方に確認
```
