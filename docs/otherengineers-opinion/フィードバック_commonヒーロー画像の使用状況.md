# クライアントフィードバック: common ディレクトリの bg_hero 画像について

## フィードバック原文

> img > common ディレクトリ
> ・「bg_hero～」が複数ありますが、こちらはトップページ以外でも横断的に使用しているということでしょうか。

---

## 調査結果: はい、横断的に使用しています

bg_hero1〜4 はトップページのスライダーに加え、各サービスページのヒーローセクションでも使用されており、`common/` への配置は適切です。

### 使用状況マトリクス

| 画像 | トップページ | about | sportip | personal | medical | 使用ページ数 |
|------|------------|-------|---------|----------|---------|------------|
| bg_hero1 | ✅ スライダー | ✅ ヒーロー | — | — | — | **2ページ** |
| bg_hero2 | ✅ スライダー | — | ✅ ヒーロー | — | — | **2ページ** |
| bg_hero3 | ✅ スライダー | — | — | ✅ ヒーロー | — | **2ページ** |
| bg_hero4 | ✅ スライダー | — | — | — | ✅ ヒーロー | **2ページ** |
| bg_hero5 | ✅ スライダー | — | — | — | — | **1ページのみ** |

### 参照箇所の詳細

**bg_hero1:**
- `index.html` L340-341 — トップページスライダー
- `about/index.html` L507-510 — about ページヒーロー

**bg_hero2:**
- `index.html` L351-352 — トップページスライダー
- `sportip/index.html` L461-464 — sportip ページヒーロー

**bg_hero3:**
- `index.html` L363-364 — トップページスライダー
- `personal/index.html` L337-340 — personal ページヒーロー

**bg_hero4:**
- `index.html` L375-376 — トップページスライダー
- `medical/index.html` L461-464 — medical ページヒーロー

**bg_hero5:**
- `index.html` L387-388 — トップページスライダーのみ

※ CSS/JS からの参照はなし。すべて HTML の `<picture>` / `<img>` 要素で直接読み込み。

---

## common/ 内の bg_hero ファイル一覧（30ファイル / 約18MB）

### 各ヒーローの構成

ヒーロー画像1セットあたり、以下のバリエーションが存在する:

| バリエーション | 用途 | 形式 | 例（hero1） | サイズ例 |
|--------------|------|------|------------|---------|
| `bg_hero{N}.png` | PC フルサイズ | PNG | `bg_hero1.png` | 2.3MB |
| `bg_hero{N}_sp.png` | SP フルサイズ | PNG | `bg_hero1_sp.png` | 461KB |
| `bg_hero{N}top_left.webp` | PC 上部左パーツ | WebP | `bg_hero1top_sp.webp`* | 48KB〜1.4MB |
| `bg_hero{N}top_right.webp` | PC 上部右パーツ | WebP | — | 74KB〜405KB |
| `bg_hero{N}top_sp.webp` | SP 上部パーツ | WebP | `bg_hero1top_sp.webp` | 29KB〜60KB |
| `bg_hero{N}bottom_sp.webp` | SP 下部パーツ | WebP | `bg_hero1bottom_sp.webp` | 22KB〜68KB |

*hero1 は top_left / top_right のパーツ分割がなく、top_sp / bottom_sp のみ。

### ファイルサイズ内訳

| ヒーロー | PC版 | SP版 | パーツ類 | 小計 |
|---------|------|------|---------|------|
| hero1 | 2.3MB | 461KB | 116KB | **2.9MB** |
| hero2 | 1.8MB | 292KB | 1.6MB | **3.7MB** |
| hero3 | 2.7MB | 439KB | 804KB | **3.9MB** |
| hero4 | 1.9MB | 335KB | 263KB | **2.5MB** |
| hero5 | 2.9MB | 398KB | 1.0MB | **4.3MB** |
| **合計** | **11.6MB** | **1.9MB** | **3.8MB** | **約18MB** |

