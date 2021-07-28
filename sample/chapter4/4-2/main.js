var btnLoad = document.querySelector('#load');
// 読み込みボタンのクリックイベントハンドラを定義
btnLoad.addEventListener('click', function(event) {
  //【手順1】XMLHttpRequestオブジェクトのインスタンスを生成
  var xmlHttpRequest  = new XMLHttpRequest();
  //【手順2】通信状態の変化を監視するイベントハンドラを設定
  xmlHttpRequest.onreadystatechange = function() {
    // レスポンスの受信が正常に完了したとき
    if (this.readyState == 4 /*&& this.status == 200*/) {
      // 受信したJSONを変数に格納する
      var products = this.response;
      // 商品リストの子ノードを全て削除する
      var result  = document.querySelector('#result');
      result.textContent = '';
      // 商品の子ノードをDOMに挿入する
      for (var i=0; i<products.length; i++) {
        var text = '商品ID:' + products[i].id;
        text += ' 商品名:' + products[i].name;
        text += ' 料金:' + products[i].price;
        text += ' 画像パス:' + products[i].image;
        text += ' 送料:' + products[i].delv;
        text += ' セール対象:' + products[i].isSale;
        var div = document.createElement('div');
        div.textContent = text;
        result.appendChild(div);
      }
    }
  };
  //【手順3】レスポンスの形式を指定する
  xmlHttpRequest.responseType = 'json';
  //【手順4】リクエストメソッドと読み込むファイルのパスを指定する
  xmlHttpRequest.open('GET', 'products.json');
  //【手順5】リクエストを送信する（非同期通信を開始する）
  xmlHttpRequest.send();
});
