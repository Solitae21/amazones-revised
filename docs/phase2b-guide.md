# Phase 2-B 作業手順書

## 担当割り振り

### 新家（1〜10）

| # | フォルダ | 備考 |
|---|---------|------|
| 1 | about | |
| 2 | admission | |
| 3 | column | column/[slag] も含む |
| 4 | contact | |
| 5 | family | |
| 6 | faq | |
| 7 | information | Phase 1 で news 系は対応済み |
| 8 | medical | |
| 9 | member | |
| 10 | payment | |

### 串さん（11〜20）

| # | フォルダ | 備考 |
|---|---------|------|
| 11 | price | |
| 12 | protein | |
| 13 | reservation | |
| 14 | rules | |
| 15 | sitemap | ユーティリティが最小限の可能性 |
| 16 | sportip | |
| 17 | storelist | storelist/[slag] も含む。html font-family 上書きあり要注意 |
| 18 | visitor | |
| 19 | point_redemption | |
| 20 | personal | |

---

## 概要

各ページの HTML に残っている**タイポグラフィ系ユーティリティクラス（u-*）** を、ページ固有の SCSS コンポーネントに吸収する作業です。

共通コンポーネント（ヘッダー、フッター、Cookie通知、ボタン等）は Phase 1 で対応済みのため、**ページ固有部分のみ**が対象です。

---

## 作業は Claude Code で進める

本作業は Claude Code を使って進めます。index.html（トップページ）の Phase 2-A と同じ手順を踏襲してください。

### 事前準備

1. このリポジトリをローカルに落とす
2. Dart Sass がインストールされていることを確認する
3. Claude Code をインストールしていない場合はインストールする

### 作業の流れ（1ページごとに繰り返す）

```
① Plan 作成を Claude Code に依頼する
    ↓
② Plan の内容を確認・承認する
    ↓
③ チケット単位で Claude Code に実行を依頼する
    ↓
④ コンパイル + ブラウザ確認
```

### ① Plan 作成の依頼方法

`docs/plans/feedback-improvement-prompt.md` にプロンプトのテンプレートがあります。
**ページ名を自分の担当ページに置き換えて**、Claude Code に貼り付けてください。

例: index.html → `price/index.html` に変更する

### ② Plan の参考（お手本）

`docs/plans/feedback-index-plan.md` が index.html（Phase 2-A）の Plan です。
出来上がりのイメージ・粒度の参考にしてください。

### ③ チケット単位で実行を依頼する

Plan を丸ごと渡すのではなく、**1チケットずつ** Claude Code に実行を依頼してください。
理由: スコープが大きいと整合性が崩れるため。

### 重要: Claude Code が参照するファイル

ルート直下の `CLAUDE.md` を Claude Code が自動的に読み込みます。
ここにコーディング規約・作業のコツ・やってはいけないことが記載されています。
**このファイルは編集しないでください。**

---

## 作業対象のユーティリティ

### SCSS に吸収するもの（タイポグラフィ系）

| プレフィクス | 例 |
|-------------|-----|
| `u-fs-*` | `u-fs-14`, `u-fs-18`, `u-fs-24` |
| `u-fw-*` | `u-fw-400`, `u-fw-600`, `u-fw-700` |
| `u-text-*` | `u-text-white`, `u-text-lightBlue` |
| `u-lh-*` | `u-lh-150`, `u-lh-180`, `u-lh-200` |
| `u-font-*` | `u-font-outfit` |
| `u-ls-*` | （letter-spacing） |

### 残してよいもの（レイアウト・機能系）

以下は削除しないでください:

| クラス | 用途 |
|--------|------|
| `u-relative`, `u-absolute` | position 配置 |
| `u-z-10` | z-index |
| `u-display-sp` | レスポンシブ表示切替 |
| `u-mx-auto`, `u-mt-*`, `u-ml-*`, `u-mr-*` | マージン調整 |
| `u-popup` | JS 連携 |
| `u-w-full` | width |
| `u-cursor-pointer` | UI 挙動 |
| `u-bg-white` | 背景色 |
| `u-text-center` | テキスト配置（※コンポーネントに吸収可能な場合は吸収してOK） |

### body 継承で不要なもの（見つけたら削除）

以下はすでに body で定義済みなので、HTML に残っていたら削除するだけでOK（SCSSへの追記不要）:

- `u-fw-500`（body: font-weight: 500）
- `u-fs-16`（body: font-size: 16px）
- `u-font-zen`（body: font-family: Zen Kaku Gothic New）
- `u-text-black1`（body: color）

---

## 作業手順（1ページあたり）

### Step 1: 対象の確認

担当ページの HTML を開き、タイポグラフィ系 u-* を探す。

