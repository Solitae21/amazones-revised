# Plan: ユーティリティSCSS整理 + 共通コンポーネント残存u-*吸収

## Context

Phase 2-A 完了後、先方にトップページを共有する前の最終整理。
分析の結果、以下2つの問題が判明した:

1. **ユーティリティSCSSファイルに未使用クラスが15件残存** — Phase 1/Phase 2-A/Phase 3 でHTML側からは削除済みだがSCSS定義が残っている
2. **共通コンポーネント（全23ページ共通）にu-*が残存** — Phase 1で「残存許容」と判断した箇所だが、先方目線では同じ問題に見える

どちらも先方に共有するトップページに影響するため、共有前に対応する。

---

## 作業一覧

### A. 未使用ユーティリティクラス削除（SCSS のみ）

HTMLへの影響なし。SCSSから定義を削除するだけ。

#### A-1: `_font-size.scss` から13クラス削除

| クラス | 理由 |
|--------|------|
| `u-fs-13` | Phase 1 で `l-header__brand-tagline` に吸収済み |
| `u-fs-16` | Phase 3 body継承削除で全箇所消滅 |
| `u-fs-19` | Phase 2-A で `p-top__hero-sub` に吸収済み |
| `u-fs-32` | HTML使用箇所なし |
| `u-fs-54` | HTML使用箇所なし |
| `u-fs-100` | Phase 2-A で `c-section-header__text` に吸収済み |
| `u-fs-320` | HTML使用箇所なし |
| `u-fw-300` | Phase 2-A でコンポーネントに吸収済み |
| `u-fw-500` | Phase 3 body継承削除で全箇所消滅 |
| `u-lh-140` | HTML使用箇所なし |
| `u-lh-normal` | Phase 2-A でコンポーネントに吸収済み |
| `u-ls-10` | HTML使用箇所なし |
| `u-ls-20` | HTML使用箇所なし |

#### A-2: `_responsive.scss` から1クラス + 1デッドコード削除

| 対象 | 理由 |
|------|------|
| `.u-display-desk` (72-74行) | HTML使用箇所なし |
| `#about-three-vehicles-section .u-img-wrapper img` (22-25行) | HTML に該当ID なし。孤立したIDセレクタ + `!important` |

#### A-3: `_typography.scss` から1クラス削除

| 対象 | 理由 |
|------|------|
| `.u-text-blue-hover` + `.u-text-blue-hover:hover ~ .img-blue` (20-27行) | HTML使用箇所なし |

#### A-4: `_typography.scss` の `c-btn` 定義を `_btn.scss` に移動

| 対象 | 理由 |
|------|------|
| `.c-btn { outline: none; border: none; cursor: pointer; }` (11-15行) | コンポーネントクラスがユーティリティファイルに誤配置。`_btn.scss` の先頭に移動 |

---

### B. 共通コンポーネント残存u-*のSCSS吸収（全23ページ影響）

#### B-1: ヘッダーCTA予約ボタン（23ページ）

**現状:**
```html
<p class="u-text-center">24時間WEB予約可能</p>
<p class="u-fs-15 u-text-center">体験予約はこちら</p>
```

**対応:** `_header.scss` に以下を追加（セレクタ深さ2階層以内に収める）:
```scss
.l-header__btn__text p {
  text-align: center;
}
.l-header__btn__sub-label {
  font-size: 15px;
}
```

**HTMLを変更:**
```html
<p>24時間WEB予約可能</p>
<p class="l-header__btn__sub-label">体験予約はこちら</p>
```

**影響ファイル:** 全23ページの index.html

#### B-2: Cookie通知テキスト（23ページ）

**現状:**
```html
<p class="u-fw-400 u-fs-14 u-text-white u-lh-180">よりよいエクスペリエンスを...</p>
```

**対応:** `_cookie.scss` に `.c-cookie-notice__text` を新設:
```scss
.c-cookie-notice__text {
  font-weight: 400;
  font-size: 14px;
  color: var(--text-white);
  line-height: 1.8em;
}
```

**HTMLを変更:**
```html
<p class="c-cookie-notice__text">よりよいエクスペリエンスを...</p>
```

**影響ファイル:** 全23ページの index.html

#### B-2b: Cookie通知サブテキスト（23ページ）

**現状:**
```html
<p class='font-outfit fs-12 text-white c-cookie-notice__sub'>©2026 Wellness Land Co., Ltd.</p>
```

