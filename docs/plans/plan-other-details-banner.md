# Plan: `c-other-details-banner` u-* 吸収 + SCSS重複解消 + HTMLバグ修正

> コンテキスト: `docs/plans/feedback-improvement-context.md`
> 方針: チケット = 「何を・なぜ・受け入れ基準」のみ。実装方法は既存コード + ガイドラインから判断する。

---

## 背景

### 先方フィードバックとの関連

**FB1（ユーティリティクラスの多用）** の根本原因:
> コンポーネント固有のスタイルまでユーティリティで実現しており、ガイドライン違反の状態

`c-other-details-banner` 内の HTML には以下の u-* が残存:
- `u-fw-700 u-fs-24 u-md-fs-16` × 4箇所（admission）
- `u-lh-200` × 4箇所（admission）
- 合計: **admission で 12個の u-***, sitemap は Phase 2-B で対応済み（`p-sitemap__banner-title`, `p-sitemap__banner-desc` に吸収済み）

**FB3（重複コンポーネント）** の根本原因:
> ほぼ同一デザインのコンポーネントが存在

`c-other-details-banner` の SCSS 定義が **3箇所に重複**:
1. `_admission.scss` L180-226
2. `_sitemap.scss` L188-257（`/* 再利用可能 */` コメント付き）
3. `_global-responsive.scss` L2182-2260

→ 同じセレクタ・同じプロパティが3ファイルに散在。これは FB3 の指摘そのもの。

### ガイドライン違反

1. **c-* プレフィクスなのに project/ に定義** — `c-` は component/ に置くべき（FLOCSS）
2. **Utility に font-size の px 指定** — `u-fs-24`, `u-md-fs-16` はガイドライン違反（rem/em 基本）
3. **HTMLバグ**: admission L953 に意味不明な `md` クラスが付与（SCSS に `.md` 定義なし）
4. **FLOCSSプレフィクスなし**: `admission-details-break`（L890）にプレフィクスなし
5. **`_global-responsive.scss` に `.fs-24` セレクタ**（L2240）— `u-` プレフィクスなし、HTML にも `.fs-24` は存在しない（デッドコード）

---

## 作業一覧

### ODB-1: SCSS 定義を component/ に一元化

**何を**: `c-other-details-banner` 系の SCSS を `assets/scss/object/component/_other-details-banner.scss` に新設し、3箇所の重複定義を削除する

**なぜ**: 
- `c-` プレフィクスは component/ に属するべき（FLOCSS）
- 同一セレクタが `_admission.scss`, `_sitemap.scss`, `_global-responsive.scss` に散在しており FB3 の根本原因
- 一元化しないと今後の修正が3箇所に波及する

**スコープ**:
- 新設: `_other-details-banner.scss`
- 削除元: `_admission.scss` L180-226, `_sitemap.scss` L188-257, `_global-responsive.scss` L2182-2260
- `global.scss` に `@use` 追加

**受け入れ基準**:
- `c-other-details-banner` 系セレクタが component/ のみに存在
- `_admission.scss`, `_sitemap.scss`, `_global-responsive.scss` から該当定義が消えている
- `grep -r "c-other-details-banner" assets/scss/` で component/ と project/（ページ固有の上書きのみ）だけがヒット
- コンパイルエラーなし
- admission, sitemap 両ページでブラウザ表示変更なし

**注意**:
- `_admission.scss` と `_sitemap.scss` にはページ固有の上書き（背景画像の差し替え、ページ固有レスポンシブ等）が含まれる。これらは project/ に残す
- `_admission.scss` の `c-other-details-banner` L202-210 には `background-image: url("../img/admission/...")` が含まれるが、これは共通のデフォルト値。`_sitemap.scss` L94-96 で sitemap 用に上書きしている構造は維持する

---

### ODB-2: admission の u-* を SCSS に吸収

**何を**: admission/index.html の `c-other-details-banner` 内の u-* をコンポーネント SCSS に吸収

**なぜ**: FB1 の根本原因。タイポグラフィ系 u-* をコンポーネントに吸収し、HTML の可読性を改善する

