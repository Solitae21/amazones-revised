# コーディングガイドライン
可能な限りルール準拠  
今後あまり更新のないようなサイトやLPの場合は多少のルール改変は許可  
  
## ディレクトリ構成例

```
root
  ┣ assets/
  ┃   ┣ _include/
  ┃   ┃   ┣ setings.php // 共通で利用する定数などを定義
  ┃   ┃   ┗ ...
  ┃   ┣ scss/
  ┃   ┃   ┗ ...
  ┃   ┣ css/
  ┃   ┃   ┗ ...
  ┃   ┣ img/
  ┃   ┃   ┣ common/ // 共通で利用するアイコン など
  ┃   ┃   ┣ about/ // 各ページごとにディレクトリを作成
  ┃   ┃   ┃ ┗ history/
  ┃   ┃   ┗ ...
  ┃   ┣ js/
  ┃   ┃   ┗ ...
  ┃   ┣ font/ // webフォント
  ┃   ┃   ┗ ...
  ┃   ┣ data/ // PDF、JSON、CSVなどの画像以外に など
  ┃   ┃   ┗ ...
  ┃   ┗ ...
  ┣ about/ //各ページごとにディレクトリを作成
  ┃   ┣ index.html
  ┃   ┣ history/
  ┃   ┃ ┗ index.html
  ┃   ┗ ...
  ┣ contact/
  ┃   ┗ index.html
  ┗ index.html // トップページ（サンプルには_template.phpを同梱）
```
  
## HTML
- インデントは半角スペース2つ
- 必要であればPHPでのファイル分割をして assets/_include ディレクトリから読み込み
    - XAMPP や DockerでのPHP環境があれば適宜設定
    - vscodeを利用している場合は「PHP Server」をインストール
        - brapifra.phpserver
    - ローカル環境の構築が難しい場合はHTMLで問題ない
- 画像には極力わかりやすい接頭辞を付与する
    - アイコン：icon_～
    - 背景：bg_～
    - バナー：banner_～
    - メインビジュアル：mv_～
    - 画像化したテキスト：text_～
    - その他あてはまらないもの：img_～
    - 例）sectionごとの固有の画像  
    img_（sectionのクラス名等）_～
- セマンティックHTMLを意識する
    - 各ページごとに代表される見出し部分をh1に設定し、sectionを利用して各コンテンツを分割する
    - 各sectionにはh2以下の見出しと文章を含むこと
    - brタグを乱用せず、適切にpで分割する
    - imgは装飾目的での利用であればaltは空白でも問題ない
- ブレイクポイントごとに画像が切り替わる場合はpicture sourceのmedia属性を利用する
- 共通部分（ヘッダー フッター等）はデザイン上再現できない場合を除き、基本的に1ソースコードで管理する（リンク設定の抜け漏れ 更新漏れを防ぐため）
```
<!-- × PCとSPで2ソースになっている -->
<header class="l-header">
  <nav class="l-header__nav--pc">
    <ul>
      <li><a href="">...</a></li>
      <li><a href="">...</a></li>
    </ul>
  </nav>
  <nav class="l-header__nav--sp">
    <ul>
      <li><a href="">...</a></li>
      <li><a href="">...</a></li>
    </ul>
  </nav>
</header>
```
```
<!-- 〇 デザイン上 表現が困難な場合をのぞき1ソースにする -->
<header class="l-header">
  <nav>
    <ul>
      <li><a href="">...</a></li>
      <li><a href="">...</a></li>
    </ul>
  </nav>
</header>
```
  
## CSS
- インデントは半角スペース2つ
- sassの利用 コンパイラはdartsass 記法はscssに設定
- vscodeを利用している場合は「Live Sass Compiler」をインストール
    - glenn2223.live-sass
- コメントは // によるコメントを基本として、必要な場合に限り /**/ でコンパイル時にも残す
- 役割ごとに階層化して管理
    - Foundation → Layout → Object → Component → Project → Utility
- BEM記法をベースに、クラス名は「意味」ではなく「役割・構造」で命名
    - 汎用的なリストとして再利用できる場合は意味づけを命名に含めない  
    .c-faqList1 × .c-list1 〇
    - Utilityの場合は例外的に許可  
    .u-cRed1 .u-bdcBlue1 ...
- グローバルCSSを最小限にし、再利用可能なパーツを優先
  
