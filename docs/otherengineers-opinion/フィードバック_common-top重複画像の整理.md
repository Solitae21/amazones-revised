# クライアントフィードバック: common / top 間の重複画像の整理

## フィードバック原文

> ・「common」「top」で同じアイコンが複数あります。不要なものは整理をお願いいたします。

---

## 調査結果サマリ

`assets/img/common/` と `assets/img/top/` を全件比較した結果、**35ファイルが重複**していた。

| 種別 | ファイル数 | 合計サイズ | 状態 |
|------|-----------|-----------|------|
| 完全一致の重複（バイト単位で同一） | 28 | 約9.5MB | `top/` 側が未使用 → 削除可能 |
| ファイル名は同じだが中身が異なる | 6 | 約9.3MB | `top/` 側が未使用 → 削除可能 |
| `top/` にしか存在しない固有ファイル | 119 | — | 削除不可（トップページ固有） |

**削除対象: 34ファイル、約10.5MB**

コード上の参照はすべて `common/` 側を使用しており、`top/` 側の重複ファイルはどこからも参照されていない。

---

## 完全一致の重複ファイル（28件）— 全て `top/` 側を削除

### アイコン（SVG）— 22件

| ファイル名 | サイズ | common/ | top/ | HTML参照元 |
|-----------|--------|---------|------|-----------|
| `icon_24.svg` | 2.2KB | ✅ 使用中 | ❌ 未使用 | 全ページ共通 |
| `icon_24_outline_white.svg` | 2.1KB | ✅ | ❌ | 全ページ共通 |
| `icon_amazones_no1.svg` | 5.8KB | ✅ | ❌ | 複数ページ |
| `icon_amazones_shop.svg` | 31.8KB | ✅ | ❌ | 複数ページ |
| `icon_arrow.svg` | 311B | ✅ | ❌ | 複数ページ |
| `icon_arrow_blue.svg` | 894B | ✅ | ❌ | 複数ページ |
| `icon_blueLine.svg` | 681B | ✅ | ❌ | 複数ページ |
| `icon_btn_green_arrow.svg` | 632B | ✅ | ❌ | 複数ページ |
| `icon_check_calender.svg` | 2.0KB | ✅ | ❌ | 複数ページ |
| `icon_edit.svg` | 2.0KB | ✅ | ❌ | 複数ページ |
| `icon_energy.svg` | 2.2KB | ✅ | ❌ | 複数ページ |
| `icon_instragram.svg` | 3.5KB | ✅ | ❌ | 全ページフッター |
| `icon_line.svg` | 702B | ✅ | ❌ | 全ページ共通 |
| `icon_line_sp.svg` | 622B | ✅ | ❌ | 全ページ共通 |
| `icon_logo.svg` | 28.9KB | ✅ | ❌ | 全ページヘッダー |
| `icon_menu.svg` | 804B | ✅ | ❌ | 全ページ共通 |
| `icon_plan.svg` | 6.1KB | ✅ | ❌ | 複数ページ |
| `icon_recruitment.svg` | 926B | ✅ | ❌ | 複数ページ |
| `icon_scroll_arrow.svg` | 641B | ✅ | ❌ | 複数ページ |
| `icon_search.svg` | 995B | ✅ | ❌ | 複数ページ |
| `icon_speaker.svg` | 1.5KB | ✅ | ❌ | 複数ページ |
| `icon_videos.svg` | 925B | ✅ | ❌ | 複数ページ |

### アイコン（PNG）— 4件

| ファイル名 | サイズ | common/ | top/ |
|-----------|--------|---------|------|
| `icon_voice_image1.png` | 5.2KB | ✅ | ❌ |
| `icon_voice_image2.png` | 4.4KB | ✅ | ❌ |
| `icon_voice_image3.png` | 5.2KB | ✅ | ❌ |
| `icon_voice_image4.png` | 4.7KB | ✅ | ❌ |

### SNS アイコン — 1件

| ファイル名 | サイズ | common/ | top/ |
|-----------|--------|---------|------|
| `icon_youtube.svg` | 1.3KB | ✅ | ❌ |

### ヒーロー画像 — 1件（完全一致）

| ファイル名 | サイズ | common/ | top/ |
|-----------|--------|---------|------|
| `bg_hero2.png` | 1.8MB | ✅ 使用中 | ❌ 未使用 |

---

## ファイル名は同じだが中身が異なる重複（6件）— 全て `top/` 側を削除

コード上の参照はすべて `common/` 側を使用。`top/` 側は未参照。

| ファイル名 | common/ サイズ | top/ サイズ | 差異 |
|-----------|---------------|------------|------|
| `bg_hero3.png` | 2.77MB | 2.62MB | top/ が5.4%小さい（別バージョン） |
| `bg_hero4.png` | 1.93MB | 1.80MB | top/ が6.9%小さい（別バージョン） |
| `bg_hero5.png` | 2.97MB | 2.88MB | top/ が3.0%小さい（別バージョン） |
| `bg_slide_hero1left.webp` | 163KB | 183KB | top/ が12.5%大きい |
| `icon_24_white.svg` | 1.9KB | 2.3KB | **内部構造が完全に異なる**（common/: PNG埋め込み、top/: ベクターパス） |

