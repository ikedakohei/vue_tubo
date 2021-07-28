// 数値を通貨書式「#,###,###」に変換するフィルター
Vue.filter('number_format', function(val) {
  return val.toLocaleString();
});
// 商品一覧コンポーネント
var app = new Vue({
  el: '#app',
  data: {
    //「セール対象」のチェック状態（true：チェック有り、false：チェック無し）
    showSaleItem: false,
    //「送料無料」のチェック状態（true：チェック有り、false：チェック無し）
    showDelvFree: false,
    //「並び替え」の選択値（1：標準、2：価格が安い順）
    sortOrder: 1,
    // 商品リスト
    products: [
      { id: 1, name: 'Michael<br>スマホケース', price: 1580, image: 'images/01.jpg', delv: 0, isSale: true },
      { id: 2, name: 'Raphael<br>スマホケース', price: 1580, image: 'images/02.jpg', delv: 0, isSale: true },
      { id: 3, name: 'Gabriel<br>スマホケース', price: 1580, image: 'images/03.jpg', delv: 240, isSale: true },
      { id: 4, name: 'Uriel<br>スマホケース', price: 980, image: 'images/04.jpg', delv: 0, isSale: true },
      { id: 5, name: 'Ariel<br>スマホケース', price: 980, image: 'images/05.jpg', delv: 0, isSale: false },
      { id: 6, name: 'Azrael<br>スマホケース', price: 1580, image: 'images/06.jpg', delv: 0, isSale: false }
    ]
  },
  computed: {
    // 絞り込み後の商品リストを返す算出プロパティ
    filteredList: function() {
      // 絞り込み後の商品リストを格納する新しい配列
      var newList = [];
      for (var i=0; i<this.products.length; i++) {
        // 表示対象かどうかを判定するフラグ
        var isShow = true;
        // i番目の商品が表示対象かどうかを判定する
        if (this.showSaleItem && !this.products[i].isSale) {
          //「セール対象」チェック有りで、セール対象商品ではない場合
          isShow = false;  // この商品は表示しない
        }
        if (this.showDelvFree && this.products[i].delv > 0) {
          //「送料無料」チェック有りで、送料有りの商品の場合
          isShow = false;  // この商品は表示しない
        }
        // 表示対象の商品だけを新しい配列に追加する
        if (isShow) {
          newList.push(this.products[i]);
        }
      }
      // 新しい配列を並び替える
      if (this.sortOrder == 1) {
        // 元の順番にpushしているので並び替え済み
      }
      else if (this.sortOrder == 2) {
        // 価格が安い順に並び替える
        newList.sort(function(a,b) {
          return a.price - b.price;
        });
      }
      // 絞り込み後の商品リストを返す
      return newList;
    }
  }
});
