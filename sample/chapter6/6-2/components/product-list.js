Vue.component('product-list', {
  template: `
  <div class="container">
    <product-header
      v-bind:count="filteredList.length"
      v-bind:showSaleItem="showSaleItem"
      v-bind:showDelvFree="showDelvFree"
      v-bind:sortOrder="sortOrder"
      v-on:showSaleItemChanged="showSaleItem=!showSaleItem"
      v-on:showDelvFreeChanged="showDelvFree=!showDelvFree"
      v-on:sortOrderChanged="sortOrderChanged"
    >
    </product-header>
    <div class="list">
      <product
        v-for="product in filteredList"
        v-bind:product="product"
        v-bind:key="product.id">
      </product>
    </div>
  </div>`,
  components: {
    'product-header': productHeader,
    'product': product
  },
  props: ['products'],
  data: function() {
    return {
      //「セール対象」のチェック状態（true：チェック有り、false：チェック無し）
      showSaleItem: false,
      //「送料無料」のチェック状態（true：チェック有り、false：チェック無し）
      showDelvFree: false,
      //「並び替え」の選択値（1：標準、2：価格が安い順）
      sortOrder: 1
    }
  },
  methods: {
    // 「並び替え」の選択値が変わったとき呼び出されるメソッド
    sortOrderChanged: function(order) {
      // 現在の選択値を新しい選択値で上書きする
      this.sortOrder = order;
    }
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
        newList.sort(function(a,b){
          return a.price - b.price;
        });
      }
      // 絞り込み後の商品リストを返す
      return newList;
    }
  }
});