---

## 指摘される可能性のある課題

### 1. bg_hero5 は common/ に置く必要がない

bg_hero5 はトップページ（index.html）でのみ使用。他のページからの参照がないため、`top/` に移動するのが適切。

### 2. ファイル形式の混在

同一ヒーローセットの中で PNG / WebP / JPG が混在している:

| ファイル | 形式 | 備考 |
|---------|------|------|
| `bg_hero{N}.png` | PNG | **前回FBの対象: JPG化すべき** |
| `bg_hero{N}_sp.png` | PNG | 同上 |
| `bg_hero{N}top_left.webp` | WebP | 適切 |
| `bg_hero2top_right.jpg` | JPG | WebP と重複 |
| `bg_hero2top_right.webp` | WebP | JPG と重複 |
| `bg_hero5top_right.jpg` | JPG | WebP と重複 |
| `bg_hero5top_right.webp` | WebP | JPG と重複 |

hero2 と hero5 では `top_right` に JPG と WebP の**両方が存在**（重複）。

### 3. top/ ディレクトリの未使用ヒーロー画像

前回の「common/top 重複画像の整理」FBで報告済みだが、`top/` にも以下の未使用ヒーロー画像が残存:

| ファイル | サイズ | 状態 |
|---------|--------|------|
| `top/bg_hero.webp` | 427KB | 未使用 |
| `top/bg_hero2.png` | 1.8MB | 未使用 |
| `top/bg_hero3.png` | 2.5MB | 未使用 |
| `top/bg_hero4.png` | 1.8MB | 未使用 |
| `top/bg_hero5.png` | 2.8MB | 未使用 |
| `top/bg_hero_sp1〜5.png` | 計1.6MB | 未使用 |

**合計: 10ファイル、約10.9MB が未使用。**

---

## 修正方針

### Phase 1: 未使用ファイルの削除

| 対象 | ファイル数 | 削減サイズ |
|------|-----------|-----------|
| `top/bg_hero*.png` / `.webp`（未使用重複） | 10 | 約10.9MB |
| `common/bg_hero2top_right.jpg`（WebP版と重複） | 1 | 79KB |
| `common/bg_hero5top_right.jpg`（WebP版と重複） | 1 | 246KB |

### Phase 2: bg_hero5 の移動

`common/bg_hero5*` を `top/bg_hero5*` に移動（トップページのみで使用のため）。
HTML の参照パスを `assets/img/common/bg_hero5` → `assets/img/top/bg_hero5` に更新。

### Phase 3: PNG → JPG 変換（前回FBと連動）

`bg_hero{N}.png` / `bg_hero{N}_sp.png`（計10ファイル、約13.5MB）を JPG 化。
※ 前回の「画像フォーマット改善」FBの対象と同一。デザインツールからの再書き出しが必要。

---

## 影響・リスク評価

| 項目 | リスク | 対策 |
|------|--------|------|
| Phase 1: 未使用ファイル削除 | **極低** — コード上の参照なし | 削除前に grep で最終確認 |
| Phase 2: hero5 の移動 | **低** — index.html 内の参照パス変更のみ | 変更後にスライダー動作確認 |
| Phase 3: PNG → JPG 変換 | **中** — 複数ページに影響 | デザインツールからの書き出し + 全ページのヒーロー表示確認 |
| JPG/WebP 重複の整理 | **低** — `<picture>` 要素で WebP → JPG フォールバックを使っている可能性 | HTML の `<source>` / `<img>` 構造を確認してからJPG削除 |

## クライアントの質問への回答

**はい、bg_hero1〜4 はトップページ以外でも横断的に使用しています。** 各ヒーロー画像はトップページのスライダーに加え、対応するサービスページ（about, sportip, personal, medical）のヒーローセクションで共有されているため、`common/` への配置は適切です。

ただし **bg_hero5 のみトップページ専用**のため、`top/` への移動が望ましいです。
