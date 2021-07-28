//-----------------------------------------------
// 変数宣言
//-----------------------------------------------

// コンポーネントのルートノード
var app = document.querySelector('#app');
// 消費税率
var taxRate = 0.08;

//-----------------------------------------------
// イベントハンドラの割り当て
//-----------------------------------------------

// ページの読み込み完了イベント
window.addEventListener('load', onPageLoad, false);
// 入力内容変更イベント（DVD仕上がり予定日）
app.querySelector('#delivery_date').addEventListener('change', onInputChanged, false);
// 入力内容変更イベント（BGM手配）
app.querySelector('#opt1').addEventListener('change', onInputChanged, false);
// 入力内容変更イベント（撮影）
app.querySelector('#opt2').addEventListener('change', onInputChanged, false);
// 入力内容変更イベント（DVD盤面印刷）
app.querySelector('#opt3').addEventListener('change', onInputChanged, false);
// 入力内容変更イベント（写真スキャニング）
app.querySelector('#opt4').addEventListener('input', onInputChanged, false);

//-----------------------------------------------
// イベントハンドラ
//-----------------------------------------------

// ページの読み込みが完了したとき呼び出されるイベントハンドラ
function onPageLoad(event) {
  // フォームコントロールを取得
  var wedding_date  = app.querySelector('#wedding_date');   // 挙式日
  var delivery_date = app.querySelector('#delivery_date');  // DVD仕上がり予定日
  // 今日の日付を取得
  var dt = new Date();
  // 挙式日に2ヵ月後の日付を設定
  dt.setMonth(dt.getMonth() + 2);
  wedding_date.value = formatDate(dt);
  // DVD仕上がり予定日に、挙式日の１週間前の日付を設定
  dt.setDate(dt.getDate() - 7);
  delivery_date.value = formatDate(dt);
  // DVD仕上がり予定日に翌日以降しか入力できないようにする
  delivery_date.setAttribute('min', tommorow());
  // フォームの表示を更新する
  updateForm();
}

// 入力内容を変更したとき呼び出されるイベントハンドラ
function onInputChanged(event) {
  // フォームの表示を更新する
  updateForm();
}

//-----------------------------------------------
// 関数
//-----------------------------------------------

// 日付をYYYY-MM-DDの書式で返すメソッド
function formatDate(dt) {
  var y = dt.getFullYear();
  var m = ('00' + (dt.getMonth()+1)).slice(-2);
  var d = ('00' + dt.getDate()).slice(-2);
  return (y + '-' + m + '-' + d);
}

// 明日の日付をYYYY-MM-DDの書式で返す関数
function tommorow() {
  var dt = new Date();
  dt.setDate(dt.getDate() + 1);
  return formatDate(dt);
}

// 税抜き金額を税込み金額に変換する関数
function incTax(untaxed) {
  return Math.floor(untaxed * (1 + taxRate));
}

// 数値を通貨書式「#,###,###」に変換する関数
function number_format(val) {
  return val.toLocaleString();
}

// 日付の差を求める関数
function getDateDiff(dateString1, dateString2) {
  // 日付を表す文字列から日付オブジェクトを生成
  var date1 = new Date(dateString1);
  var date2 = new Date(dateString2);
  // 2つの日付の差分（ミリ秒）を計算
  var msDiff  = date1.getTime() - date2.getTime();
  // 求めた差分（ミリ秒）を日付に変換
  // 差分÷(1000ミリ秒×60秒×60分×24時間)
  return Math.ceil(msDiff / (1000 * 60 * 60 *24));
}

// 再計算した基本料金（税込）を返す関数
function taxedBasePrice() {
  // 割増料金
  var addPrice = 0;
  // フォームコントロールを取得（DVD仕上がり予定日）
  var delivery_date = app.querySelector('#delivery_date');
  // 納期までの残り日数を計算
  var dateDiff = getDateDiff(delivery_date.value, (new Date()).toLocaleString());
  // 割増料金を求める
  if (21 <= dateDiff && dateDiff < 30) {
    // 納期が1ヵ月未満の場合
    addPrice = 5000;
  }
  else if (14 <= dateDiff && dateDiff < 21) {
    // 納期が3週間未満の場合
    addPrice = 10000;
  }
  else if (7 <= dateDiff && dateDiff < 14) {
    // 納期が2週間未満の場合
    addPrice = 15000;
  }
  else if (3 < dateDiff && dateDiff < 7) {
    // 納期が1週間未満の場合
    addPrice = 20000;
  }
  else if (dateDiff == 3) {
    // 納期が3日後の場合
    addPrice = 40000;
  }
  else if (dateDiff == 2) {
    // 納期が2日後の場合
    addPrice = 45000;
  }
  else if (dateDiff == 1) {
    // 納期が翌日の場合
    addPrice = 50000;
  }
  // 基本料金（税込）を返す
  return incTax(30000 + addPrice);
}

// 再計算したオプション料金（税込）を返す関数
function taxedOptPrice() {
  // オプション料金
  var optPrice = 0;
  // フォームコントロールを取得
  var opt1 = app.querySelector('#opt1');  // BGM手配
  var opt2 = app.querySelector('#opt2');  // 撮影
  var opt3 = app.querySelector('#opt3');  // DVD盤面印刷
  var opt4 = app.querySelector('#opt4');  // 写真スキャニング
  // BGM手配
  if (opt1.checked) { optPrice += 5000; }
  // 撮影
  if (opt2.checked) { optPrice += 5000; }
  // DVD盤面印刷
  if (opt3.checked) { optPrice += 5000; }
  // 写真スキャニング
  if (opt4.value == '') { opt4 = 0; }
  optPrice += opt4.value * 500;
  // オプション料金（税込）を返す
  return incTax(optPrice);
}

// 金額の表示を更新する関数
function updateForm() {
  // フォームコントロールを取得
  var sum_base  = app.querySelector('#sum_base');   // 基本料金（税込）
  var sum_opt   = app.querySelector('#sum_opt');    // オプション料金（税込）
  var sum_total = app.querySelector('#sum_total');  // 合計（税込）

  // 金額を再計算
  var basePrice  = taxedBasePrice();     // 基本料金（税込）
  var optPrice   = taxedOptPrice();      // オプション料金（税込）
  var totalPrice = basePrice + optPrice; // 合計（税込）

  // 表示を更新
  sum_base.value  = number_format(basePrice);   // 基本料金（税込）
  sum_opt.value   = number_format(optPrice);    // オプション料金（税込）
  sum_total.value = number_format(totalPrice);  // 合計（税込）
}