`u-` プレフィクスなしの旧ユーティリティ（`font-outfit fs-12 text-white`）が残存。
現在 `c-cookie-notice__sub` は `display: none`（`_cookie.scss:58`）で非表示のため見た目への影響はないが、コード品質として対応する。

**対応:** `_cookie.scss` の既存 `.c-cookie-notice__sub` にテキストスタイルを追加:
```scss
.c-cookie-notice__sub {
  margin-top: 10px;
  margin-bottom: 5px;
  display: none;
  font-family: var(--font-outfit);
  font-size: 12px;
  color: var(--text-white);
}
```

**HTMLを変更:**
```html
<p class="c-cookie-notice__sub">©2026 Wellness Land Co., Ltd.</p>
```

**影響ファイル:** 全23ページの index.html

#### B-3: フッターバナーボタンの `u-mx-auto`（5ページ）

**現状:**
```html
<a href="reservation/" class="c-btn--light-blue u-mx-auto c-footer-banner__btn">
```

**対応:** `_footer-banner.scss` に `.c-footer-banner__btn` のスタイルを追加:
```scss
.c-footer-banner__btn {
  margin-left: auto;
  margin-right: auto;
}
```

**HTMLを変更:**
```html
<a href="reservation/" class="c-btn--light-blue c-footer-banner__btn">
```

**影響ファイル:** index.html, about/index.html, admission/index.html, family/index.html, member/index.html

#### B-4: 採用バナーテキスト（index.html のみ）

**現状:**
```html
<p class="c-reveal u-fw-700 u-fs-20 u-text-white">女性の健康と美を支えるジム</p>
<p class="c-reveal u-lh-200 u-text-white">「女性の輝く未来をつくりたい」...</p>
```

**対応:** `_banner.scss` に追加:
```scss
.c-recruit-info__content-title {
  font-weight: 700;
  font-size: 20px;
  color: var(--text-white);
}
.c-recruit-info__content-desc {
  line-height: 2em;
  color: var(--text-white);
}
```

**HTMLを変更:**
```html
<p class="c-reveal c-recruit-info__content-title">女性の健康と美を支えるジム</p>
<p class="c-reveal c-recruit-info__content-desc">「女性の輝く未来をつくりたい」...</p>
```

**影響ファイル:** index.html のみ
**注意:** point_redemption/index.html に類似パターン（`online-shop-desc` 内の `u-fw-700 u-fs-20`）があるが、構造が異なるため Phase 2-B のスコープとする。

#### B-5: 採用バナー セクションヘッダーの `u-text-white`（index.html + about/index.html）

**現状:**
```html
<p class="c-reveal c-section-header__label u-text-white">採用情報</p>
<h2 class="c-reveal c-section-header__text u-text-white">Recruitment</h2>
```

**対応:** `_banner.scss` に親コンテキストによるカラー指定を追加:
```scss
.c-recruit-banner__section .c-section-header__label,
.c-recruit-banner__section .c-section-header__text {
  color: var(--text-white);
}
```

**HTMLを変更:**
```html
<p class="c-reveal c-section-header__label">採用情報</p>
<h2 class="c-reveal c-section-header__text">Recruitment</h2>
```

**影響ファイル:** index.html, about/index.html

#### B-6: 料金セクション ヘッダーの `u-text-white`（index.html + about/index.html）

**現状（index.html 1223-1224行目）:**
```html
<section class="c-price-plan">  ← 親
  <p class="c-reveal c-section-header__label u-text-white">料金案内</p>
  <h2 class="c-section-header__text u-text-white">Price</h2>
```

**対応:** `_global-responsive.scss`（c-price-plan の定義がここにのみ存在）に追加:
```scss
.c-price-plan .c-section-header__label,
.c-price-plan .c-section-header__text {
  color: var(--text-white);
}
```

**HTMLを変更:**
```html
<p class="c-reveal c-section-header__label">料金案内</p>
<h2 class="c-section-header__text">Price</h2>
```

**影響ファイル:** index.html, about/index.html

---

### C. `_responsive.scss` の構造問題（対象外）

`_responsive.scss` 42-68行のリセットスタイル（`* { box-sizing }`, `body,html { margin:0 }`, `a { text-decoration:none }`, `html { scroll-behavior:smooth }`）がユーティリティファイルに混在。本来は `foundation/_reset.scss` に属するが:

- **現状:** `_reset.scss` に同一ルールは存在しない（重複ではない）
- **リスク:** 移動するとCSS読み込み順が変わり、カスケード影響の可能性あり
- **判断:** 今回は対象外。見た目を崩すリスクがあるため、安全側に倒す

---

## 作業順序

1. **A-1〜A-4**（SCSS削除・移動のみ、HTML影響なし）→ 最も安全
2. **B-1**（ヘッダーCTA、23ページ）→ 影響範囲大だが変更は単純
3. **B-2 + B-2b**（Cookie通知テキスト + サブテキスト、23ページ）→ 同時対応
4. **B-3**（フッターバナーBtn、5ページ）→ 影響範囲小
5. **B-4**（採用バナー、index.htmlのみ）→ 影響範囲最小
6. **B-5**（採用セクションヘッダー白、index.html + about）
7. **B-6**（料金セクションヘッダー白、index.html + about）

---

## 修正対象ファイル一覧

### SCSS（9ファイル）
| ファイル | チケット |
|---------|---------|
| `assets/scss/object/utility/_font-size.scss` | A-1 |
| `assets/scss/object/utility/_responsive.scss` | A-2 |
| `assets/scss/object/utility/_typography.scss` | A-3, A-4 |
| `assets/scss/object/component/_btn.scss` | A-4 |
| `assets/scss/layout/_header.scss` | B-1 |
| `assets/scss/object/component/_cookie.scss` | B-2, B-2b |
| `assets/scss/object/component/_footer-banner.scss` | B-3 |
| `assets/scss/object/component/_banner.scss` | B-4, B-5 |
| `assets/scss/_global-responsive.scss` | B-6 |

### HTML（23ページ）
| チケット | 影響ファイル |
|---------|------------|
| B-1 | 全23ページ |
| B-2 | 全23ページ |
| B-2b | 全23ページ |
| B-3 | index, about, admission, family, member（5ページ） |
| B-4 | index のみ |
| B-5 | index, about |
| B-6 | index, about |

### Phase 2-B に持ち越す関連箇所（今回は対象外）
| 箇所 | 理由 |
|------|------|
| point_redemption の `online-shop-desc` 内 u-* | ページ固有コンポーネント。共通コンポーネントではない |
| `_responsive.scss` のリセットスタイル配置 | CSS読み込み順変更のリスク |

---

## 検証方法

### コンパイル・ブラウザ確認

1. SCSSコンパイルが通ること
2. index.html を PC / SP でブラウザ確認（見た目変更なし）
3. about/index.html を PC / SP で確認（B-3, B-5, B-6 の影響）
4. 他の影響ページ（admission, family, member）を SP で確認
5. B-1/B-2/B-2b は全23ページ影響のため、上記以外から3ページ以上をサンプリング確認（例: contact, faq, storelist）

### A チケット: 削除したSCSSクラスがHTMLに残っていないこと

```
grep -r "u-fs-13\|u-fs-16\|u-fs-19\|u-fs-32\|u-fs-54\|u-fs-100\|u-fs-320\|u-fw-300\|u-fw-500\|u-lh-140\|u-lh-normal\|u-ls-10\|u-ls-20\|u-display-desk\|u-text-blue-hover" --include="*.html"
```

### B チケット: HTML変更の残存確認

```bash
# B-1: ヘッダーCTA内に u-text-center / u-fs-15 が残っていないこと
grep -r "l-header__btn" --include="*.html" | grep -E "u-text-center|u-fs-15"

# B-2: Cookie通知テキストに旧ユーティリティが残っていないこと
grep -r "c-cookie-notice" --include="*.html" | grep -E "u-fw-400|u-fs-14|u-text-white|u-lh-180"

# B-2b: Cookie通知サブテキストの旧クラスが残っていないこと
grep -r "font-outfit fs-12 text-white" --include="*.html"

# B-3: フッターバナーに u-mx-auto が残っていないこと
grep -r "c-footer-banner__btn" --include="*.html" | grep "u-mx-auto"

# B-4: 採用バナーテキストに旧ユーティリティが残っていないこと
grep -r "c-recruit-info__content" --include="*.html" | grep -E "u-fw-700|u-fs-20|u-lh-200|u-text-white"

# B-5/B-6: セクションヘッダーの u-text-white が採用・料金セクション内に残っていないこと
grep -r "c-section-header" --include="*.html" | grep "u-text-white"
```
