# RQ-03: font-size 単位統一（px → rem + 誤差値の正規化）

**コンテキスト:**
- Plan: `docs/plans/feedback-refactoring-quality-plan.md` の RQ-03
- 先方指摘: 「font-sizeも px / rem と混在。rem に統一」「6.259rem と 6.25rem は誤差範囲なので統一」
- RQ-01/RQ-02（body line-height 1.8 + line-height 単位なし統一）は完了済み
- コンパイルコマンド: `npx sass assets/scss/global.scss assets/css/global.css --no-source-map`

**変換基準:** `16px = 1rem`

---

## チケット RQ-03-A: font-size px → rem 変換（127箇所）

**対象ファイル・件数:**

| ファイル | px件数 |
|---------|--------|
| `assets/scss/object/project/_storedetail-introduction.scss` | 28 |
| `assets/scss/_global-responsive.scss` | 18 |
| `assets/scss/object/project/_top.scss` | 15 |
| `assets/scss/object/utility/_font-size.scss` | 14 |
| `assets/scss/object/project/_medical.scss` | 11 |
| `assets/scss/object/project/_family.scss` | 6 |
| `assets/scss/object/project/_admission.scss` | 6 |
| `assets/scss/object/project/_about.scss` | 5 |
| `assets/scss/object/project/_member.scss` | 4 |
| `assets/scss/object/utility/_responsive.scss` | 3 |
| `assets/scss/object/project/_faq.scss` | 2 |
| `assets/scss/object/project/_contact.scss` | 2 |
| `assets/scss/object/component/_section.scss` | 2 |
| `assets/scss/object/component/_footer-banner.scss` | 2 |
| `assets/scss/object/component/_cookie.scss` | 2 |
| 他7ファイル（各1件） | 7 |

**変換テーブル（頻出値）:**

| px | rem |
|----|-----|
| 10px | 0.625rem |
| 11px | 0.6875rem |
| 12px | 0.75rem |
| 12.5px | 0.78125rem |
| 14px | 0.875rem |
| 15px | 0.9375rem |
| 16px | 1rem |
| 18px | 1.125rem |
| 19px | 1.1875rem |
| 20px | 1.25rem |
| 24px | 1.5rem |
| 25px | 1.5625rem |
| 30px | 1.875rem |
| 32px | 2rem |
| 36px | 2.25rem |
| 37px | 2.3125rem |
| 38px | 2.375rem |
| 39px | 2.4375rem |
| 42px | 2.625rem |
| 46px | 2.875rem |
| 48px | 3rem |
| 50px | 3.125rem |
| 54px | 3.375rem |
| 55px | 3.4375rem |
| 60px | 3.75rem |
| 64px | 4rem |
| 70px | 4.375rem |
| 80px | 5rem |
| 90px | 5.625rem |
| 100px | 6.25rem |
| 110px | 6.875rem |
| 112px | 7rem |
| 150px | 9.375rem |
| 170px | 10.625rem |
| 180px | 11.25rem |
| 200px | 12.5rem |
| 210px | 13.125rem |
| 250px | 15.625rem |
| 310px | 19.375rem |
| 320px | 20rem |

**注意点:**
- `calc()` 内の px はそのまま残す（レスポンシブ計算用）
- `var(--fs-*)` 使用箇所は変換不要
- `_storedetail-review.scss` は WP プラグインのミニファイド CSS なので対象外
- `_reset.scss` の `font-size: 16px` は root 基準値のため `1rem` に変換
- CSS 変数（`--fs-*`）に対応する値がある場合は変数を使うのが望ましいが、既存の変数定義（`assets/scss/foundation/_variables.scss` の `--fs-*`）と完全一致する場合のみ置換する。一致しない場合は rem 数値をそのまま使う
- `_font-size.scss` のユーティリティ定義（`.u-fs-*` クラス）は定義値の変換のみ行い、クラス名は変更しない

**検証:**
```bash
# calc() 内を除いて 0件であること
grep -rn 'font-size:.*px' assets/scss/object/ assets/scss/_global-responsive.scss assets/scss/foundation/ | grep -v 'calc(' | grep -v '/\*' | grep -v _storedetail-review
# コンパイル確認
npx sass assets/scss/global.scss assets/css/global.css --no-source-map
```

---

## チケット RQ-03-B: 誤差 rem 値の正規化

**対象:**
- `6.259rem` → `6.25rem`（= `var(--fs-display)`）: 5箇所
  - `_payment.scss:115`
  - `_visitor.scss:36`
  - `_price.scss:50`
  - `_sportip.scss:85`
  - `_reservation.scss:139`

**注意点:**
- `6.25rem` は `--fs-display` と同値。ただし他のページでは `var(--fs-display)` を使っている可能性があるため、変数化が可能であれば `var(--fs-display)` に統一する
- RQ-03-A で px → rem 変換した後に、新たに誤差値が発生していないかも確認する

**検証:**
```bash
# 6.259rem が 0件であること
grep -rn '6\.259rem' assets/scss/
# 同一デザインパターンでの値の揺れ確認
grep -rn 'font-size:.*rem' assets/scss/object/project/ | grep -v 'var(' | grep -v 'calc(' | grep -v '/\*' | grep -v _storedetail-review | sed 's/.*font-size:\s*//' | sort -u
```