`icon_24_white.svg` について: common/ 版は内部に PNG が埋め込まれたSVG（前回の画像フォーマットFBの対象）、top/ 版は純粋なベクターSVG。**ただしコード上は common/ 版のみ参照されている**ため、top/ 版は削除対象。（common/ 版の品質改善は別件として対応。）

---

## 削除対象の完全一覧

以下の34ファイルを `assets/img/top/` から削除する:

```
# アイコン（SVG）22件
assets/img/top/icon_24.svg
assets/img/top/icon_24_outline_white.svg
assets/img/top/icon_amazones_no1.svg
assets/img/top/icon_amazones_shop.svg
assets/img/top/icon_arrow.svg
assets/img/top/icon_arrow_blue.svg
assets/img/top/icon_blueLine.svg
assets/img/top/icon_btn_green_arrow.svg
assets/img/top/icon_check_calender.svg
assets/img/top/icon_edit.svg
assets/img/top/icon_energy.svg
assets/img/top/icon_instragram.svg
assets/img/top/icon_line.svg
assets/img/top/icon_line_sp.svg
assets/img/top/icon_logo.svg
assets/img/top/icon_menu.svg
assets/img/top/icon_plan.svg
assets/img/top/icon_recruitment.svg
assets/img/top/icon_scroll_arrow.svg
assets/img/top/icon_search.svg
assets/img/top/icon_speaker.svg
assets/img/top/icon_videos.svg

# アイコン（PNG）4件
assets/img/top/icon_voice_image1.png
assets/img/top/icon_voice_image2.png
assets/img/top/icon_voice_image3.png
assets/img/top/icon_voice_image4.png

# SNSアイコン 1件
assets/img/top/icon_youtube.svg

# ヒーロー / 背景画像 5件
assets/img/top/bg_hero2.png
assets/img/top/bg_hero3.png
assets/img/top/bg_hero4.png
assets/img/top/bg_hero5.png
assets/img/top/bg_slide_hero1left.webp

# 内部構造が異なるが未使用 1件
assets/img/top/icon_24_white.svg
```

---

## 修正方針

### 作業手順

1. **事前確認**: 上記34ファイルが本当にどこからも参照されていないことを grep で最終確認
   ```bash
   # 各ファイルについて実行
   grep -r "img/top/icon_24.svg" --include="*.html" --include="*.scss" --include="*.css" --include="*.js" .
   ```

2. **ファイル削除**: 上記34ファイルを `assets/img/top/` から削除

3. **確認不要**: HTML/CSS/JS の参照変更は不要（すべて `common/` パスを参照しているため）

4. **ブラウザ確認**: トップページ（index.html）の全セクションが正常に表示されることを確認

### 作業後の `top/` ディレクトリ

削除後は `top/` に **119ファイル** が残る（トップページ固有の画像のみ）。

---

## 影響・リスク評価

| 項目 | リスク | 対策 |
|------|--------|------|
| HTML/CSSの参照切れ | **極低** — コード上の参照はすべて `common/` パスを使用 | 削除前に grep で `img/top/{filename}` を全量検索し、参照がないことを確認 |
| JavaScript からの動的参照 | **低** — JS内で `img/top/icon_` を動的生成している可能性 | JS ファイル内も検索対象に含める |
| ファイルサイズ削減 | **約10.5MB 削減** | 特にヒーロー画像4件で約9.3MB |
| 今後の画像追加時の混乱防止 | **効果あり** — 「どちらに入れるべきか」の判断が不要に | 共通画像は `common/`、ページ固有は各ページディレクトリの原則を徹底 |

---

## 補足: `top/` に残る固有ファイルの分類

削除後に `top/` に残る119ファイルの内訳:

| カテゴリ | 件数 | 例 |
|---------|------|-----|
| トップページ専用背景 | 約25件 | `bg_column.webp`, `bg_voice.webp` 等 |
| トップページ専用アイコン | 約10件 | `icon_1min.svg`, `icon_24hrs.svg`, `icon_training_machine.svg` 等 |
| ヒーロースライド画像（SP版） | 約10件 | `bg_hero_sp1.png`〜`bg_hero_sp5.png` 等 |
| セクション固有画像 | 約50件 | `img_column*.webp`, `img_recruit_*.png`, `img_trainingmachine*.webp` 等 |
| バナー装飾 | 約15件 | `img_banner_speechbubble*.svg`, `img_banner_sticker*.webp` 等 |
| ニュースバナー | 約10件 | `bg_news_banner*.webp`, `img_news_banner*.webp` 等 |

これらはトップページ（またはごく少数のページ）でのみ使用されており、`top/` への配置が適切。