**対象（admission/index.html）**:

| 行 | 現状 | 吸収先 | 吸収内容 |
|----|------|--------|----------|
| L882, 908, 931, 953 | `u-fw-700 u-fs-24 u-md-fs-16` | `c-other-details-banner-item__title` の子 `p` に BEM クラス新設 | font-weight: 700, font-size: var(--fs-xl), SP時 font-size: var(--fs-base) |
| L888, 914, 937, 959 | `c-other-details-banner-p u-lh-200` | `c-other-details-banner-p` に吸収 | line-height: 2 |

**受け入れ基準**:
- admission/index.html の `c-other-details-banner` セクション内に `u-fw-*`, `u-fs-*`, `u-md-fs-*`, `u-lh-*` が存在しない
- `grep "u-fw-700\|u-fs-24\|u-md-fs-16\|u-lh-200" admission/index.html` で `c-other-details-banner` セクション内はヒットなし
- コンパイルエラーなし
- ブラウザ表示変更なし（PC/SP 両方確認）

---

### ODB-3: HTML バグ修正（admission）

**何を**: admission/index.html の `c-other-details-banner` 内の HTML バグを修正

**なぜ**: 意味のないクラスが HTML の可読性を下げている。FLOCSSプレフィクスなしのクラスはガイドライン違反。

**対象**:

| # | 行 | 内容 | 対応 |
|---|-----|------|------|
| 1 | L953 | `u-fw-700 u-fs-24 u-md-fs-16 md` — `md` に対応するSCSS定義なし | `md` を削除（ODB-2 で u-* も吸収済みの前提） |
| 2 | L890 | `class="admission-details-break"` — FLOCSSプレフィクスなし、SCSS定義なし | SCSS定義なし＝効果なし。ただし `<br>` タグへの class なので、改行制御の意図がある可能性あり。**人間確認推奨** |

**受け入れ基準**:
- L953 の `md` クラスが削除されている
- L890 の `admission-details-break` は確認結果に応じて対応（削除 or `p-admission-details-break` にリネーム）
- ブラウザ表示変更なし

---

### ODB-4: `_global-responsive.scss` のデッドコード削除

**何を**: `_global-responsive.scss` L2240 の `.c-other-details-banner-item .fs-24` セレクタを削除

**なぜ**: `.fs-24` は HTML に存在しないデッドコード。`u-` プレフィクスもないためガイドライン違反。ODB-1 で `_global-responsive.scss` の `c-other-details-banner` セクション全体を移動する際に一緒に対処。

**受け入れ基準**:
- `grep "\.fs-24" assets/scss/` でヒットなし
- コンパイルエラーなし

---

## チケット依存関係

```
ODB-1（SCSS一元化）→ ODB-2（u-*吸収）→ ODB-3（HTMLバグ修正）
                   → ODB-4（デッドコード削除、ODB-1と同時に実施可能）
```

ODB-1 を先に実施しないと、ODB-2 での SCSS 追記先が定まらない。

---

## 検証方法（全チケット共通）

1. `grep -r "c-other-details-banner" assets/scss/` — 定義箇所の確認
2. `npx sass assets/scss/global.scss assets/css/global.css` — コンパイル確認
3. `npx sass assets/scss/object/project/admission.scss assets/css/admission.css` — ページ別コンパイル確認
4. ブラウザ確認: admission/index.html, sitemap/index.html（PC + SP）

---

## 影響ファイル

| ファイル | 変更内容 |
|---------|---------|
| `assets/scss/object/component/_other-details-banner.scss` | **新設** — c-other-details-banner 系の定義を集約 |
| `assets/scss/global.scss` | `@use` 追加 |
| `assets/scss/object/project/_admission.scss` | 重複定義削除（ページ固有の上書きは残す） |
| `assets/scss/object/project/_sitemap.scss` | 重複定義削除（ページ固有の上書きは残す） |
| `assets/scss/_global-responsive.scss` | `c-other-details-banner` セクション全体削除 |
| `admission/index.html` | u-* 削除、`md` クラス削除 |