特に注目するパターン:
- `<p>`, `<span>`, `<h2>` 等に u-* が **3個以上** 付いている要素
- 同じ u-* の組み合わせが**繰り返し出現**している箇所
- コンポーネントクラス（`c-*`, `p-*`）はあるが、タイポグラフィが SCSS に定義されていない要素

### Step 2: SCSS に吸収

対象の SCSS ファイルを確認してから作業する:
- ページ固有: `assets/scss/object/project/_[ページ名].scss`
- ページ別CSS: `assets/css/[ページ名].css` がある場合はそちらの SCSS も確認

吸収のパターンは3つ:

#### パターン A: 既存クラスにタイポグラフィを追加

```html
<!-- Before -->
<p class="p-about__desc u-fs-14 u-lh-180">テキスト</p>
```
```scss
// _about.scss に追加
.p-about__desc {
  font-size: 14px;
  line-height: 1.8em;
}
```
```html
<!-- After -->
<p class="p-about__desc">テキスト</p>
```

#### パターン B: クラスがない要素に BEM クラスを新設

```html
<!-- Before -->
<p class="u-fw-700 u-fs-20 u-text-white">見出しテキスト</p>
```
```scss
// 親コンポーネントの BEM 子要素として新設
.p-about__heading {
  font-weight: 700;
  font-size: 20px;
  color: var(--text-white);
}
```
```html
<!-- After -->
<p class="p-about__heading">見出しテキスト</p>
```

#### パターン C: body 継承で不要なユーティリティを削除するだけ

```html
<!-- Before -->
<p class="p-about__text u-fw-500 u-fs-16 u-font-zen">テキスト</p>
```
```html
<!-- After（SCSS 変更なし） -->
<p class="p-about__text">テキスト</p>
```

### Step 3: 検証

1. **SCSS コンパイル**
   ```bash
   npx sass assets/scss/global.scss assets/css/global.css --no-source-map
   ```
   ※ページ別 CSS がある場合はそちらもコンパイル

2. **grep で残存確認**
   ```bash
   grep -E "u-fs-|u-fw-|u-text-|u-lh-|u-font-|u-ls-" [ページ名]/index.html
   ```
   → 残存があれば対応漏れ

3. **ブラウザ確認**
   - PC / SP 両方で表示確認
   - **見た目が変わっていないこと**が最重要

---

## ルール・注意点

1. **見た目を絶対に崩さない** — 迷ったら修正しない。確認してください
2. **セレクタの深さは原則2階層まで**（ガイドライン準拠）
3. **ID セレクタ禁止**（クラスで統一）
4. **カラーは変数を使う**（`var(--text-white)` 等。`assets/scss/foundation/_variables.scss` 参照）
5. **既存 SCSS のパターンに合わせる**（コメント形式、インデント等）
6. **他ページの HTML・SCSS は変更しない**（自分の担当ページのみ）
7. **共通コンポーネント（ヘッダー、フッター等）は触らない**（Phase 1 で対応済み）

---

## SCSS 構成（参考）

```
assets/scss/
├── global.scss              # エントリポイント
├── _global-responsive.scss  # グローバルのレスポンシブ
├── foundation/
│   ├── _variables.scss      # カラー・フォントサイズ変数
│   └── _reset.scss          # リセットCSS
├── layout/
│   ├── _header.scss         # ヘッダー
│   └── _footer.scss         # フッター
├── object/
│   ├── component/           # 再利用コンポーネント (c-*)
│   ├── project/             # ページ固有スタイル (p-*)  ← 主にここに追記
│   └── utility/             # ユーティリティ (u-*)
```

---

## 受け入れ基準（チェックリスト）

各ページの作業完了時に確認:

- [ ] タイポグラフィ系 u-*（u-fs-*, u-fw-*, u-text-*, u-lh-*, u-font-*, u-ls-*）がコンポーネント SCSS に移されている
- [ ] body 継承で不要なユーティリティ（u-fw-500, u-fs-16, u-font-zen, u-text-black1）が削除されている
- [ ] 残存ユーティリティがレイアウト・機能系のみ
- [ ] SCSS コンパイルが通る
- [ ] PC / SP で見た目が変わっていない

---

## 注意が必要なページ

| ページ | 注意点 |
|--------|--------|
| storelist/[slag]/index.html | `html { font-family: kozuka-gothic-pr6n }` の上書きあり。`u-font-zen` の扱いに注意 |
| information/index.html | Phase 1 で news 系は対応済み。残りのページ固有部分のみ |
| sitemap/index.html | ユーティリティが最小限の可能性あり |

---

## 参考: index.html（Phase 2-A）の実績

- u-* 行数: **184 → 95**（48%減）
- タイポグラフィ系 u-*: **~140 → 24**（83%減）
- 作業の詳細: `docs/plans/feedback-index-plan.md`