### ディレクトリ構成例
```
root
  ┣ assets/
  ┃   ┣ scss/
  ┃   ┃   ┣ foundation/
  ┃   ┃   ┃   ┣ _variables.scss
  ┃   ┃   ┃   ┗ ... 
  ┃   ┃   ┣ layout/
  ┃   ┃   ┃   ┣ _base.scss
  ┃   ┃   ┃   ┗ ... 
  ┃   ┃   ┣ object/
  ┃   ┃   ┃   ┣ component/ // ボタン、フォーム など
  ┃   ┃   ┃   ┃   ┣ _btn.scss
  ┃   ┃   ┃   ┃   ┣ _form.scss
  ┃   ┃   ┃   ┃   ┗ ... 
  ┃   ┃   ┃   ┣ project/ // ページ固有 限定的なレイアウト
  ┃   ┃   ┃   ┃   ┣ _about.scss
  ┃   ┃   ┃   ┃   ┣ _about-history.scss // 親子関係がある場合はハイフンでつなぐ
  ┃   ┃   ┃   ┃   ┗ ... 
  ┃   ┃   ┃   ┗ utility/
  ┃   ┃   ┃       ┣ _color.scss // color border-color など
  ┃   ┃   ┃       ┣ _display.scss // display overflow など
  ┃   ┃   ┃       ┣ _typography.scss // webフォント指定 font-size line-height など
  ┃   ┃   ┃       ┣ _space.scss // margin padding など
  ┃   ┃   ┃       ┣ _jsutil.scss // jsプラグインのcss上書き
  ┃   ┃   ┃       ┗ ... 
  ┃   ┃   ┣ plugins.scss // jsプラグイン用CSS などサードパーティ製のコードをまとめる（基本はminifiedで取り込み）
  ┃   ┃   ┗ style.scss // 全体の読み込み
  ┃   ┣ css/
  ┃   ┃   ┗ ... // コンパイル後のcss
```
  
### 命名規則例
Prefixで役割を明確化することで、クラス名の衝突を防ぐ  
  
- Foundation: リセットCSS 変数 mixin function など
    - 例）_variables.scss _reset.scss _mixins.scss _functions.scss
- Layout: ページ共通で利用する ヘッダー フッター グリッド など
    - 例）_base.scss
        - html body など汎用的なセレクタに適用するcssを記述
    - 例）_header.scss _footer.scss _grid.scss _container.scss
        - .l-header1 .l-header1__nav  
        .l-footer1 .l-footer1__copy  
        l-grid1 l-grid1__item .l-container1
- Object/Component: 再利用可能なコンポーネント
    - 例）_btn.scss _card.scss _form.scss
    - .c-btn1 .c-btn1__link  
    .c-card1 .c-card1__caption  
    .c-form1 .c-form1__input1 .c-form1__radio1
- Object/Project: 限定的なレイアウト コンポーネントの上書きを許可
    - 例）_top.scss _about.scss
    - .p-top .p-top__mv .p-top__block1  
    .p-about .p-about__table1
- Object/Utility: スタイルの微調整や単一的な役割で上書きを許可
    - _color.scss
        - 文字 ボーダー 背景などのカラー など
        - .u-cRed1 .u-bdcBlue1
    - _spase.scss
        - margin paddingなどの余白指定 など
        - .u-mt1em .u-my20em .u-pl1em .u-px15em
    - _jsutil.scss
        - jsプラグインで利用しているcssの上書き
        - .js-toggle .js-modal
  
### コーディングルール
- インデント: 2スペース
- セレクタの深さ: 原則2階層まで
    - componentでセレクタの詳細度が上がるとprojectでの上書きが難しくなるので特に注意する
- IDセレクタ禁止 クラスで統一
    - jsでの操作が必要なものに限りIDの指定OK
- !importantは極力使用しない
    - Utilityで例外的に使用を許可
- カラー、フォントサイズは変数化
    - \$color-main1 \$color-gray1
- Utilityにはfont-size line-height margin padding等のpx指定を追加せず、肥大化しないように留意する
    - rem または emでの指定を基本として、少数点は省いた命名をする
    - 例）padding-top: 1.5rem; → u-pt15rem  
    font-size: 1rem; → u-fs1rem
- プラグインなどのサードパーティ製のCSSを上書きする場合は _jsutil.scss にまとめて記述する
  
### コメントルール
```
// ========================================
// Component: Button
// ========================================
.c-btn {
  display: inline-block;
  padding: 0.5em 1em;
  border-radius: 4px;
}
```
  
### 運用上の諸注意
- 再利用優先：新しいスタイルはまずComponentに落とし込む
- ページ固有はProjectへ：他ページで使わないものはProjectに限定
- Utilityは最小限：乱用すると管理が難しくなるため、汎用性の高いものだけ
- クラス命名・階層の妥当性をレビュー
- デザイン変更時は Componentを更新して再利用
  
## JavaScript
- インデントは半角スペース2つ
- jQueryは使用せず基本的にバニラJSで作成する（メンテナンス工数の削減のため）
    - 必要に応じてプラグインの利用は許可
- console.logなどのデバッグコードは検証が終わったらコメントアウトもしくは削除する
  
### ディレクトリ構成例
```
root
  ┣ assets/
  ┃   ┣ js/
  ┃   ┃   ┣ plugins.js // jsプラグイン などサードパーティ製のコードをまとめる（基本はminifiedで取り込み）
  ┃   ┃   ┣ top.js // ページごとに個別で必要なjsがあれば作成
  ┃   ┃   ┗ common.js // 共通で利用する処理をまとめる
```