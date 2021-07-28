var app = new Vue({
  el: '#app',
  data: {
    // 表示中の商品数
    count: 0,
    //「セール対象」のチェック状態（true：チェック有り、false：チェック無し）
    showSaleItem: false,
    //「送料無料」のチェック状態（true：チェック有り、false：チェック無し）
    showDelvFree: false,
    //「並び替え」の選択値（1：標準、2：価格が安い順）
    sortOrder: 1,
    // 商品リスト
    products: [
      { name: 'Michael<br>スマホケース', price: 1580, image: 'images/01.jpg', delv: 0, isSale: true },
      { name: 'Raphael<br>スマホケース', price: 1580, image: 'images/02.jpg', delv: 0, isSale: true },
      { name: 'Gabriel<br>スマホケース', price: 1580, image: 'images/03.jpg', delv: 240, isSale: true },
      { name: 'Uriel<br>スマホケース', price: 980, image: 'images/04.jpg', delv: 0, isSale: true },
      { name: 'Ariel<br>スマホケース', price: 980, image: 'images/05.jpg', delv: 0, isSale: false },
      { name: 'Azrael<br>スマホケース', price: 1580, image: 'images/06.jpg', delv: 0, isSale: false }
    ]
  }
});
